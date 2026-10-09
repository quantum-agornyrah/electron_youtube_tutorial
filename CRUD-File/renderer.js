// Fetch elements from the html file to be accessed in the cript file
const createButtonElement = document.getElementById('createButton')
const readButtonElement = document.getElementById('readButton')
const deleteButtonElement = document.getElementById('deleteButton')
const fileContentsElement = document.getElementById('fileContents')
const fileNameElement = document.getElementById('fileName')

// Create File Function Implementation
createButtonElement.addEventListener('click', async function() {
    let fileName = fileNameElement.value;
    let fileContents = fileContentsElement.value;

    // Accesss the isolated API from the reload script
    const result = await window.electronAPI.createFile(fileName, fileContents);

    if(result.success){
        console.log('File IS CREATED');
            // Clear field after successful operation
            fileNameElement.value = '';
            fileContentsElement.value = '';
    } else{
        console.log('File could not be created:', result.error);
    }
})

// Read File Function Implementation
readButtonElement.addEventListener('click', async function() {
    let fileName = fileNameElement.value;

    // Accesss the isolated API from the reload script
    const result = await window.electronAPI.readFile(fileName);

    if(result.success){
        // Produce back the content of the selected file
        fileContentsElement.value = result.data;

        console.log('File IS READ');
    } else{
        console.log('File contents could not be READ:', result.error);
    }
})

// Delete File Function Implementation
deleteButtonElement.addEventListener('click', async function() {
    let fileName = fileNameElement.value;

    // Accesss the isolated API from the reload script
    const result = await window.electronAPI.deleteFile(fileName);

    if(result.success){
        console.log('File IS DELETED');
            // Clear field after successful operation
            fileNameElement.value = '';
            fileContentsElement.value = '';
    } else{
        console.log('File could not be DELETED:', result.error);
    }
})