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




var page = 0;

var g_currentClickedCell;
var g_sHtmlString;
var myWidthVariable ="640px";
var myHeightVariable ="300px";

var Descriptions = new Array();
var Titles = new Array();
var PublishedList = new Array();
var Authors = new Array();
var Links = new Array();

System.Gadget.onSettingsClosed = settingsClosed;

function settingsClosed(event)
{
    if (event.closeAction == event.Action.commit)
        {
            if (System.Gadget.Settings.read("feedChanged"))
            {
            page=0;
            Refresh();
            }
        }
}
function Refresh() {
    Resize();
	GetFeed();
}
////////////////////////////////////////////////////////////////////////////////
// Initialize functions 
////////////////////////////////////////////////////////////////////////////////
function Setup() {
	SystemSetup();
    Resize();
	GetFeed();
	window.setInterval(GetFeed, (60 * 60 * 1000));	
}
function SystemSetup()
{
	System.Gadget.Flyout.file = "Flyout.html";
    System.Gadget.settingsUI = "Settings.html";
	if (System.Gadget.Settings.read("FeedURL")=="")
    {
      DefaultFeed = "http://innovatewithgadgets.com/atom.xml";
      System.Gadget.Settings.write("FeedURL",DefaultFeed); 
    }
    if (System.Gadget.Settings.read("FlyoutWidth")=="")
    {
      System.Gadget.Settings.write("FlyoutWidth",600); 
      
    }
     if (System.Gadget.Settings.read("FlyoutHeight")=="")
    {
      System.Gadget.Settings.write("FlyoutHeight",600); 
      
    }
}
function Resize()
{
with (document.body.style) 
        {
	  
		    width = 130; 
		    height = 134;
	    }
	     System.Gadget.background = "url(../images/background.png)";
	   	 document.getElementById("contenttable").height = "90%";
	   	 document.getElementById("content").style.top ="26px";
	   	 document.getElementById("content").style.width = "80px";
	   	 document.getElementById("content").style.left = "38px";
	   	 document.getElementById("content").style.fontsize ="11px";
	   	 document.getElementById("mylogo").style.left ="2px";
	   	 document.getElementById("mylogo").style.top ="60px";
	   	 document.getElementById("mylogo").style.height="70px";    
}
////////////////////////////////////////////////////////////////////////////////
// Initialize functions Ends
////////////////////////////////////////////////////////////////////////////////
// XML Functions TO GET  feed 
function GetFeed() {
 try
 {
    error.style.visibility = "hidden";
	loading.style.visibility = "visible";
	content.style.visibility = "hidden";
	loading.title  = "Connecting...";					
	var rssObj  = new ActiveXObject("Microsoft.XMLHTTP");
 
	rssObj.open("GET", System.Gadget.Settings.read("FeedURL") + "?" + Math.random()*1 ,true);
	rssObj.onreadystatechange = function() {
		if (rssObj.readyState === 4) {
			if (rssObj.status === 200) {	
				loading.innerText = "";				
				rssXML = rssObj.responseXML;
				page = 0;
				ParseFeed();
				content.style.visibility = "visible";
				loading.style.visibility = "hidden";
				if (chkConn) { clearInterval(chkConn); }
			} else {
				var chkConn;
			    content.style.visibility = "hidden";
		        loading.style.visibility = "hidden";
		        error.innerText = " Service not available ";
		        error.style.visibility = "visible";
		 		chkConn = setInterval(GetFeed, 30 * 60000);
			}
    	} else {
			loading.title = "Connecting...";
		}
	}	
	rssObj.send(null);
	}
	catch(e)
	{
	            content.style.visibility = "hidden";
		        loading.style.visibility = "hidden";
		        error.innerText = " Service not available" ;
		        error.style.visibility = "visible";

	}
}

