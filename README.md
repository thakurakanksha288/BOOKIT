# 🎬 BOOKIT — Movie & Live Shows Booking Platform

<div align="center">

![Java](https://img.shields.io/badge/Java-21-orange?style=for-the-badge&logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.5.x-6DB33F?style=for-the-badge&logo=spring-boot)
![React](https://img.shields.io/badge/React-TypeScript-61DAFB?style=for-the-badge&logo=react)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-336791?style=for-the-badge&logo=postgresql)
![Maven](https://img.shields.io/badge/Maven-Build-C71A36?style=for-the-badge&logo=apache-maven)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?style=for-the-badge&logo=docker)

**Book movies and live shows — pick your seat, pay securely, get your ticket.**

[Features](#-features) · [Architecture](#-architecture) · [Getting Started](#-getting-started) · [API Reference](#-rest-api-reference) · [Roadmap](#-roadmap)

</div>

---

## 📖 What Is BOOKIT?

**BOOKIT** is a full‑stack web application that lets users discover movies and live entertainment events (concerts, comedy shows, theatre performances), interactively pick their seats on a real‑time seat map, pay securely, and receive a digital ticket with a QR code — all from a clean, modern browser UI.

The platform is designed with **no hardcoded values anywhere**: every price, every seat layout, every show schedule is driven from the database and exposed through a clean REST API. This makes the system fully configurable, easily testable, and **ready for future Agentic AI integration** (see [Future Vision](#-future-vision--agentic-ai-roadmap)).

---

## ✨ Features

### For Customers
| Feature | Description |
|---------|-------------|
| 🎥 Browse Catalog | Discover movies and live events with search and filters |
| 🕒 Show Timings | View all available screenings / performances for any content |
| 🪑 Interactive Seat Map | Click to **select** or **deselect** seats; real‑time availability |
| ⏳ Seat Hold | Seats are temporarily reserved (5 min) while you checkout |
| 💳 Secure Payment | Integrated with Razorpay test mode |
| 🎫 Digital Ticket | QR‑code ticket delivered after confirmed payment |
| 📋 Booking History | View all past and upcoming bookings |

### For Admins
| Feature | Description |
|---------|-------------|
| ➕ Manage Catalog | Add, update, or remove movies and events |
| 🏟️ Manage Venues | Define cinemas, auditoriums, seating rows and categories |
| 📅 Schedule Shows | Create shows with time slots; overlaps are auto‑prevented |
| 💰 Set Pricing | Configure per‑category seat prices per show |
| 📊 View Bookings | Monitor all bookings, payments, and occupancy |

---

## 🏗️ Architecture

BOOKIT follows a **Modular Monolith** pattern: a single deployable backend neatly split into independent functional modules. Each module owns its own entities, repositories, services, and controllers.

```
CUSTOMER / ADMIN BROWSER
         │
         ▼
  ┌─────────────────┐
  │  React + TS UI  │  ← Vite, TypeScript, component‑based
  └────────┬────────┘
           │  REST + JSON (HTTPS)
           ▼
  ┌────────────────────────────────────────────────────────┐
  │              Spring Boot Backend                       │
  │                                                        │
  │  ┌──────────┐  ┌─────────┐  ┌──────────┐             │
  │  │   Auth   │  │ Catalog │  │   Show   │             │
  │  │  Module  │  │ Module  │  │  Module  │             │
  │  └──────────┘  └─────────┘  └──────────┘             │
  │                                                        │
  │  ┌─────────────────────────────────────┐              │
  │  │       Booking & Seat Module          │              │
  │  └──────────────────┬──────────────────┘              │
  │                     │                                  │
  │         ┌───────────┴───────────┐                     │
  │         │                       │                     │
  │  ┌──────┴──────┐       ┌────────┴──────┐              │
  │  │   Payment   │       │    Ticket     │              │
  │  │   Module    │       │    Module     │              │
  │  └─────────────┘       └───────────────┘              │
  │                                                        │
  │              Spring Data JPA / Hibernate               │
  └──────────────────────┬─────────────────────────────────┘
                         │
                         ▼
               ┌──────────────────┐
               │   PostgreSQL 17  │  ← Flyway migrations
               └──────────────────┘
```

---

## 🗂️ Project Structure

```
BOOKIT/
├── backend/
│   ├── pom.xml
│   └── src/main/java/com/example/ticketbooking/…
│   └── src/main/resources/
│       ├── application.yml
│       └── db/migration/…
└── frontend/
    ├── package.json
    └── src/…
```

---

## 🌐 REST API Reference

All endpoints return a uniform JSON wrapper:
```json
{ "success": true, "data": { … }, "message": "…", "timestamp": "2026‑11‑03T14:22:58Z" }
```

**Auth** – `/api/auth/*` (register, login, logout)

**Catalog** – `/api/content*` (movies & live events)

**Shows & Seats** – `/api/shows*`, `/api/shows/{id}/seats`, `/api/seat‑locks`

**Bookings** – `/api/bookings*`

**Payments** – `/api/payments*`

**Tickets** – `/api/tickets/{ref}`

**Admin** – `/api/admin/*` (ADMIN role only)

---

## 🎨 UI Design Principles

- Interactive seat map with colour‑coded states (available 🟢, selected 🔵, held 🟡, booked 🔴)
- No hard‑coded UI text – everything comes from the API
- Responsive, accessible, and keyboard‑navigable
- Real‑time countdown while seats are held

---

## 🔒 Security Design

- Session‑based auth (HTTP‑only cookies) with Spring Security
- BCrypt password hashing
- CSRF protection
- Role‑based authorisation (`CUSTOMER`, `ADMINISTRATOR`)
- All pricing & seat validation performed **server‑side**
- Secrets via environment variables only

---

## 🚀 Getting Started

```bash
# Clone (or if you already have the folder, just cd into it)
cd D:\BOOKIT

# Backend
cd backend
mvn clean test          # run unit/integration tests
mvn spring-boot:run     # starts on http://localhost:8080

# Frontend
cd ..\frontend
npm install
npm run dev             # starts on http://localhost:5173
```

### Docker (optional)
```bash
docker compose up --build   # runs backend, frontend and PostgreSQL
```

---

## 🧪 Testing

- **Backend:** JUnit 5, Mockito, Testcontainers (PostgreSQL) – `mvn test`
- **Frontend:** TypeScript type‑checking – `npx tsc --noEmit`
- **Coverage:** aim ≥ 80 % for services and controllers

---

## 📅 Roadmap

| Phase | Goal |
|------|------|
| 1 – Setup | Backend + DB + Flyway |
| 2 – Catalog & Scheduling |
| 3 – Auth & RBAC |
| 4 – Seat‑hold & Booking engine |
| 5 – Full React UI |
| 6 – Payment + QR tickets |
| 7 – Admin dashboard & Docker deployment |

---

## 🤖 Future Vision – Agentic AI

The clean, configuration‑driven architecture makes BOOKIT **AI‑ready**. Planned AI features:
- Conversational booking assistant (natural‑language booking)
- Personalized recommendations via embeddings
- Proactive seat‑availability alerts
- Fraud detection model on payment patterns
- Admin analytics via natural‑language queries

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/xyz`)
3. Write code + tests (no magic constants)
4. `mvn test` and `npm run build`
5. Push and open a PR

---

## 📄 License

Open‑source – feel free to use, modify, and learn.

---

<div align="center">
Built with ☕ Java, 💙 React, and a love for clean architecture.
</div>
