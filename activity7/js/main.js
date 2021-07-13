/*
*    main.js
*/

/*
*    main.js
*/
var margin = { top: 10, right: 10, bottom: 100, left: 100 }
var width = 600
var height = 400
var svg = d3.select("#chart-area")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", 400 + margin.top + margin.bottom)

var g = d3.select("svg").append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`)
var flag = false

d3.json("data/revenues.json").then((data) => {

  console.log(data);
  var max = 0;

  data.forEach((d) => {
    d.revenue = +d.revenue;
    d.profit = +d.profit;
    if (d.revenue > max) {
      max = d.revenue;
    }
  });

  var months = data.map((d) => {
    return d.month;
  });

  var revenues = data.map((d) => {
    return d.revenue;
  });



  var y = d3.scaleLinear().range([0, height]);

  var leftAxis = d3.axisLeft(y).ticks(5).tickFormat((d) => { return d / 1000 + "k"; });

  var yAxisGroup = g.append("g")
    .attr("class", "left axis");

  var x = d3.scaleBand()
    .range([0, width])
    .paddingInner(0.3)
    .paddingOuter(0.2);

  var bottomAxis = d3.axisBottom(x);

  var xAxisGroup = g.append("g")
    .attr("class", "bottom axis")
    .attr("transform", "translate(0, " + (height) + ")");

  var yLabel = g.append("text")
    .attr("class", "y axis-label")
    .attr("x", - (height / 2))
    .attr("y", -60)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .style("fill", "black");

  g.append("text")
    .attr("class", "y axis-label")
    .attr("x", width / 2)
    .attr("y", height + margin.top)
    .attr("transform", "translate(0, " + (40) + ")")
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .style("fill", "black")
    .text("Month");

  var rects = g.selectAll('rect')
    .data(data);

  updateData(data);

  d3.interval(() => {
    flag = !flag;
    var newData = flag? data: data.slice(1)
    updateData(newData);

  }, 3000);

  function updateData(data) {
    var value = flag ? "revenue" : "profit";
    x.domain(data.map((d) => { return d.month }));
    y.domain([d3.max(data, (d) => { return d[value]; }), 0]);
    xAxisGroup.call(bottomAxis);
    yAxisGroup.call(leftAxis);

    var bars = g.selectAll('rect')
      .data(data);

    bars.exit().remove();

    bars.attr("x", (d) => { return x(d.month); })
      .attr("y", (d) => { return y(d[value]); })
      .attr("width", x.bandwidth)
      .attr("height", (d) => { return height - y(d[value]) });

    bars.enter().append("rect")
      .attr("x", (d) => { return x(d.month); })
      .attr("y", (d) => { return y(d[value]); })
      .attr("width", x.bandwidth)
      .attr("height", (d) => { return height - y(d[value]) })
      .attr("fill", flag == true ? "yellow" : "green");

    var label = flag ? "Revenue" : "Profit";
    yLabel.text(label + " (dlls.)")
  }

})




