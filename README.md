# Tiru Amballa — Full Stack Portfolio Ecosystem

A unified developer portfolio website, admin Content Management System (CMS), and Spring Boot REST API backend. This repository is structured as a monorepo containing a decoupled frontend client, a secure management dashboard, and a Java REST service layer.

---

## 🏗️ Monorepo Architecture

The repository is organized into three workspaces under the `apps/` directory:

*   **`apps/portfolio`** (Frontend Client):
    *   Built with **React**, **Tailwind CSS**, and **Vite**.
    *   Features a premium glassmorphic dark-slate theme with cursor-tracking spotlight glows.
    *   Includes a command-line terminal mockup (`help`, `whoami`, `skills`, `contact`, `resume`, `clear`).
    *   Honeypot form protection against spambots on the contact form.
*   **`apps/admin`** (CMS Dashboard Panel):
    *   Built with **React**, **Tailwind CSS**, and **Vite**.
    *   Full CRUD modals (Create, Edit, Delete) for managing projects, skills, certifications, and experience.
    *   Site Settings console to configure headlines, profile images, locations, and availability statuses dynamically.
*   **`apps/backend`** (REST Service Layer):
    *   Built with **Spring Boot 3.x**, **Java 17**, **Hibernate JPA**, and **Spring Security**.
    *   Role-based authorization (JWT tokens) securing all CMS administration endpoints.
    *   Supports dynamic multi-database configuration (MySQL and PostgreSQL).
    *   Auto-logs visitor telemetry click data (country, referrer, target link, device agent).

---

## 🛠️ Key Systems & Implementation Details

For any AI developer reading this repository, the following are the primary systems and configuration patterns implemented across the monorepo:

### 1. Dynamic Database Resolution (Production Profile)
In production (`prod` profile), the backend [application-prod.yml](file:///d:/profile/apps/backend/src/main/resources/application-prod.yml) is fully dynamic:
*   We removed hardcoded JDBC driver class names and dialect specifications. Spring Boot auto-detects and loads either the **MySQL** (`com.mysql.cj.jdbc.Driver`) or **PostgreSQL** (`org.postgresql.Driver`) driver and Hibernate dialect dynamically based on the connection prefix in `DATABASE_URL`.
*   Both driver dependencies are packaged inside [pom.xml](file:///d:/profile/apps/backend/pom.xml).

### 2. Supabase Connection Pooling (IPv4 Fallback)
Since platforms like Render do not support outbound IPv6 connections on their free tier, connecting to Supabase’s direct database hostname (which is IPv6-only) fails with a `java.net.UnknownHostException`.
*   **Solution**: Connect using Supabase's **Session Pooler** endpoint which resolves to an IPv4 address.
*   **URL Format**: `jdbc:postgresql://aws-0-<region>.pooler.supabase.com:5432/postgres` (Port `5432` for Session Pooler).
*   **Username Format**: The pooler requires the project reference appended to the user, like: `postgres.<project-ref>`.

### 3. Render Deployment Optimizations
The [Dockerfile](file:///d:/profile/apps/backend/Dockerfile) and port configurations are optimized specifically to prevent Render timeouts:
*   **Maven Layer Caching**: The Dockerfile copies `pom.xml` and runs `mvn dependency:go-offline -B` before copying the source code. This caches Maven dependencies, reducing build times from >10 minutes to under 1 minute.
*   **Dynamic Port Mapping**: The backend's [application.yml](file:///d:/profile/apps/backend/src/main/resources/application.yml) binds to `server.port: ${PORT:8080}`. This respects Render's dynamically injected host port (usually `10000`), preventing health check timeout failures.

### 4. Telemetry & Messaging Sync
*   **Telemetry**: The frontend client tracks homepage visits and clicks (downloads, external social links) and logs them to `/api/v1/public/track-click`. The data is displayed in the Admin CMS's click telemetry feed.
*   **Contact Messages**: Submitted messages on the contact form write directly to the database as `UNREAD` and appear instantly in the Admin CMS message inbox.

---

## 🚀 Local Installation

### Prerequisites
*   Node.js (v18+)
*   Java Development Kit (JDK 17+)
*   Maven

### Step 1: Run the Backend Service
1.  Navigate to `apps/backend`.
2.  Start the service locally:
    ```bash
    ./mvnw spring-boot:run
    ```
    *   The backend starts on port `8080`.
    *   Local database uses an in-memory H2 instance (`/h2-console`).
    *   Default credentials: Username `tiruamballa` | Password `100207`.

### Step 2: Configure & Run Frontends
Both frontends use Vite and read environment configurations. Create a `.env` file in their respective workspace roots:

*   **`apps/admin/.env`**:
    ```text
    VITE_API_BASE_URL=http://localhost:8080/api/v1
    ```
*   **`apps/portfolio/.env`**:
    ```text
    VITE_API_BASE_URL=http://localhost:8080/api/v1/public
    ```

Run the development servers:
```bash
# Start Admin Dashboard (http://localhost:5173)
npm run dev --workspace=apps/admin

# Start Portfolio Client (http://localhost:5173 or next available)
npm run dev --workspace=apps/portfolio
```

---

## 🌐 Production Deployment

### Frontend (Vercel)
Deploy `apps/portfolio` and `apps/admin` as separate web projects on **Vercel**.
1.  In the Vercel dashboard, go to **Settings** $\rightarrow$ **Environment Variables**.
2.  Set the variables:
    *   **Admin project**: `VITE_API_BASE_URL` $\rightarrow$ `https://your-backend.onrender.com/api/v1`
    *   **Portfolio project**: `VITE_API_BASE_URL` $\rightarrow$ `https://your-backend.onrender.com/api/v1/public`
3.  **Important**: Trigger a new deployment/rebuild on Vercel after adding these variables so Vite embeds them statically into the production bundle.

### Backend (Render via Docker)
Deploy `apps/backend` as a **Web Service** using the **Docker** runtime.
1.  Set the **Root Directory** to `apps/backend`.
2.  Add the environment variables in Render's configuration tab:
    *   `SPRING_PROFILES_ACTIVE` $\rightarrow$ `prod`
    *   `DATABASE_URL` $\rightarrow$ `jdbc:postgresql://<POOLER-HOST>:5432/postgres` (Supabase Pooler URL)
    *   `DATABASE_USERNAME` $\rightarrow$ `postgres.<project-ref>`
    *   `DATABASE_PASSWORD` $\rightarrow$ `<your-db-password>`
    *   `SPRING_JPA_HIBERNATE_DDL_AUTO` $\rightarrow$ `update`

#### Database Initialization
Spring Boot executes [import.sql](file:///d:/profile/apps/backend/src/main/resources/import.sql) only when tables are initialized from scratch. To seed the database with initial projects and your admin credentials:
1.  Deploy your Render service once with `SPRING_JPA_HIBERNATE_DDL_AUTO` set to `create`.
2.  Once deployed and the database is populated, **change the environment variable back to `update`** so future deployments preserve your data.
