## 🏋️ Fitness AI Microservices Platform

A robust, production-ready Microservices architecture built with **Spring Boot 3**, **Spring Cloud**, and **Docker**. This platform features an event-driven design, AI-powered recommendations (Google Gemini), centralized security (Keycloak), and a self-healing infrastructure.
---
---

## 🚀 Key Features

* **Microservices Architecture:** Decomposed into User, Activity, and AI services.
* **AI Integration:** Generates personalized fitness advice using **Google Gemini AI**.
* **Event-Driven:** Asynchronous communication using **RabbitMQ**.
* **Centralized Security:** OAuth2/OpenID Connect authentication via **Keycloak**.
* **API Gateway:** Single entry point with dynamic routing and CORS management.
* **Resilience:** Docker Healthchecks ensure services only start when infrastructure is ready.
* **Service Discovery:** Automated service registration using **Netflix Eureka**.
* **Centralized Configuration:** Managed via **Spring Cloud Config Server**.

---

## 🛠️ Tech Stack

* **Language:** Java 21
* **Frameworks:** Spring Boot 3.x, Spring Cloud (2023.x)
* **Databases:** MySQL 8.0, MongoDB
* **Messaging:** RabbitMQ
* **Containerization:** Docker & Docker Compose
* **Security:** Keycloak (Identity & Access Management)
* **Build Tool:** Maven

---

## 📂 Service Overview

| Service | Port | Database | Description |
| :--- | :--- | :--- | :--- |
| **Api Gateway** | `8080` | - | Entry point, handles routing & Auth/CORS. |
| **User Service** | `8081` | MySQL | Manages user registration & profiles. |
| **Activity Service** | `8082` | MongoDB | Tracks workouts & events. |
| **AI Service** | `8083` | MongoDB | Generates recommendations via Gemini API. |
| **Discovery Server** | `8761` | - | Eureka Service Registry. |
| **Config Server** | `8888` | - | Centralized config management. |
| **Keycloak** | `8181` | - | IAM Server (mapped to 8080 internally). |
| **RabbitMQ** | `15672` | - | Message Broker. |

---

## ⚙️ Prerequisites

Before running, ensure you have the following installed:
1.  **Java 21 SDK**
2.  **Maven**
3.  **Docker Desktop** (Must be running)

---

## 🔐 Environment Setup (Required)

This project uses **Environment Variables** for sensitive data (AI Keys) and dynamic configurations (Frontend URL).

1.  Create a file named `.env` in the root directory (same level as `docker-compose.yml`).
2.  Paste the following content into it and replace the placeholders:

```env
# --- Google Gemini AI Configuration ---
# Your Google AI Studio API Key

GEMINI_API_KEY=AIzaSy_YOUR_REAL_API_KEY_HERE

GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=
---
```

# Micro-service Application Setup Guide

Follow these steps to build, run, and configure the application locally.

## 1. Installation & Build

First, clone the repository and build the project using the Maven wrapper.

```bash
# Clone the repository
git clone [https://github.com/Ampta/Micro-service.git](https://github.com/Ampta/Micro-service.git)

# Build the project (skipping tests for speed)
.\mvnw clean package -DskipTests
```
## 2. Running the Application
Use Docker Compose to build the images and start the containers in detached mode.

```bash
docker-compose up -d --build
```

## 3. Keycloak Configuration

Once the containers are running, you need to configure the Identity Provider (Keycloak).

**Access Keycloak:**
* **URL:** http://localhost:8181
* **Username:** `admin`
* **Password:** `admin`

#### Step A: Create Realm
1. Hover over the **Master** realm dropdown in the top-left corner.
2. Click **Create Realm**.
3. **Realm Name:** `fitness-oauth2`
4. Click **Create**.

#### Step B: Create Client
1. Go to the **Clients** tab (left sidebar) and click **Create Client**.
2. **Client ID:** `oauth2-pkce-client`
3. Click **Next**.
4. **Capability Config:**
   * Ensure **Standard Flow** is checked.
   * Ensure **Direct Access Grants** is checked.
5. Click **Next**.
6. **Access Settings:**
   * **Valid Redirect URIs:** `http://localhost:5173`
   * **Web Origins:** `http://localhost:5173` (or simply `+`)
7. Click **Save**.

#### Step C: Advanced Settings (PKCE)
1. Inside the `oauth2-pkce-client` settings, click the **Advanced** tab.
2. Scroll down to the **Proof Key for Code Exchange (PKCE)** section.
3. **Code Challenge Method:** Select `S256`.
4. Click **Save**.

#### Step D: Create User
1. Go to the **Users** tab (left sidebar) and click **Create new user**.
2. **Username:** `user1`
3. Click **Create**.
4. Click the **Credentials** tab at the top.
5. **Set Password:** `pass`
6. Toggle **Temporary** to **Off**.
7. Click **Save**.

---

## 4. Stopping the Application

To stop all services, remove the containers, and clean up the networks, run:

```bash
docker compose down