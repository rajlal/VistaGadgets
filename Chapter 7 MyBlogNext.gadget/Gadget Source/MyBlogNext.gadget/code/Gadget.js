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

var flyoutWidth;
var flyoutHeight;

var URLFeeds = new Array();
var URLFeedsW = new Array();
var URLFeedsH = new Array();

var URLFeedsCurrentID=0; 

var Descriptions = new Array();
var Titles = new Array();
var PublishedList = new Array();
var Authors = new Array();


System.Gadget.onSettingsClosed = SettingsClosed;

function SettingsClosed(event)
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

function Resize()
{
	    
	    if (System.Gadget.Settings.read("mini") ==true)
	    {
	       with (document.body.style) 
                {
	  	            width = 130; 
		            height = 100;
	            }
	        
	         System.Gadget.background = "url(../images/backgroundsmall.png)";
	         document.getElementById("contenttable").height = "50%";
	    	 document.getElementById("content").style.top = "18px";
	    	 document.getElementById("content").style.width = "72px";
	    	 document.getElementById("content").style.left = "42px";
	    	 document.getElementById("content").style.fontsize ="9px";
	    	 document.getElementById("mylogo").style.top = "54px";
	    	 document.getElementById("pagingbar").style.top = "80px";
	    	 
	    
	    }
	    else
	    {
            with (document.body.style) 
                {
	  	            width = 130; 
		            height = 134;
	            }
	     System.Gadget.background = "url(../images/background.png)";
	  	 document.getElementById("contenttable").height = "90%";
	   	 document.getElementById("content").style.top ="20px";
	   	 document.getElementById("content").style.width = "80px";
	   	 document.getElementById("content").style.left = "38px";
	   	 document.getElementById("content").style.fontsize ="11px";
	   	 document.getElementById("mylogo").style.left ="2px";
	   	 document.getElementById("mylogo").style.top ="70px";
	   	 document.getElementById("mylogo").style.height="70px";   
	   	 document.getElementById("pagingbar").style.top = "110px"; 
	   	}
}

