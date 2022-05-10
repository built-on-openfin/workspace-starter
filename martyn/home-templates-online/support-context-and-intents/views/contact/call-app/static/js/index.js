




  function init() {
    let action = document.getElementById("action");
    let timeLabel = document.getElementById("time");
    let intervalId = null;
    let seconds = 0;
    let min;
    let sec;

    function update(){
        seconds++;
        min = Math.floor(seconds / 60);
        sec = seconds % 60;
        let displayMinutes = min < 10 ? `0${min}` : min;
        let displaySeconds = sec < 10 ? `0${sec}` : sec;
        timeLabel.innerText = displayMinutes + ":" + displaySeconds;
     };

     let startStopTimer = ()=> {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
            action.innerText = "Start Call";
            timeLabel.innerText = "00:00";
          } else {
              action.innerText = "End Call";
              seconds = 0;
              update();
              intervalId = setInterval(() => {
              update();
            }, 1000);
          }
     };

    action.onclick = startStopTimer;

  }
window.addEventListener('DOMContentLoaded', init);