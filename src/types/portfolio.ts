export type ProjectCategory = "Estrategia" | "Diseño" | "Website" | "Varios";
export type ProjectExecutionType = "Ficticio" | "Real" | "Estudio de Caso";

export type ProjectAttachmentType = "image" | "document" | "link" | "video";

export interface ProjectAttachment {
  id: string;
  label: string;
  type: ProjectAttachmentType;
  url: string;
}

export interface BaseProject {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  projectType: ProjectExecutionType;
  date: string;
  mainImage: string;
  summary: string;
  attachments?: ProjectAttachment[];
  externalLinks?: { label: string; url: string }[];
  createdAt?: string;
  updatedAt?: string;
}

export interface StrategyProject extends BaseProject {
  category: "Estrategia";
  content: {
    planteamientoDelProblema: string;
    objetivo: string;
    datosYBrief: string;
    fases: { fase: number; titulo: string; descripcion: string }[];
    evaluacion: string;
    conclusion: string;
  };
}

export interface DesignProject extends BaseProject {
  category: "Diseño";
  content: {
    brief: string;
    problema: string;
    usoIA: boolean;
    descripcion: string;
    conclusionOPresentacion: string;
  };
}

export interface WebsiteProject extends BaseProject {
  category: "Website";
  content: {
    brief: string;
    objetivo: string;
    arquitectura: string;
    stackTecnico: string[];
    experienciasInteractivo: string[];
    entregables: string[];
  };
}

export interface MiscProject extends BaseProject {
  category: "Varios";
  content: {
    categoria: string;
    descripcion: string;
    highlights: string[];
  };
}

export type PortfolioProject =
  | StrategyProject
  | DesignProject
  | WebsiteProject
  | MiscProject;

export interface PortfolioCollection {
  lastUpdated: string;
  projects: PortfolioProject[];
}
