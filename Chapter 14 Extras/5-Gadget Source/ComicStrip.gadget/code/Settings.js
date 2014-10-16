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
    else if (event.closeAction == event.Action.cancel)
    {
    }
}
function SaveSettings() 
{
	             System.Gadget.Settings.write("mini",minime.checked );
	             
	             System.Gadget.Settings.write("Dilbert",chkDilbert.checked );
	                if (chkDilbert.checked )
	                System.Gadget.document.parentWindow.URLFeedsActive[0] = 1;
	                else
	                System.Gadget.document.parentWindow.URLFeedsActive[0] = 0;
	             System.Gadget.Settings.write("Garfield",chkGarfield.checked );
	                if (chkGarfield.checked )
	                System.Gadget.document.parentWindow.URLFeedsActive[1] = 1;
	                else
	                System.Gadget.document.parentWindow.URLFeedsActive[1] = 0;
	             System.Gadget.Settings.write("Chicken",chkChicken.checked );
	                if (chkChicken.checked )
	                System.Gadget.document.parentWindow.URLFeedsActive[2] = 1;
	                else
	                System.Gadget.document.parentWindow.URLFeedsActive[2] = 0;
	             System.Gadget.Settings.write("Xkcd",chkXkcd.checked );
	               if (chkXkcd.checked )
	                System.Gadget.document.parentWindow.URLFeedsActive[3] = 1;
	                else
	                System.Gadget.document.parentWindow.URLFeedsActive[3] = 0;
	              
	             System.Gadget.Settings.write("Benson",chkBenson.checked );
	                if (chkBenson.checked )
	                System.Gadget.document.parentWindow.URLFeedsActive[4] = 1;
	                else
	                System.Gadget.document.parentWindow.URLFeedsActive[4] = 0;
	             System.Gadget.Settings.write("UserF",chkUserF.checked );
	                if (chkUserF.checked )
	                System.Gadget.document.parentWindow.URLFeedsActive[5] = 1;
	                else
	                System.Gadget.document.parentWindow.URLFeedsActive[5] = 0;
	             System.Gadget.Settings.write("Calvin",chkCalvin.checked );
	                if (chkCalvin.checked )
	                System.Gadget.document.parentWindow.URLFeedsActive[6] = 1;
	                else
	                System.Gadget.document.parentWindow.URLFeedsActive[6] = 0;
	             System.Gadget.Settings.write("Maxine",chkMaxine.checked );
	               if (chkMaxine.checked )
	                System.Gadget.document.parentWindow.URLFeedsActive[7] = 1;
	                else
	                System.Gadget.document.parentWindow.URLFeedsActive[7] = 0;
	              
	             System.Gadget.Settings.write("ForBetter",chkForBetter.checked );
	                if (chkForBetter.checked )
	                System.Gadget.document.parentWindow.URLFeedsActive[8] = 1;
	                else
	                System.Gadget.document.parentWindow.URLFeedsActive[8] = 0;
	             System.Gadget.Settings.write("Donnes",chkDonnes.checked );
	                if (chkDonnes.checked )
	                System.Gadget.document.parentWindow.URLFeedsActive[9] = 1;
	                else
	                System.Gadget.document.parentWindow.URLFeedsActive[9] = 0;
	             System.Gadget.Settings.write("Peanuts",chkPeanuts.checked );
	                if (chkPeanuts.checked )
	                System.Gadget.document.parentWindow.URLFeedsActive[10] = 1;
	                else
	                System.Gadget.document.parentWindow.URLFeedsActive[10] = 0;
	             System.Gadget.Settings.write("BobBetty",chkBobBetty.checked );
	               if (chkBobBetty.checked )
	                System.Gadget.document.parentWindow.URLFeedsActive[11] = 1;
	                else
	                System.Gadget.document.parentWindow.URLFeedsActive[11] = 0;
	              
	            
	            System.Gadget.Settings.write("feedChanged",true);
	            System.Gadget.Settings.write("update",autoupdate.checked);
}
function LoadSettings() {

  	   minime.checked = System.Gadget.Settings.read("mini");
  	   
  	   chkDilbert.checked = System.Gadget.Settings.read("Dilbert");
	   chkGarfield.checked = System.Gadget.Settings.read("Garfield");
	   chkChicken.checked = System.Gadget.Settings.read("Chicken");
	   chkXkcd.checked = System.Gadget.Settings.read("Xkcd");
	   
	   chkBenson.checked = System.Gadget.Settings.read("Benson");
	   chkUserF.checked = System.Gadget.Settings.read("UserF");
	   chkCalvin.checked = System.Gadget.Settings.read("Calvin");
	   chkMaxine.checked = System.Gadget.Settings.read("Maxine");
	   
	   chkForBetter.checked = System.Gadget.Settings.read("ForBetter");
	   chkDonnes.checked = System.Gadget.Settings.read("Donnes");
	   chkPeanuts.checked = System.Gadget.Settings.read("Peanuts");
	   chkBobBetty.checked = System.Gadget.Settings.read("BobBetty");
	   
	   autoupdate.checked = System.Gadget.Settings.read("update");
	   document.getElementById('versionlabel').innerHTML=System.Gadget.version;
	   
}
