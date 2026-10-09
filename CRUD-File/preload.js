const { contextBridge, ipcRenderer } = require('electron');

// Create and expose a channel to the renderer process to execute the main process function to open a new window
contextBridge.exposeInMainWorld('electronAPI', {
    createFile: (fileName, fileContents) => ipcRenderer.invoke('create-file', fileName, fileContents),
    readFile: (fileName) => ipcRenderer.invoke('read-file', fileName),
    deleteFile: (fileName) => ipcRenderer.invoke('delete-file', fileName)
});