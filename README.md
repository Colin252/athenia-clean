⚙️ Quantik Backend – Spring Boot Cloud API

Quantik Backend is the core API of the Quantik full-stack financial management platform.
It provides secure REST endpoints for user authentication, accounting operations, and data management.
The backend is fully developed in Spring Boot 3, with MySQL as the primary database, and deployed on a Google Cloud VM.

🌎 Deployment & Cloud Infrastructure
Environment	Platform	Description
Backend – Production	Google Cloud Compute Engine
	Spring Boot + MySQL running on Ubuntu 22.04 (port 8080)
Backend – Secondary	Render (PaaS)	Used for HTTPS/CORS proxy testing
Frontend Connection	Vercel Frontend
	React app consuming Quantik’s REST API
CI/CD Integration	GitHub Actions	Automated build & deploy from main branch

☁️ The backend is hosted on a Google Cloud VM, configured manually with:

Java 17 + Maven 3.6.3

MySQL 8 with secure credentials

Firewall rules for port 8080

Systemd service for persistent backend runtime

🧩 Tech Stack
Category	Technologies
Language	Java 17
Framework	Spring Boot 3
Security	Spring Security 6 + JWT Authentication
Database	MySQL 8
ORM	Hibernate / JPA
Build Tool	Maven
Cloud Host	Google Cloud VM (Compute Engine)
Version Control	GitHub
CI/CD	GitHub Actions + SSH deployment
Documentation	Postman / OpenAPI (Swagger-ready)
🔐 Main Features

🔑 JWT Authentication: Secure login & registration endpoints with token-based access

👥 User Management: CRUD for users with roles (Admin/User)

💼 Financial Modules: Entities for clients, suppliers, products, invoices, and transactions

💾 MySQL Integration: Real data persistence with custom repositories

⚙️ RESTful API Architecture: Clean endpoints integrated with React frontend

🌐 CORS Configuration: Fully open CORS for localhost 3000 & Vercel domains

🧱 Exception Handling & Validation: Custom error responses for API stability

🔁 CI/CD Ready: Maven build pipeline integrated with GitHub workflows

🧠 System Architecture Overview
+--------------------------+
|        React (Vercel)    |
|   quantik-frontend.vercel.app  |
+-----------+--------------+
            |
            |  HTTPS / Axios requests
            v
+--------------------------+
|    Spring Boot Backend   |  (Google Cloud VM)
| - Authentication (JWT)   |
| - CRUD Modules (Finance) |
| - Business Logic Layer   |
+-----------+--------------+
            |
            v
+--------------------------+
|        MySQL 8 DB        |
|   Hosted in Google Cloud |
+--------------------------+

🧪 Endpoints Summary
Method	Endpoint	Description
POST	/api/login	Authenticate user and generate JWT token
POST	/api/register	Register new user
GET	/api/users	List all users (admin role)
POST	/api/routines	Create new accounting record or routine
GET	/api/routines	Fetch all records
DELETE	/api/routines/{id}	Delete record by ID

All endpoints are secured using JWT Authentication and tested through Postman.

⚙️ Installation (Local Development)
# Clone the repository
git clone https://github.com/Colin252/quantik-backend.git
cd quantik-backend

# Build the project
./mvnw clean install

# Run the backend
./mvnw spring-boot:run


Default server: http://localhost:8080
Database: quantik_db (MySQL 8)

🚀 Cloud Deployment

Google Cloud VM Setup Steps:

Create a VM instance with Ubuntu 22.04

Install OpenJDK 17, Maven, and MySQL 8

Clone the repository from GitHub

Build and start with nohup java -jar target/quantik-backend-1.0.jar &

Configure firewall: open port 8080

Verify API availability via browser or Postman

✅ Backend runs continuously via systemctl process manager for stability.

💡 What I Learned

Cloud deployment on Google Cloud Compute Engine

CI/CD pipeline configuration with GitHub Actions

Full-stack integration between React (Vercel) and Spring Boot (GCP)

Secure authentication using Spring Security + JWT

Database configuration and troubleshooting on Linux servers

Real-world debugging of CORS & HTTPS challenges

🧭 Next Steps & Roadmap

Integrate Apache Spark for large-scale financial analytics

Implement microservices architecture with Docker & Kubernetes

Add unit & integration tests with JUnit 5 and Mockito

Deploy backend to Render for multi-region redundancy

Add Swagger UI documentation endpoint

👤 Author

Helton Emerson Quiroz López
Full Stack Java + React Developer

📧 heltonquiroz.dev@gmail.com

🌐 LinkedIn 
https://quantik-frontend.vercel.app/

💻 Frontend Repository



