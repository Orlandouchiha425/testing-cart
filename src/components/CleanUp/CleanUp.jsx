import React, { useState, useEffect } from "react";
import SignUpForm from "../SignUpForm/SignUpForm";
import { getUser } from "../../utilities/users-service";
import Home from "../Home/Home";
import { Routes, Route } from "react-router-dom";
import Logout from "../Logout/Logout";
import LoginForm from "../LoginForm/LoginForm";
import NavBar from "../../NavBar/NavBar";
import OneGame from "../OneGame/OneGame";
import Admin from "../Admin/CreateGameForm";
import CreateGameForm from "../Admin/CreateGameForm";
import EditPage from "../EditPage/EditPage";
import Clearance from "../Clearance/Clearance";
import Pokemon from "../Pokemon/Pokemon";
import SearchBar from "../SearchBar/SearchBar";
function CleanUp() {
  const [user, setUser] = useState(getUser());
  const [admin, setAdmin] = useState(false);
  const [ratingCount, setRatingCount] = useState(0);

  useEffect(() => {
    if (user && user.role === "admin") {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  }, [user]);

  return (
    <div>
      <NavBar setUser={setUser} user={user} admin={admin} setAdmin={setAdmin} />

      <Routes>
        {admin && (
          <>
            <Route
              path="/admin"
              element={
                <Admin setUser={setUser} admin={admin} setAdmin={setAdmin} />
              }
            />
            <Route
              path="/create"
              element={
                <CreateGameForm
                  setUser={setUser}
                  admin={admin}
                  setAdmin={setAdmin}
                />
              }
            />
            <Route
              path="/:id"
              element={
                <EditPage setUser={setUser} admin={admin} setAdmin={setAdmin} />
              }
            />
          </>
        )}

        {!user && (
          <>
            <Route
              path="/signup"
              element={
                <SignUpForm
                  setUser={setUser}
                  user={user}
                  admin={admin}
                  setAdmin={setAdmin}
                />
              }
            />
            <Route
              path="/*"
              element={<LoginForm setUser={setUser} user={user} />}
            />
            <Route
              path="/"
              element={<LoginForm setUser={setUser} user={user} />}
            />
          </>
        )}

        <Route path="/home" element={<Home user={user} setUser={setUser} />} />
        <Route
          path="/about"
          element={
            <Logout
              setUser={setUser}
              user={user}
              admin={admin}
              setAdmin={setAdmin}
            />
          }
        />
        <Route
          path="/pokemon"
          element={<Pokemon user={user} setUser={setUser} />}
        />
        <Route
          path="/clearance"
          element={
            <Clearance
              setUser={setUser}
              user={user}
              admin={admin}
              setAdmin={setAdmin}
            />
          }
        />

        <Route
          path="/home/:id"
          element={
            <OneGame
              setUser={setUser}
              user={user}
              ratingCount={ratingCount}
              setRatingCount={setRatingCount}
              admin={admin}
              setAdmin={setAdmin}
            />
          }
        />
        <Route
          path="/search" // Define a unique path for SearchBar
          element={
            <SearchBar
              setUser={setUser}
              user={user}
              ratingCount={ratingCount}
              setRatingCount={setRatingCount}
              admin={admin}
              setAdmin={setAdmin}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default CleanUp;
