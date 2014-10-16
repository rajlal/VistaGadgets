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
var backGroundShadow="black";

function Setup() 
{
 SetBackgroundShadow();
}
function SetBackgroundShadow()
{
 if(backGroundShadow=="black")
 {
    imgBackground.opacity = 100;
    imgBackground.addShadow("black", 50, 50, 0, 0);
    backGroundShadow="color"
  }
  else
  {
    imgBackground.opacity = 100;
    imgBackground.addShadow("Color(255, 255, 0, 0)", 50, 25, 0, 0);    
    backGroundShadow="black"
  }
}

function AddImage() 
{
    var file= System.Gadget.path + "\\images\\gdemo.png";
    var oBoundingRect = GDemoImage.getBoundingClientRect();
    var img = new Image();
    img.src = file;

    var imgGlow = imgBackground.addImageObject(file, oBoundingRect.right - img.width - 10, oBoundingRect.top);
    imgGlow.opacity = 50;
    imgGlow.addGlow("Color(255, 255, 0, 0)",50,25);    
}

// --------------------------------------------------------------------
// Remove all image and text elements added to the background since load.
// --------------------------------------------------------------------
function RemoveElements()
{
    imgBackground.removeObjects();
}