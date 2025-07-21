import {
  Home,
  Users,
  MessageCircle,
  Dumbbell,
  Trophy,
  User,
} from "lucide-react";

export const navItems = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: Home,
    path: "/",
    isExternal: false,
  },
  {
    id: "buddies",
    title: "Buddies",
    icon: Users,
    path: "/buddies",
    isExternal: false,
  },
  {
    id: "messages",
    title: "Messages",
    icon: MessageCircle,
    path: "/messages",
    isExternal: false,
  },
  {
    id: "workouts",
    title: "Workouts",
    icon: Dumbbell,
    path: "/workouts",
    isExternal: false,
  },
  {
    id: "challenges",
    title: "Challenges",
    icon: Trophy,
    path: "/challenges",
    isExternal: false,
  },
  {
    id: "profile",
    title: "Profile",
    icon: User,
    path: "/profile",
    isExternal: false,
  },
];


export function calculateBMI(weightKg, heightCm) {
    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);
    return bmi.toFixed(2); // e.g., "24.22"
  }