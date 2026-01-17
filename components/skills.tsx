"use client"

import { Server, Brain, Layout, Settings } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"

const skillCategories = [
  {
    title: "Backend",
    icon: Server,
    gradient: "from-blue-500/10 to-cyan-500/10",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-500 dark:text-blue-400",
    skills: [
      "Java",
      "Python",
      "FastAPI",
      "Spring Boot",
      "Node.js",
      "PostgreSQL",
      "MySQL",
      "Redis",
      "REST APIs", 
      "GraphQL",
      "RabbitMQ",
      "Kafka",
      "Message Queues",
      "MVC Architecture",
      "Event-Driven Architecture",
      "MVVM Architecture",
    ],
  },
  {
    title: "AI/ML & Automation",
    icon: Brain,
    gradient: "from-purple-500/10 to-pink-500/10",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-500 dark:text-purple-400",
    skills: [
      "Agentic AI",
      "Conversational AI",
      "PyTorch",
      "TensorFlow",
      "Scikit-learn",
      "LangChain",
      "LangGraph",
      "RAG Pipeline",
      "LLM Fine-tuning",
      "Ollama",
      "Vector Databases",
      "Chroma",
      "Pinecone",
      "Machine Learning",
      "NLP",
      "Computer Vision",
      "n8n"
    ],
  },
  {
    title: "Frontend & Mobile Development",
    icon: Layout,
    gradient: "from-emerald-500/10 to-teal-500/10",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-500 dark:text-emerald-400",
    skills: ["React", "Next.js", "React Native", "TypeScript", "JavaScript", "Tailwind CSS"],
  },
  {
    title: "DevOps & Cloud Infrastructure",
    icon: Settings,
    gradient: "from-orange-500/10 to-amber-500/10",
    iconBg: "bg-orange-500/10",
    iconColor: "text-orange-500 dark:text-orange-400",
    skills: ["Docker", "Kubernetes", "ArgoCD", "CI/CD Pipelines", "Git/Github", "GitHub Actions", "AWS","Azure", "Terraform", "Linux"],
  },
]

export function Skills() {
  const { ref, isInView } = useInView({ threshold: 0.1 })

  return (
    <section className="py-24" ref={ref}>
      <h2 className="text-2xl font-bold text-foreground mb-12 flex items-center gap-4">
        <span className="text-primary font-mono text-lg">01.</span>
        Technical Skills
        <span className="h-px bg-border flex-1 ml-4" />
      </h2>

      <div className="grid md:grid-cols-2 gap-5">
        {skillCategories.map((category, index) => (
          <div
            key={category.title}
            className={cn(
              "group relative p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm",
              "hover:border-border hover:shadow-xl hover:shadow-primary/5",
              "transition-all duration-500 ease-out",
              "opacity-0",
              isInView && "animate-fade-in-up",
            )}
            style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" }}
          >
            <div
              className={cn(
                "absolute inset-0 rounded-xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                category.gradient,
              )}
            />

            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-5">
                <div
                  className={cn(
                    "flex items-center justify-center w-12 h-12 rounded-lg transition-all duration-300",
                    "group-hover:scale-110 group-hover:rotate-3",
                    category.iconBg,
                  )}
                >
                  <category.icon className={cn("w-6 h-6", category.iconColor)} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-lg leading-tight">{category.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{category.skills.length} technologies</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skill}
                    className={cn(
                      "px-3 py-1.5 text-sm font-medium rounded-lg",
                      "bg-secondary/80 text-secondary-foreground",
                      "border border-transparent",
                      "hover:border-primary/30 hover:bg-primary/10 hover:text-primary",
                      "transition-all duration-200 cursor-default",
                      "transform hover:-translate-y-0.5",
                    )}
                    style={{
                      transitionDelay: `${skillIndex * 20}ms`,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
