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

var flyoutType =0;


var SiteMeterCodes= new Array();
var SiteMeterTitles= new Array();


var SiteMeterCodeCurrentID=0; 
var SiteMeterSummary = "";

var SiteMeterDataValues= new Array();

var PageViews = new Array();
var Visits = new Array();
var Dates = new Array();


System.Gadget.onSettingsClosed = settingsClosed;

function settingsClosed(event)
{

    if (event.closeAction == event.Action.commit)
        {
            if (System.Gadget.Settings.read("itemChanged"))
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
	        
	         System.Gadget.background = "url(../images/backgroundsmall.png)";
	         
	         document.getElementById("contenttable").height = "50%";
	    	 document.getElementById("content").style.top = "18px";
	    	 document.getElementById("content").style.width = "82px";
	    	 document.getElementById("content").style.left = "38px";
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
	   	 document.getElementById("content").style.top ="22px";
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
    getData(); 
   }
function getData()
{
 getHTMLAjax("http://www.sitemeter.com/?a=stats&s=" + System.Gadget.Settings.read("sitemeterCode") + "&gadget=true");
 getTextAjax();
}   
function ReSetup() {
	SystemSetup();
    Resize();
	RefreshData()
}
function RefreshData()
{
Reset();
setTimeout(getData(),550);
}
function SystemSetup()
{
try
{
	System.Gadget.Flyout.file = "Flyout.html";
    System.Gadget.settingsUI = "Settings.html";
	if (System.Gadget.Settings.read("sitemeterCode")=="")
    {
      SiteMeterCode = "sm5sitefreestuff";
      System.Gadget.Settings.write("sitemeterCode",SiteMeterCode); 
      System.Gadget.Settings.write("sitemeterTitle","SiteMeter"); 
      DefaultCodes();
    }
 }
 catch(exception)
 {}   
    
    
}
function DefaultCodes()
{
    SiteMeterCodes.length = 0;
    SiteMeterTitles.length = 0;

    SiteMeterCodes[0] = "sm5sitefreestuff";
    SiteMeterTitles[0] = "SiteMeter";

}


////////////////////////////////////////////////////////////////////////////////
// Ajax function to get data 
////////////////////////////////////////////////////////////////////////////////

function getTextAjax() {
	error.style.visibility = "hidden";
	loading.style.visibility = "visible";
	content.style.visibility = "hidden";
	loading.style.visibility = "visible";
	loading.title  = "Connecting...";	
				
	 blogtitle.innerText = Mid(System.Gadget.Settings.read("sitemeterTitle"),0,14);
	 blogtitle.title = System.Gadget.Settings.read("sitemeterTitle");
	var SMC = System.Gadget.Settings.read("sitemeterCode");
	var firstthree =  Mid(SMC,0,3);
	ajaxObj = new ActiveXObject("Microsoft.XMLHTTP");
	myURL = "http://" + firstthree + ".sitemeter.com/rpc/v6/server.asp?a=GetChartData&n=9&p1=" + SMC + "&p2=&p3=6&p4=0&p5=208%2E70%2E116%2E25&p6=HTML&p7=1&p8=%2E%3Fa%3Dstatistics&p9=&rnd=47190";
    ajaxObj.open("GET", myURL, true);
	ajaxObj.onreadystatechange = function() {
		if (ajaxObj.readyState === 4) {
			if (ajaxObj.status === 200) {	
				loading.innerText = "";				
				page = 0;
				parseData(ajaxObj.responseText);
				content.style.visibility = "visible";
            	loading.style.visibility = "hidden";
			} else {
				var chkConn;
				loading.innerText = "Unable to connect...";				
				chkConn = setInterval(getTextAjax, 30 * 60000);
			}
    	} else {
			loading.innerText = "...";
		}
	}	
	ajaxObj.send(null);
}
function getHTMLAjax(pageURL) {
 	htmlObj = new ActiveXObject("Microsoft.XMLHTTP");
	htmlObj.open("GET", pageURL, true);
	htmlObj.onreadystatechange = function() {
		if (htmlObj.readyState === 4) {
			if (htmlObj.status === 200) {	
				document.getElementById('sitesummary').innerHTML = htmlObj.responseText;
		        parseHTML()
			} else {
				chkConn = setInterval(getHTMLAjax, 30 * 60000);
			}
    	} else {
		}
	}	
	htmlObj.send(null);
}
function parseHTML()
{
    //parse HTML 
    tcMain = document.getElementById("Table_01");
    if (tcMain)
    {

        var TableID = tcMain.childNodes[0] ;
        var dataTable = TableID.childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[1].childNodes[1].childNodes[0].childNodes[0].childNodes[1].childNodes[0];
        if (dataTable)
        {
        var str = dataTable.outerHTML
        SiteMeterSummary = str;
        }
    }
}


function parseData(Data) 
{
	var pageViewsTotal=0;
	var visitsTotal=0;
	
    SiteMeterDataValues = Data.split("|");
    
     for (i=0; i<SiteMeterDataValues.length-1; i=i+2) 
     {
        PageViews[i] = SiteMeterDataValues[i];
        Visits[i] = SiteMeterDataValues[i+1];
        
        pageViewsTotalArr = PageViews[i].split(",");
        pageViewsTotal = pageViewsTotal + parseInt(pageViewsTotalArr[0]);
        
        visitsTotalArr = Visits[i].split(",");
        visitsTotal = visitsTotal + parseInt(visitsTotalArr[0]);
     }
     
  
   if (System.Gadget.Settings.read("completeView") ==true)
	{
    cell0.innerHTML = '<div align="left" class="title"  onclick="ShowFlyout(\'0\');" title ="'+ pageViewsTotal + ' page views & ' + visitsTotal + ' visits in last 7 days">Summary</div>';
    cell1.innerHTML = '<div align="left" class="title" ><a onclick="ShowFlyout(\'1\');">Week</a> /<a onclick="ShowFlyout(\'2\');">Mon</a> /<a onclick="ShowFlyout(\'3\');">Year</a></div>';
    cell2.innerHTML = '<div align="left" class="title" ><a onclick="ShowFlyout(\'4\');">Region</a> /<a onclick="ShowFlyout(\'5\');">Location</a></div>';
    cell3.innerHTML = '<div align="left" class="title" ><a onclick="ShowFlyout(\'6\');">OS</a> /<a onclick="ShowFlyout(\'7\');">Browser</a></div>';
    cell4.innerHTML = '<div align="left"  class="title" onclick="ShowFlyout(\'8\');">Go Online</div>';
    }
    else
    {
    cell0.innerHTML = '<div align="left"  class="title" onclick="ShowFlyout(\'0\');" title ="'+ pageViewsTotal + ' page views & ' + visitsTotal + ' visits in last 7 days">Summary</div>';
    cell1.innerHTML = '<div align="left"  class="title" onclick="ShowFlyout(\'1\');">Weekly</div>';
    cell2.innerHTML = '<div align="left"  class="title" onclick="ShowFlyout(\'2\');">Monthly</div>';
    cell3.innerHTML = '<div align="left"  class="title" onclick="ShowFlyout(\'4\');">Location</div>';
    cell4.innerHTML = '<div align="left"  class="title" onclick="ShowFlyout(\'8\');">Go Online</div>';
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
SiteMeterCodeCurrentID = SiteMeterCodeCurrentID + val;
    if (SiteMeterCodeCurrentID == -1)
    {
    SiteMeterCodeCurrentID =SiteMeterCodes.length -1;
    }

    if (SiteMeterCodeCurrentID == SiteMeterCodes.length)
    {
    SiteMeterCodeCurrentID = 0;
    }

    System.Gadget.Settings.write("sitemeterCode",SiteMeterCodes[SiteMeterCodeCurrentID]);
    System.Gadget.Settings.write("sitemeterTitle",SiteMeterTitles[SiteMeterCodeCurrentID]);
    
    page=0;
    ReSetup();
    document.getElementById("blogtitle").title ="loading...";
    
    blogtitle.innerText = Mid(System.Gadget.Settings.read("sitemeterTitle"),0,14);
    blogtitle.title= System.Gadget.Settings.read("sitemeterTitle");
}


function Reset()
{
 
 loading.style.visibility = "visible";
 loading.title = "reloading...";
 
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
        flyoutType = i;
        if (i==8)
        {
        var firstthree =  Mid(System.Gadget.Settings.read("sitemeterCode"),0,3);
        var statsURL =   "http://www.sitemeter.com/?a=stats&s=" + System.Gadget.Settings.read("sitemeterCode") + "&gadget=true"
        System.Shell.execute(statsURL);
        }
        else
        {
          System.Gadget.Settings.write("currentClickedCell", i);
	      System.Gadget.Flyout.show = true;
        }
    }    
}
function HideArrows()
{
//document.getElementById("larrow").style.visibility="hidden";
//document.getElementById("rarrow").style.visibility="hidden";
}
function ShowArrows()
{
//document.getElementById("larrow").style.visibility="visible";
//document.getElementById("rarrow").style.visibility="visible";
}
function HideArrowTitle()
{
document.getElementById("larrowtitle").style.visibility="hidden";
document.getElementById("rarrowtitle").style.visibility="hidden";
}
function ShowArrowTitle()
{
document.getElementById("larrowtitle").style.visibility="visible";
document.getElementById("larrowtitle").style.color="white";
document.getElementById("rarrowtitle").style.visibility="visible";
}

