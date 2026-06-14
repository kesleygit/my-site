import { useState } from "react";
import { InteractiveButton } from "@/components/InteractiveButton";
import { ChevronLeft, Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import { useLocation } from "wouter";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function Cart() {
  const [_location, setLocation] = useLocation();
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Neural Processor X1",
      price: 2999,
      quantity: 1,
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663193835922/4zmDAZUzdsNwWeB6fGopys/product-showcase-glass-iVouFYB4JTnBkzWmNDMxtJ.webp",
    },
    {
      id: 2,
      name: "Quantum RAM 128GB",
      price: 1899,
      quantity: 2,
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663193835922/4zmDAZUzdsNwWeB6fGopys/product-showcase-glass-iVouFYB4JTnBkzWmNDMxtJ.webp",
    },
  ]);

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

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
            Carrinho de Compras
          </h1>
          <div className="w-32" />
        </div>
      </div>

      {/* Content */}
      <div className="pt-24 pb-20">
        <div className="container max-w-6xl">
          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="glassmorphism rounded-xl p-6 flex gap-6 hover:glow-cyan transition-all"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-2">{item.name}</h3>
                      <p className="text-2xl font-bold text-accent">
                        ${item.price}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-4">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5 text-red-400" />
                      </button>
                      <div className="flex items-center gap-2 bg-primary/10 rounded-lg p-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-primary/20 rounded"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-sm font-bold min-w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-primary/20 rounded"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="glassmorphism rounded-xl p-8 glow-purple h-fit sticky top-24">
                <h2 className="text-2xl font-bold mb-6">Resumo do Pedido</h2>
                <div className="space-y-4 mb-6 pb-6 border-b border-border">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Imposto (10%)</span>
                    <span className="font-bold text-accent">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-2xl text-accent">${total.toFixed(2)}</span>
                  </div>
                </div>
                <InteractiveButton
                  variant="primary"
                  size="lg"
                  className="w-full mb-3"
                  onClick={() => setLocation("/checkout")}
                >
                  Ir para Checkout
                </InteractiveButton>
                <InteractiveButton
                  variant="outline"
                  size="lg"
                  className="w-full"
                  onClick={() => setLocation("/catalog")}
                >
                  Continuar Comprando
                </InteractiveButton>
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h2 className="text-3xl font-bold mb-4">Carrinho Vazio</h2>
              <p className="text-muted-foreground mb-8">
                Você ainda não adicionou nenhum produto ao carrinho
              </p>
              <InteractiveButton
                variant="primary"
                size="lg"
                onClick={() => setLocation("/catalog")}
              >
                Explorar Produtos
              </InteractiveButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
