const { contextBridge, ipcRenderer } = require('electron');

// Create and expose a channel to the renderer process to execute the main process function to open a new window
contextBridge.exposeInMainWorld('electronAPI', {
    openFolderLocation: () => ipcRenderer.send('open-folder-location'),
    editFile: () => ipcRenderer.send('edit-file'),
    openExternalLink: () => ipcRenderer.send('open-external-link')
});