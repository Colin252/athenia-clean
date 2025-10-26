# 🩺 Athenia App — Full Project Documentation
### 🌍 Live Demo: [https://athenia-demo.art/](https://athenia-demo.art/)
## 🚀 Overview
**Athenia App** is a medical platform developed by **Helton Quiroz**, built with a **Full Stack Cloud** approach that combines **Java (Spring Boot)** for the backend and **React + Vite** for the frontend.  
The project was successfully deployed on a **Google Cloud Virtual Machine (GCP VM)**, integrating **Nginx**, **SSH**, and a functional **CI/CD pipeline**.

---

## 🧠 Objectives Achieved
✅ Implemented a complete full stack application (frontend + backend).  
✅ Configured and secured cloud infrastructure (GCP VM).  
✅ Deployed frontend manually and automatically through CI/CD.  
✅ Integrated Nginx as a production web server.  
✅ Managed secure access with SSH key pairs (public/private).  
✅ Validated functional deployment via public domain.

---

## ⚙️ Technical Architecture

| Component | Technology | Description |
|------------|-------------|-------------|
| **Frontend** | React + Vite | Modern interface, optimized with npm build |
| **Backend** | Java 17 + Spring Boot | REST API with secure endpoints |
| **Infrastructure** | Google Cloud VM | Stable Debian-based Linux server |
| **Web Server** | Nginx | Static file server for frontend |
| **CI/CD** | GitHub Actions + SSH | Controlled automated deployment |
| **Security** | SSH Key Pairs | Private (VM) and public (GCP) keys |
| **Logs & Monitoring** | journalctl / Nginx | Deployment and error tracking |

---

## 📦 Manual Deployment Flow
```bash
cd ~/athenia-clean/athenia-frontend
npm install --legacy-peer-deps
npm run build
sudo rm -rf /var/www/html/*
sudo cp -r dist/* /var/www/html/
sudo systemctl restart nginx
echo "✅ Manual deployment completed successfully."

🔄 CI/CD Pipeline (GitHub Actions)

File: .github/workflows/maven-ci.yml

name: Frontend CI/CD Deploy
on:
  push:
    branches: [ "main" ]
jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - name: 🧩 Checkout code
        uses: actions/checkout@v4
      - name: 🎨 Deploy Frontend on VM
        uses: appleboy/ssh-action@v1.0.0
        with:
          host: ${{ secrets.GCP_VM_IP }}
          username: ${{ secrets.GCP_USER }}
          key: ${{ secrets.GCP_SSH_KEY }}
          script: |
            cd ~/athenia-clean/athenia-frontend
            npm install --legacy-peer-deps
            npm run build
            sudo rm -rf /var/www/html/*
            sudo cp -r dist/* /var/www/html/
            sudo systemctl restart nginx

🔐 Security

Private key: stored securely in the VM (~/.ssh/id_rsa)

Public key: registered in Google Cloud Metadata

Firewall: enabled only for SSH (TCP:22) and HTTP (TCP:80)

🌐 Final Deployment

Frontend: accessible via GCP domain / public IP

Backend: active and running inside the VM

Infrastructure: stable, secure, and production-ready

🧩 Technical Summary

The project was fully deployed and documented in a production environment:

CI/CD operational with GitHub Actions

GCP security validated

Frontend deployed using Nginx

Backend successfully running on VM

Complete version control and documentation integrated

👨‍💻 Author

Helton Quiroz 
Full Stack Developer | Cloud Engineer (GCP, Java, React)
📍 Google Cloud • Java • React • CI/CD • Nginx • Linux
