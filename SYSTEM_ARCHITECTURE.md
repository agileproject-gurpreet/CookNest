# CookNest - System Architecture Documentation

> **Version 2.1**  
> **Last Updated:** February 14, 2026  
> **Status:** Complete for MVP  
---

## Table of Contents

### **PART I: INTRODUCTION & OVERVIEW**
1. [Overview](#overview)
2. [Architecture Pattern](#architecture-pattern)

### **PART II: ARCHITECTURE VIEWS & DIAGRAMS**
3. [C4 Model Architecture Views](#c4-model-architecture-views)
   - [Level 1: System Context](#level-1-system-context)
   - [Level 2: Container Diagram](#level-2-container-diagram)
   - [Level 3: Component Diagram](#level-3-component-diagram)
4. [Technology Stack](#technology-stack)

### **PART III: SYSTEM DESIGN & APIs**
5. [System Components](#system-components)
6. [Data Architecture](#data-architecture)
   - [Database Schema](#database-schema)
   - [Entity Relationship Diagram](#entity-relationship-diagram)
   - [Table Descriptions](#table-descriptions)
7. [API Architecture](#api-architecture)
   - [API Endpoints](#api-endpoints)
8. [Data Flow Diagrams](#data-flow-diagrams)
   - [Level 0 DFD - Context Diagram](#level-0-dfd---context-diagram)
   - [Level 1 DFD - System Processes](#level-1-dfd---system-processes)
   - [Level 2 DFD - Detailed Order Processing](#level-2-dfd---detailed-order-processing)

### **PART IV: UML DIAGRAMS**
9. [Use Case Diagram](#use-case-diagram)
10. [Class Diagram](#class-diagram)
11. [Sequence Diagrams](#sequence-diagrams)
    - [User Registration Sequence](#user-registration-sequence)
    - [Order Placement Sequence](#order-placement-sequence)
    - [Authentication Flow Sequence](#authentication-flow-sequence)
12. [Activity Diagram](#activity-diagram)
13. [State Diagram](#state-diagram)
    - [Order State Diagram](#order-state-diagram)
    - [User Account State Diagram](#user-account-state-diagram)
14. [Deployment Diagram](#deployment-diagram)
15. [Package Diagram](#package-diagram)

### **PART V: SECURITY & COMPLIANCE**
16. [Architecture Decision Records](#architecture-decision-records)
17. [Security Architecture](#security-architecture)
18. [Access Control & Identity Management](#access-control--identity-management)

### **PART VI: INFRASTRUCTURE & OPERATIONS**
19. [Infrastructure Architecture](#infrastructure-architecture)
20. [Monitoring and Observability](#monitoring-and-observability)
21. [Disaster Recovery & Business Continuity](#disaster-recovery--business-continuity)

### **PART VII: QUALITY ASSURANCE & PERFORMANCE**
22. [Non-Functional Requirements](#non-functional-requirements)
23. [Testing Strategy](#testing-strategy)

### **PART VIII: GOVERNANCE & MANAGEMENT**
24. [Change Management](#change-management)
25. [Incident Response](#incident-response)

### **PART IX: API SPECIFICATIONS**
26. [API Documentation & Specifications](#api-documentation--specifications)

### **PART X: REFERENCE MATERIALS**
27. [Glossary](#glossary)
28. [Quick Reference Guide](#quick-reference-guide)
29. [References & Further Reading](#references--further-reading)
30. [Appendix: Diagram Legend](#appendix-diagram-legend)
31. [Appendices](#appendices)

---

###  Quick Navigation by Role

**Executives & Stakeholders**
- Start with: [Overview](#overview) → [Architecture Pattern](#architecture-pattern) → [Technology Stack](#technology-stack)
- Key metrics: [Non-Functional Requirements](#non-functional-requirements)

**Developers (New to Project)**
- Start with: [Overview](#overview) → [System Components](#system-components) → [API Architecture](#api-architecture)
- Implementation details: [Class Diagram](#class-diagram) → [API Documentation](#api-documentation--specifications)

**Software Architects**
- Start with: [C4 Model](#c4-model-architecture-views) → [Architecture Pattern](#architecture-pattern)
- Deep dive: [Data Architecture](#data-architecture) → [Architecture Decision Records](#architecture-decision-records)
- Diagrams: [Class Diagram](#class-diagram) → [Sequence Diagrams](#sequence-diagrams)

**Security Team**
- Start with: [Security Architecture](#security-architecture) → [Access Control & Identity Management](#access-control--identity-management)
- **Critical**: Review security warnings in [Overview](#overview) and [Technology Stack](#technology-stack)

**DevOps/SRE**
- Start with: [Infrastructure Architecture](#infrastructure-architecture) → [Deployment Diagram](#deployment-diagram)
- Monitoring: [Monitoring and Observability](#monitoring-and-observability)
- DR Planning: [Disaster Recovery & Business Continuity](#disaster-recovery--business-continuity)

**QA Engineers**
- Start with: [Testing Strategy](#testing-strategy) → [Non-Functional Requirements](#non-functional-requirements)
- Test scenarios: [Use Case Diagram](#use-case-diagram) → [Activity Diagram](#activity-diagram)

**Data Engineers**
- Start with: [Data Architecture](#data-architecture) → [Entity Relationship Diagram](#entity-relationship-diagram)
- Flow analysis: [Data Flow Diagrams](#data-flow-diagrams)

**Students/Learning**
- Recommended path: [Overview](#overview) → [Architecture Pattern](#architecture-pattern) → [C4 Model](#c4-model-architecture-views) → [Class Diagram](#class-diagram) → [API Documentation](#api-documentation--specifications)

---

# PART I: INTRODUCTION & OVERVIEW

> **Purpose:** High-level overview, architecture patterns, technology choices, and implementation timeline
---

## Overview

CookNest is a full-stack e-commerce application that connects users with local home-cooked food providers. The system follows a **layered architecture** pattern to ensure separation of concerns, maintainability, and scalability.

### Core Features (Current Implementation)
-  User registration and login (simple authentication)
-  Food item browsing (all items and by ID)
-  Order placement with multiple items
-  Order history viewing
-  Payment processing (basic payment method field, no gateway integration)

---

## Architecture Pattern

CookNest implements a **3-Tier Layered Architecture** with clear separation between presentation, business logic, and data access layers.

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     PRESENTATION LAYER                      │
│                    (React Frontend)                         │
│  • User Interface Components                                │
│  • State Management                                         │
│  • API Client Integration                                   │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTP/REST API
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                   APPLICATION LAYER                         │
│                 (Node.js + Express)                         │
│                                                             │
│  ┌────────────┐  ┌────────────┐  ┌─────────────┐            │
│  │ Controllers│  │ Controllers│  │ Controllers │            │
│  │   (User)   │  │   (Food)   │  │  (Order)    │            │
│  └─────┬──────┘  └─────┬──────┘  └──────┬──────┘            │
│        │               │                │                   │
│  ┌─────▼──────┐  ┌─────▼──────┐  ┌──────▼──────┐            │
│  │  Services  │  │  Services  │  │  Services   │            │
│  │   (User)   │  │   (Food)   │  │  (Order)    │            │
│  └─────┬──────┘  └─────┬──────┘  └──────┬──────┘            │
│        │               │                │                   │
│  ┌─────▼──────┐  ┌─────▼──────┐  ┌──────▼──────┐            │
│  │Repositories│  │Repositories│  │Repositories │            │
│  │   (User)   │  │   (Food)   │  │  (Order)    │            │
│  └─────┬──────┘  └─────┬──────┘  └──────┬──────┘            │
│        └───────────────┴────────────────┘                   │
│                         │                                   │
└─────────────────────────┼───────────────────────────────────┘
                          │
┌─────────────────────────▼────────────────────────────────────┐
│                     DATA LAYER                               │
│                 (PostgreSQL Database)                        │
│  • users                                                     │
│  • food_items                                                │
│  • orders                                                    │
│  • order_items                                               │
└──────────────────────────────────────────────────────────────┘
```

### Layer Responsibilities

#### 1. Presentation Layer (Frontend)
- **Technology**: React
- **Responsibilities**:
  - Rendering UI components
  - Handling user interactions
  - Managing client-side state
  - Making API requests to backend
  - Form validation and error handling

#### 2. Application Layer (Backend)
##### Controllers
- **Responsibilities**:
  - Handle HTTP requests and responses
  - Request validation
  - Invoke appropriate service methods
  - Format responses

##### Services
- **Responsibilities**:
  - Implement business logic
  - Orchestrate data operations
  - Handle transactions
  - Apply business rules

##### Repositories
- **Responsibilities**:
  - Direct database access
  - Execute SQL queries
  - Data mapping
  - Abstract database operations

#### 3. Data Layer
- **Technology**: PostgreSQL
- **Responsibilities**:
  - Persistent data storage
  - Data integrity enforcement
  - Transaction management
  - Query optimization

---

# PART II: ARCHITECTURE VIEWS & DIAGRAMS

> **Purpose:** Visual representations of the system architecture using industry-standard modeling techniques (C4 Model, UML, DFD)

---

## C4 Model Architecture Views

The C4 model provides a hierarchical way to visualize the CookNest system architecture at different levels of abstraction, from high-level system context down to detailed component interactions.

### Level 1: System Context

The System Context diagram shows how CookNest fits into the world around it - who uses it and what other systems it interacts with.

```
┌─────────────────────────────────────────────────────────────────┐
│                      SYSTEM CONTEXT                             │
│                                                                 │
│                                                                 │
│    ┌──────────────┐                              ┌─────────────┐│
│    │              │                              │             ││
│    │   Customer   │                              │  Home Chef  ││
│    │   (Person)   │                              │  (Person)   ││
│    │              │                              │             ││
│    └──────┬───────┘                              └──────┬──────┘│
│           │                                             │       │
│           │ Browse food,                  Manage food   │       │
│           │ place orders,                 menu, view    │       │
│           │ view history                  orders        │       │
│           │                                             │       │
│           │                                             │       │
│           │      ┌──────────────────────────┐           │       │
│           │      │                          │           │       │
│           └─────▶│     CookNest System      │◀──────────┘      │
│                  │                          │                   │
│                  │  ┌────────────────────┐  │                   │
│                  │  │  Web Application   │  │◀──────────┐      │
│                  │  │  (React + Express) │  │           │       │
│                  │  └────────────────────┘  │  Manage   │       │
│                  │                          │  users,   │       │
│                  │  ┌────────────────────┐  │  monitor  │       │
│                  │  │   PostgreSQL       │  │  system   │       │
│                  │  │    Database        │  │           │       │
│                  │  └────────────────────┘  │           │       │
│                  │                          │    ┌──────┴──────┐│
│                  │ Local home-cooked food   │    │             ││
│                  │ ordering platform        │    │    Admin    ││
│                  └──────────────────────────┘    │   (Person)  ││
│                                                  │             ││
│                                                  └─────────────┘│
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

External Systems (Future):
- Email Service (SendGrid/Nodemailer) - Send order confirmations
- Payment Gateway (Stripe/PayPal) - Process payments
- SMS Service (Twilio) - Send notifications
- Cloud Storage (AWS S3) - Store food images
```

#### System Context - Key Actors

| Actor | Type | Description | Interactions |
|-------|------|-------------|--------------|
| Customer | Person | End user who orders food | Browse catalog, search food, place orders, view history |
| Home Chef | Person | Food provider who lists items | Manage food menu, view received orders |
| Admin | Person | System administrator | Manage users, monitor system, configure settings |
| PostgreSQL Database | External System | Data storage | Persist and retrieve application data |
---

### Level 2: Container Diagram

The Container diagram zooms into the CookNest system and shows the high-level technology choices and how containers communicate.

```
                              Customer, Home Chef, Admin
                                        │
                                        │ HTTPS
                                        ▼
┌─────────────────────────────────────────────────────────────────┐
│                         Web Browser                             │
│                                                                 │
│  ┌────────────────────────────────────────────────────────┐     │
│  │                                                        │     │
│  │         Single-Page Application                        │     │
│  │         [Container: React/JavaScript]                  │     │
│  │                                                        │     │
│  │  Provides user interface for browsing food,            │     │
│  │  placing orders, and managing account                  │     │
│  │                                                        │     │
│  └─────────────────────┬──────────────────────────────────┘     │
│                        │ Makes API calls to                     │
│                        │ [JSON/HTTPS]                           │
└────────────────────────┼────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Backend API Server                            │
│           [Container: Node.js + Express]                        │
│                                                                 │
│  Provides REST API for:                                         │
│  • User authentication and registration                         │
│  • Food catalog management                                      │
│  • Order processing                                             │
│  • Business logic and validation                                │
│                                                                 │
│  Technology: Node.js, Express 5.2.1                             │
│  Port: 5000 (typical)                                           │
│                                                                 │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      │ Reads from and writes to
                      │ [SQL/TCP - Port 5432]
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Database                                      │
│           [Container: PostgreSQL]                               │
│                                                                 │
│  Stores:                                                        │
│  • User accounts and credentials                                │
│  • Food items catalog                                           │
│  • Orders and order items                                       │
│  • Transactional data                                           │
│                                                                 │
│  Technology: PostgreSQL (pg driver 8.18.0)                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

Future Containers:
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│  Cache Layer     │  │  File Storage    │  │  Message Queue   │
│  [Redis]         │  │  [AWS S3/Local]  │  │  [RabbitMQ]      │
│                  │  │                  │  │                  │
│  Session storage │  │  Food images     │  │  Async order     │
│  API cache       │  │  User uploads    │  │  processing      │
└──────────────────┘  └──────────────────┘  └──────────────────┘
```

#### Container Responsibilities

| Container | Technology | Responsibilities | Communication |
|-----------|-----------|------------------|---------------|
| Single-Page Application | React, JavaScript | User interface, client-side routing, form validation, state management | Makes API calls to Backend API via HTTPS/JSON |
| Backend API Server | Node.js, Express | Business logic, authentication, API endpoints, validation | Queries Database via SQL, responds to SPA via JSON |
| Database | PostgreSQL | Data persistence, transaction management, data integrity | Accepts SQL queries from Backend API |

---

### Level 3: Component Diagram

The Component diagram shows how the Backend API container is broken down into components, their responsibilities, and interactions.

```
┌────────────────────────────────────────────────────────────────────┐
│                      Backend API Server                            │
│                   [Container: Node.js + Express]                   │
│                                                                    │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    API Layer                                │   │
│  │                                                             │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │   │
│  │  │ User Routes  │  │ Food Routes  │  │ Order Routes │       │   │
│  │  │              │  │              │  │              │       │   │
│  │  │ /api/users/* │  │ /api/foods/* │  │ /api/orders/*│       │   │
│  │  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘       │   │
│  │         │                 │                 │               │   │
│  └─────────┼─────────────────┼─────────────────┼───────────────┘   │
│            │                 │                 │                   │
│            ▼                 ▼                 ▼                   │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                   Controller Layer                          │   │
│  │                                                             │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │   │
│  │  │    User      │  │    Food      │  │    Order     │       │   │
│  │  │  Controller  │  │  Controller  │  │  Controller  │       │   │
│  │  │              │  │              │  │              │       │   │
│  │  │ • register() │  │ • getFoods() │  │• placeOrder()│       │   │
│  │  │ • login()    │  │ • getFoodById│  │ • getOrders()│       │   │
│  │  │              │  │ ()           │  │              │       │   │
│  │  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘       │   │
│  │         │                 │                 │               │   │
│  └─────────┼─────────────────┼─────────────────┼───────────────┘   │
│            │                 │                 │                   │
│            ▼                 ▼                 │                   │
│  ┌─────────────────────────────────────┐       │                   │
│  │         Service Layer               │       │ (Order directly   │
│  │     (Business Logic Components)     │       │  uses db.query)   │
│  │                                     │       │                   │
│  │  ┌──────────────┐  ┌──────────────┐ │       │                   │
│  │  │    User      │  │    Food      │ │       │                   │
│  │  │   Service    │  │   Service    │ │       │                   │
│  │  │              │  │              │ │       │                   │
│  │  │ • register() │  │• listFoodItem│ │       │                   │
│  │  │ • login()    │  │  s()         │ │       │                   │
│  │  │              │  │•getFoodItemBy│ │       │                   │
│  │  │              │  │  Id()        │ │       │                   │
│  │  └──────┬───────┘  └───────┬──────┘ │       │                   │
│  │         │                  │        │       │                   │
│  └─────────┼──────────────────┼────────┘       │                   │
│            │                  │                │                   │
│            ▼                  ▼                ▼                   │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                  Repository Layer                           │   │
│  │                (Data Access Components)                     │   │
│  │                                                             │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │   │
│  │  │    User      │  │    Food      │  │    db.js     │       │   │
│  │  │  Repository  │  │  Repository  │  │  (Direct DB) │       │   │
│  │  │              │  │              │  │              │       │   │
│  │  │ • createUser │  │• getAllFood  │  │ • db.query() │       │   │
│  │  │   ()         │  │  Items()     │  │   Used by    │       │   │
│  │  │ • findByEmail│  │• getFoodItem │  │   Order      │       │   │
│  │  │   ()         │  │  ById()      │  │   Controller │       │   │
│  │  └──────┬───────┘  └───────┬──────┘  └────────┬─────┘       │   │
│  │         │                  │                  │             │   │
│  └─────────┼──────────────────┼──────────────────┼─────────────┘   │
│            │                  │                  │                 │
│  ┌─────────▼──────────────────▼──────────────────▼─────────────┐   │
│  │                 Database Configuration                      │   │
│  │               [Component: db.js - pg Pool]                  │   │
│  │                                                             │   │
│  │  • Connection pooling                                       │   │
│  │  • Query execution helper                                   │   │
│  │  • Transaction management                                   │   │
│  └──────────────────────────┬──────────────────────────────────┘   │
│                             │                                      │
└─────────────────────────────┼──────────────────────────────────────┘
                              │ SQL/TCP
                              ▼
                    ┌─────────────────┐
                    │   PostgreSQL    │
                    │    Database     │
                    └─────────────────┘
```

#### Component Details

> **Note:** Reflects current implementation as of February 2026

##### API Routes Components
| Component | Responsibility | Dependencies |
|-----------|---------------|--------------|
| userRoutes.js | Define user endpoints: POST /register, POST /login | userController |
| foodRoutes.js | Define food endpoints: GET /, GET /:id | foodController |
| orderRoutes.js | Define order endpoints: POST /, GET / | orderController |

##### Controller Components
| Component | Key Methods | Responsibility |
|-----------|-------------|----------------|
| userController.js | register(), login() | Handle HTTP request/response for user registration and authentication |
| foodController.js | getFoods(), getFoodById() | Handle HTTP request/response for food catalog |
| orderController.js | placeOrder(), getOrders() | Handle HTTP request/response for order management (directly uses db.query) |

##### Service Components
| Component | Key Methods | Responsibility |
|-----------|-------------|----------------|
| userService.js | register(), login() | User registration and authentication business logic |
| foodService.js | listFoodItems(), getFoodItemById() | Food catalog business logic |
| *No Order Service* | - | Order logic is in controller (planned for future refactoring) |

##### Repository Components
| Component | Key Methods | Responsibility |
|-----------|-------------|----------------|
| userRepository.js | createUser(), findByEmail() | User data access operations |
| foodRepository.js | getAllFoodItems(), getFoodItemById() | Food data access operations |
| *No Order Repository* | - | Order uses direct db.query calls (planned for future refactoring) |

##### Database Configuration
| Component | Key Methods | Responsibility |
|-----------|-------------|----------------|
| db.js | query() | PostgreSQL connection pool and query execution |

---

#### User Registration Flow

> **Current Implementation:** Simple registration without password hashing or JWT tokens

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                        USER REGISTRATION FLOW                                │
│                     End-to-End Request Processing                            │
│                          Current Simple Implementation                       │
└──────────────────────────────────────────────────────────────────────────────┘

    USER              WEB BROWSER         REACT SPA          EXPRESS API        DATABASE
     │                    │                   │                   │                 │
     │ 1. Fill Form       │                   │                   │                 │
     │─────────────────►  │                   │                   │                 │
     │                    │                   │                   │                 │
     │ 2. Click Submit    │                   │                   │                 │
     │─────────────────►  │                   │                   │                 │
     │                    │                   │                   │                 │
     │                    │ 3. POST /api/users/register           │                 │
     │                    │    (name, email, password)            │                 │
     │                    │───────────────────►                   │                 │
     │                    │                   │                   │                 │
     │                    │                   │ 4. axios.post()   │                 │
     │                    │                   │───────────────────►                 │
     │                    │                   │                   │                 │
     │                    │                   │    ┌──────────────┴───────────┐     │
     │                    │                   │    │ CONTROLLER LAYER         │     │
     │                    │                   │    │ userController.register()│     │
     │                    │                   │    │ - Extract req.body       │     │
     │                    │                   │    │ - Pass to service        │     │
     │                    │                   │    └──────────────┬───────────┘     │
     │                    │                   │                   │                 │
     │                    │                   │    ┌──────────────▼───────────┐     │
     │                    │                   │    │ SERVICE LAYER            │     │
     │                    │                   │    │ userService.register()   │     │
     │                    │                   │    │ - Call repository        │     │
     │                    │                   │    └──────────────┬───────────┘     │
     │                    │                   │                   │                 │
     │                    │                   │    ┌──────────────▼───────────┐     │
     │                    │                   │    │ REPOSITORY LAYER         │     │
     │                    │                   │    │ userRepository.createUser│     │
     │                    │                   │    │ - Build SQL INSERT       │     │
     │                    │                   │    │ - Prepare parameters     │     │
     │                    │                   │    └──────────────┬───────────┘     │
     │                    │                   │                   │                 │
     │                    │                   │                   │ 5. SQL Execute  │
     │                    │                   │                   │   INSERT INTO   │
     │                    │                   │                   │   users(name,   │
     │                    │                   │                   │   email,        │
     │                    │                   │                   │   password)     │
     │                    │                   │                   │   RETURNING *   │
     │                    │                   │                   │─────────────────►
     │                    │                   │                   │                 │
     │                    │                   │                   │ 6. Row Created  │
     │                    │                   │                   │ {id, name,      │
     │                    │                   │                   │  email,         │
     │                    │                   │                   │  password}      │
     │                    │                   │                   │◄─────────────────
     │                    │                   │                   │                 │
     │                    │                   │    ┌──────────────┴───────────┐     │
     │                    │                   │    │ REPOSITORY LAYER         │     │
     │                    │                   │    │ - Return result.rows[0]  │     │
     │                    │                   │    └──────────────┬───────────┘     │
     │                    │                   │                   │                 │
     │                    │                   │    ┌──────────────▼───────────┐     │
     │                    │                   │    │ SERVICE LAYER            │     │
     │                    │                   │    │ - Return user object     │     │
     │                    │                   │    └──────────────┬───────────┘     │
     │                    │                   │                   │                 │
     │                    │                   │    ┌──────────────▼───────────┐     │
     │                    │                   │    │ CONTROLLER LAYER         │     │
     │                    │                   │    │ - Send HTTP 201          │     │
     │                    │                   │    │ - JSON response          │     │
     │                    │                   │    └──────────────┬───────────┘     │
     │                    │                   │                   │                 │
     │                    │                   │ 7. Response 201   │                 │
     │                    │                   │ { user, token }   │                 │
     │                    │                   │◄───────────────────                 │
     │                    │                   │                                     │
     │                    │ 8. Success        │                                     │
     │                    │    Response       │                                     │
     │                    │◄───────────────────                                     │
     │                    │                                                         │
     │ 9. Show Success    │                                                         │
     │    Notification    │                                                         │
     │◄────────────────── │                                                         │
     │                    │                                                         │
     │ 10. Redirect to    │                                                         │
     │     Dashboard      │                                                         │
     │◄────────────────── │                                                         │
     │                    │                                                         │

═══════════════════════════════════════════════════════════════════════════════════
KEY OPERATIONS (Current MVP Implementation):
  • Input Validation: Basic validation in controller
  • Password Storage: Plain text 
  • Authentication: Simple email/password comparison (no JWT tokens yet)
  • Response Time: Target < 500ms (95th percentile)
  
═══════════════════════════════════════════════════════════════════════════════════
```

#### Order Placement Flow

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                         ORDER PLACEMENT FLOW                                 │
│              Multi-Step Transaction with Rollback Support                    │
└──────────────────────────────────────────────────────────────────────────────┘

    USER              WEB BROWSER         REACT SPA          EXPRESS API        DATABASE
     │                    │                   │                   │                 │
     │ 1. Browse Menu     │                   │                   │                 │
     │─────────────────►  │                   │                   │                 │
     │                    │                   │                   │                 │
     │ 2. Add Items       │                   │                   │                 │
     │    to Cart         │                   │                   │                 │
     │─────────────────►  │                   │                   │                 │
     │                    │ (localStorage)    │                   │                 │
     │                    │                   │                   │                 │
     │ 3. Review Cart     │                   │                   │                 │
     │    & Checkout      │                   │                   │                 │
     │─────────────────►  │                   │                   │                 │
     │                    │                   │                   │                 │
     │                    │ 4. POST /api/orders                   │                 │
     │                    │    {items[], delivery_address,        │                 │
     │                    │     payment_method, schedule}         │                 │
     │                    │───────────────────►                   │                 │
     │                    │                   │                   │                 │
     │                    │                   │ 5. axios.post()   │                 │
     │                    │                   │───────────────────►                 │
     │                    │                   │                   │                 │
     │                    │                   │    ┌──────────────┴───────────┐     │
     │                    │                   │    │ CONTROLLER LAYER         │     │
     │                    │                   │    │ orderController.create() │     │
     │                    │                   │    │ - Extract order data     │     │
     │                    │                   │    │ - Validate request       │     │
     │                    │                   │    └──────────────┬───────────┘     │
     │                    │                   │                   │                 │
     │                    │                   │    ┌──────────────▼───────────┐     │
     │                    │                   │    │ SERVICE LAYER            │     │
     │                    │                   │    │ orderService.process()   │     │
     │                    │                   │    │ - Verify food items      │     │
     │                    │                   │    │ - Check chef availability│     │
     │                    │                   │    │ - Validate delivery zone │     │
     │                    │                   │    │ - Calculate totals       │     │
     │                    │                   │    │   * Subtotal             │     │
     │                    │                   │    │   * Tax (8%)             │     │
     │                    │                   │    │   * Delivery fee         │     │
     │                    │                   │    └──────────────┬───────────┘     │
     │                    │                   │                   │                 │
     │                    │                   │    ┌──────────────▼───────────┐     │
     │                    │                   │    │ REPOSITORY LAYER         │     │
     │                    │                   │    │ orderRepository.create() │     │
     │                    │                   │    └──────────────┬───────────┘     │
     │                    │                   │                   │                 │
     │                    │                   │                   │ 6. BEGIN TRANS  │
     │                    │                   │                   │─────────────────►
     │                    │                   │                   │                 │
     │                    │                   │                   │ 7. SUCCESS      │
     │                    │                   │                   │◄─────────────────
     │                    │                   │                   │                 │
     │                    │                   │                   │ 8. INSERT INTO  │
     │                    │                   │                   │    orders(...)  │
     │                    │                   │                   │─────────────────►
     │                    │                   │                   │                 │
     │                    │                   │                   │ 9. Order Created│
     │                    │                   │                   │    (id=1234)    │
     │                    │                   │                   │◄─────────────────
     │                    │                   │                   │                 │
     │                    │                   │    ┌──────────────┴───────────┐     │
     │                    │                   │    │ REPOSITORY LAYER         │     │
     │                    │                   │    │ - Loop order items       │     │
     │                    │                   │    └──────────────┬───────────┘     │
     │                    │                   │                   │                 │
     │                    │                   │                   │ 10. INSERT INTO │
     │                    │                   │                   │     order_items │
     │                    │                   │                   │     (order_id,  │
     │                    │                   │                   │      food_item, │
     │                    │                   │                   │      quantity)  │
     │                    │                   │                   │─────────────────►
     │                    │                   │                   │    [Loop 3x]    │
     │                    │                   │                   │                 │
     │                    │                   │                   │ 11. Items Added │
     │                    │                   │                   │     (3 rows)    │
     │                    │                   │                   │◄─────────────────
     │                    │                   │                   │                 │
     │                    │                   │    ┌──────────────┴───────────┐     │
     │                    │                   │    │ REPOSITORY LAYER         │     │
     │                    │                   │    │ - Update food inventory  │     │
     │                    │                   │    │ - Verify constraints     │     │
     │                    │                   │    └──────────────┬───────────┘     │
     │                    │                   │                   │                 │
     │                    │                   │                   │ 12. COMMIT TRANS│
     │                    │                   │                   │─────────────────►
     │                    │                   │                   │                 │
     │                    │                   │                   │ 13. COMMITTED   │
     │                    │                   │                   │◄─────────────────
     │                    │                   │                   │                 │
     │                    │                   │    ┌──────────────┴───────────┐     │
     │                    │                   │    │ SERVICE LAYER            │     │
     │                    │                   │    │ - Generate order number  │     │
     │                    │                   │    │ - Send confirmation email│     │
     │                    │                   │    │ - Notify chef            │     │
     │                    │                   │    │ - Clear cart session     │     │
     │                    │                   │    └──────────────┬───────────┘     │
     │                    │                   │                   │                 │
     │                    │                   │    ┌──────────────▼───────────┐     │
     │                    │                   │    │ CONTROLLER LAYER         │     │
     │                    │                   │    │ - Send HTTP 201          │     │
     │                    │                   │    │ - Return order details   │     │
     │                    │                   │    └──────────────┬───────────┘     │
     │                    │                   │                   │                 │
     │                    │                   │ 14. Response 201  │                 │
     │                    │                   │ { order, tracking }                 │
     │                    │                   │◄───────────────────                 │
     │                    │                   │                                     │
     │                    │ 15. Order Success │                                     │
     │                    │◄───────────────────                                     │
     │                    │                                                         │
     │ 16. Display        │                                                         │
     │     Confirmation   │                                                         │
     │     Order #ORD1234 │                                                         │
     │◄────────────────── │                                                         │
     │                    │                                                         │
     │ 17. View Order     │                                                         │
     │     Tracking       │                                                         │
     │─────────────────►  │                                                         │
     │                    │                                                         │

═══════════════════════════════════════════════════════════════════════════════════
TRANSACTION BOUNDARIES:
  ┌─ BEGIN TRANSACTION (Step 6)
  │  • INSERT orders
  │  • INSERT order_items (batch)
  │  • UPDATE food_items.stock_quantity
  └─ COMMIT TRANSACTION (Step 12)
     ↓ On Failure: ROLLBACK ALL

KEY OPERATIONS:
  • Inventory Check: Verify food items available before order creation
  • Price Lock: Capture food_price at order time (denormalized)
  • Atomic Operations: All inserts succeed or all fail (ACID compliance)
  • Order Number Format: ORD-{timestamp}-{random4digits}
  • Response Time Target: < 1000ms (95th percentile)
  • Notification: Async email queue (RabbitMQ/Redis)
═══════════════════════════════════════════════════════════════════════════════════

ERROR HANDLING:
  • Validation Failed (400): Missing fields, invalid quantities
  • Food Unavailable (409): Item out of stock or chef inactive
  • Transaction Failed (500): Database constraint violation → ROLLBACK
  • Payment Failed (402): Payment processing error → Order marked 'pending_payment'
```

---

## Technology Stack

### Frontend Stack

| Component | Technology | Version | Status | Purpose |
|-----------|-----------|---------|--------|---------|
| **Framework** | React | 18+ | ✅ | UI component library |
| **Build Tool** | Create React App | Latest | ✅ | Development and build setup |
| **HTTP Client** | Axios | 1.x | ✅ | API communication |
| **State Management** | React useState/useContext | - | ✅ | Local state management |
| **Routing** | React Router | 6.x | ✅ | Client-side routing |
| **Styling** | CSS | - | ✅ | Component styling |

### Backend Stack

| Component | Technology | Version | Status | Purpose |
|-----------|-----------|---------|--------|---------|
| **Runtime** | Node.js | 18+ | ✅ | JavaScript runtime environment |
| **Framework** | Express | 5.2.1 | ✅ | Web application framework |
| **Database Driver** | pg (node-postgres) | 8.18.0 | ✅ | PostgreSQL client library |
| **CORS** | cors | 2.8.6 | ✅ | Cross-origin resource sharing |

---

# PART III: SYSTEM DESIGN & APIs

> **Purpose:** Detailed system design, component organization, data models, and API specifications

---

## System Components

### Backend Module Structure

```
backend/
├── src/
│   ├── app.js                  # Express app configuration
│   ├── server.js               # Server entry point
│   │
│   ├── config/
│   │   └── db.js               # Database connection pool
│   │
│   ├── controllers/            # HTTP request handlers
│   │   ├── userController.js   # User-related endpoints
│   │   ├── foodController.js   # Food-related endpoints
│   │   └── orderController.js  # Order-related endpoints
│   │
│   ├── services/               # Business logic layer
│   │   ├── userService.js      # User business logic
│   │   ├── foodService.js      # Food business logic
│   │   └── orderService.js     # Order business logic (if exists)
│   │
│   ├── repositories/           # Data access layer
│   │   ├── userRepository.js   # User data operations
│   │   ├── foodRepository.js   # Food data operations
│   │   └── orderRepository.js  # Order data operations (if exists)
│   │
│   └── routes/                 # API route definitions
│       ├── userRoutes.js       # /api/users routes
│       ├── foodRoutes.js       # /api/foods routes
│       └── orderRoutes.js      # /api/orders routes
│
└── package.json                # Dependencies and scripts
```

### Component Flow

```
HTTP Request
    ↓
Routes (Define endpoints)
    ↓
Controllers (Handle request/response)
    ↓
Services (Business logic)
    ↓
Repositories (Data access)
    ↓
Database (PostgreSQL)
    ↓
Repositories (Return results)
    ↓
Services (Process results)
    ↓
Controllers (Format response)
    ↓
HTTP Response
```

---

## Data Architecture

### Database Schema

#### Entity Relationship Diagram

> 📊 **Database Schema**: Simple 4-table schema for the CookNest MVP implementation.

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                         COOKNEST DATABASE SCHEMA (ERD)                          │
│                          Entity-Relationship Diagram                            │
│                           Implementation (MVP)                          │
└─────────────────────────────────────────────────────────────────────────────────┘

                            ┌──────────────────────────┐
                            │       users              │
                            ├──────────────────────────┤
                            │ PK id: SERIAL            │
                            │    name: VARCHAR(100)    │
                            │ UK email: VARCHAR(100)   │
                            │    password: VARCHAR(100)│
                            └─────────────┬────────────┘
                                          │
                                          │ 1:N
                                          │
                                          ▼
                      ┌────────────────────────────────┐
                      │     orders                     │
                      ├────────────────────────────────┤
                      │ PK id: SERIAL                  │
                      │ FK user_id: INTEGER            │
                      │    total_amount: DECIMAL(10,2) │
                      │    payment_method: VARCHAR(50) │
                      │    created_at: TIMESTAMP       │
                      │       DEFAULT CURRENT_TIMESTAMP│
                      └──────────────┬─────────────────┘
                                     │
                                     │ 1:N
                                     │
                                     ▼
           ┌─────────────────────────────────────────┐
           │   order_items                           │
           ├─────────────────────────────────────────┤
           │ PK id: SERIAL                           │
           │ FK order_id: INTEGER                    │
           │ FK food_item_id: INTEGER                │
           │    quantity: INTEGER                    │
           │    food_name: VARCHAR(100)              │ ← Denormalized
           │    food_price: DECIMAL(10,2)            │ ← for historical accuracy
           └──────────────┬──────────────────────────┘
                          │
                          │ N:1
                          │
                          ▼
              ┌───────────────────────────┐
              │     food_items            │
              ├───────────────────────────┤
              │ PK id: SERIAL             │
              │    name: VARCHAR(100)     │
              │    description: TEXT      │
              │    price: DECIMAL(10,2)   │
              └───────────────────────────┘
```

**Key Relationships:**
- users → orders (1:N) - One user can place multiple orders
- orders → order_items (1:N) - Each order contains multiple line items
- food_items → order_items (1:N) - Food items can appear in multiple orders
- order_items has denormalized fields (food_name, food_price) to preserve historical data

**Schema File:**
- `database/schema.sql` - Current implementation with 4 tables

#### Table Descriptions

> **Note:** Current implementation uses a simple 4-table schema. See `database/schema.sql` for the complete schema definition.

##### Core Tables

**users** - User accounts and authentication
| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL PRIMARY KEY | Unique user identifier |
| name | VARCHAR(100) | User's full name |
| email | VARCHAR(100) UNIQUE | User's email (login) |
| password | VARCHAR(100) | User password (plain text in MVP, should be hashed) |

**food_items** - Menu items available for ordering
| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL PRIMARY KEY | Food item identifier |
| name | VARCHAR(100) | Food item name |
| description | TEXT | Detailed description of the food item |
| price | DECIMAL(10,2) | Item price |

**orders** - Customer orders
| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL PRIMARY KEY | Order identifier |
| user_id | INT FK → users(id) | Customer who placed order |
| total_amount | DECIMAL(10,2) | Total order value |
| created_at | TIMESTAMP | Order creation timestamp (default: CURRENT_TIMESTAMP) |
| payment_method | VARCHAR(50) | Payment method used |

**order_items** - Order line items (denormalized for historical accuracy)
| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL PRIMARY KEY | Line item identifier |
| order_id | INT FK → orders(id) | Associated order |
| food_item_id | INT FK → food_items(id) | Food item reference |
| quantity | INTEGER | Quantity ordered |
| food_name | VARCHAR(100) | Snapshot of food name at order time |
| food_price | DECIMAL(10,2) | Snapshot of price at order time |

>  **Design Note:** The `order_items` table uses denormalization (storing `food_name` and `food_price`) to preserve historical accuracy. This ensures that even if a food item's name or price changes, past orders retain the correct information as it was at the time of purchase.
| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL PRIMARY KEY | Reset token identifier |
| user_id | INT FK | User requesting reset |
| token | VARCHAR(255) UNIQUE | Reset token |
| used | BOOLEAN | Token usage flag |

**delivery_zones** - Chef service areas
| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL PRIMARY KEY | Zone identifier |
| chef_id | INT FK | Chef defining zone |
| polygon | GEOMETRY | Geographic boundary |
| min_order_amount | DECIMAL(10,2) | Minimum order value |

**payments** - Payment transaction records
| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL PRIMARY KEY | Payment identifier |
| order_id | INT UNIQUE FK | Associated order (1:1) |
| amount | DECIMAL(10,2) | Payment amount |
| stripe_payment_id | VARCHAR(255) | External payment reference |
| status | VARCHAR(20) | Payment status |

**reviews** - Rating and review system
| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL PRIMARY KEY | Review identifier |
| order_id | INT FK | Order being reviewed |
| user_id | INT FK | Reviewer |
| chef_id | INT FK | Chef being rated |
| food_item_id | INT FK | Optional: specific item review |
| rating | INTEGER | Rating (1-5) |
| comment | TEXT | Review text |

**audit_logs** - Security and compliance tracking
| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL PRIMARY KEY | Log entry identifier |
| user_id | INT FK | User performing action |
| action | VARCHAR(50) | Action type |
| entity_type | VARCHAR(50) | Affected entity |
| old_values, new_values | JSONB | Change tracking |

### Data Integrity

**Referential Integrity:**
- 17 foreign key relationships enforce data consistency across all 12 tables
- CASCADE deletes for dependent records (sessions, password_resets, audit_logs)
- RESTRICT deletes for business-critical references (orders, payments)

**Unique Constraints:**
- users.email - Prevent duplicate accounts
- chefs.user_id - Enforce 1:1 relationship between users and chef profiles
- orders.order_number - Unique order tracking
- payments.order_id - One payment per order (1:1 relationship)

**Data Snapshots (Denormalization):**
- order_items stores food_name and food_price at order time
- Maintains accurate historical records even if menu items change

**Business Rules Enforcement:**
- User roles validated: 'customer', 'chef', 'admin'
- Order status workflow: pending → confirmed → preparing → delivered
- Payment status tracking: pending → processing → paid/failed
- Rating constraints: 1-5 stars only
- Check constraints on amounts (must be > 0)

**Data Validation:**
- Email format validation
- Password strength requirements (min 8 characters)
- Price and amount fields validated as positive decimals
- Required fields enforced with NOT NULL constraints

---

## API Architecture

### RESTful API Design

#### Base URL
```
http://localhost:<port>/api
```

#### API Endpoints

> **Current Implementation:** The following endpoints are currently implemented in the application.

##### User Management (`/api/users`)
| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| POST | `/api/users/register` | Register new user | `{ name, email, password }` | `{ id, name, email, password }` |
| POST | `/api/users/login` | Authenticate user | `{ email, password }` | User object or 401 error |

**Example - Register:**
```json
// Request
POST /api/users/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

// Response (201 Created)
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Example - Login:**
```json
// Request
POST /api/users/login
{
  "email": "john@example.com",
  "password": "password123"
}

// Response (200 OK)
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

// Response (401 Unauthorized)
{
  "message": "Invalid credentials"
}
```

##### Food Management (`/api/foods`)
| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/api/foods` | Get all food items | - | Array of food items |
| GET | `/api/foods/:id` | Get specific food item | - | Food item object or 404 |

**Example - Get All Foods:**
```json
// Request
GET /api/foods

// Response (200 OK)
[
  {
    "id": 1,
    "name": "Red Pasta",
    "description": "Penne pasta with red sauce",
    "price": "150.00"
  },
  {
    "id": 2,
    "name": "White Pasta",
    "description": "Penne pasta with white sauce",
    "price": "150.00"
  }
]
```

**Example - Get Food by ID:**
```json
// Request
GET /api/foods/1

// Response (200 OK)
{
  "id": 1,
  "name": "Red Pasta",
  "description": "Penne pasta with red sauce",
  "price": "150.00"
}

// Response (404 Not Found)
{
  "error": "Food item not found"
}
```

##### Order Management (`/api/orders`)
| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| POST | `/api/orders` | Create new order | `{ userId, foods[], total, paymentMethod }` | `{ orderId }` |
| GET | `/api/orders` | Get all orders | - | Array of orders with items |

**Example - Create Order:**
```json
// Request
POST /api/orders
{
  "userId": 1,
  "foods": [
    {
      "id": 1,
      "name": "Red Pasta",
      "price": "150.00"
    },
    {
      "id": 4,
      "name": "Veg Cheese Corn Pizza",
      "price": "350.00"
    }
  ],
  "total": "500.00",
  "paymentMethod": "credit_card"
}

// Response (201 Created)
{
  "orderId": 1
}

// Response (400 Bad Request)
{
  "error": "Invalid order data"
}
```

**Example - Get All Orders:**
```json
// Request
GET /api/orders

// Response (200 OK)
[
  {
    "id": 1,
    "user_id": 1,
    "total_amount": "500.00",
    "payment_method": "credit_card",
    "created_at": "2026-02-14T10:30:00Z",
    "items": [
      {
        "food_name": "Red Pasta",
        "food_price": "150.00"
      },
      {
        "food_name": "Veg Cheese Corn Pizza",
        "food_price": "350.00"
      }
    ]
  }
]
```

### Request/Response Flow

```
Client (React)
    │
    │ HTTP Request (JSON)
    ▼
Express Router
    │
    │ Route to Controller
    ▼
Controller
    │
    │ Validate & Extract Data
    ▼
Service Layer
    │
    │ Business Logic
    ▼
Repository Layer
    │
    │ SQL Query
    ▼
PostgreSQL Database
    │
    │ Result Set
    ▼
Repository Layer
    │
    │ Map to Objects
    ▼
Service Layer
    │
    │ Process & Transform
    ▼
Controller
    │
    │ Format Response (JSON)
    ▼
Client (React)
```

### Error Handling Strategy

```javascript
// Standardized error response format
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {} // Optional additional context
  }
}
```

---

## Data Flow Diagrams

Data Flow Diagrams (DFD) show how data moves through the CookNest system, including processes, data stores, and external entities.

### Level 0 DFD - Context Diagram

```
                    Customer
                       │
                       │ User credentials,
                       │ Food selections,
                       │ Order data
                       │
                       ▼
            ┌──────────────────────┐
            │                      │────── Order confirmations
            │   CookNest System    │────── Food catalog
            │                      │────── User account info
            └──────────────────────┘
                       │
                       │ Store/Retrieve
                       │ Data
                       ▼
                  PostgreSQL
                  Database
```

### Level 1 DFD - System Processes

```
┌────────────┐
│  Customer  │
└─────┬──────┘
      │
      │ 1. Login credentials
      ▼
┌───────────────────┐         ┌──────────────────┐
│   1.0 User        │────────▶│  D1: users       │
│   Authentication  │  Store  │  (Database)      │
│                   │◀────────│                  │
└─────┬─────────────┘ Verify  └──────────────────┘
      │
      │ 2. Auth token
      ▼
┌───────────────────┐         ┌──────────────────┐
│   2.0 Browse      │────────▶│  D2: food_items  │
│   Food Catalog    │  Query  │  (Database)      │
│                   │◀────────│                  │
└─────┬─────────────┘ Return  └──────────────────┘
      │
      │ 3. Selected items
      ▼
┌───────────────────┐         ┌──────────────────┐
│   3.0 Order       │────────▶│  D3: orders      │
│   Processing      │  Create │  (Database)      │
│                   │◀────────│                  │
└─────┬─────────────┘ OrderID └──────────────────┘
      │                  │
      │                  │
      │                  ▼
      │            ┌──────────────────┐
      │            │  D4: order_items │
      │            │  (Database)      │
      │            └──────────────────┘
      │
      │ 4. Order confirmation
      ▼
┌────────────┐
│  Customer  │
└────────────┘
```

### Level 2 DFD - Detailed Order Processing

```
                    Customer
                       │
                       │ Cart items
                       ▼
            ┌──────────────────────┐
            │  3.1 Validate Cart   │
            │      Items           │
            └──────┬───────────────┘
                   │
                   │ Validated items
                   ▼
            ┌──────────────────────┐         ┌──────────────┐
            │  3.2 Calculate       │────────▶│ D2: food     │
            │      Totals          │  Fetch  │    _items    │
            └──────┬───────────────┘  Prices └──────────────┘
                   │
                   │ Total amount
                   ▼
            ┌──────────────────────┐
            │  3.3 Process         │ (Future)
            │      Payment         │────────▶ Payment Gateway
            └──────┬───────────────┘
                   │
                   │ Payment confirmed
                   ▼
            ┌──────────────────────┐         ┌──────────────┐
            │  3.4 Create Order    │────────▶│ D3: orders   │
            │      Record          │  Store  │              │
            └──────┬───────────────┘         └──────────────┘
                   │
                   │ Order ID
                   ▼
            ┌──────────────────────┐         ┌──────────────┐
            │  3.5 Create Order    │────────▶│ D4: order    │
            │      Items           │  Store  │    _items    │
            └──────┬───────────────┘         └──────────────┘
                   │
                   │ Confirmation
                   ▼
                 Customer
```

### Data Flow Specifications

#### Process: 1.0 User Authentication
| Aspect | Description |
|--------|-------------|
| **Inputs** | Email, password (from Customer) |
| **Processing** | Validate credentials, hash password, verify against database |
| **Outputs** | Authentication token, user profile data |
| **Data Stores** | D1: users (read) |

#### Process: 2.0 Browse Food Catalog
| Aspect | Description |
|--------|-------------|
| **Inputs** | Search query, filters (from Customer) |
| **Processing** | Query food items, apply filters, format results |
| **Outputs** | List of food items with details |
| **Data Stores** | D2: food_items (read) |

#### Process: 3.0 Order Processing
| Aspect | Description |
|--------|-------------|
| **Inputs** | Cart items, user ID, payment info |
| **Processing** | Validate items, calculate total, process payment, create order |
| **Outputs** | Order confirmation, order ID |
| **Data Stores** | D2: food_items (read), D3: orders (write), D4: order_items (write) |

---

### Use Case Diagram

The Use Case diagram shows the functional requirements of the system from the user's perspective.

The Use Case diagram shows the functional requirements of the system from the user's perspective.

```
                    CookNest System
    ┌─────────────────────────────────────────────────┐
    │                                                 │
    │   ┌──────────────────┐                          │
    │   │ Register Account │                          │
    │   └────────┬─────────┘                          │
    │            │                                    │
    │   ┌────────▼─────────┐                          │
    │   │      Login       │                          │
    │   └────────┬─────────┘                          │
    │            │                                    │
┌───┴───┐   ┌───▼──────────────┐   ┌──────────────┐   │
│       │   │   Browse Food    │   │ Manage Food  │   │
│Customer│  │    Catalog       │   │    Items     │   │
│       │   └───┬──────────────┘   └──────┬───────┘   │
└───┬───┘       │                         │           │
    │   ┌───────▼──────────┐              │           │
    │   │  Search Food     │              │           │
    │   └───┬──────────────┘              │           │
    │       │                             │           │
    │   ┌───▼──────────────┐   ┌──────────▼───────┐   │
    │   │   Place Order    │   │  View Received   │   │
    │   └───┬──────────────┘   │     Orders       │   │
    │       │                  └──────────┬───────┘   │
    │   ┌───▼──────────────┐             │            │
    │   │  Process Payment │             │            │
    │   └───┬──────────────┘             │      ┌───┴────┐
    │       │                            │      │        │
    │   ┌───▼──────────────┐             │      │ Home   │
    │   │  View Order      │             │      │ Chef   │
    │   │    History       │             │      │        │
    │   └──────────────────┘             │      └───┬────┘
    │                                    │          │
    │                       ┌────────────▼──────────▼───┐
    │                       │  Update Order Status      │
    │                       └───────────────────────────┘
    │                                                 │
    │   ┌──────────────────────────────┐              │
    │   │   Manage Users               │              │
    │   └────────┬─────────────────────┘              │
    │            │                                    │
    │   ┌────────▼─────────────────────┐              │
    │   │   View System Reports        │              │
    │   └────────┬─────────────────────┘              │
    │            │                                    │
    │   ┌────────▼─────────────────────┐              │
    │   │   Monitor System             │              │
    │   └──────────────────────────────┘              │
    │                                                 │
    └─────────────────────────────────────────────────┘
                         │
                    ┌────┴────┐
                    │         │
                    │  Admin  │
                    │         │
                    └─────────┘
```

#### Use Case Descriptions

| Use Case | Actor | Description | Preconditions |
|----------|-------|-------------|---------------|
| Register Account | Customer, Home Chef | Create a new user account | Valid email, password |
| Login | All Users | Authenticate to access the system | Active account |
| Browse Food Catalog | Customer | View available food items | None |
| Search Food | Customer | Find specific food items | None |
| Place Order | Customer | Create a new food order | Logged in, items in cart |
| Process Payment | Customer | Pay for the order | Order created |
| View Order History | Customer | See past orders | Logged in |
| Manage Food Items | Home Chef | Add, update, delete food items | Logged in as chef |
| View Received Orders | Home Chef | See orders for their food | Logged in as chef |
| Update Order Status | Home Chef | Mark order as prepared/delivered | Order exists |
| Manage Users | Admin | Create, update, delete users | Logged in as admin |
| View System Reports | Admin | Access analytics and reports | Logged in as admin |
| Monitor System | Admin | Check system health and performance | Logged in as admin |

---

## Class Diagram

> **Current Implementation:** Class diagram reflecting the actual MVP implementation with 4-table schema and simplified layered architecture.

The Class diagram shows the structure of the system's domain model with classes, attributes, methods, and relationships.

### Domain Model Layer

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         DOMAIN MODELS                                   │
└─────────────────────────────────────────────────────────────────────────┘

┌────────────────────────┐
│      «entity»          │
│        User            │
├────────────────────────┤
│ - id: Integer          │
│ - name: String(100)    │
│ - email: String(100)   │  ← UNIQUE
│ - password: String(100)│   Plain text (MVP)
└──────────┬─────────────┘
           │
           │ 1        places
           │
           ▼ *
┌────────────────────────┐
│      «entity»          │
│        Order           │
├────────────────────────┤
│ - id: Integer          │
│ - userId: Integer      │  ← FK to User
│ - totalAmount: Decimal │
│ - paymentMethod: String│
│ - createdAt: Timestamp │
└──────────┬─────────────┘
           │
           │ 1     contains
           │
           ▼ *
┌────────────────────────┐                  ┌────────────────────────┐
│      «entity»          │                  │      «entity»          │
│      OrderItem         │      *           │      FoodItem          │
├────────────────────────┤  ─────────────►  ├────────────────────────┤
│ - id: Integer          │  references      │ - id: Integer          │
│ - orderId: Integer     │       1          │ - name: String(100)    │
│ - foodItemId: Integer  │                  │ - description: Text    │
│ - quantity: Integer    │                  │ - price: Decimal(10,2) │
│ - foodName: String(100)│  ← Denormalized  └────────────────────────┘
│ - foodPrice: Decimal   │  ← for history
└────────────────────────┘
```

### Application Layer - Controllers

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         CONTROLLER LAYER                                │
│                    (HTTP Request/Response Handlers)                     │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────┐  ┌─────────────────────────┐  ┌──────────────────────────┐
│   «controller»          │  │   «controller»          │  │   «controller»           │
│   UserController        │  │   FoodController        │  │   OrderController        │
├─────────────────────────┤  ├─────────────────────────┤  ├──────────────────────────┤
│                         │  │                         │  │                          │
│ + register(req, res)    │  │ + getFoods(req, res)    │  │ + placeOrder(req, res)   │
│   • Extract body        │  │   • Call service        │  │   • Validate input       │
│   • Call service        │  │   • Return JSON array   │  │   • Direct db.query()    │
│   • Return 201 + user   │  │                         │  │   • Insert order         │
│                         │  │ + getFoodById(req, res) │  │   • Insert order_items   │
│ + login(req, res)       │  │   • Extract params      │  │   • Return orderId       │
│   • Extract body        │  │   • Call service        │  │                          │
│   • Call service        │  │   • Return item or 404  │  │ + getOrders(req, res)    │
│   • Return user or 401  │  │                         │  │   • Query all orders     │
│                         │  │                         │  │   • Join order_items     │
└───────────┬─────────────┘  └───────────┬─────────────┘  │   • Return orders array  │
            │                            │                │                          │
            │ uses                       │ uses           │                          │
            ▼                            ▼                └──────────────────────────┘
```

### Business Logic Layer - Services

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         SERVICE LAYER                                   │
│                      (Business Logic)                                   │
└─────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────┐  ┌──────────────────────────┐  
│   «service»              │  │   «service»              │  
│   UserService            │  │   FoodService            │     
├──────────────────────────┤  ├──────────────────────────┤  
│                          │  │                          │  
│ + register(user): User   │  │ + listFoodItems(): []    │  
│   • Call repository      │  │   • Call repository      │  
│   • Return user object   │  │   • Return results       │  
│                          │  │                          │  
│ + login(credentials)     │  │ + getFoodItemById(id)    │  
│   • findByEmail()        │  │   • Call repository      │  
│   • Compare password     │  │   • Return result        │  
│   • Return user or null  │  │                          │  
│                          │  │                          │  
└───────────┬──────────────┘  └───────────┬──────────────┘  
            │                             │                 
            │ uses                        │ uses            
            ▼                             ▼                 
```

### Data Access Layer - Repositories

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         REPOSITORY LAYER                                │
│                      (Database Operations)                              │
└─────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────┐  ┌────────────────────────────┐  
│   «repository»             │  │   «repository»             │  
│   UserRepository           │  │   FoodRepository           │     
├────────────────────────────┤  ├────────────────────────────┤  
│                            │  │                            │  
│ + createUser(user)         │  │ + getAllFoodItems()        │  
│   • SQL: INSERT INTO users │  │   • SQL: SELECT * FROM     │  
│   • RETURNING *            │  │     food_items             │  
│   • Return result.rows[0]  │  │   • Return result          │  
│                            │  │                            │  
│ + findByEmail(email)       │  │ + getFoodItemById(id)      │  
│   • SQL: SELECT * FROM     │  │   • SQL: SELECT * WHERE    │  
│     users WHERE email=$1   │  │     id = $1                │  
│   • Return result          │  │   • Return result          │  
│                            │  │                            │  
└──────────────┬─────────────┘  └──────────────┬─────────────┘  
               │                               │                
               │ uses pg Pool                  │ uses pg Pool   
               ▼                               ▼                
        ┌──────────────────────────────────────────────┐        
        │   «database config»                          │        
        │   db.js (PostgreSQL Connection Pool)         │        
        ├──────────────────────────────────────────────┤        
        │ - pool: Pool                                 │        
        │ + query(text, params): Promise<Result>       │        
        │   • Execute SQL query                        │        
        │   • Return query result                      │        
        └──────────────────────────────────────────────┘        
                         │                                       
                         │ connects to                           
                         ▼                                       
                ┌─────────────────┐                              
                │   PostgreSQL    │                              
                │    Database     │                              
                └─────────────────┘                              
```

### Class Relationships Summary

```
┌────────────────────────────────────────────────────────────────────┐
│                    RELATIONSHIP DIAGRAM                            │
└────────────────────────────────────────────────────────────────────┘

         User (1) ────────places────────► (N) Order
                                              │
                                              │ contains
                                              ▼
                                         OrderItem (N)
                                              │
                                              │ references
                                              ▼
                                         FoodItem (1)

┌─────────────────────────────────────────────────────────────────────┐
│ Key:                                                                │
│   1   = One                                                         │
│   N   = Many                                                        │
│   FK  = Foreign Key                                                 │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Sequence Diagrams

Sequence diagrams show how objects interact in a particular scenario, focusing on the order of messages exchanged.

#### User Registration Sequence

```
┌──────┐       ┌────────┐      ┌──────────┐     ┌─────────┐     ┌──────────┐
│Client│       │  API   │      │Controller│     │ Service │     │Repository│
└──┬───┘       └───┬────┘      └────┬─────┘     └────┬────┘     └────┬─────┘
   │               │                │                │               │
   │ POST /register│                │                │               │
   ├──────────────>│                │                │               │
   │               │ register()     │                │               │
   │               ├───────────────>│                │               │
   │               │                │ validateInput()│               │
   │               │                ├───────────────>│               │
   │               │                │                │ findByEmail() │
   │               │                │                ├──────────────>│
   │               │                │                │               │
   │               │                │                │ null (not found)
   │               │                │                │<──────────────┤
   │               │                │ hashPassword() │               │
   │               │                │<───────────────┤               │
   │               │                │                │               │
   │               │                │ createUser()   │               │
   │               │                ├───────────────>│               │
   │               │                │                │ insertUser()  │
   │               │                │                ├──────────────>│
   │               │                │                │               │
   │               │                │                │ newUser       │
   │               │                │                │<──────────────┤
   │               │                │ user           │               │
   │               │                │<───────────────┤               │
   │               │ 201 Created    │                │               │
   │               │<───────────────┤                │               │
   │ 201 + userData│                │                │               │
   │<──────────────┤                │                │               │
   │               │                │                │               │
```

#### Order Placement Sequence

```
┌──────┐  ┌──────┐  ┌──────────┐  ┌─────────┐  ┌──────────┐  ┌──────────┐
│Client│  │ Auth │  │Order Ctrl│  │Order Svc│  │Food Repo │  │Order Repo│
└──┬───┘  └──┬───┘  └────┬─────┘  └────┬────┘  └────┬─────┘  └────┬─────┘
   │          │           │             │            │             │
   │POST /orders + JWT    │             │            │             │
   ├─────────────────────>│             │            │             │
   │          │ verifyJWT()│            │            │             │
   │          │<──────────┤             │            │             │
   │          │ valid      │            │            │             │
   │          ├───────────>│            │            │             │
   │          │           │ createOrder │            │             │
   │          │           ├────────────>│             │            │
   │          │           │             │ validateCart│            │
   │          │           │             ├────────────>│            │
   │          │           │             │ getFoodItems│            │
   │          │           │             ├────────────>│            │
   │          │           │             │             │            │
   │          │           │             │ foodItems[] │            │
   │          │           │             │<────────────┤            │
   │          │           │             │ calcTotal() │            │
   │          │           │             │             │            │
   │          │           │             │ BEGIN TRANSACTION        │
   │          │           │             ├─────────────────────────>│
   │          │           │             │             │ insertOrder│
   │          │           │             ├─────────────────────────>│
   │          │           │             │             │ orderId    │
   │          │           │             │<─────────────────────────┤
   │          │           │             │ insertOrderItems         │
   │          │           │             ├─────────────────────────>│
   │          │           │             │             │ success    │
   │          │           │             │<─────────────────────────┤
   │          │           │             │ COMMIT TRANSACTION       │
   │          │           │             ├─────────────────────────>│
   │          │           │ order       │             │            │
   │          │           │<────────────┤             │            │
   │          │ 201 Created│            │             │            │
   │          │<───────────┤            │             │            │
   │ 201 + orderData       │            │             │            │
   │<──────────────────────┤            │             │            │
   │          │            │            │             │            │
```

#### Authentication Flow Sequence

```
┌──────┐  ┌──────┐  ┌──────────┐  ┌─────────┐  ┌──────────┐  ┌──────────┐
│Client│  │ API  │  │User Ctrl │  │User Svc │  │User Repo │  │JWT Svc   │
└──┬───┘  └──┬───┘  └────┬─────┘  └────┬────┘  └────┬─────┘  └────┬─────┘
   │         │           │             │            │             │
   │POST /login          │             │            │             │
   ├────────>│           │             │            │             │
   │         │ login()   │             │            │             │
   │         ├──────────>│             │            │             │
   │         │           │ authenticate│            │             │
   │         │           ├────────────>│            │             │
   │         │           │             │ findByEmail│             │
   │         │           │             ├───────────>│             │
   │         │           │             │            │             │
   │         │           │             │ userRecord │             │
   │         │           │             │<───────────┤             │
   │         │           │ verifyPassword(bcrypt)   │             │
   │         │           │             │            │             │
   │         │           │             │ valid ✓    │             │
   │         │           │             │            │             │
   │         │           │             │ generateJWT│             │
   │         │           │             ├───────────────────────>  │
   │         │           │             │            │ JWT token   │
   │         │           │             │<───────────────────────┤ │
   │         │           │ token + user│            │             │
   │         │           │<────────────┤            │             │
   │         │ 200 OK + token          │            │             │
   │         │<──────────┤             │            │             │
   │ 200 + JWT + user    │             │            │             │
   │<────────┤           │             │            │             │
   │         │           │             │            │             │
```

---

## Activity Diagram

Activity diagrams show the workflow and business process logic, particularly for complex operations.

#### Order Processing Workflow

```
                    [Start: Customer places order]
                              │
                              ▼
                    ┌─────────────────────┐
                    │ Validate cart items │
                    └──────────┬──────────┘
                              │
                              ▼
                    ┌─────────────────────┐
                    │  Check item         │
                    │  availability       │
                    └──────────┬──────────┘
                              │
                 ┌────────────┴────────────┐
                 │                         │
          [Items Available]          [Items Unavailable]
                 │                         │
                 ▼                         ▼
      ┌──────────────────┐      ┌──────────────────┐
      │ Calculate total  │      │ Return error:    │
      │ amount           │      │ Items unavailable│
      └─────────┬────────┘      └────────┬─────────┘
                │                        │
                ▼                        ▼
      ┌──────────────────┐           [End: Order failed]
      │ Validate user    │
      │ authentication   │
      └─────────┬────────┘
                │
   ┌────────────┴────────────┐
   │                         │
[Authenticated]        [Not Authenticated]
   │                         │
   ▼                         ▼
┌──────────────┐   ┌────────────────────┐
│ Create order │   │ Return 401         │
│ record       │   │ Unauthorized       │
└──────┬───────┘   └──────────┬─────────┘
       │                      │
       ▼                      ▼
┌──────────────────┐      [End: Auth failed]
│ Begin database   │
│ transaction      │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│ Insert order     │
│ into orders table│
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│ Insert order     │
│ items            │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│ Update food item │
│ quantities       │
│ (if applicable)  │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│ Commit           │
│ transaction      │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│ Send order       │
│ confirmation     │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│ Return order     │
│ details to client│
└──────┬───────────┘
       │
       ▼
   [End: Order successful]


Parallel Activities (Future):
┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐
│ Send email       │    │ Notify chef      │    │ Update analytics │
│ notification     │    │ of new order     │    │ dashboard        │
└──────────────────┘    └──────────────────┘    └──────────────────┘
```

---

## State Diagram

State diagrams show the different states an object can be in and the transitions between those states.

#### Order State Diagram

```
                    [Order Created]
                          │
                          │ create
                          ▼
                   ┌──────────────┐
              ┌────│   PENDING    │
              │    └──────┬───────┘
              │           │ confirm payment
              │           ▼
              │    ┌──────────────┐
              │    │  CONFIRMED   │
              │    └──────┬───────┘
              │           │ chef accepts
              │           ▼
   cancel     │    ┌──────────────┐
              │    │ PREPARING    │
              │    └──────┬───────┘
              │           │ mark ready
              │           ▼
              │    ┌──────────────┐
              │    │    READY     │
              │    └──────┬───────┘
              │           │ out for delivery
              │           ▼
              │    ┌──────────────┐
              │    │ IN_TRANSIT   │
              │    └──────┬───────┘
              │           │ customer confirms
              │           ▼
              │    ┌──────────────┐
              └───▶│  DELIVERED   │
                   └──────┬───────┘
                          │ rating submitted
                          ▼
                   ┌──────────────┐
                   │  COMPLETED   │
                   └──────────────┘


States from PENDING can transition to:
                   ┌──────────────┐
              ┌────│   PENDING    │
              │    └──────┬───────┘
              │           │
     cancel   │           │ payment fails
              │           ▼
              │    ┌──────────────┐
              └───▶│  CANCELLED   │
                   └──────────────┘
                          │
                          ▼
                   [Terminal State]

States from CONFIRMED/PREPARING can transition to:
                   ┌──────────────┐
                   │ CONFIRMED/   │
                   │ PREPARING    │
                   └──────┬───────┘
                          │ chef rejects or issue
                          ▼
                   ┌──────────────┐
                   │   REJECTED   │
                   └──────────────┘
                          │
                          ▼
                   [Terminal State]


Complete State Transition Table:
┌──────────────┬─────────────────────────────────────────┐
│ Current State│ Possible Transitions                    │
├──────────────┼─────────────────────────────────────────┤
│ PENDING      │ → CONFIRMED (payment)                   │
│              │ → CANCELLED (cancel)                    │
├──────────────┼─────────────────────────────────────────┤
│ CONFIRMED    │ → PREPARING (chef accepts)              │
│              │ → REJECTED (chef rejects)               │
│              │ → CANCELLED (cancel)                    │
├──────────────┼─────────────────────────────────────────┤
│ PREPARING    │ → READY (completed cooking)             │
│              │ → CANCELLED (mutual agreement)          │
├──────────────┼─────────────────────────────────────────┤
│ READY        │ → IN_TRANSIT (pickup/delivery starts)   │
├──────────────┼─────────────────────────────────────────┤
│ IN_TRANSIT   │ → DELIVERED (customer receives)         │
├──────────────┼─────────────────────────────────────────┤
│ DELIVERED    │ → COMPLETED (rating/feedback submitted) │
├──────────────┼─────────────────────────────────────────┤
│ CANCELLED    │ [Terminal - no transitions]             │
├──────────────┼─────────────────────────────────────────┤
│ REJECTED     │ [Terminal - no transitions]             │
├──────────────┼─────────────────────────────────────────┤
│ COMPLETED    │ [Terminal - no transitions]             │
└──────────────┴─────────────────────────────────────────┘
```

#### User Account State Diagram

```
                [Registration]
                      │
                      │ submit form
                      ▼
               ┌──────────────┐
               │   PENDING    │
               │ VERIFICATION │
               └──────┬───────┘
                      │ verify email
                      ▼
               ┌──────────────┐
          ┌────│    ACTIVE    │────┐
          │    └──────┬───────┘    │
          │           │            │
  suspend │           │ login      │ deactivate
          │           ▼            │
          │    ┌──────────────┐    │
          │    │ AUTHENTICATED│    │
          │    └──────┬───────┘    │
          │           │ logout     │
          │           ▼            │
          │    ┌──────────────┐    │
          └───▶│  SUSPENDED   │◀───┘
               └──────┬───────┘
                      │ delete account
                      ▼
               ┌──────────────┐
               │   DELETED    │
               └──────────────┘
                      │
                      ▼
              [Terminal State]
```

---

## Deployment Diagram

The Deployment diagram shows the physical architecture and how software components are deployed on hardware and cloud infrastructure.

```
┌─────────────────────────────────────────────────────────────────────┐
│                          AWS Cloud / Production Environment         │
│                                                                     │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │                      Availability Zone 1                       │ │
│  │                                                                │ │
│  │  ┌─────────────────────────────────────────────────────────┐   │ │
│  │  │  «device» EC2 Instance                                  │   │ │
│  │  │  t3.medium (2 vCPU, 4GB RAM)                            │   │ │
│  │  │                                                         │   │ │
│  │  │  ┌───────────────────────────────────────────────────┐  │   │ │
│  │  │  │ «execution environment» Docker Container          │  │   │ │
│  │  │  │                                                   │  │   │ │
│  │  │  │  ┌─────────────────────────────────────┐          │  │   │ │
│  │  │  │  │ «artifact» Node.js Application      │          │  │   │ │
│  │  │  │  │                                     │          │  │   │ │
│  │  │  │  │  - Express Web Server               │          │  │   │ │
│  │  │  │  │  - API Controllers                  │          │  │   │ │
│  │  │  │  │  - Business Services                │          │  │   │ │
│  │  │  │  │  - Data Repositories                │          │  │   │ │
│  │  │  │  │                                     │          │  │   │ │
│  │  │  │  │  Port: 5000                         │          │  │   │ │
│  │  │  │  └─────────────────────────────────────┘          │  │   │ │
│  │  │  │                                                   │  │   │ │
│  │  │  └───────────────────────────────────────────────────┘  │   │ │
│  │  └─────────────────────────────────────────────────────────┘   │ │
│  │                                                                │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                                                     │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │                      Availability Zone 2                       │ │
│  │                                                                │ │
│  │  ┌─────────────────────────────────────────────────────────┐   │ │
│  │  │  «device» EC2 Instance                                  │   │ │
│  │  │  t3.medium (2 vCPU, 4GB RAM)                            │   │ │
│  │  │                                                         │   │ │
│  │  │  ┌───────────────────────────────────────────────────┐  │   │ │
│  │  │  │ «execution environment» Docker Container          │  │   │ │
│  │  │  │                                                   │  │   │ │
│  │  │  │  ┌─────────────────────────────────────┐          │  │   │ │
│  │  │  │  │ «artifact» Node.js Application      │          │  │   │ │
│  │  │  │  │  (Same as AZ1)                      │          │  │   │ │
│  │  │  │  └─────────────────────────────────────┘          │  │   │ │
│  │  │  └───────────────────────────────────────────────────┘  │   │ │
│  │  └─────────────────────────────────────────────────────────┘   │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                                                     │
│                              ▲                                      │
│                              │ HTTPS (443)                          │
│                              │                                      │
│  ┌──────────────────────────┴───────────────────────────────────┐   │
│  │  «device» Application Load Balancer                          │   │
│  │  - Health checks                                             │   │
│  │  - SSL/TLS termination                                       │   │
│  │  - Round-robin distribution                                  │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  «device» RDS PostgreSQL Instance                              │ │
│  │  db.t3.medium (2 vCPU, 4GB RAM)                                │ │
│  │                                                                │ │
│  │  ┌──────────────────────────────────────────────────────────┐  │ │
│  │  │ «database» PostgreSQL 14                                 │  │ │
│  │  │                                                          │  │ │
│  │  │  - users, food_items, orders, order_items                │  │ │
│  │  │  - Automated backups                                     │  │ │
│  │  │  - Multi-AZ standby                                      │  │ │
│  │  │                                                          │  │ │
│  │  │  Port: 5432                                              │  │ │
│  │  └──────────────────────────────────────────────────────────┘  │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                                                     │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  «device» S3 Bucket                                            │ │
│  │  - Static assets (React build)                                 │ │
│  │  - Food images                                                 │ │
│  │  - CloudFront CDN distribution                                 │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                                                     │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  «device» ElastiCache Redis Cluster                            │ │
│  │  - Session storage                                             │ │
│  │  - API response caching                                        │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

                              ▲
                              │ HTTPS
                              │
                    ┌─────────▼──────────┐
                    │   «device»         │
                    │   User Browser     │
                    │                    │
                    │   - Chrome/Firefox │
                    │   - React SPA      │
                    └────────────────────┘
```

### Deployment Environment Specifications

| Environment | Purpose | Infrastructure |
|-------------|---------|----------------|
| **Development** | Local development | Docker Compose, localhost PostgreSQL |
| **Staging** | Pre-production testing | AWS EC2 t3.small, RDS db.t3.micro, S3 |
| **Production** | Live environment | AWS EC2 t3.medium x2, RDS db.t3.medium (Multi-AZ), S3 + CloudFront |

### Infrastructure Components

| Component | Technology | Specifications | Purpose |
|-----------|-----------|----------------|---------|
| Load Balancer | AWS ALB | Cross-zone enabled | Distribute traffic, SSL termination |
| Web Server | Node.js + Express | Docker containerized | API server |
| Database | PostgreSQL RDS | Multi-AZ, automated backups | Data persistence |
| Cache | ElastiCache Redis | Cluster mode | Session management, caching |
| CDN | CloudFront + S3 | Global edge locations | Static asset delivery |
| Container Registry | ECR | Private repository | Docker image storage |

---

## Package Diagram

The Package diagram shows how the codebase is organized into logical packages and their dependencies.

```
┌─────────────────────────────────────────────────────────────────────┐
│                        backend (root package)                       │
│                                                                     │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  «package» src                                                 │ │
│  │                                                                │ │
│  │  ┌──────────────────────────────────────────────────────────┐  │ │
│  │  │  «package» routes                                        │  │ │
│  │  │                                                          │  │ │
│  │  │  - userRoutes.js                                         │  │ │
│  │  │  - foodRoutes.js                                         │  │ │
│  │  │  - orderRoutes.js                                        │  │ │
│  │  │  - index.js                                              │  │ │
│  │  └────────────────┬─────────────────────────────────────────┘  │ │
│  │                   │ imports                                    │ │
│  │  ┌────────────────▼─────────────────────────────────────────┐  │ │
│  │  │  «package» controllers                                   │  │ │
│  │  │                                                          │  │ │
│  │  │  - userController.js                                     │  │ │
│  │  │  - foodController.js                                     │  │ │
│  │  │  - orderController.js                                    │  │ │
│  │  └────────────────┬─────────────────────────────────────────┘  │ │
│  │                   │ imports                                    │ │
│  │  ┌────────────────▼─────────────────────────────────────────┐  │ │
│  │  │  «package» services                                      │  │ │
│  │  │                                                          │  │ │
│  │  │  - userService.js                                        │  │ │
│  │  │  - foodService.js                                        │  │ │
│  │  │  - orderService.js (future)                              │  │ │
│  │  └────────────────┬─────────────────────────────────────────┘  │ │
│  │                   │ imports                                    │ │
│  │  ┌────────────────▼─────────────────────────────────────────┐  │ │
│  │  │  «package» repositories                                  │  │ │
│  │  │                                                          │  │ │
│  │  │  - userRepository.js                                     │  │ │
│  │  │  - foodRepository.js                                     │  │ │
│  │  │  - orderRepository.js                                    │  │ │
│  │  └────────────────┬─────────────────────────────────────────┘  │ │
│  │                   │ imports                                    │ │
│  │  ┌────────────────▼─────────────────────────────────────────┐  │ │
│  │  │  «package» config                                        │  │ │
│  │  │                                                          │  │ │
│  │  │  - db.js (connection pool)                               │  │ │
│  │  │  - environment.js (future)                               │  │ │
│  │  │  - constants.js (future)                                 │  │ │
│  │  └──────────────────────────────────────────────────────────┘  │ │
│  │                                                                │ │
│  │                                                                │ │
│  │  - app.js (Express configuration)                              │ │
│  │  - server.js (Entry point)                                     │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                                                     │
│  - package.json                                                     │
│  - .env                                                             │
│  - .gitignore                                                       │
│  - Dockerfile                                                       │
└─────────────────────────────────────────────────────────────────────┘

Dependency Flow: Routes → Controllers → Services → Repositories → Config
Cross-cutting: Middleware, Utils used by multiple layers
```

### Package Organization Principles

| Principle | Implementation |
|-----------|----------------|
| **Separation of Concerns** | Each package has single responsibility |
| **Dependency Rule** | Inner layers don't depend on outer layers |
| **Cohesion** | Related functionality grouped together |
| **Low Coupling** | Minimal dependencies between packages |

---

## Architecture Decision Records

Architecture Decision Records (ADRs) document important architectural decisions made during the development of CookNest.

### ADR-001: Layered Architecture Pattern

**Status:** Accepted

**Context:**
Need to organize application code for maintainability, testability, and separation of concerns.

**Decision:**
Implement a 3-tier layered architecture with Controllers, Services, and Repositories.

**Rationale:**
- Clear separation of concerns
- Easy to test individual layers
- Standard pattern familiar to most developers
- Enables future migration to microservices if needed

**Consequences:**
- Positive: Better code organization, easier maintenance, clear dependencies
- Negative: Slight performance overhead from multiple layers, more boilerplate code

**Alternatives Considered:**
- Monolithic architecture (rejected - less maintainable)
- Microservices (rejected - overcomplicated for current scale)
- Hexagonal architecture (rejected - overly complex for project size)

---

### ADR-002: PostgreSQL as Primary Database

**Status:** Accepted

**Context:**
Need to choose a database system for persistent data storage.

**Decision:**
Use PostgreSQL as the relational database management system.

**Rationale:**
- ACID compliance for transaction integrity
- Strong relational data model fits the domain (users, orders, food items)
- Excellent support for Node.js via pg library
- Free and open-source
- Strong community and documentation

**Consequences:**
- Positive: Data integrity, referential integrity, strong typing
- Negative: Scaling requires more planning than NoSQL alternatives

**Alternatives Considered:**
- MongoDB (rejected - relational data model is more appropriate)
- MySQL (considered - PostgreSQL chosen for better feature set)
- SQLite (rejected - not suitable for production web applications)

---

### ADR-003: RESTful API Design

**Status:** Accepted

**Context:**
Need to define communication protocol between frontend and backend.

**Decision:**
Implement RESTful API using HTTP methods and JSON payloads.

**Rationale:**
- Industry standard for web APIs
- Stateless communication
- Easy to understand and consume
- Well-supported by Express and React
- Cacheable responses

**Consequences:**
- Positive: Simple, standard, widely understood
- Negative: Can require multiple requests for complex operations

**Alternatives Considered:**
- GraphQL (rejected - overcomplicated for current requirements)
- RPC (rejected - less standard for web applications)
- WebSockets (future consideration for real-time features)

---

### ADR-004: Express.js as Backend Framework

**Status:** Accepted

**Context:**
Need to choose a Node.js framework for building the backend API.

**Decision:**
Use Express.js version 5.2.1 as the web application framework.

**Rationale:**
- Lightweight and unopinionated
- Large ecosystem of middleware
- Excellent documentation and community support
- Minimal learning curve
- Flexible routing system

**Consequences:**
- Positive: Fast development, flexibility, large community
- Negative: Need to make more architectural decisions (not batteries-included)

**Alternatives Considered:**
- NestJS (rejected - too opinionated for current needs)
- Fastify (considered - Express chosen for familiarity)
- Koa (considered - Express chosen for larger ecosystem)

---

### ADR-005: React for Frontend

**Status:** Accepted

**Context:**
Need to choose a frontend framework for building the user interface.

**Decision:**
Use React with Create React App for the frontend application.

**Rationale:**
- Component-based architecture
- Large ecosystem and community
- Virtual DOM for performance
- Excellent developer experience
- Easy to learn and maintain

**Consequences:**
- Positive: Fast development, reusable components, strong ecosystem
- Negative: Requires bundler configuration (mitigated by CRA)

**Alternatives Considered:**
- Vue.js (considered - React chosen for larger job market)
- Angular (rejected - too heavyweight)
- Svelte (considered - React chosen for maturity)

---

### ADR-006: Connection Pooling for Database

**Status:** Accepted

**Context:**
Need to manage database connections efficiently for concurrent requests.

**Decision:**
Use pg connection pooling with a maximum of 20 connections.

**Rationale:**
- Reuses database connections
- Better performance under load
- Prevents connection exhaustion
- Built into pg library

**Consequences:**
- Positive: Better performance, resource management
- Negative: Need to configure pool size appropriately

---

### ADR-007: No ORM - Direct SQL Queries

**Status:** Accepted (For Now)

**Context:**
Need to decide whether to use an ORM or write SQL directly.

**Decision:**
Use direct SQL queries via the pg library without an ORM.

**Rationale:**
- Simple schema doesn't require complex ORM features
- Better performance (no ORM overhead)
- Full control over queries
- Easier to optimize specific queries
- Smaller learning curve for team

**Consequences:**
- Positive: Better performance, full SQL control, simpler stack
- Negative: More boilerplate code, manual SQL writing, less type safety

**Alternatives Considered:**
- Sequelize (considered - rejected for current simplicity needs)
- TypeORM (considered - would require TypeScript migration)
- Prisma (considered - may be adopted in future)

**Future Consideration:**
May adopt Prisma or another modern ORM as application complexity grows.

---

# PART IV: SECURITY & COMPLIANCE

> **Purpose:** Comprehensive security measures, access controls, compliance frameworks, and risk management

---

## Security Architecture

A comprehensive security architecture following defense-in-depth principles, industry standards (OWASP, NIST), and compliance requirements.

### Security Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    DEFENSE IN DEPTH LAYERS                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Layer 7: Physical Security                                     │
│  └─> Data center security, physical access controls             │
│                                                                 │
│  Layer 6: Network Security                                      │
│  └─> Firewalls, VPN, Network segmentation, DDoS protection      │
│                                                                 │
│  Layer 5: Host Security                                         │
│  └─> OS hardening, Antivirus, Patch management                  │
│                                                                 │
│  Layer 4: Application Security                                  │
│  └─> Input validation, OWASP Top 10, Secure coding              │
│                                                                 │
│  Layer 3: Data Security                                         │
│  └─> Encryption at rest/transit, Data classification, DLP       │
│                                                                 │
│  Layer 2: Identity & Access                                     │
│  └─> Authentication, Authorization, MFA, SSO                    │
│                                                                 │
│  Layer 1: Policies & Procedures                                 │
│  └─> Security policies, Training, Incident response             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

### Security Zones & Network Segmentation

Production environment segmented into security zones following the principle of least privilege.

```
┌─────────────────────────────────────────────────────────────────┐
│                          INTERNET                               │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     │ HTTPS (443)
                     │
┌────────────────────▼────────────────────────────────────────────┐
│                    DMZ (Demilitarized Zone)                     │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  WAF (Web Application Firewall)                          │   │
│  │  • OWASP ModSecurity                                     │   │
│  │  • DDoS Protection (Cloudflare/AWS Shield)               │   │
│  │  • Rate Limiting                                         │   │
│  │  • SSL/TLS Termination                                   │   │
│  └────────────────────┬─────────────────────────────────────┘   │
│                       │                                         │
│  ┌────────────────────▼─────────────────────────────────────┐   │
│  │  Load Balancer (Public)                                  │   │
│  │  • Nginx / AWS ALB                                       │   │
│  │  • Health Checks                                         │   │
│  │  • SSL/TLS Certificates                                  │   │
│  └────────────────────┬─────────────────────────────────────┘   │
└─────────────────────────┼───────────────────────────────────────┘
                          │
                   Firewall Rules
                   (Allow: 443, 80)
                          │
┌─────────────────────────▼──────────────────────────────────────┐
│                   APPLICATION ZONE (Private Subnet)            │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  API Server Cluster                                      │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐       │  │
│  │  │ API Node 1  │  │ API Node 2  │  │ API Node 3  │       │  │
│  │  │ (Express)   │  │ (Express)   │  │ (Express)   │       │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘       │  │
│  │                                                          │  │
│  │  Security Controls:                                      │  │
│  │  • No direct internet access                             │  │
│  │  • Private IP addresses                                  │  │
│  │  • Outbound through NAT Gateway                          │  │
│  │  • Security groups: Allow from LB only                   │  │
│  └────────────────────┬─────────────────────────────────────┘  │
└─────────────────────────┼──────────────────────────────────────┘
                          │
                   Firewall Rules
                   (Allow: 5432 from App Zone only)
                          │
┌─────────────────────────▼──────────────────────────────────────┐
│                   DATA ZONE (Private Subnet)                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Database Cluster                                        │  │
│  │  ┌─────────────────────────────────────────────────┐     │  │
│  │  │  PostgreSQL Primary (Read/Write)                │     │  │
│  │  │  • Encrypted at rest (AES-256)                  │     │  │
│  │  │  • Encrypted in transit (TLS 1.3)               │     │  │
│  │  │  • Daily automated backups                      │     │  │
│  │  └─────────────────┬───────────────────────────────┘     │  │
│  │                    │ Replication                         │  │
│  │         ┌──────────┴──────────┐                          │  │
│  │         │                     │                          │  │
│  │  ┌──────▼────────┐    ┌──────▼────────┐                  │  │
│  │  │ Replica 1     │    │ Replica 2     │                  │  │
│  │  │ (Read-only)   │    │ (Read-only)   │                  │  │
│  │  └───────────────┘    └───────────────┘                  │  │
│  │                                                          │  │
│  │  Security Controls:                                      │  │
│  │  • No internet access (fully isolated)                   │  │
│  │  • Access only from App Zone                             │  │
│  │  • Database-level access controls                        │  │
│  │  • Audit logging enabled                                 │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                   MANAGEMENT ZONE (Bastion/Jump Host)           │
│  • SSH access only via VPN                                      │
│  • MFA required                                                 │
│  • All actions logged                                           │
│  • Time-limited sessions                                        │
└─────────────────────────────────────────────────────────────────┘
```

#### Security Zone Rules

| Zone | Inbound | Outbound | Encryption | Monitoring |
|------|---------|----------|------------|------------|
| DMZ | Internet (443, 80) | App Zone | TLS 1.3 | WAF logs, IDS/IPS |
| App Zone | DMZ only | Data Zone, Internet (NAT) | TLS 1.3 | Application logs, APM |
| Data Zone | App Zone (5432) | None | TLS 1.3, AES-256 | Audit logs, query logs |
| Management | VPN only (SSH) | All zones | TLS 1.3 | Session logs, command logs |

---

### Authentication & Authorization

#### Authentication Flow (JWT)

```
┌──────────────┐
│   Client     │
│  (Browser)   │
└──────┬───────┘
       │
       │ 1. POST /api/users/login
       │    { email, password }
       ▼
┌────────────────────────────────────────┐
│        API Server                      │
│  ┌──────────────────────────────────┐  │
│  │  Authentication Controller       │  │
│  └─────────────┬────────────────────┘  │
│                │                       │
│                │ 2. Validate request   │
│                ▼                       │
│  ┌──────────────────────────────────┐  │
│  │  Authentication Service          │  │
│  │  • Fetch user by email           │  │
│  │  • Verify password (bcrypt)      │  │
│  │  • Check account status          │  │
│  │  • Check rate limiting           │  │
│  └─────────────┬────────────────────┘  │
│                │                       │
│                │ 3. Query DB           │
│                ▼                       │
│  ┌──────────────────────────────────┐  │
│  │  User Repository                 │  │
│  └─────────────┬────────────────────┘  │
└────────────────┼───────────────────────┘
                 │
                 ▼
       ┌─────────────────┐
       │   PostgreSQL    │
       │   • users table │
       └─────────┬───────┘
                 │
                 │ 4. Return user record
                 ▼
┌───────────────────────────────────────┐
│        API Server                     │
│  ┌──────────────────────────────────┐ │
│  │  JWT Token Service               │ │
│  │                                  │ │
│  │  Generate JWT:                   │ │
│  │  {                               │ │
│  │    "sub": "user_id",             │ │
│  │    "email": "user@example.com",  │ │
│  │    "role": "customer",           │ │
│  │    "iat": 1707696000,            │ │
│  │    "exp": 1707782400             │ │
│  │  }                               │ │
│  │                                  │ │
│  │  Sign with: JWT_SECRET           │ │
│  │  Algorithm: HS256                │ │
│  └─────────────┬────────────────────┘ │
└────────────────┼──────────────────────┘
                 │
                 │ 5. Return JWT token
                 ▼
       ┌────────────────┐
       │   Client       │
       │  Store token   │
       │  (localStorage │
       │   or cookie)   │
       └────────────────┘

Subsequent Requests:
─────────────────────

┌──────────────┐
│   Client     │
└──────┬───────┘
       │ GET /api/orders
       │ Authorization: Bearer <JWT>
       ▼
┌────────────────────────────────────────┐
│  Authentication Middleware             │
│  1. Extract token from header          │
│  2. Verify signature (JWT_SECRET)      │
│  3. Check expiration                   │
│  4. Decode payload                     │
│  5. Attach user to request object      │
└─────────────┬──────────────────────────┘
              │
              │ Token valid
              ▼
┌────────────────────────────────────────┐
│  Authorization Middleware              │
│  1. Check user role/permissions        │
│  2. Verify resource ownership          │
│  3. Apply access control rules         │
└─────────────┬──────────────────────────┘
              │
              │ Authorized
              ▼
┌────────────────────────────────────────┐
│  Order Controller                      │
│  • Process request                     │
│  • Access granted                      │
└────────────────────────────────────────┘
```

#### Role-Based Access Control (RBAC)

```
┌────────────────────────────────────────────────────────────┐
│                        RBAC Matrix                         │
├─────────────┬───────────┬─────────────┬────────────────────┤
│   Resource  │  Customer │  Home Chef  │  Administrator     │
├─────────────┼───────────┼─────────────┼────────────────────┤
│ Users       │           │             │                    │
│  • Create   │     ✓     │      ✓      │         ✓          │
│  • Read Own │     ✓     │      ✓      │         ✓          │
│  • Read All │     ✗     │      ✗      │         ✓          │
│  • Update   │  Own Only │   Own Only  │         ✓          │
│  • Delete   │  Own Only │   Own Only  │         ✓          │
├─────────────┼───────────┼─────────────┼────────────────────┤
│ Food Items  │           │             │                    │
│  • Create   │     ✗     │      ✓      │         ✓          │
│  • Read     │     ✓     │      ✓      │         ✓          │
│  • Update   │     ✗     │   Own Only  │         ✓          │
│  • Delete   │     ✗     │   Own Only  │         ✓          │
├─────────────┼───────────┼─────────────┼────────────────────┤
│ Orders      │           │             │                    │
│  • Create   │     ✓     │      ✗      │         ✓          │
│  • Read Own │     ✓     │      ✓*     │         ✓          │
│  • Read All │     ✗     │      ✗      │         ✓          │
│  • Update   │     ✗     │  Status Only│         ✓          │
│  • Delete   │     ✗     │      ✗      │         ✓          │
├─────────────┼───────────┼─────────────┼────────────────────┤
│ Reports     │           │             │                    │
│  • View     │     ✗     │   Own Only  │         ✓          │
│  • Export   │     ✗     │   Own Only  │         ✓          │
└─────────────┴───────────┴─────────────┴────────────────────┘

* Home Chef can read orders containing their food items
```

#### Multi-Factor Authentication (Future)

```
Login Process with MFA:

1. Username/Password ────> Verify ────> Success
                                           │
                                           ▼
2. Send OTP via: ──────────────────> Email/SMS/Authenticator App
   │
   ▼
3. User enters OTP ──────> Verify OTP ───> Success
                                              │
                                              ▼
4. Generate JWT Token ──────────────────> Grant Access
                                              │
                                              ▼
5. Session Established (with MFA badge)
```

---

### Data Security & Encryption

#### Encryption Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                    DATA ENCRYPTION LAYERS                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Layer 1: Data in Transit                                   │
│  ┌────────────────────────────────────────────────────┐     │
│  │  • TLS 1.3 for all connections                     │     │
│  │  • Client ↔ Load Balancer: HTTPS                   │     │
│  │  │  • Strong cipher suites only                    │     │
│  │  • Load Balancer ↔ API: TLS                        │     │
│  │  • API ↔ Database: TLS/SSL                         │     │
│  │  • Certificate: Let's Encrypt / AWS ACM            │     │
│  └────────────────────────────────────────────────────┘     │
│                                                             │
│  Layer 2: Data at Rest                                      │
│  ┌────────────────────────────────────────────────────┐     │
│  │  Database Encryption:                              │     │
│  │  • Algorithm: AES-256-GCM                          │     │
│  │  • Encrypted columns: password (bcrypt hashed)     │     │
│  │  • Full disk encryption (FDE)                      │     │
│  │  • Key Management: AWS KMS / HashiCorp Vault       │     │
│  │                                                    │     │
│  │  Backup Encryption:                                │     │
│  │  • Encrypted backups (AES-256)                     │     │
│  │  • Separate encryption keys                        │     │
│  │  • Stored in encrypted S3 buckets                  │     │
│  └────────────────────────────────────────────────────┘     │
│                                                             │
│  Layer 3: Application Level                                 │
│  ┌────────────────────────────────────────────────────┐     │
│  │  • Password hashing: bcrypt (cost factor: 12)      │     │
│  │  • JWT secret: 256-bit random key                  │     │
│  │  • API keys: SHA-256 hashed                        │     │
│  │  • Sensitive fields: Field-level encryption        │     │
│  └────────────────────────────────────────────────────┘     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

#### Data Classification

| Classification | Examples | Encryption | Access Control | Retention |
|----------------|----------|------------|----------------|-----------|
| **Public** | Food item descriptions, prices | Optional | Anyone | Indefinite |
| **Internal** | Order statistics, analytics | TLS in transit | Authenticated users | 7 years |
| **Confidential** | User emails, order details | TLS + DB encryption | Owner + Admin | 7 years |
| **Restricted** | Passwords, payment info | TLS + Hashing/Encryption | System only | Per regulation |


---

### API Security

#### API Security Controls

```
┌─────────────────────────────────────────────────────────────┐
│                    API SECURITY LAYERS                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. Rate Limiting                                           │
│     ┌──────────────────────────────────────────────────┐    │
│     │ • Global: 1000 requests/hour per IP              │    │
│     │ • Authenticated: 5000 requests/hour per user     │    │
│     │ • Login endpoint: 5 attempts/15 minutes          │    │
│     │ • Implementation: express-rate-limit + Redis     │    │
│     └──────────────────────────────────────────────────┘    │
│                                                             │
│  2. Request Validation                                      │
│     ┌──────────────────────────────────────────────────┐    │
│     │ • Schema validation: Joi / express-validator     │    │
│     │ • Type checking                                  │    │
│     │ • Size limits: Body 10MB, Upload 5MB             │    │
│     │ • Content-Type validation                        │    │
│     └──────────────────────────────────────────────────┘    │
│                                                             │
│  3. Input Sanitization                                      │
│     ┌──────────────────────────────────────────────────┐    │
│     │ • SQL Injection: Parameterized queries           │    │
│     │ • XSS: DOMPurify, escape HTML                    │    │
│     │ • NoSQL Injection: Input validation              │    │
│     │ • Path Traversal: Whitelist validation           │    │
│     └──────────────────────────────────────────────────┘    │
│                                                             │
│  4. Security Headers (helmet.js)                            │
│     ┌──────────────────────────────────────────────────┐    │
│     │ • X-Frame-Options: DENY                          │    │
│     │ • X-Content-Type-Options: nosniff                │    │
│     │ • Strict-Transport-Security: max-age=31536000    │    │
│     │ • Content-Security-Policy: strict                │    │
│     │ • X-XSS-Protection: 1; mode=block                │    │
│     └──────────────────────────────────────────────────┘    │
│                                                             │
│  5. CORS Configuration                                      │
│     ┌──────────────────────────────────────────────────┐    │
│     │ • Allowed Origins: Whitelist only                │    │
│     │ • Allowed Methods: GET, POST, PUT, DELETE        │    │
│     │ • Credentials: true (for cookies)                │    │
│     │ • Max Age: 86400                                 │    │
│     └──────────────────────────────────────────────────┘    │
│                                                             │
│  6. API Versioning                                          │
│     ┌──────────────────────────────────────────────────┐    │
│     │ • URI versioning: /api/v1/, /api/v2/             │    │
│     │ • Deprecation policy: 6 months notice            │    │
│     │ • Version sunset schedule                        │    │
│     └──────────────────────────────────────────────────┘    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

#### OWASP Top 10 Mitigation

| Risk | Mitigation Strategy | Implementation Status |
|------|---------------------|----------------------|
| **A01: Broken Access Control** | RBAC, JWT verification, ownership checks |  Planned |
| **A02: Cryptographic Failures** | TLS 1.3, AES-256, bcrypt, secure key management |  Planned |
| **A03: Injection** | Parameterized queries, input validation, ORM |  Partial (SQL) |
| **A04: Insecure Design** | Threat modeling, security requirements, code review |  In Progress |
| **A05: Security Misconfiguration** | Security headers, least privilege, hardening |  Planned |
| **A06: Vulnerable Components** | Dependency scanning, regular updates, SCA tools |  Planned |
| **A07: Authentication Failures** | JWT, MFA, password policies, rate limiting |  Planned |
| **A08: Software & Data Integrity** | Code signing, integrity checks, SRI |  Planned |
| **A09: Logging Failures** | Comprehensive logging, SIEM integration |  Planned |
| **A10: SSRF** | URL validation, whitelist, network segmentation |  Planned |

---

# PART V: INFRASTRUCTURE & OPERATIONS

> **Purpose:** Infrastructure setup, deployment strategies, monitoring, disaster recovery, and operational procedures

---

## Infrastructure Architecture

### Network Architecture

Production network architecture with high availability and security.

```
                            Internet
                               │
                               │
                       ┌───────▼────────┐
                       │   DNS (Route53)│
                       │   • Geo-routing│
                       │   • Failover   │
                       └───────┬────────┘
                               │
                               │
                    ┌──────────▼───────────┐
                    │  CDN (CloudFront)    │
                    │  • Static assets     │
                    │  • Edge caching      │
                    │  • DDoS protection   │
                    └──────────┬───────────┘
                               │
        ┌──────────────────────┴──────────────────────┐
        │                                             │
  ┌─────▼─────┐                                 ┌─────▼─────┐
  │  Region 1 │                                 │  Region 2 │
  │  (Primary)│                                 │ (Failover)│
  └─────┬─────┘                                 └─────┬─────┘
        │                                             │
┌───────▼────────────────────────────────┐            │
│       VPC (Virtual Private Cloud)      │            │
│    CIDR: 10.0.0.0/16                   │            │
│                                        │            │
│  ┌──────────────────────────────────┐  │            │
│  │  Availability Zone A             │  │            │
│  │                                  │  │            │
│  │  ┌─────────────────────────────┐ │  │            │
│  │  │ Public Subnet               │ │  │            │
│  │  │ 10.0.1.0/24                 │ │  │            │
│  │  │ • NAT Gateway               │ │  │            │
│  │  │ • Bastion Host              │ │  │            │
│  │  └─────────────────────────────┘ │  │            │
│  │                                  │  │            │
│  │  ┌─────────────────────────────┐ │  │            │
│  │  │ Private Subnet (App)        │ │  │            │
│  │  │ 10.0.10.0/24                │ │  │            │
│  │  │ • API Servers               │ │  │            │
│  │  │ • Application Load Balancer │ │  │            │
│  │  └─────────────────────────────┘ │  │            │
│  │                                  │  │            │
│  │  ┌─────────────────────────────┐ │  │            │
│  │  │ Private Subnet (Data)       │ │  │            │
│  │  │ 10.0.20.0/24                │ │  │            │
│  │  │ • PostgreSQL Primary        │ │  │            │
│  │  │ • Redis Cache               │ │  │            │
│  │  └─────────────────────────────┘ │  │            │
│  └──────────────────────────────────┘  │            │
│                                        │            │
│  ┌──────────────────────────────────┐  │            │
│  │  Availability Zone B             │  │            │
│  │  (Same structure for HA)         │  │            │
│  └──────────────────────────────────┘  │            │
│                                        │            │
│  ┌──────────────────────────────────┐  │            │
│  │  Security Groups                 │  │            │
│  │  • ALB-SG: 443,80 from Internet  │  │            │
│  │  • App-SG: 5000 from ALB-SG      │  │            │
│  │  • DB-SG: 5432 from App-SG       │  │            │
│  │  • Bastion-SG: 22 from VPN       │  │            │
│  └──────────────────────────────────┘  │            │
└────────────────────────────────────────┘            │
                                                      │
                   ┌──────────────────────────────────┘
                   │  DR Replication
                   │  • Database replication
                   │  • Backup storage
                   │  • Standby infrastructure
                   └──────────────────────────────────
```

---

### CI/CD Pipeline

Automated, secure deployment pipeline with quality gates.

```
┌─────────────────────────────────────────────────────────────────┐
│                        CI/CD PIPELINE                           │
└─────────────────────────────────────────────────────────────────┘

┌──────────┐
│Developer │
└────┬─────┘
     │
     │ 1. git push
     ▼
┌─────────────────┐
│  Git Repository │
│  (GitHub/GitLab)│
└────┬────────────┘
     │
     │ 2. Webhook trigger
     ▼
┌──────────────────────────────────────────────────────────┐
│                   CI Pipeline (GitHub Actions / Jenkins) │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  Stage 1: Build                                          │
│  ┌────────────────────────────────────────────────┐      │
│  │ • Checkout code                                │      │
│  │ • Install dependencies (npm ci)                │      │
│  │ • Build application                            │      │
│  │ • Version tagging                              │      │
│  └────────────────────────────────────────────────┘      │
│                         │                                │
│                         ▼                                │
│  Stage 2: Code Quality                                   │
│  ┌────────────────────────────────────────────────┐      │
│  │ • Linting (ESLint)                             │      │
│  │ • Code formatting (Prettier)                   │      │
│  │ • Code complexity analysis                     │      │
│  │ • Duplicate detection                          │      │
│  │ Quality Gate: Must pass                        │      │
│  └────────────────────────────────────────────────┘      │
│                         │                                │
│                         ▼                                │
│  Stage 3: Security Scanning                              │
│  ┌────────────────────────────────────────────────┐      │
│  │ • Dependency vulnerability scan (npm audit)    │      │
│  │ • SAST (Snyk, SonarQube)                       │      │
│  │ • Secret detection (GitGuardian)               │      │
│  │ • License compliance                           │      │
│  │ Security Gate: No critical/high vulnerabilities│      │
│  └────────────────────────────────────────────────┘      │
│                         │                                │
│                         ▼                                │
│  Stage 4: Testing                                        │
│  ┌────────────────────────────────────────────────┘      │
│  │ • Unit tests (Jest) - Coverage >70%            │      │
│  │ • Integration tests                            │      │
│  │ • API contract tests                           │      │
│  │ • Coverage report generation                   │      │
│  │ Test Gate: All tests must pass                 │      │
│  └────────────────────────────────────────────────┘      │
│                         │                                │
│                         ▼                                │
│  Stage 5: Build Artifacts                                │
│  ┌────────────────────────────────────────────────┐      │
│  │ • Docker image build                           │      │
│  │ • Image scanning (Trivy, Clair)                │      │
│  │ • Sign image (Cosign)                          │      │
│  │ • Push to registry (ECR, Docker Hub)           │      │
│  └────────────────────────────────────────────────┘      │
└───────────────────────┬──────────────────────────────────┘
                        │
                        │ Artifacts ready
                        ▼
┌──────────────────────────────────────────────────────────┐
│                   CD Pipeline (ArgoCD / Spinnaker)       │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  Stage 6: Deploy to Staging                              │
│  ┌────────────────────────────────────────────────┐      │
│  │ • Deploy to staging environment                │      │
│  │ • Run smoke tests                              │      │
│  │ • Database migrations (with rollback)          │      │
│  │ • Integration tests                            │      │
│  └────────────────────────────────────────────────┘      │
│                         │                                │
│                         ▼                                │
│  Stage 7: Automated Testing (Staging)                    │
│  ┌────────────────────────────────────────────────┐      │
│  │ • E2E tests (Cypress, Playwright)              │      │
│  │ • Performance tests (k6, JMeter)               │      │
│  │ • Security tests (DAST - OWASP ZAP)            │      │
│  │ • Load tests                                   │      │
│  │ Gate: All tests pass + performance SLA met     │      │
│  └────────────────────────────────────────────────┘      │
│                         │                                │
│                         ▼                                │
│  Stage 8: Manual Approval (Production)                   │
│  ┌────────────────────────────────────────────────┐      │
│  │ • Deployment approval required                 │      │
│  │ • Change ticket validation                     │      │
│  │ • Rollback plan verified                       │      │
│  │ • Approvers: Tech Lead + DevOps                │      │
│  └────────────────────────────────────────────────┘      │
│                         │                                │
│                         ▼                                │
│  Stage 9: Production Deployment                          │
│  ┌────────────────────────────────────────────────┐      │
│  │ • Blue-Green deployment                        │      │
│  │ • Canary release (10% → 50% → 100%)            │      │
│  │ • Health checks monitoring                     │      │
│  │ • Automated rollback on failure                │      │
│  └────────────────────────────────────────────────┘      │
│                         │                                │
│                         ▼                                │
│  Stage 10: Post-Deployment                               │
│  ┌────────────────────────────────────────────────┐      │
│  │ • Smoke tests in production                    │      │
│  │ • Monitor metrics (5 min)                      │      │
│  │ • Alert stakeholders                           │      │
│  │ • Update documentation                         │      │
│  └────────────────────────────────────────────────┘      │
└──────────────────────────────────────────────────────────┘
```

#### Pipeline Quality Gates

| Stage | Gate Criteria | Action on Failure |
|-------|---------------|-------------------|
| Code Quality | Lint pass, No code smells | Block merge |
| Security Scan | No critical/high vulnerabilities | Block deployment |
| Unit Tests | >70% coverage, All pass | Block deployment |
| Integration Tests | All pass | Block staging deployment |
| Performance Tests | Meet SLA (p95 < 500ms) | Block production |
| Manual Approval | Approved by 2+ reviewers | Hold deployment |

---

### Infrastructure as Code

```
Infrastructure Stack:

infrastructure/
├── terraform/                 # Infrastructure provisioning
│   ├── environments/
│   │   ├── dev/
│   │   ├── staging/
│   │   └── production/
│   ├── modules/
│   │   ├── vpc/
│   │   ├── compute/
│   │   ├── database/
│   │   └── monitoring/
│   └── main.tf
│
├── kubernetes/                # Container orchestration
│   ├── deployments/
│   │   ├── api-deployment.yaml
│   │   └── frontend-deployment.yaml
│   ├── services/
│   ├── configmaps/
│   └── secrets/
│
├── ansible/                   # Configuration management
│   ├── playbooks/
│   ├── roles/
│   └── inventory/
│
└── docker/                    # Containerization
    ├── Dockerfile.api
    ├── Dockerfile.frontend
    └── docker-compose.yml
```

---

## Disaster Recovery & Business Continuity

### Business Continuity Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                  BUSINESS CONTINUITY PLAN                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Recovery Objectives:                                           │
│  ┌────────────────────────────────────────────────────────┐     │
│  │  RTO (Recovery Time Objective):      < 1 hour          │     │
│  │  RPO (Recovery Point Objective):     < 15 minutes      │     │
│  │  MTTR (Mean Time To Recovery):       < 30 minutes      │     │
│  │  Target Availability:                99.9% (8.76 hrs)  │     │
│  └────────────────────────────────────────────────────────┘     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

### Risk Assessment Matrix

```
┌─────────────────────────────────────────────────────────────────┐
│                    RISK ASSESSMENT MATRIX                       │
│                                                                 │
│                           LIKELIHOOD                            │
│                  Rare  Unlikely  Possible  Likely  Certain      │
│                    1      2        3        4        5          │
│                  ────────────────────────────────────           │
│  IMPACT       │                                                 │
│               │                                                 │
│  Catastrophic │   M      H        E        E        E           │
│      5        │                                                 │
│               │                                                 │
│  Major        │   L      M        H        E        E           │
│      4        │                                                 │
│               │                                                 │
│  Moderate     │   L      M        M        H        E           │
│      3        │                                                 │
│               │                                                 │
│  Minor        │   L      L        M        M        H           │
│      2        │                                                 │
│               │                                                 │
│  Negligible   │   L      L        L        M        M           │
│      1        │                                                 │
│                                                                 │
│  Legend:  L = Low Risk    M = Medium Risk    H = High Risk      │
│           E = Extreme Risk                                      │
└─────────────────────────────────────────────────────────────────┘
```

#### Identified Risks & Mitigation

| Risk ID | Risk Description | Likelihood | Impact | Risk Level | Mitigation Strategy | Owner |
|---------|-----------------|------------|--------|------------|---------------------|-------|
| R-001 | Database breach | 2 - Unlikely | 5 - Catastrophic | **HIGH** | Encryption, access controls, monitoring | Security Team |
| R-002 | DDoS attack | 4 - Likely | 3 - Moderate | **HIGH** | WAF, rate limiting, CDN | DevOps |
| R-003 | Data loss | 2 - Unlikely | 5 - Catastrophic | **HIGH** | Backups, replication, DR plan | DevOps |
| R-004 | Unauthorized access | 3 - Possible | 4 - Major | **HIGH** | MFA, RBAC, audit logging | Security Team |
| R-005 | SQL Injection | 2 - Unlikely | 4 - Major | **MEDIUM** | Parameterized queries, WAF | Dev Team |
| R-006 | API abuse | 4 - Likely | 2 - Minor | **MEDIUM** | Rate limiting, API keys | Dev Team |
| R-007 | Insider threat | 2 - Unlikely | 4 - Major | **MEDIUM** | Access controls, audit logs | Security Team |
| R-008 | Third-party failure | 3 - Possible | 3 - Moderate | **MEDIUM** | Vendor SLAs, redundancy | DevOps |
| R-009 | Compliance violation | 2 - Unlikely | 4 - Major | **MEDIUM** | Regular audits, training | Compliance |
| R-010 | Service outage | 3 - Possible | 4 - Major | **HIGH** | HA architecture, monitoring | DevOps |

---

### Threat Modeling

#### STRIDE Threat Model

```
┌─────────────────────────────────────────────────────────────────┐
│                      STRIDE ANALYSIS                            │
├──────────────┬──────────────────────────────────────────────────┤
│  Threat      │  Identified Threats & Controls                   │
├──────────────┼──────────────────────────────────────────────────┤
│  Spoofing    │  Threats:                                        │
│  Identity    │  • Fake user accounts                            │
│              │  • Session hijacking                             │
│              │  • Token theft                                   │
│              │  Controls:                                       │
│              │  ✓ JWT with short expiration                     │
│              │  ✓ MFA (planned)                                 │
│              │  ✓ HTTPS only                                    │
│              │  ✓ IP-based anomaly detection                    │
├──────────────┼──────────────────────────────────────────────────┤
│  Tampering   │  Threats:                                        │
│  with Data   │  • Database manipulation                         │
│              │  • Request tampering                             │
│              │  • Log alteration                                │
│              │  Controls:                                       │
│              │  ✓ Parameterized queries                         │
│              │  ✓ Input validation                              │
│              │  ✓ Immutable audit logs                          │
│              │  ✓ Database integrity constraints                │
├──────────────┼──────────────────────────────────────────────────┤
│  Repudiation │  Threats:                                        │
│              │  • Deny performing action                        │
│              │  • Claim unauthorized access                     │
│              │  Controls:                                       │
│              │  ✓ Comprehensive audit logging                   │
│              │  ✓ Digital signatures (JWT)                      │
│              │  ✓ Non-repudiation logs                          │
│              │  ✓ Timestamp all transactions                    │
├──────────────┼──────────────────────────────────────────────────┤
│  Information │  Threats:                                        │
│  Disclosure  │  • Sensitive data exposure                       │
│              │  • Man-in-the-middle attacks                     │
│              │  • Database leaks                                │
│              │  Controls:                                       │
│              │  ✓ TLS 1.3 encryption                            │
│              │  ✓ Database encryption                           │
│              │  ✓ Secrets management                            │
│              │  ✓ Least privilege access                        │
├──────────────┼──────────────────────────────────────────────────┤
│  Denial of   │  Threats:                                        │
│  Service     │  • DDoS attacks                                  │
│              │  • Resource exhaustion                           │
│              │  • Database connection pool exhaustion           │
│              │  Controls:                                       │
│              │  ✓ Rate limiting                                 │
│              │  ✓ WAF / DDoS protection                         │
│              │  ✓ Connection pooling                            │
│              │  ✓ Auto-scaling                                  │
├──────────────┼──────────────────────────────────────────────────┤
│  Elevation   │  Threats:                                        │
│  of          │  • Privilege escalation                          │
│  Privilege   │  • Unauthorized admin access                     │
│              │  • Broken access control                         │
│              │  Controls:                                       │
│              │  ✓ RBAC implementation                           │
│              │  ✓ Principle of least privilege                  │
│              │  ✓ Authorization checks                          │
│              │  ✓ Admin action logging                          │
└──────────────┴──────────────────────────────────────────────────┘
```

---


## Access Control & Identity Management

### Identity Management Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                  IDENTITY MANAGEMENT SYSTEM                     │
└─────────────────────────────────────────────────────────────────┘

User Registration & Onboarding
┌────────────────────────────────┐
│  1. User Registration          │
│     • Email validation         │
│     • Password strength check  │
│     • CAPTCHA verification     │
│     • Terms acceptance         │
└────────────┬───────────────────┘
             │
             ▼
┌────────────────────────────────┐
│  2. Account Verification       │
│     • Email confirmation       │
│     • Phone verification (opt) │
│     • Identity documents (opt) │
└────────────┬───────────────────┘
             │
             ▼
┌────────────────────────────────┐
│  3. Profile Setup              │
│     • Basic information        │
│     • Preferences              │
│     • Privacy settings         │
│     • MFA enrollment (future)  │
└────────────┬───────────────────┘
             │
             ▼
┌────────────────────────────────┐
│  4. Role Assignment            │
│     • Default: Customer        │
│     • Chef: Upon application   │
│     • Admin: Manual approval   │
└────────────────────────────────┘

Access Management Lifecycle
┌────────────────────────────────────────────────────┐
│  User Access Lifecycle                             │
│                                                    │
│  Request → Review → Approve → Provision → Monitor  │
│     ↑                                        │     │
│     └────────────── Revoke ──────────────────┘     │
│                                                    │
│  Automated Reviews:                                │
│  • Quarterly access reviews                        │
│  • Inactive user deactivation (90 days)            │
│  • Privilege escalation monitoring                 │
└────────────────────────────────────────────────────┘
```

### Access Control Matrix

```
┌─────────────────────────────────────────────────────────────────┐
│              DETAILED ACCESS CONTROL MATRIX                     │
├────────────┬────────┬────────┬────────┬────────┬────────────────┤
│  Resource  │ Public │Customer│  Chef  │  Admin │  System        │
├────────────┼────────┼────────┼────────┼────────┼────────────────┤
│ USERS                                                           │
│ /register  │   W    │   -    │   -    │   -    │   -            │
│ /login     │   W    │   -    │   -    │   -    │   -            │
│ /:id       │   -    │  R(own)│  R(own)│  R,W   │   -            │
│ /list      │   -    │   -    │   -    │  R     │   -            │
│ /delete    │   -    │  D(own)│  D(own)│  D     │   -            │
├────────────┼────────┼────────┼────────┼────────┼────────────────┤
│ FOOD ITEMS                                                      │
│ /list      │   R    │   R    │   R    │  R     │   -            │
│ /:id       │   R    │   R    │   R    │  R,W,D │   -            │
│ /create    │   -    │   -    │   W    │  W     │   -            │
│ /update    │   -    │   -    │  W(own)│  W     │   -            │
│ /delete    │   -    │   -    │  D(own)│  D     │   -            │
├────────────┼────────┼────────┼────────┼────────┼────────────────┤
│ ORDERS                                                          │
│ /create    │   -    │   W    │   -    │  W     │   -            │
│ /:id       │   -    │  R(own)│ R(assoc│  R     │   -            │
│ /list      │   -    │  R(own)│ R(assoc│  R     │   -            │
│ /update    │   -    │   -    │ W(stat)│  W     │   -            │
│ /cancel    │   -    │  W(own)│   -    │  W     │   -            │
├────────────┼────────┼────────┼────────┼────────┼────────────────┤
│ SETTINGS                                                        │
│ /app       │   -    │   -    │   -    │  R,W   │   -            │
│ /security  │   -    │   -    │   -    │  R,W   │  R,W           │
├────────────┼────────┼────────┼────────┼────────┼────────────────┤
│ REPORTS                                                         │
│ /dashboard │   -    │  R(own)│  R(own)│  R     │   -            │
│ /analytics │   -    │   -    │  R(own)│  R     │   -            │
│ /audit     │   -    │   -    │   -    │  R     │  R,W           │
└────────────┴────────┴────────┴────────┴────────┴────────────────┘

Legend:
  R = Read    W = Write    D = Delete
  (own) = Own resources only
  (assoc) = Associated resources
  (stat) = Status updates only
  - = No access
```

---

## Incident Response

### Incident Response Plan

```
┌─────────────────────────────────────────────────────────────────┐
│                 INCIDENT RESPONSE LIFECYCLE                     │
└─────────────────────────────────────────────────────────────────┘

1. PREPARATION
┌──────────────────────────────────────────┐
│ • IR team identified & trained           │
│ • Tools & resources ready                │
│ • Contact lists maintained               │
│ • Playbooks documented                   │
│ • Regular drills conducted               │
└────────────┬─────────────────────────────┘
             │
             ▼
2. DETECTION & ANALYSIS
┌──────────────────────────────────────────┐
│ • Automated monitoring alerts            │
│ • User reports                           │
│ • Anomaly detection                      │
│ • Log analysis                           │
│                                          │
│ Incident Classification:                 │
│ • P1: Critical (< 15 min response)       │
│ • P2: High (< 1 hour)                    │
│ • P3: Medium (< 4 hours)                 │
│ • P4: Low (< 24 hours)                   │
└────────────┬─────────────────────────────┘
             │
             ▼
3. CONTAINMENT
┌──────────────────────────────────────────┐
│ Short-term:                              │
│ • Isolate affected systems               │
│ • Block malicious IPs                    │
│ • Disable compromised accounts           │
│                                          │
│ Long-term:                               │
│ • Patch vulnerabilities                  │
│ • Update security controls               │
│ • Implement additional monitoring        │
└────────────┬─────────────────────────────┘
             │
             ▼
4. ERADICATION
┌──────────────────────────────────────────┐
│ • Remove malware/threats                 │
│ • Close security gaps                    │
│ • Reset compromised credentials          │
│ • Update security rules                  │
└────────────┬─────────────────────────────┘
             │
             ▼
5. RECOVERY
┌──────────────────────────────────────────┐
│ • Restore from clean backups             │
│ • Verify system integrity                │
│ • Gradual service restoration            │
│ • Enhanced monitoring                    │
│ • User communication                     │
└────────────┬─────────────────────────────┘
             │
             ▼
6. LESSONS LEARNED
┌──────────────────────────────────────────┐
│ • Post-incident review (within 48 hrs)   │
│ • Root cause analysis                    │
│ • Timeline documentation                 │
│ • Update IR procedures                   │
│ • Preventive measures                    │
│ • Training updates                       │
└──────────────────────────────────────────┘
```

### Incident Response Team

| Role | Responsibilities | Contact | Backup |
|------|-----------------|---------|--------|
| **Incident Commander** | Overall coordination, communication | On-call rotation | CTO |
| **Security Lead** | Security analysis, threat assessment | Security Team | Senior Security Engineer |
| **DevOps Lead** | System recovery, infrastructure | DevOps Team | Senior DevOps Engineer |
| **Communications Lead** | Stakeholder communication | Product Manager | Marketing Director |
| **Legal Counsel** | Legal implications, compliance | Legal Team | External Counsel |

### Escalation Matrix

```
Severity Levels & Escalation:

P1 - CRITICAL (Data Breach, System-wide Outage)
├─ Detection → Immediate alert
├─ 0-15 min: Incident Commander notified
├─ 15-30 min: Executive team notified
├─ 30-60 min: Board notification (if needed)
└─ Continuous updates every 30 minutes

P2 - HIGH (Partial Outage, Security Incident)
├─ Detection → Alert within 15 min
├─ 0-1 hour: Incident Commander assigned
├─ 1-4 hours: Management notified
└─ Updates every 2 hours

P3 - MEDIUM (Performance Degradation)
├─ Detection → Alert within 1 hour
├─ 0-4 hours: Team assigned
└─ Daily updates

P4 - LOW (Minor Issues)
├─ Detection → Logged
├─ 0-24 hours: Reviewed
└─ Included in weekly reports
```

---

# PART VII: GOVERNANCE & MANAGEMENT

> **Purpose:** Change management processes, incident response procedures, and cost analysis

---

## Change Management

### Change Management Process

```
┌─────────────────────────────────────────────────────────────────┐
│                  CHANGE MANAGEMENT WORKFLOW                     │
└─────────────────────────────────────────────────────────────────┘

1. CHANGE REQUEST
┌──────────────────────────────────────┐
│ • Requester submits change ticket    │
│ • Description & justification        │
│ • Impact assessment                  │
│ • Rollback plan required             │
└────────────┬─────────────────────────┘
             │
             ▼
2. CLASSIFICATION
┌──────────────────────────────────────┐
│ Standard Change                      │
│ • Pre-approved changes               │
│ • Low risk, well-documented          │
│ • Examples: Code deployments,        │
│   config updates                     │
│ Approval: Automated                  │
│                                      │
│ Normal Change                        │
│ • Medium risk                        │
│ • Examples: Feature releases,        │
│   minor infrastructure changes       │
│ Approval: Change Advisory Board      │
│                                      │
│ Emergency Change                     │
│ • Critical fixes                     │
│ • Security patches                   │
│ • System outage resolution           │
│ Approval: Emergency CAB              │
└────────────┬─────────────────────────┘
             │
             ▼
3. REVIEW & APPROVAL
┌──────────────────────────────────────┐
│ Change Advisory Board (CAB):         │
│ • Technical Lead                     │
│ • DevOps Lead                        │
│ • Security Representative            │
│ • Product Owner                      │
│                                      │
│ Review Criteria:                     │
│ ✓ Technical feasibility              │
│ ✓ Security impact                    │
│ ✓ Resource availability              │
│ ✓ Testing completeness               │
│ ✓ Rollback plan                      │
└────────────┬─────────────────────────┘
             │
             ▼
4. SCHEDULING
┌──────────────────────────────────────┐
│ Change Windows:                      │
│ • Low impact: Business hours         │
│ • Medium impact: After hours         │
│ • High impact: Maintenance window    │
│                                      │
│ Blackout Periods:                    │
│ • Peak business periods              │
│ • Holiday seasons                    │
│ • During other major changes         │
└────────────┬─────────────────────────┘
             │
             ▼
5. IMPLEMENTATION
┌──────────────────────────────────────┐
│ • Execute change in staging first    │
│ • Validation testing                 │
│ • Production deployment              │
│ • Monitoring & verification          │
│ • Documentation update               │
└────────────┬─────────────────────────┘
             │
             ├─ SUCCESS → Continue
             │
             └─ FAILURE → Rollback
                    │
                    ▼
                ┌────────────────────┐
                │ Automatic Rollback │
                │ • Restore previous │
                │ • Notify team      │
                │ • Incident report  │
                └────────────────────┘
             │
             ▼
6. POST-IMPLEMENTATION REVIEW
┌──────────────────────────────────────┐
│ • Verify change objectives met       │
│ • Document lessons learned           │
│ • Update change records              │
│ • Close change ticket                │
└──────────────────────────────────────┘
```

### Change Risk Assessment

| Change Type | Examples | Risk | Testing Required | Approval |
|-------------|----------|------|------------------|----------|
| **Low Risk** | Documentation, UI text | Low | Code review | Auto-approved |
| **Medium Risk** | New features, minor DB changes | Medium | Full test suite | CAB approval |
| **High Risk** | Architecture changes, major migrations | High | Full testing + staging | CAB + Executive |
| **Emergency** | Security patches, critical fixes | Variable | Minimal (post-fix testing) | Emergency CAB |

---

## Non-Functional Requirements

Non-functional requirements define the quality attributes, performance characteristics, and constraints of the CookNest system.

### Performance Requirements

| Requirement | Target | Current Status | Priority |
|-------------|--------|----------------|----------|
| API Response Time | < 500ms (95th percentile) | Not measured | High |
| Page Load Time | < 3 seconds | Not measured | High |
| Database Query Time | < 100ms | Not measured | Medium |
| Concurrent Users | Support 100+ | Not tested | Medium |
| Transaction Throughput | 50 orders/minute | Not tested | Low |

#### Performance Targets

1. **API Endpoints**
   - GET /api/foods: < 200ms
   - POST /api/orders: < 500ms
   - GET /api/orders/:id: < 150ms
   - POST /api/users/login: < 300ms

2. **Database Operations**
   - Simple SELECT queries: < 50ms
   - Complex JOIN queries: < 100ms
   - INSERT operations: < 75ms
   - Transaction completion: < 200ms

3. **Frontend Performance**
   - First Contentful Paint (FCP): < 1.5s
   - Time to Interactive (TTI): < 3.5s
   - Largest Contentful Paint (LCP): < 2.5s

---

### Scalability Requirements

| Aspect | Current Capacity | Target Capacity | Scaling Strategy |
|--------|-----------------|-----------------|------------------|
| Concurrent Connections | ~20 (DB pool) | 1,000+ | Connection pooling, load balancing |
| Database Size | Unlimited | < 100GB first year | Pagination, archiving |
| API Requests/sec | Not tested | 500+ | Horizontal scaling, caching |
| File Storage | Not implemented | 50GB | Cloud storage (S3) |

---

### Availability Requirements

| Metric | Target | Implementation |
|--------|--------|----------------|
| Uptime | 99.5% (target) | Health checks, auto-restart |
| Recovery Time Objective (RTO) | < 1 hour | Database backups, deployment automation |
| Recovery Point Objective (RPO) | < 15 minutes | Continuous backups |
| Planned Downtime | < 4 hours/month | Blue-green deployments |

---

### Security Requirements

| Requirement | Implementation Status | Priority |
|-------------|----------------------|----------|
| Authentication | Planned (JWT) | Critical |
| Password Hashing | Planned (bcrypt) | Critical |
| SQL Injection Prevention | Implemented (parameterized queries) | Critical |
| XSS Prevention | Planned (input sanitization) | High |
| CSRF Protection | Not implemented | High |
| HTTPS/TLS | Planned for production | High |
| Rate Limiting | Not implemented | Medium |
| API Key Management | Not implemented | Medium |
| Data Encryption at Rest | Not implemented | Medium |

---

### Reliability Requirements

1. **Error Handling**
   - All API endpoints must handle errors gracefully
   - Standardized error response format
   - Logging all errors with context

2. **Data Integrity**
   - Database transactions for multi-step operations
   - Foreign key constraints enforced
   - Validation at multiple layers (client, server, database)

3. **Fault Tolerance**
   - Database connection retry logic
   - Graceful degradation when services unavailable
   - Circuit breaker pattern for external services

---

### Maintainability Requirements

| Aspect | Requirement | Current Status |
|--------|-------------|----------------|
| Code Documentation | JSDoc comments for public methods | Partial |
| API Documentation | OpenAPI/Swagger spec | Not implemented |
| Code Coverage | > 70% | No tests implemented |
| Dependency Updates | Monthly review | Manual |
| Code Linting | ESLint configuration | Not configured |
| Git Workflow | Feature branches, PR reviews | To be defined |

---

### Usability Requirements

1. **User Interface**
   - Responsive design (mobile, tablet, desktop)
   - Accessibility (WCAG 2.1 Level AA)
   - Consistent design language
   - < 3 clicks to complete primary actions

2. **API Usability**
   - RESTful conventions
   - Clear error messages
   - Consistent response formats
   - API versioning

3. **Developer Experience**
   - Clear project structure
   - Environment setup documentation
   - Local development in < 10 minutes

---

### Compatibility Requirements

| Component | Supported Versions/Browsers |
|-----------|----------------------------|
| Node.js | 16.x, 18.x, 20.x |
| PostgreSQL | 12+, 13+, 14+, 15+ |
| Browsers | Chrome 90+, Firefox 88+, Safari 14+, Edge 90+ |
| Mobile Browsers | iOS Safari 14+, Chrome Mobile 90+ |

---

### Compliance Requirements

1. **Data Privacy**
   - GDPR compliance (for EU users)
   - Right to erasure implementation
   - Data export functionality
   - Privacy policy

2. **Data Retention**
   - User data: Retained until account deletion
   - Order history: Retained for 7 years (tax purposes)
   - Logs: Retained for 90 days
   - Backups: Retained for 30 days

3. **Audit Trail**
   - Log all data modifications
   - Track user actions
   - Immutable audit logs

---

### Monitoring Requirements

| Metric | Collection Frequency | Alert Threshold |
|--------|---------------------|-----------------|
| API Response Time | Real-time | > 1 second |
| Error Rate | Real-time | > 1% |
| Database Connection Pool | Every minute | > 80% utilization |
| Disk Space | Every 5 minutes | > 85% full |
| Memory Usage | Every minute | > 90% |
| CPU Usage | Every minute | > 85% (sustained) |

---

## Monitoring and Observability

A comprehensive monitoring and observability strategy for CookNest to ensure system health, performance, and reliability.

### Observability Pillars

```
┌─────────────────────────────────────────────────────────────┐
│                    OBSERVABILITY                            │
│                                                             │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐    │
│  │    METRICS    │  │     LOGS      │  │    TRACES     │    │
│  │               │  │               │  │               │    │
│  │ • Performance │  │ • Events      │  │ • Request     │    │
│  │ • Usage       │  │ • Errors      │  │   Flow        │    │
│  │ • Resources   │  │ • Audit Trail │  │ • Latency     │    │
│  └───────────────┘  └───────────────┘  └───────────────┘    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Metrics Collection

#### Application Metrics

| Metric Category | Specific Metrics | Tool |
|----------------|------------------|------|
| **HTTP Requests** | Request count, response time, status codes | Express middleware |
| **Business Metrics** | Orders created, users registered, revenue | Custom counters |
| **Database** | Query duration, connection pool usage, slow queries | pg instrumentation |
| **System** | CPU, memory, disk I/O | Node.js process metrics |

---

### Logging Strategy

#### Log Levels

| Level | Usage | Examples |
|-------|-------|----------|
| **ERROR** | Application errors requiring attention | Database connection failures, unhandled exceptions |
| **WARN** | Warnings about potential issues | Deprecated API usage, high response times |
| **INFO** | Important business events | User registration, order creation, payment processing |
| **DEBUG** | Detailed diagnostic information | Request/response payloads, query parameters |
| **TRACE** | Very detailed diagnostic information | Function entry/exit, variable values |

#### Structured Logging with Winston

```javascript
// logger.js
const winston = require('winston');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'cooknest-api' },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

// Usage example
logger.info('Order created', {
  orderId: 123,
  userId: 456,
  totalAmount: 25.99,
  itemCount: 3
});
```

#### Log Aggregation

```
Application Instances
    │
    ├── Instance 1 → Logs
    ├── Instance 2 → Logs
    └── Instance 3 → Logs
            │
            ▼
    Log Aggregation Layer
    (Fluentd / Logstash)
            │
            ▼
    Search & Analysis
    (Elasticsearch / Loki)
            │
            ▼
    Visualization
    (Kibana / Grafana)
```

---

### Distributed Tracing

#### Request Tracing Flow

```
Frontend Request
    │ trace_id: abc-123
    ▼
API Gateway
    │ span_id: 1
    ├── User Service (span_id: 1.1)
    ├── Food Service (span_id: 1.2)
    │   └── Database Query (span_id: 1.2.1)
    └── Order Service (span_id: 1.3)
        ├── Database Query (span_id: 1.3.1)
        └── Payment Service (span_id: 1.3.2)
```

## Glossary

### Architecture Terms

| Term | Definition |
|------|------------|
| **C4 Model** | A hierarchical set of software architecture diagrams for context, containers, components, and code |
| **Container** | A separately runnable/deployable unit that executes code or stores data |
| **Component** | A grouping of related functionality encapsulated behind a well-defined interface |
| **Layered Architecture** | An architectural pattern organizing code into horizontal layers with specific responsibilities |
| **Repository Pattern** | A design pattern that mediates between the domain and data mapping layers |
| **Service Layer** | Layer containing business logic and coordinating application activities |

### Technical Terms

| Term | Definition |
|------|------------|
| **ACID** | Atomicity, Consistency, Isolation, Durability - properties of database transactions |
| **API** | Application Programming Interface - methods for communication between software components |
| **CORS** | Cross-Origin Resource Sharing - mechanism allowing restricted resources to be requested from another domain |
| **JWT** | JSON Web Token - compact, URL-safe means of representing claims between two parties |
| **ORM** | Object-Relational Mapping - technique for converting data between incompatible systems |
| **REST** | Representational State Transfer - architectural style for distributed hypermedia systems |
| **SPA** | Single-Page Application - web application that loads a single HTML page and dynamically updates |

### Database Terms

| Term | Definition |
|------|------------|
| **Connection Pool** | Cache of database connections maintained for reuse |
| **Foreign Key** | Column referencing the primary key of another table |
| **Index** | Data structure improving the speed of data retrieval |
| **Primary Key** | Unique identifier for a table record |
| **Transaction** | Unit of work performed against a database treated as a single operation |
| **Normalization** | Process of organizing data to minimize redundancy |

### Monitoring Terms

| Term | Definition |
|------|------------|
| **APM** | Application Performance Monitoring - monitoring software performance and availability |
| **Distributed Tracing** | Method for tracking requests across multiple services |
| **Metrics** | Quantitative measurements of system behavior over time |
| **Observability** | Measure of how well system internal states can be inferred from external outputs |
| **p95/p99** | 95th/99th percentile - 95%/99% of requests complete within this time |
| **SLA** | Service Level Agreement - commitment between service provider and client |
| **SLO** | Service Level Objective - target value for a service level metric |

---

## Quick Reference Guide

### Architecture Patterns Used

```
Pattern                     | Location              | Purpose
----------------------------|----------------------|---------------------------
Layered Architecture        | Backend structure     | Separation of concerns
Repository Pattern          | Data access layer     | Abstract data operations
MVC (simplified)            | Controllers/Services  | Request handling
Connection Pooling          | Database config       | Resource management
RESTful API                 | API endpoints         | Client-server communication
```

### Key Design Decisions

1. **Three-tier architecture** for clear separation of concerns
2. **PostgreSQL** for ACID compliance and relational data integrity
3. **No ORM** (currently) for performance and simplicity
4. **Express.js** for flexibility and ecosystem
5. **React** for component-based UI development
6. **RESTful API** over GraphQL for simplicity

### Component Interaction Summary

```
Request Flow:
Routes → Controllers → Services → Repositories → Database

Data Flow:
Database → Repositories → Services → Controllers → Response

Cross-Cutting Concerns:
- Logging: All layers
- Error Handling: Controllers, Services, Repositories
- Validation: Controllers, Services
- Authentication: Middleware (future)
```

### File Organization

```
backend/src/
├── routes/         → API endpoint definitions
├── controllers/    → Request/response handling
├── services/       → Business logic
├── repositories/   → Data access
└── config/         → Configuration (DB, etc.)
```

### API Endpoint Summary

```
Users:
POST   /api/users/register    - Register new user
POST   /api/users/login       - Authenticate user
GET    /api/users/:id         - Get user details

Foods:
GET    /api/foods             - List all food items
GET    /api/foods/:id         - Get specific food item
GET    /api/foods/search?q=   - Search food items

Orders:
POST   /api/orders            - Create new order
GET    /api/orders/:id        - Get order details
GET    /api/orders/user/:id   - Get user's orders
```

### Database Schema Quick Reference

```sql
-- Core Tables
users (id, name, email, password)
food_items (id, name, description, price)
orders (id, user_id, total_amount, created_at)
order_items (id, order_id, food_item_id, quantity, food_name, food_price)

-- Key Relationships
orders.user_id → users.id
order_items.order_id → orders.id
order_items.food_item_id → food_items.id
```

---

## References & Further Reading

### Official Documentation

- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [React Documentation](https://react.dev/)
- [pg (node-postgres) Documentation](https://node-postgres.com/)

### Architecture & Design Patterns

- [C4 Model](https://c4model.com/) - Software architecture diagrams
- [Martin Fowler - Patterns of Enterprise Application Architecture](https://martinfowler.com/eaaCatalog/)
- [The Twelve-Factor App](https://12factor.net/) - Methodology for building SaaS applications
- [RESTful API Design Best Practices](https://restfulapi.net/)
- [Microservices Patterns](https://microservices.io/patterns/index.html)

### Best Practices

- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [PostgreSQL Performance Optimization](https://wiki.postgresql.org/wiki/Performance_Optimization)
- [Express.js Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [React Performance Optimization](https://react.dev/learn/render-and-commit)

### Monitoring & Observability

- [Prometheus Documentation](https://prometheus.io/docs/)
- [Grafana Documentation](https://grafana.com/docs/)
- [OpenTelemetry](https://opentelemetry.io/)
- [The Three Pillars of Observability](https://www.oreilly.com/library/view/distributed-systems-observability/9781492033431/ch04.html)

### DevOps & Deployment

- [Docker Documentation](https://docs.docker.com/)
- [CI/CD Best Practices](https://www.atlassian.com/continuous-delivery/principles/continuous-integration-vs-delivery-vs-deployment)
- [AWS Well-Architected Framework](https://aws.amazon.com/architecture/well-architected/)

### Security

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Checklist](https://blog.risingstack.com/node-js-security-checklist/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)

---

## Appendix: Diagram Legend

### C4 Model Notation

```
Person          → External user or actor
System          → Software system boundary
Container       → Deployable unit (app, database, etc.)
Component       → Grouping of related functionality
Relationship    → Interaction between elements
```

### Flow Diagram Symbols

```
Rectangle       → Process or action
Diamond         → Decision point
Cylinder        → Database
Arrows          → Data flow direction
Dashed line     → Optional or async flow
```

---

## API Documentation & Specifications

> **Current Implementation:** OpenAPI specification reflecting actual deployed endpoints

### OpenAPI 3.0 Specification

```yaml
openapi: 3.0.0
info:
  title: CookNest API
  description: RESTful API for local home-cooked food ordering platform (MVP version)
  version: 1.0.0
  contact:
    name: CookNest Development Team
    email: api@cooknest.com
  license:
    name: MIT

servers:
  - url: http://localhost:5000/api
    description: Development server

paths:
  /users/register:
    post:
      summary: Register a new user
      tags: [Users]
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required: [name, email, password]
              properties:
                name:
                  type: string
                  minLength: 2
                  maxLength: 100
                  example: "John Doe"
                email:
                  type: string
                  format: email
                  example: "john.doe@example.com"
                password:
                  type: string
                  minLength: 1
                  maxLength: 100
                  example: "password123"
      responses:
        '201':
          description: User created successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
        '500':
          $ref: '#/components/responses/ServerError'

  /users/login:
    post:
      summary: Authenticate user
      tags: [Users]
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required: [email, password]
              properties:
                email:
                  type: string
                  format: email
                  example: "john.doe@example.com"
                password:
                  type: string
                  example: "password123"
      responses:
        '200':
          description: Login successful
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
        '401':
          description: Invalid credentials
          content:
            application/json:
              schema:
                type: object
                properties:
                  message:
                    type: string
                    example: "Invalid credentials"
        '500':
          $ref: '#/components/responses/ServerError'

  /foods:
    get:
      summary: Get all food items
      tags: [Foods]
      responses:
        '200':
          description: List of food items
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/FoodItem'

  /foods/{id}:
    get:
      summary: Get food item by ID
      tags: [Foods]
      parameters:
        - in: path
          name: id
          required: true
          schema:
            type: integer
          example: 1
      responses:
        '200':
          description: Food item details
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/FoodItem'
        '404':
          description: Food item not found
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
                    example: "Food item not found"
        '500':
          $ref: '#/components/responses/ServerError'

  /orders:
    post:
      summary: Create a new order
      tags: [Orders]
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required: [userId, foods, total, paymentMethod]
              properties:
                userId:
                  type: integer
                  example: 1
                foods:
                  type: array
                  items:
                    type: object
                    properties:
                      id:
                        type: integer
                        example: 1
                      name:
                        type: string
                        example: "Red Pasta"
                      price:
                        type: string
                        example: "150.00"
                total:
                  type: string
                  example: "500.00"
                paymentMethod:
                  type: string
                  example: "credit_card"
      responses:
        '201':
          description: Order created successfully
          content:
            application/json:
              schema:
                type: object
                properties:
                  orderId:
                    type: integer
                    example: 1
        '400':
          description: Invalid order data
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
                    example: "Invalid order data"
        '500':
          $ref: '#/components/responses/ServerError'

    get:
      summary: Get all orders
      tags: [Orders]
      responses:
        '200':
          description: List of all orders with items
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/OrderWithItems'
        '500':
          $ref: '#/components/responses/ServerError'

components:
  schemas:
    User:
      type: object
      properties:
        id:
          type: integer
          example: 1
        name:
          type: string
          example: "John Doe"
        email:
          type: string
          format: email
          example: "john.doe@example.com"
        password:
          type: string
          example: "password123"
          description: "⚠️ Password is returned in plain text (should be excluded in production)"

    FoodItem:
      type: object
      properties:
        id:
          type: integer
          example: 1
        name:
          type: string
          example: "Red Pasta"
        description:
          type: string
          example: "Penne pasta with red sauce"
        price:
          type: string
          example: "150.00"

    OrderWithItems:
      type: object
      properties:
        id:
          type: integer
          example: 1
        user_id:
          type: integer
          example: 1
        total_amount:
          type: string
          example: "500.00"
        payment_method:
          type: string
          example: "credit_card"
        created_at:
          type: string
          format: date-time
          example: "2026-02-14T10:30:00Z"
        items:
          type: array
          items:
            $ref: '#/components/schemas/OrderItem'

    OrderItem:
      type: object
      properties:
        food_name:
          type: string
          example: "Red Pasta"
        food_price:
          type: string
          example: "150.00"

  responses:
    ServerError:
      description: Server error
      content:
        application/json:
          schema:
            type: object
            properties:
              error:
                type: string
                example: "Internal server error"
      description: Resource not found
      content:
        application/json:
          schema:
            type: object
            properties:
              error:
                type: string
                example: "Resource not found"

  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
```

### API Versioning Strategy

| Approach | Implementation | Example |
|----------|----------------|---------|
| **URL Versioning** | Version in URL path | `/api/v1/users`, `/api/v2/users` |
| **Header Versioning** | Custom header | `API-Version: 1.0` |
| **Current Strategy** | URL versioning (planned for v2) | Currently unversioned |


### API Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `VALIDATION_ERROR` | 400 | Request validation failed |
| `UNAUTHORIZED` | 401 | Authentication required or failed |
| `FORBIDDEN` | 403 | User lacks permission |
| `NOT_FOUND` | 404 | Resource not found |
| `CONFLICT` | 409 | Resource already exists (e.g., duplicate email) |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server error |
| `SERVICE_UNAVAILABLE` | 503 | Service temporarily unavailable |

---

# PART VI: QUALITY ASSURANCE & PERFORMANCE

> **Purpose:** Testing methodologies, performance benchmarks, quality metrics, and scalability planning

---

## Testing Strategy

### Test Pyramid

```
                    ┌────────────┐
                    │            │  5% - E2E Tests
                    │    E2E     │  (Cypress, Selenium)
                    │            │
                    └────────────┘
                  ┌──────────────────┐
                  │                  │  25% - Integration Tests
                  │   Integration    │  (Supertest, Test Database)
                  │                  │
                  └──────────────────┘
              ┌──────────────────────────┐
              │                          │  70% - Unit Tests
              │         Unit             │  (Jest, Mocha)
              │                          │
              └──────────────────────────┘
```

### Testing Tools & Frameworks

| Type | Tool | Purpose | Coverage Target |
|------|------|---------|-----------------|
| **Unit Testing** | Jest | Test individual functions/modules | 80%+ |
| **Integration Testing** | Supertest + Jest | Test API endpoints | 70%+ |
| **E2E Testing** | Cypress | Test complete user flows | Critical paths |
| **Load Testing** | Apache JMeter / k6 | Performance and scalability | Key endpoints |
| **Security Testing** | OWASP ZAP | Vulnerability scanning | All endpoints |

### Test Coverage Requirements

| Component | Unit Coverage | Integration Coverage | E2E Coverage |
|-----------|---------------|---------------------|--------------|
| Controllers | 80% | 90% | - |
| Services | 90% | 80% | - |
| Repositories | 85% | 90% | - |
| Critical User Flows | - | - | 100% |
| API Endpoints | 70% | 100% | Key flows |

---

# PART VIII: REFERENCE MATERIALS

> **Purpose:** Glossary of terms, appendices with standards, tools, setup guides, and contact information

---

## Glossary

### Technical Terms

| Term | Definition |
|------|------------|
| **API (Application Programming Interface)** | Set of rules allowing different software applications to communicate |
| **ACID** | Atomicity, Consistency, Isolation, Durability - database transaction properties |
| **ALB (Application Load Balancer)** | AWS service distributing incoming traffic across multiple targets |
| **Auto-scaling** | Automatically adjusting compute resources based on demand |
| **B-Tree Index** | Balanced tree data structure for efficient database searching |
| **Bcrypt** | Cryptographic hash function used for password hashing |
| **CDN (Content Delivery Network)** | Distributed network delivering web content based on user location |
| **CI/CD** | Continuous Integration / Continuous Deployment - automated software delivery |
| **Container** | Lightweight, standalone executable package of software |
| **CORS (Cross-Origin Resource Sharing)** | Security feature allowing/restricting resource requests from another domain |
| **DFD (Data Flow Diagram)** | Visual representation of data movement through a system |
| **DOM (Document Object Model)** | Programming interface for web documents |
| **Docker** | Platform for developing, shipping, and running containerized applications |
| **E2E (End-to-End Testing)** | Testing complete user workflows from start to finish |
| **ERD (Entity-Relationship Diagram)** | Visual representation of database schema |
| **Horizontal Scaling** | Adding more machines/instances to distribute load |
| **JWT (JSON Web Token)** | Compact token format for securely transmitting information |
| **Microservices** | Architectural style structuring an application as collection of small services |
| **ORM (Object-Relational Mapping)** | Technique for converting data between incompatible type systems |
| **REST (Representational State Transfer)** | Architectural style for web services using HTTP methods |
| **Redis** | In-memory data structure store used as cache or message broker |
| **RTO (Recovery Time Objective)** | Targeted duration to restore service after disruption |
| **RPO (Recovery Point Objective)** | Maximum acceptable data loss measured in time |
| **SLA (Service Level Agreement)** | Commitment between service provider and client |
| **SLO (Service Level Objective)** | Specific measurable target within an SLA |
| **SQL Injection** | Security vulnerability allowing attacker to interfere with database queries |
| **SSL/TLS** | Security protocols for encrypted communication over networks |
| **Vertical Scaling** | Adding more resources (CPU, RAM) to existing machine |
| **VPC (Virtual Private Cloud)** | Isolated virtual network within cloud environment |
| **XSS (Cross-Site Scripting)** | Security vulnerability injecting malicious scripts into web pages |

### Domain-Specific Terms

| Term | Definition |
|------|------------|
| **Chef** | Home cook providing food items on CookNest platform |
| **Customer** | End user ordering food from home chefs |
| **Food Item** | Individual dish or meal offered by a chef |
| **Order** | Customer's request to purchase one or more food items |
| **Order Item** | Individual line item within an order |
| **Home Chef** | Synonym for Chef - individual preparing homemade meals |
| **Meal Plan** | Subscription-based recurring food orders (future feature) |
| **Delivery Zone** | Geographic area where chef offers delivery service |

### Acronyms

| Acronym | Full Form |
|---------|-----------|
| **ADR** | Architecture Decision Record |
| **API** | Application Programming Interface |
| **APM** | Application Performance Monitoring |
| **AWS** | Amazon Web Services |
| **CDN** | Content Delivery Network |
| **CRUD** | Create, Read, Update, Delete |
| **DDoS** | Distributed Denial of Service |
| **DR** | Disaster Recovery |
| **EC2** | Elastic Compute Cloud |
| **GDPR** | General Data Protection Regulation |
| **IAM** | Identity and Access Management |
| **IOPS** | Input/Output Operations Per Second |
| **JSON** | JavaScript Object Notation |
| **KPI** | Key Performance Indicator |
| **MFA** | Multi-Factor Authentication |
| **MITM** | Man-in-the-Middle (attack) |
| **OWASP** | Open Worldwide Application Security Project |
| **PII** | Personally Identifiable Information |
| **RBAC** | Role-Based Access Control |
| **RDS** | Relational Database Service |
| **S3** | Simple Storage Service |
| **SPA** | Single-Page Application |
| **STRIDE** | Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privileges |
| **UML** | Unified Modeling Language |
| **UUID** | Universally Unique Identifier |
| **VPN** | Virtual Private Network |
| **WAF** | Web Application Firewall |

---

## Appendices

### Appendix A: References & Standards

#### Industry Standards
- **OWASP Top 10 (2021)**: https://owasp.org/www-project-top-ten/
- **ISO/IEC 27001**: Information Security Management
- **SOC 2 Type II**: Service Organization Control 2
- **GDPR**: General Data Protection Regulation (EU)
- **PCI DSS**: Payment Card Industry Data Security Standard
- **WCAG 2.1**: Web Content Accessibility Guidelines

#### Architecture Frameworks
- **C4 Model**: https://c4model.com/
- **12-Factor App**: https://12factor.net/
- **Microservices Patterns**: https://microservices.io/
- **REST API Design**: https://restfulapi.net/

#### Technology Documentation
- **Node.js Official Docs**: https://nodejs.org/docs/
- **Express.js Guide**: https://expressjs.com/
- **PostgreSQL Documentation**: https://www.postgresql.org/docs/
- **React Documentation**: https://react.dev/
- **Docker Documentation**: https://docs.docker.com/
- **AWS Well-Architected Framework**: https://aws.amazon.com/architecture/well-architected/

---

