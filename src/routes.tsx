import { Routes, Route } from "react-router-dom";
import { Home } from "./page/home";
import { Domino } from "./page/domino";

export function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/domino" element={<Domino />} />
    </Routes>
  );
}
