import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const BarChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) {
      return;
    }

    const svg = d3.select(svgRef.current);
    const containerWidth = svg.node().getBoundingClientRect().width;
    const width = containerWidth;
    const height = containerWidth;
    const margin = { top: 20, right: 30, bottom: 50, left: 60 };

    svg
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`);

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d._id || "Unknown"))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.count)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const color = d3
      .scaleOrdinal()
      .domain(data.map((d) => d._id || "Unknown"))
      .range(d3.schemeCategory10);

    // Clear previous elements
    svg.selectAll("*").remove();

    svg
      .append("defs")
      .append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("width", width - margin.left - margin.right)
      .attr("height", height - margin.top - margin.bottom)
      .attr("x", margin.left)
      .attr("y", margin.top);

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickSize(0))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)");

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d._id || "Unknown"))
      .attr("y", (d) => y(d.count))
      .attr("width", x.bandwidth())
      .attr("height", (d) => y(0) - y(d.count))
      .attr("fill", (d) => color(d._id || "Unknown"))
      .attr("clip-path", "url(#clip)"); // Apply clip path

    // Append labels
    svg
      .selectAll(".label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("x", (d) => x(d._id || "Unknown") + x.bandwidth() / 2)
      .attr("y", (d) => y(d.count) - 10) // Adjust to ensure labels are within bounds
      .attr("text-anchor", "middle")
      .style("fill", "black")
      .style("font-size", "12px")
      .text((d) => d.count)
      .attr("clip-path", "url(#clip)"); // Apply clip path
  }, [data]);
  return (
    <>
      {" "}
      {data[0] && (
        <section id="barchart">
          <svg ref={svgRef}></svg>
          {data[0] ? <h2>{data[0].lable}</h2> : ""}
        </section>
      )}
    </>
  );
};

export default BarChart;
