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
    var BlogCategory = System.Gadget.document.parentWindow.Category;
    var shared= "";
    
	var i = System.Gadget.Settings.read("currentClickedCell");
    if ((BlogCategory[i].indexOf("SharedPuzzle")!=-1)||(BlogCategory[i]==""))
    	         {
    	         shared = "<font face =silver> (Shared)</font>";
    	         }
    try
        {
        document.write('<h3><font face ="Calibiri" color="#006699">' + BlogTitle[i] + shared + '</font>&nbsp;&nbsp;<a  tabindex="1" title ="Go to the question page to add your comment" href="'+ BlogLinks[i] +'?gadget=true" ><img src="images/up.gif" border=0/></a></h3><hr noshade="true" size="1"><font face ="Calibiri" size = "2">' + BlogDescription[i] + '</font>');
        document.getElementById("TrickReply").innerText="http://trickofmind.com" ;
        }
        catch(e)
        {
        }   
}

function BuildReply()
{
	var BlogLinks = System.Gadget.document.parentWindow.Links;
	var BlogComments = System.Gadget.document.parentWindow.Comments;
	var BlogCategory = System.Gadget.document.parentWindow.Category;
    var BlogPublished = System.Gadget.document.parentWindow.PublishedList;
	
	var i = System.Gadget.Settings.read("currentClickedCell");

    try
        {
        document.write('<hr noshade="true" size="0"><table width=100% border = 0><tr><td colspan=3><font face=verdana size =2>Tags: ' + BlogCategory[i] +' </font></td></tr><tr><td width=55%><font face=verdana size =2><b>' + BlogComments[i] + '</b></font><font face=verdana size =1 color = gray><i> ' + Mid(BlogPublished[i],0,10) + '</i></font></td><td align=left><a  tabindex="2" href="' + BlogLinks[i] + '?gadget=true" target="_blank"><font face=verdana size =2>Reply!</font></a></td><td align=right><a  tabindex="3" href="JavaScript:HideFlyout();" ><font face=verdana size =2>Close</font></a></font></td></tr></table>');
        }
        catch(e)
        {
        }   
}
function HideFlyout()
{
   System.Gadget.Flyout.show = false;
   System.Gadget.Settings.write("currentClickedCell", -1);

}     
function StartUpPage() {
   document.body.style.width = System.Gadget.document.parentWindow.flyoutWidth;
   document.body.style.height = System.Gadget.document.parentWindow.flyoutHeight;
}