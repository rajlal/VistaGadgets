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

var ClockLocations= new Array();

var ClockValuesHourDiff= new Array();
var ClockValuesMinDiff= new Array();
var ClockValuesSecDiff= new Array();

var ClockCurrentId=0; 
var SilverlightControl;   
var theTextBlock;   

var Video_HtmlString;
System.Gadget.settingsUI = "settings.html";
System.Gadget.onSettingsClosed = settingsClosed;

function handleLoad(control, userContext, rootElement)   
{   
    SilverlightControl = control;   
    theTextBlock = SilverlightControl.content.findName("location");   
    theTextBlock.addEventListener("MouseLeftButtonDown", "txtLClicked");   
    setClock(0);
}   

function setClock(clockValue) {

    var now = new Date();
    var hourAnimation = SilverlightControl.content.findName("hourAnimation");
    var minuteAnimation = SilverlightControl.content.findName("minuteAnimation");
    var secondAnimation = SilverlightControl.content.findName("secondAnimation");
    
    var hours =0;
    var minutes =0;
    var seconds =0;
    var angle  = "";
    
        if (clockValue==0)          // 0 = take the value of the system clock
        {                           // now is the current time in JavaScript
         clockhours = now.getHours();
         clockminutes = now.getMinutes();
         clockseconds = now.getSeconds();
         }
        else
         {
         clockhours = now.getHours() + ClockValuesHourDiff[ClockCurrentId];
         clockminutes =now.getMinutes() + ClockValuesMinDiff[ClockCurrentId];
         clockseconds  = now.getSeconds() + ClockValuesSecDiff[ClockCurrentId];
         }
            // Find the appropriate angle (in degrees) for the hour hand
            // based on the current time.
            if (hourAnimation)  // always a good idea to check the element when traversing an element in XAML
            {
                angle = (clockhours/12)*360 + clockminutes/2
                angle += 116.5;
                
                hourAnimation.from = angle.toString();
                hourAnimation.to = (angle + 360).toString();
            }
            
            if (minuteAnimation) 
              {
                angle = (clockminutes / 60) * 360;
                angle += 127;
                minuteAnimation.from = angle.toString();
                minuteAnimation.to = (angle + 360).toString();
            }
            
            if (secondAnimation) 
            {
            angle = (clockseconds / 60) * 360;
            angle += 127;
            secondAnimation.from = angle.toString();
            secondAnimation.to = (angle + 360).toString();
            }

}
function txtLClicked(sender, args)  
{  
    changeLocation(1);
    theTextBlock.Text = ClockLocations[ClockCurrentId];  
   
}
function settingsClosed(event)
{
    if (event.closeAction == event.Action.commit)
        {
            setClock(1);
        }
}

function Resize()
{
     System.Gadget.background = "url(../images/background.png)";   
}

function Setup() 
{
	DefaultTimesAdd();
	Resize();
	
}

function DefaultTimes()
{
ClockLocations.length=0;
ClockValuesHourDiff.length=0;
ClockValuesMinDiff.length=0;
ClockValuesSecDiff.length=0;

var now = new Date();
   ClockLocations[0] = "My Home";
   ClockValuesHourDiff[0] = now.getHours();
   ClockValuesMinDiff[0] = now.getMinutes() ;
   ClockValuesSecDiff[0] = now.getSeconds();
    
}
function DefaultTimesAdd()
{

ClockLocations.length=0;
ClockValuesHourDiff.length=0;
ClockValuesMinDiff.length=0;
ClockValuesSecDiff.length=0;

var now = new Date();

   // this is just a sample 
   // if you want to add a time and location add the hour/ minute and seconds difference from teh current time in the array 
   // if current time is for san diego the hour diff will 3  , minutes 0 seconds 0
   // For different time locations of the world go to http://www.timeanddate.com/worldclock/
  
   var GMTminus8 = 0;
   // I have taken GMT - 8 as the current home 
   // If you location is GMT minus 6  initialze the value of GMTminus8  in the the above line as 2 
   // the new value will be "var GMTminus8 = 2";
    
   ClockLocations[0] = "San diego";
   ClockValuesHourDiff[0] = GMTminus8;
   ClockValuesMinDiff[0] = 0 ;
   ClockValuesSecDiff[0] = 0; 
  
   
   ClockLocations[1] = "New York";
   ClockValuesHourDiff[1] = GMTminus8 + 3 ;
   ClockValuesMinDiff[1] = 0;
   ClockValuesSecDiff[1] = 0;
   
   ClockLocations[2] = "Mumbai";
   ClockValuesHourDiff[2] = GMTminus8 -1;
   ClockValuesMinDiff[2] = 30;
   ClockValuesSecDiff[2] = 0;
   
   ClockLocations[3] = "Frankfurt";
   ClockValuesHourDiff[3] = GMTminus8-3;
   ClockValuesMinDiff[3] = 2;
   ClockValuesSecDiff[3] = 0;
}


function changeLocation(val)
{
ClockCurrentId = ClockCurrentId + val;

    if (ClockCurrentId == -1)
    {
    ClockCurrentId =ClockLocations.length -1;
    }

    if (ClockCurrentId == ClockLocations.length)
    {
    ClockCurrentId = 0;
    }
    setClock(1) 
}