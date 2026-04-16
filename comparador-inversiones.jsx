import { useState, useMemo, useEffect, useCallback } from "react";

const fmt = (n) =>
  new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(n);
const fmtPct = (n) => `${Number(n).toFixed(1)}%`;
const fmtNum = (n) => new Intl.NumberFormat("es-MX", { maximumFractionDigits: 0 }).format(n);

const SliderInput = ({ label, value, onChange, min, max, step = 1, suffix = "" }) => (
  <div style={{ marginBottom: 16 }}>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
      <span style={{ fontSize: 12, color: "#94a3b8", fontFamily: "'DM Sans', sans-serif" }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 700, color: "#f0b429", fontFamily: "monospace" }}>
        {suffix === "%" ? fmtPct(value) : `${fmtNum(value)}${suffix}`}
      </span>
    </div>
    <input type="range" min={min} max={max} step={step} value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      style={{ width: "100%", accentColor: "#f0b429", cursor: "pointer" }} />
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#475569", marginTop: 2 }}>
      <span>{suffix === "%" ? fmtPct(min) : `${fmtNum(min)}${suffix}`}</span>
      <span>{suffix === "%" ? fmtPct(max) : `${fmtNum(max)}${suffix}`}</span>
    </div>
  </div>
);

// Input con formato de miles al leer, número al editar
const NumberInput = ({ label, value, onChange, prefix = "", suffix = "", hint = "" }) => {
  const [editing, setEditing] = useState(false);
  const [raw, setRaw] = useState(String(value));
  useEffect(() => { if (!editing) setRaw(String(value)); }, [value, editing]);
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: "block", fontSize: 12, color: "#94a3b8", marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>
        {label} {hint && <span style={{ color: "#475569" }}>({hint})</span>}
      </label>
      <div style={{ display: "flex", alignItems: "center", background: "#0f172a", border: "1px solid #1e3a5f", borderRadius: 8, overflow: "hidden" }}>
        {prefix && <span style={{ padding: "8px 10px", color: "#64748b", fontSize: 13, borderRight: "1px solid #1e3a5f" }}>{prefix}</span>}
        <input
          type={editing ? "number" : "text"}
          value={editing ? raw : fmtNum(value)}
          onFocus={() => { setEditing(true); setRaw(String(value)); }}
          onBlur={() => { setEditing(false); const v = parseFloat(raw); if (!isNaN(v)) onChange(v); }}
          onChange={(e) => setRaw(e.target.value)}
          style={{
            flex: 1, background: "transparent", border: "none", color: "#f1f5f9",
            padding: "8px 10px", fontSize: 13, fontFamily: "monospace", outline: "none"
          }} />
        {suffix && <span style={{ padding: "8px 10px", color: "#64748b", fontSize: 13, borderLeft: "1px solid #1e3a5f" }}>{suffix}</span>}
      </div>
    </div>
  );
};

const ResultCard = ({ title, icon, color, rows, highlight, badge }) => (
  <div style={{
    background: "linear-gradient(135deg, #0f172a 60%, #1a2744)",
    border: `1.5px solid ${color}40`, borderRadius: 16, padding: 20, position: "relative", overflow: "hidden"
  }}>
    <div style={{
      position: "absolute", top: 0, right: 0, width: 80, height: 80,
      background: `radial-gradient(circle at top right, ${color}20, transparent)`
    }} />
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
      <span style={{ fontSize: 22 }}>{icon}</span>
      <div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700, color: "#f1f5f9" }}>{title}</div>
        {badge && <span style={{ fontSize: 10, background: `${color}25`, color, padding: "2px 8px", borderRadius: 20, fontWeight: 600 }}>{badge}</span>}
      </div>
    </div>
    {rows.map((row, i) => (
      <div key={i} style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "6px 0", borderBottom: i < rows.length - 1 ? "1px solid #1e293b" : "none"
      }}>
        <span style={{ fontSize: 12, color: "#64748b" }}>{row.label}</span>
        <span style={{ fontSize: 13, fontWeight: row.bold ? 700 : 500, color: row.bold ? color : "#cbd5e1", fontFamily: "monospace" }}>
          {row.value}
        </span>
      </div>
    ))}
    {highlight && (
      <div style={{
        marginTop: 14, padding: "10px 14px", background: `${color}15`,
        borderRadius: 10, border: `1px solid ${color}30`, textAlign: "center"
      }}>
        <div style={{ fontSize: 11, color: "#64748b", marginBottom: 2 }}>RESULTADO FINAL</div>
        <div style={{ fontSize: 20, fontWeight: 800, color, fontFamily: "monospace" }}>{highlight}</div>
      </div>
    )}
  </div>
);

const TAG = ({ text, color }) => (
  <span style={{
    fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20,
    background: `${color}20`, color, border: `1px solid ${color}40`
  }}>{text}</span>
);

const CORTES = [5, 10, 15, 20];

