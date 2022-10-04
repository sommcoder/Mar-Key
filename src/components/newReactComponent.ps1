# command: PowerShell -File newReactComponent.ps1

# assign a variable to a sequence/user prompt?
$ComponentName = Read-Host -prompt "Enter React Component Name"

# the expression -z string is TRUE IF the lenght of string is zero
if ( $ComponentName.length -eq 0 ) 
{
    Write-Output "You must specify a component name. Pascal Case is recommended for React components."
} 
else
{
    # Create component directory.
    New-Item -Path ./$ComponentName -itemType directory;

    # Create component files.
    New-Item -Path ./$ComponentName/$ComponentName.js;
    New-Item -Path ./$ComponentName/$ComponentName.css;

    # Write component CSS file.
    Write-Output "  /* Add Component CSS here. */" >> ./$ComponentName/$ComponentName.css;
   
    # in PowerShell if you use double-quotes you can reference the variable directly in the string!
    # Write component JS file.
    Write-Output "import './$ComponentName.css';" >> ./$ComponentName/$ComponentName.js
    Write-Output "" >> ./$ComponentName/$ComponentName.js
    Write-Output "export default function $ComponentName(props) {" >> ./$ComponentName/$ComponentName.js
    Write-Output "    return (" >> ./$ComponentName/$ComponentName.js
    Write-Output "        <div>" >> ./$ComponentName/$ComponentName.js
    Write-Output '            <div></div>' >> ./$ComponentName/$ComponentName.js
    Write-Output "        </div>" >> ./$ComponentName/$ComponentName.js
    Write-Output "    );" >> ./$ComponentName/$ComponentName.js
    Write-Output "}" >> ./$ComponentName/$ComponentName.js
}

exit