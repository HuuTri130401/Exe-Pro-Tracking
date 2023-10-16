import React from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "./components/loading/Loading";
import DashboardRoutes from "./guard/DashboardRoutes";
import UserRoutes from "./guard/UserRoute";
import Dashboard from "./layout/dashboard/Dashboard";
import UserLayout from "./layout/user-layout/UserLayout";
import Board from "./pages/board/Board";
import CreateProject from "./pages/create-project/CreateProject";
import ErrorPage from "./pages/error-page/ErrorPage";
import ProjectManagement from "./pages/project-management/ProjectManagement";
import Login from "./pages/user-page/Login";
import Register from "./pages/user-page/Register";
function App() {
  return (
    <>
      <Loading />
      <Routes>
        {/* User */}
        <Route element={<UserRoutes />}>
          <Route index path="/" element={<UserLayout Component={Login} />} />
          <Route index path="/login" element={<UserLayout Component={Login} />} />
          <Route path="/register" element={<UserLayout Component={Register} />} />
        </Route>

        {/* Dashboard */}
        <Route element={<DashboardRoutes />}>
          <Route index path="/projects" element={<Dashboard Component={ProjectManagement} title={'Project Management'} />} />
          <Route path='/board/:id' element={<Dashboard Component={Board} title={'Board'} />} />
          <Route path="/create" element={<Dashboard Component={CreateProject} title={'Create Project'} />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
