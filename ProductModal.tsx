import { useState } from "react";
import { X, Star, ShoppingCart, Plus, Minus, Heart } from "lucide-react";
import { InteractiveButton } from "./InteractiveButton";
import { ReviewSection } from "./ReviewSection";

interface ProductModalProps {
  product: {
    id: number;
    name: string;
    category: string;
    price: number;
    rating: number;
    image: string;
    description: string;
    specs?: string[];
  };
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (quantity: number) => void;
}

export function ProductModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
}: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [isInWishlist, setIsInWishlist] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 glassmorphism rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto glow-cyan">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-primary/20 rounded-lg transition-colors z-20"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8">
          {/* Image */}
          <div className="mb-8 rounded-xl overflow-hidden h-64 bg-gradient-to-br from-primary/20 to-secondary/20">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between mb-2">
                <h2 className="text-3xl font-bold">{product.name}</h2>
                <div className="flex items-center gap-2 bg-primary/20 px-3 py-1 rounded-lg">
                  <Star className="w-5 h-5 fill-secondary text-secondary" />
                  <span className="font-bold">{product.rating}</span>
                </div>
              </div>
              <p className="text-muted-foreground">{product.category}</p>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-bold mb-2">Descrição</h3>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            {/* Specs */}
            {product.specs && product.specs.length > 0 && (
              <div>
                <h3 className="text-lg font-bold mb-3">Especificações</h3>
                <div className="grid grid-cols-2 gap-3">
                  {product.specs.map((spec, idx) => (
                    <div key={idx} className="bg-primary/10 p-3 rounded-lg">
                      <p className="text-sm text-secondary">{spec}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Price and Quantity */}
            <div className="border-t border-border pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-4xl font-bold text-accent">
                  ${product.price}
                </span>
                <div className="flex items-center gap-4 bg-primary/10 rounded-lg p-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-primary/20 rounded transition-colors"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="text-lg font-bold min-w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-primary/20 rounded transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <InteractiveButton
                  variant="primary"
                  size="lg"
                  className="flex-1"
                  onClick={() => {
                    onAddToCart(quantity);
                    onClose();
                  }}
                >
                  <ShoppingCart className="w-5 h-5" />
                  Adicionar ao Carrinho
                </InteractiveButton>
                <button
                  onClick={() => setIsInWishlist(!isInWishlist)}
                  className={`p-3 rounded-lg transition-all ${
                    isInWishlist
                      ? "bg-pink-500/20 text-pink-400"
                      : "bg-primary/10 text-muted-foreground hover:text-pink-400"
                  }`}
                >
                  <Heart
                    className="w-6 h-6"
                    fill={isInWishlist ? "currentColor" : "none"}
                  />
                </button>
                <InteractiveButton
                  variant="outline"
                  size="lg"
                  className="flex-1"
                  onClick={onClose}
                >
                  Cancelar
                </InteractiveButton>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-12 pt-8 border-t border-border">
            <ReviewSection productId={product.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
