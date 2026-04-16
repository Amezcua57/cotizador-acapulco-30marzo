import { useState } from "react";

const BRAND = {
  primary: "#0B2545",
  gold: "#C9A84C",
  sand: "#F5EDD6",
  ocean: "#1B6CA8",
  white: "#FAFAF8",
  light: "#E8F4FD",
};

const tabs = [
  { id: "marca", label: "🐚 Marca" },
  { id: "producto", label: "💎 Producto" },
  { id: "ventas", label: "🎯 Argumentos" },
  { id: "embudo", label: "📞 Embudo" },
  { id: "landing", label: "🌐 Landing" },
  { id: "scripts", label: "💬 Scripts" },
];

export default function CaracolFractional() {
  const [active, setActive] = useState("marca");

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: BRAND.white, minHeight: "100vh" }}>
      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, ${BRAND.primary} 0%, #1a4a7a 100%)`,
        padding: "24px 20px 0",
        borderBottom: `3px solid ${BRAND.gold}`
      }}>
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <div style={{ color: BRAND.gold, fontSize: 11, letterSpacing: 4, marginBottom: 4, fontFamily: "sans-serif" }}>
            CONCEPTO COMPLETO
          </div>
          <div style={{ color: BRAND.white, fontSize: 22, fontWeight: "bold", letterSpacing: 1 }}>
            🐚 Caracol Diamante
          </div>
          <div style={{ color: BRAND.gold, fontSize: 13, letterSpacing: 2, fontFamily: "sans-serif" }}>
            FRACTIONAL · ZONA DIAMANTE · ACAPULCO
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", overflowX: "auto", gap: 0, paddingBottom: 0 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActive(t.id)} style={{
              background: active === t.id ? BRAND.gold : "transparent",
              color: active === t.id ? BRAND.primary : "rgba(255,255,255,0.7)",
              border: "none",
              padding: "10px 14px",
              fontSize: 11,
              fontWeight: active === t.id ? "bold" : "normal",
              fontFamily: "sans-serif",
              cursor: "pointer",
              whiteSpace: "nowrap",
              borderRadius: "8px 8px 0 0",
              transition: "all 0.2s",
              letterSpacing: 0.5,
            }}>{t.label}</button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "20px 16px", maxWidth: 680, margin: "0 auto" }}>
        {active === "marca" && <MarcaSection />}
        {active === "producto" && <ProductoSection />}
        {active === "ventas" && <VentasSection />}
        {active === "embudo" && <EmbudoSection />}
        {active === "landing" && <LandingSection />}
        {active === "scripts" && <ScriptsSection />}
      </div>
    </div>
  );
}

