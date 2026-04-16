/**
 * CaracolDiamante_AppsScript.js
 * Sistema de emails automáticos — Caracol Diamante
 * Sale desde: karinarbataz@gmail.com
 * Copia automática a: amezcuaizquierdo@gmail.com
 *
 * INSTRUCCIONES DE INSTALACIÓN:
 * 1. Abrir Google Sheets → Extensions → Apps Script
 * 2. Pegar este código completo
 * 3. Ejecutar setupInicial() UNA vez (pedirá permisos)
 * 4. Publicar como Web App: Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copiar la URL del Web App y pegarla en el CRM (crm_caracol.html)
 */

// ═══ CONFIGURACIÓN ═══
var CONFIG = {
  SHEET_ID: '1XLGbvcN8TB7hc-XOFsSPC0HmyMB4v4W4OE0SecrB9Mw',
  HOJA_LEADS: 'Leads',
  HOJA_LOG:   'EmailLog',
  EMAIL_FROM: 'karinarbataz@gmail.com',
  EMAIL_CC:   'amezcuaizquierdo@gmail.com',
  COTIZADOR_URL: 'https://amezcua57.github.io/cotizador/',
  EBOOK_URL:     'https://amezcua57.github.io/cotizador/ebook_caracol_diamante_v2.html',
  AGENDA_URL:    'https://wa.me/527441752143?text=Hola%20Karina%2C%20quiero%20agendar%20mi%20sesión%20de%20evaluación', // ← REEMPLAZAR con link real de Karina
  WA_KARINA:     'https://wa.me/527441752143',
  DIAS_EMAILS:   [0, 3, 10, 21, 45]
};

