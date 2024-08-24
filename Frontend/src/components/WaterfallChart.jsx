import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const WaterfallChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 800 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    // Clear previous content
    svg.selectAll("*").remove();

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d._id))
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.count)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const chart = svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    chart
      .append("g")
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d._id))
      .attr("y", (d) => y(d.count))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - margin.bottom - y(d.count))
      .attr("fill", (d, i) => (i % 2 === 0 ? "steelblue" : "orange"))
      .append("title")
      .text((d) => `${d._id}: ${d.count}`);

    chart
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    chart.append("g").attr("class", "y-axis").call(d3.axisLeft(y));
  }, [data]);

  return (
    <>
      {data[0] && (
        <section id="waterfallchart">
          <svg ref={svgRef}></svg>
          <h2>{data[0].lable}</h2>
        </section>
      )}
    </>
  );
};

export default WaterfallChart;
