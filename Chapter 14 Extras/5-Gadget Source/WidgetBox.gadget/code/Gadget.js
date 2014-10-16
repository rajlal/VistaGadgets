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

var Links = new Array();
var Descriptions = new Array();
var Titles = new Array();
var PublishedList = new Array();
var Authors = new Array();
var Category= new Array();


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
	window.setInterval(GetFeed, (3 * 60 * 60000));	
}
function ReSetup() {
	SystemSetup();
    Resize();
	GetFeed();
}
function SystemSetup()
{
try
{
	System.Gadget.Flyout.file = "Flyout.html";
    System.Gadget.settingsUI = "Settings.html";
	if (System.Gadget.Settings.read("FeedURL")=="")
    {
      DefaultFeed = "http://feeds.feedburner.com/Widget-Box";
      System.Gadget.Settings.write("FeedURL",DefaultFeed); 
      DefaultFeeds();
    }
    if (System.Gadget.Settings.read("FlyoutWidth")=="")
    {
      System.Gadget.Settings.write("FlyoutWidth",400); 
      
    }
     if (System.Gadget.Settings.read("FlyoutHeight")=="")
    {
      System.Gadget.Settings.write("FlyoutHeight",320); 
      
    }
 }
 catch(exception)
 {}   
    
    
}
function DefaultFeeds()
{
    
    URLFeeds[0] = "http://feeds.feedburner.com/Widget-Box";
    URLFeedsW[0] = 400;
    URLFeedsH[0] = 320;
 
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
	
	    var xmlDocument = new ActiveXObject('Microsoft.XMLDOM');
	    xmlDocument.onreadystatechange = function () {
		if (xmlDocument.readyState == 4) {
			loading.innerText = "";				
				rssXML = xmlDocument;
	        	page = 0;
				ParseFeed();
				content.style.visibility = "visible";
				loading.style.visibility = "hidden";
		}
		else
		{
    	    loading.style.visibility = "visible";
			loading.title = "Connecting...";

		}
	};
		xmlDocument.load(System.Gadget.Settings.read("FeedURL"));

	
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
        myblogTitle = blogTitles[0].text ;//+ " - " + blogAuthor ; 
         }
        catch(e)
		{}     

     }
    else 
     {
        rssItems = rssXML.getElementsByTagName("item");
        blogTitleChannel = rssXML.getElementsByTagName("channel");
       
     
        
        if(blogTitleChannel)
        {
         if (blogTitleChannel[0])
            {        
            myblogTitle = blogTitleChannel[0].firstChild.text;  
            }
            
        }
     }
     
      
        if (myblogTitle.length > 14)
        {     document.getElementById("blogtitle").innerText = Mid(myblogTitle,0,14);
        }
        else
        {     document.getElementById("blogtitle").innerText = myblogTitle;
        }     
        document.getElementById("blogtitle").title =myblogTitle + "\n ( " + myc  + " of " + URLFeeds.length + " )" ;//+ feedType + rssItems.length;
      
	    rssTitle = null; rssAuthors = null; rssSummary = null; rssLink = null;
    	
	    if (end > rssItems.length)
	    {
	    end = rssItems.length
	    }
	    Reset();
	    for (i=start; i<end; i++) {
    	var enditems = 5;	
    		 if (end >   rssItems.length)  
                {enditems = rssItems.length;}
      
    		pageNum.innerText = "1-" + enditems + "(" + rssItems.length + ")";
    
    		
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
		                   if (rssItems[i].getElementsByTagName("feedburner:origLink")) {rssLink= rssItems[i].getElementsByTagName("feedburner:origLink")[0].text; }
		                   
		                   if (rssItems[i].getElementsByTagName("Category")) 
		                    {
		                    rssCategory =""
		                    rssCategories= rssItems[i].getElementsByTagName("category"); 
		                    for (ck=0;ck<rssCategories.length;ck++)
		                     {
		                       if (rssCategory=="")
		                       rssCategory = rssCategory + rssCategories[ck].getAttribute('term'); 
		                       else
		                       rssCategory = rssCategory + ", " + rssCategories[ck].getAttribute('term'); 
		                      }
		                    }
		                  
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
		                   if (rssItems[i].getElementsByTagName("feedburner:origLink")) {rssLink= rssItems[i].getElementsByTagName("feedburner:origLink")[0].text; }
		                  
		                        }
		            catch(e)       
		            {}
                    }
    	       
		       Titles[i] = rssTitle 
		       Descriptions[i] = rssSummary;
		       PublishedList[i] = rssPubDate;
		       Links[i]=rssLink;
		       Category[i] = rssCategory;

		        rssItem= rssSummary;
		        cell = i - (page * 5);
        		
        		if (System.Gadget.Settings.read("mini") ==true)
	            {
    		    document.getElementById("cell" + (cell)).innerHTML = '<div align="left" onclick="ShowFlyout(\'' + i + '\');">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + Mid(rssTitle,0,10) + '</div>';
    		    }
    		    else
    		    {
    		    document.getElementById("cell" + (cell)).innerHTML = '<div align="left" onclick="ShowFlyout(\'' + i + '\');">&nbsp;&nbsp;&nbsp;&nbsp;' + Mid(rssTitle,0,12) + '</div>';
    		    }
	            document.getElementById("cell" + (cell)).title = rssTitle;
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
    ReSetup();

    document.getElementById("blogtitle").title ="loading...";
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
document.getElementById("cell0").innerHTML = '<div align = "center" title ="Not available">&nbsp;</div>';
document.getElementById("cell1").innerHTML = '<div align = "center" title ="Not available">&nbsp;</div>';
document.getElementById("cell2").innerHTML = '<div align = "center" title ="Not available">&nbsp;</div>';
document.getElementById("cell3").innerHTML = '<div align = "center" title ="Not available">&nbsp;</div>';
document.getElementById("cell4").innerHTML = '<div align = "center" title ="Not available">&nbsp;</div>';

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
 	        var leftBrace = Titles[i].indexOf("(");
 	        var xBrace = Titles[i].indexOf("x",leftBrace);
 	        var rightBrace = Titles[i].indexOf(")",xBrace);
 	        
 	        
 	        //Message(Mid(Titles[i],leftBrace+1,xBrace-leftBrace-1) + "::" + Mid(Titles[i],xBrace+1,rightBrace-xBrace-1));
 	        var myWidth = parseInt(Mid(Titles[i],leftBrace+1,xBrace-leftBrace-1));
 	        var myHeight =parseInt(Mid(Titles[i],xBrace+1,rightBrace-xBrace-1));
 	        
 	        if (myWidth>0)
 	        System.Gadget.Settings.write("FlyoutWidth",myWidth +40 );
 	        else
 	        System.Gadget.Settings.write("FlyoutWidth",400 );
 	        
 	        if (myHeight>0)
 	        System.Gadget.Settings.write("FlyoutHeight", myHeight +140);
 	        else
 	        System.Gadget.Settings.write("FlyoutHeight", 360);
 	        
 	 	
            flyoutWidth =System.Gadget.Settings.read("FlyoutWidth");
	        flyoutHeight = System.Gadget.Settings.read("FlyoutHeight") ;
	        
	        System.Gadget.Settings.write("currentClickedCell", i);
	        System.Gadget.Flyout.show = true;
	        //Message(flyoutWidth +":" + flyoutHeight);
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
