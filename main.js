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

           // .attr("cx", function(d) { return petal_length(d.Sepal_Length) + MARGINS.bottom; })
           // .attr("cy", function(d) { return sepal_length(d.Petal_Length) + MARGINS.left; })
           // .attr("r", 5)
           // .style("fill", function(d) { return color(d.Species); })
           // .style("opacity", 0.5);


   
    // Add the chart title
    FRAME2.append("text")
        .attr("x", 300)
        .attr("y", 30)
        .attr("text-anchor", "middle")
        .text("Petal_Width vs Sepal_Width");

  });


// right column
const FRAME3 = d3.select('#vis3')
                  .append('svg')
                  .attr('height', FRAME_HEIGHT)
                  .attr('width', FRAME_WIDTH)
                  .attr('class', 'frame')



// Reading from a file
d3.csv("data/iris.csv").then((data) => { 

    const X_SCALE = d3.scaleBand() 
                    .domain(data.map((d) => { return d.Species; })) 
                    .range([0, VIS_WIDTH]); 
           
    const Y_SCALE = d3.scaleLinear() 
                      .domain([50, 0]) 
                      .range([0, VIS_HEIGHT]); 

    // Create a color scale
    var color = d3.scaleOrdinal()
                  .domain(["setosa", "versicolor", "virginica"])
                  .range(["#1f77b4", "#ff7f0e", "#2ca02c"]);



    FRAME3.selectAll("bar")  
          .data(data) 
          .enter()       
          .append("rect")  
            .attr("y", (d) => { return Y_SCALE(d.amount) + MARGINS.bottom; }) 
            .attr("x", (d) => { return X_SCALE(d.category) + MARGINS.left;}) 
            .attr("height", (d) => { return VIS_HEIGHT; })
            .attr("width", X_SCALE.bandwidth())
            .attr("class", "bar");


    // add x axis 
   FRAME3.append("g") 
     //move the axis down to the page
        .attr("transform", "translate(" + MARGINS.left + 
              "," + (VIS_HEIGHT + MARGINS.top) + ")") 
        .call(d3.axisBottom(x))
        .attr("font-size", '20px'); 

  // add y axis
  FRAME3.append("g") 
    //move the axis down to the page
        .attr("transform", "translate(" + (MARGINS.left) + 
              "," + (MARGINS.top) + ")") 
        .call(d3.axisLeft(y)) 
          .attr("font-size", '20px'); 


   
    // Add the chart title
    FRAME3.append("text")
        .attr("x", 300)
        .attr("y", 30)
        .attr("text-anchor", "middle")
        .text("setosa vs versicolor vs virginica");

  });


