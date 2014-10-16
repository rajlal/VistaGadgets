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

// for updating the gadget
var updateAvailable =false;
var globalUpdateMessage ="Go to gadget website";
var globalUpdateURL ="http://innovatewithgadgets.com";
var globalUpdateGadgetXML ="http://csharptricks.com/Projects/Gadgets/Innovate/TrickofMind.gadget/Gadget.xml";


//////////////////////////////////////////////////////////////////////////// 
// Message box for debugging the gadget
// For details http://msdn2.microsoft.com/en-us/library/x83z1d9f(VS.85).aspx
//////////////////////////////////////////////////////////////////////////// 
function Message(prompt)
{
var WshShell = new ActiveXObject("WScript.Shell");
var BtnCode = WshShell.Popup(prompt, 7, "Innovate With Gadgets!", 64);
}

//////////////////////////////////////////////////////////////////////////// 
// Mid string function not available in Script 
//////////////////////////////////////////////////////////////////////////// 
function Mid(str, start, len)
        {
                // Make sure start and len are within proper bounds
                if (start < 0 || len < 0) return "";

                var iEnd, iLen = String(str).length;
                if (start + len > iLen)
                        iEnd = iLen;
                else
                        iEnd = start + len;

                return String(str).substring(start,iEnd);
        }

//////////////////////////////////////////////////////////////////////////// 
// for updating the gadget 
// include Utility.js in gadget.html
//////////////////////////////////////////////////////////////////////////// 
function CheckForUpdate()
{
    var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
	xmlDoc.async = false;
	xmlDoc.load(globalUpdateGadgetXML);
		
	var gadget = xmlDoc.selectNodes("gadget");
	var Results = gadget[0].childNodes[2].text;
	var InfoURL = gadget[0].childNodes[3].childNodes[1].getAttribute("url");
	xmlDoc=null;
	 if (Results > System.Gadget.version)
    	     {
    	         if (InfoURL.indexOf("http://")==-1)
    	         {
    	         InfoURL = "http://" + InfoURL;
    	         // InfoURL must contain http:// 
    	         }
    	         globalUpdateURL=InfoURL;
    	         
    	         globalUpdateMessage = "An update is available, visit " + globalUpdateURL ;
    	         updateAvailable=true;
    	         UpdateBackground();
    	     }    
    	     else
    	     {
    	     globalUpdateMessage = "Go to gadget website";
    	     }
}
//////////////////////////////////////////////////////////////////////////// 
// for updating the gadget 
// Change background for the updateAvailable iamge
//////////////////////////////////////////////////////////////////////////// 
function UpdateBackground()
{
 if (System.Gadget.Settings.read("mini") ==true)
	    {
	    if (updateAvailable)
	             {
	              System.Gadget.background = "url(../images/UpdateAvailableSmall.png)";
	              document.getElementById("mylogo").title =globalUpdateMessage;    
	              document.getElementById("infourl").href = globalUpdateURL;
	              
	             }
	    
	    }
 else
        {
         if (updateAvailable)
	             {
	              System.Gadget.background = "url(../images/UpdateAvailable.png)";
	              document.getElementById("mylogo").title =globalUpdateMessage;    
	              document.getElementById("infourl").href = globalUpdateURL;
	              }
        }	    

}
//////////////////////////////////////////////////////////////////////////// 
// for Keyboard Access
// Check the complete list key codes in Chapter 13 "Tips and Tricks"
//////////////////////////////////////////////////////////////////////////// 
function  KeyboardAccess(from,id)
{     
   switch (window.event.keyCode)
   {
     case 13: // Simulate onclick event on Enter keypress (key code is 13) 
        {
        if (from==="refresh")
        Refresh();
        else if (from==="item")   
        ShowFlyout(id);
        else if (from==="paging")   
        ChangePage(id);
        break; 
        }
   
   }
} 
