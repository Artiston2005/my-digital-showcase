import { Smartphone, Shield, Monitor, Brain, Zap, Database, Terminal, Network } from "lucide-react";
import heyGitImage from "@/assets/HeyGIT.webp";
import heyGitAdminImage from "@/assets/HeyGIT_admin.webp";
import gitkaWifiPcImage from "@/assets/gitkawifi_pc.webp";
import rtukagyanImage from "@/assets/RTUKagyan.webp";
import quizGameImage from "@/assets/quiz-game.webp";
import portfolioImage from "@/assets/portfolio-screenshot.webp";
import auraAIBrainImage from "@/assets/AaraAI_brain.webp";
import auraAIAndroidImage from "@/assets/AURAI_android.webp";
import wifiScanLottie from "@/assets/anim_wifi_scan.json";
import quizGameLottie from "@/assets/anim_quiz_game.json";
import portfolioLottie from "@/assets/anim_portfolio.json";

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
    lottieAnimation?: unknown;
}

export const projects: Project[] = [
    {
        title: "HeyGIT Network Ecosystem",
        description: "A comprehensive, multi-platform network ecosystem engineered to automate captive portal Wi-Fi authentication across Android and Windows. It features resilient background session keep-alive, custom local proxy servers for traffic routing, and a dedicated Android Admin dashboard for real-time remote configuration.",
        tags: ["Kotlin", "Python", "Firebase", "Sockets", "Android SDK"],
        image: gitkaWifiPcImage,
        gallery: [
            { src: gitkaWifiPcImage, label: "Windows Client" },
            { src: heyGitImage, label: "Student App" },
            { src: heyGitAdminImage, label: "Admin Panel" },
        ],
        featured: true,
        details: [
            {
                title: "Autonomous Authentication",
                icon: Smartphone,
                role: "Silently monitors OS-level network state and automates HTTP payloads.",
                tech: "Coroutines • Python Threads • OkHttp",
                features: ["WifiManager/netsh OS monitoring", "Captive portal intercept", "Background session keep-alive"]
            },
            {
                title: "Local Proxy Server",
                icon: Monitor,
                role: "Instantiates local proxy servers for tethered captive portal sharing.",
                tech: "Android Services • Python Sockets",
                features: ["Cross-platform proxy routing", "Interactive UI management", "Real-time IP Blacklisting/Whitelisting"]
            },
            {
                title: "Firebase Admin Dashboard",
                icon: Shield,
                role: "Secure Android Admin app for real-time remote ecosystem management.",
                tech: "Kotlin • Firestore • Cloud Messaging",
                features: ["OTA Remote Config updates", "Dynamic UI content blocks", "Session and feedback monitoring"]
            }
        ],
        links: [
            { label: "Windows", url: "https://github.com/Artiston2005/git-ka-wifi", icon: "github" },
            { label: "Android", url: "https://github.com/Artiston2005/git-ka-wifi-android/releases", icon: "github" },
        ],
        lottieAnimation: wifiScanLottie,
    },
    {
        title: "AuraAI: Local Agentic AI Platform",
        description: "A privacy-first, locally-hosted Agentic AI ecosystem that pairs a reactive Jetpack Compose Android client with a robust FastAPI and LangGraph backend. It solves privacy and latency issues by orchestrating local LLM inference (Ollama) with long-term vector memory, autonomous tool execution, and real-time streaming directly to a mobile device.",
        tags: ["Jetpack Compose", "Kotlin", "FastAPI", "LangGraph", "ChromaDB"],
        image: auraAIBrainImage,
        gallery: [
            { src: auraAIBrainImage, label: "AuraAI Core" },
            { src: auraAIAndroidImage, label: "Android Client" },
        ],
        featured: true,
        details: [
            {
                title: "Agent State Machine & Sandboxing",
                icon: Terminal,
                role: "Orchestrates AI logic and safely executes generated code.",
                tech: "LangGraph • Python Subprocess",
                features: ["Directed acyclic graph state", "Isolated Python sandboxing", "stdout/stderr stream capture"]
            },
            {
                title: "Multi-modal Streaming Engine",
                icon: Network,
                role: "Instantaneous token streaming over jittery mobile networks.",
                tech: "WebSockets • SSE • StateFlows",
                features: ["Real-time OkHttp socket resilience", "JSON event deserialization", "Reactive Compose UI updates"]
            },
            {
                title: "Long-term Contextual Memory",
                icon: Database,
                role: "Persistent memory across sessions without cloud dependency.",
                tech: "ChromaDB • Nomic Embeddings",
                features: ["Dense vector fact representations", "Similarity search retrieval", "Dynamic RAG context injection"]
            }
        ],
        links: [
            { label: "Backend Repo", url: "https://github.com/Artiston2005/AuraAI-backened", icon: "github" },
        ],
        lottieAnimation: quizGameLottie, // Placeholder animation
    },
    {
        title: "RTUKaGyan - AI Learning Studio",
        description: "An intelligent, contextual learning management system designed for engineering students that dynamically generates adaptive study roadmaps and quizzes. It leverages a robust FastAPI backend with tiered rate limiting, multi-LLM fallback strategies (Gemini & Groq), and Supabase for secure authentication and data persistence.",
        tags: ["Python", "FastAPI", "Supabase", "Tailwind CSS", "Google Gemini"],
        image: rtukagyanImage,
        featured: true,
        details: [
            {
                title: "Multi-LLM Fallback Pipeline",
                icon: Brain,
                role: "Ensures high availability and reliable JSON extraction.",
                tech: "Gemini • Groq API • FastAPI",
                features: ["Primary routing to Google Gemini", "Automated failover to Groq LLaMA", "Complex prompt construction"]
            },
            {
                title: "Tiered Rate Limiting & BYOK",
                icon: Shield,
                role: "Usage tracking and security.",
                tech: "Supabase Auth • Python",
                features: ["IP/JWT usage tracking", "In-memory grace period", "Bring Your Own Key support"]
            },
            {
                title: "Optimized Syllabus Delivery",
                icon: Zap,
                role: "Near-zero frontend latency.",
                tech: "FastAPI @lru_cache • TTL",
                features: ["Server-side caching", "TTL invalidation", "Batched hierarchical metadata fetches"]
            }
        ],
        links: [
            { label: "GitHub", url: "https://github.com/Artiston2005/RTU-Quiz", icon: "github" }
        ],
    },
    {
        title: "System.Identity // Portfolio",
        description: "The self-referential architecture you are currently browsing. Engineered as a high-performance React application, it acts as a digital twin of my systems capabilities—featuring custom terminal simulations, dynamic theme injection, and scroll-reactive state machines.",
        tags: ["React 18", "TypeScript", "Tailwind", "Framer Motion", "Vite"],
        image: portfolioImage,
        featured: true,
        details: [
            {
                title: "Meta-Recursive Design",
                icon: Terminal,
                role: "The UI itself is a self-documenting reflection of my backend logic.",
                tech: "React • CSS Variables",
                features: ["Cyberpunk/Tech aesthetic", "Terminal typing simulations", "Component-driven architecture"]
            },
            {
                title: "Interactive State Machines",
                icon: Network,
                role: "Fluid user experience driven by complex mathematical scroll triggers.",
                tech: "Framer Motion • Lottie",
                features: ["Scroll-linked animations", "Staggered DOM reveals", "Hardware-accelerated transitions"]
            },
            {
                title: "Optimized Delivery",
                icon: Zap,
                role: "Lightning-fast static delivery and developer experience.",
                tech: "Vite • Vercel CI/CD",
                features: ["Automated deployment pipelines", "Near-instant HMR", "Optimized asset bundling"]
            }
        ],
        links: [
            { label: "Live Site", url: "https://my-digital-showcase-nine.vercel.app", icon: "external" },
            { label: "Source Code", url: "https://github.com/Artiston2005/my-digital-showcase", icon: "github" }
        ],
        lottieAnimation: portfolioLottie,
    },
];
