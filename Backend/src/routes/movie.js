import express from "express";
import Movie from "../models/movie.js";
import auth from "../middleware/auth.js";
import multer from "multer";
import path from "path";

const movieRouter = express.Router();

// ----------------------
// Multer setup for poster uploads
// ----------------------
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// ----------------------
// GET MOVIES WITH PAGINATION
// ----------------------
movieRouter.get("/movies", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;

    const movies = await Movie.find()
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Movie.countDocuments();

    // Send only ONE response
   return res.json({ movies, total });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching movies" });
  }
});

// ----------------------
// CREATE MOVIE
// ----------------------
movieRouter.post("/create/movies", auth, upload.single("poster"), async (req, res) => {
  try {
    const newMovie = new Movie({
      title: req.body.title,
      publishingYear: req.body.publishingYear,
      poster: req.file ? req.file.path : null,
    });
    await newMovie.save();
    res.json(newMovie);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error creating movie" });
  }
});

// ----------------------
// UPDATE MOVIE
// ----------------------
movieRouter.put("/update/:id", auth, upload.single("poster"), async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      publishingYear: req.body.publishingYear,
    };
    if (req.file) updateData.poster = req.file.path;

    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updatedMovie);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error updating movie" });
  }
});

// ----------------------
// DELETE MOVIE
// ----------------------
movieRouter.delete("/delete/:id", auth, async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.json({ msg: "Movie deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error deleting movie" });
  }
});

export default movieRouter;