function Setup() {
	SystemSetup();
    Resize();
	GetFeed();
	window.setInterval(GetFeed, (30 * 60000));	
}
function Refresh() {
	SystemSetup();
    Resize();
	GetFeed();
}
function SystemSetup()
{
	System.Gadget.Flyout.file = "Flyout.html";
    System.Gadget.settingsUI = "Settings.html";
	if (System.Gadget.Settings.read("FeedURL")=="")
    {
      DefaultFeed = "http://innovatewithgadgets.com/atom.xml";
      System.Gadget.Settings.write("FeedURL",DefaultFeed); 
      DefaultFeeds();
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
function DefaultFeeds()
{
    URLFeeds[0] = "http://innovatewithgadgets.com/atom.xml";
    URLFeedsW[0] = 600;
    URLFeedsH[0] = 600;
    
    URLFeeds[1] = "http://widgets-gadgets.com/atom.xml";
    URLFeedsW[1] = 700;
    URLFeedsH[1] = 600;
    
    URLFeeds[2] = "http://trickofmind.com/atom.xml";
    URLFeedsW[2] = 400;
    URLFeedsH[2] = 300;
}


////////////////////////////////////////////////////////////////////////////////
// XML Functions TO GET  feed 
////////////////////////////////////////////////////////////////////////////////
function GetFeed() {
 try
 {
        error.style.visibility = "hidden";
		loading.style.visibility = "visible";
		content.style.visibility = "hidden";
		
	loading.style.visibility = "visible";
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
    	    loading.style.visibility = "visible";
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
    
    var myc = URLFeedsCurrentID + 1
    if ( feedType == "Atom" )
     {
           try
        {
        rssItems = rssXML.getElementsByTagName("entry");
        blogTitles = rssXML.getElementsByTagName("title");
        blogAuthor = rssXML.getElementsByTagName("author")[0].firstChild.text;
        myblogTitle = blogTitles[0].text + " - " + blogAuthor ; 
         }
        catch(e)
		{}     

     }
    else 
     {
        rssItems = rssXML.getElementsByTagName("item");
        blogTitleChannel = rssXML.getElementsByTagName("channel");
        document.getElementById("blogtitle").title =myblogTitle + "\n ( " + myc + " of " + URLFeeds.length + " blogs )" ;//+ feedType + rssItems.length;
       
        if(blogTitleChannel)
        {
         if (blogTitleChannel[0])
            {        myblogTitle = blogTitleChannel[0].firstChild.text;  
             
            }
            
        }
     }
      
        if (myblogTitle.length > 14)
        {     document.getElementById("blogtitle").innerText = Mid(myblogTitle,0,14);
        }
        else
        {     document.getElementById("blogtitle").innerText = myblogTitle;
        }     
        document.getElementById("blogtitle").title =myblogTitle + "\n ( " + myc  + " of " + URLFeeds.length + " blogs )" ;//+ feedType + rssItems.length;
      
	    rssTitle = null; rssAuthors = null; rssSummary = null; rssLink = null;
    	
	    if (end > rssItems.length)
	    {
	    end = rssItems.length
	    }
	    Reset();
	    var akey  = 4; //accesskey for second tab stop 
	    
	    for (i=start; i<end; i++) {
    		
    		pageNum.innerText = "1-5 (" + rssItems.length + ")";
    
    		
		    if (start > rssItems.length)
	        {
		    }
		    else
		    {
    		
                if (feedType == "Atom" )
                    {
                    try
                            {
    	                   if (rssItems[i].getElementsByTagName("title")) { rssTitle = rssItems[i].getElementsByTagName("title")[0].text; }
		                   if (rssItems[i].getElementsByTagName("content")) { rssSummary = rssItems[i].getElementsByTagName("content")[0].text;  }
		                   if (rssItems[i].getElementsByTagName("published")) {rssPubDate = rssItems[i].getElementsByTagName("published")[0].text; }
		                   }
		            catch(e)       
		            {}
                }
                else
                    {
    	            try
                            {
    	                   if (rssItems[i].getElementsByTagName("title")) {rssTitle = rssItems[i].getElementsByTagName("title")[0].text;}
		                   if (rssItems[i].getElementsByTagName("description")) {rssSummary = rssItems[i].getElementsByTagName("description")[0].text; }
		                   if (rssItems[i].getElementsByTagName("pubDate")[0]) {rssPubDate = rssItems[i].getElementsByTagName("pubDate")[0].text; }
		                        }
		            catch(e)       
		            {}
                    }
    	       
		        Titles[i] = rssTitle 
		        Descriptions[i] = rssSummary;
		        PublishedList[i] = rssPubDate;
		        rssItem= rssSummary;
		        cell = i - (page * 5);
        		
        		var myitem =  document.getElementById("cell" + (cell));
        		if (System.Gadget.Settings.read("mini") ==true)
	            {
    		    //document.getElementById("cell" + (cell)).innerHTML = '<div align="left" onclick="ShowFlyout(\'' + i + '\');">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + Mid(rssTitle,0,10) + '</div>';
    		    myitem.innerHTML = '<a class="title"  tabindex="'+akey+'" align="left" href="JavaScript:ShowFlyout(\'' + i + '\');"><div  class="title" >&nbsp;&nbsp;&nbsp;&nbsp;' + Mid(rssTitle,0,11) + '</div></a>';
    		    }
    		    else
    		    {
    		    //document.getElementById("cell" + (cell)).innerHTML = '<div align="left" onclick="ShowFlyout(\'' + i + '\');">&nbsp;&nbsp;&nbsp;&nbsp;' + Mid(rssTitle,0,11) + '</div>';
    		    myitem.innerHTML = '<a class="title"  tabindex="'+akey+'" align="left" href="JavaScript:ShowFlyout(\'' + i + '\');"><div  class="title" >&nbsp;&nbsp;&nbsp;&nbsp;' + Mid(rssTitle,0,11) + '</div></a>';
    		    }
	            document.getElementById("cell" + (cell)).title = rssTitle;
	            akey = akey + 1;
		    }
	 }
	
}
function HideFlyout()
{
   System.Gadget.Flyout.show = false;
   System.Gadget.Settings.write("currentClickedCell", -1);
}
////////////////////////////////////////////////////////////////////////////////
// My Blog Next
////////////////////////////////////////////////////////////////////////////////
function ChangeFeed(val)
{
HideFlyout();
Reset();
try
{
    URLFeedsCurrentID = URLFeedsCurrentID + val;
    if (URLFeedsCurrentID == -1)
    {
    URLFeedsCurrentID =URLFeeds.length -1;
    }

    if (URLFeedsCurrentID == URLFeeds.length)
    {
    URLFeedsCurrentID =0;
    }

    System.Gadget.Settings.write("FeedURL",URLFeeds[URLFeedsCurrentID]);
    flyoutWidth= URLFeedsW[URLFeedsCurrentID];
    flyoutHeight = URLFeedsH[URLFeedsCurrentID];
    System.Gadget.Settings.write("FlyoutWidth",flyoutWidth);
    System.Gadget.Settings.write("FlyoutHeight",flyoutHeight);
    
    page=0;
    Refresh();

    document.getElementById("blogtitle").title ="loading...";
 }
 catch(exception)
     {
     document.write('Error occured in ChangeFeed!');
     } 
}

// for paging
function ChangePage(off) 
{
HideFlyout();

if ((page >0)||(off>0))
{
    Reset();
     myval = Math.ceil (rssItems.length/5);
	 try
     {
	     if (((page + off) > -1) && ((page + off) < myval)) 
	       {
	          page = page + off;
		      ParseFeed(page);
	       }
	     else if ((page + off) === myval) 
	       {
	          page = 0;
	          ParseFeed(page);
	       } 
	     else if ((page + off) === 0) 
	       {
	          page = myval;
	          ParseFeed(page);
           }
           
      var startitems= 1 + 5 * page;
      var enditems = 5 + 5 * page;
      if (enditems >   rssItems.length)  
      {enditems = rssItems.length;}
      
      pageNum.innerText = startitems + "-" + enditems + " (" + rssItems.length + ")";     
     }
     catch(exception)
     {}
  }
}
function Reset()
{
cell0.innerHTML = '<div align = "center" title ="Not available">- / -</div>';
cell1.innerHTML = '<div align = "center" title ="Not available">- / -</div>';
cell2.innerHTML = '<div align = "center" title ="Not available">- / -</div>';
cell3.innerHTML = '<div align = "center" title ="Not available">- / -</div>';
cell4.innerHTML = '<div align = "center" title ="Not available">- / -</div>';
}
function ShowFlyout(i)
{

  	if (i==System.Gadget.Settings.read("currentClickedCell"))
 	{
 	        System.Gadget.Flyout.show = false;
 	        System.Gadget.Settings.write("currentClickedCell", -1);
	}
 	else
 	{
	        flyoutWidth =System.Gadget.Settings.read("FlyoutWidth");
	        flyoutHeight =System.Gadget.Settings.read("FlyoutHeight");
	        
	        System.Gadget.Settings.write("currentClickedCell", i);
	        System.Gadget.Flyout.show = true;
	}
}
function HideArrows()
{
document.getElementById("larrow").style.visibility="hidden";
document.getElementById("rarrow").style.visibility="hidden";
}
function ShowArrows()
{
document.getElementById("larrow").style.visibility="visible";
document.getElementById("rarrow").style.visibility="visible";
}
function HideArrowTitle()
{
document.getElementById("larrowtitle").style.visibility="hidden";
document.getElementById("rarrowtitle").style.visibility="hidden";
}
function ShowArrowTitle()
{
document.getElementById("larrowtitle").style.visibility="visible";
document.getElementById("rarrowtitle").style.visibility="visible";
}
