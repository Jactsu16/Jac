import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import CategoryFilter, { CategoryOptionValue } from "../components/portfolio/CategoryFilter";
import portfolioData from "../data/portfolioProjects.json";
import { PortfolioProject } from "../types/portfolio";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.08, duration: 0.6, ease: "easeOut" }
  })
};

const PortfolioPage = () => {
  const [filter, setFilter] = useState<CategoryOptionValue>("Todos");
  const [projects, setProjects] = useState<PortfolioProject[]>(portfolioData.projects);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("visela-portfolio-projects");
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as PortfolioProject[];
        setProjects(parsed);
      } catch (error) {
        console.warn("No se pudo leer el portafolio local: ", error);
      }
    }
  }, []);

  const filteredProjects = useMemo(() => {
    if (filter === "Todos") return projects;
    return projects.filter((project) => project.category === filter);
  }, [filter, projects]);

  useEffect(() => {
    localStorage.setItem("visela-portfolio-projects", JSON.stringify(projects));
  }, [projects]);

  const openModal = (project: PortfolioProject) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-neutral-50 pb-20 pt-28 text-neutral-900">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-40" aria-hidden="true">
        <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-primary-300/30 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-primary-500/20 blur-3xl" />
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6">
        <header className="space-y-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="inline-flex items-center gap-3 rounded-full border border-primary-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-primary-700 shadow backdrop-blur"
          >
            Portafolio Visela
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            className="space-y-4"
          >
            <h1 className="text-3xl font-semibold tracking-tight text-primary-700 sm:text-4xl lg:text-5xl">
              Casos estratégicos, experiencias de diseño y activaciones inmersivas
            </h1>
            <p className="mx-auto max-w-2xl text-sm text-neutral-700 sm:text-base">
              Cada proyecto se estructura dinámicamente a partir de un JSON central. Filtra por categoría para explorar Estrategia, Diseño, Websites o Activaciones.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="flex w-full justify-center"
          >
            <CategoryFilter value={filter} onChange={(value) => setFilter(value)} />
          </motion.div>
        </header>

        <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                exit="hidden"
                custom={index}
                onClick={() => openModal(project)}
                className="group cursor-pointer overflow-hidden rounded-xl border border-primary-100 bg-white transition-all hover:-translate-y-1 hover:border-primary-300 hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-primary-300 to-primary-500">
                  {project.mainImage ? (
                    <img
                      src={project.mainImage}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-6xl text-white">
                      📊
                    </div>
                  )}
                  <span className="absolute left-4 top-4 rounded-full bg-primary-100/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-700 shadow-sm backdrop-blur">
                    {project.category}
                  </span>
                </div>

                <div className="flex flex-col gap-3 p-4">
                  <h3 className="text-lg font-semibold text-primary-700 line-clamp-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed line-clamp-3">
                    {project.summary}
                  </p>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="rounded-full bg-primary-50 px-2.5 py-1 font-semibold text-primary-700">
                      {new Date(project.date).toLocaleDateString("es-ES", { month: "short", year: "numeric" })}
                    </span>
                    <span className="rounded-full bg-neutral-100 px-2.5 py-1 font-semibold text-neutral-700">
                      {project.projectType}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </section>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-primary-200 bg-white px-6 py-10 text-center text-sm text-neutral-700 backdrop-blur"
          >
            No hay proyectos en esta categoría todavía.
          </motion.div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-8 shadow-2xl"
            >
              <button
                onClick={closeModal}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-neutral-700 transition-colors hover:bg-neutral-200"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="space-y-6">
                {selectedProject.mainImage && (
                  <img
                    src={selectedProject.mainImage}
                    alt={selectedProject.title}
                    className="w-full rounded-lg object-cover"
                  />
                )}

                <div>
                  <span className="inline-block mb-2 rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-700">
                    {selectedProject.category}
                  </span>
                  <h2 className="text-3xl font-bold text-primary-700 mb-2">{selectedProject.title}</h2>
                  <p className="text-sm text-neutral-600">{selectedProject.summary}</p>
                </div>

                <div className="flex gap-3 text-sm">
                  <span className="rounded-full bg-primary-50 px-3 py-1 font-semibold text-primary-700">
                    {new Date(selectedProject.date).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}
                  </span>
                  <span className="rounded-full bg-neutral-100 px-3 py-1 font-semibold text-neutral-700">
                    {selectedProject.projectType}
                  </span>
                </div>

                {"content" in selectedProject && selectedProject.category === "Estrategia" && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-bold text-primary-700 mb-2">Planteamiento del Problema</h3>
                      <p className="text-sm text-neutral-700">{selectedProject.content.planteamientoDelProblema}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-primary-700 mb-2">Objetivo</h3>
                      <p className="text-sm text-neutral-700">{selectedProject.content.objetivo}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-primary-700 mb-2">Fases</h3>
                      <ul className="space-y-2">
                        {selectedProject.content.fases.map((fase) => (
                          <li key={fase.fase} className="flex items-start gap-2 text-sm">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary-500" />
                            <span className="text-neutral-700">
                              <span className="font-semibold text-primary-700">Fase {fase.fase}: {fase.titulo}</span> - {fase.descripcion}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-primary-700 mb-2">Conclusión</h3>
                      <p className="text-sm text-neutral-700">{selectedProject.content.conclusion}</p>
                    </div>
                  </div>
                )}

                {"content" in selectedProject && selectedProject.category === "Diseño" && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-bold text-primary-700 mb-2">Brief</h3>
                      <p className="text-sm text-neutral-700">{selectedProject.content.brief}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-primary-700 mb-2">Problema</h3>
                      <p className="text-sm text-neutral-700">{selectedProject.content.problema}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-primary-700 mb-2">Uso de IA</h3>
                      <p className="text-sm text-neutral-700">{selectedProject.content.usoIA ? "Sí" : "No"}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-primary-700 mb-2">Descripción</h3>
                      <p className="text-sm text-neutral-700">{selectedProject.content.descripcion}</p>
                    </div>
                  </div>
                )}

                {selectedProject.attachments && selectedProject.attachments.length > 0 && (
                  <div>
                    <h3 className="text-sm font-bold text-primary-700 mb-3">Adjuntos</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.attachments.map((attachment) => (
                        <a
                          key={attachment.id}
                          href={attachment.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full bg-primary-500 px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-primary-600"
                        >
                          {attachment.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {selectedProject.externalLinks && selectedProject.externalLinks.length > 0 && (
                  <div>
                    <h3 className="text-sm font-bold text-primary-700 mb-3">Enlaces Externos</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.externalLinks.map((link) => (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full bg-white border border-primary-200 px-4 py-2 text-xs font-semibold text-primary-700 transition-all hover:bg-primary-50"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PortfolioPage;
