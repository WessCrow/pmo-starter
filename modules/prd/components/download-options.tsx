"use client";

import React, { useState } from "react";
import { useNewProject, type ProjectInput } from "@/modules/prd/context/new-project-context";
import {
  generateMarkdownPRD,
  generateMarkdownSummary,
  generateMarkdownRoadmap,
} from "@/services/markdown-generator";

// ─── Ícones simples inline ────────────────────────────────────────────────────

const IconDownload = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const IconFile = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);

const IconPackage = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.25 6.375c0 2.278-1.535 4.172-3.6 4.972a6.002 6.002 0 002.134 5.6 6 6 0 01-8.946 2.05A6.002 6.002 0 005.25 20.75" />
  </svg>
);

// ─── Tipos ────────────────────────────────────────────────────────────────────

export type DownloadFormat = "simple" | "frontmatter" | "zip";

interface DownloadOption {
  id: DownloadFormat;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

// ─── Utilitários de Download ──────────────────────────────────────────────────

class DownloadManager {
  static downloadText(text: string, filename: string) {
    const blob = new Blob([text], { type: "text/markdown;charset=utf-8" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }

  static async downloadZip(files: Record<string, string>, zipName: string) {
    // Para MVP, usar jszip (já que é cliente)
    // Em produção, poderia gerar ZIP no servidor
    try {
      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();

      // Adicionar arquivos ao ZIP
      Object.entries(files).forEach(([filename, content]) => {
        zip.file(filename, content);
      });

      // Gerar blob e download
      const blob = await zip.generateAsync({ type: "blob" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);

      link.setAttribute("href", url);
      link.setAttribute("download", zipName);
      link.style.visibility = "hidden";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erro ao gerar ZIP:", error);
      alert(
        "Não foi possível criar ZIP. Tente baixar em formato Markdown simples."
      );
    }
  }
}

// ─── Componente Principal ──────────────────────────────────────────────────────

export function DownloadOptions() {
  const { collectedData, projectId } = useNewProject();
  const [isLoading, setIsLoading] = useState<DownloadFormat | null>(null);

  const downloadOptions: DownloadOption[] = [
    {
      id: "simple",
      label: "Markdown Simples",
      description: "Arquivo .md básico sem metadados",
      icon: <IconFile />,
      color: "hover:bg-blue-50 border-blue-200",
    },
    {
      id: "frontmatter",
      label: "Markdown + Metadados",
      description: "Arquivo .md com YAML frontmatter para ferramentas",
      icon: <IconFile />,
      color: "hover:bg-purple-50 border-purple-200",
    },
    {
      id: "zip",
      label: "Pacote Completo",
      description: "ZIP com PRD, resumo e roadmap em Markdown",
      icon: <IconPackage />,
      color: "hover:bg-green-50 border-green-200",
    },
  ];

  const handleDownload = async (format: DownloadFormat) => {
    if (!collectedData.productName) {
      alert("Preencha o nome do produto primeiro");
      return;
    }

    setIsLoading(format);

    try {
      const input = {
        ...collectedData,
        role: "PM" as const,
        projectId,
        generatedAt: new Date(),
      };

      if (format === "simple" || format === "frontmatter") {
        const prd = generateMarkdownPRD(input);
        const content = format === "simple" ? prd.simple : prd.withFrontmatter;
        DownloadManager.downloadText(content, prd.filename);
      } else if (format === "zip") {
        const prd = generateMarkdownPRD(input);
        const summary = generateMarkdownSummary(input);
        const roadmap = generateMarkdownRoadmap(input);

        const files: Record<string, string> = {
          "PRD.md": prd.withFrontmatter,
          "RESUMO-EXECUTIVO.md": summary,
          "ROADMAP.md": roadmap,
          "metadata.json": JSON.stringify(input, null, 2),
        };

        const zipName = `${collectedData.productName}-PRD-${Date.now()}.zip`;
        await DownloadManager.downloadZip(files, zipName);
      }
    } catch (error) {
      console.error("Erro ao baixar:", error);
      alert("Erro ao processar download");
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Baixar Documentos</h2>
        <p className="text-sm text-slate-600 mt-1">
          Escolha o formato desejado para seus documentos PRD
        </p>
      </div>

      {/* Opções de download */}
      <div className="grid grid-cols-1 gap-3">
        {downloadOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => handleDownload(option.id)}
            disabled={isLoading !== null && isLoading !== option.id}
            className={`p-4 border rounded-lg transition-all text-left ${
              option.color
            } ${
              isLoading === option.id
                ? "opacity-75 cursor-wait"
                : isLoading !== null
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                <div className="text-slate-600 mt-0.5">{option.icon}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 text-sm">
                    {option.label}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    {option.description}
                  </p>
                </div>
              </div>
              <div className="flex-shrink-0 text-slate-400">
                {isLoading === option.id ? (
                  <span className="inline-block animate-spin">⟳</span>
                ) : (
                  <IconDownload />
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-xs text-blue-700">
          <strong>Dica:</strong> Use o formato "Markdown + Metadados" para importar em ferramentas
          como Obsidian, Notion ou GitHub.
        </p>
      </div>
    </div>
  );
}
