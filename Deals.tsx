import { useState } from "react";
import { InteractiveButton } from "@/components/InteractiveButton";
import { ChevronLeft, Flame, Clock, Zap, Gift } from "lucide-react";
import { useLocation } from "wouter";

const DEALS = [
  {
    id: 1,
    name: "Neural Processor X1",
    originalPrice: 2999,
    dealPrice: 2299,
    discount: 23,
    timeLeft: "2h 30m",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663193835922/4zmDAZUzdsNwWeB6fGopys/product-showcase-glass-iVouFYB4JTnBkzWmNDMxtJ.webp",
    badge: "Flash Deal",
  },
  {
    id: 2,
    name: "Quantum RAM 128GB",
    originalPrice: 1899,
    dealPrice: 1499,
    discount: 21,
    timeLeft: "5h 15m",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663193835922/4zmDAZUzdsNwWeB6fGopys/product-showcase-glass-iVouFYB4JTnBkzWmNDMxtJ.webp",
    badge: "Oferta Limitada",
  },
  {
    id: 3,
    name: "Nexus SSD 4TB",
    originalPrice: 899,
    dealPrice: 649,
    discount: 28,
    timeLeft: "1h 45m",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663193835922/4zmDAZUzdsNwWeB6fGopys/product-showcase-glass-iVouFYB4JTnBkzWmNDMxtJ.webp",
    badge: "Mega Desconto",
  },
  {
    id: 4,
    name: "Fusion GPU RTX 5090",
    originalPrice: 3499,
    dealPrice: 2799,
    discount: 20,
    timeLeft: "3h 20m",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663193835922/4zmDAZUzdsNwWeB6fGopys/product-showcase-glass-iVouFYB4JTnBkzWmNDMxtJ.webp",
    badge: "Promoção",
  },
];

export default function Deals() {
  const [_location, setLocation] = useLocation();
  const [filter, setFilter] = useState("all");

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
            Ofertas Especiais
          </h1>
          <div className="w-32" />
        </div>
      </div>

      {/* Content */}
      <div className="pt-24 pb-20">
        <div className="container">
          {/* Hero Banner */}
          <div className="glassmorphism rounded-2xl p-12 glow-pink mb-12 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <Flame className="w-8 h-8 text-accent animate-bounce" />
                <span className="text-lg font-bold text-accent">MEGA VENDA</span>
              </div>
              <h2 className="text-5xl font-bold mb-4">Descontos Incríveis!</h2>
              <p className="text-xl text-muted-foreground mb-6 max-w-2xl">
                Aproveite nossas ofertas limitadas com descontos de até 28% em componentes de última geração.
              </p>
              <InteractiveButton
                variant="secondary"
                size="lg"
                onClick={() => setLocation("/catalog")}
              >
                Explorar Todas as Ofertas
              </InteractiveButton>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-4 mb-12 overflow-x-auto pb-4">
            {[
              { id: "all", label: "Todas", icon: <Gift className="w-4 h-4" /> },
              { id: "flash", label: "Flash Deals", icon: <Zap className="w-4 h-4" /> },
              { id: "limited", label: "Oferta Limitada", icon: <Clock className="w-4 h-4" /> },
              { id: "mega", label: "Mega Desconto", icon: <Flame className="w-4 h-4" /> },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  filter === f.id
                    ? "bg-primary text-background"
                    : "glassmorphism hover:glow-cyan"
                }`}
              >
                {f.icon}
                {f.label}
              </button>
            ))}
          </div>

          {/* Deals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {DEALS.map((deal) => (
              <div
                key={deal.id}
                className="glassmorphism rounded-xl overflow-hidden hover:glow-cyan transition-all duration-300 hover:scale-105 group cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
                  <img
                    src={deal.image}
                    alt={deal.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

                  {/* Discount Badge */}
                  <div className="absolute top-3 right-3 bg-accent text-background px-3 py-1 rounded-full font-bold text-sm">
                    -{deal.discount}%
                  </div>

                  {/* Deal Badge */}
                  <div className="absolute top-3 left-3 bg-primary/90 text-background px-3 py-1 rounded-full font-bold text-xs flex items-center gap-1">
                    <Flame className="w-3 h-3" />
                    {deal.badge}
                  </div>

                  {/* Timer */}
                  <div className="absolute bottom-3 left-3 bg-background/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <Clock className="w-3 h-3 text-secondary" />
                    {deal.timeLeft}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-bold mb-3 line-clamp-2">{deal.name}</h3>

                  {/* Prices */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl font-bold text-accent">
                        ${deal.dealPrice}
                      </span>
                      <span className="text-sm text-muted-foreground line-through">
                        ${deal.originalPrice}
                      </span>
                    </div>
                    <p className="text-xs text-green-400 font-semibold">
                      Você economiza ${deal.originalPrice - deal.dealPrice}
                    </p>
                  </div>

                  <InteractiveButton
                    variant="primary"
                    size="sm"
                    className="w-full"
                  >
                    Adicionar ao Carrinho
                  </InteractiveButton>
                </div>
              </div>
            ))}
          </div>

          {/* Newsletter CTA */}
          <div className="mt-20 glassmorphism rounded-2xl p-12 text-center glow-purple hover:glow-cyan transition-all">
            <h3 className="text-3xl font-bold mb-4">Não perca nenhuma oferta!</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Inscreva-se na nossa newsletter para receber notificações de flash deals e ofertas exclusivas.
            </p>
            <div className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="seu@email.com"
                className="flex-1 px-4 py-3 glassmorphism rounded-lg border border-border focus:outline-none focus:border-primary"
              />
              <InteractiveButton variant="primary" size="lg">
                Inscrever
              </InteractiveButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
