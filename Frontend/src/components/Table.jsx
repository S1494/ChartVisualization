import axios from "axios";
import React, { useEffect, useState } from "react";

const Table = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get("/api/admin/projectdata").then((res) => {
          if (Array.isArray(res.data.message)) {
            setData(res.data.message);
          } else {
            console.log("Unexpected data format", res.data.message);
          }
        });
      } catch (error) {
        if ((error.message = "Request failed with status code 404")) {
          console.log(error);
        }
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <section id="table">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2>Table</h2>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>End year</th>
                    <th>Sector</th>
                    <th>Topic</th>
                    <th>Insight</th>
                    {/* <th>url</th> */}
                    <th>Region</th>
                    <th>Start year</th>
                    <th>impact</th>
                    {/* <th>Added</th> */}
                    {/* <th>published</th> */}
                    <th>Country</th>
                    <th>Relevance</th>
                    <th>Pestle</th>
                    <th>Source</th>
                    <th>Title</th>
                    <th>Likelihood</th>
                  </tr>
                </thead>
                <tbody>
                  {!data.length == 0 ? (
                    data.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.end_year}</td>
                        <td>{item.sector}</td>
                        <td>{item.topic}</td>
                        <td>{item.insight}</td>
                        {/* <td>
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          ></a>
                        </td> */}
                        <td>{item.region}</td>
                        <td>{item.start_year}</td>
                        <td>{item.impact}</td>
                        {/* <td>{item.added}</td> */}
                        {/* <td>{item.published}</td> */}
                        <td>{item.country}</td>
                        <td>{item.relevance}</td>
                        <td>{item.pestle}</td>
                        <td>{item.source}</td>
                        <td>{item.title}</td>
                        <td>{item.likelihood}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={"14"} style={{ textAlign: "center" }}>
                        No Data Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Table;
