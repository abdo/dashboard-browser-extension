const DB_NAME = "happiness-dashboard-backgrounds";
const STORE = "photos";
const DB_VERSION = 1;
const MAX_CACHED = 5;
const MAX_BLOB_BYTES = 900 * 1024;
const URL_PROBE_LIMIT = 2;
const URL_PROBE_MS = 4000;

const openDb = () =>
  new Promise((resolve, reject) => {
    if (typeof indexedDB === "undefined") {
      reject(new Error("IndexedDB unavailable"));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: "id" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () =>
      reject(request.error || new Error("IndexedDB failed"));
  });

const finish = (tx, readResult) =>
  new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve(readResult ? readResult() : undefined);
    tx.onerror = () =>
      reject(tx.error || new Error("IndexedDB transaction failed"));
    tx.onabort = () =>
      reject(tx.error || new Error("IndexedDB transaction aborted"));
  });

const getAll = (db) => {
  const tx = db.transaction(STORE, "readonly");
  const request = tx.objectStore(STORE).getAll();
  return finish(tx, () => request.result || []);
};

const putRecord = (db, record) => {
  const tx = db.transaction(STORE, "readwrite");
  tx.objectStore(STORE).put(record);
  return finish(tx);
};

const trim = async (db) => {
  const records = await getAll(db);
  const extras = records
    .sort((a, b) => (b.savedAt || 0) - (a.savedAt || 0))
    .slice(MAX_CACHED);

  if (!extras.length) return;

  const tx = db.transaction(STORE, "readwrite");
  const store = tx.objectStore(STORE);
  extras.forEach((record) => {
    if (record && record.id) store.delete(record.id);
  });
  await finish(tx);
};

const canLoadImage = (src) =>
  new Promise((resolve) => {
    if (!src || typeof Image === "undefined") {
      resolve(false);
      return;
    }

    const img = new Image();
    const timer = setTimeout(() => {
      img.onload = null;
      img.onerror = null;
      resolve(false);
    }, URL_PROBE_MS);

    img.onload = () => {
      clearTimeout(timer);
      resolve(true);
    };
    img.onerror = () => {
      clearTimeout(timer);
      resolve(false);
    };
    img.src = src;
  });

const publicInfo = (info, img) => ({
  img,
  description: info.description,
  link: info.link,
  location: info.location,
  artist: info.artist,
  artistAvatar: info.artistAvatar,
  artistProfileLink: info.artistProfileLink,
  fromCache: true,
});

// Keep the last few successful photos so a later API failure still has a picture.
export const rememberBackground = (info) => {
  const run = async () => {
    if (!info) return;

    const url = info.cacheUrl || info.img;
    let blob = null;

    if (url) {
      try {
        const res = await fetch(url);
        if (res.ok) {
          const body = await res.blob();
          if (
            body.type.startsWith("image/") &&
            body.size > 0 &&
            body.size <= MAX_BLOB_BYTES
          ) {
            blob = body;
          }
        }
      } catch (err) {
        blob = null;
      }
    }

    const db = await openDb();
    try {
      await putRecord(db, {
        id: info.id || `local-${Date.now()}`,
        savedAt: Date.now(),
        blob,
        info: {
          img: url,
          description: info.description,
          link: info.link,
          location: info.location,
          artist: info.artist,
          artistAvatar: info.artistAvatar,
          artistProfileLink: info.artistProfileLink,
        },
      });
      await trim(db);
    } finally {
      db.close();
    }
  };

  return run().catch(() => {});
};

export const recallBackground = async () => {
  const db = await openDb();
  let records = [];
  try {
    records = await getAll(db);
  } finally {
    db.close();
  }

  const saved = records.filter((record) => record && record.info);
  const withBlob = saved.filter(
    (record) => record.blob instanceof Blob && record.blob.size > 0
  );

  if (withBlob.length) {
    const record = withBlob[Math.floor(Math.random() * withBlob.length)];
    return publicInfo(record.info, URL.createObjectURL(record.blob));
  }

  const withUrl = saved
    .filter((record) => record.info.img)
    .sort((a, b) => (b.savedAt || 0) - (a.savedAt || 0))
    .slice(0, URL_PROBE_LIMIT);

  for (const record of withUrl) {
    if (await canLoadImage(record.info.img)) {
      return publicInfo(record.info, record.info.img);
    }
  }

  return null;
};
