/*eslint-env jquery, browser*/

// gets poll data from provided data and generates chart

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