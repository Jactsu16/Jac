import { useState, useEffect, FormEvent } from "react";
import { Lock, Save, Download, Upload, Plus, Edit2, Trash2, X } from "lucide-react";
import { PortfolioProject, ProjectCategory, ProjectExecutionType } from "../types/portfolio";

// Función simple de cifrado (SHA-256 simulado para frontend)
const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

const AdminPanelPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [editingProject, setEditingProject] = useState<PortfolioProject | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const HASHED_PASSWORD = "c775e7b757ede630cd0aa1113bd102661ab38829ca52a6422ab782862f268646"; // 160004

  useEffect(() => {
    const stored = localStorage.getItem("visela-portfolio-projects");
    if (stored) {
      try {
        setProjects(JSON.parse(stored));
      } catch (e) {
        console.error("Error loading projects", e);
      }
    }
  }, []);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const hashed = await hashPassword(password);
    if (hashed === HASHED_PASSWORD) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Contraseña incorrecta");
    }
  };

  const saveProjects = (updatedProjects: PortfolioProject[]) => {
    localStorage.setItem("visela-portfolio-projects", JSON.stringify(updatedProjects));
    setProjects(updatedProjects);
    showSuccess();
  };

  const showSuccess = () => {
    setSuccessMessage("Cambios guardados correctamente");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleSaveProject = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newProject: PortfolioProject = {
      id: editingProject?.id || `project-${Date.now()}`,
      slug: formData.get("slug") as string || `slug-${Date.now()}`,
      title: formData.get("title") as string,
      category: formData.get("category") as ProjectCategory,
      projectType: formData.get("projectType") as ProjectExecutionType,
      date: formData.get("date") as string,
      mainImage: formData.get("mainImage") as string,
      summary: formData.get("summary") as string,
      content: {} as any, // Simplificado para este ejemplo
      attachments: [],
      externalLinks: formData.get("externalLinks") 
        ? (formData.get("externalLinks") as string).split(",").map(url => ({ label: url.trim(), url: url.trim() }))
        : []
    };

    const imageUrls = formData.get("imageUrls") as string;
    if (imageUrls) {
      newProject.attachments = imageUrls.split(",").map((url, idx) => ({
        id: `img-${idx}`,
        label: `Imagen ${idx + 1}`,
        type: "image" as const,
        url: url.trim()
      }));
    }

    const updatedProjects = editingProject
      ? projects.map(p => p.id === editingProject.id ? newProject : p)
      : [...projects, newProject];

    saveProjects(updatedProjects);
    setShowForm(false);
    setEditingProject(null);
  };

  const handleDeleteProject = (id: string) => {
    if (confirm("¿Eliminar este proyecto?")) {
      saveProjects(projects.filter(p => p.id !== id));
    }
  };

  const handleExport = () => {
    const data = {
      projects,
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (data.projects) {
          saveProjects(data.projects);
        }
      } catch (err) {
        alert("Error al importar: " + (err as Error).message);
      }
    };
    reader.readAsText(file);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-white p-6">
        <div className="w-full max-w-md bg-white border border-primary-100 rounded-2xl p-8 shadow-xl">
          <div className="flex items-center justify-center mb-6">
            <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center">
              <Lock className="h-8 w-8 text-primary-600" />
            </div>
          </div>
          <h2 className="font-name text-2xl text-center text-primary-700 mb-6">Panel de Administración</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-primary-700 mb-2">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-primary-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Ingresa tu contraseña"
              />
            </div>
            {error && (
              <p className="text-sm text-accent1-500">{error}</p>
            )}
            <button
              type="submit"
              className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 rounded-lg transition"
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 pt-20">
      <div className="sticky top-0 z-40 bg-white border-b border-primary-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="font-name text-2xl font-bold text-primary-700">Panel de Administración</h1>
            <p className="text-xs font-semibold text-primary-500">Gestiona tu portafolio y contenido</p>
          </div>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg text-sm font-semibold transition"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>

      {successMessage && (
        <div className="max-w-7xl mx-auto px-6 pt-4">
          <div className="bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            ✓ {successMessage}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-name text-2xl text-primary-700">Proyectos</h2>
          <div className="flex gap-3">
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-primary-100 hover:bg-primary-200 text-primary-700 rounded-lg text-sm font-semibold transition"
            >
              <Download className="h-4 w-4" />
              Exportar
            </button>
            <label className="flex items-center gap-2 px-4 py-2 bg-primary-100 hover:bg-primary-200 text-primary-700 rounded-lg text-sm font-semibold transition cursor-pointer">
              <Upload className="h-4 w-4" />
              Importar
              <input type="file" accept=".json" onChange={handleImport} className="hidden" />
            </label>
            <button
              onClick={() => { setEditingProject(null); setShowForm(true); }}
              className="flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-sm font-semibold transition"
            >
              <Plus className="h-4 w-4" />
              Nuevo Proyecto
            </button>
          </div>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-name text-xl text-primary-700">
                  {editingProject ? "Editar Proyecto" : "Nuevo Proyecto"}
                </h3>
                <button onClick={() => setShowForm(false)} className="text-neutral-500 hover:text-neutral-700">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSaveProject} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-primary-700 mb-1">Título</label>
                  <input name="title" defaultValue={editingProject?.title} required className="w-full px-3 py-2 border border-primary-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-primary-700 mb-1">Categoría</label>
                    <select name="category" defaultValue={editingProject?.category} required className="w-full px-3 py-2 border border-primary-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                      <option value="Estrategia">Estrategia</option>
                      <option value="Diseño">Diseño</option>
                      <option value="Website">Website</option>
                      <option value="Varios">Varios</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-primary-700 mb-1">Tipo</label>
                    <select name="projectType" defaultValue={editingProject?.projectType} required className="w-full px-3 py-2 border border-primary-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                      <option value="Real">Real</option>
                      <option value="Ficticio">Ficticio</option>
                      <option value="Estudio de Caso">Estudio de Caso</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary-700 mb-1">Fecha</label>
                  <input type="date" name="date" defaultValue={editingProject?.date} required className="w-full px-3 py-2 border border-primary-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary-700 mb-1">Imagen Principal (URL)</label>
                  <input type="url" name="mainImage" defaultValue={editingProject?.mainImage} placeholder="https://..." className="w-full px-3 py-2 border border-primary-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary-700 mb-1">Slug</label>
                  <input name="slug" defaultValue={editingProject?.slug} placeholder="proyecto-ejemplo" className="w-full px-3 py-2 border border-primary-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary-700 mb-1">Resumen</label>
                  <textarea name="summary" defaultValue={editingProject?.summary} rows={3} required className="w-full px-3 py-2 border border-primary-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary-700 mb-1">Imágenes Adicionales (URLs separadas por coma)</label>
                  <textarea name="imageUrls" placeholder="https://imagen1.jpg, https://imagen2.jpg" rows={2} className="w-full px-3 py-2 border border-primary-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary-700 mb-1">Enlaces Externos (URLs separadas por coma)</label>
                  <textarea name="externalLinks" placeholder="https://link1.com, https://link2.com" rows={2} className="w-full px-3 py-2 border border-primary-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold transition"
                  >
                    <Save className="h-4 w-4" />
                    Guardar
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 px-4 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg font-semibold transition"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="bg-white border border-primary-100 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-primary-50 border-b-2 border-primary-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold text-primary-700 uppercase">Título</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-primary-700 uppercase">Categoría</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-primary-700 uppercase">Fecha</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-primary-700 uppercase">Tipo</th>
                <th className="px-4 py-3 text-right text-xs font-bold text-primary-700 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b border-primary-100 hover:bg-primary-50 transition">
                  <td className="px-4 py-3 text-sm font-semibold text-primary-900">{project.title}</td>
                  <td className="px-4 py-3 text-sm text-neutral-700">{project.category}</td>
                  <td className="px-4 py-3 text-sm text-neutral-700">
                    {new Date(project.date).toLocaleDateString("es-ES")}
                  </td>
                  <td className="px-4 py-3 text-xs">
                    <span className="inline-block px-2 py-1 rounded bg-primary-100 text-primary-700 font-semibold">
                      {project.projectType}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => { setEditingProject(project); setShowForm(true); }}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 hover:bg-primary-200 text-primary-700 rounded text-xs font-semibold transition mr-2"
                    >
                      <Edit2 className="h-3 w-3" />
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-accent1-100 hover:bg-accent1-200 text-accent1-700 rounded text-xs font-semibold transition"
                    >
                      <Trash2 className="h-3 w-3" />
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {projects.length === 0 && (
            <div className="text-center py-12 text-neutral-500">
              No hay proyectos todavía. Crea uno nuevo para comenzar.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanelPage;
