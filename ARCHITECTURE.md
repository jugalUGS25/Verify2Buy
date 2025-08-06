# Verify2Buy Architecture Summary

## 🧱 System Architecture

```
Mobile App  →  Java API (Tomcat on EC2)  →  UPC/GS1
                             ↓
                     PostgreSQL (RDS)
```

## 🧾 Flow Summary

1. **User Action:**  
   Mobile user scans barcode/QR using Verify2Buy.

2. **API Call:**  
   App sends request to Java backend on `https://universumgs.com/anticounterfeit`.

3. **Data Validation:**  
   Java app queries UPC/GS1 services via REST (or SOAP).

4. **Response Handling:**
   - Data is parsed and inserted into PostgreSQL (e.g., `tblitemsearchresponsemaster`).
   - Optionally, gift cards or coupons are triggered.

5. **Response Return:**  
   JSON payload returned to mobile app with product info.

---

## 🧰 Key Services

| Service               | Platform          | Purpose                                |
|-----------------------|-------------------|----------------------------------------|
| EC2                   | AWS               | Hosts Tomcat, Java app, SSL certs      |
| RDS (PostgreSQL)      | AWS               | Stores product search data             |
| Route53               | AWS               | Maps `universumgs.com` to EC2          |
| Certbot (Let's Encrypt)| EC2              | Enables HTTPS with auto-renewal        |

---

## 💡 Notes for Future Deployments

- Always allocate an **Elastic IP** to EC2 to avoid public IP changes
- Automate certificate renewal with:
  ```bash
  sudo certbot renew --dry-run
  ```
- Use `pg_dump` and `pg_restore` to migrate DB schema/data
- Monitor logs using:
  ```bash
  tail -f /home/ec2-user/tomcat10/logs/catalina.out
  ```
