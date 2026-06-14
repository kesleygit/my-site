import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, Zap, Cpu, Layers, ChevronRight, Star, TrendingUp, Sparkles, Rocket, Shield, Flame, BarChart3, User, LogIn } from "lucide-react";
import { InteractiveButton } from "@/components/InteractiveButton";
import { ProductModal } from "@/components/ProductModal";
import { Toast, ToastMessage } from "@/components/Toast";
import { AdvancedSearch } from "@/components/AdvancedSearch";
import { WishlistNotification } from "@/components/WishlistNotification";
import { useLocation } from "wouter";

const PRODUCTS = [
  {
    id: 1,
    name: "Neural Processor X1",
    category: "Processadores",
    price: 2999,
    rating: 4.8,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663193835922/4zmDAZUzdsNwWeB6fGopys/product-showcase-glass-iVouFYB4JTnBkzWmNDMxtJ.webp",
    description: "Processador de última geração com IA integrada",
    specs: ["16 cores", "32 threads", "5.8 GHz", "TDP 125W"],
  },
  {
    id: 2,
    name: "Quantum RAM 128GB",
    category: "Memória",
    price: 1899,
    rating: 4.9,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663193835922/4zmDAZUzdsNwWeB6fGopys/product-showcase-glass-iVouFYB4JTnBkzWmNDMxtJ.webp",
    description: "Memória ultra-rápida para desempenho máximo",
    specs: ["DDR5", "6000 MHz", "CAS 30", "RGB"],
  },
  {
    id: 3,
    name: "Nexus SSD 4TB",
    category: "Armazenamento",
    price: 899,
    rating: 4.7,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663193835922/4zmDAZUzdsNwWeB6fGopys/product-showcase-glass-iVouFYB4JTnBkzWmNDMxtJ.webp",
    description: "SSD de alta velocidade com tecnologia NVMe",
    specs: ["NVMe M.2", "7400 MB/s", "4TB", "5 anos garantia"],
  },
  {
    id: 4,
    name: "Fusion GPU RTX 5090",
    category: "Placas Gráficas",
    price: 3499,
    rating: 4.9,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663193835922/4zmDAZUzdsNwWeB6fGopys/product-showcase-glass-iVouFYB4JTnBkzWmNDMxtJ.webp",
    description: "GPU para gaming e renderização profissional",
    specs: ["32GB GDDR7", "576 Tensor cores", "575W TDP", "Ray Tracing"],
  },
];

