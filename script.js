const $ = id => document.getElementById(id);
const CONFIG_PAGE = CONFIG;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const copy = CONFIG_PAGE.ui;

function formatText(value) {
  return value.replace(/\{nombre\}/g, CONFIG_PAGE.nombre);
}

document.title = formatText(copy.tituloPagina);
document.querySelector('meta[name="description"]').content = formatText(copy.descripcion);
document.querySelectorAll("[data-copy]").forEach(element => {
  element.textContent = formatText(copy[element.dataset.copy]);
});
document.querySelectorAll("[data-copy-aria]").forEach(element => {
  element.setAttribute("aria-label", formatText(copy[element.dataset.copyAria]));
});
document.querySelectorAll("[data-placeholder]").forEach(element => {
  element.placeholder = formatText(copy[element.dataset.placeholder]);
});
document.querySelectorAll("[data-unit]").forEach(element => {
  element.textContent = copy.unidadesTiempo[Number(element.dataset.unit)];
});

const initial = Array.from(CONFIG_PAGE.nombre.trim())[0] || "♥";
$("welcome-initial").textContent = initial;
$("brand-initial").textContent = initial;
$("envelope-initial").textContent = initial;
$("envelope-name").textContent = CONFIG_PAGE.nombre;
$("hero-name").textContent = CONFIG_PAGE.nombre;

function burst(count = 20, x = innerWidth / 2, y = innerHeight / 2) {
  if (reduceMotion) return;
  const amount = count;
  for (let i = 0; i < amount; i += 1) {
    const particle = document.createElement("span");
    particle.className = "particle";
    particle.textContent = i % 4 === 0 ? "✦" : "♥";
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.setProperty("--dx", `${(Math.random() - 0.5) * 300}px`);
    particle.style.setProperty("--dy", `${-80 - Math.random() * 260}px`);
    particle.style.setProperty("--delay", `${Math.random() * 180}ms`);
    document.body.appendChild(particle);
    window.setTimeout(() => particle.remove(), 1800);
  }
}

function celebrateClick(event, count = 15) {
  const bounds = event.currentTarget.getBoundingClientRect();
  burst(count, bounds.left + bounds.width / 2, bounds.top + bounds.height / 2);
}

/* Estrellas animadas en un único ciclo de dibujo. */
(() => {
  const canvas = $("stars");
  const context = canvas.getContext("2d");
  if (!context) return;

  let stars = [];
  function resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(window.innerWidth * ratio);
    canvas.height = Math.floor(window.innerHeight * ratio);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    stars = Array.from({ length: Math.min(120, Math.ceil(window.innerWidth / 7)) }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 1.3 + 0.25,
      phase: Math.random() * Math.PI * 2
    }));
  }

  function draw(time) {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    stars.forEach(star => {
      context.globalAlpha = 0.25 + Math.sin(time / 1000 + star.phase) * 0.2;
      context.fillStyle = "#b8e9ff";
      context.beginPath();
      context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      context.fill();
    });
    context.globalAlpha = 1;
    if (!reduceMotion && !document.hidden) window.requestAnimationFrame(draw);
  }

  window.addEventListener("resize", () => {
    resize();
    if (reduceMotion) draw(0);
  });
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && !reduceMotion) window.requestAnimationFrame(draw);
  });
  resize();
  if (!reduceMotion) window.requestAnimationFrame(draw);
  else draw(0);
})();

/* Portada y navegación por vistas. */
$("welcome-title").textContent = formatText(CONFIG_PAGE.bienvenida.titulo);
$("welcome-text").textContent = formatText(CONFIG_PAGE.bienvenida.texto);
$("open-btn").textContent = formatText(CONFIG_PAGE.bienvenida.boton);
$("footer-name").textContent = CONFIG_PAGE.nombre;
$("open-btn").setAttribute("aria-label", formatText(CONFIG_PAGE.bienvenida.boton));

