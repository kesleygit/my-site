import { useState } from "react";
import { InteractiveButton } from "@/components/InteractiveButton";
import { ChevronLeft, X, Plus, Check } from "lucide-react";
import { useLocation } from "wouter";

const PRODUCTS_DB = [
  {
    id: 1,
    name: "Neural Processor X1",
    category: "Processadores",
    price: 2999,
    specs: {
      cores: "16 cores",
      threads: "32 threads",
      clock: "5.8 GHz",
      tdp: "125W",
      cache: "32MB L3",
      socket: "AM5",
    },
  },
  {
    id: 2,
    name: "Quantum RAM 128GB",
    category: "Memória",
    price: 1899,
    specs: {
      type: "DDR5",
      speed: "6000 MHz",
      cas: "CAS 30",
      modules: "2x 64GB",
      color: "RGB",
      warranty: "Lifetime",
    },
  },
  {
    id: 3,
    name: "Nexus SSD 4TB",
    category: "Armazenamento",
    price: 899,
    specs: {
      interface: "NVMe M.2",
      speed: "7400 MB/s",
      capacity: "4TB",
      warranty: "5 anos",
      form_factor: "M.2 2280",
      protocol: "PCIe 5.0",
    },
  },
  {
    id: 4,
    name: "Fusion GPU RTX 5090",
    category: "Placas Gráficas",
    price: 3499,
    specs: {
      memory: "32GB GDDR7",
      cores: "576 Tensor cores",
      tdp: "575W",
      ray_tracing: "Sim",
      dlss: "DLSS 4",
      warranty: "3 anos",
    },
  },
];

export default function Compare() {
  const [_location, setLocation] = useLocation();
  const [selectedProducts, setSelectedProducts] = useState<typeof PRODUCTS_DB>([]);
  const [showSelector, setShowSelector] = useState(false);

  const addProduct = (product: typeof PRODUCTS_DB[0]) => {
    if (selectedProducts.length < 4 && !selectedProducts.find((p) => p.id === product.id)) {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const removeProduct = (id: number) => {
    setSelectedProducts(selectedProducts.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 glassmorphism backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between py-4">
          <InteractiveButton
            variant="outline"
            size="md"
            onClick={() => setLocation("/catalog")}
          >
            <ChevronLeft className="w-5 h-5" />
            Voltar
          </InteractiveButton>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Comparar Produtos
          </h1>
          <div className="w-32" />
        </div>
      </div>

      {/* Content */}
      <div className="pt-24 pb-20">
        <div className="container">
          {selectedProducts.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-3xl font-bold mb-4">Nenhum produto selecionado</h2>
              <p className="text-muted-foreground mb-8">
                Selecione até 4 produtos para comparar especificações
              </p>
              <InteractiveButton
                variant="primary"
                size="lg"
                onClick={() => setShowSelector(!showSelector)}
              >
                <Plus className="w-5 h-5" />
                Adicionar Produtos
              </InteractiveButton>
            </div>
          ) : (
            <>
              {/* Comparison Table */}
              <div className="overflow-x-auto mb-8">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-4 px-4 font-bold">Especificação</th>
                      {selectedProducts.map((product) => (
                        <th key={product.id} className="text-center py-4 px-4">
                          <div className="glassmorphism rounded-lg p-4 glow-cyan">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <p className="font-bold text-sm">{product.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {product.category}
                                </p>
                              </div>
                              <button
                                onClick={() => removeProduct(product.id)}
                                className="p-1 hover:bg-red-500/20 rounded"
                              >
                                <X className="w-4 h-4 text-red-400" />
                              </button>
                            </div>
                            <p className="text-2xl font-bold text-accent">
                              ${product.price}
                            </p>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {selectedProducts.length > 0 &&
                      Object.keys(selectedProducts[0].specs).map((specKey, idx) => (
                        <tr
                          key={specKey}
                          className={`border-b border-border ${
                            idx % 2 === 0 ? "bg-primary/5" : ""
                          }`}
                        >
                          <td className="py-4 px-4 font-semibold capitalize">
                            {specKey.replace(/_/g, " ")}
                          </td>
                          {selectedProducts.map((product) => (
                            <td
                              key={product.id}
                              className="text-center py-4 px-4 text-muted-foreground"
                            >
                              {
                                product.specs[
                                  specKey as keyof typeof product.specs
                                ]
                              }
                            </td>
                          ))}
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <InteractiveButton
                  variant="primary"
                  size="lg"
                  className="flex-1"
                  onClick={() => setShowSelector(!showSelector)}
                >
                  <Plus className="w-5 h-5" />
                  Adicionar Mais Produtos
                </InteractiveButton>
                <InteractiveButton
                  variant="outline"
                  size="lg"
                  className="flex-1"
                  onClick={() => setSelectedProducts([])}
                >
                  Limpar Comparação
                </InteractiveButton>
              </div>
            </>
          )}

          {/* Product Selector */}
          {showSelector && (
            <div className="mt-12 pt-8 border-t border-border">
              <h2 className="text-2xl font-bold mb-6">Selecione Produtos para Comparar</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {PRODUCTS_DB.map((product) => {
                  const isSelected = selectedProducts.find((p) => p.id === product.id);
                  return (
                    <div
                      key={product.id}
                      className={`glassmorphism rounded-xl p-6 cursor-pointer transition-all ${
                        isSelected
                          ? "glow-primary border-2 border-primary"
                          : "hover:glow-cyan"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-bold text-sm mb-1">{product.name}</h3>
                          <p className="text-xs text-muted-foreground">
                            {product.category}
                          </p>
                        </div>
                        {isSelected && (
                          <Check className="w-5 h-5 text-primary" />
                        )}
                      </div>
                      <p className="text-2xl font-bold text-accent mb-4">
                        ${product.price}
                      </p>
                      <InteractiveButton
                        variant={isSelected ? "outline" : "primary"}
                        size="sm"
                        className="w-full"
                        onClick={() =>
                          isSelected
                            ? removeProduct(product.id)
                            : addProduct(product)
                        }
                      >
                        {isSelected ? "Remover" : "Adicionar"}
                      </InteractiveButton>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
