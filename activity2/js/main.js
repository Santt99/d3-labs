/*
*    main.js
*/

var data = [25, 20, 15, 10,5]

var svg = d3.select("#chart-area").append("svg").attr("width", 400).attr("height", 400)

var rect = svg.selectAll("rect").data(data)



rect.enter().append("rect").attr("x", (d)=> d ).attr("y", (d)=> d ).attr("width", 40).attr("height", (d)=> d).attr("fill", "red")