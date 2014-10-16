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

// JScript File

System.Gadget.onSettingsClosing = settingsClosing;

function settingsClosing(event)
{
    if(event.closeAction == event.Action.commit)
    {
        SaveSettings();
    }
    else if (event.closeAction == event.Action.cancel)
    {
    }
}
function SaveSettings() 
{
AddItem();
}
function ResetItem()
{
 System.Gadget.document.parentWindow.DefaultStations();
 System.Gadget.Settings.write("stationURL",System.Gadget.document.parentWindow.stationURLs[0]); 
 System.Gadget.Settings.write("stationName",System.Gadget.document.parentWindow.stationNames[0]); 
 System.Gadget.document.parentWindow.CodeCurrentId = 0;
 document.getElementById("errorid").innerText = "Stations reset to default!";
}
function AddItem()
{
var Itemrepeat  = false
    for (i=0;i<System.Gadget.document.parentWindow.stationURLs.length;i++)
    {
    var radioURL = document.getElementById("txtURL").value;
    
    if (System.Gadget.document.parentWindow.stationURLs[i] == radioURL)
     {
        document.getElementById("errorid").innerText = "Item already exist!";
        Itemrepeat = true;
        break;
     }
    }
    
    if (Itemrepeat == false)
    {
    System.Gadget.document.parentWindow.stationURLs.push(radioURL);
    System.Gadget.document.parentWindow.stationNames.push(document.getElementById("txtTitle").value );
    document.getElementById("errorid").innerText = "Item added!";
    
      System.Gadget.Settings.write("stationURL",System.Gadget.document.parentWindow.stationURLs[System.Gadget.document.parentWindow.stationURLs.length-1]); 
      System.Gadget.Settings.write("stationName",System.Gadget.document.parentWindow.stationNames[System.Gadget.document.parentWindow.stationNames.length-1]); 
      System.Gadget.document.parentWindow.CodeCurrentId = System.Gadget.document.parentWindow.stationNames.length-1;
    }

}
function LoadSettings() {

    if  (System.Gadget.Settings.read("FeedURL") == "")
	    {
	     document.getElementById('txtSearchTag').value = "Vista";
	    }
	    else
	    {
	      document.getElementById('txtSearchTag').value = System.Gadget.Settings.read("Search");
	    }
	   
	   
}
