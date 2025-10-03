import React from 'react';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from "./Component/Signup";
import EditMovie from "./Component/EditMovie";
import Movies from "./Component/Movies";
import CreateMovie from "./Component/CreateMovie";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/create" element={<CreateMovie />} />
        <Route path="/movies/edit/:id" element={<EditMovie />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
