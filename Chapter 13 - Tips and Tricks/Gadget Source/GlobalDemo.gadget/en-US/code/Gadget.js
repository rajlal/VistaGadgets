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
function Resize()
{
	  with (document.body.style) 
                {
	  	            width = 130; 
		            height = 134;
	            }
	    
	     System.Gadget.background = "url(images/background.png)";
	     document.getElementById("contenttable").height = "90%";
	   	 document.getElementById("content").style.top ="15px";
	   	 document.getElementById("content").style.width = "80px";
	   	 document.getElementById("content").style.left = "38px";
	   	 document.getElementById("content").style.fontsize ="11px";
	   	 document.getElementById("mylogo").style.left ="2px";
	   	 document.getElementById("mylogo").style.top ="70px";
	   	 document.getElementById("mylogo").style.height="70px";   
}

function Setup() {
	SystemSetup();
    Resize();
    SetGlobalText();
}
function SetGlobalText()
{
gadgetTitle.innerText=globalTitle;
helloglobal.innerText = globalWelcomeMessage;
globaldescription.innerHTML= "<font size=1 face=verdana color=gray>" + globalDecription + "</font>";
}
function SystemSetup()
{
    System.Gadget.settingsUI = "Settings.html";
}
