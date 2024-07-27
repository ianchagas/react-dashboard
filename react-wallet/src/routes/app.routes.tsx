import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import List from "../pages/List";
import Layout from "../components/Layout";

const AppRoutes: React.FC = () => (
  <Layout>
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/list/:type" element={<List />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  </Layout>
);

export default AppRoutes;
