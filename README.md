# Scamazon 📦
### The Everything Store — Deliberately Vulnerable E-Commerce Target

**Scamazon** is a full-featured mock Amazon clone built with Node.js and Express. It serves as an intentional security testing target for **Sentinel AI** to demonstrate both Dynamic Application Security Testing (DAST) crawling and Static Application Security Testing (SAST) automated remediation with Pull Requests.

---

## ⚡ Quick Start

```powershell
# 1. Navigate to directory
cd C:\Users\aryan\Desktop\scamazon

# 2. Install dependencies
npm install

# 3. Start Scamazon server (Runs on Port 8080)
npm start
```

Visit in your browser:
👉 **[http://localhost:8080](http://localhost:8080)**

---

## 🛡️ Embedded Vulnerabilities (Mapped to Sentinel AI)

| Vulnerability Class | CWE | Endpoint / File | Description |
| :--- | :--- | :--- | :--- |
| **SQL Injection** | **CWE-89** | `GET /api/products/search?q=`<br>`src/routes/products.js` | Dynamic string interpolation in SQL query. Try searching `' OR '1'='1`. |
| **Cross-Site Scripting (XSS)** | **CWE-79** | `GET /api/reviews/render`<br>`src/routes/reviews.js` | Direct unescaped HTML reflection in review preview. |
| **Command Injection (RCE)** | **CWE-78** | `POST /api/shipping/ping-hub`<br>`src/routes/shipping.js` | Host parameter passed directly to `child_process.exec`. |
| **Path Traversal / LFI** | **CWE-22** | `GET /api/invoices/download?file=`<br>`src/routes/invoices.js` | Path joined without boundary check (`../../package.json`). |
| **Server-Side Request Forgery** | **CWE-918** | `GET /api/suppliers/test-webhook?url=`<br>`src/routes/suppliers.js` | Server queries arbitrary target URLs. |
| **Hardcoded Secrets** | **CWE-798** | `src/config/payment.js` | Hardcoded Stripe test secret key and AWS S3 credentials. |
| **Insecure CORS** | **CWE-942** | `src/server.js` | Wildcard origin `*` paired with credentials `true`. |

---

## 🧪 Testing with Sentinel AI

### 1. DAST Web Penetration Test:
1. Ensure Scamazon is running on `http://localhost:8080`.
2. In Sentinel, start a new **Web Scan** against `http://localhost:8080`.
3. Watch Katana discover endpoints and Nuclei generate cURL PoCs.

### 2. SAST & Auto-Patcher Test (GitHub):
1. Push this repository to GitHub.
2. In Sentinel, run a **GitHub Scan** against the repository URL.
3. Watch TruffleHog detect the Stripe key, Sentinel SAST detect the SQLi, and the Auto-Patcher open a Pull Request fixing the flaws.
