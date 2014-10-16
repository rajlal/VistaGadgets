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

// The minimum functionality is shown here for clarity
// The function will populate the projects once the VisualStudioMRU.dll is registered 
// The on click functionality is not simulated and assumed

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
		            height = 146;//134
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


function EnumerateProjects(version, page)
{
     var startpage = page * 5 + 1;
	 var endpage = (page * 5) + 5 ;
	 iconimage="CsProj"
	 
	 objMRU = new ActiveXObject("VisualStudioMRU.clsMRU");
	 objMRU.VisualStudioMRU_Get (version);
	 var totalCount =objMRU.CollectionCount;
	 
	 document.getElementById("pageNum").innerText = startpage + "-" + endpage + " (" + totalCount + ")"
	 
	 for (i=startpage;i<endpage+1;i++)
	 {
	   iconimage="CsProj"
	   strValue = objMRU.colMRUFiles.Item(i);
	   strValues = strValue.split("|");
	  
	   if (strValues[1] == "{E24C65DC-7377-472B-9ABA-BC803B73C61A}")
	   iconimage="Folder"
	            
	   if (strValues[1] =="{66A26720-8FB5-11D2-AA7E-00C04F688DDE}")
	   iconimage="VbProj"
	            
	   if (strValues[1] =="{FAE04EC0-301F-11D3-BF4B-00C04F79EFBC}")
	   iconimage="CsProj"
	            
	   if (strValues[1] =="{8BC9CEB8-8B4A-11D0-8D11-00A0C91BC942}")
	   iconimage="VcProj"
	            
	   if (strValues[1] =="{E6FDF86B-F3D1-11D4-8576-0002A516ECE8}")
	   iconimage="Project"
	            
	   if (strValues[1] =="{66A26720-8FB5-11D2-AA7E-00C04F688DDE}")
	   iconimage="Web"
	   
	   cell = i - (page * 5) -1
       
       var myitem =  document.getElementById("cell" + (cell));
       
       strValues[0] = Mid(strValues[0],0,strValues[0].length-1);
       slashpos= ReverseStringPos(strValues[0]);
       myitem.innerHTML =  '<div><img src="images/vs' + iconimage + '.png">&nbsp;&nbsp;' + Mid(strValue,slashpos,11) + '</div>';
       myitem .title = strValues[0];
	 }
	 return totalCount;  
	    
}
function getMRU(page)
{
Reset();
var localMRU = System.Gadget.Settings.read("CurrentMRU");

   try
    {
    if (localMRU==7) 
    NumberofItems = EnumerateProjects("7",page);
    if (localMRU==8) 
    NumberofItems = EnumerateProjects("8",page);
    if (localMRU==9) 
    NumberofItems = EnumerateProjects("9",page);

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

////////////////////////////////////////////////////////////////////////////////
// XML Functions TO GET  feed 
////////////////////////////////////////////////////////////////////////////////
function Mid(str, start, len)
        {
                // Make sure start and len are within proper bounds
                if (start < 0 || len < 0) return "";

                var iEnd, iLen = String(str).length;
                if (start + len > iLen)
                        iEnd = iLen;
                else
                        iEnd = start + len;

                return String(str).substring(start,iEnd);
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
function Msg(prompt)
{
var WshShell = new ActiveXObject("WScript.Shell");
var BtnCode = WshShell.Popup(prompt, 7, "Innovate With Gadgets!", 4 + 32);
}