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
import AdminTransaction from "./pages/admin-page/AdminTransactions";
import Login from "./pages/user-page/Login";
import Register from "./pages/user-page/Register";
import PackageManagement from "./pages/package-management/PackageManagement";
import { userLocalStorage } from "./utils/config";
import AdminUsers from "./pages/admin-page/AdminUsers";
import AIChatBot from "./components/ai-chat-bot/AIChatBot";

function App() {
  const user = userLocalStorage.get();
  const isAdmin = user?.customer?.role === 1;
  const isUser = user?.customer?.role === 0;
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
          {isAdmin && (
            <>
              <Route index={isAdmin} path="/adminManageTransactions" element={<Dashboard Component={AdminTransaction} title={'Admin Manage Packages'} />} />
              <Route path="/adminManageUsers" element={<Dashboard Component={AdminUsers} title={'Admin Manage Users'} />} />
            </>
          )}
          <>
            <Route index={isUser} path="/projects" element={<Dashboard Component={ProjectManagement} title={'Project Management'} />} />
            <Route path='/board/:id' element={<Dashboard Component={Board} title={'Board'} />} />
            <Route path="/create" element={<Dashboard Component={CreateProject} title={'Create Project'} />} />
            <Route path="/package" element={<Dashboard Component={PackageManagement} title={'Package Management'} />} />
            <Route path="/chat" element={<AIChatBot />} />
          </>
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <AIChatBot />
    </>
  );
}

export default App;
