# 🏋️‍♂️ FitnessBuddy_App

**FitnessBuddy_App** is a full-featured fitness platform designed to tracking workout progress, and achieving health milestones together.

---

## 🚀 Project Goal

To develop a platform where users can:

- Connect with like-minded fitness buddies
- Set personalized health goals
- Track and share progress in a motivating community

---

## ✨ Key Features

### 🔐 User Authentication
- Secure sign-up & login with email, password, or social media
- Protected user sessions

### 👤 Profile Creation
- Users fill out a personalized profile with:
  - Fitness goals
  - Preferred workout types
  - Location (for buddy matching)
  - Height, weight, age, gender & other fitness-related metrics


### 📊 Workout Tracking
- Log workouts with:
  - Type (e.g., running, yoga, gym)
  - Duration
  - Intensity level
- View personal dashboard with:
  - Weekly stats
  - Progress graphs
  - Calorie burn

---

## 📐 BMI Indicator & Tracking

- **Current & Target BMI Calculation**
- **Calories Burnt ➝ Estimated Weight Loss**
- **Projected Time to Achieve Target BMI**

Based on workout logs, the system estimates:

- Weight reduction
- Daily/weekly effort needed to reach your BMI target

---

## 💡 Unique Features (L2)

### 🎯 Goal-Based Challenges
- Create & join personal challenges like:
  - “Run 10 miles this week”
- Track progress visually with status bars or charts

---

## ⚙️ Challenging Features

### 📍 Nearby Gym Finder
- Find gyms using:
  - City
  - Postal code
- Uses static data or public location APIs

---

## 🌙 Additional Features

- ✅ **Dark Mode** & Responsive Design (Mobile + Desktop)
- ✅ Share progress to **Social Media**
- ✅ Clean UI with modern icons (Lucide + Tailwind CSS)

---

## 🛠 Tech Stack

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Firebase (Authentication + Firestore)
- **State Management:** Redux Toolkit
- **Icons & UI:** Lucide-react, Shadcn/ui
- **Deployment:** Vercel

---

## 📸 Screenshots (Optional)
> Add UI screenshots here for:
> - Dashboard
> - Challenges
> - Messaging
> - BMI display

---

## 📌 Installation & Setup

```bash
# Clone the repo
git clone https://github.com/mohanlal99/FitnessBuddy_App.git

# Navigate into the directory
cd FitnessBuddy_App

# Install dependencies
npm install

# Start development server
npm run dev


FitnessBuddy_App/
├── public/
│   ├── tick.mp3
│   └── ... (images, icons, assets)
│
├── src/
│   ├── assets/
│   │   └── (images, audio, svg)
│
│   ├── components/
│   │   ├── auth/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── ui/
│   │   │   ├── Button.jsx
│   │   │   ├── Modal.jsx
│   │   │   └── SectionTitle.jsx
│   │   └── common/
│   │       ├── Navbar.jsx
│   │       └── Footer.jsx
│
│   ├── features/
│   │   ├── auth/
│   │   │   ├── authSlice.js
│   │   │   └── authService.js│
│   ├── hooks/
│   │   └── useModal.js│
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Challenges.jsx
│   │   ├── Workout.jsx
│   │   ├── Profile.jsx
│   │   └── NotFound.jsx
│
│   ├── app/
│   │   └── store.js
│
│   ├── services/
│   │   └── firebase.js
│   ├── App.jsx
│   └── index.css
│
├── .env
├── .gitignore
├── README.md
├── tailwind.config.js
├── package.json
└── vite.config.js (or next.config.js if using Next.js)
