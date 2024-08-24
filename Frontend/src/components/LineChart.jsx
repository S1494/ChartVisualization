// LineChart.jsx
import React, { useEffect } from "react";
import * as d3 from "d3";

const LineChart = ({ data }) => {
  useEffect(() => {
    const processedData = data.map((d) => ({
      ...d,
      averageLikelihood: +d.averageLikelihood,
    }));

    const margin = { top: 20, right: 20, bottom: 90, left: 50 };

    const containerWidth = d3
      .select("#chart")
      .node()
      .getBoundingClientRect().width;
    const width = containerWidth - margin.left - margin.right;
    const height = containerWidth * 0.6 - margin.top - margin.bottom;

    // Remove previous SVG if it exists
    d3.select("#chart").select("svg").remove();

    const svg = d3
      .select("#chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr(
        "viewBox",
        `0 0 ${width + margin.left + margin.right} ${
          height + margin.top + margin.bottom
        }`
      )
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scalePoint()
      .domain(processedData.map((d) => d.country))
      .range([0, width])
      .padding(0.5);

    const yIntensity = d3
      .scaleLinear()
      .domain([0, d3.max(processedData, (d) => d.averageIntensity)])
      .nice()
      .range([height, 0]);

    const yLikelihood = d3
      .scaleLinear()
      .domain([0, d3.max(processedData, (d) => d.averageLikelihood)])
      .nice()
      .range([height, 0]);

    const lineIntensity = d3
      .line()
      .x((d) => x(d.country))
      .y((d) => yIntensity(d.averageIntensity));

    const lineLikelihood = d3
      .line()
      .x((d) => x(d.country))
      .y((d) => yLikelihood(d.averageLikelihood));

    svg
      .append("path")
      .data([processedData])
      .attr("class", "line")
      .attr("d", lineIntensity)
      .style("stroke", "steelblue")
      .style("stroke-width", "2px")
      .style("fill", "none");

    svg
      .append("path")
      .data([processedData])
      .attr("class", "line")
      .attr("d", lineLikelihood)
      .style("stroke", "orange")
      .style("stroke-width", "2px")
      .style("fill", "none");

    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("class", "axis-label")
      .attr("transform", "rotate(-45)") // Rotate the x-axis labels by -45 degrees
      .attr("text-anchor", "end") // Align text to the end after rotation
      .attr("dx", "-0.5em") // Adjust x offset after rotation
      .attr("dy", "0.5em"); // Adjust y offset after rotation

    svg
      .append("g")
      .attr("class", "y axis")
      .call(d3.axisLeft(yIntensity))
      .selectAll("text")
      .attr("class", "axis-label");

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 10)
      .style("text-anchor", "middle");

    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left)
      .attr("x", -height / 2)
      .style("text-anchor", "middle")
      .text("Intensity");

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", -margin.top / 2)
      .style("text-anchor", "middle");

    return () => {
      d3.select("#chart").select("svg").remove();
    };
  }, [data]);

  return (
    <>
      {data[0] && (
        <section id="linechart">
          <div id="chart"></div>
          <h2>{data[0].lable}</h2>
        </section>
      )}
    </>
  );
};

export default LineChart;
