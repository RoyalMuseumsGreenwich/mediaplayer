$(function() {

	//	Variables
	var idleTime = 0;
	var playing = true;

	var videoMain = $('#videoMain').get(0);
	var videoBsl = $('#videoBsl').get(0);

	var $playPauseBtn = $('#playPauseBtn');
	var $seekSlider = $('#seekSlider');
	var $curTimeText = $('#curTimeText');
	var $durTimeText = $('#durTimeText');


	//	UI event listeners
	$('#playPauseBtn').click(function() {
		playPause();
	});

	$('#restartBtn').click(function() {
		videoMain.currentTime = 0;
		videoBsl.currentTime = 0;
	});

	$("#captions").click(function() {
		$("#captions").toggleClass("active")
	});

	$('#bslBtn').click(function() {
		console.log("Toggling BSL video...");
		$('#videoBsl').toggleClass('hidden');
		$('#bslBtn').toggleClass('active');
	});

	$('#captionBtn').click(function() {
		console.log("Toggling captions...");
		$('#captionDisplay').toggleClass('hidden');
		$('#captionBtn').toggleClass('active');
	});

	$('#menuBtn').click(function() {
		backToMenu();
	});

	$seekSlider.on('change', vidSeek);

	$('#videoMain').on('timeupdate',seekTimeUpdate);


	//	Video controls
	function playPause() {
		if(playing){
			stopVids();
		} else {
			playVids();
		}
	}

	function playVids() {
		console.log("Playing vids");
		playing = true;
		videoMain.play();
		videoBsl.play();
		$playPauseBtn.removeClass("play");
		$playPauseBtn.addClass("pause");
	}

	function stopVids() {
		console.log("Stopping vids");
		playing = false;
		videoMain.pause();
		videoBsl.pause();
		$playPauseBtn.removeClass("pause");
		$playPauseBtn.addClass("play");
	}

	function backToMenu() {
		$('#menuScreen').fadeIn('slow', function() {
			stopVids();
		});
	}

	function initializePlayer() {

	}

	function vidSeek(){
		var seekTo = videoMain.duration * ($seekSlider.get(0).value / 1000);
		videoMain.currentTime = seekTo;
		videoBsl.currentTime = seekTo;
	}

	function seekTimeUpdate(){
		$seekSlider.trigger('input');
		var nt = videoMain.currentTime * (1000 / videoMain.duration);
		$seekSlider.get(0).value = nt;
		var pb = nt / 10;
		$("#ui-slider-range").attr('style', 'width: ' + pb + '% !important');
		 $("#seekslider").css({'backgroundSize': pb + '% 100%' });
		
		var curmins = Math.floor(videoMain.currentTime / 60);
		var cursecs = Math.floor(videoMain.currentTime - curmins * 60);
		var durmins = Math.floor(videoMain.duration / 60);
		var dursecs = Math.floor(videoMain.duration - durmins * 60);
		if(cursecs < 10){ cursecs = "0"+cursecs; }
		if(dursecs < 10){ dursecs = "0"+dursecs; }
		if(curmins < 10){ curmins = "0"+curmins; }
		if(durmins < 10){ durmins = "0"+durmins; }
		$curTimeText.text(curmins+":"+cursecs);
		$durTimeText.text(durmins+":"+dursecs);
	}

	$seekSlider.on('input', function(e){
	  var min = e.target.min,
	      max = e.target.max,
	      val = e.target.value;
	  
	  $seekSlider.css({
	    'backgroundSize': (val - min) * 100 / (max - min) + '% 100%'
	  });
	}).trigger('input');

  $seekSlider.css({
    'backgroundSize': '0% 100%'
  });


  //	Caption control

  $('#subtitleTrack').on('cuechange', function() {
    var myTrack = this.track;             // track element is "this"
    var myCues = myTrack.activeCues;      // activeCues is an array of current cues.
		myTrack.mode = "hidden";
	  $("#captionDisplay").empty();
    if (myCues.length > 0) {
			$("#captionDisplay").empty().append(myCues[0].getCueAsHTML());
    }
  });


	// document.addEventListener("DOMContentLoaded", function () {  // don't run this until all DOM content is loaded
 //    var track = document.getElementById("track1");
 //    track.addEventListener("cuechange", function () {
 //      var myTrack = this.track;             // track element is "this"
 //      var myCues = myTrack.activeCues;      // activeCues is an array of current cues.
	// 		myTrack.mode = "hidden";
	// 	  $("#display").empty();
 //      if (myCues.length > 0) {
	// 			$("#display").empty().append(myCues[0].getCueAsHTML());
 //      }
 //    }, false);
 //  }, false);


	//	Idle timer - playback controls hide
	$(document).ready(function () {
    //Increment the idle time counter every seconds.
    var idleInterval = setInterval(timerIncrement, 1000); // 1 second

    //Zero the idle timer on mouse movement.
    $(this).mousemove(function (e) {
      idleTime = 0;
    });
    $(this).keypress(function (e) {
      idleTime = 0;
			$("#video_controls_bar").removeClass("hide-controls");
  	});
	});

	function timerIncrement() {
    idleTime = idleTime + 1;

    console.log(idleTime);


    $(this).keypress(function (e) {
			$("#vidControls").removeClass("hiddenControls");
			$('#menuBtnDiv').removeClass('hiddenMenuBtn');
			$("#display").removeClass("captions-no-controls");
			$("#background-shadow").removeClass("hide-shadow");
	  });

    $(this).mousemove(function (e) {
      $("#vidControls").removeClass("hiddenControls");
			$('#menuBtnDiv').removeClass('hiddenMenuBtn');
			$("#display").removeClass("captions-no-controls");
			$("#background-shadow").removeClass("hide-shadow");
    });

    if (idleTime > 4) { // 5 seconds
			if (playing){
    		$("#vidControls").addClass("hiddenControls");
				$('#menuBtnDiv').addClass('hiddenMenuBtn');
				$("#display").addClass("captions-no-controls");
				$("#background-shadow").addClass("hide-shadow");
			}

    }
	}

});





