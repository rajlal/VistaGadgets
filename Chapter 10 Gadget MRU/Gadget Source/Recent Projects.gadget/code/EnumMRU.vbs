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

function enumerateRegistry(path, page)
	Const HKEY_LOCAL_MACHINE = &H80000002
	Const HKEY_CURRENT_USER = &H80000001
	Set oShell = CreateObject("Wscript.Shell")
	Set filesys = CreateObject("Scripting.FileSystemObject")
	enumerateRegistry = 0
    
    strComputer = "."
	Set oReg=GetObject("winmgmts:{impersonationLevel=impersonate}!\\" & strComputer & "\root\default:StdRegProv")
	 
	strKeyPath = "Software\Microsoft\VisualStudio\" & path & "\ProjectMRUList"
	
	oReg.EnumValues HKEY_CURRENT_USER, strKeyPath, arrValueNames, arrValueTypes
	
	startpage = page * 5
	endpage = (page * 5) + 4
	
	
        	'Message(UBound(arrValueNames) & ":" &  page & ":" & startpage  & ":" & endpage )
	        For i=startpage to endpage
	        'Message(UBound(arrValueNames) & ":" &  page & ":" & startpage  & ":" & endpage )
	        document.getElementById("pageNum").innerText = startpage + 1 & "-" & endpage + 1 & " (" & UBound(arrValueNames)+1 & ")"
	            
	        if (i > UBound(arrValueNames)) then
	        else
	            iconimage = path
	            ' Msgbox "Value Name: " & arrValueNames(i) 
	            oReg.GetStringValue HKEY_CURRENT_USER,strKeyPath,arrValueNames(i),strValue
	            strUserProfile = oShell.ExpandEnvironmentStrings("%USERPROFILE%") 
	            'Msgbox strUserProfile 
		        strValue = Replace(strValue, "C:\Windows\system32\config\systemprofile", strUserProfile)
		        finalstrValue = strValue
		        
	            if (InStr(1,strValue,"{E24C65DC-7377-472B-9ABA-BC803B73C61A}")>0)then
	            strValue = Mid(strValue,1,InStr(1,strValue,"{E24C65DC-7377-472B-9ABA-BC803B73C61A}")-3)
	            iconimage="Folder"
	            finalstrValue = strValue
	            end if
	            
	            if (InStr(1,strValue,"{66A26720-8FB5-11D2-AA7E-00C04F688DDE}")>0)then
	            strValue = Mid(strValue,1,InStr(1,strValue,"{66A26720-8FB5-11D2-AA7E-00C04F688DDE}")-3)
	            iconimage="VbProj"
	            finalstrValue = strValue
	            end if
	            
	             if (InStr(1,strValue,"{FAE04EC0-301F-11D3-BF4B-00C04F79EFBC}")>0)then
	            strValue = Mid(strValue,1,InStr(1,strValue,"{FAE04EC0-301F-11D3-BF4B-00C04F79EFBC}")-3)
	            iconimage="CsProj"
	            finalstrValue = strValue
	            end if
	            
	             if (InStr(1,strValue,"{8BC9CEB8-8B4A-11D0-8D11-00A0C91BC942}")>0)then
	            strValue = Mid(strValue,1,InStr(1,strValue,"{8BC9CEB8-8B4A-11D0-8D11-00A0C91BC942}")-3)
	            iconimage="VcProj"
	            finalstrValue = strValue
	            end if
	            
	             if (InStr(1,strValue,"{E6FDF86B-F3D1-11D4-8576-0002A516ECE8}")>0)then
	            strValue = Mid(strValue,1,InStr(1,strValue,"{E6FDF86B-F3D1-11D4-8576-0002A516ECE8}")-3)
	            iconimage="Project"
	            finalstrValue = strValue
	            end if
	            
	            
	             if (InStr(1,strValue,"{66A26720-8FB5-11D2-AA7E-00C04F688DDE}")>0)then
	            strValue = Mid(strValue,1,InStr(1,strValue,"{66A26720-8FB5-11D2-AA7E-00C04F688DDE}")-3)
	            iconimage="Web"
	            finalstrValue = strValue
	            end if
	            
	            
            
               linkSrc = "javascript:shellOpen('"+encodeURIComponent(finalstrValue)+"');"	
               slashpos = InStrRev(strValue,"\")
                
               cell = i - (page * 5)
                
               document.getElementById("cell" & cell).innerHTML =  "<div onclick=""" & linkSrc & """><img src='images/vs" & iconimage & ".png'>&nbsp;&nbsp;" & Mid(strValue,slashpos+1,11) +"</div>"
               document.getElementById("cell" & cell).title = strValue
	        end if 
	            
	        Next
        	
	        if (UBound(arrValueNames) > 0 ) then enumerateRegistry = UBound(arrValueNames) + 1
	
end function	

'Project Type                 GUID  

'Web Project                  {E24C65DC-7377-472b-9ABA-BC803B73C61A}
' 
'Visual Basic                 {F184B08F-C81C-45F6-A57F-5ABD9991F28F}
' 
'Visual C#                    {FAE04EC0-301F-11D3-BF4B-00C04F79EFBC}
' 
'Visual C++                   {8BC9CEB8-8B4A-11D0-8D11-00A0C91BC942}
' 
'Visual J#                    {E6FDF86B-F3D1-11D4-8576-0002A516ECE8}
' 
'Solution Folder              {66A26720-8FB5-11D2-AA7E-00C04F688DDE}
 


sub openfile(filepath)
Dim WshShell
Set WshShell = CreateObject("WScript.Shell")
Message (filepath)
WshShell.Run filepath
end sub

'const HKEY_LOCAL_MACHINE = &H80000002
'strComputer = "."
' 
'Set oReg=GetObject("winmgmts:{impersonationLevel=impersonate}!\\" &_ 
'strComputer & "\root\default:StdRegProv")
' 
'strKeyPath = "HKEY_CURRENT_USER\Software\Microsoft\VisualStudio\8.0\ProjectMRUList"
'oReg.EnumKey HKEY_LOCAL_MACHINE, strKeyPath, arrSubKeys
' 
'For Each subkey In arrSubKeys
'    Msgbox subkey
'Next
	
'Const HKEY_CURRENT_USER = &H80000001
'const HKEY_LOCAL_MACHINE = &H80000002
'const REG_SZ = 1
'const REG_EXPAND_SZ = 2
'const REG_BINARY = 3
'const REG_DWORD = 4
'const REG_MULTI_SZ = 7
' 
'strComputer = "."
' 
'Set oReg=GetObject("winmgmts:{impersonationLevel=impersonate}!\\" &_ 
'strComputer & "\root\default:StdRegProv")
' 
'strKeyPath = "HKEY_CURRENT_USER\Software\Microsoft\VisualStudio\8.0\ProjectMRUList"
' 
'oReg.EnumValues HKEY_CURRENT_USER, strKeyPath, arrValueNames, arrValueTypes
' 
'For i=0 To UBound(arrValueNames)
'    Msgbox "Value Name: " & arrValueNames(i) 
'    
'    Select Case arrValueTypes(i)
'        Case REG_SZ
'           Msgbox "Data Type: String"
'            Msgbox "REG_SZ"
'        Case REG_EXPAND_SZ
'            Msgbox "Data Type: Expanded String"
'            Msgbox "REG_EXPAND_SZ"
'        Case REG_BINARY
'            Msgbox "Data Type: Binary"
'            Msgbox "REG_BINARY"
'        Case REG_DWORD
'            Msgbox "Data Type: DWORD"
'            Msgbox "REG_DWORD"
'        Case REG_MULTI_SZ
'            Msgbox "Data Type: Multi String"
'            Msgbox "REG_MULTI_SZ"
'    End Select 
'Next




'    Dim fso, afile, ts
'    Dim WshShell, bKey

'    Set fso = CreateObject("Scripting.FileSystemObject")

'    Dim sFileName 
'    Dim sKey

'    Dim objView, objRecord, viewList, recList
'    Dim objW3SVC, objIISWebSite, intOrder


'    intOrder = 1
'    ' Get a temp file path with the temp file name 
'    sFileName = fso.GetSpecialFolder(2).ShortPath & "\" & fso.GetTempName 

'    ' Get the last servers connected 
'    sKey = "HKEY_CURRENT_USER\Software\Microsoft\VisualStudio\8.0\ProjectMRUList"

'    Set WshShell = CreateObject("WScript.Shell")

'    ' export the registry key to a text file 
'     
'    WshShell.Run "regedit.exe /s /e " & Chr(34) & sFileName & Chr(34) & " " & Chr(34) & sKey & Chr(34), 0

'    Msgbox sFileName & vbcrlf & vbcrlf

'    Dim ik, jk
'    ' FOR DELAY so that the temp file is created succesfully before getting used 
'    ' Bug WScript.Sleep won't work 

'    For ik = 0 To 5000000 Step 5
'        jk = ik
'    Next ' i

'    Set afile = fso.GetFile(sFileName)
'    ' read one line at a time
'    set ts = afile.OpenAsTextStream (1, -2)

'    Dim thecommand, view, viewdelete

'    Do 
'	    thecommand = ts.readline & vbcrlf & vbcrlf
'   	    If InStr(1, thecommand, Chr(34), vbTextCompare) = 1 then 

'            Set objRecord = Installer.CreateRecord(4)
'            objRecord.StringData(1) = "SERVER" 'property
'            objRecord.IntegerData(2) = intOrder 'order

'    ' parse the line with double quote 
'    ' getthe i.p. address / SQL server name last connected 
'    'Sample regitry export as text file  below
'    'Windows Registry Editor Version 5.00

'    '[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\MSSQLServer\Client\SuperSocketNetLib\LastConnect]
'    '"216.30.81.210"="-150536184:tcp:216.32.81.210,1433"
'    '"(local)"="-1040187384:lpc:QUARTZ"
'    '"71.80.220.34"="-150536184:tcp:70.86.220.34,1433"
'    '"71.80.131.130"="-150536184:tcp:70.87.131.130,1433"
'    '"MSSQL01.DISCOUNTASP.NET"="-150536184:tcp:MSSQL01.DISCOUNTASP.NET,1433"
'    '"QUARTZ"="-33423352:lpc:QUARTZ"
'    '
'    ' mid("QUARTZ"="-33423352:lpc:QUARTZ",2,InStr(2, "QUARTZ"="-33423352:lpc:QUARTZ", Chr(34), vbTextCompare)-2) 
'    ' example mid funtion get the QUARTZ out of "QUARTZ"="-33423352:lpc:QUARTZ"

'            objRecord.StringData(3) = mid(thecommand,2,InStr(2, thecommand, Chr(34), vbTextCompare)-2) 
'            objRecord.StringData(4) = mid(thecommand,2,InStr(2, thecommand, Chr(34), vbTextCompare)-2) 

'             'now add the record to the table
'            call objView.Modify(7,objRecord)
'            
'            intOrder = intOrder + 1

'	    end if
'   	    if ts.AtEndofStream then exit do
'       	
'    Loop


'    objView.Close

'    Set WshShell = nothing
'const HKEY_CURRENT_USER = &H80000001 strComputer = "." 

'Set oReg=GetObject( _ "winmgmts:{impersonationLevel=impersonate}!\\" &_ strComputer & "\root\default:StdRegProv") 

'strKeyPath = "Console" 

'strValueName = "HistoryBufferSize" oReg.GetDWORDValue _ 

'HKEY_CURRENT_USER,strKeyPath,strValueName,dwValue 

'WScript.Echo "Current History Buffer Size: " & dwValue 
'WScript.Echo "subkey"















