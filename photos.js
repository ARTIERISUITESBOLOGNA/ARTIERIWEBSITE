/*
  Artieri Suites — caricamento automatico delle foto.
  Carica in ordine assets/images/<prefisso>01.jpg, 02.jpg, 03.jpg...
  e si ferma al primo numero mancante.
  Per aggiungere una foto: caricala su GitHub col numero successivo. Nessuna modifica al codice.
*/
async function loadPhotos(container, prefix, options) {
  if (!container) return 0;
  const max = (options && options.max) || 60;
  const alt = (options && options.alt) || 'Artieri Suites, Bologna';
  let count = 0;

  for (let i = 1; i <= max; i++) {
    const num = String(i).padStart(2, '0');
    const url = 'assets/images/' + prefix + num + '.jpg';

    try {
      const res = await fetch(url, { method: 'HEAD', cache: 'no-cache' });
      if (!res.ok) break;
    } catch (e) {
      break;
    }

    const img = new Image();
    img.alt = alt;
    img.decoding = 'async';
    img.loading = i <= 2 ? 'eager' : 'lazy';
    img.addEventListener('load', function () { img.classList.add('is-loaded'); });
    img.src = url;
    container.appendChild(img);
    count++;
  }

  container.classList.toggle('is-empty', count === 0);
  return count;
}
