/*
*    main.js
*/
var svg = d3.select("#chart-area").append("svg").attr("width", 500).attr("height", 500)
var x = undefined 
var y = undefined
d3.json("data/buildings.json").then(async (data)=> {
    let names = await data.map((d)=>{
        return d.name
    })
    console.log(names)
    let heights = await data.map((d)=>{
        return d.height
    })
    x = await d3.scaleBand().domain(names).range([0, 400]).paddingInner(0.3).paddingOuter(0.3)
    y = await d3.scaleLinear().domain(heights).range([0, 400])
    return data
}).then((data)=>{
    console.log(data)
    console.log(y)
    console.log(x)
    var rect = svg.selectAll("rect").data(data)
    rect.enter()
    .append("rect")
    .attr("x", (d) => x(d.name))
    .attr("y", (d) => y(d.height))
    .attr("width", 100)
    .attr("height", (d)=> d.height )
    .attr("fill", "red")
})




