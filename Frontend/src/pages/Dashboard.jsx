import React, { useContext, useEffect } from "react";
import PieChart from "../components/PiChart";
import axios from "axios";
import { DataContext } from "../contex/DataContext";
import BarChart from "../components/BarChart";
import ScatterPlot from "../components/ScatterPlot";
import LineChart from "../components/LineChart";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
const appURL = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const { data, setData } = useContext(DataContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const token = localStorage.getItem("token");
        // console.log("from dashboard", token);

        await axios
          .get(
            `${appURL}/dashboard`
            // {headers: { Authorization: `Bearer ${token}` },}
          )
          .then((response) => {
            if (response.data.redirect) navigate(response.data.redirect);

            if (!response.data.message || response.data.message.length === 0) {
              console.log("Data is either null, undefined, or an empty array");
            } else {
              setData(response.data.message[0]);
            }
          });
      } catch (error) {
        if (error.response) {
          navigate(error.response.data.redirect);
        } else {
          console.error("There was an error loggin ing:", error);
        }
      }
    };

    fetchData();
  }, []);

  // Destructure data if it exists
  const countryChartData = data?.country || [];
  const topicChartData = data?.topic || [];
  // const endYearData = data?.end_year || [];
  const regionData = data?.region || [];
  const startYearData = data?.start_year || [];
  // const relevanceData = data?.relevance || [];
  const threecolumn = data?.threecolumn || [];

  return (
    <>
      {data ? (
        <>
          <Sidebar />
          <Header />
          <section id="dashboard">
            <PieChart data={countryChartData} />
            <BarChart data={topicChartData} />
            <ScatterPlot data={startYearData} />
            {/* <WaterfallChart data={regionData} /> */}
            <LineChart data={threecolumn} />
          </section>
        </>
      ) : null}{" "}
    </>
  );
};

export default Dashboard;
