/* Personaliza aquí los textos de la interfaz, la historia y las imágenes. */
const CONFIG = {
  nombre: "Salomé",
  firma: "Con todo mi cariño",
  inicio: "2026-06-15T23:00:00-05:00",

  ui: {
    tituloPagina: "Para {nombre}, con amor",
    descripcion: "Un rincón de palabras para recordarte lo inmensamente importante que eres, {nombre}.",
    bienvenidaEtiqueta: "un lugarcito que lleva tu nombre",
    bienvenidaPie: "hecho con todo mi amor, para que vuelvas cuando quieras",
    ariaNavegacion: "Navegación principal",
    ariaMarca: "Ir al inicio",
    navMenu: "Secciones",
    navInicio: "Inicio",
    navHistoria: "Historia",
    navCarta: "Carta",
    navMensajes: "Mensajes",
    navRecuerdos: "Recuerdos",
    navSorpresa: "Sorpresa",
    navPortada: "Portada",
    heroEtiqueta: "para la persona que vuelve más bonito el mundo",
    heroFrase: "qué suerte la mía: encontrarte.",
    heroTexto: "Desde que llegaste, hasta los días sencillos guardan un poquito más de luz. Esta historia, con todas sus palabras, es para ti.",
    bajar: "lee despacito",
    contadorEtiqueta: "desde aquella noche",
    contadorDesde: "Desde el {fecha} (hora de Colombia).",
    contadorTitulo: "El tiempo de",
    contadorAcento: "nosotros",
    ariaContador: "Tiempo desde el inicio oficial de la relación",
    unidadesTiempo: ["meses", "días", "horas", "minutos", "segundos"],
    contadorNota: "Desde el día en que elegimos caminar juntos, cada instante lleva algo de ti.",
    historiaEtiqueta: "capítulos de nuestra historia",
    historiaTitulo: "Un comienzo",
    historiaAcento: "bonito",
    historiaIntro: "Tres fechas que mi corazón guarda como pequeños tesoros.",
    recuerdosSummary: "Guardar otro recuerdo en este navegador",
    fechaLabel: "Fecha o momento",
    fechaPlaceholder: "Por ejemplo: un día especial",
    tituloRecuerdoLabel: "Título",
    tituloRecuerdoPlaceholder: "Un recuerdo nuestro",
    textoRecuerdoLabel: "Unas palabras",
    textoRecuerdoPlaceholder: "Lo que quieras recordar",
    guardarRecuerdo: "Guardar recuerdo",
    notaRecuerdos: "Este recuerdo queda guardado solo en este navegador. No se añade ninguna fecha por su cuenta.",
    memoriaGuardada: "Recuerdo guardado en este navegador.",
    memoriaErrorLeer: "No se pudieron recuperar algunos recuerdos guardados en este navegador.",
    memoriaErrorGuardar: "No se pudo guardar este recuerdo; seguirá visible solo mientras esta página esté abierta.",
    cartaEtiqueta: "unas palabras para ti",
    cartaHeading: "Una carta",
    cartaAcento: "sin prisa",
    cartaIntro: "Toca el sobre; estas palabras llevan un pedacito de mi corazón.",
    sobreAria: "Abrir o cerrar la carta para {nombre}",
    sobreEtiqueta: "Para",
    sobreAyuda: "toca para abrir",
    cartaSello: "con todo mi cariño",
    mensajesEtiqueta: "palabras que nacen cuando pienso en ti",
    mensajesHeading: "Lo que mi corazón",
    mensajesAcento: "quiere decirte",
    mensajesIntro: "Pequeños versos para una persona que significa tanto para mí.",
    otroMensaje: "Leer otro verso",
    ariaTarjetas: "Tarjetas con mensajes secretos",
    galeriaEtiqueta: "un cielo escrito pensando en ti",
    galeriaHeading: "Donde guardo",
    galeriaAcento: "lo que siento",
    galeriaIntro: "Cada imagen guarda un deseo bonito que quisiera regalarte.",
    sorpresaEtiqueta: "y para terminar...",
    sorpresaHeading: "Una última",
    sorpresaAcento: "sorpresa",
    pie: "hecho con cariño",
    piePara: "para"
  },

  bienvenida: {
    titulo: "Para {nombre}",
    texto: "Todo comenzó con unas palabras y, sin darme cuenta, te convertiste en alguien imprescindible. Este rincón existe para decirte, con calma, cuánto significas para mí.",
    boton: "Continuar"
  },

  mensajesMensuales: {
    0: "Cada instante contigo merece un poema y una celebración.",
    1: "Un mes eligiéndonos. Y todavía me emociona pensar en todo lo bonito que nos espera."
  },
  mensajePorDefecto: "Hoy sumamos {meses} meses, y mi corazón sigue encontrando nuevas formas de quererte.",

  historia: [
    {
      fecha: "9 de marzo de 2026",
      titulo: "El día en que apareciste",
      texto: "Empezamos a hablar y algo en mí supo que aquellas palabras tendrían un lugar especial. Ese mismo día te dije «te quiero»."
    },
    {
      fecha: "10 de marzo de 2026",
      titulo: "La primera mañana",
      texto: "Llegó nuestro primer «buenos días»; una frase pequeña que consiguió hacer más luminosa toda mi mañana."
    },
    {
      fecha: "15 de junio de 2026 · 11:00 p. m.",
      titulo: "Elegirnos",
      texto: "A las once de la noche comenzó oficialmente este nosotros. Desde entonces, el tiempo también guarda un poquito de tu nombre."
    }
  ],

  carta: {
    titulo: "Mi querida {nombre}:",
    parrafos: [
      "No sé si te lo digo lo suficiente, pero tu existencia hace una diferencia inmensa en mi vida. Llegaste con tu manera única de ser y, poco a poco, hiciste que mis días tuvieran más calma, más ilusión y más motivos para sonreír.",
      "Eres importante para mí por quien eres: por tu forma de mirar el mundo, por la ternura que encuentro en tus palabras y por esa manera tuya de hacer que incluso el silencio se sienta acompañado. Cuando pienso en ti, recuerdo que el cariño también puede sentirse como un lugar seguro.",
      "Si pudiera convertir todo lo que siento en algo que pudieras guardar, te escribiría un cielo entero. Por ahora te dejo estas palabras: gracias por existir, por elegirme y por ser tú. Te quiero con una intensidad que a veces no cabe en ninguna frase."
    ]
  },

  mensajes: [
    "Si el mundo se queda en silencio, tu nombre todavía hace música dentro de mí.",
    "Eres esa luz pequeña que no pide permiso: aparece y vuelve más amable cualquier día.",
    "No necesito grandes razones para quererte; me basta con que seas tú, irrepetible y cerca de mi corazón.",
    "Ojalá pudieras verte con mis ojos: entenderías por qué tu presencia es uno de mis lugares favoritos.",
    "Entre tantas casualidades, encontrarte sigue pareciéndome la más bonita."
  ],

  tarjetas: [
    {
      frente: "Cuando llegaste",
      atras: "Desde aquella primera conversación, algo en mi vida empezó a sentirse distinto. Qué alegría que fueras tú."
    },
    {
      frente: "Lo que iluminas",
      atras: "No tienes que hacer nada extraordinario para alegrarme; con ser tú, ya haces especial mi día."
    },
    {
      frente: "Lo que eres para mí",
      atras: "Eres compañía, calma y alegría; una persona que mi corazón agradece haber encontrado."
    }
  ],

  mensajeSecreto: {
    boton: "Ábreme cuando me extrañes",
    texto: "Si estás leyendo esto, espero que entiendas que eres el amor de mi vida, cada palabra, cada accion y cada momento que compartimos es mas que especial para mi, gracias por existir amor mio :3"
  },

  sorpresa: {
    boton: "Descubrir la sorpresa",
    titulo: "Tú eres mi parte favorita",
    texto: "Gracias por llegar, por ser exactamente quien eres y por dejarme quererte. Si alguna vez dudas de lo importante que eres para mí, vuelve a estas palabras: mi vida es más bonita porque tú estás en ella. Te amo demasiado, amor de mi alma."
  },

  galeria: [
    {
      src: "WhatsApp Image 2026-10-22 at 3.00.46 PM (1).jpeg",
      tipo: "luna",
      pie: "Tu mirada enciende todo mi cielo."
    },
    {
      src: "img/WhatsApp Image 2026-10-22 at 3.00.46 PM (1).jpeg",
      tipo: "estrellas",
      pie: "Si existe el destino, escribió tu nombre en el mío."
    },
    {
      src: "img/WhatsApp Image 2026-10-22 at 3.00.46 PM (2).jpeg",
      tipo: "estrellas",
      pie: "Te elegiría en cada vida, en cada noche, en cada amanecer."
    }
  ]
};
