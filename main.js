// declare constant
const FRAME_HEIGHT = 500
const FRAME_WIDTH = 500
const MARGINS = {left:50, right :50, top:50, bottom:50}


// Create height and width variables
const VIS_HEIGHT = FRAME_HEIGHT -MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH -MARGINS.left - MARGINS.right;



const FRAME1 = d3.select('#vis1')
                  .append('svg')
                  .attr('height', FRAME_HEIGHT)
                  .attr('width', FRAME_WIDTH)
                  .attr('class', 'frame')


// Reading from file
d3.csv('data/iris.csv').then((data)=> {

    const x = d3.scaleLinear()
                            .domain([0, d3.max(data, d => +d.Sepal_Length)+1])
                            // .domain(data.map((d) => { return d.Petal_Length; }))
                            .range([0,VIS_HEIGHT]);

    const y= d3.scaleLinear()
                            .domain([0, d3.max(data, d => +d.Petal_Length)+1])
                            // .domain(data.map((d) => { return d.Sepal_Length; }))
                            .range([VIS_HEIGHT,0]);

    // Create a color scale
    var color = d3.scaleOrdinal()
                  .domain(["setosa", "versicolor", "virginica"])
                  .range(["#1f77b4", "#ff7f0e", "#2ca02c"]);


    // add x axis 
   FRAME1.append("g") 
     //move the axis down to the page
        .attr("transform", "translate(" + MARGINS.left + 
              "," + (VIS_HEIGHT + MARGINS.top) + ")") 
        .call(d3.axisBottom(x))
          .attr("font-size", '20px'); 


  // add y axis
  FRAME1.append("g") 
    //move the axis down to the page
        .attr("transform", "translate(" + (MARGINS.left) + 
              "," + (MARGINS.top) + ")") 
        .call(d3.axisLeft(y).ticks(10)) 
          .attr("font-size", '20px'); 


    // Add the data points
    let scatter = FRAME1.selectAll("circle")
       .data(data)
       .enter()
       .append("circle")
        .attr("cx", d => x(+d.Sepal_Length))
        .attr("cy", d => y(+d.Petal_Length))
        .attr("r", 5)
        .attr("opacity", 0.5)
        .attr("fill", d => color(d.Species));

        // Add brush feature
        FRAME1.call(d3.brush()                 
                .extent([[0, 0], [FRAME_WIDTH, FRAME_HEIGHT]]) 
                .on("start brush", updateChart)
                .on("end", () => {})
            );
   
    // Add the chart title
    FRAME1.append("text")
        .attr("x", 300)
        .attr("y", 30)
        .attr("text-anchor", "middle")
        .text("Petal_Length vs Sepal_Length");


    // middle column
    const FRAME2 = d3.select('#vis2')
                  .append('svg')
                  .attr('height', FRAME_HEIGHT)
                  .attr('width', FRAME_WIDTH)
                  .attr('class', 'frame')



    const y1 = d3.scaleLinear()
                            .domain([0, d3.max(data, d => +d.Petal_Width)+0.2])
                            // .domain(data.map((d) => { return d.Petal_Length; }))
                            .range([VIS_HEIGHT,0]);

    const x1 = d3.scaleLinear()
                            .domain([0, d3.max(data, d => +d.Sepal_Width)+0.5])
                            // .domain(data.map((d) => { return d.Sepal_Length; }))
                            .range([0,VIS_WIDTH]);

    // Create a color scale
    var color = d3.scaleOrdinal()
                  .domain(["setosa", "versicolor", "virginica"])
                  .range(["#1f77b4", "#ff7f0e", "#2ca02c"]);


    // add x axis 
   FRAME2.append("g") 
     //move the axis down to the page
        .attr("transform", "translate(" + MARGINS.left + 
              "," + (VIS_HEIGHT + MARGINS.top) + ")") 
        .call(d3.axisBottom(x1))
        .attr("font-size", '20px'); 




  // add y axis
  FRAME2.append("g") 
    //move the axis down to the page
        .attr("transform", "translate(" + (MARGINS.left) + 
              "," + (MARGINS.top) + ")") 
        .call(d3.axisLeft(y1)) 
          .attr("font-size", '20px'); 


    // Add the data points
    let scatter1 = FRAME2.selectAll("circle")
       .data(data)
       .enter()
       .append("circle")
        .attr("cx", (d) => {
            return (MARGINS.left + x1(d.Sepal_Width))})
        .attr("cy", (d) => {
            return (MARGINS.top + y1(d.Petal_Width))})
        .attr("r", 5)
        .attr("opacity", 0.5)
        .attr("fill", d => color(d.Species));


    // Add brushing
    FRAME2.call(d3.brush()
             .extent( [ [0,0], [FRAME_WIDTH,FRAME_HEIGHT] ] )
             .on("start brush", updateChart)
           );

    // Function that is triggered when brushing is performed
    function updateChart(event) {
        extent = event.selection;
        scatter.classed("selected", function(d){ return isBrushed(extent, x1(d.Sepal_Width), y1(d.Petal_Width) ) } );
        scatter1.classed("selected", function(d){ return isBrushed(extent, x1(d.Sepal_Width), y1(d.Petal_Width) ) } );
        bars.classed("selected", function(d){ return isBrushed(extent, x1(d.Sepal_Width), y1(d.Petal_Width) ) } );
    }

    // A function that returns TRUE or FALSE according if a dot is in the selection or not
    function isBrushed(brush_coords, cx, cy) {
        var x0 = brush_coords[0][0],
            x1 = brush_coords[1][0],
            y0 = brush_coords[0][1],
            y1 = brush_coords[1][1]; 
        return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;
    }

        // Highlight brushed points
        function barLinked(extent, cx, cy) {
            let x0 = extent[0][0];
            let x1 = extent[1][0];
            let y0 = extent[0][1];
            let y1 = extent[1][1];
            return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;
        }
    // Add the chart title
    FRAME2.append("text")
        .attr("x", 300)
        .attr("y", 30)
        .attr("text-anchor", "middle")
        .text("Petal_Width vs Sepal_Width");


    const FRAME3 = d3.select("#vis3") 
                  .append("svg") 
                    .attr("height", FRAME_HEIGHT)   
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame");


    const ySCALE = d3.scaleLinear() 
                       .domain([0, 60])  
                       .range([VIS_HEIGHT, 0]);

    const xSCALE = d3.scaleBand()
                        .range([ 0, VIS_WIDTH ])
                        .domain(data.map(function(d) { return d.Species; }))
                        .padding(0.45);

    const BAR_WIDTH = 60;

    var color = d3.scaleOrdinal()
                  .domain(["setosa", "versicolor", "virginica"])
                  .range(["#1f77b4", "#ff7f0e", "#2ca02c"]);

    FRAME3.append("g")
         .attr("transform", "translate(" + MARGINS.left + 
          "," + (VIS_HEIGHT+ MARGINS.bottom) + ")")
         .call(d3.axisBottom(xSCALE))
         .selectAll("text")
           .attr("font-size", "20px");

    FRAME3.append("g")
       .attr("transform", "translate(" + MARGINS.left + "," + MARGINS.top + ")") 
         .call(d3.axisLeft(ySCALE))
         .selectAll("text")
           .attr("font-size", "20px");


    let bars = FRAME3.append("g").selectAll("bar")
      .data(data)
      .enter()
      .append("rect")
        .attr("x", function(d) { return xSCALE(d.Species) + MARGINS.left; })
        .attr("y", function(d) { return ySCALE(50) + MARGINS.top; })
        .attr("width", BAR_WIDTH)
        .attr("height", function(d) { return VIS_HEIGHT - ySCALE(50); })
        .attr("opacity", 0.5)
        .attr("fill", (d) => color(d.Species));


    // Add the chart title
    FRAME3.append("text")
        .attr("x", 300)
        .attr("y", 30)
        .attr("text-anchor", "middle")
        .text("Count of Species");
});

