# Use the lightweight Nginx Alpine image
FROM nginx:alpine

# Remove default Nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy the static web application files to Nginx's serving directory
COPY hotel-booking/ /usr/share/nginx/html/

# Expose port 80 to the host
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
