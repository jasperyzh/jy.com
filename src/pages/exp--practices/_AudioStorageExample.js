/**
 * AudioStorage Usage Examples
 * 
 * Practical examples of how to save, retrieve, and manage audio recordings
 * using the AudioStorage module.
 */

import { AudioStorage } from './_AudioStorage.js';

// ==================== Example 1: Basic Save & Retrieve ====================

export async function basicExample(audioBlob) {
  // Initialize storage (IndexedDB)
  const storage = new AudioStorage({
    storageType: 'indexeddb',
  });
  await storage.init();

  // Save recording
  const recordingId = 'my-recording-' + Date.now();
  await storage.save(recordingId, audioBlob, {
    title: 'My First Recording',
    description: 'Testing the audio recorder',
  });

  console.log('Saved recording:', recordingId);

  // Retrieve recording
  const recording = await storage.get(recordingId);
  console.log('Retrieved recording:', recording);

  // Play it
  const audio = new Audio(recording.url);
  audio.play();

  return recording;
}

// ==================== Example 2: List All Recordings ====================

export async function listRecordings() {
  const storage = new AudioStorage({
    storageType: 'indexeddb',
  });
  await storage.init();

  // Get all recordings
  const recordings = await storage.list();
  
  console.log(`Found ${recordings.length} recordings`);
  
  recordings.forEach((rec, index) => {
    console.log(`${index + 1}. ${rec.id}`);
    console.log(`   Size: ${(rec.size / 1024).toFixed(2)} KB`);
    console.log(`   Date: ${new Date(rec.timestamp).toLocaleString()}`);
    console.log(`   Type: ${rec.type}`);
  });

  return recordings;
}

// ==================== Example 3: Storage Comparison ====================

export async function storageComparison(audioBlob) {
  console.log('Comparing storage methods...\n');

  // 1. localStorage
  try {
    const localStorage = new AudioStorage({ storageType: 'localstorage' });
    const start1 = performance.now();
    await localStorage.save('test-local', audioBlob, { title: 'Test' });
    const time1 = performance.now() - start1;
    
    const info1 = await localStorage.getStorageInfo();
    console.log('localStorage:');
    console.log(`  - Save time: ${time1.toFixed(2)}ms`);
    console.log(`  - Used: ${(info1.used / 1024).toFixed(2)} KB`);
    console.log(`  - Limit: ${(info1.limit / (1024 * 1024)).toFixed(2)} MB`);
    
    await localStorage.delete('test-local');
  } catch (err) {
    console.error('localStorage error:', err.message);
  }

  // 2. IndexedDB
  try {
    const indexedDB = new AudioStorage({ storageType: 'indexeddb' });
    await indexedDB.init();
    
    const start2 = performance.now();
    await indexedDB.save('test-idb', audioBlob, { title: 'Test' });
    const time2 = performance.now() - start2;
    
    const info2 = await indexedDB.getStorageInfo();
    console.log('\nIndexedDB:');
    console.log(`  - Save time: ${time2.toFixed(2)}ms`);
    console.log(`  - Used: ${(info2.used / (1024 * 1024)).toFixed(2)} MB`);
    console.log(`  - Limit: ${(info2.limit / (1024 * 1024 * 1024)).toFixed(2)} GB`);
    
    await indexedDB.delete('test-idb');
  } catch (err) {
    console.error('IndexedDB error:', err.message);
  }
}

// ==================== Example 4: Flashcard Use Case ====================

export async function flashcardExample() {
  const storage = new AudioStorage({
    storageType: 'indexeddb',
    prefix: 'flashcard-',
  });
  await storage.init();

  // Simulate saving flashcard audio
  const flashcards = [
    { id: 'apple', word: 'Apple', pronunciation: '...blob...' },
    { id: 'banana', word: 'Banana', pronunciation: '...blob...' },
    { id: 'cherry', word: 'Cherry', pronunciation: '...blob...' },
  ];

  // Save all flashcard audio
  for (const card of flashcards) {
    // In real scenario, card.pronunciation would be a Blob
    console.log(`Saving audio for: ${card.word}`);
    // await storage.save(card.id, card.pronunciation, {
    //   word: card.word,
    //   language: 'en',
    //   timestamp: Date.now()
    // });
  }

  // Later, retrieve specific flashcard audio
  const appleAudio = await storage.get('apple');
  if (appleAudio) {
    console.log('Playing pronunciation for "Apple"');
    // Play audio
  }

  // List all flashcard recordings
  const allFlashcards = await storage.list();
  console.log(`Total flashcard recordings: ${allFlashcards.length}`);

  return allFlashcards;
}

// ==================== Example 5: Batch Operations ====================

