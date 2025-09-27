import React from "react";
import { Route, Routes } from "react-router-dom";
import ImageUploadPage from "./pages/ImageUploadPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ImageUploadPage />} />
    </Routes>
  );
}

export default App;
