import 'dotenv/config'
import { PrismaClient, Role, GrapeType, WineType } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function seedAdmin() {
  const passwordHash = await bcrypt.hash('vinito_admin_2026', 12)
  await prisma.user.upsert({
    where:  { email: 'ibalborde@gmail.com' },
    update: {},
    create: {
      email:       'ibalborde@gmail.com',
      passwordHash,
      name:        'Admin Vinito',
      role:        Role.ADMIN,
      isApproved:  true,
    },
  })
  console.log('✓ Admin creado')
}

async function seedWineries() {
  const wineries = [
    {
      name:        'Catena Zapata',
      region:      'Luján de Cuyo y Valle de Uco',
      province:    'Mendoza',
      foundedYear: 1902,
      owners:      'Familia Catena (Nicolás Catena Zapata)',
      winemakers:  'Alejandro Vigil',
      history:     'Fundada por Nicola Catena en 1902. Bajo la visión de Nicolás Catena Zapata se transformó en el referente del vino argentino de alta gama. Pionera en viñas de altura en el Valle de Uco y en la valorización del Malbec a nivel mundial.',
      mainGrapes:  'Malbec, Cabernet Sauvignon, Chardonnay',
      tier:        'Ícono',
    },
    {
      name:        'Zuccardi Valle de Uco',
      region:      'Valle de Uco',
      province:    'Mendoza',
      foundedYear: 1963,
      owners:      'Familia Zuccardi',
      winemakers:  'Sebastián Zuccardi',
      history:     'El abuelo Alberto Zuccardi comenzó en los 60s con un sistema de riego propio. Elegida Mejor Bodega del Mundo en los World\'s Best Vineyards en 2019, 2020 y 2021 consecutivamente.',
      mainGrapes:  'Malbec, Cabernet Sauvignon, Bonarda, Torrontés',
      tier:        'Ícono mundial',
    },
    {
      name:        'Nieto Senetiner',
      region:      'Vistalba',
      province:    'Mendoza',
      foundedYear: 1888,
      owners:      'Grupo Pérez Companc (familia Braun Peña)',
      winemakers:  'Roberto González',
      history:     'Una de las bodegas más antiguas de Argentina, fundada en 1888 por inmigrantes italianos. Produce vinos desde el DOC Luján de Cuyo, la primera denominación de origen controlada del Malbec en Argentina.',
      mainGrapes:  'Malbec DOC, Cabernet Franc, Bonarda, Syrah',
      tier:        'Masivo a premium',
    },
    {
      name:        'Susana Balbo Wines',
      region:      'Agrelo',
      province:    'Mendoza',
      foundedYear: 1999,
      owners:      'Susana Balbo',
      winemakers:  'Susana Balbo',
      history:     'Susana Balbo fue la primera mujer enóloga graduada de Argentina en 1981. Su línea Crios es reconocida internacionalmente por precio-calidad.',
      mainGrapes:  'Malbec, Cabernet Sauvignon, Torrontés, Chardonnay',
      tier:        'Premium',
    },
    {
      name:        'Ruca Malen',
      region:      'Agrelo',
      province:    'Mendoza',
      foundedYear: 1999,
      owners:      'Jacques Louis de Montalembert y Jean Pierre Thibaud',
      winemakers:  'Marcelo Pelleriti y Kiara Ruggieri',
      history:     'Bodega con fuerte influencia francesa. Su nombre proviene del mapuche: casa de la joven. Propone un modelo de turismo enogastronómico con restaurante en el viñedo.',
      mainGrapes:  'Malbec, Chardonnay, Merlot, Syrah',
      tier:        'Premium',
    },
    {
      name:        'Mosquita Muerta Wines',
      region:      'Luján de Cuyo',
      province:    'Mendoza',
      foundedYear: 2008,
      owners:      'Familia Millan',
      winemakers:  'Familia Millan',
      history:     'Proyecto familiar mendocino con fuerte identidad. Su línea Perro Callejero se convirtió en uno de los vinos más populares del segmento joven de alta calidad.',
      mainGrapes:  'Pinot Noir, Semillón, Malbec',
      tier:        'Accesible',
    },
    {
      name:        'Humberto Canale',
      region:      'General Roca',
      province:    'Río Negro',
      foundedYear: 1909,
      owners:      'Familia Canale',
      winemakers:  'Mariana Saez',
      history:     'La bodega más antigua de la Patagonia argentina. Se ubica en el Alto Valle del Río Negro a 39° latitud sur, una de las zonas más australes de vitivinicultura del mundo.',
      mainGrapes:  'Sauvignon Blanc, Semillón, Pinot Noir, Malbec',
      tier:        'Premium patagónico',
    },
    {
      name:        'Santa Julia',
      region:      'Maipú y Valle de Uco',
      province:    'Mendoza',
      foundedYear: 1999,
      owners:      'Familia Zuccardi',
      winemakers:  'Equipo Zuccardi',
      history:     'Marca del grupo Zuccardi orientada a vinos varietales frescos y accesibles. Una de las marcas más exportadas de Argentina.',
      mainGrapes:  'Torrontés, Malbec, Albariño, Chardonnay, Viognier',
      tier:        'Accesible',
    },
    {
      name:        'Durigutti',
      region:      'Las Compuertas',
      province:    'Mendoza',
      foundedYear: 2000,
      owners:      'Héctor y Pablo Durigutti',
      winemakers:  'Pablo Durigutti',
      history:     'Proyecto de los hermanos Durigutti. Pablo es uno de los enólogos jóvenes más premiados de Mendoza. Trabajan con variedades poco convencionales de viñas viejas.',
      mainGrapes:  'Petit Verdot, Cabernet Franc, Malbec, Bonarda',
      tier:        'Boutique',
    },
    {
      name:        'Zorzal Wines',
      region:      'Gualtallary, Tupungato',
      province:    'Mendoza',
      foundedYear: 2007,
      owners:      'Familia Michelini',
      winemakers:  'Juan Pablo Michelini',
      history:     'La familia Michelini fundó Zorzal en Gualtallary a más de 1400 msnm. Juan Pablo es uno de los enólogos más creativos de Argentina.',
      mainGrapes:  'Pinot Noir, Malbec, Cabernet Franc, Torrontés',
      tier:        'Boutique premium',
    },
    {
      name:        'Viña Las Perdices',
      region:      'Agrelo',
      province:    'Mendoza',
      foundedYear: 1997,
      owners:      'Familia Falasco',
      winemakers:  'Equipo Las Perdices',
      history:     'Bodega mendocina reconocida por sus varietales aromáticos como Gewürztraminer y Viognier.',
      mainGrapes:  'Gewürztraminer, Viognier, Malbec, Torrontés',
      tier:        'Accesible',
    },
    {
      name:        'Onofri Wines',
      region:      'Lavalle',
      province:    'Mendoza',
      foundedYear: 2010,
      owners:      'Familia Onofri',
      winemakers:  'Familia Onofri',
      history:     'Bodega familiar que trabaja con variedades italianas en Lavalle. El Teroldego es su proyecto más distintivo.',
      mainGrapes:  'Teroldego, Malbec, Bonarda',
      tier:        'Boutique',
    },
    {
      name:        'Finca La Celia',
      region:      'San Carlos',
      province:    'Mendoza',
      foundedYear: 1890,
      owners:      'Grupo Pérez Companc',
      winemakers:  'Equipo La Celia',
      history:     'Una de las bodegas más antiguas del Valle de Uco, fundada en 1890. Produce vinos de alta expresión de terroir de San Carlos.',
      mainGrapes:  'Malbec, Cabernet Sauvignon, Sauvignon Blanc',
      tier:        'Premium',
    },
    {
      name:        'Bodega A16',
      region:      'Perdriel',
      province:    'Mendoza',
      foundedYear: 2018,
      owners:      'Gerardo Cartellone',
      winemakers:  'Leandro Funes',
      history:     'Proyecto reciente con perfil fresco y frutal. El Malbec Auge es su referente en el mercado local.',
      mainGrapes:  'Malbec',
      tier:        'Boutique emergente',
    },
  ]

  for (const winery of wineries) {
    await prisma.winery.upsert({
      where:  { name: winery.name },
      update: winery,
      create: winery,
    })
  }
  console.log(`✓ ${wineries.length} bodegas cargadas`)
}

