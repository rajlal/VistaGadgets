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

     var leftBrace = BlogTitle[i].indexOf("(");
 	 var xBrace = BlogTitle[i].indexOf("x",leftBrace);
 	 var rightBrace = BlogTitle[i].indexOf(")",xBrace);
 	 //Message(leftBrace);
 	 if (leftBrace<0) 
 	 {
 	 leftBrace = BlogTitle[i].length;
 	 }
 	 
 	        
    try
        {
           document.write('<center><h3><font face ="Calibiri" color="#006699">' + Mid(BlogTitle[i],0,leftBrace) + 
        '</font>&nbsp;&nbsp;<a title ="Go to the widget page" href="'+ BlogLinks[i] +'?gadget=true" ><img src="images/up.gif" border=0/></a></h3><font face ="Calibiri" size = "2">' + BlogDescription[i] + '</font></center>');
	    }
        catch(e)
        {
        }   
}
function StartUpPage() {
   document.body.style.width = System.Gadget.document.parentWindow.flyoutWidth;
   document.body.style.height = System.Gadget.document.parentWindow.flyoutHeight;
}
