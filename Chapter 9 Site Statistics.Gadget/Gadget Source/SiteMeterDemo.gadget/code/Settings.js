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
var ItemCodes = new Array();
var ItemTitles = new Array();

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
	            System.Gadget.Settings.write("mini",minime.checked );
	            System.Gadget.Settings.write("itemChanged",true);
	            System.Gadget.Settings.write("completeView",completeView.checked );
}
function LoadSettings() {

         minime.checked = System.Gadget.Settings.read("mini");
	     completeView.checked = System.Gadget.Settings.read("completeView");
	  
}

