# Vinito — App de Catas y Sommelier

## Identidad del proyecto
- **Bundle ID:** `com.ar.ibalborde.Vinito`
- **Target iOS:** 18+
- **Arquitectura iOS:** SwiftUI + MVVM + @Observable
- **Backend:** Node.js + Express + Prisma 6 + PostgreSQL
- **Deploy:** Railway (backend), TestFlight/App Store (iOS)

## Estructura del monorepo
vinito/
├── backend/          # Node.js API
│   ├── src/
│   │   ├── routes/           # Express routes
│   │   ├── controllers/      # Request handlers
│   │   ├── services/         # Business logic
│   │   ├── repositories/     # Prisma queries
│   │   ├── middleware/        # Auth, error handling
│   │   └── validators/       # Zod schemas
│   ├── prisma/
│   │   ├── schema.prisma     # DB schema (Prisma 6)
│   │   ├── seed.ts           # Datos iniciales
│   │   └── migrations/       # Migraciones
│   └── tests/
│       ├── unit/             # Tests unitarios
│       └── integration/      # Tests de integración con supertest
└── ios/Vinito/Vinito/
├── Models/               # Structs Codable (TastingNote, Winery, Grape, etc)
├── ViewModels/           # @Observable classes con lógica
├── Views/
│   ├── TastingNotes/     # Lista, detalle, nueva cata, edición
│   ├── Wineries/         # Lista y detalle de bodegas
│   ├── Grapes/           # Lista y detalle de cepas
│   ├── Study/            # Lista de temas y detalle formateado
│   └── Auth/             # Login y registro
├── Services/             # Llamadas HTTP (NetworkService, TokenStorage)
├── Repositories/         # Capa de abstracción sobre Services
├── Components/           # ScoreBadge, WineTypePill, LoadingView, EmptyStateView
├── Extensions/           # Date+Format, Color+Extensions
└── Constants/            # APIConstants (URLs por ambiente)

Reglas iOS — OBLIGATORIAS

NUNCA modificar .pbxproj ni .xcodeproj/
NUNCA usar ObservableObject — siempre @Observable
NUNCA usar NavigationView — siempre NavigationStack
NUNCA usar @StateObject — usar @State con @Observable
SIEMPRE usar .navigationBarTitleDisplayMode(.inline) en vistas con filtros
Los colores usan Color.wineRed, Color.wineLight, Color.scoreOrange, Color.scoreBlue, Color.scoreGreen

Reglas backend — OBLIGATORIAS

Prisma 6 (NO Prisma 5 ni anterior)
Express 5
TypeScript strict
Zod para validación de requests
JWT para auth
NUNCA exponer passwordHash en responses
Tests con Vitest + supertest

Build y test — iOS
Scheme: Vinito
Destination: iPhone 17 Pro (o el disponible)

Build y test — backend
bashcd backend
npm test          # Vitest con BD local Docker
npm run build     # tsc
npm run seed      # Seed contra BD de producción (requiere DATABASE_URL)

URLs

Producción: https://vinito-production.up.railway.app
Local: http://localhost:3000

Credenciales admin (solo desarrollo)

Email: ibalborde@gmail.com
Password: vinito_admin_2026

Patrones clave iOS

APIConstants.swift maneja la URL por ambiente (#if DEBUG)
TokenStorage usa Keychain para token + datos del usuario
NetworkService es el cliente HTTP genérico
Cada entidad tiene: Model → Service → Repository → ViewModel → View

Patrones clave backend

Cada entidad tiene: Repository → Service → Controller → Route
findAllShared() en TastingNoteRepository omite privateNotes y agrega userName
La paginación siempre devuelve: {data, total, page, totalPages, hasNext, hasPrev}