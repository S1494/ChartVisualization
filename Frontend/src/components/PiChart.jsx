import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const PieChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) {
      return;
    }
    const svg = d3.select(svgRef.current);
    const containerWidth = svg.node().getBoundingClientRect().width;
    const width = containerWidth;
    const height = containerWidth;
    const radius = Math.min(width, height) / 2;
    const colors = d3.scaleOrdinal(d3.schemeCategory10);

    // Clear existing content
    svg.selectAll("*").remove();

    svg
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const pie = d3.pie().value((d) => d.count); // frequency

    const arc = d3
      .arc()
      .innerRadius(0) // This ensures it's a full circle
      .outerRadius(radius - 10);

    // Append paths
    svg
      .select("g") // Select the group element
      .selectAll(".arc")
      .data(pie(data))
      .enter()
      .append("path")
      .attr("class", "arc")
      .attr("d", arc)
      .attr("fill", (d) => colors(d.data.count)) // for colors
      .attr("stroke", "white")
      .attr("stroke-width", "2px");

    const labelArc = d3
      .arc()
      .innerRadius(0)
      .outerRadius(radius - 20); // Reduce the radius for label placement

    // Append labels
    svg
      .select("g") // Select the group element
      .selectAll(".label")
      .data(pie(data))
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("transform", (d) => {
        const [x, y] = labelArc.centroid(d); // Use labelArc to position labels
        const angle = (d.startAngle + d.endAngle) / 2;
        return `translate(${x}, ${y}) rotate(${(angle * 180) / Math.PI - 90})`;
      })
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .style("font-size", "0.7rem")
      .text((d) => d.data._id); // for names
  }, [data]);

  return (
    <>
      {data[0] && (
        <section id="piechart">
          <svg ref={svgRef}></svg>
          <h2>{data[0].lable}</h2>
        </section>
      )}
    </>
  );
};

export default PieChart;