export default function Home() {
  const [_location, setLocation] = useLocation();
  const [selectedProduct, setSelectedProduct] = useState<typeof PRODUCTS[0] | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: "success" | "error" | "info", message: string) => {
    const id = Math.random().toString();
    setToasts((prev) => [...prev, { id, type, message, duration: 3000 }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleAddToCart = (quantity: number) => {
    setCartCount((prev) => prev + quantity);
    addToast("success", `${quantity} item(s) adicionado(s) ao carrinho!`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glassmorphism backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Cpu className="w-8 h-8 text-primary animate-pulse" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              TechCatalog
            </h1>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <InteractiveButton
              variant="outline"
              size="sm"
              onClick={() => setLocation("/deals")}
              className="hidden sm:flex"
            >
              <Flame className="w-4 h-4" />
              <span className="hidden md:inline">Ofertas</span>
            </InteractiveButton>
            <InteractiveButton
              variant="outline"
              size="sm"
              onClick={() => setLocation("/compare")}
              className="hidden sm:flex"
            >
              <BarChart3 className="w-4 h-4" />
              <span className="hidden md:inline">Comparar</span>
            </InteractiveButton>
            <InteractiveButton
              variant="outline"
              size="sm"
              onClick={() => setLocation("/profile")}
            >
              <User className="w-4 h-4" />
            </InteractiveButton>
            <InteractiveButton
              variant="outline"
              size="sm"
              onClick={() => setLocation("/login")}
            >
              <LogIn className="w-4 h-4" />
              <span className="hidden md:inline">Login</span>
            </InteractiveButton>
            <WishlistNotification />
            <InteractiveButton
              variant="outline"
              size="md"
              className="relative"
              onClick={() => setLocation("/cart")}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-background text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </InteractiveButton>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage:
              "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663193835922/4zmDAZUzdsNwWeB6fGopys/hero-futuristic-tech-dLScvxMo2CQuL49T75c3Jo.webp')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background" />

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block mb-4 px-4 py-2 glassmorphism rounded-full border border-primary/30">
              <span className="text-sm font-semibold text-secondary flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Novo Catálogo 2026
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Tecnologia do{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Futuro
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Descubra nossa coleção exclusiva de componentes de última geração com design futurista e desempenho incomparável.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <InteractiveButton
                variant="primary"
                size="lg"
                onClick={() => setLocation("/catalog")}
              >
                Explorar Catálogo
                <ChevronRight className="w-5 h-5" />
              </InteractiveButton>

            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-8 border-t border-border/30 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Ofertas Especiais", icon: <Flame className="w-5 h-5" />, action: () => setLocation("/deals") },
              { label: "Comparar Produtos", icon: <BarChart3 className="w-5 h-5" />, action: () => setLocation("/compare") },
              { label: "Meu Perfil", icon: <User className="w-5 h-5" />, action: () => setLocation("/profile") },
              { label: "Meu Carrinho", icon: <ShoppingCart className="w-5 h-5" />, action: () => setLocation("/cart") },
            ].map((link, idx) => (
              <InteractiveButton
                key={idx}
                variant="outline"
                size="md"
                className="w-full flex flex-col items-center gap-2"
                onClick={link.action}
              >
                {link.icon}
                <span className="text-xs md:text-sm text-center">{link.label}</span>
              </InteractiveButton>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-t border-border/30">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: "Produtos", value: "500+", icon: <Rocket className="w-6 h-6" /> },
              { label: "Clientes", value: "10K+", icon: <Shield className="w-6 h-6" /> },
              { label: "Satisfação", value: "99%", icon: <Star className="w-6 h-6" /> },
              { label: "Entrega", value: "24h", icon: <TrendingUp className="w-6 h-6" /> },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-secondary mb-2 flex justify-center">{stat.icon}</div>
                <p className="text-3xl font-bold text-accent">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 border-t border-border/30">
        <div className="container">
          <h3 className="text-4xl font-bold mb-16 text-center">
            Por que escolher <span className="text-primary">TechCatalog</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Desempenho Ultra",
                description: "Componentes otimizados para máximo desempenho",
              },
              {
                icon: <Layers className="w-8 h-8" />,
                title: "Qualidade Premium",
                description: "Certificação internacional e garantia estendida",
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "Inovação Contínua",
                description: "Sempre atualizados com as últimas tecnologias",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="glassmorphism glow-purple p-6 rounded-xl hover:glow-cyan transition-all duration-300 cursor-pointer hover:scale-105 group"
              >
                <div className="text-secondary mb-4 group-hover:animate-bounce">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold mb-2">{feature.title}</h4>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 border-t border-border/30">
        <div className="container">
          <h3 className="text-4xl font-bold mb-4 text-center">
            Produtos em Destaque
          </h3>
          <p className="text-center text-muted-foreground mb-8">
            Selecione uma categoria ou navegue por todos os produtos
          </p>

          {/* Advanced Search */}
          <div className="mb-12 glassmorphism rounded-xl p-6 glow-cyan">
            <AdvancedSearch products={PRODUCTS} />
          </div>

          <Tabs defaultValue="todos" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-12 glassmorphism p-2">
              <TabsTrigger value="todos">Todos</TabsTrigger>
              <TabsTrigger value="processadores">Processadores</TabsTrigger>
              <TabsTrigger value="memoria">Memória</TabsTrigger>
              <TabsTrigger value="armazenamento">Armazenamento</TabsTrigger>
              <TabsTrigger value="graficas">Placas Gráficas</TabsTrigger>
            </TabsList>

            <TabsContent value="todos" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {PRODUCTS.map((product) => (
                  <div
                    key={product.id}
                    className="glassmorphism rounded-xl overflow-hidden hover:glow-cyan transition-all duration-300 cursor-pointer hover:scale-105 group"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                      <div className="absolute top-2 right-2 bg-accent/90 px-3 py-1 rounded-full text-xs font-bold text-background">
                        Destaque
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-lg font-bold flex-1">{product.name}</h4>
                        <div className="flex items-center gap-1 text-secondary bg-primary/20 px-2 py-1 rounded-lg">
                          <Star className="w-4 h-4 fill-secondary" />
                          <span className="text-sm font-bold">{product.rating}</span>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4">
                        {product.category}
                      </p>
                      <p className="text-sm text-muted-foreground mb-4">
                        {product.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-accent">
                          ${product.price}
                        </span>
                        <InteractiveButton
                          variant="primary"
                          size="sm"
                          onClick={() => setSelectedProduct(product)}
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </InteractiveButton>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {["processadores", "memoria", "armazenamento", "graficas"].map(
              (category) => (
                <TabsContent key={category} value={category} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {PRODUCTS.filter(
                      (p) =>
                        p.category.toLowerCase().includes(category) ||
                        (category === "processadores" &&
                          p.category === "Processadores")
                    ).map((product) => (
                      <div
                        key={product.id}
                        className="glassmorphism rounded-xl overflow-hidden hover:glow-cyan transition-all duration-300 cursor-pointer hover:scale-105 group"
                      >
                        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                        </div>

                        <div className="p-6">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="text-lg font-bold flex-1">
                              {product.name}
                            </h4>
                            <div className="flex items-center gap-1 text-secondary bg-primary/20 px-2 py-1 rounded-lg">
                              <Star className="w-4 h-4 fill-secondary" />
                              <span className="text-sm font-bold">
                                {product.rating}
                              </span>
                            </div>
                          </div>

                          <p className="text-sm text-muted-foreground mb-4">
                            {product.category}
                          </p>
                          <p className="text-sm text-muted-foreground mb-4">
                            {product.description}
                          </p>

                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-accent">
                              ${product.price}
                            </span>
                            <InteractiveButton
                              variant="primary"
                              size="sm"
                              onClick={() => setSelectedProduct(product)}
                            >
                              <ShoppingCart className="w-4 h-4" />
                            </InteractiveButton>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              )
            )}
          </Tabs>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-20 border-t border-border/30">
        <div className="container">
          <div className="glassmorphism rounded-2xl p-12 text-center glow-purple hover:glow-cyan transition-all duration-300 group">
            <h3 className="text-4xl font-bold mb-6 group-hover:text-secondary transition-colors">
              Pronto para explorar o futuro da tecnologia?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Navegue por nosso catálogo completo e descubra componentes de última geração com a melhor qualidade do mercado.
            </p>
            <InteractiveButton
              variant="secondary"
              size="lg"
              onClick={() => setLocation("/catalog")}
            >
              Começar Agora
              <ChevronRight className="w-5 h-5" />
            </InteractiveButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 py-12 bg-background/50">
        <div className="container text-center text-muted-foreground">
          <p>© 2026 TechCatalog. Todos os direitos reservados.</p>
          <p className="mt-2 text-sm">
            Design futurista com glassmorphism • Diagramas técnicos inclusos • Interatividade avançada
          </p>
        </div>
      </footer>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct!}
        isOpen={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Toast Notifications */}
      <Toast toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
