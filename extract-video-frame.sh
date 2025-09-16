#!/bin/bash

# Script para extraer un frame del video cuando ffmpeg esté disponible
# Mientras tanto, vamos a crear una imagen optimizada en WebP

echo "Creando imagen optimizada para dispositivos móviles y bajos recursos..."

# Verificar si ffmpeg está disponible
if command -v ffmpeg &> /dev/null; then
    echo "FFmpeg detectado. Extrayendo frame del video..."
    ffmpeg -i "/Users/jaimedev/Desktop/Navs-app/public/Portada-1080.mp4" -ss 00:00:03 -vframes 1 -q:v 2 "/Users/jaimedev/Desktop/Navs-app/public/hero-frame.jpg"

    # Crear versión WebP optimizada
    ffmpeg -i "/Users/jaimedev/Desktop/Navs-app/public/hero-frame.jpg" -c:v libwebp -quality 80 "/Users/jaimedev/Desktop/Navs-app/public/hero-frame.webp"

    echo "✅ Frame extraído y optimizado creado"
else
    echo "⚠️  FFmpeg no disponible. Usando imagen placeholder."
    echo "Para obtener el frame real del video, instala ffmpeg y ejecuta este script nuevamente."
fi
