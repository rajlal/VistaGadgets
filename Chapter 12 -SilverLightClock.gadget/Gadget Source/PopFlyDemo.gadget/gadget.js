
document.onreadystatechange = function()
{    
    if(document.readyState=='complete')
    {
        System.Gadget.settingsUI = 'Settings.htm';
        System.Gadget.onUndock = resizeGadget;
        System.Gadget.onDock = resizeGadget;    
    	resizeGadget();
    }        
} 
function resizeGadget()
{
    if(System.Gadget.docked == true)
    {
        System.Gadget.background = 'Url(bg.png)';
        gadgetBody.style.height = 150;
        gadgetBody.style.width = 130;
        document.getElementById('theframe').style.left = 4;
        document.getElementById('theframe').style.top = 5;
        document.getElementById('theframe').width = 120;
        document.getElementById('theframe').height = 139;
    }
    else
    {
        System.Gadget.background = 'Url(bg_undocked.png)';
        gadgetBody.style.height = 400;
        gadgetBody.style.width = 500;    
        document.getElementById('theframe').style.left = 19;
        document.getElementById('theframe').style.top = 18;
        document.getElementById('theframe').width = 455;
        document.getElementById('theframe').height = 356;
    }
}