d3.select("#fhw")
    .on("click", function(){
    d3.select("#scatter")
        .classed("hidden1",false)
    d3.select("#scatter2")
        .classed("hidden2",true)
})
d3.select("#hwq")
    .on("click",function(){
    d3.select("#scatter")
        .classed("hidden1",true)
    d3.select("#scatter2")
        .classed("hidden2",false)
})
    
//attempt at getting hwmeans
var hwmean=function(name){
    var hwdata=name.homework;
    var listhwgrades=hwdata.map(getgrade);
    var hwmean=d3.mean(listhwgrades);
    return hwmean
}

var drawPlot=function(students,screen,xScale,yScale){
    d3.select("#scatter")
    .selectAll("circle")
    .data(students)
    .enter()
    .append("circle")
    .attr("cx",function(name){
        var getgrade=function(name){
            return name.grade}
var finaldata=name.final;
    var finalgrade=finaldata.map(getgrade);
        
        return xScale(finalgrade);
    })
    .attr("cy",function(name){
         var getgrade=function(name){
            return name.grade}
        var hwdata=name.homework;
    var listhwgrades=hwdata.map(getgrade);
    var hwmean=d3.mean(listhwgrades);
        return yScale(hwmean);
    })
    .attr("r",4)   
    
    .on("mouseenter",function(students){
        console.log("hovering");
        var xPos=d3.event.pageX;
        var yPos=d3.event.pageY;
        d3.select("#tooltip")
        .classed("hidden",false)
        .style("top",yPos+"px")
        .style("left",xPos+"px")
        
        d3.select("#photo")
        .append("img")
        .attr("src",function(){
            return "imgs/" + students.picture
            
        })
        .attr("class","deleteme")
        
    })
    .on("mouseout",function(){
        d3.select("#tooltip").classed("hidden",true)
        d3.select(".deleteme").remove();
    })
    
}
var drawPlot2=function(students,screen,xScale,yScale){
    d3.select("#scatter2")
    .selectAll("circle")
    .data(students)
    .enter()
    .append("circle")
    .attr("cy",function(name){
        var getgrade=function(name){
            return name.grade}
var qdata=name.quizes;
    var listqgrades=qdata.map(getgrade);
    var quizesmean=d3.mean(listqgrades);
        
        return yScale(quizesmean);
    })
    .attr("cx",function(name){
         var getgrade=function(name){
            return name.grade}
        var hwdata=name.homework;
    var listhwgrades=hwdata.map(getgrade);
    var hwmean=d3.mean(listhwgrades);
        return xScale(hwmean);
    })
    .attr("r",4)   
    
    .on("mouseenter",function(students){
        console.log("hovering");
        var xPos=d3.event.pageX;
        var yPos=d3.event.pageY;
        d3.select("#tooltip")
        .classed("hidden",false)
        .style("top",yPos+"px")
        .style("left",xPos+"px")
        
        d3.select("#photo")
        .append("img")
        .attr("src",function(){
            return "imgs/" + students.picture
            
        })
        .attr("class","deleteme")
        
    })
    .on("mouseout",function(){
        d3.select("#tooltip").classed("hidden",true)
        d3.select(".deleteme").remove();
    })
    
}
var scatter=function(students){
    //svg size variable
 var screen={width:600,height:600}
 var margins={top:20,bottom:40,left:70,right:40}
 
 //sets svg size
    d3.select("#scatter")
    .attr("width",screen.width)
    .attr("height",screen.height)
   
    
    var xScale=d3.scaleLinear()
        .domain([0,100])
        .range([0,screen.width])
    var yScale=d3.scaleLinear()
        .domain([0,50])
        .range([screen.height,0])
    
    
    
    drawPlot(students,screen,xScale,yScale);
}
var scatter2=function(students){
       //svg size variable
 var screen={width:600,height:600}
 var margins={top:20,bottom:40,left:70,right:40}
 
 //sets svg size
    d3.select("#scatter2")
    .attr("width",screen.width)
    .attr("height",screen.height)
   
    
    var xScale=d3.scaleLinear()
        .domain([0,50])
        .range([0,screen.width])
    var yScale=d3.scaleLinear()
        .domain([0,10])
        .range([screen.height,0])
    
    
    
    drawPlot2(students,screen,xScale,yScale); 
    
    
    
}
var successFCN=function(classData){
    console.log("penguins", classData)
    scatter(classData); 
    scatter2(classData);
}
var failFCN = function(error){
    console.log("big error",error)
}
var classPromise=d3.json("classData.json");
classPromise.then(successFCN,failFCN);