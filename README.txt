SERVIOFICIOS Y SUMINISTROS SAS — LANDING LÍNEA AMBIENTAL

Stack: HTML5 + CSS3 + JavaScript vanilla.
No framework. No build. No dependencias externas.

Archivos:
- index.html
- styles.css
- script.js
- assets/*.jpg y assets/*.webp (5 fotos, cada una en ambos formatos)
- assets/logo-principal.png / .webp y assets/logo-slogan.png / .webp
- assets/originales/ (copia de las fotos sin comprimir: se puede borrar cuando se valide el sitio)

Interacciones incluidas:
- navegación móvil
- tabs para Jardinería / Poda y tala / Material vegetal
- formulario de cotización con envío por WhatsApp (ver más abajo)
- animaciones de entrada con IntersectionObserver

SEO local:
- datos estructurados JSON-LD tipo LocalBusiness en el <head> de index.html
  (razón social, nombre comercial, NIT, matrícula, dirección, teléfonos, correo y catálogo de servicios)
- Open Graph y Twitter Card activos para el título y la descripción
- pendiente al publicar con dominio propio: completar "url" e "image" (JSON-LD) y descomentar og:image,
  og:url y twitter:image con URLs absolutas, además de "geo" con las coordenadas exactas del predio
- pendiente: imagen de vista previa 1200x630 para og:image

WhatsApp (canal principal de cotización):
- todos los CTA "Solicitar cotización" abren WhatsApp con mensaje predefinido según el contexto
- cada pestaña de servicio y cada tarjeta de material vegetal (maderables, frutales, ornamentales)
  abren WhatsApp con su propio mensaje: el servicio ya va descrito y el texto termina con
  "... está en: " para que el visitante solo complete el lugar (antes tenía que reescribir todo)
- los CTA genéricos (menú, hero, flotante, tarjeta de contacto) terminan con "El servicio que necesito es: "
- filas de contacto clicables (WhatsApp, celular, teléfono, correo)
- botón flotante de WhatsApp en todas las secciones
- el número se cambia en una sola línea: WHATSAPP_NUMBER en script.js
  (los href en index.html son respaldo si el visitante tiene JS desactivado)

Formulario de cotización (sección #contacto):
- campos: nombre, teléfono, servicio (select), municipio y detalle del proyecto
- el municipio es un input con datalist que sugiere los 26 municipios de Sucre
  (el visitante también puede escribir otro)
- validación en el navegador: nombre/municipio de 3+ caracteres, teléfono colombiano de 10 dígitos
  (o 12 con indicativo 57), servicio seleccionado, detalle de 5+ caracteres y checkbox marcado;
  los errores se muestran bajo cada campo y el foco salta al primer campo inválido
- checkbox OBLIGATORIO de autorización de tratamiento de datos personales (Ley 1581 de 2012):
  sin marcarlo no se envía la solicitud; el texto incluye al responsable
  (SERVIOFICIOS Y SUMINISTROS S.A.S. / OFILABS SAS) y los derechos ARCO
  (acceso, actualización, rectificación y supresión) con el correo de contacto
- al enviar, arma el mensaje estructurado (nombre, teléfono, servicio, municipio, detalle) y abre
  WhatsApp con el texto pre-rellenado; si el navegador bloquea la ventana emergente queda un
  enlace de respaldo dentro de la confirmación
- sin backend: el envío es por WhatsApp, igual que el resto del sitio
- el mensaje del formulario se cambia en script.js (dentro del submit del quote-form)

Imágenes:
- las 5 fotos y los 2 logos se sirven como WebP con respaldo (JPG / PNG) mediante <picture>
- cada foto existe en 3 anchos: -640, -960 y -1200, en WebP y en JPG (30 archivos)
  y se eligen con srcset + sizes; los logos son solo 512 px
- ojo: los espacios en los nombres de archivo van codificados como %20 en srcset
  (srcset NO admite espacios sin codificar: el espacio es el separador de la URL y el descriptor)
- todas llevan width/height reales para evitar saltos de diseño; las de secciones usan loading="lazy"
  y la del hero fetchpriority="high"
- logos: 512 px (se muestran a 188-190 px); los originales eran RGB sin transparencia,
  por eso se pueden pasar a paleta sin perder nada
- peso de imágenes: 5.09 MB de originales -> 401 KB si el navegador usa 640 px,
  817 KB con 960 px y 1.20 MB con 1200 px (antes se descargaba siempre el juego de 1200 px)
- para recomprimir despues de cambiar una imagen (sharp-cli se ejecuta con npx, no queda instalado):
  npx --yes sharp-cli -i "assets/originales/*.jpg" -o .tmp-640 -f webp -q 72 --effort 5 --autoOrient resize 640
  npx --yes sharp-cli -i "assets/originales/*.jpg" -o .tmp-960 -f webp -q 72 --effort 5 --autoOrient resize 960
  npx --yes sharp-cli -i "assets/originales/*.jpg" -o .tmp-640 -f jpeg -q 80 --autoOrient resize 640
  npx --yes sharp-cli -i "assets/originales/*.jpg" -o .tmp-960 -f jpeg -q 80 --autoOrient resize 960
  npx --yes sharp-cli -i "assets/originales/*.jpg" -o .tmp-1200 -f webp -q 72 --effort 5 --autoOrient
  npx --yes sharp-cli -i "assets/originales/*.jpg" -o .tmp-1200 -f jpeg -q 80 --autoOrient
  npx --yes sharp-cli -i "assets/originales/logo-*.png" -o .tmp -f webp -q 82 resize 512
  npx --yes sharp-cli -i "assets/originales/logo-*.png" -o .tmp -f png --palette resize 512
  y luego mover los archivos generados a assets/ con el sufijo -640 / -960 / -1200

Accesibilidad y contraste (mínimo AA = 4.5:1 en texto normal):
- verde de acción de los botones: #0E7A45 (5.40:1) - hover #0B6B3A (6.61:1)
- numeros de las tarjetas: --sf-green-ink #4A7A16 (5.14:1, antes 2.18:1 con --sf-green)
- numeros de "por qué elegirnos": --sf-blue-ink #1F5FA8 (5.88:1, antes 2.37:1 con --sf-blue)
- teléfonos, correo y dirección de la tarjeta de contacto: 1rem (16 px)
- las imágenes tienen alt descriptivo con la palabra clave del servicio
- los anclajes usan scroll-padding/scroll-margin para no quedar bajo el header fijo

Datos de la empresa (fuente oficial):
- Razón social: SERVIOFICIOS Y SUMINISTROS S.A.S. (nombre comercial: OFILABS SAS)
- NIT: 901021615-8
- Matrícula No. 94175 - Cámara de Comercio de Sincelejo
- Dirección: CL 27 15A 07 Barrio Santa Fe, Sincelejo, Sucre
- Correo: servioficiosysuministros@gmail.com
- Teléfonos: 320 759 2276 / 310 450 3276 (celulares) - (605) 271 5053 (fijo)

Contenido basado en el portafolio de la Línea Ambiental suministrado por el usuario.
