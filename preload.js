// Preload is intentionally minimal - security best practice.
// Expose no extra APIs for now; renderer works purely offline.
const { contextBridge } = require('electron');
contextBridge.exposeInMainWorld('isDesktop', true);
