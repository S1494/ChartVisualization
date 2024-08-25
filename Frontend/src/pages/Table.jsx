import axios from "axios";
import React, { useEffect, useState } from "react";

const Table = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get("/api/dashboard/table").then((res) => {
          if (Array.isArray(res.data.message)) {
            console.log("data fetched", res);
            setData(res.data.message);
          } else {
            console.log("Unexpected data format", res);
          }
        });
      } catch (error) {
        console.log("error white fetching data ", error);
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
                    <th>end_year</th>
                    <th>sector</th>
                    <th>topic</th>
                    <th>insight</th>
                    <th>url</th>
                    <th>region</th>
                    <th>start_year</th>
                    <th>impact</th>
                    <th>added</th>
                    <th>published</th>
                    <th>country</th>
                    <th>relevance</th>
                    <th>pestle</th>
                    <th>source</th>
                    <th>title</th>
                    <th>likelihood</th>
                  </tr>
                </thead>
                <tbody>
                  {data ? (
                    data.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.end_year}</td>
                        <td>{item.sector}</td>
                        <td>{item.topic}</td>
                        <td>{item.insight}</td>
                        <td>
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          ></a>
                        </td>
                        <td>{item.region}</td>
                        <td>{item.start_year}</td>
                        <td>{item.impact}</td>
                        <td>{item.added}</td>
                        <td>{item.published}</td>
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
                      <td colSpan={"14"}>No Data Found </td>
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
