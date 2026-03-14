# One Piece Themed Developer Portfolio

A professional, anime-themed portfolio website built with MERN stack (MongoDB, Express, React, Node.js), TypeScript, and Tailwind CSS.

## Features

- One Piece anime-inspired design with custom color palette
- Dynamic GSAP + Framer Motion animations
- Responsive design for all devices
- Interactive sections: Hero, About, Skills, Experience, Projects, Testimonials, Contact
- "Wanted Poster" style project cards
- Working contact form with MongoDB storage and email notifications
- SEO optimized with meta tags

## Tech Stack

### Frontend
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS (styling)
- GSAP + Framer Motion (animations)
- React Hook Form + Zod (form validation)
- React Icons

### Backend
- Node.js + Express.js + TypeScript
- MongoDB + Mongoose
- Nodemailer (email notifications)

## Project Structure

```
Portfolio/
├── client/                 # React frontend
│   ├── public/
│   │   └── assets/        # Images, icons, fonts
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/    # Reusable components
│   │   │   ├── layout/    # Navbar, Footer
│   │   │   └── sections/  # Page sections
│   │   ├── data/          # Static data
│   │   ├── types/         # TypeScript types
│   │   └── App.tsx
│   └── package.json
│
├── server/                 # Express backend
│   ├── src/
│   │   ├── config/        # Database config
│   │   ├── controllers/   # Route handlers
│   │   ├── models/        # Mongoose models
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Error handlers
│   │   ├── utils/         # Email utility
│   │   └── server.ts
│   └── package.json
│
├── .env.example           # Environment variables template
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Git

### Installation

1. **Clone the repository**
   ```bash
   cd A:\Portfolio
   ```

2. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../server
   npm install
   ```

4. **Set up environment variables**
   ```bash
   # In the root folder, copy .env.example to .env
   cp .env.example .env
   # Edit .env with your actual values
   ```

5. **Run the development servers**

   Terminal 1 - Frontend:
   ```bash
   cd client
   npm run dev
   ```

   Terminal 2 - Backend:
   ```bash
   cd server
   npm run dev
   ```

6. **Open in browser**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000/api/health

## Customization

### Update Personal Information

Edit `client/src/data/index.ts`:
- `personalInfo` - Your name, title, bio, email, etc.
- `socialLinks` - Your social media links
- `skills` - Your technologies and skill levels
- `experiences` - Your work history
- `projects` - Your portfolio projects
- `testimonials` - Client testimonials

### Download Anime Images from Freepik

1. Visit these Freepik pages:
   - [Ocean Waves Anime](https://www.freepik.com/free-photos-vectors/ocean-waves-anime)
   - [Pirate Ship Ocean Waves](https://www.freepik.com/free-photos-vectors/pirate-ship-ocean-waves)
   - [Anime Developer](https://www.freepik.com/search?format=search&query=anime+developer)

2. Download images and place them in `client/public/assets/images/`

### Update Theme Colors

Edit `client/tailwind.config.js`:
- Primary: Luffy Red (#D32F2F)
- Secondary: Straw Hat Gold (#FFC107)
- Accent: Sea Blue (#1976D2)

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/health | Health check |
| POST | /api/contact | Submit contact form |
| GET | /api/contact | Get all contacts (admin) |
| GET | /api/projects | Get all projects |
| POST | /api/projects | Create project (admin) |
| PUT | /api/projects/:id | Update project (admin) |
| DELETE | /api/projects/:id | Delete project (admin) |

## Deployment

### Frontend (Vercel)
```bash
cd client
npm run build
# Deploy the dist folder to Vercel
```

### Backend (Railway/Render)
1. Push server folder to GitHub
2. Connect to Railway or Render
3. Set environment variables
4. Deploy

## Environment Variables

```env
# MongoDB
MONGODB_URI=mongodb+srv://...

# Server
PORT=5000
NODE_ENV=production
CLIENT_URL=https://yourportfolio.com

# Email (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your.email@gmail.com
SMTP_PASS=your_app_password
EMAIL_TO=your.email@example.com
```

## License

MIT License - Feel free to use this for your own portfolio!

## Credits

- Design inspired by One Piece anime
- Images from Freepik
- Built with love and the spirit of adventure 🏴‍☠️

---

**Note:** Remember to replace all placeholder content with your actual information before deploying!
# Ilyas
