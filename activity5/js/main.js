/*
*    main.js
*/
var margin = {top: 10, right: 10, bottom: 100, left: 100}
var width = 600
var height = 400
var svg = d3.select("#chart-area")
          .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", 400 + margin.top + margin.bottom)

var g = d3.select("svg").append("g")
.attr("transform", `translate(${margin.left}, ${margin.top})`)       

d3.json("data/buildings.json").then(async (data)=> {
    var rects = g.selectAll('rect')
    .data(data);
    
    let names = await data.map((d)=>{
        return d.name
    })
    let max = 0
    let heights = await data.map((d)=>{
        max = d.height > max? d.height : max 
        return d.height 
    })

    var y = await d3.scaleLinear().domain([max, 0]).range([0, height/1.47])
    var leftAxis = d3.axisLeft(y).tickSize(5).tickFormat((d)=> d + "m")
    g.append("g").attr("class", "left axis").call(leftAxis)

    var x  = await d3.scaleBand().domain(names).range([0, 600]).paddingInner(0.3).paddingOuter(0.2)
    var bottomAxis = d3.axisBottom(x)  
    g.append("g")
    .attr("class", "bottom axis")
    .attr("transform", `translate(0, ${height / 1.4565})`)
    .call(bottomAxis)
   
    g.append("text")
		.attr("class", "bottomAxis")
		.attr("x", width/2)
		.attr("y", height+140)
		.attr("font-size", "20px")
		.attr("text-anchor", "end")
		.style("fill", "red")
		.text("The wordls´s tallest buildings");
    g.append("text")
		.attr("class", "leftAxis")
		.attr("x", -(height/2))
		.attr("y", -50)
		.attr("font-size", "20px")
		.attr("text-anchor", "middle")
		.attr("transform", "rotate(-90)")
		.style("fill", "black")
		.text("Height (m)");

    var size = names.length;
    rects.enter()
        .append('rect')
            .attr('x', (h, i) => {return (width / size) * i + 15;})
            .attr('y', (h) => {return (max-h.height) / 3 - 3 ;})
            .attr('width', 40 )
            .attr('height', (h) => {return h.height / 3;})
            .attr('fill', 'blue');
    return data
})




