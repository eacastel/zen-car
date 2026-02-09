# Analytics & Conversion Tracking Documentation

This file documents the current analytics, advertising and event tracking implementation for Zen Car Buying, including Google Ads, GA4, Meta (Facebook) Pixel + CAPI and Calendly integration.

---

## ✅ Google Tag Manager (GTM)

### Tags:

* **Google Tag – GA4 (with traffic\_type)** – Fires on all pages
* **Google Ads – Purchase Success** – Fires on `/success` after Stripe payment
* **Google Ads – Calendly Booked** – Fires on `calendly.event_scheduled`
* **GA4 Event – Purchase Success (checkout\_success)**
* **GA4 Event – Calendly Booked (calendly\_booked)**
* **Microsoft Clarity** – Custom HTML tag

### Variables:

* `DL - value` → `value` from DataLayer (purchase amount)
* `DL - currency` → `currency` from DataLayer (e.g. USD)
* `DL - transaction_id` → Stripe payment intent ID
* `DL - calendly_url` → URL passed from Calendly event

---

## ✅ Meta (Facebook) Conversions API (CAPI)

**Server-side Netlify function:** `/.netlify/functions/meta-capi`

### Fired on:

* **checkout\_success** (Stripe success page)
* **calendly\_booked** (Calendly booking via GTM)

### Tracked fields:

* Event Name: `Purchase` or `Lead`
* Event ID: `stripe_${intentId}` or `calendly_${timestamp}`
* Email, first name, last name → Hashed via SHA256

### Notes:

* Uses `TEST98035` for test events
* Production traffic sends hashed `em`, `fn`, `ln`

---

## ✅ Calendly Integration

### Triggered by:

* `message` event `calendly.event_scheduled` in browser

### Data pushed to DataLayer:

```js
window.dataLayer.push({
  event: "calendly_booked",
  calendly_url: event.data.payload.event.uri,
});
```

### Tracked by:

* GA4 Event: `calendly_booked`
* Google Ads Conversion: `Google Ads - Calendly Booked`
* Meta CAPI: `Lead`

---

## ✅ Google Analytics 4 (GA4)

### Custom Events:

* `checkout_success` (parameters: value, currency, transaction\_id)
* `calendly_booked` (parameters: calendly\_url)

### Debugging:

* Use GA4 DebugView (in GA4 Admin)
* Use GTM Preview mode to confirm event parameter passing

### Marked as Conversions:

* [ ] checkout\_success
* [ ] calendly\_booked

*(Mark manually in GA4 → Admin → Events or Conversions)*

---

## 🔧 Testing Scripts

### Fire `checkout_success` manually (console):

```js
window.dataLayer.push({
  event: "checkout_success",
  value: 100,
  currency: "USD",
  transaction_id: "test_intent_123"
});
```

### Fire `calendly_booked` manually (console):

```js
window.dataLayer.push({
  event: "calendly_booked",
  calendly_url: "https://calendly.com/zen-booking/test-session"
});
```

---

## TODO / Improvements

* [ ] Create a standalone public-facing docs page
* [ ] Include screenshots of GTM tag setups
* [ ] Confirm all custom GA4 events are marked as conversions