export default function App() {
  const [valorPropiedad, setValorPropiedad] = useState(3500000);
  const [enganchePct, setEnganchePct] = useState(30);
  const [rentaDiaria, setRentaDiaria] = useState(1200);
  const [ocupacion, setOcupacion] = useState(50);
  const [gastosOp, setGastosOp] = useState(25);
  const [plusvalia, setPlusvalia] = useState(6);
  const [horizonte, setHorizonte] = useState(5);
  const [tasaMensualidad, setTasaMensualidad] = useState(12);
  const [tasaCetes, setTasaCetes] = useState(9.5);
  const [tasaSP, setTasaSP] = useState(11.5);
  const [tasaUDIS, setTasaUDIS] = useState(4.5);
  const [tab, setTab] = useState("params");
  const [fetchStatus, setFetchStatus] = useState("loading");
  const [fetchNote, setFetchNote] = useState("⏳ Consultando CETES e inflación en tiempo real...");

  const fetchRates = useCallback(async () => {
    setFetchStatus("loading");
    setFetchNote("⏳ Consultando CETES e inflación en tiempo real...");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 500,
          tools: [{ type: "web_search_20250305", name: "web_search" }],
          system: "Eres asistente financiero mexicano. Busca la tasa actual de CETES a 28 días en Banxico y la inflación anual más reciente de México (INEGI). Responde ÚNICAMENTE con JSON puro sin texto adicional ni markdown. Formato exacto: {\"cetes\": 9.5, \"inflacion\": 3.8, \"fecha\": \"marzo 2026\"}",
          messages: [{ role: "user", content: "Dame la tasa actual de CETES 28 días y la inflación anual de México hoy 2026." }]
        })
      });
      const data = await res.json();
      const textBlock = data.content?.find(b => b.type === "text");
      if (textBlock?.text) {
        const clean = textBlock.text.replace(/```json|```/g, "").trim();
        const j = JSON.parse(clean);
        if (j.cetes > 0) setTasaCetes(parseFloat(j.cetes));
        if (j.inflacion > 0) setTasaUDIS(Math.max(1.5, parseFloat(j.inflacion) - 1.2));
        setFetchNote(`⚡ En vivo — CETES ${j.cetes}% · Inflación ${j.inflacion}% · ${j.fecha}`);
        setFetchStatus("done");
      } else throw new Error();
    } catch {
      setFetchNote("⚠️ Sin datos en vivo. Ajusta manualmente.");
      setFetchStatus("error");
    }
  }, []);

  useEffect(() => { fetchRates(); }, []);

  const calc = useMemo(() => {
    const enganche = valorPropiedad * (enganchePct / 100);
    const credito = valorPropiedad - enganche;
    const r = tasaMensualidad / 100 / 12;
    const mensualidad = credito * r / (1 - Math.pow(1 + r, -240));
    const ingresoBrutoAnual = rentaDiaria * (ocupacion / 100) * 365;
    const gastosAnuales = ingresoBrutoAnual * (gastosOp / 100);
    const ingresoNetoAnual = ingresoBrutoAnual - gastosAnuales;
    const ingresoNetoMensual = ingresoNetoAnual / 12;
    const flujoMensual = ingresoNetoMensual - mensualidad;
    const flujoAcumulado = flujoMensual * 12 * horizonte;
    const valorFuturoPropiedad = valorPropiedad * Math.pow(1 + plusvalia / 100, horizonte);
    const gananciaPlusvalia = valorFuturoPropiedad - valorPropiedad;
    const totalInmueble = valorFuturoPropiedad + flujoAcumulado;
    const roiInmueble = ((totalInmueble - enganche) / enganche) * 100;
    const roiAnualInmueble = (Math.pow(totalInmueble / enganche, 1 / horizonte) - 1) * 100;
    const fvCetes = enganche * Math.pow(1 + tasaCetes / 100, horizonte);
    const fvSP = enganche * Math.pow(1 + tasaSP / 100, horizonte);
    const fvUDIS = enganche * Math.pow(1 + tasaUDIS / 100, horizonte);
    const apalancamiento = valorPropiedad / enganche;
    const cortes = CORTES.map(y => ({
      y,
      inmueble: valorPropiedad * Math.pow(1 + plusvalia / 100, y) + flujoMensual * 12 * y,
      vfProp: valorPropiedad * Math.pow(1 + plusvalia / 100, y),
      flujoAc: flujoMensual * 12 * y,
      cetes: enganche * Math.pow(1 + tasaCetes / 100, y),
      sp: enganche * Math.pow(1 + tasaSP / 100, y),
      udis: enganche * Math.pow(1 + tasaUDIS / 100, y),
    }));
    return {
      enganche, credito, mensualidad, ingresoBrutoAnual, gastosAnuales,
      ingresoNetoAnual, ingresoNetoMensual, flujoMensual, flujoAcumulado,
      valorFuturoPropiedad, gananciaPlusvalia, totalInmueble, roiInmueble, roiAnualInmueble,
      fvCetes, fvSP, fvUDIS, apalancamiento, cortes,
      roiCetes: ((fvCetes - enganche) / enganche) * 100,
      roiSP: ((fvSP - enganche) / enganche) * 100,
      roiUDIS: ((fvUDIS - enganche) / enganche) * 100,
    };
  }, [valorPropiedad, enganchePct, rentaDiaria, ocupacion, gastosOp, plusvalia, horizonte, tasaMensualidad, tasaCetes, tasaSP, tasaUDIS]);

  const winner = useMemo(() => [
    { name: "Bienes Raíces", val: calc.totalInmueble },
    { name: "S&P 500", val: calc.fvSP },
    { name: "CETES", val: calc.fvCetes },
    { name: "UDIS", val: calc.fvUDIS },
  ].sort((a, b) => b.val - a.val)[0], [calc]);

  const TabBtn = ({ id, label }) => (
    <button onClick={() => setTab(id)} style={{
      padding: "8px 18px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600,
      background: tab === id ? "#f0b429" : "transparent",
      color: tab === id ? "#0f172a" : "#64748b",
      transition: "all 0.2s"
    }}>{label}</button>
  );

  return (
    <div style={{
      minHeight: "100vh", background: "#060d1a",
      fontFamily: "'DM Sans', system-ui, sans-serif", color: "#f1f5f9"
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* HEADER */}
      <div style={{
        background: "linear-gradient(135deg, #0a1628 0%, #0d1f3c 100%)",
        borderBottom: "1px solid #1e3a5f", padding: "24px 28px"
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div>
              <div style={{ fontSize: 11, letterSpacing: 3, color: "#f0b429", fontWeight: 700, marginBottom: 4 }}>
                ANÁLISIS FINANCIERO COMPARATIVO
              </div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 800, margin: 0, color: "#f1f5f9" }}>
                Bienes Raíces vs Instrumentos Financieros
              </h1>
              <p style={{ margin: "6px 0 6px", color: "#64748b", fontSize: 13 }}>
                Compara el rendimiento real de tu capital en distintas alternativas
              </p>
              {/* Badge CETES en vivo */}
              <div style={{
                fontSize: 11,
                color: fetchStatus === "done" ? "#34d399" : fetchStatus === "error" ? "#f0b429" : "#94a3b8",
                background: fetchStatus === "done" ? "#34d39915" : "#FFFFFF08",
                border: `1px solid ${fetchStatus === "done" ? "#34d39940" : "#ffffff15"}`,
                borderRadius: 8, padding: "4px 12px", display: "inline-block"
              }}>
                {fetchNote}
                {fetchStatus !== "loading" && (
                  <button onClick={fetchRates} style={{
                    marginLeft: 10, fontSize: 10, color: "#f0b429",
                    background: "transparent", border: "none", cursor: "pointer", textDecoration: "underline"
                  }}>
                    Actualizar
                  </button>
                )}
              </div>
            </div>
            <div style={{
              background: "#f0b42915", border: "1px solid #f0b42940",
              borderRadius: 12, padding: "10px 18px", textAlign: "center"
            }}>
              <div style={{ fontSize: 10, color: "#94a3b8", marginBottom: 4 }}>🏆 MEJOR OPCIÓN ({horizonte} años)</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#f0b429" }}>{winner.name}</div>
              <div style={{ fontSize: 13, color: "#94a3b8", fontFamily: "monospace" }}>{fmt(winner.val)}</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 16px" }}>

        {/* TABS */}
        <div style={{
          display: "flex", gap: 4, background: "#0f172a", borderRadius: 10,
          padding: 4, marginBottom: 24, border: "1px solid #1e293b", width: "fit-content", flexWrap: "wrap"
        }}>
          <TabBtn id="params" label="⚙️ Variables" />
          <TabBtn id="results" label="📊 Resultados" />
          <TabBtn id="analysis" label="🧠 Análisis" />
          <TabBtn id="cierre" label="🔥 Por Qué Sí" />
        </div>

        {/* ── PARAMS ── */}
        {tab === "params" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>

            <div style={{ background: "#0f172a", border: "1px solid #1e3a5f", borderRadius: 16, padding: 22 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                <span style={{ fontSize: 20 }}>🏠</span>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700 }}>Propiedad</span>
              </div>
              <NumberInput label="Valor de la propiedad" value={valorPropiedad} onChange={setValorPropiedad} prefix="$" hint="MXN" />
              <SliderInput label="Enganche" value={enganchePct} onChange={setEnganchePct} min={10} max={50} suffix="%" />
              <div style={{ padding: "10px 12px", background: "#0a1628", borderRadius: 8, marginBottom: 14 }}>
                <div style={{ fontSize: 11, color: "#64748b" }}>Enganche calculado</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#38bdf8", fontFamily: "monospace" }}>{fmt(calc.enganche)}</div>
                <div style={{ fontSize: 11, color: "#64748b", marginTop: 4 }}>Crédito: <span style={{ color: "#94a3b8" }}>{fmt(calc.credito)}</span></div>
              </div>
              <NumberInput label="Tasa crédito hipotecario" value={tasaMensualidad} onChange={setTasaMensualidad} suffix="% anual" hint="TIIE+spread" />
              <div style={{ padding: "8px 12px", background: "#0a1628", borderRadius: 8, marginBottom: 14 }}>
                <div style={{ fontSize: 11, color: "#64748b" }}>Mensualidad estimada</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#fb7185", fontFamily: "monospace" }}>{fmt(calc.mensualidad)}/mes</div>
              </div>
            </div>

            <div style={{ background: "#0f172a", border: "1px solid #1e3a5f", borderRadius: 16, padding: 22 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                <span style={{ fontSize: 20 }}>🏨</span>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700 }}>Operación / Renta</span>
              </div>
              <NumberInput label="Renta diaria promedio" value={rentaDiaria} onChange={setRentaDiaria} prefix="$" hint="Airbnb/noche" />
              <SliderInput label="Ocupación anual" value={ocupacion} onChange={setOcupacion} min={20} max={90} suffix="%" />
              <SliderInput label="Gastos operativos" value={gastosOp} onChange={setGastosOp} min={10} max={50} suffix="%" />
              <div style={{ padding: "10px 12px", background: "#0a1628", borderRadius: 8, marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontSize: 11, color: "#64748b" }}>Ingreso bruto / año</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#94a3b8", fontFamily: "monospace" }}>{fmt(calc.ingresoBrutoAnual)}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 11, color: "#64748b" }}>Ingreso neto / mes</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#34d399", fontFamily: "monospace" }}>{fmt(calc.ingresoNetoMensual)}</div>
                  </div>
                </div>
              </div>
              <SliderInput label="Plusvalía anual" value={plusvalia} onChange={setPlusvalia} min={2} max={15} suffix="%" />
              <SliderInput label="Horizonte de inversión" value={horizonte} onChange={setHorizonte} min={1} max={20} suffix=" años" />
            </div>

            <div style={{ background: "#0f172a", border: "1px solid #1e3a5f", borderRadius: 16, padding: 22 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                <span style={{ fontSize: 20 }}>📈</span>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700 }}>Instrumentos financieros</span>
              </div>
              <p style={{ fontSize: 12, color: "#475569", marginBottom: 16 }}>
                Todos parten del mismo monto: <span style={{ color: "#f0b429", fontWeight: 700 }}>{fmt(calc.enganche)}</span>
              </p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: "#94a3b8" }}>CETES (tasa anual)</span>
                {fetchStatus === "loading" && <span style={{ fontSize: 10, color: "#38bdf8" }}>⏳ cargando...</span>}
                {fetchStatus === "done" && <span style={{ fontSize: 10, background: "#34d39920", color: "#34d399", padding: "2px 8px", borderRadius: 20, fontWeight: 700 }}>⚡ En vivo</span>}
              </div>
              <SliderInput label="" value={tasaCetes} onChange={setTasaCetes} min={4} max={16} step={0.1} suffix="%" />
              <SliderInput label="S&P 500 (rendimiento anual)" value={tasaSP} onChange={setTasaSP} min={6} max={20} step={0.5} suffix="%" />
              <SliderInput label="UDIS (rendimiento real)" value={tasaUDIS} onChange={setTasaUDIS} min={1} max={8} step={0.1} suffix="%" />
              <div style={{ padding: "10px 12px", background: "#0a1628", borderRadius: 8, marginTop: 12 }}>
                <div style={{ fontSize: 11, color: "#64748b", marginBottom: 8 }}>Vista previa rápida ({horizonte} años)</div>
                {[
                  { label: "CETES", val: calc.fvCetes, color: "#38bdf8" },
                  { label: "S&P 500", val: calc.fvSP, color: "#34d399" },
                  { label: "UDIS", val: calc.fvUDIS, color: "#a78bfa" },
                ].map(item => (
                  <div key={item.label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 12, color: "#64748b" }}>{item.label}</span>
                    <span style={{ fontSize: 12, color: item.color, fontWeight: 700, fontFamily: "monospace" }}>{fmt(item.val)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── RESULTS ── */}
        {tab === "results" && (
          <div>
            <div style={{
              background: calc.flujoMensual >= 0 ? "linear-gradient(135deg, #064e3b20, #0f172a)" : "linear-gradient(135deg, #7f1d1d20, #0f172a)",
              border: `1px solid ${calc.flujoMensual >= 0 ? "#34d39940" : "#fb718540"}`,
              borderRadius: 14, padding: "16px 24px", marginBottom: 20,
              display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12
            }}>
              <div>
                <div style={{ fontSize: 11, color: "#64748b", marginBottom: 4 }}>FLUJO MENSUAL NETO (rentas − hipoteca)</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: calc.flujoMensual >= 0 ? "#34d399" : "#fb7185", fontFamily: "monospace" }}>
                  {fmt(calc.flujoMensual)} / mes
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <TAG text={calc.flujoMensual >= 0 ? "✅ FLUJO POSITIVO" : "⚠️ FLUJO NEGATIVO"} color={calc.flujoMensual >= 0 ? "#34d399" : "#fb7185"} />
                <div style={{ fontSize: 12, color: "#64748b", marginTop: 6 }}>
                  Flujo acumulado {horizonte} años: <span style={{ color: "#f1f5f9", fontWeight: 700 }}>{fmt(calc.flujoAcumulado)}</span>
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, marginBottom: 24 }}>
              <ResultCard title="Bienes Raíces" icon="🏠" color="#f0b429" badge={`×${calc.apalancamiento.toFixed(1)} Apalancado`}
                rows={[
                  { label: "Enganche invertido", value: fmt(calc.enganche) },
                  { label: "Ingreso neto/año", value: fmt(calc.ingresoNetoAnual) },
                  { label: "Flujo mensual", value: fmt(calc.flujoMensual) },
                  { label: "Plusvalía acumulada", value: fmt(calc.gananciaPlusvalia) },
                  { label: "Valor futuro propiedad", value: fmt(calc.valorFuturoPropiedad) },
                  { label: "Flujos acumulados", value: fmt(calc.flujoAcumulado) },
                  { label: "ROI total", value: `${calc.roiInmueble.toFixed(0)}%`, bold: true },
                  { label: "ROI anualizado", value: `${calc.roiAnualInmueble.toFixed(1)}% anual`, bold: true },
                ]} highlight={fmt(calc.totalInmueble)} />
              <ResultCard title="CETES" icon="🏦" color="#38bdf8" badge="Libre de riesgo"
                rows={[
                  { label: "Capital inicial", value: fmt(calc.enganche) },
                  { label: "Tasa anual", value: fmtPct(tasaCetes) },
                  { label: "Horizonte", value: `${horizonte} años` },
                  { label: "Ganancia neta", value: fmt(calc.fvCetes - calc.enganche) },
                  { label: "ROI total", value: `${calc.roiCetes.toFixed(0)}%`, bold: true },
                ]} highlight={fmt(calc.fvCetes)} />
              <ResultCard title="S&P 500" icon="🇺🇸" color="#34d399" badge="Renta variable"
                rows={[
                  { label: "Capital inicial", value: fmt(calc.enganche) },
                  { label: "Tasa esperada", value: fmtPct(tasaSP) },
                  { label: "Horizonte", value: `${horizonte} años` },
                  { label: "Ganancia neta", value: fmt(calc.fvSP - calc.enganche) },
                  { label: "ROI total", value: `${calc.roiSP.toFixed(0)}%`, bold: true },
                ]} highlight={fmt(calc.fvSP)} />
              <ResultCard title="UDIS" icon="🇲🇽" color="#a78bfa" badge="Protección inflación"
                rows={[
                  { label: "Capital inicial", value: fmt(calc.enganche) },
                  { label: "Tasa real", value: fmtPct(tasaUDIS) },
                  { label: "Horizonte", value: `${horizonte} años` },
                  { label: "Ganancia neta", value: fmt(calc.fvUDIS - calc.enganche) },
                  { label: "ROI total", value: `${calc.roiUDIS.toFixed(0)}%`, bold: true },
                ]} highlight={fmt(calc.fvUDIS)} />
            </div>

            {/* Tabla cortes */}
            <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 16, overflow: "hidden" }}>
              <div style={{ padding: "16px 24px", borderBottom: "1px solid #1e293b", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700 }}>📅 Evolución por Corte de Tiempo</span>
                <span style={{ fontSize: 12, color: "#475569" }}>Partiendo de {fmt(calc.enganche)} de capital propio</span>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr style={{ background: "#0a1628" }}>
                      <th style={{ padding: "12px 16px", textAlign: "left", color: "#64748b", fontWeight: 600, fontSize: 12 }}>Alternativa</th>
                      {CORTES.map(y => (
                        <th key={y} style={{ padding: "12px 16px", textAlign: "right", color: "#94a3b8", fontWeight: 700, fontSize: 12 }}>{y} años</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { label: "🏠 Bienes Raíces", key: "inmueble", color: "#f0b429" },
                      { label: "  ↳ Valor propiedad", key: "vfProp", color: "#f0b42970", indent: true },
                      { label: "  ↳ Flujos acumulados", key: "flujoAc", color: "#f0b42970", indent: true },
                      { label: "🏦 CETES", key: "cetes", color: "#38bdf8" },
                      { label: "🇺🇸 S&P 500", key: "sp", color: "#34d399" },
                      { label: "🇲🇽 UDIS", key: "udis", color: "#a78bfa" },
                    ].map((row, ri) => (
                      <tr key={ri} style={{ borderBottom: "1px solid #1e293b" }}>
                        <td style={{
                          padding: row.indent ? "6px 16px 6px 28px" : "11px 16px",
                          color: row.indent ? "#475569" : "#94a3b8",
                          fontSize: row.indent ? 11 : 13, fontWeight: row.indent ? 400 : 600
                        }}>{row.label}</td>
                        {calc.cortes.map(c => {
                          const val = c[row.key];
                          const isMain = !row.indent;
                          const maxVal = isMain ? Math.max(c.inmueble, c.cetes, c.sp, c.udis) : null;
                          const isWinner = isMain && val === maxVal;
                          return (
                            <td key={c.y} style={{
                              padding: row.indent ? "6px 16px" : "11px 16px",
                              textAlign: "right", fontFamily: "monospace",
                              fontSize: row.indent ? 11 : 13,
                              fontWeight: isWinner ? 800 : isMain ? 600 : 400,
                              color: isWinner ? row.color : row.indent ? "#475569" : `${row.color}99`,
                              background: isWinner ? `${row.color}08` : "transparent"
                            }}>
                              {fmt(val)}{isWinner && <span style={{ marginLeft: 6, fontSize: 10, background: `${row.color}25`, color: row.color, padding: "2px 6px", borderRadius: 20, fontWeight: 700 }}>★</span>}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                    {[
                      { label: "ROI Bienes Raíces", key: "inmueble", color: "#f0b429" },
                      { label: "ROI S&P 500", key: "sp", color: "#34d399" },
                    ].map((row, ri) => (
                      <tr key={"roi" + ri} style={{ background: "#0a1628", borderTop: ri === 0 ? "2px solid #1e3a5f" : "none" }}>
                        <td style={{ padding: "11px 16px", color: "#64748b", fontSize: 12, fontWeight: 600 }}>{row.label}</td>
                        {calc.cortes.map(c => (
                          <td key={c.y} style={{
                            padding: "11px 16px", textAlign: "right",
                            fontFamily: "monospace", fontSize: 12, color: row.color, fontWeight: 800
                          }}>
                            {(((c[row.key] - calc.enganche) / calc.enganche) * 100).toFixed(0)}%
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── ANALYSIS ── */}
        {tab === "analysis" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
            <div style={{
              gridColumn: "1/-1", background: "linear-gradient(135deg, #1a2a0a, #0f172a)",
              border: "1.5px solid #84cc1640", borderRadius: 16, padding: 24
            }}>
              <div style={{ fontSize: 11, letterSpacing: 2, color: "#84cc16", marginBottom: 8 }}>VEREDICTO DEL ANÁLISIS</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 800, margin: "0 0 12px", color: "#f1f5f9" }}>
                {calc.totalInmueble > calc.fvSP
                  ? "✅ Bienes Raíces gana — el apalancamiento hace la diferencia"
                  : "📊 S&P 500 supera al inmueble en este escenario"}
              </h2>
              <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.7, margin: 0 }}>
                Con <strong style={{ color: "#f0b429" }}>{fmt(calc.enganche)}</strong> de enganche, controlas{" "}
                <strong style={{ color: "#f0b429" }}>{fmt(valorPropiedad)}</strong> — apalancamiento {calc.apalancamiento.toFixed(1)}x.
                La comparación justa es rendimiento sobre capital propio, no sobre el valor total.
              </p>
            </div>

            <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 16, padding: 22 }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 700, marginBottom: 16 }}>📋 Supuestos declarados</div>
              {[
                { k: "Mensualidad", v: `${fmt(calc.mensualidad)}/mes`, note: "Crédito a 20 años, tasa variable" },
                { k: "Ocupación", v: `${ocupacion}% anual`, note: "Varía según temporada y plataforma" },
                { k: "Gastos op.", v: `${gastosOp}% del ingreso bruto`, note: "Mantenimiento, plataformas, admin" },
                { k: "Plusvalía", v: `${plusvalia}% anual compuesto`, note: "Dato histórico, no garantizado" },
                { k: "S&P 500", v: `${tasaSP}% anual`, note: "Promedio histórico 30 años (USD)" },
                { k: "CETES", v: `${tasaCetes}%`, note: fetchStatus === "done" ? "⚡ Dato en tiempo real" : "Referencial" },
                { k: "UDIS", v: `${tasaUDIS}% real`, note: "Derivado de inflación actual" },
              ].map((item, i) => (
                <div key={i} style={{ padding: "8px 0", borderBottom: i < 6 ? "1px solid #1e293b" : "none" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600 }}>{item.k}</span>
                    <span style={{ fontSize: 12, color: "#f0b429", fontFamily: "monospace" }}>{item.v}</span>
                  </div>
                  <div style={{ fontSize: 11, color: "#475569", marginTop: 2 }}>{item.note}</div>
                </div>
              ))}
            </div>

            <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 16, padding: 22 }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 700, marginBottom: 16 }}>⚠️ Riesgos por alternativa</div>
              {[
                { title: "🏠 Bienes Raíces", color: "#f0b429", risks: ["Ocupación real puede caer en crisis", "Gastos de mantenimiento inesperados", "Cambios regulatorios (Airbnb)", "Plusvalía no garantizada", "Iliquidez — no se vende en días"] },
                { title: "🏦 CETES", color: "#38bdf8", risks: ["Rendimiento real negativo si inflación > tasa", "No genera apalancamiento", "Riesgo soberano (muy bajo)"] },
                { title: "🇺🇸 S&P 500", color: "#34d399", risks: ["Volatilidad alta: caídas del 30-50%", "Riesgo cambiario (MXN/USD)", "Retornos pasados no garantizan futuros"] },
                { title: "🇲🇽 UDIS", color: "#a78bfa", risks: ["Rendimiento real muy bajo", "Solo protege contra inflación", "No genera patrimonio significativo"] },
              ].map((item, ri) => (
                <div key={ri} style={{ marginBottom: ri < 3 ? 14 : 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: item.color, marginBottom: 6 }}>{item.title}</div>
                  {item.risks.map((r, i) => (
                    <div key={i} style={{ fontSize: 12, color: "#64748b", marginBottom: 3, paddingLeft: 12, position: "relative" }}>
                      <span style={{ position: "absolute", left: 0, color: item.color }}>›</span>{r}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div style={{
              gridColumn: "1/-1", background: "linear-gradient(135deg, #1a1020, #0f172a)",
              border: "1.5px solid #f0b42940", borderRadius: 16, padding: 24
            }}>
              <div style={{ fontSize: 11, letterSpacing: 2, color: "#f0b429", marginBottom: 8 }}>💼 PERSPECTIVA DEL ASESOR</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, margin: "0 0 12px", color: "#f1f5f9" }}>
                El secreto que los libros de finanzas no te cuentan: el apalancamiento
              </h3>
              <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.8, margin: "0 0 16px" }}>
                Con CETES, S&P 500 o UDIS, cada peso que ganas es sobre lo que pusiste tú. Con una propiedad,{" "}
                <strong style={{ color: "#f0b429" }}>el banco pone el {(100 - enganchePct).toFixed(0)}% del dinero</strong> — pero
                el 100% de la plusvalía y las rentas son tuyas. Tu {fmt(calc.enganche)} está{" "}
                <strong style={{ color: "#f0b429" }}>controlando {fmt(valorPropiedad)}</strong>.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
                {[
                  { label: "Conviene si…", text: "Tienes flujo para cubrir mensualidades y ocupación realista >50%", color: "#34d399" },
                  { label: "No conviene si…", text: "No tienes reserva de 6 meses y dependes del flujo inmediato", color: "#fb7185" },
                  { label: "Depende de…", text: `Ocupación (hoy en ${ocupacion}%) y plusvalía real de la zona`, color: "#f0b429" },
                ].map((item, i) => (
                  <div key={i} style={{
                    padding: "12px 16px", background: `${item.color}10`,
                    border: `1px solid ${item.color}30`, borderRadius: 10
                  }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: item.color, marginBottom: 6 }}>{item.label}</div>
                    <div style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.5 }}>{item.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── CIERRE ── */}
        {tab === "cierre" && (
          <div>
            <div style={{
              background: "linear-gradient(135deg, #1a0a2e 0%, #0f172a 60%, #0d1f10 100%)",
              border: "1.5px solid #f0b42950", borderRadius: 20, padding: "32px 28px", marginBottom: 24, textAlign: "center",
              position: "relative", overflow: "hidden"
            }}>
              <div style={{
                position: "absolute", top: -40, right: -40, width: 180, height: 180, borderRadius: "50%",
                background: "radial-gradient(circle, #f0b42920, transparent)"
              }} />
              <div style={{ fontSize: 13, letterSpacing: 3, color: "#f0b429", fontWeight: 700, marginBottom: 10 }}>EL ARGUMENTO QUE CAMBIA LA CONVERSACIÓN</div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 800, color: "#f1f5f9", margin: "0 0 14px", lineHeight: 1.3 }}>
                Una propiedad no es un gasto.<br />
                <span style={{ color: "#f0b429" }}>Es un activo que trabaja mientras tú duermes.</span>
              </h1>
              <p style={{ color: "#94a3b8", fontSize: 15, maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>
                Y si además la puedes disfrutar tú y tu familia, estamos hablando de algo que ningún instrumento financiero puede darte:{" "}
                <strong style={{ color: "#f1f5f9" }}>rendimiento financiero + rendimiento de vida.</strong>
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, marginBottom: 24 }}>
              {[
                {
                  icon: "🏦", color: "#f0b429", tag: "APALANCAMIENTO",
                  title: "El banco te presta lo que a otros les niega",
                  body: `Con ${fmt(calc.enganche)} de enganche controlas ${fmt(valorPropiedad)} en activos reales. Eso es ${calc.apalancamiento.toFixed(1)}x tu dinero. Ningún instrumento financiero te da ese poder.`,
                  stat: `×${calc.apalancamiento.toFixed(1)} tu dinero`
                },
                {
                  icon: "🌊", color: "#38bdf8", tag: "EL TRUCO DEL SIGLO",
                  title: "El inquilino paga la hipoteca, tú te quedas la plusvalía",
                  body: `Con ${ocupacion}% de ocupación a ${fmt(rentaDiaria)}/noche, el ingreso neto mensual es ${fmt(calc.ingresoNetoMensual)}. La plusvalía de ${fmt(calc.gananciaPlusvalia)} en ${horizonte} años es 100% tuya.`,
                  stat: `${fmt(calc.ingresoNetoMensual)}/mes`
                },
                {
                  icon: "🏖️", color: "#fb923c", tag: "BENEFICIO DOBLE",
                  title: "Tú la disfrutas — nadie más tiene eso",
                  body: "Una semana con tu familia en tu propiedad no es gasto — es experiencia real. El retorno emocional no aparece en tablas, pero es real y tiene enorme valor.",
                  stat: "Valor de vida real"
                },
                {
                  icon: "📈", color: "#a78bfa", tag: "RIQUEZA COMPUESTA",
                  title: "La plusvalía es silenciosa pero implacable",
                  body: `A ${plusvalia}% anual compuesto, ${fmt(valorPropiedad)} se convierte en ${fmt(calc.valorFuturoPropiedad)} en ${horizonte} años. Sin hacer nada. Y ese crecimiento es sobre el activo total.`,
                  stat: fmt(calc.valorFuturoPropiedad)
                },
                {
                  icon: "🛡️", color: "#fb7185", tag: "PROTECCIÓN REAL",
                  title: "Un inmueble no desaparece en un crash",
                  body: "Las acciones pueden caer 40% en semanas. Los CETES pierden contra inflación. Un inmueble en Zona Diamante tiene metros reales, ubicación real, demanda real.",
                  stat: "Activo tangible"
                },
                {
                  icon: "🏛️", color: "#fbbf24", tag: "LEGADO GENERACIONAL",
                  title: "Patrimonio que puedes dejar a tus hijos",
                  body: "Una propiedad escriturada en zona premium es difícil de dilapidar. Tus hijos heredan un activo físico con valor, historia, recuerdos y potencial de seguir generando rentas.",
                  stat: "Herencia real"
                },
                {
                  icon: "📊", color: "#38bdf8", tag: "ZONA BLINDADA",
                  title: "Acapulco Diamante no se inundó — eso tiene precio",
                  body: "Post-Otis, Zona Diamante demostró que su elevación la protege. El resto de Acapulco tardó meses; Diamante retomó en semanas. Eso no es suerte — es geografía. Y vale plusvalía extra.",
                  stat: "Zona premium validada"
                },
                {
                  icon: "✈️", color: "#34d399", tag: "INGRESO PASIVO REAL",
                  title: "Airbnb hace el trabajo de venta por ti",
                  body: `No necesitas oficina ni equipo. Con ${ocupacion}% de ocupación el modelo ya es viable. Y quien tiene una propiedad, pronto tiene dos.`,
                  stat: "Ingreso pasivo escalable"
                },
              ].map((card, i) => (
                <div key={i} style={{
                  background: "#0f172a", border: `1px solid ${card.color}30`,
                  borderRadius: 16, padding: 20, position: "relative", overflow: "hidden"
                }}>
                  <div style={{
                    position: "absolute", top: 0, right: 0, width: 60, height: 60,
                    background: `radial-gradient(circle at top right, ${card.color}15, transparent)`
                  }} />
                  <div style={{ fontSize: 10, letterSpacing: 2, color: card.color, fontWeight: 700, marginBottom: 8 }}>{card.tag}</div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
                    <span style={{ fontSize: 24 }}>{card.icon}</span>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 700, color: "#f1f5f9", lineHeight: 1.3 }}>{card.title}</div>
                  </div>
                  <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.65, margin: "0 0 14px" }}>{card.body}</p>
                  <div style={{
                    display: "inline-block", background: `${card.color}15`,
                    border: `1px solid ${card.color}30`, borderRadius: 8,
                    padding: "5px 12px", fontSize: 13, fontWeight: 700, color: card.color, fontFamily: "monospace"
                  }}>{card.stat}</div>
                </div>
              ))}
            </div>

            <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 16, padding: 24, marginBottom: 20 }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 700, marginBottom: 20, color: "#f1f5f9" }}>
                ⚖️ La comparación que nadie te hace en el banco
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
                {[
                  { label: "CETES", color: "#38bdf8", emoji: "🏦", verdict: "Ahorro, no inversión real", desc: "Te dan dinero pero no patrimonio físico. Si lo necesitas, lo retiras y desaparece." },
                  { label: "S&P 500", color: "#34d399", emoji: "📉", verdict: "Volátil, sin control", desc: "Excelente historial. Pero cuando cae 35% en un año, te duele. Y si tienes 60, ese año importa." },
                  { label: "UDIS", color: "#a78bfa", emoji: "🐢", verdict: "Defensivo, no constructor", desc: "Solo protege de la inflación. No crece por encima de ella. Es correr para no quedarse atrás." },
                  { label: "Propiedad", color: "#f0b429", emoji: "🏆", verdict: "Patrimonio + vida", desc: "Apalancamiento real. Flujo de renta. Plusvalía compuesta. Lo puedes tocar, habitar, heredar." },
                ].map((item, i) => (
                  <div key={i} style={{
                    padding: "16px", background: i === 3 ? `${item.color}10` : "#0a1628",
                    border: `1px solid ${i === 3 ? item.color + "40" : "#1e293b"}`, borderRadius: 12
                  }}>
                    <div style={{ fontSize: 20, marginBottom: 8 }}>{item.emoji}</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: item.color, marginBottom: 6 }}>{item.label}</div>
                    <div style={{ fontSize: 12, color: "#64748b", lineHeight: 1.6, marginBottom: 10 }}>{item.desc}</div>
                    <div style={{
                      fontSize: 11, fontWeight: 700, color: item.color, background: `${item.color}15`,
                      padding: "4px 10px", borderRadius: 20, display: "inline-block"
                    }}>{item.verdict}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              background: "linear-gradient(135deg, #0f2a1a 0%, #0f172a 50%, #1a0f2a 100%)",
              border: "2px solid #f0b42960", borderRadius: 20, padding: "28px 32px", textAlign: "center"
            }}>
              <div style={{ fontSize: 11, letterSpacing: 3, color: "#f0b429", marginBottom: 14 }}>FRASE DE CIERRE</div>
              <blockquote style={{
                fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700,
                color: "#f1f5f9", margin: "0 0 18px", lineHeight: 1.5, fontStyle: "italic"
              }}>
                "Cancún en los noventa costaba lo que hoy cuesta un cuarto de hotel ahí.<br />
                Los Cabos hace 20 años era un rancho. Zona Diamante hoy<br />
                <span style={{ color: "#f0b429" }}>es lo que ellas eran antes de que todos lo supieran."</span>
              </blockquote>
              <p style={{ color: "#64748b", fontSize: 14, margin: "0 0 22px", lineHeight: 1.7 }}>
                La decisión no es si Acapulco Diamante va a crecer. Ya está creciendo.<br />
                La pregunta es: <strong style={{ color: "#f1f5f9" }}>¿vas a crecer con él, o vas a verlo crecer desde afuera?</strong>
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                {[
                  { label: "✅ Conviene si…", text: "Tienes flujo para la hipoteca y buscas construir patrimonio en 10+ años", color: "#34d399" },
                  { label: "⚠️ No conviene si…", text: "Necesitas el dinero en menos de 3 años o sin reserva de emergencia", color: "#fb7185" },
                  { label: "🎯 El momento ideal…", text: "Preventa — precio con descuento incorporado vs. mercado secundario", color: "#f0b429" },
                ].map((item, i) => (
                  <div key={i} style={{
                    background: `${item.color}10`, border: `1px solid ${item.color}30`,
                    borderRadius: 12, padding: "12px 18px", maxWidth: 220, textAlign: "left"
                  }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: item.color, marginBottom: 6 }}>{item.label}</div>
                    <div style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.5 }}>{item.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      <div style={{ textAlign: "center", padding: "20px", color: "#334155", fontSize: 11, borderTop: "1px solid #1e293b" }}>
        Análisis financiero ilustrativo · Proyecciones bajo supuestos declarados · No constituye asesoramiento vinculante
        {fetchStatus === "done" && <span style={{ marginLeft: 10, color: "#34d399" }}>⚡ CETES e inflación en tiempo real</span>}
      </div>
    </div>
  );
}
