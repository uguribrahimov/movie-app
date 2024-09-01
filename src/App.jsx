import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "reactstrap";
import Header from "./shared/header/Header";
import Home from "./pages/home/Home";
import MovieInfo from "./pages/movieInfo/MovieInfo";
import NowPlay from "./pages/nowplay/NowPlay";
import logo from "./assets/logo.jpeg";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const routes = [
    { path: "/", element: <Home /> },
    { path: "/movie/:id", element: <MovieInfo /> },
    { path: "/now-playing", element: <NowPlay /> },
  ];

  return (
    <Router>
      <Container>
        <Header logo={logo} />
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
