import pool from "../config/db.js";

export const createLostPet = async (data) => {
  const {
    owner_name,
    owner_phone,
    last_seen,
    description,
    image_url,
    created_by,
    image_public_id,
  } = data;

  const { rows } = await pool.query(
    `
    INSERT INTO lost_pets
    (owner_name, owner_phone, last_seen, description, image_url, created_by, image_public_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
    `,
    [
      owner_name,
      owner_phone,
      last_seen,
      description,
      image_url,
      created_by,
      image_public_id,
    ]
  );

  return rows[0];
};

export const getAllLostPets = async () => {
  const { rows } = await pool.query(
    `SELECT * FROM lost_pets ORDER BY created_at DESC`
  );
  return rows;
};

export const getLostPetById = async (id) => {
  const { rows } = await pool.query(`SELECT * FROM lost_pets WHERE id = $1`, [
    id,
  ]);
  return rows[0];
};

export const deleteLostPetById = async (id) => {
  const { rows } = await pool.query(
    `DELETE FROM lost_pets WHERE id = $1 RETURNING *`,
    [id]
  );
  return rows[0];
};
