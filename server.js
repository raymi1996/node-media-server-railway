const NodeMediaServer = require('node-media-server');
const fs = require('fs');
const path = require('path');

// Ruta absoluta de la carpeta 'media'
const mediaRoot = path.join(__dirname, 'media');

// Crear la carpeta 'media' si no existe
if (!fs.existsSync(mediaRoot)) {
  fs.mkdirSync(mediaRoot, { recursive: true });
}

// Configuración del servidor
const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 60,
    ping_timeout: 30
  },
  http: {
    port: 8000,
    mediaroot: mediaRoot,
    allow_origin: '*'
  },
  trans: {
    ffmpeg: '/usr/bin/ffmpeg',
    tasks: [
      {
        app: 'live',
        vc: 'copy',
        ac: 'aac',
        hls: true,
        hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
        dash: false
      }
    ]
  }
};

// Inicializar y correr el servidor
const nms = new NodeMediaServer(config);
nms.run();
