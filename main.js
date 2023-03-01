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
    FRAME1.selectAll("circle")
       .data(data)
       .enter()
       .append("circle")
        .attr("cx", d => x(+d.Sepal_Length))
        .attr("cy", d => y(+d.Petal_Length))
        .attr("r", 5)
        .attr("opacity", 0.5)
        .attr("fill", d => color(d.Species));

           // .attr("cx", function(d) { return petal_length(d.Sepal_Length) + MARGINS.bottom; })
           // .attr("cy", function(d) { return sepal_length(d.Petal_Length) + MARGINS.left; })
           // .attr("r", 5)
           // .style("fill", function(d) { return color(d.Species); })
           // .style("opacity", 0.5);


   
    // Add the chart title
    FRAME1.append("text")
        .attr("x", 300)
        .attr("y", 30)
        .attr("text-anchor", "middle")
        .text("Petal_Length vs Sepal_Length");

  });




// middle column
const FRAME2 = d3.select('#vis2')
                  .append('svg')
                  .attr('height', FRAME_HEIGHT)
                  .attr('width', FRAME_WIDTH)
                  .attr('class', 'frame')


// Reading from file
d3.csv('data/iris.csv').then((data)=> {

    const y = d3.scaleLinear()
                            .domain([0, d3.max(data, d => +d.Petal_Width)+0.2])
                            // .domain(data.map((d) => { return d.Petal_Length; }))
                            .range([VIS_HEIGHT,0]);

    const x = d3.scaleLinear()
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
        .call(d3.axisBottom(x))
        .attr("font-size", '20px'); 




  // add y axis
  FRAME2.append("g") 
    //move the axis down to the page
        .attr("transform", "translate(" + (MARGINS.left) + 
              "," + (MARGINS.top) + ")") 
        .call(d3.axisLeft(y)) 
          .attr("font-size", '20px'); 


    // Add the data points
    FRAME2.selectAll("circle")
       .data(data)
       .enter()
       .append("circle")
        .attr("cx", (d) => {
            return (MARGINS.left + x(d.Sepal_Width))})
        .attr("cy", (d) => {
            return (MARGINS.top + y(d.Petal_Width))})
        .attr("r", 5)
        .attr("opacity", 0.5)
        .attr("fill", d => color(d.Species));



   
    // Add the chart title
    FRAME2.append("text")
        .attr("x", 300)
        .attr("y", 30)
        .attr("text-anchor", "middle")
        .text("Petal_Width vs Sepal_Width");

    var svg = d3.select("#vis2")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
     .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");


  // Add brushing
    svg.call(d3.brush()
        .extent( [ [0,0], [FRAME_WIDTH,FRAME_HEIGHT] ] ) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
        .on("start brush", updateChart)) // Each time the brush selection changes, trigger the 'updateChart' function

      // Function that is triggered when brushing is performed
      function updateChart() {
       extent = d3.event.selection
       circle.classed("selected", function(d){ return isBrushed(extent, x(d.Sepal_Length), y(d.Petal_Length) ) } )
      }

      // A function that return TRUE or FALSE according if a dot is in the selection or not
     function isBrushed(brush_coords, cx, cy) {
          var x0 = brush_coords[0][0],
               x1 = brush_coords[1][0],
               y0 = brush_coords[0][1],
            y1 = brush_coords[1][1];
          return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;
     }

  });