function playWelcomeTransition() {
  const transition = $("flower-transition");
  $("open-btn").disabled = true;
  if (reduceMotion) return;
  transition.classList.remove("is-blooming");
  transition.hidden = false;
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => transition.classList.add("is-blooming"));
  });
  window.setTimeout(() => {
    transition.hidden = true;
    transition.classList.remove("is-blooming");
  }, 1850);
}

const viewPanels = Array.from(document.querySelectorAll("[data-view]"));
const navLinks = Array.from(document.querySelectorAll(".nav__links a"));
const navToggle = $("nav-toggle");
const navLinksContainer = $("nav-links");

function viewFromHash() {
  const target = document.getElementById(window.location.hash.slice(1));
  return target?.dataset.view || "inicio";
}

function closeMobileMenu() {
  navLinksContainer.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
}

function showView(viewName, updateHistory = false) {
  viewPanels.forEach(panel => {
    panel.hidden = panel.dataset.view !== viewName;
  });
  if (viewName === "historia") {
    document.querySelectorAll(".timeline__item").forEach(item => {
      item.classList.add("is-visible");
    });
  }
  navLinks.forEach(link => {
    const isCurrent = link.hash === `#${viewName}`;
    if (isCurrent) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  closeMobileMenu();

  if (updateHistory && window.location.hash !== `#${viewName}`) {
    window.history.pushState(null, "", `#${viewName}`);
  }
  window.scrollTo(0, 0);

  const heading = document.querySelector(`[data-view="${viewName}"] h2`);
  if (heading) heading.focus({ preventScroll: true });
}

navToggle.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") !== "true";
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navLinksContainer.classList.toggle("is-open", isOpen);
});

navLinks.forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();
    const viewName = document.getElementById(link.hash.slice(1))?.dataset.view;
    if (viewName) showView(viewName, true);
  });
});

$("brand-initial").closest("a").addEventListener("click", event => {
  event.preventDefault();
  showView("inicio", true);
});

window.addEventListener("popstate", () => {
  if (!$("main").hidden) showView(viewFromHash());
});

$("open-btn").addEventListener("click", event => {
  playWelcomeTransition();
  $("welcome").classList.add("welcome--leaving");
  window.setTimeout(() => {
    $("welcome").hidden = true;
    $("main").hidden = false;
    const viewName = viewFromHash();
    showView(viewName, !window.location.hash);
  }, reduceMotion ? 0 : 900);
});

$("back-btn").addEventListener("click", () => {
  closeMobileMenu();
  $("main").hidden = true;
  $("welcome").hidden = false;
  $("welcome").classList.remove("welcome--leaving");
  $("open-btn").disabled = false;
  window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
  window.scrollTo(0, 0);
  $("open-btn").focus({ preventScroll: true });
});

/* Contador desde la hora oficial de Colombia (UTC-5). */
const startTime = new Date(CONFIG_PAGE.inicio).getTime();
const colombiaOffset = 5 * 60 * 60 * 1000;
const dateFormatter = new Intl.DateTimeFormat("es-CO", {
  timeZone: "America/Bogota",
  dateStyle: "long",
  timeStyle: "short"
});
$("since-note").textContent = formatText(copy.contadorDesde)
  .replace("{fecha}", dateFormatter.format(startTime));

function getElapsed(now) {
  if (now < startTime) return { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  const start = new Date(startTime - colombiaOffset);
  const current = new Date(now - colombiaOffset);
  let months = (current.getUTCFullYear() - start.getUTCFullYear()) * 12
    + current.getUTCMonth() - start.getUTCMonth();
  const monthStart = count => {
    const monthDate = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth() + count, 1));
    const lastDay = new Date(Date.UTC(
      monthDate.getUTCFullYear(),
      monthDate.getUTCMonth() + 1,
      0
    )).getUTCDate();
    monthDate.setUTCDate(Math.min(start.getUTCDate(), lastDay));
    monthDate.setUTCHours(
      start.getUTCHours(),
      start.getUTCMinutes(),
      start.getUTCSeconds(),
      start.getUTCMilliseconds()
    );
    return monthDate.getTime();
  };
  if (monthStart(months) > current.getTime()) months -= 1;
  while (monthStart(months + 1) <= current.getTime()) months += 1;

  const remainder = current.getTime() - monthStart(months);
  return {
    months,
    days: Math.floor(remainder / 86400000),
    hours: Math.floor(remainder / 3600000) % 24,
    minutes: Math.floor(remainder / 60000) % 60,
    seconds: Math.floor(remainder / 1000) % 60
  };
}

