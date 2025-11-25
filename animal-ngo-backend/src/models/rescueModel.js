// animal-ngo-backend/src/models/rescueModel.js
import pool from "../config/db.js";

/**
 * Creates a new rescue case in the database.
 */
export const createRescueCase = async ({
  title,
  description,
  image_url,
  latitude,
  longitude,
  reporter_user_id,
}) => {
  const query = `
    INSERT INTO rescues (title, description, image_url, location, reporter_user_id)
    VALUES (
      $1, $2, $3,
      ST_SetSRID(ST_MakePoint($4, $5), 4326)::geography,
      $6
    )
    RETURNING
      id,
      title,
      description,
      image_url,
      reporter_user_id,
      status,
      created_at,
      ST_X(location::geometry) AS longitude,
      ST_Y(location::geometry) AS latitude;
  `;

  const values = [
    title,
    description,
    image_url,
    longitude, // ST_MakePoint(longitude, latitude)
    latitude,
    reporter_user_id,
  ];

  const { rows } = await pool.query(query, values);
  return rows[0];
};

/**
 * Retrieves rescue cases near a specific location (Volunteer view).
 */
export const getNearbyRescueCases = async (
  latitude,
  longitude,
  distance = 5000
) => {
  const query = `
    SELECT 
      id,
      title,
      description,
      image_url,
      reporter_user_id,
      status,
      created_at,
      ST_X(location::geometry) AS longitude,
      ST_Y(location::geometry) AS latitude,
      ST_Distance(
        location,
        ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography
      ) AS distance_meters
    FROM rescues
    WHERE status IN ('pending', 'assigned')
    AND ST_DWithin(
      location,
      ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography,
      $3
    )
    ORDER BY distance_meters ASC;
  `;

  const values = [longitude, latitude, distance];
  const { rows } = await pool.query(query, values);
  return rows;
};

/**
 * Assigns a volunteer to a specific rescue case.
 */
export const assignVolunteer = async (caseId, volunteerId) => {
  const query = `
    UPDATE rescues
    SET assigned_volunteer_id = $1,
        status = 'assigned'
    WHERE id = $2 AND status = 'pending'
    RETURNING
      id,
      title,
      description,
      image_url,
      reporter_user_id,
      assigned_volunteer_id,
      status,
      created_at,
      ST_X(location::geometry) AS longitude,
      ST_Y(location::geometry) AS latitude;
  `;

  const values = [volunteerId, caseId];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

/**
 * Updates the status of a rescue case.
 */
export const updateRescueStatus = async (caseId, status) => {
  const query = `
    UPDATE rescues
    SET status = $1
    WHERE id = $2
    RETURNING
      id,
      title,
      description,
      image_url,
      reporter_user_id,
      assigned_volunteer_id,
      status,
      created_at,
      ST_X(location::geometry) AS longitude,
      ST_Y(location::geometry) AS latitude;
  `;

  const values = [status, caseId];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

/**
 * Get all cases (Useful for admin dashboard)
 */
export const getAllRescueCases = async () => {
  const query = `
    SELECT 
      id,
      title,
      description,
      image_url,
      reporter_user_id,
      assigned_volunteer_id,
      status,
      created_at,
      ST_X(location::geometry) AS longitude,
      ST_Y(location::geometry) AS latitude
    FROM rescues
    ORDER BY created_at DESC;
  `;

  const { rows } = await pool.query(query);
  return rows;
};

export const getRescuesByReporter = async (userId) => {
  const query = `
    SELECT 
      id,
      title,
      description,
      image_url,
      status,
      created_at,
      ST_Y(location::geometry) AS latitude,
      ST_X(location::geometry) AS longitude
    FROM rescues
    WHERE reporter_user_id = $1
    ORDER BY created_at DESC;
  `;

  const { rows } = await pool.query(query, [userId]);
  return rows;
};

export const getRescuesAssignedToVolunteer = async (volunteerId) => {
  const query = `
    SELECT 
      r.id, r.title, r.description, r.image_url, r.status, r.created_at,
      ST_X(r.location::geometry) as longitude, 
      ST_Y(r.location::geometry) as latitude,
      u.name as reporter_name, u.phone_number as reporter_phone
    FROM rescues r
    JOIN users u ON r.reporter_user_id = u.id
    WHERE 
      r.assigned_volunteer_id = $1 AND r.status IN ('pending', 'assigned')
    ORDER BY r.created_at ASC;
  `;
  const { rows } = await pool.query(query, [volunteerId]);
  return rows;
};