async function seedGrapes() {
  const grapes = [
    {
      name:          'Malbec',
      type:          GrapeType.RED,
      origin:        'Cahors, sudoeste de Francia',
      servingTemp:   '14–16°C',
      flavorProfile: 'Ciruela, mora, cereza, violetas, con cuerpo',
      notes:         'Cepa emblema de Argentina. Se adapta mejor en altitud que en su tierra de origen. Colores muy intensos, violáceos.',
    },
    {
      name:          'Cabernet Sauvignon',
      type:          GrapeType.RED,
      origin:        'Burdeos, Francia',
      servingTemp:   '14–16°C',
      flavorProfile: 'Pimiento verde, menta, cedro, grosella negra, gran cuerpo',
      notes:         'Reina de las tintas. En climas cálidos da notas a pimiento verde; en zonas frescas, fruta negra más madura.',
    },
    {
      name:          'Cabernet Franc',
      type:          GrapeType.RED,
      origin:        'Burdeos, Francia',
      servingTemp:   '14–16°C',
      flavorProfile: 'Ciruela, pimiento, té negro, más liviano que el Cabernet Sauvignon',
      notes:         'Más aromático y fresco que el Cabernet Sauvignon. Ancestro del Cabernet Sauvignon.',
    },
    {
      name:          'Bonarda',
      type:          GrapeType.RED,
      origin:        'Saboya, Francia (conocida como Douce Noire)',
      servingTemp:   '14–16°C',
      flavorProfile: 'Mora, arándanos, clavo de olor, cuerpo medio',
      notes:         'Segunda uva tinta más plantada en Argentina. La Bonarda argentina es en realidad la Douce Noire francesa.',
    },
    {
      name:          'Syrah',
      type:          GrapeType.RED,
      origin:        'Valle del Ródano, Francia',
      servingTemp:   '14–16°C',
      flavorProfile: 'Pimienta negra, frutos negros, cuero, especias, violetas',
      notes:         'En San Juan y Luján de Cuyo da excelentes resultados. Estilo denso y especiado.',
    },
    {
      name:          'Pinot Noir',
      type:          GrapeType.RED,
      origin:        'Borgoña, Francia',
      servingTemp:   '12–14°C',
      flavorProfile: 'Cereza, frutilla, frambuesa, tierra, hongos con crianza',
      notes:         'Cepa difícil. En Argentina funciona mejor en climas fríos: Valle de Uco, Río Negro y Patagonia.',
    },
    {
      name:          'Criolla Grande',
      type:          GrapeType.RED,
      origin:        'Sudamérica (llegó con los españoles)',
      servingTemp:   '12–14°C',
      flavorProfile: 'Frutilla, frambuesa, tierra húmeda, cuerpo ligero',
      notes:         'Una de las primeras variedades plantadas en Argentina. Está viviendo un renacimiento de la mano de productores que valorizan la tradición.',
    },
    {
      name:          'Tannat',
      type:          GrapeType.RED,
      origin:        'Madiran, sudoeste de Francia',
      servingTemp:   '14–16°C',
      flavorProfile: 'Frutas negras concentradas, especias, taninos muy marcados',
      notes:         'En Argentina se planta principalmente en Salta. Vinos de alta concentración y estructura tánica.',
    },
    {
      name:          'Petit Verdot',
      type:          GrapeType.RED,
      origin:        'Burdeos, Francia',
      servingTemp:   '14–16°C',
      flavorProfile: 'Ciruela, violetas, especias, taninos firmes',
      notes:         'Cepa de blend en Burdeos, en Argentina se elabora como varietal. Las Compuertas produce ejemplares interesantes.',
    },
    {
      name:          'Tempranillo',
      type:          GrapeType.RED,
      origin:        'Rioja, España',
      servingTemp:   '14–16°C',
      flavorProfile: 'Frutilla, cereza, cuero, tabaco, especias con crianza',
      notes:         'Ampliamente plantado en Mendoza y San Juan. Se adapta bien a terroirs cálidos.',
    },
    {
      name:          'Teroldego',
      type:          GrapeType.RED,
      origin:        'Trentino-Alto Adige, Italia',
      servingTemp:   '14–16°C',
      flavorProfile: 'Fruta negra madura, especias, algo balsámico',
      notes:         'Cepa italiana poco común en Argentina. Proyectos boutique en Mendoza muestran resultados interesantes.',
    },
    {
      name:          'Torrontés',
      type:          GrapeType.WHITE,
      origin:        'Argentina (cruce de Moscatel de Alejandría y Listán Prieto)',
      servingTemp:   '8–10°C',
      flavorProfile: 'Flores blancas, rosa, jazmín, durazno, fruta tropical, cítrico',
      notes:         'La cepa blanca emblema de Argentina. Salta (Cafayate) produce los mejores ejemplares del Torrontés Riojano.',
    },
    {
      name:          'Chardonnay',
      type:          GrapeType.WHITE,
      origin:        'Borgoña, Francia',
      servingTemp:   '8–10°C',
      flavorProfile: 'Manzana, pera, mantequilla con crianza, tropical',
      notes:         'Se adapta bien a altitudes frescas de Mendoza. Con paso por roble da complejidad.',
    },
    {
      name:          'Sauvignon Blanc',
      type:          GrapeType.WHITE,
      origin:        'Borgoña y Loire, Francia',
      servingTemp:   '8–10°C',
      flavorProfile: 'Cítrico, maracuyá, pasto recién cortado, pimiento blanco',
      notes:         'En Patagonia y Valle de Uco produce los ejemplares más elegantes, de alta acidez.',
    },
    {
      name:          'Viognier',
      type:          GrapeType.WHITE,
      origin:        'Valle del Ródano, Francia',
      servingTemp:   '8–10°C',
      flavorProfile: 'Durazno, albaricoque, jazmín, vino oleoso y untuoso',
      notes:         'Cepa aromática de textura amplia. En Luján de Cuyo da buenos resultados con perfil frutal tropical.',
    },
    {
      name:          'Gewürztraminer',
      type:          GrapeType.WHITE,
      origin:        'Alsacia, Francia',
      servingTemp:   '8–10°C',
      flavorProfile: 'Rosa, lychee, jengibre, especias, pétalos',
      notes:         'Una de las cepas más aromáticas del mundo. En Mendoza y San Juan produce blancos exuberantes.',
    },
    {
      name:          'Semillón',
      type:          GrapeType.WHITE,
      origin:        'Burdeos, Francia',
      servingTemp:   '8–10°C',
      flavorProfile: 'Pera, manzana, cera de abejas, herbal',
      notes:         'Clásico del Río Negro patagónico. Humberto Canale fue pionero. También aparece en proyectos alternativos de Mendoza.',
    },
    {
      name:          'Albariño',
      type:          GrapeType.WHITE,
      origin:        'Galicia, España',
      servingTemp:   '8–10°C',
      flavorProfile: 'Durazno, melón, cítrico, alta acidez',
      notes:         'Cepa relativamente nueva en Argentina. Valle de Uco produce ejemplares frescos y minerales.',
    },
    {
      name:          'Moscatel de Alejandría',
      type:          GrapeType.WHITE,
      origin:        'Mediterráneo',
      servingTemp:   '8–10°C',
      flavorProfile: 'Rosa, naranja, fruta tropical exótica, almendras',
      notes:         'Cepa antiquísima. En Argentina produce blancos secos muy aromáticos de gran intensidad floral.',
    },
    {
      name:          'Pedro Giménez',
      type:          GrapeType.WHITE,
      origin:        'Adaptación regional argentina',
      servingTemp:   '8–10°C',
      flavorProfile: 'Floral suave, herbal, fruta blanca discreta',
      notes:         'Muy plantada en Mendoza y San Juan. Algunos proyectos boutique la rescatan con resultados interesantes.',
    },
  ]

  for (const grape of grapes) {
    await prisma.grape.upsert({
      where:  { name: grape.name },
      update: grape,
      create: { ...grape, type: grape.type as GrapeType },
    })
  }
  console.log(`✓ ${grapes.length} cepas cargadas`)
}

