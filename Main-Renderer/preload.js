const { contextBridge, ipcRenderer } = require('electron');

// Create and expose a channel to the renderer process to execute the main process function to open a new window
contextBridge.exposeInMainWorld('electronAPI', {
    openNewWindow: () => ipcRenderer.send('open-new-window')
});