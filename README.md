# 🏠 The Grand Ivory – Luxury Hotel Booking System

A modern, AI-powered hotel booking platform featuring interactive UI, room management, bookings, billing, and guest management.

## ✨ Features

- 🌙 **Dynamic Dark/Light Mode** — Changes based on user preference or time
- 🎯 **Interactive cursor** — Custom glowing cursor following the mouse
- ✍️ **Animated Typing Effect** — Professional text reveals on hero section
- 📊 **Animated Stats Counter** — Numbers animate up when section scrolls into view
- 🚀 **Smooth Scrolling** — 60fps scroll with beautiful easing
- 📱 **Fully Responsive** — Works seamlessly on desktop, tablet, and mobile
- 🎨 **Glassmorphism UI** — Modern translucent design with frosted glass effect
- 📝 **Markdown Support** — Easy content updates for rooms, policies, and contact
- 💾 **Local Storage** — Saves theme preference and admin login across sessions
- 🎯 **Scroll Animations** — Every section smoothly fades and slides into view

### AI & Advanced Features

- 🤖 **Booking Engine** — Calculates total based on room type, date, and duration
- 💳 **Billing System** — Generates detailed invoices with taxes and totals
- 🔐 **Admin Management** — Secure admin login with encrypted password
- 🎛️ **Room Management** — Add/edit rooms with real-time updates
- 👥 **Guest Management** — Guest details tracking with search and filter
- 📧 **Send to Email** — Invoice can be emailed directly to guests
- 📅 **Calendar View** — Month-based calendar to visualize availability
- 🔔 **Toast Notifications** — Real-time feedback for all user actions

## 📁 Project Structure

```
hotel-booking/
├── index.html              # Home page with interactive UI
├── rooms.html              # Room management and add/edit rooms
├── bookings.html           # Booking management and analytics
├── billing.html            # Billing, invoices, and email sending
├── guests.html             # Guest management with search/filter
├── admin.html              # Admin login and operations
├── contact.html            # Contact form and location
├── cancellation.html       # Cancellation policies
├── style.css               # Main styles with modern UI
├── script.js               # All JavaScript logic
└── assets/                 # Static assets (images, fonts)
```

## ⚡ Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local server for testing (VS Code Live Server is recommended)

## 🚀 Setup & Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/omdhanwate162005-hub/Hotel-Biling-System.git
   ```

2. **Navigate to the project folder:**
   ```bash
   cd hotel-booking
   ```

3. **Start with Live Server:**
   - Open `index.html` in VS Code
   - Right-click → **Open with Live Server**
   
   *Alternatively, you can use:*   
   ```bash
   npx serve
   ```
   Then open `http://localhost:5000` in your browser.

## 🔐 Admin Credentials

**Admin Page:** `http://localhost:5000/admin.html`

- **Username:** `admin`  
- **Password:** `admin123`

## 🛠️ Usage Instructions

### Home Page (`index.html`)
- Scroll down to see animated stats counter and features
- Click "Book Your Stay" or "Explore Rooms" to navigate
- Theme toggle button in the top-right corner

### Room Management (`rooms.html`)
- Add new rooms with name, price, description, and image
- Edit existing rooms
- Rooms are automatically listed in the "Our Rooms" section on home page

### Booking Management (`bookings.html`)
- View all bookings with guest details and payment status
- Add new bookings with room type, dates, and customer info
- Payment status: Paid / Unpaid
- Booking status: Completed / Pending

### Billing (`billing.html`)
- Generate invoices from bookings
- Calculate totals with 12% GST tax
- Download PDF invoices
- Email invoices directly to guests

### Guest Management (`guests.html`)
- View all guests who have made bookings
- Search and filter by name
- Sort by booking date

### Admin Panel (`admin.html`)
- Login with admin credentials
- Quick access to manage rooms, bookings, and guests

### Policies (`cancellation.html`)
- View detailed cancellation policies
- Easy to update content via markdown

### Contact (`contact.html`)
- Contact form with Google Maps integration
- Quick contact information display

## 🎨 UI Design

### Design Philosophy
Modern, elegant, and user-friendly with a focus on visual quality and smooth interactions.

### Key Design Elements
- **Glassmorphism**: Translucent backgrounds with blur effects
- **Gradient Colors**: Soft, professional color transitions
- **Micro-interactions**: Hover effects, button ripples, and scroll animations
- **Clean Typography**: Sans-serif fonts with proper hierarchy
- **Dark Mode**: Enhanced dark theme for comfortable evening viewing

## 🧩 Technical Details

### JavaScript Features
- **Intersection Observer API**: Triggers animations when elements scroll into view
- **GSAP Animations**: GreenSock Animation Platform for smooth transitions
- **LocalStorage API**: Saves theme preferences and admin login state
- **Form Validation**: Client-side validation for all forms
- **Date Manipulation**: Moment.js for easy date calculations

### CSS Features
- **Custom Properties**: CSS variables for theme colors and spacing
- **Flexbox & Grid**: For responsive layouts
- **Keyframes**: Custom animations for scrolling and typing effects
- **@media Queries**: For perfect mobile responsiveness

## 🔌 Local Data Storage

- **Theme Preference**: `grand_ivory_theme` in localStorage
- **Admin Login**: `grand_ivory_admin` in localStorage

## 📱 Responsive Breakpoints

- **Mobile**: < 600px
- **Tablet**: 600px - 900px
- **Desktop**: > 900px

## 🚀 Future Enhancements

- [ ] Database integration (Firebase/MongoDB)
- [ ] Real-time updates with WebSockets
- [ ] Advanced analytics dashboard
- [ ] Email notifications with SMTP
- [ ] Payment gateway integration
- [ ] More room types and features
- [ ] Admin role management

## 🎉 Enjoy your stay at The Grand Ivory!

For any issues or suggestions, feel free to open an issue or submit a pull request.
