import { Code2, Smartphone, Wrench, Brain } from "lucide-react";

export const skills = [
    {
        category: "Frontend Architecture",
        icon: Smartphone,
        items: ["React", "TypeScript", "Tailwind CSS", "Jetpack Compose", "Android UI/XML", "Framer Motion"]
    },
    {
        category: "Backend & Systems",
        icon: Code2,
        items: ["Python", "Kotlin", "FastAPI", "Firebase", "WebSockets", "Node.js"]
    },
    {
        category: "Data & ML",
        icon: Brain,
        items: ["LangGraph / RAG", "ChromaDB", "Supabase", "PostgreSQL", "Google Gemini", "Ollama"]
    },
    {
        category: "DevOps & Tooling",
        icon: Wrench,
        items: ["Git", "Docker", "Linux / Unix", "Gradle", "Android Studio"]
    },
];
