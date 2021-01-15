        
function dropdown_options() {
    // select dropdown menu 
    var dropdown = d3.select("#selDataset");

    // read the data 
    d3.json("samples.json").then((data)=> {
        console.log(data)

        // get the id data to the dropdwown menu
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

    });
}

dropdown_options();

function visualization() {

   
    // read the data 
    d3.json("samples.json").then((data)=> {

        var dropdownMenu = d3.select("#selDataset");
        // Assign the value of the dropdown menu option to a variable
        var dropdown_selection = dropdownMenu.property("value");

        console.log(`the sample is ${dropdown_selection}`);

        const sample_index = (element) => element === dropdown_selection;
        names_arr = data.names;
        selected_index = names_arr.findIndex(sample_index);

        console.log(`the index is ${selected_index}`);

        var demoInput = data.metadata;
        console.log(demoInput[selected_index].ethnicity);

        var PANEL = d3.select('#sample-metadata');
        PANEL.html('')
        PANEL.append('h6').text(`Ethnicity: ${demoInput[selected_index].ethnicity}`);
        PANEL.append('h6').text(`Gender: ${demoInput[selected_index].gender}`);
        PANEL.append('h6').text(`Age: ${demoInput[selected_index].age}`);
        PANEL.append('h6').text(`Location: ${demoInput[selected_index].location}`);
        PANEL.append('h6').text(`bbtype: ${demoInput[selected_index].bbtype}`);
        PANEL.append('h6').text(`wfreq: ${demoInput[selected_index].wfreq}`);


        var yValue = data.samples[selected_index].otu_ids.slice(0,10);
        console.log(`this is the y value ${yValue}`)
        var xValue = data.samples[selected_index].sample_values.slice(0,10);

        var trace1 = {
            x: xValue,
            y: yValue,
            type: 'bar',
            text: yValue.map(String),
            textposition: 'auto',
            hoverinfo: 'none',
            orientation: 'h',      
            marker: {
              color: 'rgb(158,202,225)',
              opacity: 0.6,
              line: {
                color: 'rgb(8,48,107)',
                width: 1.5
              }
            }
          };
          
          var data1 = [trace1];
          
          var layout = {
            title: `Belly Button Biodiversity for ${dropdown_selection}`,
            barmode: 'relative',
            yaxis: {type:'category',
                    autorange:'reversed'}
          };
          
          Plotly.newPlot('bar', data1, layout);

          var trace2 = {
            x: xValue,
            y: yValue,
            mode: 'markers',
            marker: {
              color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
              opacity: [1, 0.8, 0.6, 0.4],
              size: [40, 60, 80, 100]
            }
          };
          
          var data2 = [trace2];
          
          var layout = {
            title: 'Marker Size and Color',
            showlegend: false,
            height: 600,
            width: 600
          };
          
          Plotly.newPlot('bubble', data2, layout);


    });

    
}

visualization()

d3.selectAll("#selDataset").on("change", visualization);

