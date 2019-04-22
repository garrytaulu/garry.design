// var date = new Date('April 27, 2019 03:59:00');
var date = new Date();
var day = date.getDay();
var hourNow = date.getHours();
var minutes = date.getMinutes();
var hourMins = hourNow + minutes/60
var greeting;


// Monday - Friday, 7am - 9am
if ((day >= 1 && day <= 5) && (hourMins >= 7 && hourMins < 9)) {
  greeting = "I’m probably preparing for work. ☕️";
}
// Monday - Friday, 9am - 5:30pm
else if ((day >= 1 && day <= 5) && (hourMins >= 9 && hourMins < 17.5)) {
  greeting = "I’m probably at work. 💻 ";
}
// Monday - Friday, 5:30pm - 6:30pm
else if ((day >= 1 && day <= 5) && (hourMins >= 17.5 && hourMins < 18.5)) {
  greeting = "I’m probably at work heading home from work. 🚆";
}
// Friday - Saturday, 8pm - 2am
else if (((day == 5 || day == 6) && (hourMins >= 19 && hourMins < 24)) || ((day == 6 || day == 0) && (hourMins >= 0 && hourMins < 3))) {
  greeting = 'I’m probably <s class="nah">partying</s> on <a href="https://twitter.com/garrytaulu/">Twitter</a>.';
}
// Monday - Friday, 1am - 7am
else if (hourMins >= 1 && hourMins < 7) {
  greeting = "I’m probably in bed. 🛌 😴";
}
else if (hourMins >= 17.5 && hourMins < 19) {
  greeting = "I’m probably thinking about what to have for dinner. 🍽";
}
else if (hourMins >= 19 && hourMins < 20) {
  greeting = "I'm probably eating dinner. 🥘 🍣 🍔 🍷 🍺 🥃";
}
// Saturday, 1pm - 7pm
else if ((day == 6) && (hourMins >= 13 && hourMins < 19)) {
  greeting = 'I could be out-and-about, otherwise — <a href="https://twitter.com/garrytaulu/">Twitter</a>.';
}
else {
  greeting = 'I\'m most likely reading, designing, coding or watching something. Otherwise — <a href="https://twitter.com/garrytaulu/">Twitter</a>.';
}

window.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById("status").innerHTML = "At this time of day " + greeting;
});