//Fly out related funtions 
function ShowFlyout(i)
{
 	if (System.Gadget.Flyout.show == false)
	{
	        myWidthVariable =System.Gadget.Settings.read("FlyoutWidth");
	        myHeightVariable =System.Gadget.Settings.read("FlyoutHeight");
	        System.Gadget.Settings.write("currentClickedCell", i);
	        System.Gadget.Flyout.file = "Flyout.html";
	        System.Gadget.Flyout.show = true;
	}
	else
	{
	            HideFlyout();
	}
}
function HideFlyout()
{
   System.Gadget.Flyout.show = false;
}
//End Fly out related funtions 
function ParseFeed(page) 
{
	if (!page) { page = 0; }
	start = page * 5;
	end = (page * 5) + 5;
	
	if ( rssXML.getElementsByTagName("entry").length > 0 )
     {
       feedType = "Atom";
     }
     else
     {
       feedType = "RSS";
     }
    
    if ( feedType == "Atom" )
     {
        rssItems = rssXML.getElementsByTagName("entry");
        blogTitles = rssXML.getElementsByTagName("title");
        blogAuthor = rssXML.getElementsByTagName("author")[0].firstChild.text;
        myblogTitle = blogTitles[0].text + " - " + blogAuthor ; 
     }
    else 
     {
        rssItems = rssXML.getElementsByTagName("item");
        blogTitleChannel = rssXML.getElementsByTagName("channel");
        
        if(blogTitleChannel)
        {
        if (blogTitleChannel[0])
            {        myblogTitle = blogTitleChannel[0].firstChild.text;  }
            
        }
     }
        if (myblogTitle.length > 20)
        {     document.getElementById("blogtitle").innerText = Mid(myblogTitle,0,20);
        }
        else
        {     document.getElementById("blogtitle").innerText = myblogTitle;
        }     
        document.getElementById("blogtitle").title =myblogTitle

	    rssTitle = null; rssAuthors = null; rssSummary = null; rssLink = null;
    	
	    if (end > rssItems.length)
	    {
	    end = rssItems.length
	    }
	    var akey  = 2; //accesskey for second tab stop 
	    for (i=start; i<end; i++) {
    		
		    if (start > rssItems.length)
	        {
		    }
		    else
		    {
    		
                if (feedType == "Atom" )
                    {
    	                   if (rssItems[i].getElementsByTagName("title")) { rssTitle = rssItems[i].getElementsByTagName("title")[0].text; }
		                   if (rssItems[i].getElementsByTagName("content")) { rssSummary = rssItems[i].getElementsByTagName("content")[0].text;  }
		                   if (rssItems[i].getElementsByTagName("published")) {rssPubDate = rssItems[i].getElementsByTagName("published")[0].text; }
		        }
                else
                    {
    	                   if (rssItems[i].getElementsByTagName("title")) {rssTitle = rssItems[i].getElementsByTagName("title")[0].text;}
		                   if (rssItems[i].getElementsByTagName("description")) {rssSummary = rssItems[i].getElementsByTagName("description")[0].text; }
		                   if (rssItems[i].getElementsByTagName("pubDate")[0]) {rssPubDate = rssItems[i].getElementsByTagName("pubDate")[0].text; }
		            }
    	       
		       Titles[i] = rssTitle 
		       Descriptions[i] = rssSummary;
		       PublishedList[i] = rssPubDate;
		        
		        System.Gadget.Flyout.file = "Flyout.html";
		        rssItem= rssSummary;
		        cell = i - (page * 5);
        		
        		//Without accesibility -> document.getElementById("cell" + (cell)).innerHTML = '<div align="left" onclick="ShowFlyout(\'' + i + '\');">&nbsp;&nbsp;&nbsp;&nbsp;' + Mid(rssTitle,0,12) + '</div>';
	            document.getElementById("cell" + (cell)).innerHTML = '<a class="title"  tabindex="'+akey+'" align="left" href="JavaScript:ShowFlyout(\'' + i + '\');"><div align="left">&nbsp;&nbsp;&nbsp;&nbsp;' + Mid(rssTitle,0,12) + '</div></a>';
	            document.getElementById("cell" + (cell)).title = rssTitle;
	            akey = akey+1;
		    }
	 }
	
}
function HideFlyout()
{
   System.Gadget.Flyout.show = false;
}


