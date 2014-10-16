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
function BuildContent()
{
	var BlogTitle= System.Gadget.document.parentWindow.Titles;
	var BlogDescription = System.Gadget.document.parentWindow.Descriptions;
	var BlogPublished = System.Gadget.document.parentWindow.PublishedList;
	var i = System.Gadget.Settings.read("currentClickedCell");
	
        try
        {
        //document.write('<h3><font face ="Calibiri" color="#006699">' + BlogTitle[i] + '</font>&nbsp;&nbsp;</h3><hr noshade="true" size="1"><font face ="Calibiri" size = "2">' + BlogDescription[i] + '</font><hr noshade="true" size="1"> <font face ="verdana" size = 1><a tabindex="2" href="JavaScript:HideFlyout();" ><font face=verdana size =1>Close</font></a>&nbsp;Date Published:"' + BlogPublished[i] + '</font>');
	    
	       document.write('<table border=0 cellspacing=0><tr><td colspan=2 tabindex="1" ><font size="3" face ="Calibiri" color="#006699">&nbsp;<b>&nbsp;' + BlogTitle[i] + 
           '</font></b></td></tr><tr><td  colspan=2 ><hr noshade="true" size="1"><font face=Calibiri size=2>' + BlogDescription[i] + 
           '</font></td></tr><tr><td><a tabindex="2" href="JavaScript:HideFlyout();" ><font face=verdana size =2>Close</font></a>&nbsp;<font face ="verdana" size = 1>Date:' + BlogPublished[i] + '</font></td></tr></table>');

	    }
        catch(e)
        {
        document.write('Error occured !');
        }   
}
function StartUpPage() {
   document.body.style.width = System.Gadget.document.parentWindow.myWidthVariable;
   document.body.style.height = System.Gadget.document.parentWindow.myHeightVariable;
}
function HideFlyout()
{
   System.Gadget.Flyout.show = false;
   System.Gadget.Settings.write("currentClickedCell", -1);
}   