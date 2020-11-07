// // Read in json file and grab all data for the demographic info section

    function AllData(userinput){
      d3.json("samples.json").then(function(data){
        var bellydata = data.metadata;
        // console.log(bellydata)
        var AllData = bellydata.filter(function(x){
          return x.id == userinput;
        });
          
        var currentrow = AllData[0];

        var demobox = d3.select("#sample-metadata");
        demobox.html("")
        Object.entries(currentrow).forEach(function([x, y]){
          return demobox.append("h4").text(`${x}: ${y}`);
        });
        
      });
    }
     // Activate the dropdown menu choices by the user

    function init() {
    
      var selector = d3.select("#selDataset");
      d3.json("samples.json").then(function(data){
        var IDNames = data.names;
        IDNames.forEach(function(userchoice){
            selector
             .append("option")
              .text(userchoice)
             .property("value", userchoice);
        });
    var beginning = IDNames[0];
    ChartInfo(beginning);
    AllData(beginning);
    });
  }

     console.log("BREAK")   
  //  create a function that makes all stuff needed for the charts.
    function ChartInfo(userinput) {
      d3.json("samples.json").then(function(bdata){
        var datavalues = bdata.samples;
        var AllData = datavalues.filter(function(x){
          return x.id == userinput
        });
        var bellydata2 = AllData[0];
        var ids = bellydata2.otu_ids;
        var labels = bellydata2.otu_labels;
        var SampleValues = bellydata2.sample_values;
        // console.log(otu_ids)
        
        // Horizontal Bar Braph
        // Slice and reverse to get the top 10 results
        var FinalX = SampleValues.slice(0, 10).reverse();
        var ymap = ids.map(function(y){
          return `OTU ${y}`
        });
        // var FinalY = ids.slice(0, 10).map(y => `OTU ${y}`).reverse();
        var FinalY = ymap.slice(0,10).reverse();
        var FinalLabels = labels.slice(0,10).reverse();
        var trace1 = {
            x : FinalX,
            y : FinalY,
            text: FinalLabels,
            type: "bar",
            orientation: "h"
        };
        var horizontaldata = [trace1];
        Plotly.newPlot("bar", horizontaldata);

       

      // Bubble Chart Info
        var trace2 = {
          x: ids,
          y: SampleValues,
          text: labels,
          mode: "markers",
          marker: {
            size: SampleValues,
            color: ids,
            colorscale: "Portland"
          }
        };
        var bubblechart = [trace2];
        Plotly.newPlot("bubble", bubblechart);
      });

    };
   
  
// optionChanged is the name in the html function to update the option when the user clicks the next id. 
  function optionChanged(NextSample){
    ChartInfo(NextSample);
    AllData(NextSample);

  }

init();
    



 
