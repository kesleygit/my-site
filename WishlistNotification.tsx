import { useState, useEffect } from "react";
import { Heart, Bell, X, Check, AlertCircle } from "lucide-react";
import { InteractiveButton } from "./InteractiveButton";

export interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image: string;
  inStock: boolean;
  notifyOnStock: boolean;
}

interface WishlistNotificationProps {
  items?: WishlistItem[];
  onAddToCart?: (id: number) => void;
  onRemoveFromWishlist?: (id: number) => void;
  onToggleNotification?: (id: number) => void;
}

const MOCK_WISHLIST: WishlistItem[] = [
  {
    id: 1,
    name: "Neural Processor X1",
    price: 2999,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663193835922/4zmDAZUzdsNwWeB6fGopys/product-showcase-glass-iVouFYB4JTnBkzWmNDMxtJ.webp",
    inStock: true,
    notifyOnStock: false,
  },
  {
    id: 2,
    name: "Quantum RAM 128GB",
    price: 1899,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663193835922/4zmDAZUzdsNwWeB6fGopys/product-showcase-glass-iVouFYB4JTnBkzWmNDMxtJ.webp",
    inStock: false,
    notifyOnStock: true,
  },
  {
    id: 3,
    name: "Nexus SSD 4TB",
    price: 899,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663193835922/4zmDAZUzdsNwWeB6fGopys/product-showcase-glass-iVouFYB4JTnBkzWmNDMxtJ.webp",
    inStock: true,
    notifyOnStock: false,
  },
];

export function WishlistNotification({
  items = MOCK_WISHLIST,
  onAddToCart,
  onRemoveFromWishlist,
  onToggleNotification,
}: WishlistNotificationProps) {
  const [wishlist, setWishlist] = useState(items);
  const [showWishlist, setShowWishlist] = useState(false);
  const [notifications, setNotifications] = useState<
    Array<{ id: string; type: "success" | "info"; message: string }>
  >([]);

  useEffect(() => {
    setWishlist(items);
  }, [items]);

  const addNotification = (
    type: "success" | "info",
    message: string
  ) => {
    const id = Math.random().toString();
    setNotifications((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 3000);
  };

  const handleAddToCart = (id: number) => {
    onAddToCart?.(id);
    addNotification("success", "Produto adicionado ao carrinho!");
  };

  const handleRemoveFromWishlist = (id: number) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
    onRemoveFromWishlist?.(id);
    addNotification("info", "Produto removido da lista de desejos");
  };

  const handleToggleNotification = (id: number) => {
    setWishlist((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, notifyOnStock: !item.notifyOnStock }
          : item
      )
    );
    onToggleNotification?.(id);
    const item = wishlist.find((i) => i.id === id);
    if (item && !item.notifyOnStock) {
      addNotification(
        "success",
        "Você será notificado quando este produto voltar ao estoque!"
      );
    }
  };

  const inStockCount = wishlist.filter((item) => item.inStock).length;
  const outOfStockCount = wishlist.filter((item) => !item.inStock).length;

  return (
    <>
      {/* Wishlist Button */}
      <div className="relative">
        <button
          onClick={() => setShowWishlist(!showWishlist)}
          className="relative p-3 glassmorphism rounded-lg border border-border hover:glow-pink transition-all"
        >
          <Heart className="w-6 h-6 text-pink-400 fill-pink-400" />
          {wishlist.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-accent text-background text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center animate-bounce">
              {wishlist.length}
            </span>
          )}
        </button>

        {/* Wishlist Dropdown */}
        {showWishlist && (
          <div className="absolute top-full right-0 mt-2 w-96 max-h-96 glassmorphism rounded-lg border border-border overflow-hidden z-50 glow-pink">
            {wishlist.length === 0 ? (
              <div className="p-8 text-center">
                <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">
                  Sua lista de desejos está vazia
                </p>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="p-4 border-b border-border bg-primary/10">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold">Lista de Desejos</h3>
                    <button
                      onClick={() => setShowWishlist(false)}
                      className="p-1 hover:bg-primary/20 rounded"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <span className="text-green-400">
                      {inStockCount} em estoque
                    </span>
                    <span className="text-orange-400">
                      {outOfStockCount} indisponível
                    </span>
                  </div>
                </div>

                {/* Items */}
                <div className="overflow-y-auto max-h-80 space-y-2 p-4">
                  {wishlist.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-lg bg-background/50 hover:bg-background transition-colors"
                    >
                      <div className="flex gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-sm line-clamp-2">
                            {item.name}
                          </p>
                          <p className="text-accent font-bold text-sm mb-2">
                            ${item.price}
                          </p>
                          <div className="flex items-center gap-2 text-xs">
                            {item.inStock ? (
                              <span className="text-green-400 flex items-center gap-1">
                                <Check className="w-3 h-3" />
                                Em estoque
                              </span>
                            ) : (
                              <span className="text-orange-400 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                Indisponível
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          {!item.inStock && (
                            <button
                              onClick={() => handleToggleNotification(item.id)}
                              className={`p-1 rounded transition-all ${
                                item.notifyOnStock
                                  ? "bg-primary text-background"
                                  : "hover:bg-primary/20"
                              }`}
                              title="Notificar quando voltar ao estoque"
                            >
                              <Bell className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => handleRemoveFromWishlist(item.id)}
                            className="p-1 hover:bg-red-500/20 rounded transition-all"
                          >
                            <X className="w-4 h-4 text-red-400" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-border space-y-2">
                  <InteractiveButton
                    variant="primary"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      const inStockItems = wishlist.filter(
                        (item) => item.inStock
                      );
                      inStockItems.forEach((item) =>
                        handleAddToCart(item.id)
                      );
                      setShowWishlist(false);
                    }}
                  >
                    Adicionar Disponíveis ao Carrinho
                  </InteractiveButton>
                  <button
                    onClick={() => setShowWishlist(false)}
                    className="w-full px-3 py-2 text-sm font-semibold hover:bg-primary/20 rounded transition-colors"
                  >
                    Fechar
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Notifications */}
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`p-4 rounded-lg glassmorphism border animate-in fade-in slide-in-from-bottom-4 ${
              notif.type === "success"
                ? "border-green-500/50 bg-green-500/10"
                : "border-blue-500/50 bg-blue-500/10"
            }`}
          >
            <div className="flex items-center gap-2">
              {notif.type === "success" ? (
                <Check className="w-5 h-5 text-green-400" />
              ) : (
                <Bell className="w-5 h-5 text-blue-400" />
              )}
              <span className="text-sm font-semibold">{notif.message}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
