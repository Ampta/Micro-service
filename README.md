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