async function seedStudyTopics() {
  const topics = [
    {
      title:    '¿Qué es el vino? Definición y legislación',
      content:  'Según la OIV, el vino es exclusivamente la bebida resultante de la fermentación alcohólica de uvas frescas o mosto de uva. Contenido mínimo de alcohol: 8,5% vol.\n\nEn Argentina, el INV define el vino como el producto obtenido por fermentación alcohólica de la uva fresca y madura elaborado dentro de la zona de producción.\n\nArgentina es el 5° productor mundial de vino y el 8° de uvas. Mendoza concentra la mayor producción. En 2020 el 75% fue vino tinto (28% Malbec) y el 25% blanco (33% Chardonnay).',
      category: 'historia',
      order:    1,
    },
    {
      title:    'La vid: botánica y partes de la planta',
      content:  'La vid pertenece a: Reino Plantae > Familia Vitáceas > Género Vitis > Especie Vitis vinifera.\n\nPartes principales:\n- Raíz: absorbe agua y minerales, acumula reservas.\n- Tronco: soporte aéreo, conduce savia.\n- Pámpanos/Sarmientos: brotes del año. Herbáceos = pámpanos. Lignificados = sarmientos.\n- Hoja: realiza fotosíntesis, produce azúcares.\n- Zarcillos: hojas modificadas para trepar.\n- Racimo: conjunto de frutos.\n\nEn viñedos comerciales se usa el injerto: portainjertos americanos resistentes a la filoxera sostienen la variedad noble (Vitis vinifera).',
      category: 'elaboracion',
      order:    2,
    },
    {
      title:    'Fermentación: el corazón del vino',
      content:  'La fermentación es el proceso por el cual las levaduras (Saccharomyces cerevisiae) transforman el azúcar de la uva en alcohol y CO₂.\n\nFermentación alcohólica: Azúcar → Alcohol etílico + CO₂ + calor\n\nFermentación maloláctica (FML): el ácido málico se transforma en ácido láctico. Hace al vino más suave. Se puede evitar con sulfitado.\n\nEn tintos: el mosto fermenta CON la piel → extracción de color y taninos.\nEn blancos: el mosto fermenta SIN la piel → mayor frescura.',
      category: 'elaboracion',
      order:    3,
    },
    {
      title:    'Proceso de elaboración del vino tinto',
      content:  '1. Vendimia y selección\n2. Despalillado y estrujado\n3. Maceración con la piel (remontado del sombrero)\n4. Fermentación alcohólica\n5. Descubado\n6. Prensado\n7. Fermentación maloláctica (opcional)\n8. Crianza en barrica o depósitos\n9. Ensamblaje, estabilización y filtración\n10. Embotellado y crianza en botella',
      category: 'elaboracion',
      order:    4,
    },
    {
      title:    'Análisis sensorial: las tres fases',
      content:  'FASE VISUAL: color, intensidad, brillo, limpidez, lágrimas. El brillo indica juventud. Las lágrimas indican más alcohol y cuerpo.\n\nColores tintos: violáceo (joven) → rubí → granate → teja (madurez).\nColores blancos: verdoso → amarillo pálido → dorado → ámbar.\n\nFASE OLFATIVA:\n- Aromas primarios: propios de la variedad (varietales)\n- Aromas secundarios: de la fermentación\n- Aromas terciarios (bouquet): de la crianza\n\nSe huele primero sin agitar (primera nariz) y luego agitando (segunda nariz).\n\nFASE GUSTATIVA: dulce, ácido, amargo, salado, umami.\nTexturas: astringencia (taninos), efervescencia, ardor (alcohol).',
      category: 'cata',
      order:    5,
    },
    {
      title:    'El color del vino: química y percepción',
      content:  'Los compuestos fenólicos determinan el color:\n- Antocianos: pigmentos del hollejo, responsables del color rojo/violeta en tintos.\n- Taninos: responsables de la conservación del color y la astringencia.\n\nFactores que determinan el color: tipo de uva, proceso de elaboración, clima, zona de producción, tiempo de maceración.\n\nEl color evoluciona con la edad: los tintos van del violeta al granate y luego al teja. Los blancos se oscurecen del verdoso al dorado y ámbar.',
      category: 'cata',
      order:    6,
    },
    {
      title:    'Cómo leer una etiqueta de vino',
      content:  'Información OBLIGATORIA:\n- Marca / nombre\n- País de procedencia\n- Grado alcohólico\n- Contenido neto (750 ml)\n- Fraccionador con número de registro\n\nInformación OPTATIVA:\n- Varietal: si se declara, mínimo 85% de esa uva\n- Zona de procedencia\n- Añada: si se declara, mínimo 85% de ese año\n\nDefiniciones:\n- Reserva: crianza mínima 12 meses (tintos) o 6 meses (blancos)\n- Gran Reserva: crianza mínima 18 meses (tintos) o 12 meses (blancos)\n- Roble en etiqueta: puede ser barrica, chips o duelas',
      category: 'elaboracion',
      order:    7,
    },
    {
      title:    'Historia del vino en Argentina',
      content:  'Los restos de vino más antiguos del mundo se hallaron en Georgia (8000-7900 años).\n\nLlegada a Argentina:\n- Los conquistadores españoles introdujeron la vid. Primeras plantas en Cuzco, luego Chile (1551) y Argentina por Santiago del Estero.\n- Los Jesuitas expandieron el cultivo. En 1598 había viñedos en Córdoba, Santa Fe y Buenos Aires.\n- Mendoza y San Juan se consolidaron por sus condiciones climáticas excepcionales.\n\nHitos clave:\n- 1853: Michel Aimé Pouget introduce cepajes franceses bajo la gobernación de Sarmiento.\n- 1885: Llegada del ferrocarril → expansión masiva.\n- 1868: La filoxera entra a Europa (no tuvo impacto grave en Argentina).\n- Años 90: Apertura económica → importación de tecnología y exportación de vino fino.\n- 2000s: Argentina se posiciona como referente del Nuevo Mundo vitivinícola.',
      category: 'historia',
      order:    8,
    },
    {
      title:    'La filoxera: la plaga más devastadora',
      content:  'La filoxera (Daktulosphaira vitifoliae) es un insecto parásito que ataca las raíces de la vid causando su muerte.\n\nOrigen: América del Norte. Llegó a Europa en 1868 por intercambio de vides americanas.\n\nEuropa: devastó casi todos los viñedos entre 1870 y 1900.\n\nSolución: injertar variedades europeas sobre portainjertos americanos resistentes.\n\nArgentina: nunca sufrió una crisis grave. Las condiciones ecológicas (suelo arenoso, clima seco) limitaron su impacto.\n\nCuriosidad: durante la crisis, el whisky reemplazó temporalmente al vino en Europa.',
      category: 'historia',
      order:    9,
    },
    {
      title:    'Regiones vitivinícolas de Argentina',
      content:  'MENDOZA: principal provincia productora. Sub-regiones: Luján de Cuyo (DOC Malbec), Valle de Uco (alta altitud, 900-1500 msnm), Maipú.\n\nSALTA — VALLES CALCHAQUÍES: hasta 3000 msnm. La región más alta del mundo. Cepa emblema: Torrontés. Clima extremo con alta radiación UV.\n\nRÍO NEGRO / PATAGONIA: región más austral. Clima frío → blancos elegantes y Pinot Noir de estilo borgoñón.\n\nSAN JUAN: segunda provincia productora. Más cálido que Mendoza. Syrah y Bonarda de gran personalidad.\n\nLA RIOJA: cuna del Torrontés Riojano. Producción artesanal con identidad propia.',
      category: 'regiones',
      order:    10,
    },
    {
      title:    'Herramientas de servicio',
      content:  'SACACORCHOS: preferentemente de dos tiempos.\nPasos: 1) Cortar la cápsula por debajo del gollete. 2) Introducir tirabuzón hasta 2 hélices. 3) Hacer palanca en dos tiempos.\n\nDECANTADOR:\n- Tintos maduros: decantación delicada antes del servicio para eliminar sedimentos.\n- Tintos jóvenes: oxigenación de 1 a 4 horas.\n- Blancos: 15 minutos a 1 hora.\n\nTEMPERATURAS DE SERVICIO:\n- Blancos ligeros y espumantes: 6-8°C\n- Blancos con cuerpo: 8-10°C\n- Tintos ligeros: 12-14°C\n- Tintos con cuerpo: 14-16°C\n- Grandes tintos añejos: 16-18°C',
      category: 'cata',
      order:    11,
    },
    {
      title:    'Vinos orgánicos y biodinámicos',
      content:  'VITICULTURA ORGÁNICA: sin pesticidas, herbicidas ni fertilizantes sintéticos. Se trabaja el suelo con compost. Certificación: IFOAM, USDA Organic.\n\nVITICULTURA BIODINÁMICA: va más allá de lo orgánico. Trabaja según el calendario biodinámico (días de raíz, flor, fruta y hoja) y usa preparados específicos como el preparado 500 (estiércol de vaca fermentado en cuerno). Certifica Demeter.\n\nEn copa: mayor expresión del terroir, menor intervención química, perfiles aromáticos más genuinos.',
      category: 'elaboracion',
      order:    12,
    },
  ]

  for (const [index, topic] of topics.entries()) {
    await prisma.studyTopic.upsert({
      where: {
        id: `seed-topic-${index + 1}`,
      },
      update: topic,
      create: {
        id: `seed-topic-${index + 1}`,
        ...topic,
      },
    })
  }
  console.log(`✓ ${topics.length} temas de estudio cargados`)
}

