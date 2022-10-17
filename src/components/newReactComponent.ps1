# command: PowerShell -File newReactComponent.ps1
# I'm wondering if we can add a further conditional statement to check if the user is using the CSS-in-JS library: styled-components. mayeb script can ask user if they're using it and what the files name is. If the file doesn't exist, make it, If it doesn't, simply add the import template to the Component js file but also add a CSS boilerplate for that component in the Styled.js file.

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