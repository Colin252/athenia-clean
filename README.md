# 🩺 Athenia App — Cloud-Ready Full Stack Platform

### 🌍 Live Demo: [https://athenia-demo.art](https://athenia-demo.art)

---

## 🚀 Overview

**Athenia App** is a cloud-deployed medical management platform developed by **Helton Quiroz**, combining a **Java Spring Boot backend** and a **React + Vite frontend**.

This system is fully deployed on **Google Cloud Platform (GCP)** using a **Compute Engine VM**, with **Nginx** as the production web server and **GitHub Actions** for automated CI/CD delivery.

It demonstrates full-stack deployment, cloud security, and DevOps best practices under a real custom domain:  
✅ **https://athenia-demo.art**

---

## 🧠 Achievements & Objectives

✅ Complete full-stack deployment (Frontend + Backend).  
✅ Secure cloud environment configuration with **GCP Compute Engine**.  
✅ Integrated **Nginx** for optimized frontend delivery.  
✅ Functional **CI/CD pipeline** with GitHub Actions and SSH keys.  
✅ End-to-end automated deployment from GitHub to VM.  
✅ Configured secure access using **SSH key pairs**.  
✅ Validated domain routing and HTTPS access.  

---

## ⚙️ Technical Architecture

| Component | Technology | Description |
|------------|-------------|-------------|
| **Frontend** | React + Vite | Modern responsive UI with npm build |
| **Backend** | Java 17 + Spring Boot | REST API with secure endpoints |
| **Infrastructure** | Google Cloud Compute Engine (Debian) | Cloud server for app hosting |
| **Web Server** | Nginx | Serves production build of React frontend |
| **CI/CD** | GitHub Actions + SSH Deploy | Continuous deployment on push to main |
| **Security** | SSH Key Pairs + Firewall | Private key in VM, public key in GCP metadata |
| **Monitoring** | `journalctl` / `Nginx logs` | Real-time logging and error tracking |

---

## 🧩 System Diagram

+-------------------------------------------+
| React Frontend (Nginx) |

https://athenia-demo.art
- Built with React + Vite
- Deployed to /var/www/html via CI/CD
+------------------+------------------------+

markdown
Copiar código
               |
               |  HTTPS / API Requests
               v
+-------------------------------------------+
| Spring Boot Backend (GCP VM) |
| - Java 17 + Maven |
| - REST Endpoints |
| - Deployed via SSH and systemctl |
+------------------+------------------------+
|
v
+-------------------------------------------+
| MySQL Database (Local VM) |
| - Persistent data for users, patients |
+-------------------------------------------+

yaml
Copiar código

---

## 📦 Manual Deployment Flow

```bash
cd ~/athenia-backend/athenia-frontend
npm install --legacy-peer-deps
npm run build
sudo rm -rf /var/www/html/*
sudo cp -r dist/* /var/www/html/
sudo systemctl restart nginx
echo "✅ Manual deployment completed successfully."
🔄 CI/CD Pipeline — GitHub Actions
File: .github/workflows/deploy.yml

yaml
Copiar código
name: Athenia CI/CD Frontend Deploy

on:
  push:
    branches: [ "main" ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: 🧩 Checkout code
        uses: actions/checkout@v4

      - name: 🚀 Deploy Frontend via SSH
        uses: appleboy/ssh-action@v1.0.0
        with:
          host: ${{ secrets.GCP_VM_IP }}
          username: ${{ secrets.GCP_USER }}
          key: ${{ secrets.GCP_SSH_KEY }}
          script: |
            cd ~/athenia-backend/athenia-frontend
            npm install --legacy-peer-deps
            npm run build
            sudo rm -rf /var/www/html/*
            sudo cp -r dist/* /var/www/html/
            sudo systemctl restart nginx
🔐 Security Configuration
Layer	Description
SSH Keys	Public key stored in GCP Metadata, private key in VM (~/.ssh/id_rsa)
Firewall Rules	TCP 22 (SSH) and TCP 80 (HTTP) open
Nginx Security	Serves only from /var/www/html
VM Access	Restricted to authorized SSH keys only
Actions Secrets	Stored in GitHub: GCP_VM_IP, GCP_USER, GCP_SSH_KEY

🌐 Deployment Details
Component	Status	Platform
Frontend	✅ Active	https://athenia-demo.art
Backend	✅ Running	Google Cloud VM
Infrastructure	✅ Stable	Debian 12 (Bookworm)
CI/CD	✅ Operational	GitHub Actions

🧱 Technical Summary
CI/CD fully operational with GitHub Actions

Deployment via SSH automation

Secure environment with Google Cloud firewall & SSH

Nginx optimized for serving SPA builds

Backend + Frontend both hosted in the same VM

Continuous monitoring via journalctl and nginx -t

💡 What Was Learned
Real cloud deployment using Google Cloud Compute Engine

Automation pipelines with GitHub Actions

Managing SSH keys and VM security

Configuring Nginx for production React apps

Handling CORS, ports, and API routes

Achieving end-to-end production stability

🧭 Next Steps
Enable HTTPS with Certbot (Let’s Encrypt)

Add Spring Boot CI/CD job for backend

Integrate Docker Compose for unified deployment

Connect backend to Cloud SQL for persistence

Implement API monitoring and error tracing

👨‍💻 Author
Helton Emerson Quiroz López
Full Stack Developer | Cloud Engineer (GCP, Java, React)

📧 heltonquiroz@gmail.com
🌐 Athenia App
🐙 GitHub
