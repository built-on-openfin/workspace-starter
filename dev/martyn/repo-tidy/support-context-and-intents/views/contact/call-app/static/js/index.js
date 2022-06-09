function init() {
  const action = document.querySelector('#action');
  const timeLabel = document.querySelector('#time');
  let intervalId = null;
  let seconds = 0;
  let min;
  let sec;

  function update() {
    seconds++;
    min = Math.floor(seconds / 60);
    sec = seconds % 60;
    const displayMinutes = min < 10 ? `0${min}` : min;
    const displaySeconds = sec < 10 ? `0${sec}` : sec;
    timeLabel.textContent = `${displayMinutes}:${displaySeconds}`;
  }

  const startStopTimer = () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
      action.textContent = 'Start Call';
      timeLabel.textContent = '00:00';
    } else {
      action.textContent = 'End Call';
      seconds = 0;
      update();
      intervalId = setInterval(() => {
        update();
      }, 1000);
    }
  };

  action.addEventListener('click', startStopTimer);
}
window.addEventListener('DOMContentLoaded', init);
