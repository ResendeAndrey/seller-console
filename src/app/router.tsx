import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardWithHeader from "./pages/Dashboard";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<DashboardWithHeader />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
