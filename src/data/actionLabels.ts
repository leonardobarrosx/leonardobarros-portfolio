import type { Lang } from "./content";

/** Short recruiter-facing actions, translated independently of long-form copy. */
interface ActionLabels {
  projects: string;
  linkedin: string;
  viewCv: string;
  downloadCv: string;
  contact: string;
  allProjects: string;
  fewerProjects: string;
  otherProjects: string;
  featured: string;
  background: string;
}
export const actionLabels: Record<Lang, ActionLabels> = {
  pt: { projects: "Ver projetos", linkedin: "LinkedIn", viewCv: "Visualizar currículo", downloadCv: "Baixar PDF", contact: "Fale comigo", allProjects: "Ver todos os projetos", fewerProjects: "Mostrar apenas destaques", otherProjects: "Outros projetos", featured: "Projetos em destaque", background: "Outras experiências" },
  en: { projects: "Explore projects", linkedin: "LinkedIn", viewCv: "View résumé", downloadCv: "Download PDF", contact: "Get in touch", allProjects: "View all projects", fewerProjects: "Show featured only", otherProjects: "More work", featured: "Featured projects", background: "Other experience" },
  es: { projects: "Ver proyectos", linkedin: "LinkedIn", viewCv: "Ver currículum", downloadCv: "Descargar PDF", contact: "Hablemos", allProjects: "Ver todos los proyectos", fewerProjects: "Solo destacados", otherProjects: "Otros proyectos", featured: "Proyectos destacados", background: "Otras experiencias" },
  de: { projects: "Projekte ansehen", linkedin: "LinkedIn", viewCv: "Lebenslauf ansehen", downloadCv: "PDF herunterladen", contact: "Kontakt", allProjects: "Alle Projekte ansehen", fewerProjects: "Nur Highlights", otherProjects: "Weitere Projekte", featured: "Ausgewählte Projekte", background: "Weitere Erfahrungen" },
  ja: { projects: "プロジェクトを見る", linkedin: "LinkedIn", viewCv: "履歴書を見る", downloadCv: "PDFを保存", contact: "お問い合わせ", allProjects: "全プロジェクトを見る", fewerProjects: "注目作品のみ", otherProjects: "その他の作品", featured: "注目プロジェクト", background: "その他の経験" },
  ko: { projects: "프로젝트 보기", linkedin: "LinkedIn", viewCv: "이력서 보기", downloadCv: "PDF 다운로드", contact: "연락하기", allProjects: "모든 프로젝트 보기", fewerProjects: "주요 프로젝트만", otherProjects: "다른 프로젝트", featured: "주요 프로젝트", background: "기타 경험" },
  zh: { projects: "查看项目", linkedin: "LinkedIn", viewCv: "查看简历", downloadCv: "下载PDF", contact: "联系我", allProjects: "查看所有项目", fewerProjects: "仅显示精选", otherProjects: "更多项目", featured: "精选项目", background: "其他经历" },
};