async function seedQuestions() {
  type OptionInput = { text: string; isCorrect: boolean }
  type QuestionInput = {
    id:          string
    text:        string
    explanation: string
    category:    string
    difficulty:  string
    options:     OptionInput[]
  }

  const questions: QuestionInput[] = [
    // ── CEPAS ──────────────────────────────────────────────────────────────────
    {
      id:          'seed-q-1',
      text:        '¿Cuál es la cepa tinta emblema de Argentina?',
      explanation: 'El Malbec, originario de Cahors (Francia), encontró en Argentina —especialmente en Mendoza— su tierra prometida, produciendo vinos de mayor cuerpo y color que en su tierra de origen.',
      category:    'cepas',
      difficulty:  'easy',
      options: [
        { text: 'Cabernet Sauvignon', isCorrect: false },
        { text: 'Malbec',             isCorrect: true  },
        { text: 'Syrah',              isCorrect: false },
        { text: 'Bonarda',            isCorrect: false },
      ],
    },
    {
      id:          'seed-q-2',
      text:        '¿Cuál es la cepa blanca emblema de Argentina?',
      explanation: 'El Torrontés es una cepa autóctona de Argentina, cruce de Moscatel de Alejandría y Listán Prieto. Los mejores ejemplares provienen de Cafayate, Salta.',
      category:    'cepas',
      difficulty:  'easy',
      options: [
        { text: 'Chardonnay',  isCorrect: false },
        { text: 'Viognier',    isCorrect: false },
        { text: 'Torrontés',   isCorrect: true  },
        { text: 'Sauvignon Blanc', isCorrect: false },
      ],
    },
    {
      id:          'seed-q-3',
      text:        '¿De qué región francesa es originario el Malbec?',
      explanation: 'El Malbec es originario de Cahors, en el sudoeste de Francia, donde se lo conoce como Côt o Auxerrois.',
      category:    'cepas',
      difficulty:  'medium',
      options: [
        { text: 'Burdeos',   isCorrect: false },
        { text: 'Borgoña',   isCorrect: false },
        { text: 'Alsacia',   isCorrect: false },
        { text: 'Cahors',    isCorrect: true  },
      ],
    },
    {
      id:          'seed-q-4',
      text:        '¿Qué cepa es ancestro del Cabernet Sauvignon?',
      explanation: 'El Cabernet Franc es el ancestro del Cabernet Sauvignon. Es más aromático y con menor estructura tánica que su descendiente.',
      category:    'cepas',
      difficulty:  'medium',
      options: [
        { text: 'Merlot',          isCorrect: false },
        { text: 'Cabernet Franc',  isCorrect: true  },
        { text: 'Petit Verdot',    isCorrect: false },
        { text: 'Malbec',          isCorrect: false },
      ],
    },
    {
      id:          'seed-q-5',
      text:        '¿A qué temperatura se sirve el Torrontés?',
      explanation: 'Los blancos aromáticos como el Torrontés se sirven muy fríos, entre 8 y 10°C, para preservar sus aromas florales de jazmín, rosa y frutas tropicales.',
      category:    'cepas',
      difficulty:  'easy',
      options: [
        { text: '14–16°C', isCorrect: false },
        { text: '12–14°C', isCorrect: false },
        { text: '8–10°C',  isCorrect: true  },
        { text: '6–8°C',   isCorrect: false },
      ],
    },
    {
      id:          'seed-q-6',
      text:        '¿La Bonarda argentina es en realidad qué cepa francesa?',
      explanation: 'La Bonarda que se planta en Argentina es la Douce Noire de Saboya (Francia), no la Bonarda piamontesa italiana. Es la segunda uva tinta más plantada en Argentina.',
      category:    'cepas',
      difficulty:  'hard',
      options: [
        { text: 'Monastrell',   isCorrect: false },
        { text: 'Douce Noire',  isCorrect: true  },
        { text: 'Barbera',      isCorrect: false },
        { text: 'Dolcetto',     isCorrect: false },
      ],
    },
    {
      id:          'seed-q-7',
      text:        '¿En qué región de Argentina produce mejor el Pinot Noir?',
      explanation: 'El Pinot Noir requiere climas fríos. En Argentina funciona mejor en el Valle de Uco, Río Negro y la Patagonia, donde las temperaturas bajas preservan su acidez y elegancia.',
      category:    'cepas',
      difficulty:  'medium',
      options: [
        { text: 'San Juan',         isCorrect: false },
        { text: 'Luján de Cuyo',    isCorrect: false },
        { text: 'La Rioja',         isCorrect: false },
        { text: 'Río Negro/Valle de Uco', isCorrect: true },
      ],
    },
    // ── ELABORACIÓN ────────────────────────────────────────────────────────────
    {
      id:          'seed-q-8',
      text:        '¿Qué microorganismo transforma el azúcar en alcohol durante la fermentación?',
      explanation: 'Saccharomyces cerevisiae es la levadura principal en la elaboración del vino. Convierte los azúcares del mosto en alcohol etílico y CO₂.',
      category:    'elaboracion',
      difficulty:  'easy',
      options: [
        { text: 'Lactobacillus',           isCorrect: false },
        { text: 'Saccharomyces cerevisiae', isCorrect: true  },
        { text: 'Acetobacter',             isCorrect: false },
        { text: 'Oenococcus oeni',         isCorrect: false },
      ],
    },
    {
      id:          'seed-q-9',
      text:        '¿Qué transforma la fermentación maloláctica?',
      explanation: 'La FML convierte el ácido málico (más agresivo) en ácido láctico (más suave), reduciendo la acidez percibida y añadiendo complejidad al vino.',
      category:    'elaboracion',
      difficulty:  'medium',
      options: [
        { text: 'Azúcar en alcohol',           isCorrect: false },
        { text: 'Ácido tartárico en málico',   isCorrect: false },
        { text: 'Ácido málico en láctico',     isCorrect: true  },
        { text: 'Alcohol en ácido acético',    isCorrect: false },
      ],
    },
    {
      id:          'seed-q-10',
      text:        '¿Cuál es la principal diferencia entre la elaboración de tinto y blanco?',
      explanation: 'En los vinos tintos el mosto fermenta con la piel (maceración), extrayendo color y taninos. En los blancos, la piel se separa antes de la fermentación.',
      category:    'elaboracion',
      difficulty:  'easy',
      options: [
        { text: 'Los blancos fermentan a mayor temperatura',    isCorrect: false },
        { text: 'Los tintos fermentan con la piel',             isCorrect: true  },
        { text: 'Los blancos usan levaduras distintas',         isCorrect: false },
        { text: 'Los tintos no pasan por fermentación maloláctica', isCorrect: false },
      ],
    },
    {
      id:          'seed-q-11',
      text:        '¿Qué información es OBLIGATORIA en una etiqueta de vino argentina?',
      explanation: 'La legislación argentina exige: marca, país de procedencia, grado alcohólico, contenido neto y número de registro del fraccionador.',
      category:    'elaboracion',
      difficulty:  'medium',
      options: [
        { text: 'La añada',          isCorrect: false },
        { text: 'El varietal',       isCorrect: false },
        { text: 'El grado alcohólico', isCorrect: true },
        { text: 'El winemaker',      isCorrect: false },
      ],
    },
    {
      id:          'seed-q-12',
      text:        'Si en una etiqueta se declara varietal, ¿qué porcentaje mínimo de esa uva debe tener el vino?',
      explanation: 'Según la legislación argentina, si se declara un varietal en la etiqueta, el vino debe contener al menos un 85% de esa uva.',
      category:    'elaboracion',
      difficulty:  'medium',
      options: [
        { text: '75%', isCorrect: false },
        { text: '85%', isCorrect: true  },
        { text: '90%', isCorrect: false },
        { text: '100%', isCorrect: false },
      ],
    },
    {
      id:          'seed-q-13',
      text:        '¿Cuántos meses mínimos de crianza requiere un tinto "Reserva" en Argentina?',
      explanation: 'La denominación "Reserva" en vinos tintos argentinos requiere una crianza mínima de 12 meses, mientras que en blancos son 6 meses.',
      category:    'elaboracion',
      difficulty:  'hard',
      options: [
        { text: '6 meses',  isCorrect: false },
        { text: '12 meses', isCorrect: true  },
        { text: '18 meses', isCorrect: false },
        { text: '24 meses', isCorrect: false },
      ],
    },
    // ── CATA ───────────────────────────────────────────────────────────────────
    {
      id:          'seed-q-14',
      text:        '¿Cuántas fases tiene el análisis sensorial del vino?',
      explanation: 'El análisis sensorial clásico tiene tres fases: visual (color, limpidez, lágrimas), olfativa (aromas primarios, secundarios, terciarios) y gustativa (dulce, ácido, amargo, texturas).',
      category:    'cata',
      difficulty:  'easy',
      options: [
        { text: 'Dos',    isCorrect: false },
        { text: 'Tres',   isCorrect: true  },
        { text: 'Cuatro', isCorrect: false },
        { text: 'Cinco',  isCorrect: false },
      ],
    },
    {
      id:          'seed-q-15',
      text:        '¿Qué indican las "lágrimas" del vino?',
      explanation: 'Las lágrimas (o piernas) son las trazas que deja el vino en la copa al girarla. Mayor cantidad y grosor indica mayor contenido de alcohol y glicerina (cuerpo).',
      category:    'cata',
      difficulty:  'easy',
      options: [
        { text: 'Mayor acidez',                  isCorrect: false },
        { text: 'Mayor dulzor',                  isCorrect: false },
        { text: 'Mayor alcohol y cuerpo',         isCorrect: true  },
        { text: 'Mayor contenido de taninos',     isCorrect: false },
      ],
    },
    {
      id:          'seed-q-16',
      text:        '¿Los aromas terciarios del vino provienen de...?',
      explanation: 'Los aromas terciarios, también llamados bouquet, se desarrollan durante la crianza en barrica y/o botella. Los primarios son de la uva y los secundarios de la fermentación.',
      category:    'cata',
      difficulty:  'medium',
      options: [
        { text: 'La variedad de uva',         isCorrect: false },
        { text: 'La fermentación alcohólica', isCorrect: false },
        { text: 'La crianza',                 isCorrect: true  },
        { text: 'El suelo del viñedo',        isCorrect: false },
      ],
    },
    {
      id:          'seed-q-17',
      text:        '¿A qué temperatura se sirven los grandes tintos añejos?',
      explanation: 'Los grandes tintos con crianza se sirven entre 16 y 18°C para que puedan expresar toda su complejidad aromática y sus taninos se perciban integrados.',
      category:    'cata',
      difficulty:  'medium',
      options: [
        { text: '12–14°C', isCorrect: false },
        { text: '14–16°C', isCorrect: false },
        { text: '16–18°C', isCorrect: true  },
        { text: '18–20°C', isCorrect: false },
      ],
    },
    {
      id:          'seed-q-18',
      text:        '¿Qué compuesto químico da el color rojo/violeta a los vinos tintos?',
      explanation: 'Los antocianos son los pigmentos presentes en el hollejo de la uva tinta. Se extraen durante la maceración y son los responsables del color rojo-violeta en vinos jóvenes.',
      category:    'cata',
      difficulty:  'hard',
      options: [
        { text: 'Taninos',    isCorrect: false },
        { text: 'Antocianos', isCorrect: true  },
        { text: 'Polifenoles', isCorrect: false },
        { text: 'Flavonoles', isCorrect: false },
      ],
    },
    {
      id:          'seed-q-19',
      text:        '¿Cuál es la progresión del color en un tinto a medida que envejece?',
      explanation: 'Los tintos jóvenes son violáceos/rubíes. Con el tiempo evolucionan hacia granate y finalmente teja (tono anaranjado/marrón), indicando madurez avanzada.',
      category:    'cata',
      difficulty:  'medium',
      options: [
        { text: 'Rubí → violeta → teja',      isCorrect: false },
        { text: 'Violeta → rubí → teja',      isCorrect: true  },
        { text: 'Granate → violeta → ámbar',  isCorrect: false },
        { text: 'Teja → granate → violeta',   isCorrect: false },
      ],
    },
    // ── HISTORIA ───────────────────────────────────────────────────────────────
    {
      id:          'seed-q-20',
      text:        '¿Qué plaga devastó los viñedos europeos a partir de 1868?',
      explanation: 'La filoxera (Daktulosphaira vitifoliae), un insecto originario de América del Norte, llegó a Europa en 1868 y devastó casi todos los viñedos del continente entre 1870 y 1900.',
      category:    'historia',
      difficulty:  'easy',
      options: [
        { text: 'Oidio',     isCorrect: false },
        { text: 'Mildiu',    isCorrect: false },
        { text: 'Filoxera',  isCorrect: true  },
        { text: 'Botrytis',  isCorrect: false },
      ],
    },
    {
      id:          'seed-q-21',
      text:        '¿Cuál fue la solución a la filoxera en Europa?',
      explanation: 'La solución fue injertar las variedades europeas (Vitis vinifera) sobre portainjertos de variedades americanas resistentes al parásito.',
      category:    'historia',
      difficulty:  'medium',
      options: [
        { text: 'Fungicidas sistémicos',                        isCorrect: false },
        { text: 'Injertar en portainjertos americanos',         isCorrect: true  },
        { text: 'Riego por inundación',                         isCorrect: false },
        { text: 'Replantación con variedades resistentes',      isCorrect: false },
      ],
    },
    {
      id:          'seed-q-22',
      text:        '¿En qué año llegó el ferrocarril a Mendoza, expandiendo masivamente la vitivinicultura?',
      explanation: 'La llegada del ferrocarril a Mendoza en 1885 permitió transportar vino a Buenos Aires de forma eficiente, impulsando la expansión masiva de los viñedos mendocinos.',
      category:    'historia',
      difficulty:  'hard',
      options: [
        { text: '1853', isCorrect: false },
        { text: '1868', isCorrect: false },
        { text: '1885', isCorrect: true  },
        { text: '1902', isCorrect: false },
      ],
    },
    {
      id:          'seed-q-23',
      text:        '¿Quién introdujo cepajes franceses en Mendoza bajo la gobernación de Sarmiento?',
      explanation: 'Michel Aimé Pouget, agrónomo francés, introdujo en 1853 los primeros cepajes finos franceses en la Escuela de Agricultura de Mendoza, durante la gobernación de Sarmiento.',
      category:    'historia',
      difficulty:  'hard',
      options: [
        { text: 'Nicola Catena',        isCorrect: false },
        { text: 'Michel Aimé Pouget',   isCorrect: true  },
        { text: 'Alberto Zuccardi',     isCorrect: false },
        { text: 'Tiburcio Benegas',     isCorrect: false },
      ],
    },
    // ── REGIONES ───────────────────────────────────────────────────────────────
    {
      id:          'seed-q-24',
      text:        '¿Cuál es la primera denominación de origen controlada del Malbec en Argentina?',
      explanation: 'El DOC Luján de Cuyo fue la primera denominación de origen controlada para Malbec en Argentina, garantizando que el vino proviene exclusivamente de ese distrito.',
      category:    'regiones',
      difficulty:  'hard',
      options: [
        { text: 'DOC Valle de Uco',       isCorrect: false },
        { text: 'DOC Luján de Cuyo',      isCorrect: true  },
        { text: 'DOC Cafayate',           isCorrect: false },
        { text: 'DOC Maipú',              isCorrect: false },
      ],
    },
    {
      id:          'seed-q-25',
      text:        '¿A qué altitud máxima llegan los viñedos de los Valles Calchaquíes (Salta)?',
      explanation: 'Los viñedos de los Valles Calchaquíes en Salta alcanzan hasta 3000 metros sobre el nivel del mar, siendo los más altos del mundo en producción comercial.',
      category:    'regiones',
      difficulty:  'medium',
      options: [
        { text: '1500 msnm', isCorrect: false },
        { text: '2000 msnm', isCorrect: false },
        { text: '2500 msnm', isCorrect: false },
        { text: '3000 msnm', isCorrect: true  },
      ],
    },
    {
      id:          'seed-q-26',
      text:        '¿Cuál es la provincia vitivinícola más austral de Argentina?',
      explanation: 'Río Negro, en la Patagonia argentina, es la región vitivinícola más austral, ubicada a 39° de latitud sur. Sus condiciones frías favorecen blancos elegantes y Pinot Noir de estilo borgoñón.',
      category:    'regiones',
      difficulty:  'medium',
      options: [
        { text: 'Neuquén',       isCorrect: false },
        { text: 'Chubut',        isCorrect: false },
        { text: 'Río Negro',     isCorrect: true  },
        { text: 'Santa Cruz',    isCorrect: false },
      ],
    },
    {
      id:          'seed-q-27',
      text:        '¿Qué sub-región mendocina se encuentra entre 900 y 1500 msnm de altitud?',
      explanation: 'El Valle de Uco, con sus distritos Tupungato, Tunuyán y San Carlos, se ubica entre 900 y 1500 msnm. Esta altitud le otorga amplitud térmica diaria ideal para vinos de alta expresión.',
      category:    'regiones',
      difficulty:  'easy',
      options: [
        { text: 'Luján de Cuyo', isCorrect: false },
        { text: 'Maipú',         isCorrect: false },
        { text: 'Valle de Uco',  isCorrect: true  },
        { text: 'Rivadavia',     isCorrect: false },
      ],
    },
  ]

  for (const q of questions) {
    const { id, options, ...rest } = q
    await prisma.question.upsert({
      where: { id },
      update: {
        ...rest,
        options: {
          deleteMany: {},
          create: options,
        },
      },
      create: {
        id,
        ...rest,
        options: {
          create: options,
        },
      },
    })
  }
  console.log(`✓ ${questions.length} preguntas de quiz cargadas`)
}

async function main() {
  console.log('Ejecutando seed...')
  await seedAdmin()
  await seedWineries()
  await seedGrapes()
  await seedStudyTopics()
  await seedQuestions()
  console.log('Seed completado')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())