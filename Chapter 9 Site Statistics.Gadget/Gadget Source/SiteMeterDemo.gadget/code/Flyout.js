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
var flyoutTitle;
var flyoutWidth;
var flyoutHeight;
var ImagePath;
var firstthree;
var dataFlyout;

function BuildMyContent()
{
 var ftype = System.Gadget.document.parentWindow.flyoutType
 var flyoutSiteSummary  = System.Gadget.document.parentWindow.SiteMeterSummary;
 var SMC = System.Gadget.Settings.read("sitemeterCode");
 firstthree =  Mid(SMC,0,3);
 
 	try
        { 
        if ( ftype==0)
          {
            flyoutTitle ="Site Summary ";
	        //dataFlyout = '<h3><font face ="Calibiri" color="#006699">' + flyoutTitle + '</font>&nbsp;&nbsp;<a title ="Go to the sitemeter page" href="?gadget=true" ><img src="images/up.gif" border=0/></a></h3><hr noshade="true" size="1">' + flyoutSiteSummary + '</font>'
	        dataFlyout = "<center>" + flyoutSiteSummary + "</center>";
	       }
	   if ( ftype==1)
          {
            flyoutTitle ="Weekly - Visits and Page Views";
	        ImagePath= "http://" + firstthree + ".sitemeter.com/rpc/v6/server.php?a=GetChart&n=9&p1=" + SMC + "&p2=&p3=6&p4=0&p5=71%2E159%2E229%2E88&p6=HTML&p7=1&p8=%2E%3Fa%3Dstatistics&p9=&rnd=59693" ;
	        dataFlyout = '<br><h3><font face ="Calibiri" color="#006699">' + flyoutTitle + '</font>&nbsp;&nbsp;<a title ="More details at sitemeter statistics page" href="http://www.sitemeter.com/?a=stats&s=' + SMC + '&r=6&gadget=true" ><img src="images/up.gif" border=0/></a></h3><hr noshade="true" size="1"><img src=' + ImagePath + ' border=0></font>'
	       }
      if ( ftype==2)
          {
            flyoutTitle ="Monthly - Visits and Page Views";
	        ImagePath= "http://" + firstthree + ".sitemeter.com/rpc/v6/server.php?a=GetChart&n=9&p1=" + SMC + "&p2=&p3=12&p4=0&p5=71%2E159%2E229%2E88&p6=HTML&p7=1&p8=%2E%3Fa%3Dstatistics&p9=&rnd=32494" ;
	        dataFlyout = '<br><h3><font face ="Calibiri" color="#006699">' + flyoutTitle + '</font>&nbsp;&nbsp;<a title ="More details at sitemeter statistics page" href="http://www.sitemeter.com/?a=stats&s=' + SMC + '&r=12&gadget=true" ><img src="images/up.gif" border=0/></a></h3><hr noshade="true" size="1"><img src=' + ImagePath + ' border=0></font>'
	       }
	       
	  if ( ftype==3)
          {
            flyoutTitle ="Yearly - Visits and Page Views";
	        ImagePath= "http://" + firstthree + ".sitemeter.com/rpc/v6/server.php?a=GetChart&n=9&p1=" + SMC + "&p2=&p3=33&p4=0&p5=71%2E159%2E229%2E88&p6=HTML&p7=1&p8=%2E%3Fa%3Dstatistics&p9=&rnd=40437" ;
	        dataFlyout = '<br><h3><font face ="Calibiri" color="#006699">' + flyoutTitle + '</font>&nbsp;&nbsp;<a title ="More details at sitemeter statistics page" href="http://www.sitemeter.com/?a=stats&s=' + SMC + '&r=33&gadget=true" ><img src="images/up.gif" border=0/></a></h3><hr noshade="true" size="1"><img src=' + ImagePath + ' border=0></font>'
	       }
	     if (ftype==4)
          {
            flyoutTitle ="Region - Continents";
	        ImagePath= "http://" + firstthree + ".sitemeter.com/rpc/v6/server.php?a=GetChart&n=9&p1=" + SMC + "&p2=&p3=81&p4=0&p5=71%2E159%2E229%2E88&p6=HTML&p7=1&p8=%2E%3Fa%3Dstatistics&p9=&rnd=33756" ;
	        dataFlyout = '<br><h3><font face ="Calibiri" color="#006699">' + flyoutTitle + '</font>&nbsp;&nbsp;<a title ="More details at sitemeter statistics page" href="http://www.sitemeter.com/?a=stats&s=' + SMC + '&r=81&gadget=true" ><img src="images/up.gif" border=0/></a></h3><hr noshade="true" size="1"><img src=' + ImagePath + ' border=0></font>'
	       }
	     if (ftype==5)
          {
            flyoutTitle ="Location - Countries";
	        ImagePath= "http://" + firstthree + ".sitemeter.com/rpc/v6/server.php?a=GetChart&n=9&p1=" + SMC + "&p2=&p3=83&p4=0&p5=75%2E15%2E87%2E230&p6=HTML&p7=1&p8=%2E%3Fa%3Dstatistics&p9=&rnd=74995" ;
	        dataFlyout = '<br><h3><font face ="Calibiri" color="#006699">' + flyoutTitle + '</font>&nbsp;&nbsp;<a title ="More details at sitemeter statistics page" href="http://www.sitemeter.com/?a=stats&s=' + SMC + '&r=83&gadget=true" ><img src="images/up.gif" border=0/></a></h3><hr noshade="true" size="1"><img src=' + ImagePath + ' border=0></font>'
	       }
	       
	        if (ftype==6)
          {
            flyoutTitle ="Operating System";
	        ImagePath= "http://" + firstthree + ".sitemeter.com/rpc/v6/server.php?a=GetChart&n=9&p1=" + SMC + "&p2=&p3=19&p4=0&p5=75%2E15%2E87%2E230&p6=HTML&p7=1&p8=%2E%3Fa%3Dstatistics&p9=&rnd=48531" ;
	        dataFlyout = '<br><h3><font face ="Calibiri" color="#006699">' + flyoutTitle + '</font>&nbsp;&nbsp;<a title ="More details at sitemeter statistics page" href="http://www.sitemeter.com/?a=stats&s=' + SMC + '&r=19&gadget=true" ><img src="images/up.gif" border=0/></a></h3><hr noshade="true" size="1"><img src=' + ImagePath + ' border=0></font>'
	       }
	        if (ftype==7)
          {
            flyoutTitle ="Web browser used";
	        ImagePath= "http://" + firstthree + ".sitemeter.com/rpc/v6/server.php?a=GetChart&n=9&p1=" + SMC + "&p2=&p3=13&p4=0&p5=75%2E15%2E87%2E230&p6=HTML&p7=1&p8=%2E%3Fa%3Dstatistics&p9=&rnd=97912" ;
	        dataFlyout = '<br><h3><font face ="Calibiri" color="#006699">' + flyoutTitle + '</font>&nbsp;&nbsp;<a title ="More details at sitemeter statistics page" href="http://www.sitemeter.com/?a=stats&s=' + SMC + '&r=13&gadget=true" ><img src="images/up.gif" border=0/></a></h3><hr noshade="true" size="1"><img src=' + ImagePath + ' border=0></font>'
	       }
	       document.write(dataFlyout);
	    }
	    catch(e)
        {
        }   
}
function StartUpPage() {
 var ftype = System.Gadget.document.parentWindow.flyoutType
    
    flyoutWidth =520;
	flyoutHeight =445;
	
	document.body.style.width = flyoutWidth;
    document.body.style.height = flyoutHeight;
}
