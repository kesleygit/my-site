import { useState } from "react";
import { InteractiveButton } from "@/components/InteractiveButton";
import { ChevronLeft, Check, Package, Truck, CreditCard } from "lucide-react";
import { useLocation } from "wouter";

export default function Checkout() {
  const [_location, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      setLocation("/");
    }, 3000);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="glassmorphism rounded-2xl p-12 text-center glow-cyan max-w-md">
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center animate-bounce">
              <Check className="w-10 h-10 text-green-400" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4">Pedido Confirmado!</h1>
          <p className="text-muted-foreground mb-8">
            Seu pedido foi processado com sucesso. Você receberá um email de confirmação em breve.
          </p>
          <p className="text-sm text-secondary mb-8">
            Redirecionando para a página inicial...
          </p>
          <div className="flex gap-4">
            <InteractiveButton
              variant="primary"
              size="lg"
              className="flex-1"
              onClick={() => setLocation("/")}
            >
              Voltar ao Início
            </InteractiveButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 glassmorphism backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between py-4">
          <InteractiveButton
            variant="outline"
            size="md"
            onClick={() => setLocation("/cart")}
          >
            <ChevronLeft className="w-5 h-5" />
            Voltar
          </InteractiveButton>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Checkout
          </h1>
          <div className="w-32" />
        </div>
      </div>

      {/* Content */}
      <div className="pt-24 pb-20">
        <div className="container max-w-4xl">
          {/* Steps */}
          <div className="mb-12 flex justify-between">
            {[
              { num: 1, label: "Endereço", icon: Package },
              { num: 2, label: "Envio", icon: Truck },
              { num: 3, label: "Pagamento", icon: CreditCard },
            ].map(({ num, label, icon: Icon }) => (
              <div key={num} className="flex flex-col items-center flex-1">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all ${
                    step >= num
                      ? "bg-primary text-background"
                      : "bg-primary/20 text-muted-foreground"
                  }`}
                >
                  {step > num ? <Check className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                </div>
                <span className="text-sm font-semibold">{label}</span>
                {num < 3 && (
                  <div
                    className={`absolute w-24 h-1 mt-6 ${
                      step > num ? "bg-primary" : "bg-primary/20"
                    }`}
                    style={{ left: `calc(50% + 24px)` }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Address */}
          {step === 1 && (
            <div className="glassmorphism rounded-xl p-8 glow-purple mb-8">
              <h2 className="text-2xl font-bold mb-6">Endereço de Entrega</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    placeholder="João Silva"
                    className="w-full px-4 py-2 glassmorphism rounded-lg border border-border focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Rua
                    </label>
                    <input
                      type="text"
                      placeholder="Av. Paulista"
                      className="w-full px-4 py-2 glassmorphism rounded-lg border border-border focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Número
                    </label>
                    <input
                      type="text"
                      placeholder="1000"
                      className="w-full px-4 py-2 glassmorphism rounded-lg border border-border focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Cidade
                    </label>
                    <input
                      type="text"
                      placeholder="São Paulo"
                      className="w-full px-4 py-2 glassmorphism rounded-lg border border-border focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      CEP
                    </label>
                    <input
                      type="text"
                      placeholder="01311-100"
                      className="w-full px-4 py-2 glassmorphism rounded-lg border border-border focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Shipping */}
          {step === 2 && (
            <div className="glassmorphism rounded-xl p-8 glow-cyan mb-8">
              <h2 className="text-2xl font-bold mb-6">Método de Envio</h2>
              <div className="space-y-4">
                {[
                  { id: 1, name: "Entrega Rápida (24h)", price: 50, time: "24 horas" },
                  { id: 2, name: "Entrega Padrão (3-5 dias)", price: 20, time: "3-5 dias" },
                  { id: 3, name: "Entrega Econômica (7-10 dias)", price: 0, time: "7-10 dias" },
                ].map((option) => (
                  <label
                    key={option.id}
                    className="glassmorphism p-4 rounded-lg border-2 border-border hover:border-primary cursor-pointer transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input type="radio" name="shipping" defaultChecked={option.id === 2} />
                        <div>
                          <p className="font-semibold">{option.name}</p>
                          <p className="text-sm text-muted-foreground">{option.time}</p>
                        </div>
                      </div>
                      <span className="text-lg font-bold text-accent">
                        ${option.price}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div className="glassmorphism rounded-xl p-8 glow-pink mb-8">
              <h2 className="text-2xl font-bold mb-6">Informações de Pagamento</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Número do Cartão
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-2 glassmorphism rounded-lg border border-border focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Validade
                    </label>
                    <input
                      type="text"
                      placeholder="MM/AA"
                      className="w-full px-4 py-2 glassmorphism rounded-lg border border-border focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-4 py-2 glassmorphism rounded-lg border border-border focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4">
            {step > 1 && (
              <InteractiveButton
                variant="outline"
                size="lg"
                className="flex-1"
                onClick={() => setStep(step - 1)}
              >
                Voltar
              </InteractiveButton>
            )}
            {step < 3 ? (
              <InteractiveButton
                variant="primary"
                size="lg"
                className="flex-1"
                onClick={() => setStep(step + 1)}
              >
                Próximo
              </InteractiveButton>
            ) : (
              <InteractiveButton
                variant="primary"
                size="lg"
                className="flex-1"
                onClick={handlePlaceOrder}
              >
                Confirmar Pedido
              </InteractiveButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
