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


function ShowDetails()
{
      
      document.body.style.width = "442px";
      
      if (document.body.style.height == "530px")
      {
        document.body.style.height = "390px";
        DivDetails.innerHTML ="<font size=2>(show details)</font>";
        DivDescription.innerHTML = '';
        document.body.style.overflow = "hidden" ;
      
	  }
      else
      {
        document.body.style.height = "530px";
        //document.body.style.overflow ="auto";
        DivDetails.innerHTML ="<font size=2>(hide details)</font>";
        DivDescription.innerHTML = '<p><font size=2>' + System.Gadget.Settings.read("sDescription")+ '</font></p>';
      }
      

}

function BuildVideoObject()
{
	try
	{
	
	  Video_HtmlString = "<center><object width=\"425\" height=\"355\"><param name=\"movie\" value=\"" + System.Gadget.Settings.read("sLink") + "&rel=1\"></param><param name=\"wmode\" value=\"transparent\"></param><embed src=\""+ System.Gadget.Settings.read("sLink") +"&rel=1\" type=\"application/x-shockwave-flash\" wmode=\"transparent\" width=\"425\" height=\"355\"></embed></object></center>";
   	  Video_HtmlString = Video_HtmlString  + '<div><font size="2">' + System.Gadget.Settings.read("sTitle") + ' </font><a id ="DivDetails" onclick="ShowDetails();" style="cursor:hand;color:blue;" title ="Click to show details" ><font size=2> (show details)</font></a></div><div id="DivDescription"></div>' ;
	  document.write(Video_HtmlString);
    }
	catch (err)
	{
	 document.write("" + err) ;
	}
}


function StartUpPage() {
    //Resize the page
  
	  document.body.style.width = "442px";
      document.body.style.height = "390px";
  
}