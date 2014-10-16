////////////////////////////////////////////
// Code and content Copyright © 2008 
// Author Rajesh Lal
// Email: connectrajesh@hotmail.com 
// Should not be distributed for commercial use without prior permission from the author
////////////////////////////////////////////
// Add your gadget to http://innovatewithgadget.com to share with everyone
// Keep the 'aboutgadget' DIV in the Settings page, if you wish to distribute personal gadget
// Check latest gadgets shared by other users at at www.innovatewithgadgets.com
////////////////////////////////////////////

var currentStation;
var currentVolume = "50";
var CodeCurrentId=0; 
var stationNames = new Array();
var	stationURLs = new Array();

System.Gadget.onSettingsClosed = settingsClosed;

function settingsClosed(event)
{
    if (event.closeAction == event.Action.commit)
        {
            reloadStation();
            PlayRadio();
        }
}


function loadMain()
{	
	DefaultStations();
	loadCurrentStation();
	dockStateChange(); 

	System.Gadget.onDock = dockStateChange;
	System.Gadget.onUndock = dockStateChange;
    
	System.Gadget.settingsUI = "Settings.html";
    System.Gadget.onSettingsClosed = settingsClosed;
}
function reloadStation()
{
loadCurrentStation();
dockStateChange(); 
}


function loadCurrentStation()
{
	var currentStation = System.Gadget.Settings.read("stationName");
	var currentURL = System.Gadget.Settings.read("stationURL");
	
	if (currentURL == "") 
	{
		currentStation = stationNames[0];
		currentURL = stationURLs[0];
	}
	setMediaPlayer(currentURL);
}


function setMediaPlayer(stationURL)
{
	mediaPlayer.url = stationURL;
	changeVolume(currentVolume);
	minus.title = "Volume down: " + currentVolume
    plus.title = "Volume up: " + currentVolume
	updateNowPlaying();
}



function DefaultStations()
{

    stationNames.length=0;
    stationURLs.length =0;
     
	stationNames[0] = "Groove Salad: a nicely chilled plate of ambient beats and grooves. [SomaFM]";
	stationURLs[0]  = "http://scfire-nyk-aa03.stream.aol.com:80/stream/1018";

	System.Gadget.Settings.write("stationName",stationNames[0]);
	System.Gadget.Settings.write("stationURL",stationURLs[0]);

    stationNames[1] = ".977 The Hitz Channel";
	stationURLs[1]  = "http://scfire-dll-aa03.stream.aol.com:80/stream/1074";
	
	stationNames[2] = "City 101.6 FM";
	stationURLs[2]  = "http://asx.abacast.com/arabian_radio-city-24.asx";

}

function dockStateChange()
{
	 // docked
        with(document.body.style)
			width=135,
			height=88;
		with(bkgImage.style)
			width=135,
			height=88;
			bkgImage.src = "images/background.png";
		with(playbackStatus.style)
			left=26,
			top=10,
			width=80;
		with(nowPlaying.style)
			left=8,
			top=36,
			width=120;
		with(playbackControls.style)
			left=63,
			top=68;
		with(plus.style)
			left=101,
			top=70;	
		with(minus.style)
			left=27,
			top=70;	
}

function PlayRadio()
{		
var nowPlayingText =""
	if (PlayImage.src.indexOf("stop") > 0)
	{
		mediaPlayer.controls.stop();
		nowPlayingText = "<table border=0 cellpadding=2 cellspacing=0 width=100%><tr><td width='4' align = right class='arrowl' onclick='changeStation(-1);' align='right'><div id='larrowtitle' style='visibility:visible;cursor:pointer;'  title='Previous radio station'><b>&lsaquo;&lsaquo;</b></div></td><td align='center'><div id='nowPlayingText' onclick='changeStation(0);' style='visibility:visible;cursor:pointer;' title='"+ System.Gadget.Settings.read("stationName") +"'><font color='#996633'><b>" + currentStation + "</b></font></div></td><td width='4'  align = left class='arrow' onclick='changeStation(+1);' align='left'><div id='rarrowtitle' style='visibility:visible;cursor:pointer;'  title='Next radio station'><b>&rsaquo;&rsaquo;</b></div></td></tr></table>";
    	nowPlaying.innerHTML = nowPlayingText;
	    	
	}
	else
	{
		mediaPlayer.controls.play();
		nowPlayingText = "<table border=0 cellpadding=2 cellspacing=0 width=100%><tr><td width='4' align = right class='arrowl' onclick='changeStation(-1);' align='right'><div id='larrowtitle' style='visibility:visible;cursor:pointer;'  title='Previous radio station'><b>&lsaquo;&lsaquo;</b></div></td><td align='center'><MARQUEE WIDTH='84' SCROLLDELAY='80' SCROLLAMOUNT='2'><div id='nowPlayingText' onclick='changeStation(0);' style='visibility:visible;cursor:pointer;' title='"+ System.Gadget.Settings.read("stationName") +"'><font color='#996633'><b>" + System.Gadget.Settings.read("stationName") + "</b></font></div></MARQUEE></td><td width='4'  align = left class='arrow' onclick='changeStation(+1);' align='left'><div id='rarrowtitle' style='visibility:visible;cursor:pointer;'  title='Next radio station'><b>&rsaquo;&rsaquo;</b></div></td></tr></table>";
    	nowPlaying.innerHTML = nowPlayingText;
	}
}

