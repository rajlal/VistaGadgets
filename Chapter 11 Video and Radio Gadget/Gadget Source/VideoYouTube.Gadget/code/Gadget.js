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


var gadgetVer = 1.1;
var page = 0;

var VideoURLs= new Array();
var VideoURLTitles= new Array();

var VideoTitle= new Array();
var VideoDescription= new Array();
var VideoLink= new Array();

var CodeCurrentId=0; 


var el_settingsFeed = "http://youtube.com/rss/global/top_rated.rss";

if (System.Gadget.Settings.read("VideoURL")=="")
{
System.Gadget.Settings.write("VideoURL",el_settingsFeed);
System.Gadget.Settings.write("VideoURLTitle","Top Rated");
}

var Video_HtmlString;
System.Gadget.settingsUI = "settings.html";
System.Gadget.onSettingsClosed = settingsClosed;

function settingsClosed(event)
{
    if (event.closeAction == event.Action.commit)
        {
            page=0;
            ReSetup();
        }
}

function Resize()
{
          
	      if (System.Gadget.docked)
	      {
	         System.Gadget.background = "url(../images/background.png)";
	  	     document.getElementById("contenttable").height = "90%";
	   	     document.getElementById("content").style.top ="20px";
	   	     document.getElementById("content").style.width = "110px";
	   	     document.getElementById("content").style.left = "8px";
	   	     document.getElementById("content").style.height = "100px";
	   	     document.getElementById("content").style.fontsize ="11px";
    	   	 
	   	     document.getElementById("mylogo").style.left ="2px";
	   	     document.getElementById("mylogo").style.top ="70px";
	   	     document.getElementById("mylogo").style.height="70px";   
	   	     document.getElementById("pagingbar").style.top = "100px"; 
	   	  }
	      else
	      { 
	       System.Gadget.background = "url(../images/undocked.png)";
	  	     document.getElementById("contenttable").height = "384px";
	   	     document.getElementById("content").style.top ="30px";
	   	     document.getElementById("content").style.width = "430px";
	   	     document.getElementById("content").style.left = "8px";
	   	     document.getElementById("content").style.height = "384px";
	   	     document.getElementById("content").style.fontsize ="11px";
    	   	 
	   	     document.getElementById("mylogo").style.left ="2px";
	   	     document.getElementById("mylogo").style.top ="70px";
	   	     document.getElementById("mylogo").style.height="70px";   
	   	     document.getElementById("pagingbar").style.top = "400px"; 
	   	    }
}


	
function Setup() 
{
	DefaultCodes();
	SystemSetup();
	Resize();
	GetRSS();
	
	window.setInterval(GetRSS, (60 * 60000));	
	window.setInterval(ImageRotate, 30000);	
}
function ImageRotate()
{
    if (System.Gadget.Settings.read("imagerotate") )
	    {
	    chPage(+1);
	    }
    
}
function ReSetup() {
	SystemSetup();
    Resize();
	RefreshData()
}
function RefreshData()
{
Reset();
setTimeout(GetRSS,550);
}

function SystemSetup()
{
    System.Gadget.onUndock = UnDocked;
	System.Gadget.onDock = Docked;
try
{
	System.Gadget.Flyout.file = "Flyout.html";
    System.Gadget.settingsUI = "Settings.html";
    
	if (System.Gadget.Settings.read("VideoURL")=="")
    {
      VideoURL = "http://youtube.com/rss/global/recently_added.rss";
      System.Gadget.Settings.write("VideoURL",VideoURL); 
      System.Gadget.Settings.write("VideoURLTitle","Recently Added"); 
    }
   
 }
 catch(exception)
 {}   
  
}
function DefaultCodes()
{
    VideoURLs.length = 0;
    VideoURLTitles.length = 0;

    VideoURLs[0] = "http://youtube.com/rss/global/top_rated.rss";
    VideoURLTitles[0] = "Top Rated";
    
    VideoURLs[1] = "http://youtube.com/rss/global/recently_added.rss";
    VideoURLTitles[1] = "Recently Added";
    
    VideoURLs[2] = "http://youtube.com/rss/global/recently_featured.rss";
    VideoURLTitles[2] = "Recently Featured";
 
    VideoURLs[3] = "http://youtube.com/rss/global/top_favorites.rss";
    VideoURLTitles[3] = "Top Favorites";
    
    // TOP VIEWED 
    
    VideoURLs[4] = "http://youtube.com/rss/global/top_viewed_today.rss";
    VideoURLTitles[4] = "Today - Top Viewed";
    
    VideoURLs[5] = "http://youtube.com/rss/global/top_viewed_week.rss";
    VideoURLTitles[5] = "Week - Top Viewed";
    
    VideoURLs[6] = "http://youtube.com/rss/global/top_viewed_month.rss";
    VideoURLTitles[6] = "Month - Top Viewed";
    
    VideoURLs[7] = "http://youtube.com/rss/global/top_viewed.rss";
    VideoURLTitles[7] = "All Times - Top Viewed";
    
    // MOST DISCUSSED 
    
    //VideoURLs[8] = "http://youtube.com/rss/global/most_discussed_today.rss";
    //VideoURLTitles[8] = "Today Top Discussed";
    
    //VideoURLs[9] = "http://youtube.com/rss/global/most_discussed_week.rss";
    //VideoURLTitles[9] = "This Week - Top Discussed ";
    
    //VideoURLs[10] = "http://youtube.com/rss/global/most_discussed_month.rss";
    //VideoURLTitles[10] = "Top Discussed This Month";
    
    
}
function Docked() 
{
	System.Gadget.background = "url('../images/docked.png')";
	with (document.body.style) 
	{
		width = 130;
		height = 134;
	}
	ReSetup();
}

