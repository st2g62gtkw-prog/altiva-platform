import type {
  Alert,
  Budget,
  DocumentRecord,
  InternalProject,
  PublicProject,
  Report,
  Task
} from "@/types";
import type { AssistantMessage } from "@/lib/ai/types";

export const publicProjects: PublicProject[] = [
  {
    slug: "mejoramiento-sede-comunitaria",
    title: "Mejoramiento de sede comunitaria",
    category: "Equipamiento comunitario",
    location: "Region Metropolitana",
    year: "2025",
    summary:
      "Coordinacion tecnica para remodelacion interior, control de partidas y recepcion municipal.",
    description:
      "Proyecto enfocado en recuperar espacios de uso comunitario con control de calidad, revision de antecedentes y seguimiento de avance fisico. La gestion priorizo continuidad operativa, seguridad y trazabilidad documental.",
    metrics: [
      { label: "Superficie", value: "420 m2" },
      { label: "Duracion", value: "5 meses" },
      { label: "Alcance", value: "Remodelacion" }
    ],
    services: ["Planificacion", "Control de obra", "Recepcion tecnica"]
  },
  {
    slug: "habilitacion-oficinas-tecnicas",
    title: "Habilitacion de oficinas tecnicas",
    category: "Edificacion menor",
    location: "Valparaiso",
    year: "2024",
    summary:
      "Gestion de presupuesto, cubicaciones y coordinacion de especialidades para oficinas de operacion.",
    description:
      "Habilitacion de espacios administrativos con control de cambios, validacion de partidas y coordinacion con proveedores. Se trabajaron reportes semanales y matriz de pendientes tecnicos.",
    metrics: [
      { label: "Superficie", value: "680 m2" },
      { label: "Partidas", value: "96" },
      { label: "Especialidades", value: "4" }
    ],
    services: ["Cubicaciones", "Presupuesto", "Coordinacion tecnica"]
  },
  {
    slug: "regularizacion-infraestructura",
    title: "Regularizacion de infraestructura",
    category: "Revision documental",
    location: "Biobio",
    year: "2023",
    summary:
      "Ordenamiento de antecedentes tecnicos, permisos y reportes para regularizacion progresiva.",
    description:
      "Levantamiento y clasificacion de informacion tecnica para apoyar procesos de regularizacion. Se definio un inventario documental y una ruta de cierre por prioridad.",
    metrics: [
      { label: "Documentos", value: "140+" },
      { label: "Unidades", value: "12" },
      { label: "Etapas", value: "3" }
    ],
    services: ["Auditoria documental", "Plan de cierre", "Reportabilidad"]
  }
];

export const internalProjects: InternalProject[] = [
  {
    id: "prj-001",
    name: "Condominio Las Lomas - etapa 1",
    client: "Inmobiliaria Los Andes",
    location: "Puente Alto",
    status: "active",
    progress: 64,
    budget: 486000000,
    spent: 292000000,
    nextMilestone: "Revision de avance de obra gruesa",
    riskLevel: "medium"
  },
  {
    id: "prj-002",
    name: "Reposicion cubierta gimnasio municipal",
    client: "Municipalidad piloto",
    location: "Rancagua",
    status: "planning",
    progress: 18,
    budget: 126000000,
    spent: 9000000,
    nextMilestone: "Validacion de presupuesto oficial",
    riskLevel: "low"
  },
  {
    id: "prj-003",
    name: "Centro logistico norte",
    client: "Operadora Industrial Norte",
    location: "Quilicura",
    status: "paused",
    progress: 42,
    budget: 760000000,
    spent: 211000000,
    nextMilestone: "Resolver interferencias de instalaciones",
    riskLevel: "high"
  }
];

export const budgets: Budget[] = [
  {
    id: "bud-001",
    projectId: "prj-001",
    name: "Presupuesto control obra gruesa",
    amount: 218000000,
    status: "approved",
    updatedAt: "2026-06-12"
  },
  {
    id: "bud-002",
    projectId: "prj-002",
    name: "Reposicion cubierta y evacuacion aguas lluvias",
    amount: 126000000,
    status: "review",
    updatedAt: "2026-06-18"
  },
  {
    id: "bud-003",
    projectId: "prj-003",
    name: "Ajuste por interferencias de especialidades",
    amount: 84000000,
    status: "draft",
    updatedAt: "2026-06-20"
  }
];

export const documents: DocumentRecord[] = [
  {
    id: "doc-001",
    projectId: "prj-001",
    name: "Planos arquitectura revision B",
    type: "plan",
    status: "reviewed",
    source: "mock",
    updatedAt: "2026-06-10"
  },
  {
    id: "doc-002",
    projectId: "prj-001",
    name: "Informe avance mensual mayo",
    type: "report",
    status: "approved",
    source: "mock",
    updatedAt: "2026-06-05"
  },
  {
    id: "doc-003",
    projectId: "prj-002",
    name: "Permiso intervencion estructura existente",
    type: "permit",
    status: "pending",
    source: "drive",
    updatedAt: "2026-06-21"
  },
  {
    id: "doc-004",
    projectId: "prj-003",
    name: "Matriz interferencias instalaciones",
    type: "technical",
    status: "pending",
    source: "mock",
    updatedAt: "2026-06-19"
  }
];

