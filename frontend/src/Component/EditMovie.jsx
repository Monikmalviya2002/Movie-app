import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utills/constant";

function EditMovie() {
  const { id } = useParams(); 
  const [title, setTitle] = useState("");
  const [publishingYear, setPublishingYear] = useState("");
  const [poster, setPoster] = useState(null); 
  const [posterPreview, setPosterPreview] = useState(""); 
  const [error, setError] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/movies/${id}`);
        const movie = res.data;
        setTitle(movie.title);
        setPublishingYear(movie.publishingYear);
        setPosterPreview(`${BASE_URL}/${movie.poster.replace(/\\/g, "/")}`);
      } catch (err) {
        console.error("Error fetching movie:", err);
      }
    };
    fetchMovie();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !publishingYear) {
      setError("Title and Publishing Year are required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("publishingYear", publishingYear);
    if (poster) formData.append("poster", poster);

    try {
      await axios.put(`${BASE_URL}/api/update/${id}`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/movies");
    } catch (err) {
      console.error("Error updating movie:", err);
      setError("Failed to update movie.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#03191e] px-6">
      <div className="w-full max-w-5xl">
        <h1 className="text-4xl font-bold text-white mb-10">Edit Movie</h1>

        {error && <p className="text-red-500 text-sm mb-6">{error}</p>}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <label
            className="flex items-center justify-center w-full h-[400px] bg-[#123249] border-2 border-dashed border-gray-500 rounded-lg cursor-pointer hover:border-green-400 transition"
          >
            {poster ? (
              <img
                src={URL.createObjectURL(poster)}
                alt="Poster Preview"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : posterPreview ? (
              <img
                src={posterPreview}
                alt="Poster Preview"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
             <div className="flex flex-col items-center justify-center cursor-pointer ">
            <span className="text-gray-400 flex flex-col items-center">
             <i className="fa-solid fa-download text-2xl mb-2"></i>
           Drop other image here
         </span>
          </div>

              
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPoster(e.target.files[0])}
              className="hidden"
            />
          </label>

          <div className="flex flex-col gap-6">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#123249] text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            />
            <input
              type="number"
              placeholder="Publishing year"
              value={publishingYear}
              onChange={(e) => setPublishingYear(e.target.value)}
              className="w-full bg-[#123249] text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            />

            <div className="flex gap-4 mt-6">
              <button
                type="button"
                onClick={() => navigate("/movies")}
                className="w-1/2 border border-gray-400 text-white py-2 rounded-lg hover:bg-gray-700 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-1/2 bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 cursor-pointer transition-colors"
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditMovie;
