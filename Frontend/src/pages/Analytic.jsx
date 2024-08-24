import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../contex/DataContext";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import PieChart from "../components/PiChart";
import BarChart from "../components/BarChart";
import ScatterPlot from "../components/ScatterPlot";
import WaterfallChart from "../components/WaterfallChart";
import LineChart from "../components/LineChart";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
const appURL = import.meta.env.VITE_API_URL;

const Analytic = () => {
  const { data, setData } = useContext(DataContext);
  const navigate = useNavigate();

  const location = useLocation();

  const [queryParams, setQueryParams] = useState(
    new URLSearchParams(location.search)
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get(`${appURL}/analytic?${queryParams}`).then((res) => {
          if (!res.data.message || res.data.message.length === 0) {
            console.log("Data is either null, undefined, or an empty array");
          } else {
            setData(res.data.message[0]);
          }
        });
      } catch (error) {
        if (error.response.data.redirect)
          navigate(error.response.data.redirect);
        console.log("error", error);
      }
    };

    fetchData();
  }, [queryParams]);

  useEffect(() => {
    setQueryParams(new URLSearchParams(location.search).toString());
  }, [location.search]);

  const countryChartData = data?.country || [];
  const topicChartData = data?.topic || [];

  const regionData = data?.region || [];
  const startYearData = data?.start_year || [];

  const threecolumn = data?.threecolumn || [];
  const test = data?.test || [];

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
      {}
    </>
  );
};

export default Analytic;
