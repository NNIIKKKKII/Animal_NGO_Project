import pool from "../config/db.js";

export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await pool.query("SELECT COUNT(*) FROM users");
    const pendingRescues = await pool.query(
      "SELECT COUNT(*) FROM rescues WHERE status IN ('pending', 'assigned')"
    );
    const fulfilledDonations = await pool.query(
      "SELECT COUNT(*) FROM donation_requests WHERE status = 'fulfilled'"
    );

    res.json({
      totalUsers: parseInt(totalUsers.rows[0].count, 10),
      pendingRescues: parseInt(pendingRescues.rows[0].count, 10),
      fulfilledDonations: parseInt(fulfilledDonations.rows[0].count, 10),
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllUsersAdmin = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email, role, phone_number, created_at FROM users ORDER BY created_at DESC"
    );

    res.json({
      count: result.rows.length,
      users: result.rows,
    });
  } catch (error) {
    console.error("Admin get users error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
