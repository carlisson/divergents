var tl = {
  normal: true,
  init : function () {

    tl.entry = document.getElementById("tl-entry");
    tl.button = document.getElementById("tl-button");
    tl.inter = document.getElementById("tl-inter");
    tl.list = document.getElementById("tl-list");
    tl.next = document.getElementById("tl-next");
    tl.now = document.getElementById("tl-person");

    tl.entry.addEventListener("keypress", tl.checkEnter);
    tl.button.addEventListener("click", tl.addTalker);

    tl.next.addEventListener("click", tl.nextTalker);

    tl.inter.addEventListener("click", tl.intervention);
    tl.inter.classList.remove("disabled");

  },

  checkEnter : function () {
    if (event.keyCode == 13) {
        tl.addTalker();
    }
  },

  addTalker  : function () {
	if (tl.entry.value != "") {
		var lp = tl.entry.value;
		tl.entry.value = "";
		var ntalker = document.createElement("button");
		ntalker.classList.add("btn", "btn-secondary");
		ntalker.innerHTML = "<i class='icon icon-delete'></i> " + lp + "</button>";
		ntalker.addEventListener("click", function() {
			if (confirm("Retirar mesmo " + lp + " da lista de inscritos?")) {
				this.parentNode.removeChild(this);
				tl.updateTalkers();
			}
		});
		tl.list.appendChild(ntalker);
		tl.updateTalkers();
	}
  },

  nextTalker : function () {
	 var tlelem = tl.list.firstElementChild;
     tl.now.innerHTML = tlelem.innerHTML.replace('<i class="icon icon-delete"></i>', '');
     tl.list.removeChild(tlelem);
     tl.updateTalkers();
     if (sw) {
		 sw.reset();
		 sw.start();
	 }
  },
  
  updateTalkers : function () {
	  var talkers = tl.list.childElementCount;
	  if (talkers == 0) {
		talkers = "";
		tl.next.classList.add("disabled");
	  } else {
		tl.next.classList.remove("disabled");
	  }
	  tl.now.setAttribute("data-badge", talkers);
  },
  
  intervention: function() {
	  if (tl.normal) {
		  tl.inter.value = "Restaurar";
		  tl.next.classList.add("disabled");
		  tl.now.classList.add("text-gray");
	  } else {
		  tl.inter.value = "Intervir";
          tl.next.classList.remove("disabled");
		  tl.now.classList.remove("text-gray");
	  }
	  if (sw) {
		  sw.stop();
	  }
	  tl.normal = ! tl.normal;
  }
};
window.addEventListener("load", tl.init);
