// Test the renderer process of the Electron application
console.log('My new script for electron app');

// Reference to the button in the HTML
const createNewWindowButton = document.getElementById('createNewWindow');

// Execute the API call to create the new window when the reference button is clicked
createNewWindowButton.addEventListener('click', function(){
    window.electronAPI.openNewWindow();
})