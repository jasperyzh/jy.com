/**
 * AudioStorage - Multi-strategy audio storage manager
 * 
 * Provides three storage strategies for audio recordings:
 * 1. localStorage - Quick, simple, limited to ~5MB, base64 encoded
 * 2. IndexedDB - Larger files, stores raw Blobs, no practical size limit
 * 3. Server - Upload to backend, example implementation
 * 
 * @example
 * const storage = new AudioStorage({ storageType: 'indexeddb' });
 * await storage.save('my-recording', audioBlob, { title: 'Test' });
 * const audio = await storage.get('my-recording');
 */

export class AudioStorage {
  constructor(options = {}) {
    this.config = {
      storageType: options.storageType || 'indexeddb', // 'localstorage' | 'indexeddb' | 'server'
      dbName: options.dbName || 'AudioRecorderDB',
      dbVersion: options.dbVersion || 1,
      storeName: options.storeName || 'recordings',
      serverUrl: options.serverUrl || '/api/audio',
      prefix: options.prefix || 'audio-',
    };

    this.db = null;
    this._initPromise = null;
  }

  /**
   * Initialize storage (especially for IndexedDB)
   */
  async init() {
    if (this._initPromise) {
      return this._initPromise;
    }

    if (this.config.storageType === 'indexeddb') {
      this._initPromise = this._initIndexedDB();
      await this._initPromise;
    }

    return true;
  }

  /**
   * Initialize IndexedDB
   */
  _initIndexedDB() {
    return new Promise((resolve, reject) => {
      if (!window.indexedDB) {
        reject(new Error('IndexedDB not supported'));
        return;
      }

      const request = indexedDB.open(this.config.dbName, this.config.dbVersion);

      request.onerror = () => {
        reject(new Error('Failed to open IndexedDB'));
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // Create object store if it doesn't exist
        if (!db.objectStoreNames.contains(this.config.storeName)) {
          const objectStore = db.createObjectStore(this.config.storeName, {
            keyPath: 'id',
          });

          // Create indexes
          objectStore.createIndex('timestamp', 'timestamp', { unique: false });
          objectStore.createIndex('title', 'title', { unique: false });
        }
      };
    });
  }

  /**
   * Save audio recording
   */
  async save(id, blob, metadata = {}) {
    const fullId = this.config.prefix + id;

    switch (this.config.storageType) {
      case 'localstorage':
        return this._saveToLocalStorage(fullId, blob, metadata);
      case 'indexeddb':
        await this.init();
        return this._saveToIndexedDB(fullId, blob, metadata);
      case 'server':
        return this._saveToServer(fullId, blob, metadata);
      default:
        throw new Error('Invalid storage type');
    }
  }

  /**
   * Get audio recording
   */
  async get(id) {
    const fullId = this.config.prefix + id;

    switch (this.config.storageType) {
      case 'localstorage':
        return this._getFromLocalStorage(fullId);
      case 'indexeddb':
        await this.init();
        return this._getFromIndexedDB(fullId);
      case 'server':
        return this._getFromServer(fullId);
      default:
        throw new Error('Invalid storage type');
    }
  }

  /**
   * Delete audio recording
   */
  async delete(id) {
    const fullId = this.config.prefix + id;

    switch (this.config.storageType) {
      case 'localstorage':
        return this._deleteFromLocalStorage(fullId);
      case 'indexeddb':
        await this.init();
        return this._deleteFromIndexedDB(fullId);
      case 'server':
        return this._deleteFromServer(fullId);
      default:
        throw new Error('Invalid storage type');
    }
  }

  /**
   * List all recordings
   */
  async list() {
    switch (this.config.storageType) {
      case 'localstorage':
        return this._listFromLocalStorage();
      case 'indexeddb':
        await this.init();
        return this._listFromIndexedDB();
      case 'server':
        return this._listFromServer();
      default:
        throw new Error('Invalid storage type');
    }
  }

  /**
   * Clear all recordings
   */
  async clear() {
    switch (this.config.storageType) {
      case 'localstorage':
        return this._clearLocalStorage();
      case 'indexeddb':
        await this.init();
        return this._clearIndexedDB();
      case 'server':
        return this._clearServer();
      default:
        throw new Error('Invalid storage type');
    }
  }

