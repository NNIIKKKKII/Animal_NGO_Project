// src/controllers/adminController.js
import pool from "../config/db.js";

/**
 * GET /api/admin/stats
 */
export const getAdminStats = async (req, res) => {
  try {
    const totalUsersRes = await pool.query("SELECT COUNT(*) FROM users");
    const pendingRescuesRes = await pool.query("SELECT COUNT(*) FROM rescues WHERE status IN ('pending','assigned')");
    const fulfilledDonationsRes = await pool.query("SELECT COUNT(*) FROM donation_requests WHERE status = 'completed'"); // adjust status name if different

    // live volunteers: last_active_at column would be ideal; fallback: volunteers count
    // If you have last_active_at: uncomment the next block and comment fallback.
    // const oneHourAgo = new Date(Date.now() - 60*60*1000).toISOString();
    // const liveVolunteersRes = await pool.query("SELECT COUNT(*) FROM users WHERE role='volunteer' AND last_active_at >= $1", [oneHourAgo]);

    const liveVolunteersRes = await pool.query("SELECT COUNT(*) FROM users WHERE role='volunteer'");

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

/**
 * GET /api/admin/users
 * Query params: ?page=1&limit=20&role=volunteer
 */
export const getAllUsersAdmin = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page || "1", 10), 1);
    const limit = Math.min(parseInt(req.query.limit || "20", 10), 100);
    const offset = (page - 1) * limit;
    const roleFilter = req.query.role;

    const filters = [];
    const values = [];

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
      LIMIT $${values.length + 1} OFFSET $${values.length + 2};
    `;
    values.push(limit, offset);

    const result = await pool.query(q, values);

    // sanitize phone number display (mask)
    const sanitized = result.rows.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      phone: u.phone_number ? `***-***-${String(u.phone_number).slice(-4)}` : "N/A",
      created_at: u.created_at,
    }));

    res.json({ count: result.rowCount, data: sanitized, page, limit });
  } catch (error) {
    console.error("Admin get users error:", error);
    res.status(500).json({ message: "Failed to fetch users." });
  }
};

/**
 * DELETE /api/admin/users/:id
 * Soft-delete or hard-delete depending on your schema. We'll hard-delete here.
 */
export const deleteUserAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const del = await pool.query("DELETE FROM users WHERE id = $1 RETURNING id", [id]);
    if (del.rowCount === 0) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted", id: del.rows[0].id });
  } catch (error) {
    console.error("Admin delete user error:", error);
    res.status(500).json({ message: "Failed to delete user." });
  }
};

/**
 * PUT /api/admin/users/:id/role
 * Body: { role: "volunteer" | "donor" | "admin" }
 */
export const updateUserRoleAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    if (!role) return res.status(400).json({ message: "Role required" });
    const allowed = ["admin", "volunteer", "donor"];
    if (!allowed.includes(role)) return res.status(400).json({ message: "Invalid role" });
    const updated = await pool.query("UPDATE users SET role = $1 WHERE id = $2 RETURNING id, name, email, role", [role, id]);
    if (updated.rowCount === 0) return res.status(404).json({ message: "User not found" });
    res.json({ message: "Role updated", user: updated.rows[0] });
  } catch (error) {
    console.error("Admin update role error:", error);
    res.status(500).json({ message: "Failed to update user role." });
  }
};
