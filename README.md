# Tiru Amballa — Full Stack Portfolio Ecosystem

A unified developer portfolio website, admin Content Management System (CMS), and Spring Boot REST API backend. Features real-time visitor telemetry click tracking, JWT role-based security access, interactive terminal mockups, and a polished dark slate-and-blue visual interface.

---

## 🏗️ Monorepo Architecture

The repository is organized into three decoupled sub-applications:

*   **`apps/portfolio`** (Frontend Client):
    *   Built with React, Tailwind CSS, and Vite.
    *   Includes a command-line terminal mockup (`help`, `resume`, `projects`, `contact`, `open [name]`).
    *   Calm breathing status indicator badge and custom skill expansion tags.
    *   Honeypot form protection against spambots.
*   **`apps/admin`** (CMS Dashboard Panel):
    *   Built with React, Tailwind CSS, and Vite.
    *   Sleek dashboard layout matching the main theme.
    *   Full CRUD modals (Create, Edit with pre-filled forms, and Delete) for Skills, Projects, Certifications, and Experiences.
    *   Site Settings console to configure headlines, profile images, locations, and availability statuses dynamically.
*   **`apps/backend`** (REST Service Layer):
    *   Spring Boot, Java 17+, Hibernate JPA, and Spring Security.
    *   Role-based authorization (JWT tokens) securing all CMS administration endpoints.
    *   Uses H2 database (in-memory/file persistence) in development and supports MySQL in production.
    *   Auto-logs visitor telemetry click data (country, referrer, target link, device agent).

---

## 🛠️ Features & Telemetry

### Real-Time Visitor Telemetry
Lightweight client-side analytics hook logs visits on page load and tracks custom clicks for:
*   Resume downloads
*   Project GitHub links
*   Project Live Demo triggers

Logs are pushed automatically to the backend `/public/track-click` endpoint and render dynamically on the Admin dashboard's **Telemetry Click Feed** table, summarizing traffic referrals (LinkedIn, GitHub, Direct).

### Secure Messaging Sync
Submitting messages on the contact form stores them directly as `UNREAD` inside the database, immediately appearing in the admin CMS **Messages** inbox, where administrators can mark them read or delete them.

---

## 🚀 Local Installation

### Prerequisites
*   Node.js (v18+)
*   Java Development Kit (JDK 17+)
*   Maven

### Step 1: Run the Backend Service
```bash
cd apps/backend
./mvnw spring-boot:run
```
*   The backend will start on port `8080` (H2 database console available at `/h2-console`).
*   Default credentials are seeded automatically as:
    *   **Username**: `tiruamballa`
    *   **Password**: `100207`

### Step 2: Run the Public Portfolio Frontend
```bash
cd apps/portfolio
npm install
npm run dev
```
*   The website compiles and runs locally on `http://localhost:3000`.

### Step 3: Run the Admin CMS Dashboard
```bash
cd apps/admin
npm install
npm run dev
```
*   The panel runs on `http://localhost:3001`. Log in with your credentials to access live database endpoints.

---

## 🌐 Production Deployment

### Frontend (Vercel)
Deploy `apps/portfolio` and `apps/admin` as separate web projects on **Vercel** with the following environment variables:
*   **Portfolio Env Variable**: `VITE_API_BASE_URL` $\rightarrow$ `https://your-backend.onrender.com/api/v1/public`
*   **Admin Env Variable**: `VITE_API_BASE_URL` $\rightarrow$ `https://your-backend.onrender.com/api/v1`

### Backend (Render via Docker)
Deploy `apps/backend` as a **Web Service** on **Render**:
1.  Connect your repository and choose the **Docker** runtime.
2.  Set the **Root Directory** to `apps/backend`.
3.  Add the environment variables in Render's configuration tab:
    *   `SPRING_PROFILES_ACTIVE` $\rightarrow$ `dev`
    *   `SPRING_DATASOURCE_URL` $\rightarrow$ `jdbc:h2:file:./data/portfolio_db;DB_CLOSE_DELAY=-1;MODE=MySQL`
    *   `SPRING_JPA_HIBERNATE_DDL_AUTO` $\rightarrow$ `update`
4.  Mount a **Persistent Disk** on Render at `/opt/render/project/src/apps/backend/data` (Size: 1 GiB) to preserve data across container restarts.
