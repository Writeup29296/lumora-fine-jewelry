#!/bin/bash
# ==============================================================================
# LUMORA FINE JEWELRY - AUTOMATED AWS LIGHTSAIL DEPLOYMENT SCRIPT
# Domain: lumorafinejewelery.com & www.lumorafinejewelery.com
# Port: 3001 -> Nginx Reverse Proxy (80/443 SSL)
# ==============================================================================

set -e

echo "💎 Starting Lumora Fine Jewelry Production Deployment on AWS Lightsail..."

# 1. Update OS packages
sudo apt update -y
sudo apt install -y curl git nginx certbot python3-certbot-nginx build-essential

# 2. Install Node.js 20 LTS (if not installed)
if ! command -v node &> /dev/null; then
    echo "📦 Installing Node.js 20 LTS..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt install -y nodejs
fi

echo "✅ Node.js Version: $(node -v)"
echo "✅ NPM Version: $(npm -v)"

# 3. Install PM2 process manager
sudo npm install -g pm2

# 4. Install Project Dependencies & Build Production Assets
echo "📦 Installing dependencies and compiling Vite frontend..."
npm install
npm run build

# 5. Configure Nginx Reverse Proxy
echo "🌐 Configuring Nginx for lumorafinejewelery.com..."
sudo tee /etc/nginx/sites-available/lumora > /dev/null << 'EOF'
server {
    listen 80;
    listen [::]:80;
    server_name lumorafinejewelery.com www.lumorafinejewelery.com;

    # Allow up to 100MB lossless jewelry photography & media uploads
    client_max_body_size 100M;

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

# Enable site and test config
sudo ln -sf /etc/nginx/sites-available/lumora /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx

# 6. Start / Restart Application with PM2
echo "🚀 Starting Lumora High Jewelry Server with PM2..."
pm2 delete lumora 2>/dev/null || true
pm2 start server/server.js --name "lumora" --env production
pm2 save
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u $USER --hp $HOME 2>/dev/null || true

echo "=============================================================================="
echo "🎉 LUMORA FINE JEWELRY IS RUNNING ON PORT 3001 & PROXIED VIA NGINX!"
echo "=============================================================================="
echo ""
echo "Next step for 100% Free HTTPS / SSL Padlock:"
echo "Once your domain DNS points to this Lightsail IP, run:"
echo "sudo certbot --nginx -d lumorafinejewelery.com -d www.lumorafinejewelery.com"
echo "=============================================================================="
