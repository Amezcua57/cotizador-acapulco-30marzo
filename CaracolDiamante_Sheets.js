/**
 * CaracolDiamante_Sheets.js
 * CRM conectado a Google Sheets — tiempo real
 * Google Sheet ID: 1XLGbvcN8TB7hc-XOFsSPC0HmyMB4v4W4OE0SecrB9Mw
 *
 * INSTRUCCIONES:
 * 1. Abrir Google Sheets (el mismo del CRM)
 * 2. Extensions → Apps Script → NUEVO SCRIPT
 * 3. Pegar este código
 * 4. Publicar como Web App (anon access)
 * 5. Pegar URL en crm_caracol.html (variable SHEET_WEBHOOK_URL)
 */

var SHEET_ID   = '1XLGbvcN8TB7hc-XOFsSPC0HmyMB4v4W4OE0SecrB9Mw';
var HOJA_LEADS = 'CRM_Leads';
var HOJA_LOG   = 'Llamadas_Log';

// ═══ GET — leer leads desde CRM ═══
function doGet(e) {
  var accion = e.parameter.accion || 'listar';
  var headers = {'Access-Control-Allow-Origin':'*'};

  if (accion === 'listar') {
    var leads = obtenerLeads_();
    return respuesta_(leads, headers);
  }
  if (accion === 'buscar') {
    var q = e.parameter.q || '';
    var todos = obtenerLeads_();
    var filtrado = todos.filter(function(l){
      return JSON.stringify(l).toLowerCase().indexOf(q.toLowerCase()) > -1;
    });
    return respuesta_(filtrado, headers);
  }
  return respuesta_({error:'Acción no reconocida'}, headers);
}

// ═══ POST — crear/actualizar lead ═══
function doPost(e) {
  try {
    var data   = JSON.parse(e.postData.contents);
    var accion = data.accion || 'crear';

    if (accion === 'crear')      return respuesta_(crearLead_(data));
    if (accion === 'actualizar') return respuesta_(actualizarLead_(data));
    if (accion === 'log_llamada')return respuesta_(logLlamada_(data));
    if (accion === 'eliminar')   return respuesta_(eliminarLead_(data.id));

    return respuesta_({error:'Acción no reconocida'});
  } catch(err) {
    return respuesta_({error:err.message});
  }
}

// ═══ OBTENER TODOS LOS LEADS ═══
function obtenerLeads_() {
  var ss   = SpreadsheetApp.openById(SHEET_ID);
  var hoja = ss.getSheetByName(HOJA_LEADS);
  if (!hoja || hoja.getLastRow() < 2) return [];

  var datos = hoja.getDataRange().getValues();
  var keys  = datos[0];
  var leads = [];

  for (var i = 1; i < datos.length; i++) {
    var obj = {};
    keys.forEach(function(k, idx) { obj[k] = datos[i][idx]; });
    if (obj.id) leads.push(obj);
  }
  return leads;
}

// ═══ CREAR LEAD ═══
function crearLead_(data) {
  var ss   = SpreadsheetApp.openById(SHEET_ID);
  var hoja = ss.getSheetByName(HOJA_LEADS) || crearHojaLeads_(ss);

  var id = 'C' + Date.now().toString().substr(-6);
  var fila = [
    id,
    new Date(),
    data.nombre    || '',
    data.telefono1 || data.whatsapp || '',
    data.telefono2 || '',
    data.telefono3 || '',
    data.email     || '',
    data.fuente    || 'manual',
    'Nuevo',        // estado
    data.perfil    || '',
    data.notas     || '',
    '',  // ultimaLlamada
    0    // numLlamadas
  ];
  hoja.appendRow(fila);
  return {ok:true, id:id};
}

// ═══ ACTUALIZAR LEAD ═══
function actualizarLead_(data) {
  var ss   = SpreadsheetApp.openById(SHEET_ID);
  var hoja = ss.getSheetByName(HOJA_LEADS);
  if (!hoja) return {ok:false, error:'Hoja no encontrada'};

  var datos = hoja.getDataRange().getValues();
  var keys  = datos[0];

  for (var i = 1; i < datos.length; i++) {
    if (datos[i][0] == data.id) {
      Object.keys(data).forEach(function(k) {
        var col = keys.indexOf(k);
        if (col > -1) hoja.getRange(i+1, col+1).setValue(data[k]);
      });
      return {ok:true};
    }
  }
  return {ok:false, error:'Lead no encontrado'};
}

// ═══ LOG DE LLAMADA ═══
function logLlamada_(data) {
  var ss   = SpreadsheetApp.openById(SHEET_ID);
  var hoja = ss.getSheetByName(HOJA_LOG) || crearHojaLog_(ss);

  hoja.appendRow([
    new Date(),
    data.leadId   || '',
    data.nombre   || '',
    data.telefono || '',
    data.resultado|| '',
    data.nota     || '',
    data.duracion || ''
  ]);

  // Actualizar último contacto en hoja de leads
  actualizarLead_({id:data.leadId, ultimaLlamada:new Date(), estado:data.estado || 'Contactado'});
  return {ok:true};
}

// ═══ ELIMINAR LEAD (soft delete) ═══
function eliminarLead_(id) {
  return actualizarLead_({id:id, estado:'Eliminado'});
}

// ═══ CREAR HOJA LEADS ═══
function crearHojaLeads_(ss) {
  var h = ss.insertSheet(HOJA_LEADS);
  var encabezados = ['id','fechaCreacion','nombre','telefono1','telefono2','telefono3',
                     'email','fuente','estado','perfil','notas','ultimaLlamada','numLlamadas'];
  h.appendRow(encabezados);
  h.getRange(1,1,1,encabezados.length)
   .setFontWeight('bold').setBackground('#0a1628').setFontColor('#e8c96a');
  return h;
}

// ═══ CREAR HOJA LOG ═══
function crearHojaLog_(ss) {
  var h = ss.insertSheet(HOJA_LOG);
  var enc = ['fecha','leadId','nombre','telefono','resultado','nota','duracion'];
  h.appendRow(enc);
  h.getRange(1,1,1,enc.length)
   .setFontWeight('bold').setBackground('#0d1f3c').setFontColor('#e8c96a');
  return h;
}

// ═══ HELPER RESPUESTA ═══
function respuesta_(data, extraHeaders) {
  var out = ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
  return out;
}

// ═══ SETUP HOJAS ═══
function setupHojas() {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  crearHojaLeads_(ss);
  crearHojaLog_(ss);
  Logger.log('✅ Hojas CRM creadas en Google Sheets.');
  Browser.msgBox('✅ Hojas creadas.\nAhora publica este script como Web App y pega la URL en crm_caracol.html');
}
