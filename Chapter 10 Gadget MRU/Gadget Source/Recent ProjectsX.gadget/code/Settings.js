﻿////////////////////////////////////////////
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
                   
}
function LoadSettings() {
   
}
function listMRURegistry()
{
    objMRU = new ActiveXObject("VisualStudioMRU.clsMRU");
    objMRU.VisualStudioMRU_Get (8);
    for (i=1; i<objMRU.CollectionCount; i++) 
    { 
    document.write(objMRU.colMRUFiles.Item(i));
    } 

}

 function AddItemList(Text,Value)
    {
        // Create an Option object                
//        var opt = document.createElement("option");
//        // Add an Option object to Drop Down/List Box
//        document.getElementById("rssFeed_SelectId").options.add(opt);        
//        // Assign text and value to Option object
//        opt.text = Text;
//        opt.value = Value;

    }
//	    objMRU = new ActiveXObject("VisualStudioMRU.clsMRU");
//	    objMRU.VisualStudioMRU_Get (7);
//	    Message(objMRU.CollectionCount);
//	     for (i=1; i<objMRU.CollectionCount; i++) 
//	        {
//	        AddItemList(objMRU.colMRUFiles.Item(i),objMRU.colMRUFiles.Item(i));
//	        Message(objMRU.colMRUFiles.Item(i));
//	        }
