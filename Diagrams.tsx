import { useState } from "react";
import { InteractiveButton } from "@/components/InteractiveButton";
import { ChevronLeft, ZoomIn, ZoomOut, Download } from "lucide-react";
import { useLocation } from "wouter";

export default function Diagrams() {
  const [_location, setLocation] = useLocation();
  const [zoom, setZoom] = useState(100);
  const [activeTab, setActiveTab] = useState<"use-case" | "class">("use-case");

  const handleZoom = (direction: "in" | "out") => {
    if (direction === "in" && zoom < 200) {
      setZoom(zoom + 10);
    } else if (direction === "out" && zoom > 50) {
      setZoom(zoom - 10);
    }
  };

  const handleDownload = (type: string) => {
    const link = document.createElement("a");
    link.href = type === "use-case" ? "/use-case-diagram.png" : "/class-diagram.png";
    link.download = `${type}-diagram.png`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 glassmorphism backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between py-4">
          <InteractiveButton
            variant="outline"
            size="md"
            onClick={() => setLocation("/")}
          >
            <ChevronLeft className="w-5 h-5" />
            Voltar
          </InteractiveButton>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Diagramas Técnicos
          </h1>
          <div className="w-32" />
        </div>
      </div>

      {/* Tabs */}
      <div className="fixed top-20 left-0 right-0 z-40 glassmorphism backdrop-blur-md border-b border-border">
        <div className="container flex gap-4 py-4">
          <button
            onClick={() => setActiveTab("use-case")}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              activeTab === "use-case"
                ? "bg-primary text-background"
                : "hover:bg-primary/20"
            }`}
          >
            Caso de Uso
          </button>
          <button
            onClick={() => setActiveTab("class")}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              activeTab === "class"
                ? "bg-primary text-background"
                : "hover:bg-primary/20"
            }`}
          >
            Classes
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 glassmorphism rounded-full px-6 py-3 flex items-center gap-4 border border-border">
        <InteractiveButton
          variant="outline"
          size="sm"
          onClick={() => handleZoom("out")}
        >
          <ZoomOut className="w-4 h-4" />
        </InteractiveButton>
        <span className="text-sm font-semibold min-w-12 text-center">{zoom}%</span>
        <InteractiveButton
          variant="outline"
          size="sm"
          onClick={() => handleZoom("in")}
        >
          <ZoomIn className="w-4 h-4" />
        </InteractiveButton>
        <div className="w-px h-6 bg-border" />
        <InteractiveButton
          variant="primary"
          size="sm"
          onClick={() => handleDownload(activeTab)}
        >
          <Download className="w-4 h-4" />
          Download
        </InteractiveButton>
      </div>

      {/* Content */}
      <div className="pt-32 pb-32 px-4">
        <div className="flex justify-center">
          <div
            className="overflow-auto max-w-6xl w-full rounded-xl border border-border glassmorphism p-8"
            style={{
              maxHeight: "calc(100vh - 200px)",
            }}
          >
            {activeTab === "use-case" ? (
              <div style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top center" }}>
                <img
                  src="/use-case-diagram.png"
                  alt="Use Case Diagram"
                  className="w-full h-auto"
                />
              </div>
            ) : (
              <div style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top center" }}>
                <img
                  src="/class-diagram.png"
                  alt="Class Diagram"
                  className="w-full h-auto"
                />
              </div>
            )}
          </div>
        </div>

        {/* Descriptions */}
        <div className="container mt-12 max-w-4xl mx-auto">
          {activeTab === "use-case" ? (
            <div className="glassmorphism rounded-xl p-8 glow-purple">
              <h2 className="text-3xl font-bold mb-4">Diagrama de Caso de Uso</h2>
              <p className="text-muted-foreground mb-6">
                Este diagrama ilustra as principais interações entre os atores (Usuário e Administrador) e o sistema de catálogo digital. Mostra os casos de uso disponíveis para cada tipo de usuário e como eles interagem com o sistema.
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-secondary mb-2">Atores Principais:</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• <span className="text-primary font-semibold">Usuário:</span> Navega, busca, filtra produtos e realiza compras</li>
                    <li>• <span className="text-accent font-semibold">Administrador:</span> Gerencia produtos, estoque e visualiza análises</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-secondary mb-2">Casos de Uso Principais:</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Navegar e pesquisar produtos</li>
                    <li>• Filtrar por categoria</li>
                    <li>• Adicionar ao carrinho e finalizar compra</li>
                    <li>• Gerenciar inventário e produtos</li>
                    <li>• Receber notificações de pedidos</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="glassmorphism rounded-xl p-8 glow-cyan">
              <h2 className="text-3xl font-bold mb-4">Diagrama de Classes</h2>
              <p className="text-muted-foreground mb-6">
                Este diagrama apresenta a estrutura de dados do sistema, mostrando as classes principais, seus atributos e relacionamentos. Define como os dados são organizados e como as diferentes entidades se conectam.
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-secondary mb-2">Classes Principais:</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• <span className="text-primary font-semibold">Product:</span> Representa um produto no catálogo</li>
                    <li>• <span className="text-primary font-semibold">Category:</span> Agrupa produtos por categoria</li>
                    <li>• <span className="text-accent font-semibold">Cart:</span> Carrinho de compras do usuário</li>
                    <li>• <span className="text-accent font-semibold">Order:</span> Pedido realizado</li>
                    <li>• <span className="text-secondary font-semibold">User:</span> Usuário do sistema</li>
                    <li>• <span className="text-secondary font-semibold">Admin:</span> Administrador do sistema</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-secondary mb-2">Relacionamentos:</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Um Usuário pode ter um Carrinho e múltiplos Pedidos</li>
                    <li>• Um Carrinho contém múltiplos CartItems</li>
                    <li>• Um Pedido contém múltiplos CartItems</li>
                    <li>• Um Administrador gerencia múltiplos Produtos</li>
                    <li>• Cada Produto pertence a uma Categoria</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
