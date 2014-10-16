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
var BlogFeeds = new Array();
var BlogFeedsW = new Array();
var BlogFeedsH = new Array();

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
	            System.Gadget.Settings.write("feedChanged",true);
	            AddItem();
	            System.Gadget.Settings.write("Search", document.getElementById('txtSearchTag').value );
	             
                   
}
function ResetItem()
{
System.Gadget.document.parentWindow.DefaultCodes();
}
function AddItem()
{
var Itemrepeat  = false
    for (i=0;i<System.Gadget.document.parentWindow.VideoURLs.length;i++)
    {
    var searchURL = "http://www.youtube.com/rss/tag/" + document.getElementById("txtSearchTag").value + ".rss";
    
    if (System.Gadget.document.parentWindow.VideoURLs[i] == searchURL)
     {
     document.getElementById("errorid").innerText = "Item already exist!";
     Itemrepeat = true;
     break;
     }
    }
    
    if (Itemrepeat == false)
    {
    System.Gadget.document.parentWindow.VideoURLs.push(searchURL);
    System.Gadget.document.parentWindow.VideoURLTitles.push("Search: " + document.getElementById("txtSearchTag").value );
    document.getElementById("errorid").innerText = "Item added!";
    
      System.Gadget.Settings.write("VideoURL",System.Gadget.document.parentWindow.VideoURLs[System.Gadget.document.parentWindow.VideoURLs.length-1]); 
      System.Gadget.Settings.write("VideoURLTitle",System.Gadget.document.parentWindow.VideoURLTitles[System.Gadget.document.parentWindow.VideoURLTitles.length-1]); 
      System.Gadget.document.parentWindow.CodeCurrentId = System.Gadget.document.parentWindow.VideoURLTitles.length-1;
    }

}
function LoadSettings() {

    if  (System.Gadget.Settings.read("Search") == "")
	    {
	     document.getElementById('txtSearchTag').value = "Vista Gadget";
	    }
	    else
	    {
	      document.getElementById('txtSearchTag').value = System.Gadget.Settings.read("Search");
	    }
	   
	   
}