function UnDocked() 
{
	System.Gadget.background = "url('../images/undocked.png')";
	with (document.body.style) 
	{
		width = 442;
		height = 420;
	}
	ReSetup();
}

function ShowFlyout(cnt)
{

	if (System.Gadget.Settings.read("currentClicked")==cnt)
	{
	System.Gadget.Settings.write("currentClicked", -1);
	HideFlyout();
	}
	else
	{
	    System.Gadget.Settings.write("currentClicked", cnt);
	    
		System.Gadget.Settings.write("sLink", VideoLink[cnt]);
		System.Gadget.Settings.write("sTitle", VideoTitle[cnt]);
		System.Gadget.Settings.write("sDescription", VideoDescription[cnt]);
		
		System.Gadget.Flyout.file = "Flyout.html";
		System.Gadget.Flyout.show = true;
	}
}

function HideFlyout()
{
   System.Gadget.Flyout.show = false;
}

// Functions to get the Video FEED
////////////////////////////////////////////////////////////////////////////////
function GetRSS() 
{
 document.getElementById("mylogo").Title = System.Gadget.Settings.read("VideoURLTitle");
 
  try
	{
    
    error.style.visibility = "hidden";
	loading.style.visibility = "visible";
	content.style.visibility = "hidden";
	loading.title  = "Connecting...";	
	
	 mytitle.innerText = Mid(System.Gadget.Settings.read("VideoURLTitle"),0,14);
	  if (System.Gadget.docked)
	      {
	      	 mytitle.innerText = Mid(System.Gadget.Settings.read("VideoURLTitle"),0,14);
	      	 }
	      else
	      {
	      	 mytitle.innerText = System.Gadget.Settings.read("VideoURLTitle");
	      }	 
	 
	 mytitle.title = System.Gadget.Settings.read("VideoURLTitle");

			
		var xmlDocument = new ActiveXObject('Microsoft.XMLDOM');
	    xmlDocument.onreadystatechange = function () 
	    {
		    if (xmlDocument.readyState == 4) 
		    {
    		    loading.innerText = "";				
				page = 0;
				content.style.visibility = "visible";
            	loading.style.visibility = "hidden";
			  	rssXML = xmlDocument;
	        	ParseRSS();
		    }
		    else
		    {
    	        loading.style.visibility = "visible";
			    loading.title = "Connecting...";

		    }
	    };
	
	    var feedURL = System.Gadget.Settings.read("VideoURL");
	    xmlDocument.load(feedURL);
	}
	catch(err)
	{
		content.style.visibility = "hidden";
		loading.style.visibility = "hidden";
		error.innerText = " Service not \navailable\n"+err;
		error.style.visibility = "visible";
	}
	 
}

