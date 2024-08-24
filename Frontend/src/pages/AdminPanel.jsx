import React from "react";
import Header from "../components/Header";
import Table from "../components/Table";
const appURL = import.meta.env.VITE_API_URL;

const AdminPanel = () => {
  return (
    <>
      <Header />
      <Table />
    </>
  );
};

export default AdminPanel;
