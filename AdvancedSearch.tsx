import { useState, useMemo } from "react";
import { Search, X, Filter, ChevronDown } from "lucide-react";
import { InteractiveButton } from "./InteractiveButton";

interface SearchProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
}

interface AdvancedSearchProps {
  products: SearchProduct[];
  onSearch?: (results: SearchProduct[]) => void;
  onClose?: () => void;
}

const PRODUCTS_DB: SearchProduct[] = [
  {
    id: 1,
    name: "Neural Processor X1",
    category: "Processadores",
    price: 2999,
    rating: 4.8,
  },
  {
    id: 2,
    name: "Quantum RAM 128GB",
    category: "Memória",
    price: 1899,
    rating: 4.9,
  },
  {
    id: 3,
    name: "Nexus SSD 4TB",
    category: "Armazenamento",
    price: 899,
    rating: 4.7,
  },
  {
    id: 4,
    name: "Fusion GPU RTX 5090",
    category: "Placas Gráficas",
    price: 3499,
    rating: 4.9,
  },
  {
    id: 5,
    name: "Quantum RAM 64GB",
    category: "Memória",
    price: 1299,
    rating: 4.6,
  },
  {
    id: 6,
    name: "Neural Processor X2",
    category: "Processadores",
    price: 3499,
    rating: 4.7,
  },
];

export function AdvancedSearch({
  products = PRODUCTS_DB,
  onSearch,
  onClose,
}: AdvancedSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: "" as string,
    minPrice: 0,
    maxPrice: 5000,
    minRating: 0,
  });

  const suggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      )
      .slice(0, 8);
  }, [searchQuery, products]);

  const filteredResults = useMemo(() => {
    let results = products;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    if (filters.category) {
      results = results.filter((p) => p.category === filters.category);
    }

    results = results.filter(
      (p) => p.price >= filters.minPrice && p.price <= filters.maxPrice
    );

    results = results.filter((p) => p.rating >= filters.minRating);

    return results;
  }, [searchQuery, filters, products]);

  const categories = Array.from(new Set(products.map((p) => p.category)));

  const handleSearch = () => {
    onSearch?.(filteredResults);
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <div className="glassmorphism rounded-lg border border-border flex items-center px-4 py-3 glow-cyan focus-within:glow-primary transition-all">
          <Search className="w-5 h-5 text-muted-foreground mr-3" />
          <input
            type="text"
            placeholder="Buscar produtos, categorias..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            className="flex-1 bg-transparent outline-none text-foreground placeholder-muted-foreground"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="p-1 hover:bg-primary/20 rounded transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          )}
        </div>

        {/* Autocomplete Suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 glassmorphism rounded-lg border border-border overflow-hidden z-50 max-h-96 overflow-y-auto glow-cyan">
            {suggestions.map((product) => (
              <button
                key={product.id}
                onClick={() => {
                  setSearchQuery(product.name);
                  setShowSuggestions(false);
                }}
                className="w-full px-4 py-3 text-left hover:bg-primary/20 transition-colors flex items-center justify-between border-b border-border last:border-b-0"
              >
                <div>
                  <p className="font-semibold text-sm">{product.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {product.category}
                  </p>
                </div>
                <span className="text-sm font-bold text-accent">
                  ${product.price}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Filter Button */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center gap-2 px-4 py-2 glassmorphism rounded-lg border border-border hover:glow-cyan transition-all"
      >
        <Filter className="w-5 h-5" />
        Filtros Avançados
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            showFilters ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Filters Panel */}
      {showFilters && (
        <div className="glassmorphism rounded-lg p-6 glow-purple space-y-6">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-semibold mb-3">
              Categoria
            </label>
            <div className="space-y-2">
              <button
                onClick={() => setFilters({ ...filters, category: "" })}
                className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                  filters.category === ""
                    ? "bg-primary text-background"
                    : "hover:bg-primary/20"
                }`}
              >
                Todas as Categorias
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilters({ ...filters, category })}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                    filters.category === category
                      ? "bg-primary text-background"
                      : "hover:bg-primary/20"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-semibold mb-3">
              Faixa de Preço
            </label>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="text-xs text-muted-foreground">Mín</label>
                  <input
                    type="number"
                    value={filters.minPrice}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        minPrice: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 py-2 glassmorphism rounded-lg border border-border focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs text-muted-foreground">Máx</label>
                  <input
                    type="number"
                    value={filters.maxPrice}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        maxPrice: parseInt(e.target.value) || 5000,
                      })
                    }
                    className="w-full px-3 py-2 glassmorphism rounded-lg border border-border focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="5000"
                value={filters.maxPrice}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    maxPrice: parseInt(e.target.value),
                  })
                }
                className="w-full"
              />
            </div>
          </div>

          {/* Rating Filter */}
          <div>
            <label className="block text-sm font-semibold mb-3">
              Classificação Mínima
            </label>
            <div className="flex gap-2">
              {[0, 3, 4, 4.5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setFilters({ ...filters, minRating: rating })}
                  className={`px-3 py-2 rounded-lg transition-all ${
                    filters.minRating === rating
                      ? "bg-primary text-background"
                      : "glassmorphism hover:glow-cyan"
                  }`}
                >
                  {rating === 0 ? "Todas" : `${rating}+`}
                </button>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          <InteractiveButton
            variant="outline"
            size="md"
            className="w-full"
            onClick={() => {
              setFilters({
                category: "",
                minPrice: 0,
                maxPrice: 5000,
                minRating: 0,
              });
              setSearchQuery("");
            }}
          >
            Limpar Filtros
          </InteractiveButton>
        </div>
      )}

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filteredResults.length} produto(s) encontrado(s)
        </p>
        <InteractiveButton
          variant="primary"
          size="md"
          onClick={handleSearch}
        >
          Buscar
        </InteractiveButton>
      </div>
    </div>
  );
}
