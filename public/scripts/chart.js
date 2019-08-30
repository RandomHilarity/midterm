/*eslint-env jquery, browser*/

/* window.onload = function () {
	
  let chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
        
    title:{
      text:"Results (Total Score)"
    },
    axisX:{
      interval: 1
    },
    data: [{
      type: "bar",
      name: "companies",
      axisYType: "secondary",
      color: "#014D65",
      dataPoints: [
        { y: 20, label: "Pizza" },
        { y: 10, label: "Sushi" },
        { y: 30, label: "Pho" }
      ]
    }]
  });
  chart.render();
     
}; */
const getPollData = function(callback) {
  const href = window.location.href;
  const hrefArray = href.split('/');
  const pollId = hrefArray[hrefArray.length - 2];

  $.getJSON(`/poll/${pollId}/json`, (data) => {
    console.log("DATATA", data);
    const canvasData = data.map(pollRes => ({
      y: pollRes.total_count,
      label: pollRes.answer
    }));
    callback(canvasData)
  })
    .fail(() => [
      { y: 20, label: "Pizza" },
      { y: 10, label: "Sushi" },
      { y: 30, label: "Pho" }
    ]);
};

const showChart = function(dataPoints) {
    const chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
              
        title:{
          text:"Results (Total Score)"
        },
        axisX:{
          interval: 1
        },
        data: [{
          type: "bar",
          name: "companies",
          axisYType: "secondary",
          color: "#014D65",
          dataPoints
        }]
      });
      chart.render();
};

window.onload = function () {
    getPollData(showChart);
};

/*   window.onload = function(){
    chart.data[0].addTo("dataPoints", {x: chart.data[0].dataPoints[chart.data[0].dataPoints.length-1].x + 10, y: Math.random() * (100 - 10) + 10})
     });
} */