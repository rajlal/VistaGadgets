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



System.Gadget.onSettingsClosing = SettingsClosing

function SettingsClosing(event)
{
    if(event.closeAction == event.Action.commit)
    {
        SaveSettings();
    }
}
function SaveSettings() 
{
	System.Gadget.Settings.write("update",autoupdate.checked);
}
function LoadSettings() 
{
    document.getElementById('versionlabel').innerHTML=System.Gadget.version;
	autoupdate.checked = System.Gadget.Settings.read("update");
}