function updateCounter() {
  const elapsed = getElapsed(Date.now());
  $("c-months").textContent = elapsed.months;
  $("c-days").textContent = elapsed.days;
  $("c-hours").textContent = elapsed.hours;
  $("c-minutes").textContent = elapsed.minutes;
  $("c-seconds").textContent = elapsed.seconds;
  const monthlyMessage = CONFIG_PAGE.mensajesMensuales[elapsed.months]
    || CONFIG_PAGE.mensajePorDefecto.replace("{meses}", elapsed.months);
  $("monthly").textContent = formatText(monthlyMessage);
}
updateCounter();
window.setInterval(updateCounter, 1000);

/* Línea del tiempo y recuerdos opcionales guardados localmente. */
const timeline = $("timeline");
const animationObserver = "IntersectionObserver" in window
  ? new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      animationObserver.unobserve(entry.target);
    }
  }), { threshold: 0.12 })
  : null;

function addTimelineItem(item) {
  const listItem = document.createElement("li");
  listItem.className = "timeline__item";
  const date = document.createElement("span");
  date.className = "timeline__date";
  date.textContent = formatText(item.fecha);
  const title = document.createElement("h3");
  title.textContent = formatText(item.titulo);
  const description = document.createElement("p");
  description.textContent = formatText(item.texto || "");
  listItem.append(date, title, description);
  timeline.appendChild(listItem);
  if (animationObserver) animationObserver.observe(listItem);
  else listItem.classList.add("is-visible");
}

const memoryStatus = $("memory-status");
let savedMemories = [];
try {
  const storedMemories = localStorage.getItem("salome_memories");
  if (storedMemories) {
    const parsedMemories = JSON.parse(storedMemories);
    const validMemories = Array.isArray(parsedMemories) && parsedMemories.every(memory =>
      memory
      && typeof memory === "object"
      && typeof memory.fecha === "string"
      && typeof memory.titulo === "string"
      && typeof memory.texto === "string"
    );
    if (!validMemories) {
      throw new TypeError("Los recuerdos guardados no tienen el formato esperado.");
    }
    savedMemories = parsedMemories;
  }
} catch (error) {
  memoryStatus.textContent = copy.memoriaErrorLeer;
  console.warn("No se pudieron leer los recuerdos guardados en este navegador.", error);
}
CONFIG_PAGE.historia.concat(savedMemories).forEach(addTimelineItem);

$("add-form").addEventListener("submit", event => {
  event.preventDefault();
  const memory = {
    fecha: $("memory-date").value.trim(),
    titulo: $("memory-title").value.trim(),
    texto: $("memory-text").value.trim()
  };
  addTimelineItem(memory);
  savedMemories.push(memory);
  try {
    localStorage.setItem("salome_memories", JSON.stringify(savedMemories));
    memoryStatus.textContent = copy.memoriaGuardada;
  } catch (error) {
    memoryStatus.textContent = copy.memoriaErrorGuardar;
    console.warn("El recuerdo aparece en la página, pero no se pudo guardar en este navegador.", error);
  }
  event.currentTarget.reset();
});

/* Sobre y carta. */
$("letter-heading").textContent = formatText(CONFIG_PAGE.carta.titulo);
$("letter-signature").textContent = formatText(CONFIG_PAGE.firma);
CONFIG_PAGE.carta.parrafos.forEach(paragraph => {
  const element = document.createElement("p");
  element.textContent = formatText(paragraph);
  $("letter-body").appendChild(element);
});