  /**
   * Get storage usage information
   */
  async getStorageInfo() {
    switch (this.config.storageType) {
      case 'localstorage':
        return this._getLocalStorageInfo();
      case 'indexeddb':
        return this._getIndexedDBInfo();
      case 'server':
        return this._getServerInfo();
      default:
        throw new Error('Invalid storage type');
    }
  }

  // ==================== localStorage Implementation ====================

  _saveToLocalStorage(id, blob, metadata) {
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();
        
        reader.onloadend = () => {
          const dataUrl = reader.result;
          const record = {
            id,
            dataUrl,
            size: blob.size,
            type: blob.type,
            timestamp: Date.now(),
            metadata,
          };

          try {
            localStorage.setItem(id, JSON.stringify(record));
            resolve(record);
          } catch (err) {
            if (err.name === 'QuotaExceededError') {
              reject(new Error('localStorage quota exceeded (max ~5MB)'));
            } else {
              reject(err);
            }
          }
        };

        reader.onerror = () => reject(new Error('Failed to read blob'));
        reader.readAsDataURL(blob);
      } catch (err) {
        reject(err);
      }
    });
  }

  _getFromLocalStorage(id) {
    const item = localStorage.getItem(id);
    if (!item) return null;

    try {
      const record = JSON.parse(item);
      const blob = this._dataURLToBlob(record.dataUrl);
      
      return {
        id: record.id,
        blob,
        url: URL.createObjectURL(blob),
        size: record.size,
        type: record.type,
        timestamp: record.timestamp,
        metadata: record.metadata,
      };
    } catch (err) {
      console.error('Failed to parse localStorage item:', err);
      return null;
    }
  }

  _deleteFromLocalStorage(id) {
    localStorage.removeItem(id);
    return true;
  }

  _listFromLocalStorage() {
    const items = [];
    const prefix = this.config.prefix;

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith(prefix)) {
        const item = this._getFromLocalStorage(key);
        if (item) {
          items.push(item);
        }
      }
    }

    return items.sort((a, b) => b.timestamp - a.timestamp);
  }

  _clearLocalStorage() {
    const prefix = this.config.prefix;
    const keysToRemove = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith(prefix)) {
        keysToRemove.push(key);
      }
    }

    keysToRemove.forEach(key => localStorage.removeItem(key));
    return true;
  }

  _getLocalStorageInfo() {
    let totalSize = 0;
    const prefix = this.config.prefix;

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith(prefix)) {
        const item = localStorage.getItem(key);
        totalSize += item.length * 2; // UTF-16 encoding
      }
    }

    const limit = 5 * 1024 * 1024; // 5MB typical limit

    return {
      used: totalSize,
      limit,
      available: limit - totalSize,
      percentage: (totalSize / limit) * 100,
      count: this._listFromLocalStorage().length,
    };
  }

  _dataURLToBlob(dataUrl) {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new Blob([u8arr], { type: mime });
  }

  // ==================== IndexedDB Implementation ====================

  _saveToIndexedDB(id, blob, metadata) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.config.storeName], 'readwrite');
      const objectStore = transaction.objectStore(this.config.storeName);

      const record = {
        id,
        blob,
        size: blob.size,
        type: blob.type,
        timestamp: Date.now(),
        title: metadata.title || 'Untitled',
        metadata,
      };

      const request = objectStore.put(record);

      request.onsuccess = () => resolve(record);
      request.onerror = () => reject(new Error('Failed to save to IndexedDB'));
    });
  }

  _getFromIndexedDB(id) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.config.storeName], 'readonly');
      const objectStore = transaction.objectStore(this.config.storeName);
      const request = objectStore.get(id);

      request.onsuccess = () => {
        const record = request.result;
        if (!record) {
          resolve(null);
          return;
        }

        resolve({
          id: record.id,
          blob: record.blob,
          url: URL.createObjectURL(record.blob),
          size: record.size,
          type: record.type,
          timestamp: record.timestamp,
          metadata: record.metadata,
        });
      };

      request.onerror = () => reject(new Error('Failed to get from IndexedDB'));
    });
  }

  _deleteFromIndexedDB(id) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.config.storeName], 'readwrite');
      const objectStore = transaction.objectStore(this.config.storeName);
      const request = objectStore.delete(id);

      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(new Error('Failed to delete from IndexedDB'));
    });
  }

  _listFromIndexedDB() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.config.storeName], 'readonly');
      const objectStore = transaction.objectStore(this.config.storeName);
      const request = objectStore.getAll();

      request.onsuccess = () => {
        const records = request.result.map(record => ({
          id: record.id,
          blob: record.blob,
          url: URL.createObjectURL(record.blob),
          size: record.size,
          type: record.type,
          timestamp: record.timestamp,
          metadata: record.metadata,
        }));

        resolve(records.sort((a, b) => b.timestamp - a.timestamp));
      };

      request.onerror = () => reject(new Error('Failed to list from IndexedDB'));
    });
  }

  _clearIndexedDB() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.config.storeName], 'readwrite');
      const objectStore = transaction.objectStore(this.config.storeName);
      const request = objectStore.clear();

      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(new Error('Failed to clear IndexedDB'));
    });
  }

  async _getIndexedDBInfo() {
    if (!navigator.storage || !navigator.storage.estimate) {
      return {
        used: 0,
        limit: 0,
        available: 0,
        percentage: 0,
        count: 0,
      };
    }

    const estimate = await navigator.storage.estimate();
    const recordings = await this._listFromIndexedDB();

    return {
      used: estimate.usage || 0,
      limit: estimate.quota || 0,
      available: (estimate.quota || 0) - (estimate.usage || 0),
      percentage: estimate.quota ? (estimate.usage / estimate.quota) * 100 : 0,
      count: recordings.length,
    };
  }

  // ==================== Server Implementation ====================

  async _saveToServer(id, blob, metadata) {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('audio', blob, `${id}.${this._getExtensionFromMime(blob.type)}`);
    formData.append('metadata', JSON.stringify(metadata));

    try {
      const response = await fetch(this.config.serverUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const result = await response.json();
      return {
        id,
        url: result.url,
        size: blob.size,
        type: blob.type,
        timestamp: Date.now(),
        metadata,
      };
    } catch (err) {
      throw new Error('Failed to upload to server: ' + err.message);
    }
  }

  async _getFromServer(id) {
    try {
      const response = await fetch(`${this.config.serverUrl}/${id}`);

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`Server error: ${response.status}`);
      }

      const blob = await response.blob();
      
      return {
        id,
        blob,
        url: URL.createObjectURL(blob),
        size: blob.size,
        type: blob.type,
        timestamp: Date.now(),
        metadata: {},
      };
    } catch (err) {
      throw new Error('Failed to get from server: ' + err.message);
    }
  }

  async _deleteFromServer(id) {
    try {
      const response = await fetch(`${this.config.serverUrl}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      return true;
    } catch (err) {
      throw new Error('Failed to delete from server: ' + err.message);
    }
  }

  async _listFromServer() {
    try {
      const response = await fetch(this.config.serverUrl);

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const recordings = await response.json();
      return recordings.sort((a, b) => b.timestamp - a.timestamp);
    } catch (err) {
      throw new Error('Failed to list from server: ' + err.message);
    }
  }

  async _clearServer() {
    try {
      const response = await fetch(this.config.serverUrl, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      return true;
    } catch (err) {
      throw new Error('Failed to clear server: ' + err.message);
    }
  }

  async _getServerInfo() {
    try {
      const response = await fetch(`${this.config.serverUrl}/info`);

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      return await response.json();
    } catch (err) {
      return {
        used: 0,
        limit: 0,
        available: 0,
        percentage: 0,
        count: 0,
      };
    }
  }

  // ==================== Helpers ====================

  _getExtensionFromMime(mimeType) {
    const extensions = {
      'audio/webm': 'webm',
      'audio/ogg': 'ogg',
      'audio/mp4': 'mp4',
      'audio/mpeg': 'mp3',
      'audio/wav': 'wav',
    };

    return extensions[mimeType] || 'webm';
  }

  /**
   * Static method to check storage support
   */
  static isLocalStorageSupported() {
    try {
      const test = '__test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  static isIndexedDBSupported() {
    return !!window.indexedDB;
  }

  /**
   * Get recommended storage type based on blob size
   */
  static getRecommendedStorage(blobSize) {
    if (blobSize < 1024 * 1024) { // < 1MB
      return 'localstorage';
    } else if (blobSize < 50 * 1024 * 1024) { // < 50MB
      return 'indexeddb';
    } else {
      return 'server';
    }
  }
}

export default AudioStorage;



