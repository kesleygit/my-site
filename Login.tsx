import { useState } from "react";
import { InteractiveButton } from "@/components/InteractiveButton";
import { Eye, EyeOff, Mail, Lock, Cpu, ArrowRight, Github, Chrome } from "lucide-react";
import { useLocation } from "wouter";

export default function Login() {
  const [_location, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");

  const handleLogin = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setLocation("/");
    }, 1500);
  };

  const handleSignup = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setLocation("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden flex items-center justify-center">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Branding */}
          <div className="hidden lg:block">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Cpu className="w-6 h-6 text-background" />
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  TechCatalog
                </h1>
              </div>
            </div>

            <h2 className="text-5xl font-bold mb-6 leading-tight">
              Bem-vindo ao futuro da tecnologia
            </h2>

            <p className="text-xl text-muted-foreground mb-8">
              Acesse nosso catálogo exclusivo de componentes de última geração e aproveite ofertas incríveis.
            </p>

            <div className="space-y-4">
              {[
                "Produtos de alta qualidade",
                "Ofertas exclusivas para membros",
                "Suporte 24/7",
                "Entrega rápida garantida",
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6">
              {[
                { value: "500+", label: "Produtos" },
                { value: "10K+", label: "Clientes" },
                { value: "99%", label: "Satisfação" },
              ].map((stat, idx) => (
                <div key={idx}>
                  <p className="text-3xl font-bold text-accent">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="glassmorphism rounded-2xl p-8 glow-cyan">
            {/* Tabs */}
            <div className="flex gap-4 mb-8 border-b border-border">
              {[
                { id: "login", label: "Entrar" },
                { id: "signup", label: "Criar Conta" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as "login" | "signup")}
                  className={`pb-3 font-semibold border-b-2 transition-all ${
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Login Form */}
            {activeTab === "login" && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <input
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 glassmorphism rounded-lg border border-border focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Senha
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-12 py-3 glassmorphism rounded-lg border border-border focus:outline-none focus:border-primary transition-colors"
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-border"
                    />
                    <span className="text-muted-foreground">Lembrar-me</span>
                  </label>
                  <button className="text-primary hover:text-secondary transition-colors">
                    Esqueceu a senha?
                  </button>
                </div>

                <InteractiveButton
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={handleLogin}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                      Entrando...
                    </>
                  ) : (
                    <>
                      Entrar
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </InteractiveButton>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-background text-muted-foreground">
                      Ou continue com
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <InteractiveButton
                    variant="outline"
                    size="md"
                    className="w-full"
                  >
                    <Github className="w-5 h-5" />
                    GitHub
                  </InteractiveButton>
                  <InteractiveButton
                    variant="outline"
                    size="md"
                    className="w-full"
                  >
                    <Chrome className="w-5 h-5" />
                    Google
                  </InteractiveButton>
                </div>

                <p className="text-center text-muted-foreground text-sm">
                  Não tem conta?{" "}
                  <button
                    onClick={() => setActiveTab("signup")}
                    className="text-primary hover:text-secondary transition-colors font-semibold"
                  >
                    Criar agora
                  </button>
                </p>
              </div>
            )}

            {/* Signup Form */}
            {activeTab === "signup" && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    placeholder="João Silva"
                    className="w-full px-4 py-3 glassmorphism rounded-lg border border-border focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <input
                      type="email"
                      placeholder="seu@email.com"
                      className="w-full pl-10 pr-4 py-3 glassmorphism rounded-lg border border-border focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Senha
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-12 py-3 glassmorphism rounded-lg border border-border focus:outline-none focus:border-primary transition-colors"
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Confirmar Senha
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-12 py-3 glassmorphism rounded-lg border border-border focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>

                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-border mt-1"
                  />
                  <span className="text-sm text-muted-foreground">
                    Concordo com os{" "}
                    <button className="text-primary hover:text-secondary transition-colors">
                      Termos de Serviço
                    </button>{" "}
                    e{" "}
                    <button className="text-primary hover:text-secondary transition-colors">
                      Política de Privacidade
                    </button>
                  </span>
                </label>

                <InteractiveButton
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={handleSignup}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                      Criando conta...
                    </>
                  ) : (
                    <>
                      Criar Conta
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </InteractiveButton>

                <p className="text-center text-muted-foreground text-sm">
                  Já tem conta?{" "}
                  <button
                    onClick={() => setActiveTab("login")}
                    className="text-primary hover:text-secondary transition-colors font-semibold"
                  >
                    Entrar
                  </button>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Brand */}
      <div className="absolute top-4 left-4 lg:hidden">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Cpu className="w-4 h-4 text-background" />
          </div>
          <h1 className="text-lg font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            TechCatalog
          </h1>
        </div>
      </div>

      {/* Back Button */}
      <InteractiveButton
        variant="outline"
        size="sm"
        className="absolute top-4 right-4"
        onClick={() => setLocation("/")}
      >
        Voltar
      </InteractiveButton>
    </div>
  );
}
