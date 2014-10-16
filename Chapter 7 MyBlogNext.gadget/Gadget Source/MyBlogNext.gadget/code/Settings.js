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

System.Gadget.onSettingsClosing = SettingsClosing
var BlogFeeds = new Array();
var BlogFeedsW = new Array();
var BlogFeedsH = new Array();

function SettingsClosing(event)
{
    if(event.closeAction == event.Action.commit)
    {
        SaveSettings();
    }
    else if (event.closeAction == event.Action.cancel)
    {
    }
}
function SaveSettings() 
{
	            System.Gadget.Settings.write("mini",minime.checked );
	            System.Gadget.Settings.write("feedChanged",true);
	            System.Gadget.Settings.write("FeedURL", document.getElementById('TextBoxFeedURL').value );
	            System.Gadget.Settings.write("FlyoutWidth",document.getElementById('txtWidth').value );
	            System.Gadget.Settings.write("FlyoutHeight",document.getElementById('txtHeight').value );
	          
                   
}
function LoadSettings() {

    if  (System.Gadget.Settings.read("FeedURL") == "")
	    {
	     document.getElementById('TextBoxFeedURL').value = "http://innovatewithgadgets.com/atom.xml";
	    }
	    else
	    {
	      document.getElementById('TextBoxFeedURL').value = System.Gadget.Settings.read("FeedURL");
	    }
	    document.getElementById('txtWidth').value = System.Gadget.Settings.read("FlyoutWidth");
	    document.getElementById('txtHeight').value = System.Gadget.Settings.read("FlyoutHeight");
	    minime.checked = System.Gadget.Settings.read("mini");
	    LoadFeeds(); 
	   
}
function LoadFeeds()
{
        BlogFeeds= System.Gadget.document.parentWindow.URLFeeds;
	    BlogFeedsW= System.Gadget.document.parentWindow.URLFeedsW;
	    BlogFeedsH= System.Gadget.document.parentWindow.URLFeedsH;
	    
	    document.getElementById("rssFeed_SelectId").length = 0;
	    
	    AddItemList("Select to edit","http://innovatewithgadgets.com/atom.xml");
	    
	     for (i=0; i<BlogFeeds.length ; i++) 
	        {
	        AddItemList(BlogFeeds[i],BlogFeeds[i]);
	        }
	        
	        document.getElementById("rssFeed_SelectId").selectedIndex = 0;
            document.getElementById("TextBoxFeedURL").innerText = document.getElementById("rssFeed_SelectId").value;
            document.getElementById("txtWidth").innerText = 600;
            document.getElementById("txtHeight").innerText =600;
	    
}

 function AddItemList(Text,Value)
    {
        // Create an Option object                
        var opt = document.createElement("option");
        // Add an Option object to Drop Down/List Box
        document.getElementById("rssFeed_SelectId").options.add(opt);        
        // Assign text and value to Option object
        opt.text = Text;
        opt.value = Value;
    }
function SetTextboxes(selObj)
    {
         if(selObj.selectedIndex == 0)
         {
            //Show the textbox
            document.getElementById("AddFeed").style.visibility = 'visible';
            document.getElementById("RemoveFeed").style.visibility = 'hidden';
            document.getElementById("ResetFeed").style.visibility = 'hidden';
            document.getElementById("UpdateFeed").style.visibility = 'hidden';
      
            document.getElementById("TextBoxFeedURL").innerText = BlogFeeds[selObj.selectedIndex];
            document.getElementById("txtWidth").innerText = 600;
            document.getElementById("txtHeight").innerText = 600;
      
         }
    else
        {
        
        document.getElementById("AddFeed").style.visibility = 'visible';
        document.getElementById("RemoveFeed").style.visibility = 'visible';
        document.getElementById("ResetFeed").style.visibility = 'visible';
        document.getElementById("UpdateFeed").style.visibility = 'visible';
        //Hide the textbox
        document.getElementById("TextBoxFeedURL").innerText = BlogFeeds[selObj.selectedIndex-1];
        document.getElementById("txtWidth").innerText = BlogFeedsW[selObj.selectedIndex-1];
        document.getElementById("txtHeight").innerText =BlogFeedsH[selObj.selectedIndex-1];
        }
}
function RemoveFeed()
{
   try
    {
        System.Gadget.document.parentWindow.URLFeeds.splice(document.getElementById("rssFeed_SelectId").selectedIndex-1,1);
        System.Gadget.document.parentWindow.URLFeedsW.splice(document.getElementById("rssFeed_SelectId").selectedIndex-1,1);
        System.Gadget.document.parentWindow.URLFeedsH.splice(document.getElementById("rssFeed_SelectId").selectedIndex-1,1);
        LoadFeeds();
        document.getElementById("statusid").innerText = "Feed removed !";
    }    
    catch(exception)
    {
    document.getElementById("statusid").innerText = "Error in RemoveFeed!";
    }
}
function ResetFeed()
{
System.Gadget.document.parentWindow.URLFeeds.length = 0;
System.Gadget.document.parentWindow.URLFeedsW.length = 0;
System.Gadget.document.parentWindow.URLFeedsH.length = 0;

System.Gadget.document.parentWindow.DefaultFeeds();
LoadFeeds();

}

function AddFeed()
{
    var feedrepeat  = false;
    try
    {
        for (i=0;i<System.Gadget.document.parentWindow.URLFeeds.length;i++)
        {
        if (System.Gadget.document.parentWindow.URLFeeds[i] == document.getElementById("TextBoxFeedURL").value)
         {
         document.getElementById("statusid").innerText = "Feed already exist!";
         feedrepeat = true;
         break;
         }
        }
      
        if (feedrepeat == false)
        {
        System.Gadget.document.parentWindow.URLFeeds.push(document.getElementById("TextBoxFeedURL").value);
        System.Gadget.document.parentWindow.URLFeedsW.push(document.getElementById("txtWidth").value);
        System.Gadget.document.parentWindow.URLFeedsH.push(document.getElementById("txtHeight").value);
        document.getElementById("statusid").innerText = "Feed added!";
        LoadFeeds();
        }
    }
    catch(exception)
    {
    document.getElementById("statusid").innerText = "Error in AddFeed!";
    }

}
function UpdateFeed()
{
    try
    {
     for (i=0;i<System.Gadget.document.parentWindow.URLFeeds.length;i++)
        {
        if (System.Gadget.document.parentWindow.URLFeeds[i] == document.getElementById("TextBoxFeedURL").value)
         {
         System.Gadget.document.parentWindow.URLFeedsW[i] = document.getElementById("txtWidth").value;
         System.Gadget.document.parentWindow.URLFeedsH[i] = document.getElementById("txtHeight").value;
         document.getElementById("statusid").innerText = "Feed updated !";
         }
        }
     }
     catch(exception)
     {
     document.getElementById("statusid").innerText = "Error in UpdateFeed!";
     }
}