export const reports: Report[] = [
  {
    id: "rep-001",
    projectId: "prj-001",
    title: "Reporte avance semana 24",
    period: "Junio 2026",
    status: "ready",
    highlights: ["Avance fisico 64%", "Sin accidentes reportados", "Pendiente aprobacion de EETT"]
  },
  {
    id: "rep-002",
    projectId: "prj-003",
    title: "Reporte de riesgos por interferencias",
    period: "Junio 2026",
    status: "draft",
    highlights: ["Riesgo alto por cambios de trazado", "Requiere decision de mandante"]
  }
];

export const tasks: Task[] = [
  {
    id: "tsk-001",
    projectId: "prj-001",
    title: "Cerrar observaciones de planos sanitarios",
    owner: "Jefe tecnico",
    dueDate: "2026-06-28",
    status: "in_progress"
  },
  {
    id: "tsk-002",
    projectId: "prj-002",
    title: "Confirmar proveedores de cubierta",
    owner: "Compras",
    dueDate: "2026-06-30",
    status: "pending"
  },
  {
    id: "tsk-003",
    projectId: "prj-003",
    title: "Emitir minuta de coordinacion de especialidades",
    owner: "Coordinacion",
    dueDate: "2026-06-26",
    status: "pending"
  }
];

export const alerts: Alert[] = [
  {
    id: "alt-001",
    title: "Documento critico pendiente",
    description: "El permiso de intervencion de estructura existente sigue sin aprobacion.",
    severity: "warning"
  },
  {
    id: "alt-002",
    title: "Riesgo de interferencias",
    description: "Centro logistico norte mantiene riesgo alto por instalaciones existentes.",
    severity: "critical"
  },
  {
    id: "alt-003",
    title: "Preparar reporte semanal",
    description: "Hay 2 proyectos con informacion suficiente para reporte de avance.",
    severity: "info"
  }
];

export const assistantMessages: AssistantMessage[] = [
  {
    id: "msg-001",
    role: "assistant",
    content:
      "Soy el asistente tecnico V1 de Altiva. Puedo ayudarte a ordenar documentos, riesgos, presupuestos, minutas y reportes de avance.",
    createdAt: "2026-06-24T09:00:00.000Z"
  }
];

export const personalNotes = [
  {
    id: "note-001",
    title: "Ideas para Altiva",
    summary: "Separar espacios personal, tecnico y externo antes de sumar datos reales.",
    updatedAt: "2026-06-24"
  },
  {
    id: "note-002",
    title: "Rutina de estudio PMP",
    summary: "Bloques de 30 minutos con preguntas situacionales y revision de errores.",
    updatedAt: "2026-06-23"
  },
  {
    id: "note-003",
    title: "Checklist oficina tecnica",
    summary: "Ordenar RFIs, minutas, pendientes y documentos criticos por proyecto.",
    updatedAt: "2026-06-21"
  }
];

export const personalTasks = [
  {
    id: "personal-task-001",
    title: "Preparar roadmap de IA personal",
    area: "Altiva",
    status: "pending",
    dueDate: "2026-06-30"
  },
  {
    id: "personal-task-002",
    title: "Repasar gestion de alcance PMP",
    area: "Estudio",
    status: "in_progress",
    dueDate: "2026-07-02"
  },
  {
    id: "personal-task-003",
    title: "Definir plantilla diaria de notas",
    area: "Productividad",
    status: "pending",
    dueDate: "2026-07-05"
  }
];

export const studyTopics = [
  {
    id: "study-001",
    title: "PMP: gestion de riesgos",
    progress: 45,
    nextAction: "Practicar 10 preguntas situacionales."
  },
  {
    id: "study-002",
    title: "ITO: control documental",
    progress: 30,
    nextAction: "Crear checklist de recepcion de antecedentes."
  },
  {
    id: "study-003",
    title: "Oficina tecnica",
    progress: 60,
    nextAction: "Estandarizar minuta y matriz de pendientes."
  }
];

export const personalTests = [
  {
    id: "test-001",
    title: "Test PMP situacional",
    questions: 15,
    status: "draft"
  },
  {
    id: "test-002",
    title: "Test ITO control de obra",
    questions: 12,
    status: "ready"
  }
];

export const habits = [
  {
    id: "habit-001",
    title: "Estudio diario",
    cadence: "5 dias por semana",
    streak: "3 dias"
  },
  {
    id: "habit-002",
    title: "Revision de tareas",
    cadence: "Cada manana",
    streak: "6 dias"
  },
  {
    id: "habit-003",
    title: "Cierre semanal",
    cadence: "Viernes",
    streak: "2 semanas"
  }
];

export const personalIdeas = [
  "Crear un tablero de decisiones.",
  "Agregar resumen semanal con IA.",
  "Separar notas personales de antecedentes tecnicos.",
  "Disenar tests tipo PMP/ITO por categoria."
];