$("envelope-btn").addEventListener("click", event => {
  const isOpening = $("envelope-btn").getAttribute("aria-expanded") !== "true";
  $("envelope-btn").setAttribute("aria-expanded", String(isOpening));
  $("envelope-btn").classList.toggle("is-open", isOpening);
  $("letter").hidden = !isOpening;
  if (isOpening) {
    celebrateClick(event, 18);
    $("letter").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
  }
});

/* Mensajes y tarjetas interactivas. */
let reasonIndex = 0;
function showReason() {
  $("reason").textContent = formatText(CONFIG_PAGE.mensajes[reasonIndex]);
  $("next-reason").setAttribute("aria-label", `${formatText(copy.otroMensaje)}, ${reasonIndex + 1} de ${CONFIG_PAGE.mensajes.length}`);
}
showReason();
$("next-reason").addEventListener("click", event => {
  reasonIndex = (reasonIndex + 1) % CONFIG_PAGE.mensajes.length;
  showReason();
  celebrateClick(event, 9);
});

CONFIG_PAGE.tarjetas.forEach(cardData => {
  const card = document.createElement("button");
  card.type = "button";
  card.className = "secret-card";
  card.setAttribute("aria-pressed", "false");
  card.textContent = formatText(cardData.frente);
  card.addEventListener("click", event => {
    const isOpen = card.getAttribute("aria-pressed") !== "true";
    card.setAttribute("aria-pressed", String(isOpen));
    card.textContent = formatText(isOpen ? cardData.atras : cardData.frente);
    card.classList.toggle("is-open", isOpen);
    if (isOpen) celebrateClick(event, 10);
  });
  $("cards").appendChild(card);
});

$("miss-btn").textContent = formatText(CONFIG_PAGE.mensajeSecreto.boton);
$("miss-btn").addEventListener("click", event => {
  const message = $("miss-message");
  message.textContent = formatText(CONFIG_PAGE.mensajeSecreto.texto);
  message.hidden = !message.hidden;
  $("miss-btn").setAttribute("aria-expanded", String(!message.hidden));
  if (!message.hidden) celebrateClick(event, 16);
});

/* Galería de ilustraciones CSS o fotografías locales configuradas por Salomé. */
CONFIG_PAGE.galeria.forEach(item => {
  const figure = document.createElement("figure");
  figure.className = "gallery__item";
  const artwork = document.createElement("div");
  artwork.className = `artwork artwork--${item.tipo}`;
  if (item.src) {
    const image = new Image();
    image.alt = formatText(item.pie);
    image.loading = "eager";
    image.src = item.src;
    image.addEventListener("error", () => {
      image.remove();
      artwork.classList.add("artwork--fallback");
      artwork.textContent = "✦";
    }, { once: true });
    artwork.appendChild(image);
  } else {
    artwork.setAttribute("aria-hidden", "true");
    const glyph = document.createElement("span");
    glyph.className = "artwork__glyph";
    glyph.textContent = item.tipo === "piezas" ? "◇" : item.tipo === "luna" ? "☾" : "✦";
    artwork.appendChild(glyph);
    if (item.tipo === "piezas") {
      const secondGlyph = document.createElement("span");
      secondGlyph.className = "artwork__glyph artwork__glyph--second";
      secondGlyph.textContent = "◇";
      artwork.appendChild(secondGlyph);
    }
    const glint = document.createElement("span");
    glint.className = "artwork__glint";
    glint.textContent = "✧";
    artwork.appendChild(glint);
  }
  const caption = document.createElement("figcaption");
  caption.textContent = formatText(item.pie);
  figure.append(artwork, caption);
  $("gallery").appendChild(figure);
});

/* Sorpresa final. */
$("final-btn").textContent = formatText(CONFIG_PAGE.sorpresa.boton);
$("final-title").textContent = formatText(CONFIG_PAGE.sorpresa.titulo);
$("final-text").textContent = formatText(CONFIG_PAGE.sorpresa.texto);
$("final-btn").addEventListener("click", event => {
  $("final-card").hidden = false;
  $("final-btn").hidden = true;
  burst(58, innerWidth / 2, event.currentTarget.getBoundingClientRect().top);
  $("final-card").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
  $("final-title").focus({ preventScroll: true });
});
