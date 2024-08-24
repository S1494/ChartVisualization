import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const ScatterPlot = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) {
      return;
    }

    const svg = d3.select(svgRef.current);
    const containerWidth = svg.node().getBoundingClientRect().width;
    const width = containerWidth;
    const height = containerWidth; // Assuming a square aspect ratio for simplicity
    const margin = { top: 20, right: 30, bottom: 80, left: 50 }; // Increased bottom margin for rotated labels

    // Clear existing content
    svg.selectAll("*").remove();

    // Set SVG dimensions and viewBox
    svg
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d._id))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.count)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    // Append axes
    const xAxisGroup = svg
      .append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(xScale));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(yScale));

    // Rotate x-axis labels
    xAxisGroup
      .selectAll("text")
      .attr("transform", "rotate(-45)") // Rotate labels by -45 degrees
      .attr("text-anchor", "end") // Align text to the end after rotation
      .attr("dx", "-0.5em") // Adjust x offset after rotation
      .attr("dy", "0.5em"); // Adjust y offset after rotation

    // Append scatter plot points
    svg
      .append("g")
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", (d) => xScale(d._id) + xScale.bandwidth() / 2)
      .attr("cy", (d) => yScale(d.count))
      .attr("r", 5)
      .attr("fill", "steelblue");

    // Optional: Add labels to points
    svg
      .append("g")
      .selectAll("text")
      .data(data)
      .join("text")
      .attr("x", (d) => xScale(d._id) + xScale.bandwidth() / 2)
      .attr("y", (d) => yScale(d.count))
      .attr("dy", -10)
      .text((d) => d.count)
      .attr("font-size", "0.8rem")
      .attr("fill", "black");
  }, [data]);

  return (
    <>
      {data.length > 0 && (
        <section id="scatterplot">
          <svg ref={svgRef}></svg>
          <h2>{data[0].label}</h2>
        </section>
      )}
    </>
  );
};

export default ScatterPlot;
