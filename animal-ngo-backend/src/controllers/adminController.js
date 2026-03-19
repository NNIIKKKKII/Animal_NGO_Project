// src/controllers/adminController.js
import pool from "../config/db.js";

// GET /api/admin/stats
export const getAdminStats = async (req, res) => {
  try {
    const totalUsersRes = await pool.query("SELECT COUNT(*) FROM users");

    const pendingRescuesRes = await pool.query(
      "SELECT COUNT(*) FROM rescues WHERE status IN ('pending','assigned')"
    );

    // donation_requests uses rescue_status enum: pending | assigned | resolved
    // 'resolved' is the closest to "fulfilled"
    const fulfilledDonationsRes = await pool.query(
      "SELECT COUNT(*) FROM donation_requests WHERE status = 'resolved'"
    );

    const liveVolunteersRes = await pool.query(
      "SELECT COUNT(*) FROM users WHERE role = 'volunteer'"
    );

    res.json({
      totalUsers: parseInt(totalUsersRes.rows[0].count, 10),
      pendingRescues: parseInt(pendingRescuesRes.rows[0].count, 10),
      fulfilledDonations: parseInt(fulfilledDonationsRes.rows[0].count, 10),
      liveVolunteers: parseInt(liveVolunteersRes.rows[0].count, 10),
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    res.status(500).json({ message: "Failed to fetch admin stats." });
  }
};

// GET /api/admin/users?page=1&limit=20&role=volunteer
export const getAllUsersAdmin = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page || "1", 10), 1);
    const limit = Math.min(parseInt(req.query.limit || "20", 10), 100);
    const offset = (page - 1) * limit;
    const roleFilter = req.query.role;

    const values = [];
    const filters = [];

    if (roleFilter) {
      values.push(roleFilter);
      filters.push(`role = $${values.length}`);
    }

    const where = filters.length ? `WHERE ${filters.join(" AND ")}` : "";

    const q = `
      SELECT id, name, email, role, phone_number, created_at
      FROM users
      ${where}
      ORDER BY created_at DESC
      LIMIT $${values.length + 1} OFFSET $${values.length + 2}
    `;
    values.push(limit, offset);

    const result = await pool.query(q, values);

    const sanitized = result.rows.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      phone: u.phone_number
        ? `***-***-${String(u.phone_number).slice(-4)}`
        : "N/A",
      created_at: u.created_at,
    }));

    res.json({ count: result.rowCount, data: sanitized, page, limit });
  } catch (error) {
    console.error("Admin get users error:", error);
    res.status(500).json({ message: "Failed to fetch users." });
  }
};

// DELETE /api/admin/users/:id
export const deleteUserAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    // prevent admin from deleting themselves
    if (parseInt(id, 10) === req.user.id) {
      return res.status(400).json({ message: "You cannot delete your own account." });
    }

    const del = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING id",
      [id]
    );
    if (del.rowCount === 0)
      return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted", id: del.rows[0].id });
  } catch (error) {
    console.error("Admin delete user error:", error);
    res.status(500).json({ message: "Failed to delete user." });
  }
};

// PUT /api/admin/users/:id/role
// Body: { role: "volunteer" | "donor" | "admin" }
export const updateUserRoleAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!role) return res.status(400).json({ message: "Role required" });

    const allowed = ["admin", "volunteer", "donor"];
    if (!allowed.includes(role))
      return res.status(400).json({ message: "Invalid role" });

    // prevent admin from changing their own role
    if (parseInt(id, 10) === req.user.id) {
      return res.status(400).json({ message: "You cannot change your own role." });
    }

    const updated = await pool.query(
      "UPDATE users SET role = $1 WHERE id = $2 RETURNING id, name, email, role",
      [role, id]
    );
    if (updated.rowCount === 0)
      return res.status(404).json({ message: "User not found" });

    res.json({ message: "Role updated", user: updated.rows[0] });
  } catch (error) {
    console.error("Admin update role error:", error);
    res.status(500).json({ message: "Failed to update user role." });
  }
};

// GET /api/admin/rescues
export const getAllRescuesAdmin = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        r.id,
        r.title,
        r.description,
        r.status,
        r.created_at,
        ST_X(r.location::geometry) AS longitude,
        ST_Y(r.location::geometry) AS latitude,
        reporter.name  AS reporter_name,
        volunteer.id   AS volunteer_id,
        volunteer.name AS volunteer_name
      FROM rescues r
      JOIN  users reporter  ON reporter.id  = r.reporter_user_id
      LEFT JOIN users volunteer ON volunteer.id = r.assigned_volunteer_id
      ORDER BY r.created_at DESC
    `);

    res.json({ count: result.rowCount, data: result.rows });
  } catch (error) {
    console.error("Admin get rescues error:", error);
    res.status(500).json({ message: "Failed to fetch rescues." });
  }
};

// PATCH /api/admin/rescues/:id/assign
// Body: { volunteerId: 5 }
export const assignVolunteerAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { volunteerId } = req.body;

    if (!volunteerId)
      return res.status(400).json({ message: "volunteerId is required." });

    // verify the target user is actually a volunteer
    const volCheck = await pool.query(
      "SELECT id, name, role FROM users WHERE id = $1",
      [volunteerId]
    );
    if (volCheck.rowCount === 0)
      return res.status(404).json({ message: "Volunteer not found." });
    if (volCheck.rows[0].role !== "volunteer")
      return res.status(400).json({ message: "Target user is not a volunteer." });

    const updated = await pool.query(
      `UPDATE rescues
       SET assigned_volunteer_id = $1, status = 'assigned'
       WHERE id = $2
       RETURNING id, status, assigned_volunteer_id`,
      [volunteerId, id]
    );
    if (updated.rowCount === 0)
      return res.status(404).json({ message: "Rescue case not found." });

    res.json({
      message: "Volunteer assigned",
      rescue: updated.rows[0],
      volunteer: volCheck.rows[0],
    });
  } catch (error) {
    console.error("Admin assign volunteer error:", error);
    res.status(500).json({ message: "Failed to assign volunteer." });
  }
};