function updateNowPlaying()
{
currentStation = Mid(System.Gadget.Settings.read("stationName"),0,13);
currentURL = System.Gadget.Settings.read("stationURL");

	var nowPlayingText = "<table border=0 cellpadding=2 cellspacing=0 width=100%><tr><td width='4' align = right class='arrowl' onclick='changeStation(-1);' align='right'><div id='larrowtitle' style='visibility:visible;cursor:pointer;'  title='Previous radio station'><b>&lsaquo;&lsaquo;</b></div></td><td align='center'><div id='nowPlayingText' onclick='changeStation(0);' style='visibility:visible;cursor:pointer;' title='"+ System.Gadget.Settings.read("stationName") +"'><font color='#996633'><b>" + currentStation + "</b></font></div></td><td width='4'  align = left class='arrow' onclick='changeStation(+1);' align='left'><div id='rarrowtitle' style='visibility:visible;cursor:pointer;'  title='Next radio station'><b>&rsaquo;&rsaquo;</b></div></td></tr></table>";
	nowPlaying.innerHTML = nowPlayingText;
}

function playStateChange(newstate)
{
	
	switch (newstate){ 
	case 1: // Stopped
		playbackStatus.innerHTML = "Stopped";
		PlayImage.src = PlayImage.src.replace(/stop/, "play");
		break;

	case 2: // Paused
		playbackStatus.innerHTML = "Paused";
		PlayImage.src = PlayImage.src.replace(/stop/, "play");
		break;
	
	case 3: // Playing
		playbackStatus.innerHTML = "Playing";
		PlayImage.src = PlayImage.src.replace(/play/, "stop");
		break;

	case 6: // Buffering
		playbackStatus.innerHTML = "Buffering";
		break;

	case 7: // Waiting
		playbackStatus.innerHTML = "Waiting";
		break;

	case 8: // Media Ended
		playbackStatus.innerHTML = "Media Ended";
		PlayImage.src = PlayImage.src.replace(/stop/, "play");
		break;

	case 9: // Transitioning
		playbackStatus.innerHTML = "Connecting";
		break;

	case 10: // Ready
		playbackStatus.innerHTML = "Ready";
		PlayImage.src = PlayImage.src.replace(/stop/, "play");
		break;
	}
}
function VolumeDec() // Decrease volume by 5
{ 
    intVolume = parseInt(currentVolume); 
    if (intVolume > 9)
    { 
    intVolume = (intVolume - 5)
    changeVolume("" + intVolume); 
    currentVolume = "" + intVolume;
        minus.title = "Volume down: " + intVolume
        plus.title = "Volume up: " + intVolume
    }
}
function VolumeInc()// increase volume by 5
    { 
    intVolume = parseInt(currentVolume); 
    if (intVolume < 91)
    { 
        intVolume = (intVolume + 5)
        changeVolume("" + intVolume); 
        currentVolume = "" + intVolume;
        minus.title = "Volume down: " + intVolume
        plus.title = "Volume up: " + intVolume
    }
}

function changeVolume(value)
{ 
    
    currentVolume = "" + value + ""; 
    mediaPlayer.settings.volume = currentVolume; 
    intVolume = parseInt(currentVolume); 
}
////////////////////////////////////////////////////////////////////////////////
// My Blog Next
////////////////////////////////////////////////////////////////////////////////
function changeStation(val)
{
    CodeCurrentId = CodeCurrentId + val;

        if (CodeCurrentId == -1)
        {
        CodeCurrentId =stationURLs.length -1;
        }

        if (CodeCurrentId == stationURLs.length)
        {
        CodeCurrentId = 0;
        }

    System.Gadget.Settings.write("stationURL",stationURLs[CodeCurrentId]);
    System.Gadget.Settings.write("stationName",stationNames[CodeCurrentId]);
    reloadStation();
    PlayRadio();
}