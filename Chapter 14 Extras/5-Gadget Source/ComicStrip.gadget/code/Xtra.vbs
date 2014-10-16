'////////////////////////////////////////////
'// Code and content Copyright © 2008 
'// Author Rajesh Lal
'// Email: connectrajesh@hotmail.com 
'// Should not be distributed for commercial use without prior permission from the author
'////////////////////////////////////////////
'// Add your gadget to http://innovatewithgadget.com to share with everyone
'// Keep the 'aboutgadget' DIV in the Settings page, if you wish to distribute personal gadget
'// Check latest gadgets shared by other users at at www.innovatewithgadgets.com
'////////////////////////////////////////////



Sub MessageBox(alertmessage)
    MsgBox alertmessage, 64 , "Innovate with Gadgets"
End Sub

Sub Assert(exp,message)
  if (not exp) then
    MessageDialog message,48
  end if  
End Sub

Function Question(alertmessage)
    Question= MsgBox(alertmessage, 1 , "Innovate with Gadgets")
End Function

Sub MessageDialog(alertmessage, dialog)
    MsgBox alertmessage, dialog, "Innovate with Gadgets"
End sub

Sub StopExecution()
    Stop
End sub
Function IsDateF(exp)
    IsDateF = DatePart("w",exp)
End Function

'The MsgBox function displays a message box, waits for the user to click a button, and returns a value that indicates which button the user clicked.
'// Examples to debug inside the code file of gadget(gadget.js), settings (Settings.js) or flyout window 
'     
'// Question box 
'// debugMessage = "This is a test";
'// i = Question(debugMessage)
'
'// simple message box 
'// Message(i)
'
'// Assertion 
'// var x = 0;
'// Assert(x != 0,'x is nonzero');
'The MsgBox function can return one of the following values:

'1 = vbOK - OK was clicked 
'2 = vbCancel - Cancel was clicked 
'3 = vbAbort - Abort was clicked 
'4 = vbRetry - Retry was clicked 
'5 = vbIgnore - Ignore was clicked 
'6 = vbYes - Yes was clicked 
'7 = vbNo - No was clicked 

'MsgBox(prompt[,buttons][,title]) 

'Parameter Description 
'prompt Required. The message to show in the message box. Maximum length is 1024 characters. You can separate the lines using a carriage return character (Chr(13)), a linefeed character (Chr(10)), or carriage return–linefeed character combination (Chr(13) & Chr(10)) between each line 

'buttons Optional. A value or a sum of values that specifies the number and type of buttons to display, the icon style to use, the identity of the default button, and the modality of the message box. Default value is 0
'0 = vbOKOnly - OK button only 
'1 = vbOKCancel - OK and Cancel buttons 
'2 = vbAbortRetryIgnore - Abort, Retry, and Ignore buttons 
'3 = vbYesNoCancel - Yes, No, and Cancel buttons 
'4 = vbYesNo - Yes and No buttons 
'5 = vbRetryCancel - Retry and Cancel buttons 
'16 = vbCritical - Critical Message icon 
'32 = vbQuestion - Warning Query icon 
'48 = vbExclamation - Warning Message icon 
'64 = vbInformation - Information Message icon 
'0 = vbDefaultButton1 - First button is default 
'256 = vbDefaultButton2 - Second button is default 
'512 = vbDefaultButton3 - Third button is default 
'768 = vbDefaultButton4 - Fourth button is default 
'0 = vbApplicationModal - Application modal (the current application will not work until the user responds to the message box) 
'4096 = vbSystemModal - System modal (all applications wont work until the user responds to the message box) 
'We can divide the buttons values into four groups: The first group  (0–5) describes the buttons to be displayed in the message box, the second group (16, 32, 48, 64) describes the icon style, the third group (0, 256, 512, 768) indicates which button is the default; and the fourth group (0, 4096) determines the modality of the message box. When adding numbers to create a final value for the buttons parameter, use only one number from each group
' 
'title Optional. The title of the message box. Default is the application name 
