import express from "express";
import multer from "multer";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Needed for __dirname in ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

const prescriptions = []; // In-memory for now (can switch to DB later)

// Setup multer for image storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Upload API - receives image + details
app.post("/api/upload", upload.single("image"), (req, res) => {
  const { hospital, doctor, date } = req.body;
  const image = req.file.filename;
  const timestamp = new Date().toLocaleString();

  const newData = { hospital, doctor, date, image, timestamp };
  prescriptions.push(newData);

  res.json(newData);
});

// Get all uploaded prescriptions
app.get("/api/prescriptions", (req, res) => {
  res.json(prescriptions);
});

// Delete image + data
app.delete("/api/delete/:filename", (req, res) => {
  const filename = req.params.filename;
  const index = prescriptions.findIndex((item) => item.image === filename);

  if (index !== -1) {
    prescriptions.splice(index, 1);
    fs.unlink(path.join(__dirname, "uploads", filename), (err) => {
      if (err) console.log("Error deleting file:", err);
    });
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

// Start server
app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));