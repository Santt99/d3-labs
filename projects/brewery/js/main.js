/*
*    main.js
*/

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

d3.json("data/revenues.json").then(async (data)=> {
    var rects = g.selectAll('rect')
    .data(data);
    
    let months = await data.map((d)=>{
        return d.month
    })
    let max = 0
    await data.map((d)=>{
        let revenue =  parseInt(d.revenue)
        max = revenue > max? revenue : max 
    })

    var y = await d3.scaleLinear().domain([max, 0]).range([0, height])
    var leftAxis = d3.axisLeft(y).tickSize(5).tickFormat((d)=> d/1000 + "k")
    g.append("g").attr("class", "left axis").call(leftAxis)

    var x  = await d3.scaleBand().domain(months).range([0, width]).paddingInner(0.3).paddingOuter(0.2)
    var bottomAxis = d3.axisBottom(x)  
    g.append("g")
    .attr("class", "bottom axis")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis)
   
    g.append("text")
		.attr("class", "bottomAxis")
		.attr("x", width/2)
		.attr("y", height+140)
		.attr("font-size", "20px")
		.attr("text-anchor", "end")
		.style("fill", "red")
		.text("Month");
    g.append("text")
		.attr("class", "leftAxis")
		.attr("x", -(height/2))
		.attr("y", -50)
		.attr("font-size", "20px")
		.attr("text-anchor", "middle")
		.attr("transform", "rotate(-90)")
		.style("fill", "black")
		.text("Revenue (dlls.)");

    var size = months.length;
    rects.enter()
        .append('rect')
        .attr('x', (h, i) => {return Math.round(x(h.month)) + 10})
        .attr('y', (h) => {return y(h.revenue)})
        .attr('width', 40 )
        .attr('height', (h) => {return height - y(h.revenue)})
        .attr('fill', 'yellow');
    return data
})




