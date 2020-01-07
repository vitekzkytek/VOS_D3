var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 700 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;



function drawChart() {
    
    var svg = d3.select("#container")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
  
    var x = d3.scaleLinear()
        .domain([-1.1, 1.4])
        .range([ 0, width ]);
    
    var y = d3.scaleLinear()
        .domain([1, -0.6])
        .range([ 0, height ]);

    var size = d3.scaleLinear()
        .domain([50,1700])
        .range([1.5,50])

    var colors = {
        1:'#DB4437',
        2:'#4285F4',
        3:'#F4B400',
        4:'#0F9D58',
        5:'#581845',
    }

    var tooltip = d3.select("#container").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);


    var tipOver = function(d) {
        tooltip.html(d.description)
            .style("left", (d3.event.pageX + 15) + "px")
            .style("top", (d3.event.pageY - 28) + "px")
          .transition()
            .duration(200) // ms
            .style("opacity", .9) // started as 0!
    };


    var tipOut = function(d) {
        tooltip.transition()
            .duration(300) // ms
            .style("opacity", 0); // don't care about position!
    };

    svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('class','dot')
        .attr('cx',function(d) {return x(d.x) })
        .attr('cy',function(d) {return y(d.y) })
        .attr('r',function(d) {
            return size(Math.sqrt(d.weight_no_pub))
        })
        .attr('fill',function(d) { return colors[d.cluster]})
        .on('mouseover',tipOver)
        .on('mouseout',tipOut);

}