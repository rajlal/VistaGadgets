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
function BuildMyBlog()
{
	var BlogTitle= System.Gadget.document.parentWindow.Titles;
	var BlogDescription = System.Gadget.document.parentWindow.Descriptions;
	var BlogPublished = System.Gadget.document.parentWindow.PublishedList;
	var BlogLinks = System.Gadget.document.parentWindow.Links;
	var i = System.Gadget.Settings.read("currentClickedCell");
	var currentFeedID = System.Gadget.Settings.read("URLFeedsCurrentID");
        try
        {
        //Message(BlogDescription[i]);
           document.write('<table border=0 cellspacing=0><tr><td colspan=2><font size="3" face ="Calibiri" color="#006699"><b>&nbsp;' + BlogTitle[i] + 
           '</font></b>&nbsp;&nbsp;<a  tabindex="1" title ="Go to the comic strip page" href="'+ BlogLinks[i] +
           '?gadget=true" ><img src="images/up.gif" border=0/></a></td></tr><tr><td  colspan=2 align=center><hr noshade="true" size="1"><font face=verdana size=1>' + BlogDescription[i] + 
           '</font></td></tr><tr><td><a tabindex="2" href="JavaScript:HideFlyout();" ><font face=verdana size =1>Close</font></a>&nbsp;<font face ="verdana" size = 1>Date:' + BlogPublished[i] + 
           '</font></td><td width = 60% align=right><iframe src="http://csharptricks.com/Projects/Gadgets/newsComicStrip.htm" width="100%" Height="20" frameborder="0"></iframe></td></tr></table>');
	    }
        catch(e)
        {
        Message (e);
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