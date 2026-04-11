# Porto Portfolio - Deployment & Configuration Guide

## Network & Domain Configuration

### Current Setup
- **Server IP**: 35.170.222.241
- **Domain**: `Portoku.ddns.net` (Dynamic DNS)
- **Services Running**: 
  - Frontend (Nginx) - Port 80/443
  - Backend API (Node.js) - Port 5000
  - MongoDB - Port 27017
  - Vite Dev Server - Port 5173

---

## SSL/TLS Configuration

### SSL Certificate Details
- **Certificate Authority**: Let's Encrypt
- **Domain**: portoku.ddns.net
- **Certificate Path**: `/etc/letsencrypt/live/portoku.ddns.net/fullchain.pem`
- **Private Key Path**: `/etc/letsencrypt/live/portoku.ddns.net/privkey.pem`
- **Expiry Date**: 2026-07-10
- **Auto-Renewal**: ✅ Enabled (via certbot.timer)

### HTTPS/HTTP Configuration
- **Port 80 (HTTP)**: Configured to redirect to HTTPS (301)
- **Port 443 (HTTPS)**: Active with TLSv1.2 and TLSv1.3
- **HTTP/2**: Enabled for improved performance
- **Security Headers**: HSTS, X-Frame-Options,X-XSS-Protection

### Nginx SSL Settings
```nginx
ssl_protocols TLSv1.2 TLSv1.3;
ssl_ciphers HIGH:!aNULL:!MD5;
ssl_session_cache shared:SSL:10m;
ssl_session_timeout 10m;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
```

---

## DNS Configuration

### Setting Up DNS on ddns.net

1. Log into your ddns.net account
2. Go to "Create Hostname" or "Manage Hostnames"
3. Configure the following:
   - **Host**: `Portoku`
   - **Domain**: `ddns.net`  
   - **IPv4**: `35.170.222.241`
   - **Type**: A Record
   - **TTL**: Auto

4. Enable Dynamic DNS if you want automatic IP updates

### Verify DNS Resolution
```bash
# Test DNS resolution
nslookup Portoku.ddns.net
# or
dig Portoku.ddns.net

# Should return: 35.170.222.241
```

---

## File Upload Configuration

### Upload Size Limits
- **Nginx**: `client_max_body_size 50M`
- **Express**: `express.json({ limit: '50mb' })`
- **Multer**: `fileSize: 50 * 1024 * 1024` (50MB per file)
- **Max Files**: 10 files per request

### Supported Image Formats
- JPG/JPEG
- PNG
- WebP
- GIF

---

## Nginx Configuration

### Nginx Config File
```
Path: /etc/nginx/sites-available/default
Symlink: /etc/nginx/sites-enabled/default
```

### Key Locations
- **Frontend**: `/var/www/myapp/Porto/frontend/dist`
- **API Proxy**: `http://localhost:5000`
- **Uploads**: `/var/www/myapp/Porto/backend/uploads/`

### Nginx Commands
```bash
# Test configuration
sudo nginx -t

# Reload configuration
sudo systemctl reload nginx

# Restart Nginx
sudo systemctl restart nginx

# Check listening ports
sudo ss -tlnp | grep nginx

# View error logs
sudo tail -f /var/log/nginx/error.log
```

---

## Backend Server Setup

### Node.js Backend
- **Port**: 5000
- **Path**: `/var/www/myapp/Porto/backend`
- **Process**: `node src/server.js`

### Backend Configuration
```javascript
// Body parser limits for uploads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Request timeouts
req.setTimeout(600000);  // 10 minutes
res.setTimeout(600000);
```

### Start/Stop Backend
```bash
# Start backend
cd /var/www/myapp/Porto/backend
node src/server.js

# Check if running
ps aux | grep "node.*server.js"

# Kill backend
pkill -f "node.*server.js"
```

---

## SSL Certificate Renewal

### Auto-Renewal Status
```bash
# Check Certbot timer
sudo systemctl status certbot.timer

# View scheduled renewal
sudo systemctl list-timers certbot.timer
```

### Manual Certificate Renewal
```bash
sudo certbot renew --dry-run  # Test renewal
sudo certbot renew             # Actual renewal
```

### View Certificate Details
```bash
sudo certbot certificates
sudo openssl x509 -in /etc/letsencrypt/live/portoku.ddns.net/cert.pem -text -noout
```

---

## Monitoring & Troubleshooting

### Check Service Status
```bash
# Nginx
sudo systemctl status nginx

# Check if ports are listening
sudo lsof -i :80
sudo lsof -i :443
sudo lsof -i :5000

# MongoDB
sudo systemctl status mongodb
```

### View Logs
```bash
# Nginx error log
sudo tail -f /var/log/nginx/error.log

# Nginx access log  
sudo tail -f /var/log/nginx/access.log

# Backend logs
tail -f /tmp/backend.log

# System logs
sudo journalctl -u nginx -f
```

### Test HTTPS Connection
```bash
# Test HTTPS (ignore cert name mismatch for IP)
curl -k -I https://35.170.222.241
curl -k -I https://Portoku.ddns.net

# Test HTTP redirect
curl -I http://35.170.222.241

# Check SSL certificate
openssl s_client -connect 35.170.222.241:443
```

---

## Firewall Configuration

### UFW Status
Current firewall is inactive. If you enable UFW, allow these ports:

```bash
sudo ufw allow 22/tcp   # SSH
sudo ufw allow 80/tcp   # HTTP
sudo ufw allow 443/tcp  # HTTPS
sudo ufw enable
```

---

## Next Steps

1. **DNS Propagation**: Wait for DNS to fully propagate (usually 24-48 hours)
2. **SSL Test**: Visit https://Portoku.ddns.net and verify certificate
3. **Backup**: Ensure SSL certificates are backed up
4. **Monitor**: Set up monitoring for certificate expiry

---

## Quick Reference Commands

```bash
# Restart all services
sudo systemctl restart nginx && \
ps aux | grep "node.*server" | grep -v grep | awk '{print $2}' | xargs kill -9; \
sleep 1 && cd /var/www/myapp/Porto/backend && node src/server.js &

# Build frontend
cd /var/www/myapp/Porto/frontend && npm run build

# Check backend API
curl -s http://localhost:5000/api/projects | jq '.[0]'

# View current configuration  
cat /etc/nginx/sites-available/default
```

---

## Support & Troubleshooting

- Port 443 not listening? Check SSL certificate paths in Nginx config
- Upload still failing? Verify all three upload limits (Nginx, Express, Multer)
- DNS not resolving? Wait for propagation or check ddns.net dashboard
- Certificate expiring? Check `sudo certbot certificates` and renewal timer
