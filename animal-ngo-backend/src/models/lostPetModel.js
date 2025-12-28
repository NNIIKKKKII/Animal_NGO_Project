import pool from "../config/db.js";

export const createLostPet = async (data) => {
  const {
    owner_name,
    owner_phone,
    last_seen,
    description,
    image_url,
    created_by,
  } = data;

  const { rows } = await pool.query(
    `
    INSERT INTO lost_pets
    (owner_name, owner_phone, last_seen, description, image_url, created_by)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
    `,
    [owner_name, owner_phone, last_seen, description, image_url, created_by]
  );

  return rows[0];
};

export const getAllLostPets = async () => {
  const { rows } = await pool.query(
    `SELECT * FROM lost_pets ORDER BY created_at DESC`
  );
  return rows;
};
