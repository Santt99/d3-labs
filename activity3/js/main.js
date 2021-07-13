/*
*    main.js
*/
var svg = d3.select("#chart-area").append("svg").attr("width", 1000).attr("height", 1000)
d3.csv("./data/ages.csv").then((data)=> console.log(data))
d3.tsv("./data/ages.tsv").then((data)=> console.log(data))
d3.json("./data/ages.json").then((data)=> console.log(data))
d3.json("./data/ages.json").then((data)=> {
    data.forEach(d => {
        d.age = +d.age    
    });
   
    console.log(data)
    return data
}).then((data)=>{
    

    var circles = svg.selectAll("circle").data(data)
    circles.enter().append("circle").attr("cx", (d)=> d.age * 30).attr("cy", 250).attr("r", (d)=> d.age ).attr("fill", (d)=> {
        console.log(d.age)
      
        if (d.age >= 10){
            return "red";
        }
        return "blue"
    })
})




