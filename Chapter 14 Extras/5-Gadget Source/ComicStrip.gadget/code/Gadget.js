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
var URLFeedsActive = new Array();

var URLFeedsCurrentID=0; 

var Links = new Array();
var Descriptions = new Array();
var Titles = new Array();
var PublishedList = new Array();
var Authors = new Array();

System.Gadget.onSettingsClosed = settingsClosed;

function settingsClosed(event)
{

    if (event.closeAction == event.Action.commit)
        {
            if (System.Gadget.Settings.read("feedChanged"))
            {
            page=0;
            ReSetup();
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
	        
	   
	      System.Gadget.background = "url(../images/backgroundsmall" + URLFeedsCurrentID + ".png)";
	      document.getElementById("mylogo").title ="Go to gadget website";    
	      document.getElementById("contenttable").height = "50%";
	      document.getElementById("content").style.top = "18px";
	      document.getElementById("content").style.width = "72px";
	      document.getElementById("content").style.left = "42px";
	      document.getElementById("content").style.fontsize ="9px";
	      document.getElementById("mylogo").style.top = "54px";
	      document.getElementById("blogtitletable").style.top = "10px";
	      document.getElementById("pagingbar").style.top = "76px";
	    }
	    else
	    {
            with (document.body.style) 
                {
	  	            width = 130; 
		            height = 134;
	            }
	            
	     System.Gadget.background = "url(../images/background" + URLFeedsCurrentID + ".png)";
	  	 document.getElementById("mylogo").title ="Go to gadget website";    
	     document.getElementById("contenttable").height = "90%";
	   	 document.getElementById("content").style.top ="20px";
	   	 document.getElementById("content").style.width = "80px";
	   	 document.getElementById("content").style.left = "38px";
	   	 document.getElementById("content").style.fontsize ="11px";
	   	 document.getElementById("mylogo").style.left ="2px";
	   	 document.getElementById("mylogo").style.top ="70px";
	   	 document.getElementById("mylogo").style.height="70px";   
	   	 
	   	 document.getElementById("blogtitletable").style.top = "10px";
	     document.getElementById("pagingbar").style.top = "108px";
	   	}
}
function Refresh()
{
loading.style.visibility = "visible";
loading.title = "reloading...";
Reset();
Resize();
setTimeout(GetFeed,550);
}
function Setup() 
{
    SetDefaults();
 	SystemSetup();
    Resize();
 	GetFeed();
    window.setInterval(GetFeed, (30 * 60000));	
	
if (System.Gadget.Settings.read("update") ==true)
	{
	CheckForUpdate(); // include update.js in gadget.html
	window.setInterval(CheckForUpdate, (6 * 2 * 30 * 60000)); // check every 6 hours
	}
}
	
function SetDefaults()
{
 System.Gadget.Settings.write("Dilbert",true );   
 URLFeedsActive[0] = 1;
 
 System.Gadget.Settings.write("Garfield",true );
 URLFeedsActive[1] = 1;
 
 System.Gadget.Settings.write("Chicken",true );
 URLFeedsActive[2] = 1;
 
 URLFeedsActive[3] = 0;
 URLFeedsActive[4] = 0;
 URLFeedsActive[5] = 0;
 
 System.Gadget.Settings.write("Calvin",true  );
 URLFeedsActive[6] = 1;
 
 System.Gadget.Settings.write("Maxine",true  );
 URLFeedsActive[7] = 1;
 
 URLFeedsActive[8] = 0;
 URLFeedsActive[9] = 0;
 
 System.Gadget.Settings.write("Peanuts",true  );
 URLFeedsActive[10] = 1;
 
 System.Gadget.Settings.write("BobBetty",true  );
 URLFeedsActive[11] = 1;
 
}
function ReSetup() {
	SystemSetup();
    Resize();
	GetFeed();
	
	if (System.Gadget.Settings.read("update") ==true)
	{
	CheckForUpdate();
	window.setInterval(CheckForUpdate, (6 * 2 * 30 * 60000));	
	}
	
}
function SystemSetup()
{
try
{
	System.Gadget.Flyout.file = "Flyout.html";
    System.Gadget.settingsUI = "Settings.html";
	if (System.Gadget.Settings.read("FeedURL")=="")
    {
      DefaultFeed = "http://feeds.feedburner.com/VistaDilbert";
      System.Gadget.Settings.write("FeedURL",DefaultFeed); 
      DefaultFeeds();
    }
    if (System.Gadget.Settings.read("FlyoutWidth")=="")
    {
      System.Gadget.Settings.write("FlyoutWidth",610); 
      
    }
     if (System.Gadget.Settings.read("FlyoutHeight")=="")
    {
      System.Gadget.Settings.write("FlyoutHeight",320); 
      
    }
    
     if ((System.Gadget.Settings.read("update")=="")&&(System.Gadget.Settings.read("update")!==false) )
    {
      System.Gadget.Settings.write("update",false); 
    }
 }
 catch(exception)
 {}   
    
    
}
function DefaultFeeds()
{
    URLFeeds[0] = "http://feeds.feedburner.com/VistaDilbert2";
    URLFeedsW[0] = 610;
    URLFeedsH[0] = 320;
    
    URLFeeds[1] = "http://feeds.feedburner.com/VistaGarfield";
    URLFeedsW[1] = 620;
    URLFeedsH[1] = 360;
    
    URLFeeds[2] = "http://feeds.feedburner.com/Calvin-n-Hobbes";
    URLFeedsW[2] = 610;
    URLFeedsH[2] = 320;
    
    
    URLFeeds[3] = "http://feeds.feedburner.com/VistaXkcd";
    URLFeedsW[3] = 800;
    URLFeedsH[3] = 400;
    
    URLFeeds[4] = "http://feeds.feedburner.com/VistaBenson";
    URLFeedsW[4] = 875;
    URLFeedsH[4] = 400;
    
    URLFeeds[5] = "http://feeds.feedburner.com/UserFriendly2";
    URLFeedsW[5] = 750;
    URLFeedsH[5] = 400;
    
    URLFeeds[6] = "http://feeds.feedburner.com/VistaSavage";
    URLFeedsW[6] = 450;
    URLFeedsH[6] = 620;
    
    
    URLFeeds[7] = "http://feeds.feedburner.com/Maxine";
    URLFeedsW[7] = 300;
    URLFeedsH[7] = 380;
    
    URLFeeds[8] = "http://feeds.feedburner.com/ForBetterOrForWorse";
    URLFeedsW[8] = 610;
    URLFeedsH[8] = 320;
    
    URLFeeds[9] = "http://feeds.feedburner.com/Doonesbury";
    URLFeedsW[9] = 610;
    URLFeedsH[9] = 320;
    
    URLFeeds[10] = "http://feeds.feedburner.com/PeanutsVista";
    URLFeedsW[10] = 610;
    URLFeedsH[10] = 260;
    
//    URLFeeds[11] = "http://feeds.feedburner.com/BobAndBetty";

    URLFeeds[11] = "http://feeds.feedburner.com/Vistabrevity";

    URLFeedsW[11] = 610;
    URLFeedsH[11] = 320;
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
        myblogTitle = blogTitles[0].text + " - " + blogAuthor ; 
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
     
     var totitems = rssItems.length
     if (URLFeedsCurrentID ==7 )
	      totitems = 15;
    
    
   
        if (myblogTitle.length > 14)
        {     document.getElementById("blogtitle").innerText = Mid(myblogTitle,0,14);
        }
        else
        {     document.getElementById("blogtitle").innerText = myblogTitle;
        }     
        document.getElementById("blogtitle").title =myblogTitle + "\n ( " + myc  + " of " + URLFeeds.length + " )" ;//+ feedType + totitems;
      
	    rssTitle = null; rssAuthors = null; rssSummary = null; rssLink = null;
    	
	    if (end > totitems)
	    {
	    end = totitems
	    }
	    
	    Reset();
	    var akey  = 4; //accesskey 
	    for (i=start; i<end; i++) {
    	var enditems = 5;	
    		 if (end >   totitems)  
                {enditems = totitems;}
      
    		
    		pageNum.innerText = "1-" + enditems + "(" + totitems + ")";
            if (URLFeedsCurrentID ==7 )
	        pageNum.innerText = "1-" + end + "(" + totitems + ")";
            
		    if (start > totitems)
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
    	       
    	       if ((URLFeedsCurrentID==0)||(URLFeedsCurrentID==1)||(URLFeedsCurrentID==6)) // for Dilbert & Garfield
		       {
		       
		       rssSummary = rssSummary.toLowerCase();
		        var position_http=rssSummary.indexOf('http');
		        var position_gif=rssSummary.indexOf('.gif');
		        var position_jpg=rssSummary.indexOf('.jpg');
		        var position_img =0;
		        
		        if (position_gif >0)
		        {
		        position_img=position_gif-position_http;
		        }
		        else
		        {
		        position_img=position_jpg-position_http;
		        }
		       
		        rssItem= Mid(rssSummary,position_http,position_img + 4);
		        rssSummary = "<img border=0 src='" + rssItem + "'>";
		        
		    
		       }
		       if (URLFeedsCurrentID==7) // for maxine
		       {
                 //Message(i);
                 var d= new Date();
                 if (i >0) 
                 {
                 d.setDate(d.getDate()-i);
                 }
                 
                  var mDate = "00";
                  var mMonth ="00";
                  
                  //Message(d.getFullYear() + ":" + d.getMonth() + ":" + d.getDate() + ":"    );
                  
                  if (d.getMonth().toString().length ==1) 
                  {
                  mMonth = "0" + d.getMonth();
                  }
                  else
                  {
                  mMonth = d.getMonth();
                  }
                  if (d.getDate().toString().length ==1) 
                  {
                  mDate = "0" + d.getDate();
                  }
                  else
                  {
                  mDate = d.getDate();
                  }
                  var mYear = Mid(d.getFullYear(),2,2);
                  
                  rssTitle= "   " + mMonth +"-" + mDate + "-" + mYear
		          Titles[i] =  mMonth +"-" + mDate + "-" + mYear
		          Descriptions[i] = "<img src ='http://www.hallmark.com/wcsstore/HallmarkStore/images/Maxine/Max" + mMonth +"-" + mDate + "-" + mYear+ ".jpg'>";
		          PublishedList[i] = mMonth +"-" + mDate + "-" + mYear;
		          Links[i]="http://www.hallmark.com/webapp/wcs/stores/servlet/article%7C10001%7C10051%7C/HallmarkSite/Maxine/CrabbyRoad/";
		       }
		       else
		       {
		      
		       
		       Titles[i] = rssTitle 
		       Descriptions[i] = rssSummary;
		       PublishedList[i] = rssPubDate;
		       Links[i]=rssLink;
		       }
		       
		       if (URLFeedsCurrentID==0)
		       {
		       rssTitle = Mid(Titles[i],10,Titles[i].length-10)
		       }
		       else if (URLFeedsCurrentID==1)
		       {
		       rssTitle = Mid(Titles[i],9,Titles[i].length-9)
		       }
		       else if (URLFeedsCurrentID==5)
		       {
		       rssTitle = Mid(Titles[i],14,Titles[i].length-14)
		       }
		       else if (URLFeedsCurrentID==2)
		       {
		       rssTitle = Mid(Titles[i],22,Titles[i].length-22)
		       }
		       else if (URLFeedsCurrentID==8)
		       {
		       rssTitle = Mid(Titles[i],27,Titles[i].length-27)
		       }
		       else if (URLFeedsCurrentID==9)
		       {
		       rssTitle = Mid(Titles[i],15,Titles[i].length-15)
		       }
		       else if (URLFeedsCurrentID==10)
		       {
		       rssTitle = Mid(Titles[i],10,Titles[i].length-11)
		       }

		        rssItem= rssSummary;
		        cell = i - (page * 5);
		        
		        var myitem =  document.getElementById("cell" + (cell));
    	        
    	        if (System.Gadget.Settings.read("mini") ==true)
	            {
    		     myitem.innerHTML = '<a class="title"  tabindex="'+akey+'" align="left" href="JavaScript:ShowFlyout(\'' + i + '\');"><div  class="title" >&nbsp;&nbsp;&nbsp;&nbsp;' + Mid(rssTitle,0,10) + '</div></a>';
    		    }
    		    else
    		    {
    		     myitem.innerHTML = '<a class="title"  tabindex="'+akey+'" align="left" href="JavaScript:ShowFlyout(\'' + i + '\');"><div  class="title" >&nbsp;&nbsp;&nbsp;&nbsp;' + Mid(rssTitle,0,11) + '</div></a>';
    		    }
    		    
    		    
	            document.getElementById("cell" + (cell)).title = rssTitle;
	            akey = akey+1;   
	            
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
var newval = GetNextVal(val, URLFeedsCurrentID);

URLFeedsCurrentID = URLFeedsCurrentID + newval;
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

    document.getElementById("blogtitle").innerText="Loading...";
    document.getElementById("blogtitle").title ="Loading...";
}

function GetNextVal(val, URLFeedsCurrentID)
        {
        var newval = val;
        if (val == 1 )
         {
               for (j = URLFeedsCurrentID+1;j<URLFeeds.length;j++)
               {
               if (URLFeedsActive[j]==0)
                {
                newval = newval+1;
                }
                else
                {
                break;
                }
               }
          return newval;     
         }
         
          if (val == -1 )
         {
               for (j = URLFeedsCurrentID-1;j>-1;j--)
               {
               if (URLFeedsActive[j]==0)
                {
                newval = newval-1;
                }
                else
                {
                break;
                }
               }
          return newval;     
         }
        }
// for paging
function ChangePage(off) 
{
HideFlyout();

var totlength = rssItems.length;

if (URLFeedsCurrentID ==7 )
	      totlength = 15;
	        
if ((page >0)||(off>0))
{
    Reset();
     myval = Math.ceil (totlength/5);
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
      if (enditems >   totlength)  
      {enditems = totlength;}
      
      pageNum.innerText = startitems + "-" + enditems + " (" + totlength + ")";     
     
	        
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
 	
          // dilbert
          if (URLFeedsCurrentID==0)
            {
            PublishedList[i] = Mid(PublishedList[i],0,16);
               var d = new Date(PublishedList[i])
               //Message(d.getDay());
               if (d.getDay()==0)
 	            {
                 System.Gadget.Settings.write("FlyoutWidth",580);
                 System.Gadget.Settings.write("FlyoutHeight",340);
                }
                else
                {
                 System.Gadget.Settings.write("FlyoutWidth",580);
                 System.Gadget.Settings.write("FlyoutHeight",250);
                }
            }
          
          // garfield  
              if (URLFeedsCurrentID==1)
            {
               var DateFromTitle=Mid(Titles[i],9,9)
               var ddate =Mid(DateFromTitle,3,2) + "/" + Mid(DateFromTitle,0,2) + "/" + "20" + Mid(DateFromTitle,6,2);
               PublishedList[i] = ddate;
               var d = new Date(ddate)
               //Message(ddate + ":" + Titles[i] + ":" + DateFromTitle + ":" + d + ":" + d.getDay());
               if (d.getDay()==0)
 	 	        {
 	 	         System.Gadget.Settings.write("FlyoutWidth",620);
                 System.Gadget.Settings.write("FlyoutHeight",470);
                }
                else
                {
                 System.Gadget.Settings.write("FlyoutWidth",620);
                 System.Gadget.Settings.write("FlyoutHeight",250);
                }
            }
                 // Calvin and Hobbes comics
            if (URLFeedsCurrentID==2)
            {
            DateFromTitle=Mid(Titles[i],22,Titles[i].length-22)
             var d = new Date(DateFromTitle)
              PublishedList[i] = DateFromTitle;
             //Message(Mid(Titles[i],22,Titles[i].length-22) + ":" + d.getDay())
               if (d.getDay()==0)
 	 	        {
 	 	         System.Gadget.Settings.write("FlyoutWidth",630);
 	 	         System.Gadget.Settings.write("FlyoutHeight",500);
 	 	        }
 	 	      else
 	 	        {
 	 	         System.Gadget.Settings.write("FlyoutWidth",630);
 	 	         System.Gadget.Settings.write("FlyoutHeight",270);
 	 	        }  
            }
           // xkcd
            if (URLFeedsCurrentID==3)
            {
 	 	         System.Gadget.Settings.write("FlyoutWidth",760);
 	 	         System.Gadget.Settings.write("FlyoutHeight",600);
            }
            
            // benson comics
            if (URLFeedsCurrentID==4)
            {
             if (IsDateF(Mid(PublishedList[i],0,10))==6)
 	 	        {
 	 	         System.Gadget.Settings.write("FlyoutWidth",820);
 	 	         System.Gadget.Settings.write("FlyoutHeight",630);
 	 	        }
 	 	      else
 	 	        {
 	 	         System.Gadget.Settings.write("FlyoutWidth",820);
 	 	         System.Gadget.Settings.write("FlyoutHeight",320);
 	 	        }  
 	 	        
 	 	        PublishedList[i] = Mid(PublishedList[i],0,10);
            }
            
             // user friendly
            if (URLFeedsCurrentID==5)
            {
            DateFromTitle=Mid(Titles[i],15,12)
             PublishedList[i] =DateFromTitle;
               var d = new Date(PublishedList[i])
               if (d.getDay()==0)
 	 	        {
 	 	         System.Gadget.Settings.write("FlyoutWidth",740);
 	 	         System.Gadget.Settings.write("FlyoutHeight",600);
 	 	         }
 	 	         else
 	 	         {
 	 	         System.Gadget.Settings.write("FlyoutWidth",740);
 	 	         System.Gadget.Settings.write("FlyoutHeight",350);
 	 	         }
            }
              // Savage
            if (URLFeedsCurrentID==6)
            {

 	 	         System.Gadget.Settings.write("FlyoutWidth",410);
 	 	         System.Gadget.Settings.write("FlyoutHeight",480);
 	 	         PublishedList[i] = Mid(PublishedList,0,10);
            }
           // maxine
            if (URLFeedsCurrentID==7)
            {
               System.Gadget.Settings.write("FlyoutWidth",320);
 	 	       System.Gadget.Settings.write("FlyoutHeight",450);
            }
            
            if (URLFeedsCurrentID==8)
            {
             DateFromTitle=Mid(Titles[i],27,Titles[i].length-27)
              PublishedList[i] = DateFromTitle;
             var d = new Date(DateFromTitle)
               if (d.getDay()==0)
 	 	        {
 	 	         System.Gadget.Settings.write("FlyoutWidth",630);
 	 	         System.Gadget.Settings.write("FlyoutHeight",880);
 	 	        }
 	 	      else
 	 	        {
 	 	          System.Gadget.Settings.write("FlyoutWidth",630);
 	 	          System.Gadget.Settings.write("FlyoutHeight",270);
 	 	        } 
 	 	        
               
            }
            
            if (URLFeedsCurrentID==9)
            {
             DateFromTitle=Mid(Titles[i],15,Titles[i].length-15)
             var d = new Date(DateFromTitle)
             PublishedList[i] = DateFromTitle;
             //Message(Mid(Titles[i],15,Titles[i].length-15) + ":" + d.getDay())
               if (d.getDay()==0)
 	 	        {
 	 	         System.Gadget.Settings.write("FlyoutWidth",630);
 	 	         System.Gadget.Settings.write("FlyoutHeight",860);
 	 	        }
 	 	      else
 	 	        {
 	 	          System.Gadget.Settings.write("FlyoutWidth",630);
 	 	          System.Gadget.Settings.write("FlyoutHeight",260);
 	 	        } 
 	 	      }
 	 	      
 	 	       if (URLFeedsCurrentID==10)
            {
             PublishedList[i] = Mid(PublishedList[i],0,16);
                var d = new Date(PublishedList[i])
               if (d.getDay()==0)
 	 	        {
 	 	         System.Gadget.Settings.write("FlyoutWidth",760);
                 System.Gadget.Settings.write("FlyoutHeight",650);
                }
                else
                {
                 System.Gadget.Settings.write("FlyoutWidth",620);
                 System.Gadget.Settings.write("FlyoutHeight",210);
                }
            }
            
            if (URLFeedsCurrentID==11)
            {
               PublishedList[i] = Mid(PublishedList[i],4,12);
               var d = new Date(PublishedList[i])
               if (d.getDay()==0)
        	   {
                System.Gadget.Settings.write("FlyoutWidth",790);
                System.Gadget.Settings.write("FlyoutHeight",510);
               }
               else
               {
                System.Gadget.Settings.write("FlyoutWidth",350);
                System.Gadget.Settings.write("FlyoutHeight",440);
               }
           }

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
