import { useState } from "react";
import { InteractiveButton } from "@/components/InteractiveButton";
import { ChevronLeft, User, Package, Heart, Settings, LogOut, Edit2 } from "lucide-react";
import { useLocation } from "wouter";

export default function Profile() {
  const [_location, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("overview");

  const orders = [
    { id: "ORD-001", date: "2026-06-08", total: 4898, status: "Entregue" },
    { id: "ORD-002", date: "2026-06-05", total: 1899, status: "Em Trânsito" },
    { id: "ORD-003", date: "2026-06-01", total: 3499, status: "Processando" },
  ];

  const favorites = [
    { id: 1, name: "Neural Processor X1", price: 2999 },
    { id: 2, name: "Quantum RAM 128GB", price: 1899 },
    { id: 3, name: "Fusion GPU RTX 5090", price: 3499 },
  ];

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
            Meu Perfil
          </h1>
          <div className="w-32" />
        </div>
      </div>

      {/* Content */}
      <div className="pt-24 pb-20">
        <div className="container max-w-6xl">
          {/* Profile Header */}
          <div className="glassmorphism rounded-2xl p-8 glow-purple mb-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <User className="w-12 h-12 text-background" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-2">João Silva</h2>
                  <p className="text-muted-foreground mb-3">joao@techcatalog.com</p>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-semibold">
                      Cliente Premium
                    </span>
                    <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-semibold">
                      Membro desde 2024
                    </span>
                  </div>
                </div>
              </div>
              <InteractiveButton variant="outline" size="md">
                <Edit2 className="w-5 h-5" />
                Editar Perfil
              </InteractiveButton>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b border-border">
            {[
              { id: "overview", label: "Visão Geral", icon: <Package className="w-5 h-5" /> },
              { id: "orders", label: "Pedidos", icon: <Package className="w-5 h-5" /> },
              { id: "favorites", label: "Favoritos", icon: <Heart className="w-5 h-5" /> },
              { id: "settings", label: "Configurações", icon: <Settings className="w-5 h-5" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 font-semibold border-b-2 transition-all ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                { label: "Pedidos Totais", value: "12", color: "primary" },
                { label: "Gasto Total", value: "$15,299", color: "secondary" },
                { label: "Pontos de Fidelidade", value: "2,450", color: "accent" },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className={`glassmorphism rounded-xl p-6 glow-${stat.color} hover:scale-105 transition-all`}
                >
                  <p className="text-muted-foreground mb-2">{stat.label}</p>
                  <p className={`text-4xl font-bold text-${stat.color}`}>{stat.value}</p>
                </div>
              ))}
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="glassmorphism rounded-xl p-6 hover:glow-cyan transition-all flex items-center justify-between"
                >
                  <div>
                    <h3 className="text-lg font-bold mb-2">{order.id}</h3>
                    <p className="text-muted-foreground">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-accent mb-2">${order.total}</p>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        order.status === "Entregue"
                          ? "bg-green-500/20 text-green-400"
                          : order.status === "Em Trânsito"
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Favorites Tab */}
          {activeTab === "favorites" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {favorites.map((item) => (
                <div
                  key={item.id}
                  className="glassmorphism rounded-xl p-6 hover:glow-pink transition-all text-center cursor-pointer hover:scale-105"
                >
                  <Heart className="w-8 h-8 text-accent mx-auto mb-4 fill-accent" />
                  <h3 className="text-lg font-bold mb-2">{item.name}</h3>
                  <p className="text-2xl font-bold text-accent mb-4">${item.price}</p>
                  <InteractiveButton variant="primary" size="sm" className="w-full">
                    Adicionar ao Carrinho
                  </InteractiveButton>
                </div>
              ))}
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              {[
                { label: "Notificações por Email", enabled: true },
                { label: "Notificações SMS", enabled: false },
                { label: "Newsletter", enabled: true },
                { label: "Ofertas Exclusivas", enabled: true },
              ].map((setting, idx) => (
                <div
                  key={idx}
                  className="glassmorphism rounded-xl p-6 flex items-center justify-between hover:glow-cyan transition-all"
                >
                  <span className="font-semibold">{setting.label}</span>
                  <button
                    className={`w-12 h-6 rounded-full transition-all ${
                      setting.enabled ? "bg-primary" : "bg-primary/20"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-background transition-all ${
                        setting.enabled ? "translate-x-6" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>
              ))}
              <InteractiveButton
                variant="outline"
                size="lg"
                className="w-full mt-8"
                onClick={() => setLocation("/")}
              >
                <LogOut className="w-5 h-5" />
                Sair
              </InteractiveButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
