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
function LoadSettings() {

    if  (System.Gadget.Settings.read("FeedURL") == "")
	    {
	     document.getElementById('TextBoxFeedURL').value = "http://innovatewithgadgets.com/atom.xml";
	     
	    }
	    else
	    {
	      document.getElementById('TextBoxFeedURL').value = System.Gadget.Settings.read("FeedURL");
	    }
	    document.getElementById('txtWidth').value = System.Gadget.Settings.read("FlyoutWidth");
	    document.getElementById('txtHeight').value = System.Gadget.Settings.read("FlyoutHeight");
	     
}
function SaveSettings() 
{
	    System.Gadget.Settings.write("feedChanged",true);
	    System.Gadget.Settings.write("FeedURL", document.getElementById('TextBoxFeedURL').value );
	    System.Gadget.Settings.write("FlyoutWidth",document.getElementById('txtWidth').value );
	    System.Gadget.Settings.write("FlyoutHeight",document.getElementById('txtHeight').value );
}
