/*eslint-env jquery, browser*/

// takes standard UX time and converts to easily readable format
const timeDifference = function(current, previous) {

  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;
  const elapsed = current - previous;
    
  let timeElapsed = "";
  let desc = "";
 
  if (elapsed < msPerMinute) {
    return 'less than a minute ago';
  } else {
    if (elapsed < msPerHour) {
      timeElapsed =  Math.round(elapsed / msPerMinute);
      desc = ' minute';
    } else if (elapsed < msPerDay) {
      timeElapsed = Math.round(elapsed / msPerHour);
      desc = ' hour';
    } else if (elapsed < msPerMonth) {
      timeElapsed = Math.round(elapsed / msPerDay);
      desc = ' day';
    } else if (elapsed < msPerYear) {
      timeElapsed = Math.round(elapsed / msPerMonth);
      desc = ' month';
    } else {
      timeElapsed = Math.round(elapsed / msPerYear);
      desc = ' year';
    }
    timeElapsed === 1 ? desc += ' ago' : desc += 's ago';
    return `${timeElapsed} ${desc}`;
  }
};

//adds additional choice field if last choice is focused
$(document).ready(function() {
  let counter = 2;
  $('#questions').on('focus', '.choice:last', function() {
    counter++;
    $('#questions').append($(`<input class="uk-input choice" type="text" placeholder="Choice #${counter}" maxlength="200" name="choice${counter}">`).hide().fadeIn(1000));
    $('#questions').append($(`<input class="uk-input description" type="text" placeholder="Enter an optional description" maxlength="200" name="choice${counter}desc">`).hide().fadeIn(1000));
  });
});
  
// creates random 6-character key
const generateUid = function() {
  return Math.floor((1 + Math.random()) * 0x1000000).toString(16).substring(1);
};

$(document).on('moved', '.uk-sortable', function() {
  const list = document.getElementsByClassName("list");
  const choicePositions = [];
  for (let i = 0; i < list.length - 1; ++i) {
    let choiceObj = {};
    choiceObj["id"] = list[i].id;
    choiceObj["score"] = list.length - i - 1;
    choicePositions.push(choiceObj);
  }
  let stringArr = JSON.stringify(choicePositions);
  $("#voteObj").attr("value", stringArr);
  console.log(choicePositions);
});