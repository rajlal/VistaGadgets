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

System.Gadget.onSettingsClosing = settingsClosing;

function settingsClosing(event)
{
    if(event.closeAction == event.Action.commit)
    {
        SaveSettings();
    }
}
function SaveSettings() 
{
//AddItem();
}

function ResetItem()
{
System.Gadget.document.parentWindow.DefaultTimes();
document.getElementById("errorid").innerText = "Time and Location set to My Home!";
}

function AddItem()
{
   
  var Itemrepeat  = false;
    for (i=0;i<System.Gadget.document.parentWindow.ClockLocations.length;i++)
    {
    var timeLocation = document.getElementById("txtTimeLocation").value ;
    
    if (System.Gadget.document.parentWindow.ClockLocations[i] == timeLocation)
     {
     document.getElementById("errorid").innerText = "Item already exist!";
     Itemrepeat = true;
     break;
    }
    }
    
    if (Itemrepeat == false)
    {
    var now = new Date();
    var clockhours = now.getHours();
    var clockminutes = now.getMinutes()
    var clockseconds = now.getSeconds();
    
    var hourPart= Mid(document.getElementById("txtTimeValue").value,0,2);
    var minutePart= Mid(document.getElementById("txtTimeValue").value,3,2);
    var secondPart= Mid(document.getElementById("txtTimeValue").value,6,2);
    
   System.Gadget.document.parentWindow.ClockLocations.push(timeLocation);
   System.Gadget.document.parentWindow.ClockValuesHourDiff.push(hourPart-clockhours);
   System.Gadget.document.parentWindow.ClockValuesMinDiff.push(minutePart-clockminutes);
   System.Gadget.document.parentWindow.ClockValuesSecDiff.push(secondPart-clockseconds);
   System.Gadget.document.parentWindow.CodeCurrentId = System.Gadget.document.parentWindow.ClockLocations.length-1;
   document.getElementById("errorid").innerText = "Time for " + timeLocation + " added!";
  }
}
function LoadSettings() {

var now = new Date();
  
 var clockhours = now.getHours().toString();
 var clockminutes = now.getMinutes().toString();
 var clockseconds = now.getSeconds().toString();
 
 if (clockhours.length==1)
 clockhours = "0" + clockhours.toString();
 
 if (clockminutes.length==1)
 clockminutes = "0" + clockminutes.toString();
 
 if (clockseconds.length==1)
 clockseconds = "0" + clockseconds.toString();
    
document.getElementById('txtTimeValue').value =clockhours + ":" + clockminutes + ":" + clockseconds ;
document.getElementById('txtTimeLocation').value = "My Home" ;
  
}
