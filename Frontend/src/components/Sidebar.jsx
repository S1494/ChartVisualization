import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../contex/DataContext";

const Sidebar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [sideBarStatus, setSideBarStatus] = useState(false);
  const { data } = useContext(DataContext);

  // Destructure data if it exists
  const sidebar_end_year = data?.sidebar_end_year || [];
  const sidebar_pestle = data?.sidebar_pestle || [];
  const sidebar_region = data?.sidebar_region || [];
  const sidebar_sector = data?.sidebar_sector || [];
  const sidebar_topic = data?.sidebar_topic || [];

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <section className="sidebar" onClick={() => !sideBarStatus}>
        <div className="hamburger-menu">&#9776</div>
        <div className={`opened-menu  ${sideBarStatus} ? open : ""`}>
          <h2>
            <Link to="/dashboard">SBWire</Link>
          </h2>

          <ul>
            <li className="sidebarhover">
              <Link to="/dashboard">Dashboard </Link>
            </li>
            <li // Pastle
              onClick={() => toggleDropdown(1)}
              className={!openDropdown ? "sidebarhover" : undefined}
            >
              Pestle
              {openDropdown === 1 && (
                <div className="dropdown-content" onClick={stopPropagation}>
                  {sidebar_pestle &&
                    sidebar_pestle.length > 0 &&
                    sidebar_pestle.map((val, index) => (
                      <Link key={index} to={`/analytic?pestle=${val._id}`}>
                        {val._id}
                      </Link>
                    ))}
                </div>
              )}
            </li>
            <li // region
              onClick={() => toggleDropdown(2)}
              className={!openDropdown ? "sidebarhover" : undefined}
            >
              Region
              {openDropdown === 2 && (
                <div className="dropdown-content" onClick={stopPropagation}>
                  {sidebar_region &&
                    sidebar_region.length > 0 &&
                    sidebar_region.map((val, index) => (
                      <Link key={index} to={`/analytic?region=${val._id}`}>
                        {val._id}
                      </Link>
                    ))}
                </div>
              )}
            </li>
            <li // sector
              onClick={() => toggleDropdown(3)}
              className={!openDropdown ? "sidebarhover" : undefined}
            >
              Sector
              {openDropdown === 3 && (
                <div className="dropdown-content" onClick={stopPropagation}>
                  {sidebar_sector &&
                    sidebar_sector.length > 0 &&
                    sidebar_sector.map((val, index) => (
                      <Link key={index} to={`/analytic?sector=${val._id}`}>
                        {val._id}
                      </Link>
                    ))}
                </div>
              )}
            </li>
            <li // topic
              onClick={() => toggleDropdown(4)}
              className={!openDropdown ? "sidebarhover" : undefined}
            >
              Topic
              {openDropdown === 4 && (
                <div className="dropdown-content" onClick={stopPropagation}>
                  {sidebar_topic &&
                    sidebar_topic.length > 0 &&
                    sidebar_topic.map((val, index) => (
                      <Link key={index} to={`/analytic?topic=${val._id}`}>
                        {val._id}
                      </Link>
                    ))}
                </div>
              )}
            </li>
            <li // end_year
              onClick={() => toggleDropdown(5)}
              className={!openDropdown ? "sidebarhover" : undefined}
            >
              End year
              {openDropdown === 5 && (
                <div className="dropdown-content" onClick={stopPropagation}>
                  {sidebar_end_year &&
                    sidebar_end_year.length > 0 &&
                    sidebar_end_year.map((val, index) => (
                      <Link key={index} to={`/analytic?end_year=${val._id}`}>
                        {val._id}
                      </Link>
                    ))}
                </div>
              )}
            </li>
          </ul>
        </div>
      </section>
      {sideBarStatus && <div className="overlay" onClick={sideBarStatus}></div>}
    </>
  );
};

export default Sidebar;