export async function batchOperations() {
  const storage = new AudioStorage({
    storageType: 'indexeddb',
  });
  await storage.init();

  // Get all recordings
  const recordings = await storage.list();

  // Filter old recordings (older than 7 days)
  const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
  const oldRecordings = recordings.filter(rec => rec.timestamp < sevenDaysAgo);

  console.log(`Found ${oldRecordings.length} old recordings to delete`);

  // Delete old recordings
  for (const recording of oldRecordings) {
    await storage.delete(recording.id);
    console.log(`Deleted: ${recording.id}`);
  }

  // Get storage info after cleanup
  const info = await storage.getStorageInfo();
  console.log(`\nStorage after cleanup:`);
  console.log(`  - Used: ${(info.used / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`  - Count: ${info.count} recordings`);
}

// ==================== Example 6: Download Recording ====================

export async function downloadRecording(recordingId, filename) {
  const storage = new AudioStorage({
    storageType: 'indexeddb',
  });
  await storage.init();

  // Get recording
  const recording = await storage.get(recordingId);
  
  if (!recording) {
    console.error('Recording not found');
    return;
  }

  // Create download link
  const a = document.createElement('a');
  a.href = recording.url;
  a.download = filename || `recording-${recordingId}.webm`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  console.log('Download started:', filename);
}

// ==================== Example 7: Export/Import Recordings ====================

export async function exportRecordings() {
  const storage = new AudioStorage({
    storageType: 'indexeddb',
  });
  await storage.init();

  const recordings = await storage.list();
  
  // Export metadata (not the actual blobs for simplicity)
  const exportData = recordings.map(rec => ({
    id: rec.id,
    size: rec.size,
    type: rec.type,
    timestamp: rec.timestamp,
    metadata: rec.metadata,
  }));

  // Convert to JSON
  const json = JSON.stringify(exportData, null, 2);
  
  // Download as JSON file
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `recordings-export-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);

  console.log('Exported metadata for', recordings.length, 'recordings');
}

// ==================== Example 8: Search Recordings ====================

export async function searchRecordings(query) {
  const storage = new AudioStorage({
    storageType: 'indexeddb',
  });
  await storage.init();

  const recordings = await storage.list();

  // Search by title or metadata
  const results = recordings.filter(rec => {
    const title = rec.metadata?.title?.toLowerCase() || '';
    const description = rec.metadata?.description?.toLowerCase() || '';
    const q = query.toLowerCase();
    
    return title.includes(q) || description.includes(q);
  });

  console.log(`Found ${results.length} recordings matching "${query}"`);
  return results;
}

// ==================== Example 9: Storage Quota Check ====================

export async function checkStorageQuota() {
  if (!navigator.storage || !navigator.storage.estimate) {
    console.log('Storage estimation not supported');
    return;
  }

  const estimate = await navigator.storage.estimate();
  
  const usedMB = (estimate.usage / (1024 * 1024)).toFixed(2);
  const quotaMB = (estimate.quota / (1024 * 1024)).toFixed(2);
  const quotaGB = (estimate.quota / (1024 * 1024 * 1024)).toFixed(2);
  const percentage = ((estimate.usage / estimate.quota) * 100).toFixed(2);

  console.log('Storage Quota Information:');
  console.log(`  - Used: ${usedMB} MB`);
  console.log(`  - Quota: ${quotaMB} MB (${quotaGB} GB)`);
  console.log(`  - Percentage: ${percentage}%`);
  
  if (percentage > 80) {
    console.warn('⚠️ Storage is getting full! Consider cleaning up old recordings.');
  }

  return estimate;
}

// ==================== Example 10: Automatic Cleanup ====================

export async function setupAutoCleanup(maxAge = 30, maxCount = 100) {
  const storage = new AudioStorage({
    storageType: 'indexeddb',
  });
  await storage.init();

  console.log(`Auto-cleanup settings:`);
  console.log(`  - Max age: ${maxAge} days`);
  console.log(`  - Max count: ${maxCount} recordings`);

  const recordings = await storage.list();
  const cutoffTime = Date.now() - (maxAge * 24 * 60 * 60 * 1000);

  // Delete old recordings
  const toDelete = recordings.filter(rec => rec.timestamp < cutoffTime);
  
  for (const rec of toDelete) {
    await storage.delete(rec.id);
    console.log(`Deleted old recording: ${rec.id}`);
  }

  // If still too many, delete oldest
  const remaining = await storage.list();
  if (remaining.length > maxCount) {
    const excess = remaining.slice(maxCount);
    for (const rec of excess) {
      await storage.delete(rec.id);
      console.log(`Deleted excess recording: ${rec.id}`);
    }
  }

  const final = await storage.list();
  console.log(`Cleanup complete. Remaining: ${final.length} recordings`);
}

// ==================== Usage in Browser Console ====================

/*
// Try these in the browser console:

import * as examples from './AudioStorageExample.js';

// List all recordings
const recordings = await examples.listRecordings();

// Search recordings
const results = await examples.searchRecordings('flashcard');

// Check storage quota
await examples.checkStorageQuota();

// Download a recording
await examples.downloadRecording('recording-123', 'my-audio.webm');

// Export metadata
await examples.exportRecordings();

// Auto cleanup (delete recordings older than 30 days)
await examples.setupAutoCleanup(30, 100);
*/