{
  "LegalV2": {
    "Navigation": {
      "footerLinks": {
        "legalNotice": "Aviso Legal",
        "privacy": "Privacidad",
        "cookies": "Cookies",
        "terms": "Términos de Uso",
        "dpa": "Anexo de Tratamiento de Datos (DPA)"
      }
    },
    "Legal": {
      "legalNotice": {
        "title": "Aviso Legal",
        "lastUpdated": "Última actualización: {date}",
        "intro": "Este Aviso Legal regula el acceso y uso del sitio web y del servicio disponible en aliigo.com (el “Sitio Web”).",
        "section1": {
          "title": "1. Titular y datos de contacto",
          "content": "Titular: Emilio Castellanos Abis (que opera bajo el nombre comercial “Aliigo”).\nNIF: 55448913F.\nDomicilio: C/ de Dalt, 37 · Bajo derecha, Ciutat Vella · 46003 València (España).\nEmail: legal@aliigo.com."
        },
        "section2": {
          "title": "2. Objeto",
          "content": "El Sitio Web ofrece información sobre Aliigo y permite el acceso a una plataforma SaaS para configurar e integrar un asistente web."
        },
        "section3": {
          "title": "3. Condiciones de uso",
          "content": "Al navegar o utilizar el Sitio Web, te comprometes a usarlo de forma lícita y a no realizar actividades que puedan dañar, inutilizar, sobrecargar o deteriorar el Sitio Web o impedir su normal utilización por otros usuarios."
        },
        "section4": {
          "title": "4. Propiedad intelectual e industrial",
          "content": "Todos los contenidos, diseños, software y marcas del Sitio Web son titularidad de Aliigo o de sus licenciantes y están protegidos por la normativa aplicable. No podrás reproducirlos, distribuirlos o modificarlos sin autorización previa y por escrito, salvo en los casos permitidos por la ley."
        },
        "section5": {
          "title": "5. Enlaces a terceros",
          "content": "El Sitio Web puede contener enlaces a sitios de terceros. Aliigo no se responsabiliza de los contenidos, políticas o prácticas de dichos terceros."
        },
        "section6": {
          "title": "6. Exención de responsabilidad",
          "content": "El Sitio Web se ofrece “tal cual” y “según disponibilidad”. Aliigo no garantiza disponibilidad ininterrumpida ni ausencia de errores. Nada de lo aquí dispuesto limita responsabilidades que no puedan limitarse conforme a la normativa aplicable."
        },
        "section7": {
          "title": "7. Legislación aplicable y jurisdicción",
          "content": "Este Aviso Legal se rige por la legislación española. Para cualquier controversia, las partes se someten a los juzgados y tribunales de València (España), salvo norma imperativa en contrario."
        }
      },
      "privacy": {
        "title": "Política de Privacidad",
        "lastUpdated": "Última actualización: {date}",
        "intro": "Esta Política de Privacidad explica cómo Aliigo recoge y utiliza datos personales cuando visitas nuestro Sitio Web o utilizas el servicio. También aclara los roles RGPD cuando tratamos datos por cuenta de nuestros clientes.",
        "section1": {
          "title": "1. Responsable del tratamiento",
          "content": "Responsable: Emilio Castellanos Abis (Aliigo).\nDomicilio: C/ de Dalt, 37 · Bajo derecha, Ciutat Vella · 46003 València (España).\nEmail: legal@aliigo.com."
        },
        "section2": {
          "title": "2. Nuestros roles (Responsable vs Encargado)",
          "content": "Datos del Sitio Web y de cuenta: Aliigo actúa como Responsable respecto a los datos personales de visitantes del Sitio Web y usuarios con cuenta.\nDatos de chats de usuarios finales de clientes: cuando un cliente integra Aliigo en su web, Aliigo actúa normalmente como Encargado del tratamiento respecto a los datos personales contenidos en chats y leads, por cuenta del cliente. Consulta el Anexo de Tratamiento de Datos (DPA) para más información."
        },
        "section3": {
          "title": "3. Datos personales que podemos tratar",
          "content": "Según tu interacción con Aliigo, podemos tratar:\n- Datos de cuenta: nombre, email, nombre de negocio y teléfono/web (opcionales).\n- Datos de facturación: estado de suscripción y facturas; los datos de pago los gestiona el proveedor de pagos.\n- Datos de uso del servicio: ajustes de configuración, dominios permitidos, metadatos de mensajes y registros necesarios para seguridad y soporte.\n- Datos de chat: mensajes y datos de contacto que el visitante envíe mediante el widget (como Encargado cuando aplique).\n- Datos de dispositivo y cookies: IP, identificadores de navegador y preferencias de cookies (ver Política de Cookies)."
        },
        "section4": {
          "title": "4. Finalidades y bases jurídicas",
          "content": "Tratamos datos personales para:\n- Prestar el servicio y ejecutar el contrato (art. 6.1.b RGPD).\n- Operar, proteger y mejorar el Sitio Web y el servicio (interés legítimo, art. 6.1.f RGPD).\n- Proporcionar soporte y comunicaciones de servicio (contrato y/o interés legítimo).\n- Gestionar facturación y pagos (contrato; obligaciones legales cuando corresponda).\n- Enviar comunicaciones comerciales opcionales cuando exista consentimiento (art. 6.1.a RGPD)."
        },
        "section5": {
          "title": "5. Destinatarios",
          "content": "Podemos compartir datos con proveedores de confianza (encargados) estrictamente necesarios para prestar el servicio (por ejemplo, hosting, base de datos, envío de emails, analítica si está habilitada y pagos). No vendemos datos personales."
        },
        "section6": {
          "title": "6. Transferencias internacionales",
          "content": "Si utilizamos proveedores ubicados fuera del Espacio Económico Europeo, aplicaremos las garantías adecuadas, como Cláusulas Contractuales Tipo u otros mecanismos de transferencia permitidos por el RGPD."
        },
        "section7": {
          "title": "7. Conservación",
          "content": "Conservamos los datos personales únicamente durante el tiempo necesario para las finalidades descritas, incluyendo la prestación del servicio, el cumplimiento de obligaciones legales, la resolución de disputas y la ejecución de acuerdos. El tratamiento de contenidos de clientes como Encargado se gestiona conforme al DPA y a la normativa aplicable."
        },
        "section8": {
          "title": "8. Seguridad",
          "content": "Aplicamos medidas técnicas y organizativas razonables para proteger los datos personales (por ejemplo, controles de acceso, mínimo privilegio, monitorización e infraestructura segura). Ningún sistema es 100% seguro, por lo que no podemos garantizar seguridad absoluta."
        },
        "section9": {
          "title": "9. Derechos",
          "content": "Puedes ejercer los derechos de acceso, rectificación, supresión, limitación, oposición y portabilidad, conforme a la normativa aplicable. Para ejercerlos, escribe a legal@aliigo.com. También puedes presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD)."
        }
      },
      "cookies": {
        "title": "Política de Cookies",
        "lastUpdated": "Última actualización: {date}",
        "intro": "Esta Política de Cookies explica qué son las cookies, qué categorías pueden utilizarse en aliigo.com y cómo gestionar tus preferencias.",
        "section1": {
          "title": "1. ¿Qué son las cookies?",
          "content": "Las cookies son pequeños archivos de texto que se almacenan en tu navegador o dispositivo. Ayudan a que los sitios web funcionen, recuerden preferencias y (si se habilita) midan el uso."
        },
        "section2": {
          "title": "2. Categorías de cookies",
          "content": "Podemos utilizar:\n- Cookies técnicas (necesarias): imprescindibles para el funcionamiento (por ejemplo, autenticación y seguridad).\n- Cookies de preferencias: recuerdan tus elecciones (por ejemplo, idioma).\n- Cookies de analítica (opcionales): ayudan a entender el uso y mejorar el servicio.\n- Cookies de marketing (opcionales): solo si están habilitadas y se consienten, para medir campañas o personalizar publicidad."
        },
        "section3": {
          "title": "3. Consentimiento y gestión",
          "content": "Cuando la ley lo exige, las cookies no necesarias se usan únicamente tras tu consentimiento. Puedes gestionar o retirar el consentimiento en cualquier momento a través de los ajustes de cookies (si están disponibles) y la configuración de tu navegador."
        },
        "section4": {
          "title": "4. Configuración del navegador",
          "content": "Puedes eliminar o bloquear cookies desde la configuración del navegador (Chrome, Safari, Firefox, Edge). Bloquear cookies necesarias puede impedir que partes del Sitio Web funcionen correctamente."
        }
      },
      "terms": {
        "title": "Términos de Uso",
        "lastUpdated": "Última actualización: {date}",
        "intro": "Estos Términos de Uso (“Términos”) regulan el acceso y uso del servicio Aliigo (el “Servicio”). Si utilizas el Servicio en nombre de una empresa u organización, declaras que tienes autoridad para vincular a dicha entidad.",
        "section1": {
          "title": "1. Prestador y contacto",
          "content": "Prestador: Emilio Castellanos Abis (Aliigo).\nDomicilio: C/ de Dalt, 37 · Bajo derecha, Ciutat Vella · 46003 València (España).\nContacto: legal@aliigo.com."
        },
        "section2": {
          "title": "2. El Servicio",
          "content": "Aliigo es una plataforma SaaS que proporciona un asistente web, panel de configuración, historial de conversaciones y herramientas de captación de contactos. El Servicio puede evolucionar con el tiempo y sus funcionalidades pueden añadirse, modificarse o descontinuarse."
        },
        "section3": {
          "title": "3. Requisitos y uso aceptable",
          "content": "Te comprometes a no usar el Servicio para crear, transmitir o facilitar contenido ilícito, engañoso, infractor, abusivo o dañino, ni para enviar spam o marketing no autorizado. Eres responsable de que tu uso cumpla la normativa aplicable (incluida protección de datos y normativa anti-spam) y de obtener los consentimientos necesarios."
        },
        "section4": {
          "title": "4. Cuenta y seguridad",
          "content": "Eres responsable de mantener la confidencialidad de tus credenciales y de toda la actividad realizada bajo tu cuenta. Debes notificarnos de inmediato cualquier uso no autorizado o incidente de seguridad que afecte a tu cuenta."
        },
        "section5": {
          "title": "5. Planes, prueba y facturación",
          "content": "Aliigo ofrece planes de suscripción (Starter, Growth y Pro) y una prueba gratuita de 30 días en planes elegibles. Si no cancelas antes de que termine la prueba, tu suscripción se renovará y comenzará la facturación en el plan seleccionado. Las suscripciones se renuevan automáticamente en cada ciclo hasta su cancelación. Pueden aplicar impuestos según tu ubicación y condición."
        },
        "section6": {
          "title": "6. Uso incluido y uso razonable",
          "content": "Los planes incluyen un uso mensual pensado para un uso normal de negocio. Un uso excesivo, abuso, scraping automatizado o volúmenes inusualmente altos pueden requerir un cambio de plan, precio personalizado, limitación temporal (throttling) o suspensión para proteger la plataforma. Las asignaciones, si se muestran en el producto o en páginas de precios, forman parte de la descripción del plan."
        },
        "section7": {
          "title": "7. Contenidos del cliente y responsabilidad",
          "content": "Eres el único responsable de la exactitud, legalidad y adecuación de tu información de negocio, prompts, políticas y cualquier contenido que aportes para configurar el asistente. También eres responsable del uso que hagas de leads y mensajes captados mediante el Servicio."
        },
        "section8": {
          "title": "8. Salidas de IA y ausencia de asesoramiento profesional",
          "content": "El Servicio puede generar salidas asistidas por IA basadas en la información que proporciones. Las salidas de IA pueden ser inexactas o inapropiadas y deben revisarse antes de utilizarlas. El Servicio no sustituye asesoramiento profesional (legal, médico, financiero u otro). Eres responsable de implementar salvaguardas adecuadas y de decidir si y cómo usar dichas salidas."
        },
        "section9": {
          "title": "9. Protección de datos (RGPD)",
          "content": "Para datos de cuenta y del Sitio Web, Aliigo actúa como Responsable según la Política de Privacidad. Para datos de chats de usuarios finales tratados por cuenta de clientes, Aliigo actúa como Encargado cuando corresponda, conforme al Anexo de Tratamiento de Datos (DPA)."
        },
        "section10": {
          "title": "10. Suspensión y terminación",
          "content": "Podemos suspender o terminar el acceso si incumples de forma sustancial estos Términos, si no pagas las cuotas o si tu uso supone un riesgo para la plataforma, otros usuarios o terceros. Puedes cancelar tu suscripción en cualquier momento; el acceso se mantiene hasta el final del periodo en curso salvo norma imperativa en contrario."
        },
        "section11": {
          "title": "11. Exención de garantías",
          "content": "En la máxima medida permitida por la ley, el Servicio se ofrece “tal cual” y “según disponibilidad”, sin garantías de ningún tipo, ya sean expresas, implícitas o legales, incluyendo adecuación a un propósito particular, comerciabilidad y no infracción. No garantizamos funcionamiento ininterrumpido ni libre de errores."
        },
        "section12": {
          "title": "12. Limitación de responsabilidad",
          "content": "En la máxima medida permitida por la ley, Aliigo no será responsable de daños indirectos, incidentales, especiales, consecuentes o punitivos, ni de pérdida de beneficios, ingresos, datos o reputación. La responsabilidad total agregada de Aliigo derivada del Servicio no excederá el total de las cuotas pagadas por ti a Aliigo en los 12 meses anteriores al hecho que origine la reclamación."
        },
        "section13": {
          "title": "13. Indemnidad",
          "content": "Te comprometes a defender, indemnizar y mantener indemne a Aliigo frente a reclamaciones, daños, responsabilidades, costes y gastos (incluidos honorarios razonables) derivados de: (a) tu contenido, configuración o uso del Servicio; (b) tus comunicaciones con usuarios finales; (c) incumplimiento de la ley; o (d) infracción de derechos de terceros."
        },
        "section14": {
          "title": "14. Fuerza mayor",
          "content": "Aliigo no será responsable de retrasos o incumplimientos por causas fuera de su control razonable, incluyendo caídas de internet, fallos de hosting o infraestructura, problemas de proveedores de plataforma o actuaciones gubernamentales."
        },
        "section15": {
          "title": "15. Cambios en los Términos",
          "content": "Podemos actualizar estos Términos ocasionalmente. Si los cambios son materiales, proporcionaremos un aviso razonable a través del Sitio Web o del Servicio. El uso continuado tras la fecha de entrada en vigor implica aceptación."
        },
        "section16": {
          "title": "16. Legislación aplicable y jurisdicción",
          "content": "Estos Términos se rigen por la legislación española. Para cualquier controversia, las partes se someten a los juzgados y tribunales de València (España), salvo norma imperativa en contrario."
        }
      },
      "dpa": {
        "title": "Anexo de Tratamiento de Datos (DPA)",
        "lastUpdated": "Última actualización: {date}",
        "intro": "Este Anexo de Tratamiento de Datos (“DPA”) forma parte de los Términos de Uso y aplica cuando Aliigo trata datos personales como Encargado por cuenta de un cliente empresarial (el “Cliente”) conforme al RGPD.",
        "section1": {
          "title": "1. Partes y roles",
          "content": "Prestador/Encargado: Emilio Castellanos Abis (Aliigo), legal@aliigo.com.\nCliente/Responsable: la entidad que crea un espacio en Aliigo e integra Aliigo en su web.\nCada parte cumplirá las obligaciones del RGPD aplicables a su rol."
        },
        "section2": {
          "title": "2. Objeto, duración y finalidad",
          "content": "Aliigo trata datos personales para prestar el Servicio (asistente web, chat, historial, captación de leads y notificaciones). El tratamiento dura mientras el Cliente mantenga el Servicio activo y durante el tiempo razonable necesario para la devolución/supresión y obligaciones legales."
        },
        "section3": {
          "title": "3. Categorías de datos y de interesados",
          "content": "Los interesados pueden incluir visitantes, potenciales clientes y clientes del Cliente.\nLos datos personales pueden incluir mensajes de chat, datos de contacto (nombre, email, teléfono) y cualquier dato personal que el visitante facilite en la conversación."
        },
        "section4": {
          "title": "4. Obligaciones del Encargado",
          "content": "Aliigo:\n- Tratará los datos únicamente siguiendo instrucciones documentadas del Cliente.\n- Garantizará que las personas autorizadas están sujetas a confidencialidad.\n- Implementará medidas técnicas y organizativas adecuadas.\n- Asistirá al Cliente en el cumplimiento del RGPD en la medida aplicable.\n- Notificará al Cliente sin dilación indebida al tener conocimiento de una violación de seguridad de datos personales que afecte a datos del Cliente."
        },
        "section5": {
          "title": "5. Subencargados",
          "content": "Aliigo puede utilizar subencargados para prestar el Servicio (por ejemplo, hosting, envío de emails, base de datos, analítica, pagos). Aliigo impondrá obligaciones de protección de datos coherentes con este DPA. Aliigo facilitará información sobre subencargados previa solicitud o mediante un listado actualizado cuando esté disponible."
        },
        "section6": {
          "title": "6. Transferencias internacionales",
          "content": "Si hubiera transferencias fuera del EEE, Aliigo aplicará garantías adecuadas como Cláusulas Contractuales Tipo u otros mecanismos permitidos."
        },
        "section7": {
          "title": "7. Supresión o devolución",
          "content": "Al finalizar el Servicio, Aliigo suprimirá o devolverá los datos personales del Cliente en un plazo razonable, salvo obligación legal de conservación."
        },
        "section8": {
          "title": "8. Auditoría e información",
          "content": "Previa solicitud razonable, Aliigo proporcionará la información necesaria para demostrar el cumplimiento de este DPA, teniendo en cuenta confidencialidad y requisitos de seguridad. Las auditorías, si fueran necesarias, deberán limitarse en alcance, programarse con antelación y no ser indebidamente disruptivas."
        },
        "section9": {
          "title": "9. Prelación",
          "content": "Si existe conflicto entre este DPA y los Términos, prevalecerá este DPA en materia de protección de datos."
        }
      }
    }
  }
}
