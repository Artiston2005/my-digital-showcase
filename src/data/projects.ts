import { Smartphone, Shield, Monitor } from "lucide-react";
import gitkaWifiImage from "@/assets/gitkawifi.jpeg";
import gitkaWifiAdminImage from "@/assets/gitkawifi_admin.jpeg";
import gitkaWifiPcImage from "@/assets/gitkawifi_pc.png";
import quizGameImage from "@/assets/quiz-game.png";
import portfolioImage from "@/assets/portfolio-screenshot.png";

export interface ProjectDetail {
    title: string;
    icon: React.ElementType;
    role: string;
    tech: string;
    features: string[];
}

export interface Project {
    title: string;
    description: string;
    tags: string[];
    image: string;
    gallery?: { src: string; label: string }[];
    featured: boolean;
    links: { label: string; url: string; icon: string }[];
    details?: ProjectDetail[];
}

export const projects: Project[] = [
    {
        title: "Git Ka Wifi Ecosystem",
        description: "A comprehensive connectivity suite designed to automate network authentication (Fortinet) for the GIT Jaipur campus. It bridges the gap between students and administration through a secure, multi-platform ecosystem.",
        tags: ["Kotlin", "Android", "Firebase", "Python", "Server-Driven UI"],
        image: gitkaWifiPcImage,
        gallery: [
            { src: gitkaWifiPcImage, label: "Windows Client" },
            { src: gitkaWifiImage, label: "Student App" },
            { src: gitkaWifiAdminImage, label: "Admin Panel" },
        ],
        featured: true,
        details: [
            {
                title: "Android Client",
                icon: Smartphone,
                role: "Student-facing background utility.",
                tech: "Kotlin • XML • WorkManager",
                features: ["Auto-login (OkHttp/FortiClient)", "Server-Driven UI via Firebase", "Background Connection Service"]
            },
            {
                title: "Admin God Mode",
                icon: Shield,
                role: "Centralized control dashboard.",
                tech: "Kotlin • Biometrics",
                features: ["Live JSON Dashboard Editor", "Ghost Session Detection", "OTA Force Updates"]
            },
            {
                title: "Windows Client",
                icon: Monitor,
                role: "Desktop auto-login agent.",
                tech: "Python • Tkinter",
                features: ["Lightweight Native GUI", "Cross-platform Session Sync", "Low-overhead background process"]
            }
        ],
        links: [
            { label: "Windows", url: "https://github.com/Artiston2005/git-ka-wifi", icon: "github" },
            { label: "Android", url: "https://github.com/Artiston2005/git-ka-wifi-android/releases", icon: "github" },
        ],
    },
    {
        title: "Quiz Game",
        description: "A trivia quiz game built with Python featuring both CLI and GUI versions. Fetches questions from Open Trivia DB API with multiple difficulty levels.",
        tags: ["Python", "Tkinter", "API", "GUI"],
        image: quizGameImage,
        featured: false,
        links: [
            { label: "GitHub", url: "https://github.com/Artiston2005/Quiz-Game-Project", icon: "github" },
        ],
    },
    {
        title: "Portfolio Website",
        description: "A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. Features smooth scroll animations and dark theme.",
        tags: ["React", "TypeScript", "Tailwind", "Framer Motion"],
        image: portfolioImage,
        featured: false,
        links: [
            { label: "Live Site", url: "https://my-digital-showcase-nine.vercel.app", icon: "external" },
        ],
    },
];