/* ─────────────────────────────────── */
/*  SECCIÓN 1: MARCA                  */
/* ─────────────────────────────────── */
function MarcaSection() {
  return (
    <div>
      <SectionTitle icon="🐚" title="Nombre y Concepto de Marca" />

      <Card gold>
        <Label>NOMBRE DEL PRODUCTO</Label>
        <div style={{ fontSize: 28, fontWeight: "bold", color: BRAND.primary, letterSpacing: 1, margin: "8px 0 4px" }}>
          Caracol Reserva
        </div>
        <div style={{ fontSize: 13, color: "#666", fontFamily: "sans-serif" }}>
          Subtítulo: <em>Tu semana en el Pacífico, escriturada para siempre</em>
        </div>
      </Card>

      <Body>
        <strong>¿Por qué "Caracol Reserva"?</strong> Mantiene el ADN del proyecto principal (Caracol Diamante),
        pero "Reserva" evoca exclusividad, naturaleza y permanencia — como una reserva de vinos o una reserva natural.
        Es aspiracional sin ser pretencioso.
      </Body>

      <SectionSub>Alternativas de nombre</SectionSub>
      <div style={{ display: "grid", gap: 8 }}>
        {[
          { nombre: "Caracol Select", idea: "Tono más corporativo, bueno para inversionistas" },
          { nombre: "Pacífico Fractions", idea: "Bilingüe, apto para mercado extranjero" },
          { nombre: "Diamante Fraccionario", idea: "Directo, fácil de entender, local" },
          { nombre: "Caracol Reserva ✓", idea: "RECOMENDADO — elegante, memorable, coherente" },
        ].map(a => (
          <div key={a.nombre} style={{
            background: a.nombre.includes("✓") ? "#FFF8E7" : "#f8f8f8",
            border: a.nombre.includes("✓") ? `1px solid ${BRAND.gold}` : "1px solid #eee",
            borderRadius: 8, padding: "10px 14px"
          }}>
            <div style={{ fontWeight: "bold", color: BRAND.primary, fontFamily: "sans-serif", fontSize: 14 }}>{a.nombre}</div>
            <div style={{ fontSize: 12, color: "#666", fontFamily: "sans-serif", marginTop: 2 }}>{a.idea}</div>
          </div>
        ))}
      </div>

      <SectionSub>Identidad visual</SectionSub>
      <ul style={{ fontFamily: "sans-serif", fontSize: 13, color: "#444", lineHeight: 2, paddingLeft: 20 }}>
        <li><strong>Paleta:</strong> Azul marino profundo + dorado arena + blanco Pacífico</li>
        <li><strong>Ícono:</strong> Espiral de caracol estilizada (ya lo tienes)</li>
        <li><strong>Tipografía:</strong> Serif elegante para títulos, sans-serif limpia para texto</li>
        <li><strong>Tono:</strong> Aspiracional pero honesto. Nada de promesas vacías post-Otis.</li>
        <li><strong>Tagline:</strong> <em>"No rentes el paraíso. Sé dueño de él."</em></li>
      </ul>

      <Card>
        <Label>POSICIONAMIENTO EN 1 LÍNEA</Label>
        <div style={{ fontSize: 15, color: BRAND.primary, fontStyle: "italic", marginTop: 8, lineHeight: 1.6 }}>
          "Caracol Reserva es la forma inteligente de tener una propiedad de playa en Acapulco: escriturada, rentable y sin los dolores de cabeza de ser dueño único."
        </div>
      </Card>
    </div>
  );
}

