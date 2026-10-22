#Para Salomé

## Abrir la página

Abre `index.html` en un navegador moderno. La página usa HTML, CSS y JavaScript puro; no requiere instalar nada.

## Personalizar desde `config.js`

- El nombre se define una sola vez en `nombre`. Las menciones con `{nombre}` se actualizan automáticamente.
- La presentación, los textos de navegación, las etiquetas accesibles y el resto de los rótulos están agrupados en `ui`. La carta, los mensajes, la sorpresa y la cronología están en sus respectivas secciones del mismo archivo.
- `inicio` usa el formato `AAAA-MM-DDTHH:MM:SS-05:00`; el `-05:00` representa la hora de Colombia. El contador muestra meses de calendario y el tiempo restante, y se actualiza cada segundo.
- Cada opción del menú abre una sección independiente. En celulares, el botón «Secciones» despliega la navegación.
- Para añadir fotos, copia archivos a una carpeta local como `img/` y agrega `{ src: "img/mi-foto.jpg", tipo: "luna", pie: "Un recuerdo" }` a `galeria`. Si no indicas `src`, se muestra una ilustración dibujada con CSS.
- Los recuerdos añadidos desde la página quedan en el almacenamiento local de ese navegador. Para incluir un acontecimiento en la página publicada, agrégalo en `historia`.

## Publicar

Sube la carpeta completa a tu servicio de alojamiento estático preferido. Conserva juntos `index.html`, `styles.css`, `script.js` y `config.js`, además de cualquier carpeta local de fotos.
