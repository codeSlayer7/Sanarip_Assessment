import SignIn from "./ui/components/SignIn";
import SignUp from "./ui/components/SignUp";
import { Navbar } from "./ui/components/Navbar";
import Cards from "./ui/components/Cards";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./assets/routes/ProtectedRoute";
import { Profile } from "./ui/components/Profile";
import CardPage from "./ui/pages/cardPage";

function App() {
  // I did not finish it sorry
  return (
    <Routes>
      <Route
        index
        element={
          <ProtectedRoute>
            <Navbar>
              <Cards />
            </Navbar>
          </ProtectedRoute>
        }
      />{" "}
      <Route path="/Profile" element={<Profile />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/:id" element={<CardPage />} />
    </Routes>
  );
}

export default App;
