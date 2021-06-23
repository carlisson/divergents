var sw = {
  // (A) INITIALIZE
  etime : null, // HTML time display
  erst : null, // HTML reset button
  ego : null, // HTML start/stop button
  init : function () {
    // (A1) GET HTML ELEMENTS
    sw.etime = document.getElementById("sw-time");
    sw.erst = document.getElementById("sw-reset");
    sw.ego = document.getElementById("sw-play");
    sw.tbar = document.getElementById("sw-bar");
    sw.display = document.getElementById("main-display");

    // (A2) ENABLE BUTTON CONTROLS
    sw.erst.addEventListener("click", sw.reset);
    sw.erst.classList.remove("disabled");
    sw.ego.addEventListener("click", sw.start);
    sw.ego.classList.remove("disabled");
  },

  // (B) TIMER ACTION
  timer : null, // timer object
  now : 0, // current elapsed time
  zero: true, //Initial state
  tick : function () {
	var total = document.getElementById("talktime").value * 60;
    // (B1) CALCULATE HOURS, MINS, SECONDS
    if (sw.zero) {
		sw.now = total;
		sw.display.classList.remove('bg-dark', "bg-warning");
		sw.zero = false;
    } else {
		sw.now--;
	}
    var remain = sw.now;
    var hours = Math.floor(remain / 3600);
    remain -= hours * 3600;
    var mins = Math.floor(remain / 60);
    remain -= mins * 60;
    var secs = remain;

    // (B2) UPDATE THE DISPLAY TIMER
    if (hours<10) { hours = "0" + hours; }
    if (mins<10) { mins = "0" + mins; }
    if (secs<10) { secs = "0" + secs; }
    sw.etime.innerHTML = hours + ":" + mins + ":" + secs;
    sw.tbar.value = 100 * sw.now/total;
    if (sw.now == 0) {
		sw.stop();
		sw.display.classList.add('bg-dark');
		sw.display.classList.remove('bg-warning');
		sw.zero = true;
	} else if (sw.now < 10+total/20) {
		sw.display.classList.add('bg-warning');
	}
  },
  
  // (C) START!
  start : function () {
    sw.timer = setInterval(sw.tick, 1000);
    sw.ego.value = "Parar";
    sw.ego.removeEventListener("click", sw.start);
    sw.ego.addEventListener("click", sw.stop);
    
  },

  // (D) STOP
  stop  : function () {
    clearInterval(sw.timer);
    sw.timer = null;
    sw.ego.value = "Iniciar";
    sw.ego.removeEventListener("click", sw.stop);
    sw.ego.addEventListener("click", sw.start);
  },

  // (E) RESET
  reset : function () {
    if (sw.timer != null) { sw.stop(); }
    sw.zero = true;
    sw.tick();
  }
};
window.addEventListener("load", sw.init);
