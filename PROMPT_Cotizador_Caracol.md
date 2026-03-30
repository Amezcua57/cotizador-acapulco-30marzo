# PROMPT PARA GEMINI / CHATGPT
## Proyecto: Cotizador de Inversiones — Caracol Diamante

---

Eres un experto en desarrollo web (HTML, CSS, JavaScript). Voy a compartirte el código completo de un **Cotizador de Inversiones** que estoy construyendo para mi desarrollo inmobiliario llamado **Caracol Diamante** en Acapulco, México.

Tu trabajo es **ayudarme a seguir mejorando este archivo** sin romper lo que ya funciona. Lee todo el contexto antes de hacer cualquier cambio.

---

## ¿QUÉ ES ESTE ARCHIVO?

Es un archivo HTML de una sola página (sin servidor, sin base de datos) que compara 5 tipos de inversión para ayudar a mis clientes a decidir si les conviene comprar una propiedad en Caracol Diamante frente a otras opciones financieras.

---

## STACK TECNOLÓGICO

- **HTML + CSS + JavaScript puro** (sin frameworks)
- **Tailwind CSS** via CDN (para estilos)
- **Chart.js** via CDN (para gráficas)
- **Sin backend** — todo corre en el navegador del cliente

---

## LOS 5 ESCENARIOS QUE COMPARA

| Instrumento | Descripción |
|-------------|-------------|
| 🏛️ CETES | Tasa libre de riesgo en pesos |
| 📊 UDIs | Rendimiento real ligado a inflación |
| 🌎 S&P 500 | Bolsa americana en dólares |
| 💵 Dólar | Inversión en USD con rendimiento |
| 🏠 Casa Caracol | Propiedad + plusvalía + rentas (con efecto apalancamiento) |

> **IMPORTANTE — Efecto Apalancamiento:**
> En todos los instrumentos financieros (CETES, UDIs, etc.) el capital inicial es **el enganche** solamente. En Casa Caracol, el valor que se proyecta es **el precio total de la propiedad** ($3,000,000 MXN o el que ingrese el usuario). Esto hace que la comparación sea justa y muestre el verdadero poder del apalancamiento inmobiliario.

---

## PARÁMETROS CONFIGURABLES POR EL USUARIO

### Parámetros de la hipoteca
- Precio de la propiedad (con formato de miles)
- Enganche (%) — con slider y campo numérico sincronizados
- Tasa hipotecaria (%)
- Plazo hipotecario (años)
- Años de proyección

### Tasas de los instrumentos
- Tasa CETES (%)
- Tasa UDIs (%)
- Tasa S&P 500 (%)
- Tasa dólar (%)
- Devaluación esperada del peso (%)

### Parámetros inmobiliarios
- **Plusvalía anual (%) — default 8%, ajustable, recalcula al cambiar**
- Renta bruta anual (%)
- Gastos de operación (%)
- Tarifa por noche (para escenarios de Airbnb/renta vacacional)

### ISR (impuesto)
- **ISR (%) — aplica a TODOS los escenarios por igual, default 30%**
- **Recalcula automáticamente cuando cambia el porcentaje**
- Aplica tanto a rendimientos financieros como a ingresos por renta

---

## CARACTERÍSTICAS YA IMPLEMENTADAS

### 1. Comparativa año a año
- Tabla con saldo final de cada instrumento por año
- Resalta el ganador de cada año con color
- Muestra totales invertidos vs. valor final

### 2. Escenarios de renta
- **Sin rentas** (solo plusvalía)
- Conservador (30% ocupación)
- Moderado (40% ocupación)
- Optimista (60% ocupación)
- Muy optimista (80% ocupación)
- Cada escenario muestra: ingresos brutos, gastos operación, ISR, ingreso neto, % de rendimiento sobre el valor

### 3. Gráfica de proyección
- Líneas para cada instrumento a lo largo de los años
- Chart.js con colores diferenciados

### 4. Control de acceso por cliente
- Al inicio se pide un correo electrónico
- Solo el correo autorizado puede abrir el archivo
- Hay una fecha de expiración — después de esa fecha el archivo no se puede abrir
- Las variables están al inicio del código:
  ```javascript
  const CORREO_AUTORIZADO = "cliente@correo.com";
  const FECHA_EXPIRACION  = "2026-12-31";
  ```

### 5. Generador de cotizadores personalizados
- Archivo separado (`Generador_Cotizadores.html`) que permite crear versiones personalizadas para cada cliente sin tocar código
- Solo se ingresa nombre, correo y fecha de expiración, y descarga el archivo listo para mandar

---

## REGLAS IMPORTANTES PARA HACER CAMBIOS

1. **No romper el efecto apalancamiento** — Casa siempre proyecta el valor completo de la propiedad, no solo el enganche.
2. **ISR y Plusvalía deben recalcular al instante** — Ya tienen `oninput="calculate()"` explícito.
3. **Todo en un solo archivo HTML** — Sin archivos CSS o JS separados.
4. **Tailwind solo con clases base** — No usar compilador, solo CDN.
5. **El archivo debe poder abrirse con doble clic** — Sin servidor local, sin npm.
6. **El diseño es para ventas** — Debe verse profesional, moderno y atractivo. Colores institucionales: azul marino, dorado y blanco.
7. **Idioma: español** — Todos los textos en español de México.
8. **El código está en** `cotizador.html` en la carpeta `caracol cotizador 2` del escritorio.

---

## CÓMO USAR ESTE PROMPT

1. Copia este texto
2. Pega el código completo del archivo `cotizador.html` después de este mensaje
3. Dile a la IA exactamente qué quieres mejorar o agregar

**Ejemplo:**
> "Aquí está el contexto y el código. Quiero que la sección del ganador muestre también qué tan mejor le fue a Casa vs. el segundo lugar en porcentaje."

---

## PENDIENTES / IDEAS DE MEJORA (opcionales)

- [ ] Subir el archivo a GitHub Pages para compartirlo por link (sin mandar archivo adjunto)
- [ ] Mejorar el diseño visual — más atractivo para presentaciones de ventas
- [ ] Agregar comparativa de "¿qué pasa si no compro y solo rento y esa renta la invierto?"
- [ ] Resumen ejecutivo de 1 página imprimible (PDF)
- [ ] Versión en inglés para clientes extranjeros

---

*Archivo creado el 28 de marzo de 2026 para Caracol Diamante, Acapulco.*
