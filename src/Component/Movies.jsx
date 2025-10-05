import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utills/constant";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalMovies, setTotalMovies] = useState(0);
  const limit = 8; 
  const navigate = useNavigate();

      useEffect(() => {
       const fetchMovies = async () => {
        try {
        const res = await axios.get(
        `${BASE_URL}/api/movies?page=${page}&limit=8`,
        { withCredentials: true }
           );
        setMovies(res.data.movies || []);
        setTotalMovies(res.data.total || 0);
      } catch (err) {
        console.error("Error in fetching movies:", err);
        setMovies([]);
      }
    };
    fetchMovies();
  }, [page]);

          const handleLogout = async()=>{
    try {
         await axios.post(BASE_URL+ "/api/logout",{} ,
       {withCredentials: true,
        });
      
        navigate("/signup")
      }
       catch(err){
        console.log(err);
       }
       
  }

  const totalPages = Math.ceil(totalMovies / limit);

  return (
    <div className="min-h-screen bg-[#03191e] px-6 py-8">
           {movies.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20 gap-6">
           <h1 className="text-3xl font-bold text-white text-center">
            Your movie list is empty
           </h1>
          <button
            onClick={() => navigate("/movies/create")}
            className="bg-green-700 text-white py-2 px-6 rounded-lg font-medium hover:bg-green-500 transition-colors"
          >
            Add a new movie
          </button>
        </div>
        ) : (

             <div className="max-w-6xl mx-auto">
            <div className="flex items-center mb-8 justify-between">
            <div className="flex items-center space-x-4">
           <h1 className="text-4xl font-bold text-white">My Movies</h1>

          <button onClick={() => navigate("/movies/create")} >
       <i className="fa-solid fa-square-plus text-white text-4xl cursor-pointer"></i>
          </button>
         </div>

  
      <button onClick={handleLogout} className="flex items-center text-white">
      <span>Logout</span>
      <i className="fa-solid fa-right-from-bracket text-white text-xl ml-2"></i>
     </button>
     </div>


         
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <div
                key={movie._id}
                className="bg-[#123249] rounded-xl shadow-lg overflow-hidden hover:scale-105 transform transition-all duration-300"
              >
                {movie.poster ? (
                  <img
                    src={BASE_URL+`/${movie.poster.replace(/\\/g, "/")}`}
                    alt={movie.title}
                    className="w-full h-70 object-cover"
                  />
                ) : (
                  <div className="w-full h-70 bg-gray-700 flex items-center justify-center text-gray-400">
                    No Poster
                  </div>
                )}
               <div className="p-2 text-white flex justify-between items-center">
 
  <div>
    <h2 className="text-lg font-semibold">{movie.title}</h2>
    <p className="text-gray-300">{movie.publishingYear}</p>
  </div>

         <button  onClick={() => navigate(`/movies/edit/${movie._id}`)} 
       className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm cursor-pointer">     
            Edit
           </button>
           </div>

              </div>
            ))}
          </div>

         
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-10 gap-6">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="bg-gray-700 text-white px-5 py-2 rounded-lg disabled:opacity-50 hover:bg-gray-600 transition"
              >
                Previous
              </button>
              <span className="text-white font-medium">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                className="bg-gray-700 text-white px-5 py-2 rounded-lg disabled:opacity-50 hover:bg-gray-600 transition"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Movies;
