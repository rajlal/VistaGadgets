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


function BuildMyFlyout()
{
	var flyoutTitle= System.Gadget.document.parentWindow.Titles;
	var flyoutDescription = System.Gadget.document.parentWindow.Descriptions;
	var flyoutPublished = System.Gadget.document.parentWindow.PublishedList;
	var i = System.Gadget.Settings.read("currentClickedCell");

    try
        {
        document.write('<table width=100% border=0><tr><td><h3><font face ="Calibiri" color="#006699">' + flyoutTitle[i] + '</font></h3></td><td align=right><a  tabindex="1" href="JavaScript:HideFlyout();" ><font face=verdana size =2>Close</font></a></td></tr></table><hr noshade="true" size="1"><font face ="Calibiri" size = "2">' + flyoutDescription[i] + '</font><hr noshade="true" size="1"> <font face ="verdana" size = 1>Date Published: ' + flyoutPublished[i] + '</font>');
	    }
        catch(e)
        {
        }   
}
function StartUpPage() {
   document.body.style.width = System.Gadget.document.parentWindow.flyoutWidth;
   document.body.style.height = System.Gadget.document.parentWindow.flyoutHeight;
}
function HideFlyout()
{
   System.Gadget.Flyout.show = false;
   System.Gadget.Settings.write("currentClickedCell", -1);
}  