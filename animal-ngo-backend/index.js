import express from "express";
import cors from "cors";

import userRoutes from "./src/routes/userRoutes.js"; // ⬅️ NEW IMPORT
import rescueRoutes from "./src/routes/rescueRoutes.js"; // ⬅️ NEW IMPORT
import donationRoutes from "./src/routes/donationRoutes.js"; // ⬅️ NEW IMPORT
import { createUserTable } from "./src/data/createUserTable.js";
import { createDonationRequestsTable } from "./src/data/createDonationReqTable.js";
import { createRescueTable } from "./src/data/createRescueTable.js";

const app = express();
const port = 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

// --- Route Definitions ---
app.use("/api/users", userRoutes); // ⬅️ NEW LINE to use the router
app.use("/api/rescue", rescueRoutes); // ⬅️ NEW LINE
app.use("/api/donations", donationRoutes); // ⬅️ NEW LINE
async function runDBMigrations() {
  try {
    await createUserTable();
    await createDonationRequestsTable();
    await createRescueTable();
    console.log("------------------------------------------");
    console.log("All DATABASES running successfully/checked !");
    console.log("------------------------------------------");
  } catch (error) {
    console.log(
      "Daabase setup failed , Server will run untill , Go and Check data folders and create table files"
    );
    console.log("Errors: ", error);
  }
}

app.get("/", (req, res) => {
  res.send("Animal NGO API is running ....");
});

runDBMigrations().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log(`Backend port is ${port}`);
  });
});
