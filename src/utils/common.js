import localforage from 'localforage';

export async function getBlobFromLocalForage(key) {
  try {
    // Retrieve blob file from localforage
    const url = await localforage.getItem(key);
    const blob = await fetch(url).then(r => r.blob());
    return blob;
  }
  catch (error) {
    console.error('Error retrieving blob from localforage:', error);
    return null;
  }
}