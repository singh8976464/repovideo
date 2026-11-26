INSTALLAZIONE SU GITHUB PAGES

1) Estrai questo archivio sul computer.
2) Metti il tuo video nella stessa cartella di index.html e chiamalo ESATTAMENTE:
   video.mp4
3) Carica tutti i file nella cartella pubblicata da GitHub Pages (la root del repository
   oppure la cartella configurata in Settings > Pages).
4) Attendi la pubblicazione e apri il sito su iPhone con Safari.
5) Con internet attivo, apri la pagina e premi "Scarica per la modalità offline".
   Attendi il messaggio che conferma il salvataggio.
6) In Safari premi Condividi > Aggiungi alla schermata Home.
7) Apri il sito dall'icona aggiunta alla Home. Dopo il primo download, il video è
   disponibile senza connessione.

AGGIORNARE IL VIDEO
- Sostituisci video.mp4 nel repository mantenendo lo stesso nome e percorso.
- Fai commit/push e attendi che GitHub Pages pubblichi la modifica.
- Sul telefono apri il sito con internet e premi "Aggiorna copia offline".
  Questo scarica la nuova versione e sostituisce quella memorizzata.

IMPORTANTE
- L'iframe di Google Drive non rende il video disponibile offline.
- Questa soluzione usa una copia del video ospitata insieme al sito su GitHub Pages.
- Per aggiornamenti automatici senza premere il pulsante servirebbe un backend o un
  servizio di hosting/storage con API: GitHub Pages da solo è statico.
- GitHub avvisa per file oltre 50 MB e blocca i singoli file oltre 100 MB. Per video
  grandi è meglio comprimerli o usare un hosting video/storage esterno.
- Su iPhone la cache del browser può essere eliminata da iOS per liberare spazio.
  Non è una garanzia di conservazione permanente: tieni sempre il video originale.
- La prima visita e il download offline richiedono internet.
