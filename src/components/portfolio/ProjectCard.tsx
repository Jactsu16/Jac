import { motion } from "framer-motion";
import { CalendarDays, ExternalLink, FileText } from "lucide-react";
import { PortfolioProject } from "../../types/portfolio";

interface ProjectCardProps {
  project: PortfolioProject;
}

const hoverMotion = {
  rest: { y: 0, scale: 1, boxShadow: "0 20px 45px rgba(15, 23, 42, 0.08)" },
  hover: {
    y: -8,
    scale: 1.01,
    boxShadow: "0 30px 60px rgba(15, 23, 42, 0.16)",
    transition: { type: "spring", stiffness: 220, damping: 18 }
  }
};

const imageMotion = {
  rest: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.6, ease: "easeOut" } }
};

const badgeColors: Record<string, string> = {
  Estrategia: "bg-blue-100 text-blue-700",
  Diseño: "bg-indigo-100 text-indigo-700",
  Website: "bg-cyan-100 text-cyan-700",
  Varios: "bg-amber-100 text-amber-700"
};

const typeColors: Record<string, string> = {
  Ficticio: "bg-slate-900 text-white",
  Real: "bg-emerald-100 text-emerald-700",
  "Estudio de Caso": "bg-slate-100 text-slate-800 border border-slate-300"
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <motion.article
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={hoverMotion}
      className="flex flex-col rounded-3xl overflow-hidden border border-slate-200/60 bg-white/70 backdrop-blur-lg transition-colors duration-500"
    >
      <motion.div
        variants={imageMotion}
        className="relative aspect-[4/3] overflow-hidden"
      >
        <img
          src={project.mainImage}
          alt={project.title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <span className={`absolute left-5 top-5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide shadow-sm backdrop-blur ${badgeColors[project.category]}`}>
          {project.category}
        </span>
      </motion.div>

      <div className="flex flex-1 flex-col gap-6 p-6">
        <header className="space-y-3">
          <h3 className="text-xl font-semibold text-slate-900 lg:text-2xl">
            {project.title}
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
            {project.summary}
          </p>
        </header>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-slate-600">
            <div className="inline-flex items-center gap-1 rounded-full bg-white/80 px-3 py-1 shadow-sm ring-1 ring-slate-900/10">
              <CalendarDays className="size-3" aria-hidden="true" />
              <span>{new Date(project.date).toLocaleDateString("es-ES", { month: "short", year: "numeric" })}</span>
            </div>
            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold tracking-wide ring-1 ring-transparent ${typeColors[project.projectType]}`}>
              {project.projectType}
            </span>
          </div>

          {"content" in project && project.category === "Estrategia" && (
            <ul className="space-y-2 text-sm text-slate-600">
              {project.content.fases.slice(0, 3).map((fase) => (
                <li key={fase.fase} className="flex items-start gap-2">
                  <span className="mt-1 size-1.5 rounded-full bg-blue-500" aria-hidden="true" />
                  <span>
                    <span className="font-medium text-slate-900">Fase {fase.fase}: </span>
                    {fase.descripcion}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {"content" in project && project.category === "Diseño" && (
            <div className="space-y-2 text-sm text-slate-600">
              <p>
                <span className="font-medium text-slate-900">Uso de IA:</span> {project.content.usoIA ? "Sí" : "No"}
              </p>
              <p className="line-clamp-3">{project.content.descripcion}</p>
            </div>
          )}

          {"content" in project && project.category === "Website" && (
            <div className="grid gap-2 text-sm text-slate-600">
              <p>
                <span className="font-medium text-slate-900">Objetivo:</span> {project.content.objetivo}
              </p>
              <p className="line-clamp-2">
                <span className="font-medium text-slate-900">Stack:</span> {project.content.stackTecnico.join(", ")}
              </p>
            </div>
          )}

          {"content" in project && project.category === "Varios" && (
            <div className="space-y-2 text-sm text-slate-600">
              <p>
                <span className="font-medium text-slate-900">Categoría:</span> {project.content.categoria}
              </p>
              <ul className="list-disc list-inside space-y-1 text-xs text-slate-500">
                {project.content.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {(project.attachments?.length || project.externalLinks?.length) && (
          <div className="mt-auto flex flex-wrap gap-2">
            {project.attachments?.map((attachment) => (
              <a
                key={attachment.id}
                href={attachment.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-slate-900/90 px-4 py-2 text-xs font-semibold text-white transition-all duration-300 hover:bg-slate-900"
              >
                <FileText className="size-3.5 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                {attachment.label}
              </a>
            ))}
            {project.externalLinks?.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-semibold text-slate-900 ring-1 ring-slate-900/10 transition-all duration-300 hover:bg-white"
              >
                <ExternalLink className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
};

export default ProjectCard;