/* ─────────────────────────────────── */
/*  SECCIÓN 2: PRODUCTO               */
/* ─────────────────────────────────── */
function ProductoSection() {
  const productos = [
    {
      tipo: "Suite Reserva",
      emoji: "🏠",
      descripcion: "Suite 1 recámara, vista al jardín o alberca",
      fracciones: 8,
      semanas: 6,
      precio: "$320,000",
      priceNote: "MXN por fracción",
      aparta: "$15,000",
      renta: "$8,000–12,000/sem",
      rendimiento: "~12–18% anual",
    },
    {
      tipo: "Loft Reserva",
      emoji: "🏢",
      descripcion: "Loft 1.5 recámaras, terraza, vista parcial al mar",
      fracciones: 8,
      semanas: 6,
      precio: "$480,000",
      priceNote: "MXN por fracción",
      aparta: "$20,000",
      renta: "$11,000–16,000/sem",
      rendimiento: "~14–20% anual",
      destacado: true,
    },
    {
      tipo: "Villa Reserva",
      emoji: "🏖️",
      descripcion: "Villa 2-3 recámaras, terraza grande, vista al mar",
      fracciones: 8,
      semanas: 6,
      precio: "$750,000",
      priceNote: "MXN por fracción",
      aparta: "$30,000",
      renta: "$18,000–28,000/sem",
      rendimiento: "~15–22% anual",
    },
  ];

  return (
    <div>
      <SectionTitle icon="💎" title="Estructura del Producto" />

      <Card>
        <Label>MODELO BASE</Label>
        <Body>
          Cada unidad se divide en <strong>8 fracciones</strong>. Cada propietario tiene
          derecho a <strong>6 semanas al año</strong> de uso (2 semanas quedan para
          mantenimiento y ocupación de renta gestionada). El modelo legal usa una
          <strong> S.A. de C.V. por unidad</strong>, con reglamento de accionistas
          que define derechos, usos y sanciones. Cada fraccionista recibe <strong>escritura</strong>.
        </Body>
      </Card>

      {productos.map(p => (
        <div key={p.tipo} style={{
          background: p.destacado ? `linear-gradient(135deg, ${BRAND.primary}, #1a4a7a)` : "#fff",
          border: p.destacado ? "none" : `1px solid #e0e0e0`,
          borderRadius: 12, padding: 16, marginBottom: 12,
          boxShadow: p.destacado ? "0 4px 20px rgba(11,37,69,0.3)" : "0 1px 4px rgba(0,0,0,0.06)"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
            <div>
              <div style={{ fontSize: 18 }}>{p.emoji}</div>
              <div style={{ fontWeight: "bold", fontSize: 16, color: p.destacado ? BRAND.gold : BRAND.primary }}>
                {p.tipo}
              </div>
              <div style={{ fontSize: 12, color: p.destacado ? "rgba(255,255,255,0.7)" : "#888", fontFamily: "sans-serif" }}>
                {p.descripcion}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 22, fontWeight: "bold", color: p.destacado ? BRAND.gold : BRAND.primary }}>
                {p.precio}
              </div>
              <div style={{ fontSize: 10, color: p.destacado ? "rgba(255,255,255,0.6)" : "#aaa", fontFamily: "sans-serif" }}>
                {p.priceNote}
              </div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginTop: 10 }}>
            {[
              ["Fracciones", `${p.fracciones} por unidad`],
              ["Uso incluido", `${p.semanas} semanas/año`],
              ["Aparta con", p.aparta],
              ["Renta estimada", p.renta],
              ["Rendimiento", p.rendimiento],
              ["Hereda/vende", "Sí, en cualquier momento"],
            ].map(([k, v]) => (
              <div key={k} style={{
                background: p.destacado ? "rgba(255,255,255,0.1)" : "#f8f8f8",
                borderRadius: 6, padding: "6px 10px"
              }}>
                <div style={{ fontSize: 10, color: p.destacado ? "rgba(255,255,255,0.5)" : "#aaa", fontFamily: "sans-serif", letterSpacing: 0.5 }}>{k}</div>
                <div style={{ fontSize: 12, fontWeight: "bold", color: p.destacado ? "#fff" : BRAND.primary, fontFamily: "sans-serif" }}>{v}</div>
              </div>
            ))}
          </div>
          {p.destacado && <div style={{ marginTop: 10, background: BRAND.gold, color: BRAND.primary, fontSize: 11, fontWeight: "bold", fontFamily: "sans-serif", textAlign: "center", padding: "4px 8px", borderRadius: 4, letterSpacing: 1 }}>⭐ MÁS VENDIDO</div>}
        </div>
      ))}

      <SectionSub>Estructura legal recomendada</SectionSub>
      {[
        ["1. S.A. de C.V. por unidad", "Cada unidad es su propia empresa. Los 8 fraccionistas son accionistas. Limpia, escriturable, blindada."],
        ["2. Reglamento de accionistas", "Define: calendario de uso, quién decide rentarla, cómo se vende una fracción, sanciones por incumplimiento."],
        ["3. Concierge de administración", "Ismava/Caracol administra la unidad cuando no la usa el dueño. Cobra comisión del 20–25% sobre rentas."],
        ["4. Fondo de mantenimiento", "Cuota mensual fija (~$1,500 MXN/fraccionista) para cubrir servicios, limpieza y reparaciones menores."],
      ].map(([t, d]) => (
        <div key={t} style={{ marginBottom: 8, background: "#f0f7ff", borderLeft: `3px solid ${BRAND.ocean}`, borderRadius: "0 8px 8px 0", padding: "10px 14px" }}>
          <div style={{ fontWeight: "bold", fontSize: 13, color: BRAND.primary, fontFamily: "sans-serif" }}>{t}</div>
          <div style={{ fontSize: 12, color: "#555", fontFamily: "sans-serif", marginTop: 3, lineHeight: 1.5 }}>{d}</div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────── */
/*  SECCIÓN 3: ARGUMENTOS DE VENTA    */
/* ─────────────────────────────────── */
function VentasSection() {
  const [openObj, setOpenObj] = useState(null);
  const objeciones = [
    {
      obj: "¿Y si no quiero usarla esa semana?",
      resp: "La pones a rentar por plataformas como Airbnb o la administración de Caracol la renta por ti. Tú cobras el 75–80% de la renta generada. Si una suite se renta a $10,000 la semana, recibes ~$8,000 sin mover un dedo."
    },
    {
      obj: "¿Eso no es un tiempo compartido?",
      resp: "Para nada. El tiempo compartido no te escritura nada — pagas por usar, no por poseer. Con Caracol Reserva eres accionista de una S.A. de C.V. propietaria de la unidad. Tienes escritura, puedes vender tu fracción mañana si quieres."
    },
    {
      obj: "¿Y si los otros dueños hacen algo que no me gusta?",
      resp: "Por eso existe el Reglamento de Accionistas. Está firmado ante notario. Establece exactamente qué puede y no puede hacer cada propietario. No hay sorpresas."
    },
    {
      obj: "Acapulco tuvo el huracán Otis...",
      resp: "Zona Diamante es la zona que se desarrolló DESPUÉS de Otis y que concentra toda la inversión nueva. El seguro de daños cubre la propiedad. Y los precios de hoy son los más bajos que habrá — cuando la zona madure, quien compró ahora gana más."
    },
    {
      obj: "¿Qué pasa si el proyecto no se termina?",
      resp: "El proyecto está financiado por Exitus Capital, una institución financiera formal, no por preventas. La construcción está contratada a Tocino Arquitectos. Tu contrato de compra te da derechos sobre un activo real, no sobre una promesa."
    },
    {
      obj: "¿Puedo heredarlo?",
      resp: "Sí. La fracción es parte de tu patrimonio. Puedes cederla, heredarla o incluirla en tu testamento igual que cualquier otra propiedad."
    },
  ];

  return (
    <div>
      <SectionTitle icon="🎯" title="Argumentos de Venta" />

      <SectionSub>Los 5 porqués del cliente</SectionSub>
      {[
        ["💸 Precio de entrada bajo", "Entrar a Acapulco Zona Diamante por $320K–$750K MXN (vs $3–8M de una unidad completa). Ideal para quien quiere playa sin descapitalizarse."],
        ["📈 Inversión que sube de valor", "Zona Diamante es el único corredor de Acapulco con inversión activa post-Otis. Quien compra hoy, en 5 años tiene plusvalía."],
        ["🔑 Sin dolores de cabeza", "Caracol administra todo. Tú recibes tu resumen mensual y listo."],
        ["📝 Escriturado = tuyo de verdad", "No es contrato de uso. Es escritura. Patrimonio real para ti y tu familia."],
        ["🌊 Disfrutas O generas dinero", "Úsala o réntala. Las dos opciones son tuyas en cualquier momento."],
      ].map(([t, d]) => (
        <div key={t} style={{ background: "#fff", border: `1px solid #e5e5e5`, borderRadius: 10, padding: "12px 14px", marginBottom: 8, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
          <div style={{ fontWeight: "bold", fontSize: 14, color: BRAND.primary, fontFamily: "sans-serif", marginBottom: 4 }}>{t}</div>
          <div style={{ fontSize: 12, color: "#555", fontFamily: "sans-serif", lineHeight: 1.6 }}>{d}</div>
        </div>
      ))}

      <SectionSub>Manejo de objeciones</SectionSub>
      <div style={{ fontSize: 12, color: "#888", fontFamily: "sans-serif", marginBottom: 10 }}>
        Toca cada objeción para ver cómo responderla:
      </div>
      {objeciones.map((o, i) => (
        <div key={i} style={{ marginBottom: 6 }}>
          <button onClick={() => setOpenObj(openObj === i ? null : i)} style={{
            width: "100%", textAlign: "left", background: openObj === i ? BRAND.primary : "#f0f7ff",
            color: openObj === i ? "#fff" : BRAND.primary,
            border: "none", borderRadius: openObj === i ? "8px 8px 0 0" : 8,
            padding: "12px 14px", fontFamily: "sans-serif", fontSize: 13,
            fontWeight: "bold", cursor: "pointer",
            display: "flex", justifyContent: "space-between", alignItems: "center"
          }}>
            <span>❓ {o.obj}</span>
            <span style={{ fontSize: 18 }}>{openObj === i ? "−" : "+"}</span>
          </button>
          {openObj === i && (
            <div style={{ background: "#f0f7ff", borderRadius: "0 0 8px 8px", padding: "12px 14px", borderTop: "1px solid rgba(0,0,0,0.05)" }}>
              <div style={{ fontSize: 13, color: "#333", fontFamily: "sans-serif", lineHeight: 1.7 }}>
                💬 {o.resp}
              </div>
            </div>
          )}
        </div>
      ))}

      <Card gold>
        <Label>EL CIERRE EMOCIONAL</Label>
        <div style={{ fontSize: 15, color: BRAND.primary, fontStyle: "italic", lineHeight: 1.8, marginTop: 8 }}>
          "¿Tú cuántas veces en los últimos 10 años pagaste hotel en la playa? Suma eso.
          Ahora compáralo con tener tu propio lugar, que se valoriza, que puedes rentar cuando no vas,
          y que les dejas a tus hijos. <strong>Eso es Caracol Reserva.</strong>"
        </div>
      </Card>
    </div>
  );
}

/* ─────────────────────────────────── */
/*  SECCIÓN 4: EMBUDO                 */
/* ─────────────────────────────────── */
function EmbudoSection() {
  const etapas = [
    {
      num: "01", color: "#1B6CA8", titulo: "ATRAER", sub: "Meta / Instagram / WhatsApp",
      acciones: [
        "Anuncio en Facebook/Instagram: '¿Cómo tener una villa en Acapulco por $320,000?'",
        "Reel de 30 seg: vistas al mar, renders de Caracol, texto animado con el precio",
        "Botón directo a WhatsApp o formulario de 3 campos",
      ]
    },
    {
      num: "02", color: "#0B6B4A", titulo: "CALIFICAR", sub: "WhatsApp + llamada breve (5 min)",
      acciones: [
        "Mensaje automático: 'Hola [nombre], te cuento en 2 minutos cómo funciona...'",
        "3 preguntas clave: ¿Buscas uso personal o inversión? ¿Tienes los fondos o necesitas financiamiento? ¿Puedes hablar esta semana?",
        "Si califica → agendar videollamada de 20 min",
      ]
    },
    {
      num: "03", color: "#7B3F00", titulo: "PRESENTAR", sub: "Videollamada 20 minutos",
      acciones: [
        "Abrir con: historia de Zona Diamante post-Otis",
        "Mostrar el cotizador de inversión (CETES vs Caracol Reserva)",
        "Recorrer los 3 productos con precios y rendimientos",
        "Siempre cerrar con: '¿Qué te llama más la atención, usar el espacio o generar renta?'",
      ]
    },
    {
      num: "04", color: "#5A1A8A", titulo: "SEPARAR", sub: "Cierre con apartado",
      acciones: [
        "Oferta de apartado: $10,000–$30,000 MXN para reservar fracción",
        "Urgencia real: 'Solo hay 8 fracciones por unidad y ya van X vendidas'",
        "Seguimiento a las 24, 48 y 72 horas si no firmó",
      ]
    },
    {
      num: "05", color: "#1A4A7A", titulo: "FIDELIZAR", sub: "Post-venta y referencias",
      acciones: [
        "Bienvenida con kit digital (manual de uso, calendario, contacto de concierge)",
        "Reporte mensual de rentas generadas",
        "Programa de referidos: bono de $10,000 MXN por cada fraccionista referido que compra",
      ]
    },
  ];

  return (
    <div>
      <SectionTitle icon="📞" title="Embudo de Ventas" />
      <Body>5 etapas, desde el primer anuncio hasta la referencia. Cada etapa tiene acciones concretas.</Body>

      {etapas.map((e, i) => (
        <div key={i} style={{ marginBottom: 12, borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
          <div style={{ background: e.color, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ fontSize: 28, fontWeight: "900", color: "rgba(255,255,255,0.2)", fontFamily: "sans-serif", lineHeight: 1 }}>
              {e.num}
            </div>
            <div>
              <div style={{ color: "#fff", fontWeight: "bold", fontSize: 15, fontFamily: "sans-serif", letterSpacing: 1 }}>{e.titulo}</div>
              <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, fontFamily: "sans-serif" }}>{e.sub}</div>
            </div>
          </div>
          <div style={{ background: "#fff", padding: "12px 16px" }}>
            {e.acciones.map((a, j) => (
              <div key={j} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}>
                <div style={{ color: e.color, fontWeight: "bold", marginTop: 2, flexShrink: 0 }}>→</div>
                <div style={{ fontSize: 13, color: "#444", fontFamily: "sans-serif", lineHeight: 1.6 }}>{a}</div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <Card>
        <Label>KPIs QUE DEBES MEDIR</Label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 10 }}>
          {[
            ["Costo por lead", "< $200 MXN"],
            ["Lead → videollamada", "> 20%"],
            ["Videollamada → apartado", "> 15%"],
            ["Tiempo de cierre", "< 7 días"],
            ["Clientes referidos", "> 30% del total"],
            ["Ticket promedio", "$480K+ MXN"],
          ].map(([k, v]) => (
            <div key={k} style={{ background: "#f8f8f8", borderRadius: 6, padding: "8px 10px" }}>
              <div style={{ fontSize: 10, color: "#aaa", fontFamily: "sans-serif" }}>{k}</div>
              <div style={{ fontSize: 14, fontWeight: "bold", color: BRAND.primary, fontFamily: "sans-serif" }}>{v}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ─────────────────────────────────── */
/*  SECCIÓN 5: LANDING PAGE           */
/* ─────────────────────────────────── */
function LandingSection() {
  const secciones = [
    {
      num: "1", titulo: "HERO",
      copy: '"Tu semana en el Pacífico, escriturada para siempre."',
      desc: "Imagen de fondo: vista al mar desde la terraza de Caracol. CTA grande: 'Quiero saber el precio' → va a WhatsApp.",
      elementos: ["Nombre del proyecto", "Tagline", "Precio desde $XXX,000 MXN", "Botón de WhatsApp", "Video de fondo o render"]
    },
    {
      num: "2", titulo: "¿POR QUÉ ZONA DIAMANTE?",
      copy: '"El único corredor turístico de Acapulco con inversión activa hoy."',
      desc: "Mapa, datos de plusvalía, comparación con Los Cabos y Cancún en etapa similar.",
      elementos: ["3 datos duros", "Mapa de ubicación", "Comparativo histórico de otras zonas"]
    },
    {
      num: "3", titulo: "CÓMO FUNCIONA",
      copy: '"3 pasos para ser dueño de tu fracción."',
      desc: "Aparta → Firma → Disfruta. Íconos visuales grandes.",
      elementos: ["Paso 1: Aparta con $15K", "Paso 2: Firma tu escritura", "Paso 3: Úsala o réntala"]
    },
    {
      num: "4", titulo: "LOS 3 PRODUCTOS",
      copy: '"Elige tu fracción según tu presupuesto."',
      desc: "Suite, Loft y Villa con precio, semanas de uso y rendimiento estimado.",
      elementos: ["Tabla comparativa", "Precio por fracción", "Semanas de uso", "Rendimiento en renta"]
    },
    {
      num: "5", titulo: "CALCULADORA DE INVERSIÓN",
      copy: '"Compara tu fracción vs. tener el dinero en CETES."',
      desc: "El cotizador que ya tenemos. Insértalo aquí directamente.",
      elementos: ["Input: monto a invertir", "Comparativa CETES / S&P / Caracol", "Resultado visual"]
    },
    {
      num: "6", titulo: "PREGUNTAS FRECUENTES",
      copy: '"Todo lo que necesitas saber antes de invertir."',
      desc: "Acordeón de preguntas con las 6 objeciones más comunes respondidas.",
      elementos: ["¿Es tiempo compartido?", "¿Puedo venderla?", "¿Qué pasa con Otis?", "¿Cómo se rentan las semanas?"]
    },
    {
      num: "7", titulo: "CIERRE + CTA FINAL",
      copy: '"Solo quedan X fracciones. Aparta la tuya hoy."',
      desc: "Contador de disponibilidad (puede ser manual). Formulario de contacto simple + botón de WhatsApp.",
      elementos: ["Urgencia", "Formulario 3 campos", "WhatsApp directo", "Teléfono visible"]
    },
  ];

  return (
    <div>
      <SectionTitle icon="🌐" title="Estructura de Landing Page" />
      <Body>7 secciones en orden. Cada una tiene un objetivo específico. El diseño sigue al cotizador que ya tienes.</Body>

      {secciones.map(s => (
        <div key={s.num} style={{ marginBottom: 12, background: "#fff", borderRadius: 12, overflow: "hidden", border: "1px solid #e8e8e8" }}>
          <div style={{ background: `linear-gradient(90deg, ${BRAND.primary}, #1a4a7a)`, padding: "8px 14px", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ background: BRAND.gold, color: BRAND.primary, fontWeight: "900", fontSize: 12, width: 24, height: 24, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif", flexShrink: 0 }}>
              {s.num}
            </div>
            <div style={{ color: "#fff", fontWeight: "bold", fontSize: 13, fontFamily: "sans-serif", letterSpacing: 1 }}>{s.titulo}</div>
          </div>
          <div style={{ padding: "12px 14px" }}>
            <div style={{ fontSize: 14, fontStyle: "italic", color: BRAND.primary, marginBottom: 6 }}>{s.copy}</div>
            <div style={{ fontSize: 12, color: "#666", fontFamily: "sans-serif", lineHeight: 1.6, marginBottom: 8 }}>{s.desc}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {s.elementos.map(el => (
                <span key={el} style={{ background: "#f0f7ff", color: BRAND.ocean, fontSize: 11, padding: "3px 8px", borderRadius: 4, fontFamily: "sans-serif" }}>
                  {el}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────── */
/*  SECCIÓN 6: SCRIPTS                */
/* ─────────────────────────────────── */
function ScriptsSection() {
  const [open, setOpen] = useState(null);

  const scripts = [
    {
      titulo: "📱 Mensaje de WhatsApp inicial (outbound)",
      texto: `Hola [Nombre], soy [tu nombre] de Caracol Reserva en Acapulco Zona Diamante.

Te escribo porque vi que te interesó información sobre inversión inmobiliaria en la costa.

¿Sabías que puedes ser propietario escriturado de una suite en la mejor zona de Acapulco desde $320,000 MXN?

No es tiempo compartido. Es tu fracción, con escritura, para siempre.

¿Tienes 20 minutos esta semana para que te muestre los números? 📊`
    },
    {
      titulo: "📞 Apertura de llamada fría",
      texto: `"Buenos días/tardes, ¿habló con [Nombre]? Qué gusto. Mire, le llamo de Caracol Reserva en Acapulco — somos un desarrollo en Zona Diamante.

Le llamo porque estamos lanzando un producto que probablemente no ha visto antes: fracciones escrituradas de propiedades de playa. No es tiempo compartido, no es copropiedad — es su propia escritura.

¿Le platico en 3 minutos cómo funciona y si tiene sentido para usted?"`
    },
    {
      titulo: "🎥 Guión de videollamada (20 min)",
      texto: `MINUTOS 0–3: CONEXIÓN
"Antes de empezar, cuénteme: ¿usted ya tiene propiedades de inversión o sería su primera?"
→ Escuchar. Adaptar el discurso a su perfil.

MINUTOS 3–8: EL CONTEXTO
"Le voy a contar por qué Zona Diamante es diferente a todo lo demás que ve en Acapulco..."
→ Mostrar mapa, comparativo Los Cabos/Cancún, inversiones activas post-Otis.

MINUTOS 8–14: EL PRODUCTO
"Caracol Reserva funciona así..."
→ 8 fracciones, 6 semanas de uso, escriturado, administración incluida.
→ Mostrar cotizador: CETES vs Caracol.

MINUTOS 14–18: LOS NÚMEROS
"A ver, con su monto de inversión, esto es lo que generaría..."
→ Usar el cotizador en tiempo real.

MINUTOS 18–20: CIERRE
"¿Qué le llama más la atención — usarlo como casa de playa o como inversión rentable?"
→ Escuchar respuesta y responder:
"Perfecto. ¿Qué necesitaría para sentirse listo para apartar su fracción hoy?"`
    },
    {
      titulo: "💬 Seguimiento a las 24 horas (no respondió)",
      texto: `"Hola [Nombre], ayer hablamos de Caracol Reserva.

Solo quería compartirle esto: esta semana tenemos disponibles 3 fracciones del Loft Reserva al precio de lanzamiento. Una vez que se vendan, el siguiente lote sube de precio.

¿Le parece si agendamos 20 minutos antes del viernes?"`
    },
    {
      titulo: "🤝 Cierre de apartado",
      texto: `"[Nombre], ya vio los números, ya entendió el producto.

La pregunta real es: ¿en cuánto tiempo quiere que su dinero empiece a trabajar para usted?

Hoy puede apartar su fracción con $15,000 pesos. Eso bloquea su precio y le da 15 días para revisar el contrato con calma.

¿Lo hacemos?"

→ Silencio. Esperar su respuesta.`
    },
  ];

  return (
    <div>
      <SectionTitle icon="💬" title="Scripts de Venta" />
      <Body>5 situaciones cubiertas. Cada guión está listo para usar o adaptar a tu estilo.</Body>

      {scripts.map((s, i) => (
        <div key={i} style={{ marginBottom: 8 }}>
          <button onClick={() => setOpen(open === i ? null : i)} style={{
            width: "100%", textAlign: "left",
            background: open === i ? BRAND.primary : "#f0f7ff",
            color: open === i ? "#fff" : BRAND.primary,
            border: "none", borderRadius: open === i ? "8px 8px 0 0" : 8,
            padding: "12px 16px", fontFamily: "sans-serif", fontSize: 13,
            fontWeight: "bold", cursor: "pointer",
            display: "flex", justifyContent: "space-between"
          }}>
            <span>{s.titulo}</span>
            <span>{open === i ? "−" : "+"}</span>
          </button>
          {open === i && (
            <div style={{ background: "#fafafa", borderRadius: "0 0 8px 8px", padding: "14px 16px", border: "1px solid #e0e0e0", borderTop: "none" }}>
              <pre style={{ fontFamily: "sans-serif", fontSize: 12, color: "#333", whiteSpace: "pre-wrap", lineHeight: 1.8, margin: 0 }}>
                {s.texto}
              </pre>
            </div>
          )}
        </div>
      ))}

      <Card gold>
        <Label>REGLA DE ORO EN VENTAS</Label>
        <div style={{ fontSize: 14, color: BRAND.primary, marginTop: 8, lineHeight: 1.8, fontStyle: "italic" }}>
          "Quien pregunta, dirige. Quien escucha, cierra."
          <br />
          <span style={{ fontSize: 12, color: "#666", fontStyle: "normal" }}>
            Cada script tiene preguntas abiertas diseñadas para que el cliente se convenza a sí mismo.
          </span>
        </div>
      </Card>
    </div>
  );
}

/* ─── Componentes de utilidad ─── */
function SectionTitle({ icon, title }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 11, color: BRAND.gold, letterSpacing: 3, fontFamily: "sans-serif", marginBottom: 2 }}>CARACOL RESERVA</div>
      <div style={{ fontSize: 20, fontWeight: "bold", color: BRAND.primary }}>{icon} {title}</div>
      <div style={{ width: 40, height: 2, background: BRAND.gold, marginTop: 6 }} />
    </div>
  );
}

function SectionSub({ children }) {
  return (
    <div style={{ fontSize: 12, fontWeight: "bold", color: BRAND.ocean, fontFamily: "sans-serif", letterSpacing: 1, textTransform: "uppercase", margin: "16px 0 8px" }}>
      {children}
    </div>
  );
}

function Card({ children, gold }) {
  return (
    <div style={{
      background: gold ? "#FFF8E7" : "#f8faff",
      border: `1px solid ${gold ? BRAND.gold : "#d4e8ff"}`,
      borderRadius: 10, padding: 14, marginBottom: 14
    }}>{children}</div>
  );
}

function Label({ children }) {
  return <div style={{ fontSize: 10, letterSpacing: 2, fontFamily: "sans-serif", color: BRAND.ocean, fontWeight: "bold" }}>{children}</div>;
}

function Body({ children }) {
  return <p style={{ fontSize: 13, color: "#444", fontFamily: "sans-serif", lineHeight: 1.7, marginBottom: 14 }}>{children}</p>;
}
