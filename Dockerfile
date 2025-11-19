# Gunakan base image Nginx Alpine
FROM nginx:alpine

# Salin file aplikasi ke direktori Nginx
COPY index.html /usr/share/nginx/html/
COPY styles.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/

# Buat user nginx dengan UID dalam range OpenShift (sesuai SCC restricted-v2)
RUN addgroup -g 1000850000 -S nginx && \
    adduser -S -D -H -u 1000850000 -h /var/cache/nginx -s /sbin/nologin -G nginx -g nginx nginx && \
    chown -R nginx:nginx /var/cache/nginx /var/log/nginx /etc/nginx /usr/share/nginx/html && \
    chmod -R 755 /var/cache/nginx /var/log/nginx /etc/nginx /usr/share/nginx/html

# Jalankan sebagai user nginx
USER 1000850000

# Expose port 80
EXPOSE 80

# Jalankan Nginx
CMD ["nginx", "-g", "daemon off;"]