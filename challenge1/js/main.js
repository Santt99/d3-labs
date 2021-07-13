/*
*    main.js
*/
var svg = d3.select("#chart-area").append("svg").attr("width", 1000).attr("height", 1000)

d3.json("data/buildings.json").then((data)=> {
    data.forEach(d => {
        d.height = +d.height    
    });
   
    console.log(data)
    return data
}).then((data)=>{
    

    var rect = svg.selectAll("rect").data(data)
    rect.enter()
    .append("rect")
    .attr("x", (d)=> d.height)
    .attr("y", 250)
    .attr("width", 100)
    .attr("height", (d)=> d.height )
    .attr("fill", "red")
})