// ═══ RECIBIR LEAD DESDE LANDING (Web App POST) ═══
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var nombre   = data.nombre   || '';
    var whatsapp = data.whatsapp || '';
    var fuente   = data.fuente   || 'landing';
    var email    = data.email    || '';

    if (!nombre || !whatsapp) {
      return ContentService.createTextOutput(JSON.stringify({ok:false, error:'Datos incompletos'}))
        .setMimeType(ContentService.MimeType.JSON);
    }

    registrarLead_(nombre, whatsapp, email, fuente);
    enviarEmailDia0_(nombre, whatsapp, email);

    return ContentService.createTextOutput(JSON.stringify({ok:true}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({ok:false, error:err.message}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ═══ REGISTRO EN GOOGLE SHEETS ═══
function registrarLead_(nombre, whatsapp, email, fuente) {
  var ss    = SpreadsheetApp.openById(CONFIG.SHEET_ID);
  var hoja  = ss.getSheetByName(CONFIG.HOJA_LEADS) || ss.insertSheet(CONFIG.HOJA_LEADS);

  // Crear encabezados si la hoja está vacía
  if (hoja.getLastRow() === 0) {
    hoja.appendRow(['ID','Fecha','Nombre','WhatsApp','Email','Fuente','Estado',
                    'Email0','Email3','Email10','Email21','Email45','Notas']);
  }

  var id = Utilities.getUuid().substr(0,8).toUpperCase();
  hoja.appendRow([id, new Date(), nombre, whatsapp, email, fuente, 'Nuevo',
                  '','','','','','']);
  return id;
}

// ═══ EMAIL DÍA 0 — Bienvenida inmediata ═══
function enviarEmailDia0_(nombre, whatsapp, email) {
  var subject = '✅ ' + nombre + ', aquí está tu e-book y cotizador';
  var body = construirEmail_(nombre, 0, whatsapp);
  enviar_(email || CONFIG.EMAIL_FROM, subject, body, nombre);
  registrarEmailLog_(nombre, whatsapp, 0);
}

// ═══ TRIGGER DIARIO — Envía emails de seguimiento ═══
function triggerDiario() {
  var ss   = SpreadsheetApp.openById(CONFIG.SHEET_ID);
  var hoja = ss.getSheetByName(CONFIG.HOJA_LEADS);
  if (!hoja) return;

  var datos = hoja.getDataRange().getValues();
  var hoy   = new Date();
  var cols  = {email0:7, email3:8, email10:9, email21:10, email45:11};
  var dias  = [0, 3, 10, 21, 45];

  for (var i = 1; i < datos.length; i++) {
    var fila        = datos[i];
    var nombre      = fila[2];
    var whatsapp    = fila[3];
    var email       = fila[4];
    var estado      = fila[6];
    var fechaLead   = new Date(fila[1]);
    var diasDesde   = Math.floor((hoy - fechaLead) / 86400000);

    if (estado === 'Descartado') continue;

    dias.forEach(function(d, idx) {
      var col = cols['email' + d];
      if (diasDesde >= d && !fila[col]) {
        var subject = asuntos_[d].replace('{nombre}', nombre);
        var body    = construirEmail_(nombre, d, whatsapp);
        enviar_(email, subject, body, nombre);
        hoja.getRange(i+1, col+1).setValue(new Date());
        registrarEmailLog_(nombre, whatsapp, d);
        Utilities.sleep(1000);
      }
    });
  }
}

// ═══ ASUNTOS DE EMAILS ═══
var asuntos_ = {
  0:  '✅ {nombre}, aquí está tu e-book y cotizador',
  3:  '📸 {nombre} — así avanza la obra en Zona Diamante',
  10: '🧮 {nombre} — ¿cuántas noches pagarían tu mensualidad?',
  21: '⏳ {nombre} — quedan pocas unidades disponibles',
  45: '🌊 {nombre} — ¿sigues evaluando la propiedad de playa?'
};

// ═══ CONTENIDO DE CADA EMAIL ═══
function construirEmail_(nombre, dia, whatsapp) {
  var primerNombre = nombre.split(' ')[0];
  var contenidos = {
    0: '<p>Hola <strong>' + primerNombre + '</strong>, gracias por tu interés.</p>' +
       '<p>Aquí te dejamos dos recursos que van a ayudarte a evaluar la oportunidad:</p>' +
       '<ul>' +
       '<li><a href="' + CONFIG.EBOOK_URL + '">📖 E-book: 19 puntos para evaluar una inversión en playa</a></li>' +
       '<li><a href="' + CONFIG.COTIZADOR_URL + '">📊 Cotizador personalizado</a></li>' +
       '</ul>' +
       '<p>En 25 minutos podemos mostrarte cómo los números aplican para <em>tu</em> caso específico.</p>' +
       '<p><a href="' + CONFIG.AGENDA_URL + '" style="background:#c9a84c;color:#0a1628;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block;margin-top:8px;">AGENDAR SESIÓN GRATUITA →</a></p>',

    3: '<p>Hola <strong>' + primerNombre + '</strong>, ¿cómo estás?</p>' +
       '<p>La obra en Zona Diamante avanza según el calendario. El terreno está libre de deuda y el constructor, Grupo Altozano, tiene más de 250 unidades entregadas.</p>' +
       '<p>Si tienes preguntas sobre la ubicación, el proceso legal o cualquier detalle técnico, estamos disponibles. Solo contesta este email o escríbenos por WhatsApp.</p>' +
       '<p><a href="' + CONFIG.WA_KARINA + '">📲 WhatsApp Karina</a></p>',

    10: '<p>Hola <strong>' + primerNombre + '</strong>.</p>' +
        '<p>Una pregunta simple: <strong>¿cuántas noches de renta necesitarías para cubrir la mensualidad de tu unidad?</strong></p>' +
        '<p>La respuesta, según los estimados actuales del mercado, es aproximadamente <strong>14 noches al mes</strong>.</p>' +
        '<p>Eso es menos de la mitad del mes. Las otras 16 noches son tuyas — o siguen generando ingreso.</p>' +
        '<p>¿Quieres que hagamos el cálculo con tu presupuesto real en una sesión de 25 minutos?</p>' +
        '<p><a href="' + CONFIG.COTIZADOR_URL + '">Ver cotizador en línea →</a></p>',

    21: '<p>Hola <strong>' + primerNombre + '</strong>, espero que estés bien.</p>' +
        '<p>Solo quería avisarte que el proyecto ya tiene 21 familias confirmadas. No es para presionarte — es información real que probablemente querrías saber.</p>' +
        '<p>La disponibilidad es limitada por diseño: 51 unidades en total, boutique, sin expansión posible.</p>' +
        '<p>Si ya tomaste tu decisión o definitivamente no es el momento, con mucho gusto te lo retiramos de nuestra lista. Solo dinos.</p>' +
        '<p>Si sigues evaluando, te agendamos esta semana:</p>' +
        '<p><a href="' + CONFIG.AGENDA_URL + '" style="background:#c9a84c;color:#0a1628;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block;margin-top:8px;">AGENDAR SESIÓN →</a></p>',

    45: '<p>Hola <strong>' + primerNombre + '</strong>.</p>' +
        '<p>Hace unas semanas platicaste con nosotros sobre la posibilidad de tener un depto en la mejor zona del Pacífico mexicano.</p>' +
        '<p>Quizás el momento no era el correcto. Quizás sigues evaluando. De cualquier manera, aquí seguimos.</p>' +
        '<p>Si en algún momento quieres retomar la conversación, la sesión de 25 minutos sigue disponible — sin costo, sin compromiso de compra.</p>' +
        '<p><a href="' + CONFIG.WA_KARINA + '">📲 Escribir a Karina</a></p>' +
        '<p style="color:#999;font-size:12px;">Si no quieres recibir más emails de nuestra parte, responde este mensaje con la palabra STOP.</p>'
  };
  return plantillaEmail_(primerNombre, contenidos[dia]);
}

// ═══ PLANTILLA HTML BASE ═══
function plantillaEmail_(nombre, contenido) {
  return '<html><body style="font-family:\'Nunito\',Arial,sans-serif;background:#f4f4f4;padding:20px;">' +
    '<div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;">' +
    '<div style="background:#0a1628;padding:24px 32px;text-align:center;">' +
    '<h1 style="color:#e8c96a;font-size:24px;margin:0;">Caracol Diamante</h1>' +
    '<p style="color:rgba(255,255,255,0.5);font-size:12px;margin:4px 0 0;letter-spacing:2px;">ZONA DIAMANTE · ACAPULCO</p>' +
    '</div>' +
    '<div style="padding:32px;color:#333;line-height:1.7;font-size:15px;">' +
    contenido +
    '</div>' +
    '<div style="background:#f8f4ec;padding:20px 32px;border-top:1px solid #e8e0d0;">' +
    '<p style="font-size:12px;color:#999;margin:0;">Karina Rodríguez · Asesora · <a href="' + CONFIG.WA_KARINA + '" style="color:#c9a84c;">WhatsApp</a> · Caracol Diamante<br>' +
    'Boulevard de las Naciones, Lote 49 · Zona Diamante, Acapulco, Guerrero</p>' +
    '</div>' +
    '</div></body></html>';
}

// ═══ ENVIAR EMAIL ═══
function enviar_(emailTo, subject, htmlBody, nombre) {
  try {
    // Si no hay email, enviar notificación interna
    var destino = emailTo && emailTo.indexOf('@') > -1 ? emailTo : CONFIG.EMAIL_CC;
    GmailApp.sendEmail(destino, subject, '', {
      htmlBody: htmlBody,
      cc: CONFIG.EMAIL_CC !== destino ? CONFIG.EMAIL_CC : '',
      name: 'Karina Rodríguez · Caracol Diamante'
    });
  } catch(err) {
    Logger.log('Error enviando a ' + emailTo + ': ' + err.message);
  }
}

// ═══ LOG DE EMAILS ═══
function registrarEmailLog_(nombre, whatsapp, dia) {
  var ss   = SpreadsheetApp.openById(CONFIG.SHEET_ID);
  var hoja = ss.getSheetByName(CONFIG.HOJA_LOG) || ss.insertSheet(CONFIG.HOJA_LOG);
  if (hoja.getLastRow() === 0) {
    hoja.appendRow(['Fecha','Nombre','WhatsApp','Día','Estado']);
  }
  hoja.appendRow([new Date(), nombre, whatsapp, 'Día ' + dia, 'Enviado']);
}

// ═══ SETUP INICIAL — ejecutar UNA vez ═══
function setupInicial() {
  // Crear trigger diario
  var triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(function(t) { ScriptApp.deleteTrigger(t); });

  ScriptApp.newTrigger('triggerDiario')
    .timeBased()
    .everyDays(1)
    .atHour(9)
    .create();

  // Crear hojas si no existen
  var ss = SpreadsheetApp.openById(CONFIG.SHEET_ID);
  if (!ss.getSheetByName(CONFIG.HOJA_LEADS)) {
    var h = ss.insertSheet(CONFIG.HOJA_LEADS);
    h.appendRow(['ID','Fecha','Nombre','WhatsApp','Email','Fuente','Estado',
                 'Email0','Email3','Email10','Email21','Email45','Notas']);
    h.getRange(1,1,1,13).setFontWeight('bold').setBackground('#0a1628').setFontColor('#e8c96a');
  }
  if (!ss.getSheetByName(CONFIG.HOJA_LOG)) {
    var hl = ss.insertSheet(CONFIG.HOJA_LOG);
    hl.appendRow(['Fecha','Nombre','WhatsApp','Día','Estado']);
    hl.getRange(1,1,1,5).setFontWeight('bold').setBackground('#0a1628').setFontColor('#e8c96a');
  }

  Logger.log('✅ Setup inicial completado. Trigger diario a las 9:00 AM activado.');
  Browser.msgBox('✅ Setup completado. Emails automáticos activados.\n\nAhora publica el script como Web App y pega la URL en el CRM.');
}
