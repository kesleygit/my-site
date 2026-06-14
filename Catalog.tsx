import { useState } from "react";
import { InteractiveButton } from "@/components/InteractiveButton";
import { Search, Filter, ChevronLeft, ShoppingCart, Star } from "lucide-react";
import { useLocation } from "wouter";

const ALL_PRODUCTS = [
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
  {
    id: 5,
    name: "Thermal Master Pro",
    category: "Resfriamento",
    price: 299,
    rating: 4.6,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663193835922/4zmDAZUzdsNwWeB6fGopys/product-showcase-glass-iVouFYB4JTnBkzWmNDMxtJ.webp",
    description: "Cooler AIO de alta performance",
    specs: ["360mm Radiator", "RGB", "PWM", "Silencioso"],
  },
  {
    id: 6,
    name: "PowerVault 1200W",
    category: "Fontes",
    price: 449,
    rating: 4.8,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663193835922/4zmDAZUzdsNwWeB6fGopys/product-showcase-glass-iVouFYB4JTnBkzWmNDMxtJ.webp",
    description: "Fonte modular 80+ Platinum",
    specs: ["1200W", "Modular", "Eficiência 92%", "10 anos"],
  },
];

export default function Catalog() {
  const [_location, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [sortBy, setSortBy] = useState("relevancia");

  const categories = ["Todos", ...Array.from(new Set(ALL_PRODUCTS.map((p) => p.category)))];

  const filteredProducts = ALL_PRODUCTS.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "Todos" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === "preco-asc") return a.price - b.price;
    if (sortBy === "preco-desc") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

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
            Catálogo Completo
          </h1>
          <div className="w-32" />
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-24 pb-20">
        <div className="container">
          {/* Search and Filters */}
          <div className="mb-12 space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 glassmorphism rounded-lg border border-border focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Category Filter */}
              <div className="glassmorphism p-4 rounded-lg">
                <label className="flex items-center gap-2 text-sm font-semibold mb-3">
                  <Filter className="w-4 h-4" />
                  Categoria
                </label>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                        selectedCategory === cat
                          ? "bg-primary text-background"
                          : "hover:bg-primary/20"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Filter */}
              <div className="glassmorphism p-4 rounded-lg">
                <label className="flex items-center gap-2 text-sm font-semibold mb-3">
                  <Filter className="w-4 h-4" />
                  Ordenar por
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 glassmorphism rounded-lg border border-border focus:outline-none focus:border-primary"
                >
                  <option value="relevancia">Relevância</option>
                  <option value="preco-asc">Menor Preço</option>
                  <option value="preco-desc">Maior Preço</option>
                  <option value="rating">Melhor Avaliação</option>
                </select>
              </div>

              {/* Results Count */}
              <div className="glassmorphism p-4 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">
                    {filteredProducts.length}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    produtos encontrados
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
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
                      <h3 className="text-lg font-bold flex-1">{product.name}</h3>
                      <div className="flex items-center gap-1 text-secondary">
                        <Star className="w-4 h-4 fill-secondary" />
                        <span className="text-sm font-bold">{product.rating}</span>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-2">
                      {product.category}
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      {product.description}
                    </p>

                    {/* Specs */}
                    <div className="mb-4 space-y-1">
                      {product.specs.map((spec, idx) => (
                        <p key={idx} className="text-xs text-secondary">
                          • {spec}
                        </p>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-accent">
                        ${product.price}
                      </span>
                      <InteractiveButton
                        variant="primary"
                        size="sm"
                        onClick={() => console.log("Adicionar ao carrinho:", product.id)}
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </InteractiveButton>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-2xl font-bold text-muted-foreground">
                Nenhum produto encontrado
              </p>
              <p className="text-muted-foreground mt-2">
                Tente ajustar seus filtros de busca
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
