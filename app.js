(() => {
  "use strict";

  // Il file video deve chiamarsi video.mp4 e trovarsi nella stessa cartella di index.html.
  const VIDEO_URL = new URL("./video.mp4", window.location.href).href;
  const VIDEO_CACHE = "video-offline-file-v1";
  const video = document.getElementById("video");
  const statusText = document.getElementById("status");
  const saveButton = document.getElementById("saveButton");
  const removeButton = document.getElementById("removeButton");
  let currentObjectUrl = null;

  function status(message) {
    statusText.textContent = message;
  }

  function setVideoBlob(blob) {
    if (currentObjectUrl) URL.revokeObjectURL(currentObjectUrl);
    currentObjectUrl = URL.createObjectURL(blob);
    video.src = currentObjectUrl;
    video.load();
  }

  async function getCachedVideo() {
    if (!("caches" in window)) return null;
    const cache = await caches.open(VIDEO_CACHE);
    return await cache.match(VIDEO_URL);
  }

  async function showCachedVideo() {
    const response = await getCachedVideo();
    if (!response) return false;
    const blob = await response.blob();
    setVideoBlob(blob);
    status("Copia offline disponibile su questo dispositivo.");
    return true;
  }

  async function registerServiceWorker() {
    if (!("serviceWorker" in navigator)) {
      status("Il browser non supporta il salvataggio offline della pagina.");
      return;
    }
    try {
      await navigator.serviceWorker.register("./sw.js");
      await navigator.serviceWorker.ready;
    } catch (error) {
      console.error(error);
      status("Non sono riuscito ad attivare la modalità offline della pagina.");
    }
  }

  saveButton.addEventListener("click", async () => {
    if (!navigator.onLine) {
      status("Sei offline: connettiti a internet per scaricare o aggiornare il video.");
      return;
    }
    saveButton.disabled = true;
    saveButton.textContent = "Download in corso…";
    status("Sto scaricando il video. Non chiudere questa pagina.");
    try {
      const response = await fetch(VIDEO_URL, { cache: "no-store" });
      if (!response.ok) throw new Error("HTTP " + response.status);
      const contentType = response.headers.get("content-type") || "";
      if (!contentType.includes("video") && !contentType.includes("octet-stream")) {
        throw new Error("Il file video non è stato trovato. Controlla che video.mp4 sia nella cartella principale del sito.");
      }
      const cache = await caches.open(VIDEO_CACHE);
      await cache.put(VIDEO_URL, response.clone());
      const blob = await response.blob();
      setVideoBlob(blob);
      status("Video salvato. Ora puoi guardarlo anche senza connessione.");
      saveButton.textContent = "Aggiorna copia offline";
    } catch (error) {
      console.error(error);
      status("Download non riuscito: " + error.message);
    } finally {
      saveButton.disabled = false;
      if (saveButton.textContent === "Download in corso…") {
        saveButton.textContent = "Riprova il download";
      }
    }
  });

  removeButton.addEventListener("click", async () => {
    if ("caches" in window) await caches.delete(VIDEO_CACHE);
    if (currentObjectUrl) {
      URL.revokeObjectURL(currentObjectUrl);
      currentObjectUrl = null;
    }
    video.removeAttribute("src");
    video.load();
    status("Copia offline rimossa da questo dispositivo.");
    saveButton.textContent = "Scarica per la modalità offline";
  });

  window.addEventListener("online", () => status("Connessione ripristinata."));
  window.addEventListener("offline", () => status("Sei offline. Se avevi salvato il video, puoi riprodurlo."));

  (async () => {
    await registerServiceWorker();
    const hasOfflineCopy = await showCachedVideo().catch(() => false);
    if (!hasOfflineCopy) {
      video.src = VIDEO_URL;
      video.load();
      status(navigator.onLine
        ? "Video online. Premi il pulsante per salvarlo e guardarlo offline."
        : "Nessuna copia offline trovata. Connettiti a internet e scarica il video.");
    } else {
      saveButton.textContent = "Aggiorna copia offline";
    }
    if (!navigator.onLine) saveButton.disabled = true;
  })();
})();
