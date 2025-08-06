# Verify2Buy

**Verify2Buy** is a mobile-first solution designed to help consumers verify the authenticity of products by scanning barcodes or QR codes. It integrates with UPC and GS1 databases to retrieve and validate product details, helping users make informed purchasing decisions.

---

## 🔍 Features

- 📦 Scan and verify barcodes/QR codes against UPC and GS1 databases
- 🖼️ (Planned) AI-powered image comparison for product match validation
- 🎁 Digital gift cards for scan milestones
- 🧾 Digital coupons and promotions
- 📊 Audit trail of product searches by device

---

## 🏗️ Tech Stack

| Component            | Technology                         |
|----------------------|-------------------------------------|
| Mobile App           | [Native — TBD: Kotlin/Swift]        |
| Backend API          | Java (Spring Boot) on Tomcat 10     |
| Web Server           | Apache Tomcat on AWS EC2 (Amazon Linux 2023) |
| Database             | PostgreSQL (AWS RDS)                |
| Domain & SSL         | `universumgs.com` with Let's Encrypt SSL |
| Build Tool           | Maven                               |
| API Testing          | Bruno                               |

---

## 🚀 Deployment Instructions

### 1. 🖥️ EC2 Setup
- Provision EC2 (Amazon Linux 2023)
- Install Java 17+, Tomcat 10, PostgreSQL client
- Open inbound ports 22, 80, 443

### 2. 🔐 SSL Setup
- Use Let’s Encrypt with Certbot in standalone mode:
  ```bash
  sudo certbot certonly --standalone -d universumgs.com
  ```
- Convert PEM to PKCS12 keystore:
  ```bash
  openssl pkcs12 -export -in fullchain.pem -inkey privkey.pem \
    -out keystore.p12 -name tomcat -CAfile chain.pem -caname root
  ```

### 3. ☕ Java App Deployment
- Build `.war` using Maven:
  ```bash
  ./mvnw clean package
  ```
- Deploy `.war` to `/home/ec2-user/tomcat10/webapps/`
- Monitor via:
  ```bash
  tail -f /home/ec2-user/tomcat10/logs/catalina.out
  ```

### 4. 🛢️ PostgreSQL Setup
- Use AWS RDS for PostgreSQL
- Connect:
  ```bash
  psql -h <rds-endpoint> -U postgres -d anticounterfeitdb
  ```
- Ensure schema exists and use `text` fields where needed (e.g., `json_response`, `description`)

---

## 🔧 Environment Variables

Set these in your application config:

```properties
spring.datasource.url=jdbc:postgresql://<rds-endpoint>:5432/anticounterfeitdb
spring.datasource.username=postgres
spring.datasource.password=<your-password>
```

---

## 📈 Roadmap

- [ ] Add AI image comparison for scanned items
- [ ] Add OAuth or JWT-based authentication
- [ ] Implement admin dashboard for search analytics
- [ ] Migrate deployment to Docker or ECS

---

## 👥 Contributors

- You – Backend, Deployment, DevOps 💪
- ChatGPT – Tech sidekick 🤖

---