function ParseRSS(page) 
{
 	try
	{
	Reset()
	
	myval = 1;
	mytotal =100;
	
		if (!page) { page = 0; }
		start = page * myval;
		rssItems = rssXML.getElementsByTagName("item");
		if (System.Gadget.Settings.read("listview"))
	        {
		        if (rssItems.length <= 100) 
		        {
		        mytotal = Math.ceil (rssItems.length/5);
		        }
		    }
		else
		    {
		        if (rssItems.length <= 100) 
		        {
		        mytotal = rssItems.length;
		        }
		    }
		
		end = (page * myval) + myval;
		
		if (end > mytotal * myval  )
		{end = mytotal * myval ;}
		
		
		
		rssTitle = null; rssAuthors = null; rssDescription = null; rssLink = null;
		var myVideo_HtmlString = "";    
		for (i=start; i<end; i++) 
		{
	    
            rssTitle = escape(rssItems[i].getElementsByTagName("title")[0].firstChild.nodeValue);
    		rssDescription=rssItems[i].getElementsByTagName("description")[0].firstChild.nodeValue;
			rssImage = rssDescription.substring(rssDescription.indexOf("<img src='")+16,rssDescription.indexOf(".jpg")+4);
			showimage = "<img width='112' height = '84' src='" +rssImage + "' border='0' </img>";
			
			
			rssLink =rssItems[i].getElementsByTagName("enclosure")[0].getAttribute("url");
			rssLink =Mid(rssLink ,0,rssLink.length-4)
			cell = i - (page * myval);
			
			myTitle = unescape(rssTitle);
			myTitle1 = myTitle.substr(0,15);
			
			
			 if (System.Gadget.docked)
	        {
	          document.getElementById("cell" + (cell)).innerHTML = '<div onclick="ShowFlyout(\'' + i + '\');" ><div class="sub" title=\''+ myTitle +'\'>'+ showimage +'</div></div>';
		    }
		    else
		    {
	      	myVideo_HtmlString = "<object width=\"425\" height=\"355\"><param name=\"movie\" value=\"" + rssLink + "&rel=1\"></param><param name=\"wmode\" value=\"transparent\"></param><embed src=\""+ rssLink +"&rel=1\" type=\"application/x-shockwave-flash\" wmode=\"transparent\" width=\"425\" height=\"355\"></embed></object>";
   	        document.getElementById("cell" + (cell)).innerHTML = myVideo_HtmlString;
            }   	        
		    VideoTitle[i]= myTitle;
		    VideoDescription[i]= rssDescription;
		    VideoLink[i]=rssLink ;		    
		    
			document.getElementById("cell" + (cell)).title = myTitle;
		}
		 pageNum.innerText = (page + 1) + "/" + mytotal;
	}
	catch (err)
	{
	 pageNum.innerText = (page + 1) + "/" + mytotal;
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
function chPage(off) 
{
try
{

        if (rssItems.length <= 100) 
        {
        myval = rssItems.length;
        }
        else
        {myval = 100;}
    		    

        if (off === -999)
        {
        off = myval-page;
        }
        if (off === 999)
        {
        off = myval-page-1;
        }

        try
        {
	        if (((page + off) > -1) && ((page + off) < myval)) 
		        {
			        page = page + off;
			        ParseRSS(page);
		        } else if ((page + off) === myval) 
		        {
			        page = 0;
			        ParseRSS(page);
		        } else if ((page + off) === 0) 
		        {
			        page = myval;
			        ParseRSS(page);
		        }
	        }
	        catch (err)
	        {
		    }
}
catch (err)
{
}
}


////////////////////////////////////////////////////////////////////////////////
// My Blog Next
////////////////////////////////////////////////////////////////////////////////
function ChangeFeed(val)
{
HideFlyout();
CodeCurrentId = CodeCurrentId + val;

    if (CodeCurrentId == -1)
    {
    CodeCurrentId =VideoURLTitles.length -1;
    }

    if (CodeCurrentId == VideoURLTitles.length)
    {
    CodeCurrentId = 0;
    }

    System.Gadget.Settings.write("VideoURLTitle",VideoURLTitles[CodeCurrentId]);
    System.Gadget.Settings.write("VideoURL",VideoURLs[CodeCurrentId]);
    
    page=0;
    ReSetup();
    document.getElementById("mytitle").title ="loading...";
    
  if (System.Gadget.docked)
	      {
	      	 mytitle.innerText = Mid(System.Gadget.Settings.read("VideoURLTitle"),0,14);
	      	 }
	      else
	      {
	      	 mytitle.innerText = System.Gadget.Settings.read("VideoURLTitle");
	      }	 
	 
		
			mytitle.title= System.Gadget.Settings.read("VideoURLTitle");
}


function Reset()
{
document.getElementById("cell0").innerHTML = '<div align = "center" title ="Not available"></div>';
document.getElementById("cell1").innerHTML = '<div align = "center" title =""></div>';
document.getElementById("cell2").innerHTML = '<div align = "center" title ="Not available"></div>';
document.getElementById("cell3").innerHTML = '<div align = "center" title ="Not available"></div>';
document.getElementById("cell4").innerHTML = '<div align = "center" title ="Not available"></div>';
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
document.getElementById("larrowtitle").style.color="silver";
document.getElementById("rarrowtitle").style.color="silver";
document.getElementById("rarrowtitle").style.visibility="visible";
}
