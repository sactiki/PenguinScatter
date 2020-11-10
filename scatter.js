//attempt at getting finalgrades
/*var getgrade=function(name){
return name.grade
}
var finalgrade=function(name){
    var finaldata=name.final;
    var finalgrade=finaldata.map(getgrade);
    return finalgrade
}
*/
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
    .attr("r",2)
    
    
}
var scatter=function(students){
    //svg size variable
 var screen={width:600,height:600}
 
 
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
var successFCN=function(classData){
    console.log("penguins", classData)
    scatter(classData);   
}
var failFCN = function(error){
    console.log("error",error)
}
var classPromise=d3.json("classData.json")
classPromise.then(successFCN,failFCN)