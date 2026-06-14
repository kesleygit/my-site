import { useState } from "react";
import { Star, ThumbsUp, MessageCircle } from "lucide-react";
import { InteractiveButton } from "./InteractiveButton";

export interface Review {
  id: string;
  author: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  helpful: number;
  verified: boolean;
}

interface ReviewSectionProps {
  productId: number;
  reviews?: Review[];
  averageRating?: number;
  totalReviews?: number;
}

const MOCK_REVIEWS: Review[] = [
  {
    id: "1",
    author: "João Silva",
    rating: 5,
    title: "Excelente desempenho!",
    comment:
      "Produto de alta qualidade, entrega rápida e atendimento impecável. Recomendo muito!",
    date: "2 dias atrás",
    helpful: 24,
    verified: true,
  },
  {
    id: "2",
    author: "Maria Santos",
    rating: 4,
    title: "Muito bom, mas poderia ser mais barato",
    comment:
      "Funciona perfeitamente, mas o preço está um pouco elevado comparado com a concorrência.",
    date: "1 semana atrás",
    helpful: 18,
    verified: true,
  },
  {
    id: "3",
    author: "Pedro Costa",
    rating: 5,
    title: "Superou minhas expectativas!",
    comment:
      "Chegou antes do prazo, bem embalado e com excelente qualidade. Voltaria a comprar com certeza.",
    date: "2 semanas atrás",
    helpful: 31,
    verified: true,
  },
  {
    id: "4",
    author: "Ana Oliveira",
    rating: 3,
    title: "Bom, mas com alguns problemas",
    comment:
      "O produto é bom, mas tive alguns problemas na configuração inicial. O suporte ajudou rápido.",
    date: "1 mês atrás",
    helpful: 12,
    verified: true,
  },
];

export function ReviewSection({
  productId,
  reviews = MOCK_REVIEWS,
  averageRating = 4.5,
  totalReviews = 128,
}: ReviewSectionProps) {
  const [sortBy, setSortBy] = useState<"recent" | "helpful" | "rating">(
    "recent"
  );
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: "",
    comment: "",
  });

  const filteredReviews = filterRating
    ? reviews.filter((r) => r.rating === filterRating)
    : reviews;

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === "helpful") return b.helpful - a.helpful;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((r) => r.rating === rating).length,
    percentage: (reviews.filter((r) => r.rating === rating).length / reviews.length) * 100,
  }));

  return (
    <div className="space-y-8">
      {/* Rating Summary */}
      <div className="glassmorphism rounded-xl p-8 glow-cyan">
        <h3 className="text-2xl font-bold mb-6">Avaliações dos Clientes</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Overall Rating */}
          <div className="text-center">
            <div className="text-5xl font-bold text-accent mb-2">
              {averageRating}
            </div>
            <div className="flex justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.round(averageRating)
                      ? "fill-accent text-accent"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              {totalReviews} avaliações
            </p>
          </div>

          {/* Rating Distribution */}
          <div className="md:col-span-2 space-y-3">
            {ratingDistribution.map((item) => (
              <div key={item.rating} className="flex items-center gap-3">
                <button
                  onClick={() =>
                    setFilterRating(
                      filterRating === item.rating ? null : item.rating
                    )
                  }
                  className={`flex items-center gap-1 px-3 py-1 rounded-lg transition-all ${
                    filterRating === item.rating
                      ? "bg-primary text-background"
                      : "hover:bg-primary/20"
                  }`}
                >
                  {item.rating}
                  <Star className="w-4 h-4 fill-current" />
                </button>
                <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent transition-all"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <span className="text-sm text-muted-foreground w-12 text-right">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Review Form */}
      {!showReviewForm ? (
        <InteractiveButton
          variant="primary"
          size="lg"
          className="w-full"
          onClick={() => setShowReviewForm(true)}
        >
          <MessageCircle className="w-5 h-5" />
          Deixar uma Avaliação
        </InteractiveButton>
      ) : (
        <div className="glassmorphism rounded-xl p-8 glow-purple">
          <h4 className="text-xl font-bold mb-6">Sua Avaliação</h4>

          <div className="space-y-6">
            {/* Rating Selection */}
            <div>
              <label className="block text-sm font-semibold mb-3">
                Classificação
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setNewReview({ ...newReview, rating })}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        rating <= newReview.rating
                          ? "fill-accent text-accent"
                          : "text-muted-foreground"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Título da Avaliação
              </label>
              <input
                type="text"
                placeholder="Resumo da sua experiência"
                value={newReview.title}
                onChange={(e) =>
                  setNewReview({ ...newReview, title: e.target.value })
                }
                className="w-full px-4 py-3 glassmorphism rounded-lg border border-border focus:outline-none focus:border-primary"
              />
            </div>

            {/* Comment */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Seu Comentário
              </label>
              <textarea
                placeholder="Compartilhe sua experiência com este produto..."
                value={newReview.comment}
                onChange={(e) =>
                  setNewReview({ ...newReview, comment: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-3 glassmorphism rounded-lg border border-border focus:outline-none focus:border-primary resize-none"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <InteractiveButton
                variant="primary"
                size="md"
                className="flex-1"
                onClick={() => {
                  setShowReviewForm(false);
                  setNewReview({ rating: 5, title: "", comment: "" });
                }}
              >
                Enviar Avaliação
              </InteractiveButton>
              <InteractiveButton
                variant="outline"
                size="md"
                className="flex-1"
                onClick={() => setShowReviewForm(false)}
              >
                Cancelar
              </InteractiveButton>
            </div>
          </div>
        </div>
      )}

      {/* Sort Options */}
      <div className="flex gap-4 flex-wrap">
        <label className="text-sm font-semibold">Ordenar por:</label>
        {[
          { id: "recent", label: "Mais Recentes" },
          { id: "helpful", label: "Mais Úteis" },
          { id: "rating", label: "Maior Classificação" },
        ].map((option) => (
          <button
            key={option.id}
            onClick={() => setSortBy(option.id as typeof sortBy)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              sortBy === option.id
                ? "bg-primary text-background"
                : "glassmorphism hover:glow-cyan"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {sortedReviews.map((review) => (
          <div
            key={review.id}
            className="glassmorphism rounded-xl p-6 hover:glow-cyan transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold">{review.author}</span>
                  {review.verified && (
                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                      Compra Verificada
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{review.date}</p>
              </div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating
                        ? "fill-accent text-accent"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
            </div>

            <h4 className="font-bold mb-2">{review.title}</h4>
            <p className="text-muted-foreground mb-4">{review.comment}</p>

            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <ThumbsUp className="w-4 h-4" />
              Útil ({review.helpful})
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
