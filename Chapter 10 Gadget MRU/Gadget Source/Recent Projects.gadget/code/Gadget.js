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

var MRUS = new Array();
var MRUCurrentID=1; 
var CurrentMRU="8.0"; 
var NumberofItems =0;

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
	    with (document.body.style) 
             {
	           width = 130; 
	           height = 146; 
	         }
	     System.Gadget.background = "url(../images/background.png)";
	  	 document.getElementById("contenttable").height = "100%";
	   	 document.getElementById("content").style.top ="25px";
	   	 document.getElementById("content").style.width = "100px";
	   	 document.getElementById("content").style.left = "12px";
	   	 document.getElementById("content").style.fontsize ="11px";
	   	 document.getElementById("mylogo").style.left ="2px";
	   	 document.getElementById("mylogo").style.top ="70px";
	   	 document.getElementById("mylogo").style.height="70px";   
	   	 document.getElementById("pagingbar").style.top = "125px"; 
	
}

function Setup() 
{
    SystemSetup();
    Resize();
    getMRU(0);
	window.setInterval(RefreshMRU, (60 * 60000));	
}
function RefreshMRU()
{
Reset();
setTimeout(getMRU(0),550);
}

function getMRU(page)
{
Reset();
var localMRU = System.Gadget.Settings.read("CurrentMRU");

   try
    {
    if (localMRU==7) 
    NumberofItems = enumerateRegistry("7.1",page);
    if (localMRU==8) 
    NumberofItems = enumerateRegistry("8.0",page);
    if (localMRU==9) 
    NumberofItems = enumerateRegistry("9.0",page);
	    
	    if (NumberofItems>0)
	     {	
				    loading.innerText = "";				
				    page = 0;
				    content.style.visibility = "visible";
				    loading.style.visibility = "hidden";
				    error.style.visibility = "hidden";
	      } 
	      else 
	      {
				    var chkConn;
			        content.style.visibility = "hidden";
		            loading.style.visibility = "hidden";
		            error.innerText = " No Settings Found!";
		            error.style.visibility = "visible";
		 		    chkConn = setInterval(getMRU(0), 5 * 60000);
	      }
   }
	catch(e)
	{
	            content.style.visibility = "hidden";
		        loading.style.visibility = "hidden";
		        error.innerText = " No Settings Found!" ;
		        error.style.visibility = "visible";

	}
   
   
}
function ReSetup() {
	SystemSetup();
    Resize();
	getMRU(0);
}
function SystemSetup()
{
    System.Gadget.settingsUI = "Settings.html";
	
	if (System.Gadget.Settings.read("CurrentMRU")=="")
	{	System.Gadget.Settings.write("CurrentMRU","8.0"); }
    
    defaultMRU();
}

function defaultMRU()
{
    MRUS[0] = 7; // visual Studio 2003 
    MRUS[1] = 8; // Visual Studio 2005
    MRUS[2] = 9; // Visual Studio 2008
}

function HideFlyout()
{
   System.Gadget.Flyout.show = false;
   System.Gadget.Settings.write("currentClickedCell", -1);
}
function changeMRU(val)
{
Reset();

//Message(MRUCurrentID & ":" & val);
MRUCurrentID = MRUCurrentID + val;
//Message(MRUCurrentID);


    if (MRUCurrentID == -1)
    {
    MRUCurrentID =MRUS.length -1;
    }

    if (MRUCurrentID == MRUS.length)
    {
    MRUCurrentID =0;
    }

    System.Gadget.Settings.write("CurrentMRU",MRUS[MRUCurrentID]);
    page=0;
    ReSetup();
    
    if (MRUCurrentID==0)
    {
    document.getElementById("larrowtitle").title ="Previous - Visual Studio 2008";
    document.getElementById("rarrowtitle").title ="Next - Visual Studio 2005";
    
    document.getElementById("blogtitle").title ="Recent Projects - Visual Studio 2003";
    document.getElementById("blogtitle").innerText ="VS 2003"
    }
    if (MRUCurrentID==1)
    {
    document.getElementById("larrowtitle").title ="Previous - Visual Studio 2003";
    document.getElementById("rarrowtitle").title ="Next - Visual Studio 2008";
    
    document.getElementById("blogtitle").title ="Recent Projects - Visual Studio 2005";
    document.getElementById("blogtitle").innerText ="VS 2005"
    }
    if (MRUCurrentID==2)
    {
    document.getElementById("larrowtitle").title ="Previous - Visual Studio 2005";
    document.getElementById("rarrowtitle").title ="Next  - Visual Studio 2003";
    
    document.getElementById("blogtitle").title ="Recent Projects - Visual Studio 2008";
    document.getElementById("blogtitle").innerText ="VS 2008"
    }
    

//   Message(System.Gadget.Settings.read("CurrentMRU"));

}

// for paging

function changePageMRU(off) 
{
HideFlyout();

if ((page >0)||(off>0))
{
    Reset();
     myval = Math.ceil (NumberofItems/5);
	 try
     {
	     if (((page + off) > -1) && ((page + off) < myval)) 
	       {
	          page = page + off;
		      getMRU(page);
	       }
	     else if ((page + off) === myval) 
	       {
	          page = 0;
	          getMRU(page);
	       } 
	     else if ((page + off) === 0) 
	       {
	          page = myval;
	          getMRU(page);
           }
           
      var startitems= 1 + 5 * page;
      var enditems = 5 + 5 * page;
      if (enditems >   NumberofItems)  
      {enditems = NumberofItems;}
      
      pageNum.innerText = startitems + "-" + enditems + " (" + NumberofItems + ")";     
     }
     catch(exception)
     {}
  }
}

	
	
function shellOpen(value)
{
    if (MRUS[MRUCurrentID]==7)
    {	
        System.Shell.execute("C:\\Program Files\\Microsoft Visual Studio .NET 2003\\Common7\\IDE\\devenv.exe",  "\"" + decodeURIComponent(value) + "\"" ); 
    }
    if (MRUS[MRUCurrentID]==8)
    {	
        System.Shell.execute("C:\\Program Files\\Microsoft Visual Studio 8\\Common7\\IDE\\devenv.exe",  "\"" + decodeURIComponent(value) + "\"" ); 
    }
    if (MRUS[MRUCurrentID]==9)
    {
	    System.Shell.execute("C:\\Program Files\\Microsoft Visual Studio 9.0\\Common7\\IDE\\devenv.exe",  "\"" + decodeURIComponent(value) + "\"" ); 
	}
	
}
function Reset()
{

 loading.style.visibility = "visible";
 loading.title = "reloading...";
			
document.getElementById("cell0").innerHTML = '<div align = "center" title ="Not available">  </div>';
document.getElementById("cell1").innerHTML = '<div align = "center" title ="Not available">  </div>';
document.getElementById("cell2").innerHTML = '<div align = "center" title ="Not available">  </div>';
document.getElementById("cell3").innerHTML = '<div align = "center" title ="Not available">  </div>';
document.getElementById("cell4").innerHTML = '<div align = "center" title ="Not available">  </div>';
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
