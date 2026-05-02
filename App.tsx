/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { 
  Smartphone, 
  Battery, 
  Cpu, 
  Settings, 
  MessageCircle, 
  ShieldCheck, 
  Clock, 
  Truck, 
  Star, 
  ChevronRight,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Zap,
  Sparkles,
  RefreshCcw,
  ClipboardList,
  DollarSign,
  BookOpen
} from "lucide-react";
import { create } from 'zustand';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// --- STACK BOILERPLATE ---
const queryClient = new QueryClient();

interface AppState {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const useAppStore = create<AppState>((set) => ({
  isMenuOpen: false,
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
}));

// --- COMPONENTS ---

const ParticleBackground = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  // Skip on mobile — canvas animation is heavy on low-end GPUs
  const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches;

  React.useEffect(() => {
    if (isMobile) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number; y: number; size: number; speedX: number; speedY: number; opacity: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const init = () => {
      particles = [];
      const count = Math.floor((canvas.width * canvas.height) / 25000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.5 + 0.1,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#00f2ff";

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.globalAlpha = p.opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile]);

  if (isMobile) return null;
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-40" />;
};

const SectionTitle = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
  <div className="mb-12">
    {subtitle && (
      <motion.span 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-royal-blue text-[10px] font-bold uppercase tracking-[0.3em] mb-3 block"
      >
        {subtitle}
      </motion.span>
    )}
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="font-display font-[900] text-4xl md:text-5xl uppercase tracking-tighter"
    >
      {children}
    </motion.h2>
  </div>
);

const PhoneFrame = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9, y: 100 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    className="relative w-full h-full flex items-center justify-center z-10"
  >
    {/* Radial Glow Background - CYAN with breathing effect */}
    <motion.div
      animate={{ 
        scale: [1, 1.1, 1],
        opacity: [0.6, 0.8, 0.6] 
      }}
      transition={{ 
        duration: 4, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-radial-glow pointer-events-none" 
    />
    
    {/* High-Tech Phone Outline */}
    <div className="relative w-[220px] md:w-[280px] lg:w-[320px] aspect-[1/2.1] rounded-[3.5rem] border-[1px] border-royal-blue/30 bg-deep-black/20 backdrop-blur-3xl shadow-[0_0_80px_rgba(0,242,255,0.1)] flex items-center justify-center overflow-hidden">
      
      {/* Dynamic Glow Lines */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-royal-blue to-transparent filter blur-[1px]" />
      <div className="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-royal-blue/50 to-transparent shadow-[0_0_15px_rgba(0,242,255,0.5)]" />
      
      {/* Top Notch Area */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10">
        <div className="w-6 h-1 rounded-full bg-white/10" />
        <div className="w-1.5 h-1.5 rounded-full bg-royal-blue animate-pulse" />
      </div>
      
      {/* Internal "UI" Elements */}
      <div className="w-full h-full flex flex-col items-center gap-8 px-8 pt-24">
        <div className="relative w-full h-32 rounded-xl bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center">
           <motion.div
             animate={{ y: ["-100%", "100%"] }}
             transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
             className="absolute inset-x-0 h-1 bg-royal-blue shadow-[0_0_20px_#00f2ff] z-10"
           />
           <div className="grid grid-cols-4 gap-2 opacity-10">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="w-4 h-4 bg-royal-blue rounded-sm" />
              ))}
           </div>
        </div>

        <div className="space-y-4 w-full">
           <div className="h-2 w-3/4 bg-white/5 rounded" />
           <div className="h-2 w-1/2 bg-white/5 rounded" />
           <div className="h-2 w-full bg-white/5 rounded" />
        </div>

        <motion.div 
           animate={{ opacity: [0.3, 0.7, 0.3] }}
           transition={{ duration: 2, repeat: Infinity }}
           className="mt-auto mb-12 text-[10px] font-mono text-royal-blue uppercase tracking-[0.5em]"
        >
          Analyzing Device...
        </motion.div>
      </div>

      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-royal-blue/10 blur-[100px] rounded-full" />
    </div>
  </motion.div>
);

const NAV_LINKS = [
  { label: 'Serviços', href: '#servicos' },
  { label: 'Curso', href: '#curso' },
  { label: 'Contato', href: '#contato' },
];

// Mensagens pré-definidas para cada botão do WhatsApp
const WA_BASE = "https://wa.me/5511994953933";
const WA_ORCAMENTO = `${WA_BASE}?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20gostaria%20de%20solicitar%20um%20or%C3%A7amento!`;
const WA_CURSO = `${WA_BASE}?text=Ol%C3%A1%2C%20tenho%20interesse%20no%20curso%20de%20manuten%C3%A7%C3%A3o%20de%20celulares.%20Pode%20me%20passar%20mais%20informa%C3%A7%C3%B5es%3F`;
const WA_CONTATO = `${WA_BASE}?text=Ol%C3%A1%2C%20preciso%20de%20assist%C3%AAncia%20t%C3%A9cnica%20para%20meu%20celular!`;

const Navbar = () => {
  const { isMenuOpen, toggleMenu } = useAppStore();

  // Close menu on nav click
  const handleNavClick = () => {
    if (isMenuOpen) toggleMenu();
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 px-6 py-5 md:px-12 flex justify-between items-center bg-gradient-to-b from-deep-black/90 to-transparent backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <span className="font-display font-[900] text-2xl md:text-3xl tracking-tighter uppercase">
            DANTAS<span className="text-royal-blue">MANUTENCEL</span>
          </span>
        </motion.div>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-8 text-[10px] font-bold uppercase tracking-[0.3em] opacity-60">
          {NAV_LINKS.map((item) => (
            <a key={item.label} href={item.href} className="hover:text-royal-blue transition-colors relative group">
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-royal-blue transition-all group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Hamburger button */}
        <button
          onClick={toggleMenu}
          aria-label="Menu"
          className="md:hidden relative z-50 flex flex-col justify-center items-center w-10 h-10 gap-[5px]"
        >
          <motion.span
            animate={isMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
            className="block w-6 h-[2px] bg-white rounded-full origin-center"
          />
          <motion.span
            animate={isMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.2 }}
            className="block w-6 h-[2px] bg-white rounded-full"
          />
          <motion.span
            animate={isMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
            className="block w-6 h-[2px] bg-white rounded-full origin-center"
          />
        </button>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={toggleMenu}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
            />

            {/* Drawer */}
            <motion.nav
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-[75vw] max-w-[320px] z-50 bg-[#0a0a0a] border-l border-white/10 flex flex-col pt-24 pb-12 px-8 md:hidden"
            >
              <div className="flex flex-col gap-2">
                {NAV_LINKS.map((item, i) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={handleNavClick}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="flex items-center justify-between py-5 border-b border-white/5 font-display font-black text-2xl uppercase tracking-tighter text-white hover:text-royal-blue transition-colors group"
                  >
                    {item.label}
                    <ChevronRight size={20} className="text-royal-blue opacity-60 group-hover:translate-x-1 transition-transform" />
                  </motion.a>
                ))}
              </div>

              <div className="mt-auto">
                <a
                  href={WA_ORCAMENTO}
                  target="_blank"
                  rel="noreferrer"
                  onClick={handleNavClick}
                  className="flex items-center justify-center gap-3 w-full py-4 bg-royal-blue text-black rounded-2xl font-display font-black tracking-widest text-sm"
                >
                  <MessageCircle size={18} fill="currentColor" />
                  FALAR NO WHATSAPP
                </a>
                <p className="text-center mt-4 text-[10px] font-mono text-neutral-600 uppercase tracking-widest">
                  11 99495-3933
                </p>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default function App() {
  const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches;
  const { scrollYProgress } = useScroll();
  // Disable parallax on mobile — causes jank on low-end devices
  const y1 = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [0, -300]);
  const y2 = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [0, 300]);
  const gridY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [0, -50]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen selection:bg-royal-blue/30 selection:text-white overflow-hidden relative font-sans">
        <ParticleBackground />

        {/* Decorative Grid Overlay with Parallax */}
        <motion.div 
          style={{ y: gridY }}
          className="absolute inset-0 z-10 pointer-events-none opacity-5 grid-overlay h-[110%]" 
        />

        <Navbar />

        {/* HERO */}
        <section className="relative min-h-screen flex items-center py-24 px-6 md:px-12">
          <div className="max-w-[1920px] mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-0 items-center">
            {/* Left Column: Headline */}
            <div className="md:col-span-4 z-20 order-2 md:order-1 self-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="space-y-8"
              >
                <h1 className="font-display font-[900] text-5xl md:text-7xl lg:text-[76px] leading-[0.85] tracking-tighter text-white uppercase">
                  Assistência<br />
                  Técnica<br />
                  Avançada.<br />
                  <span className="text-royal-blue">Direto<br />
                  na Sua Casa<br />
                  ou Trabalho.</span>
                </h1>
                
                <p className="font-sans text-neutral-500 text-sm md:text-base max-w-[320px] leading-relaxed font-medium">
                  Manutenção profissional com ferramentas de alta precisão, materiais de qualidade e atendimento especializado multimarca.
                </p>

                <div className="flex flex-col gap-6 pt-4">
                  <a 
                    href={WA_ORCAMENTO}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative inline-flex items-center justify-center gap-4 px-10 py-5 bg-royal-blue text-black rounded-full font-display font-black tracking-widest text-lg overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_20px_60px_-15px_rgba(0,242,255,0.4)]"
                  >
                    <MessageCircle size={24} fill="currentColor" />
                    <span>FALAR NO WHATSAPP</span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
                  </a>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] md:text-xs font-black text-royal-blue uppercase tracking-[0.2em]">
                      Vamos até você! — Solicite seu orçamento.
                    </span>
                    <span className="text-xs md:text-sm font-mono font-medium text-white/30 tracking-widest">
                      11 99495-3933 — <span className="text-royal-blue/40">RESPOSTA RÁPIDA</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Center Column: Giant Phone */}
            <div className="md:col-span-4 flex items-center justify-center order-1 md:order-2 h-[60vh] md:h-full relative">
               <PhoneFrame />
            </div>

            {/* Right Column: Service Cards */}
            <div className="md:col-span-4 flex flex-col items-center md:items-end justify-center gap-3 z-20 order-3">
              {[
                { icon: Smartphone, title: "Troca de Tela" },
                { icon: Battery, title: "Troca de Bateria" },
                { icon: Cpu, title: "Reparo de Placa" },
                { icon: Settings, title: "Suporte Técnico" },
                { icon: Zap, title: "Reparo de conector" },
                { icon: Sparkles, title: "Limpeza interna" },
                { icon: RefreshCcw, title: "Atualização de sistema" },
                { icon: ClipboardList, title: "Diagnóstico completo" }
              ].map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className="w-full max-w-[260px] p-3.5 rounded-xl bg-card-bg border border-royal-blue/20 shadow-[0_0_20px_rgba(0,242,255,0.03)] flex items-center gap-4 transition-all hover:border-royal-blue/60 group cursor-default"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-royal-blue/5 flex items-center justify-center text-royal-blue group-hover:bg-royal-blue group-hover:text-black transition-all">
                    <service.icon size={18} />
                  </div>
                  <span className="font-display font-[900] text-[11px] uppercase tracking-[0.1em] text-white">
                    {service.title}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION: CURSO */}
        <section id="curso" className="py-24 px-6 md:px-12 relative overflow-hidden bg-white/[0.02]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <SectionTitle subtitle="Oportunidade">
                  Quer aprender a consertar celular<br/>
                  e ganhar dinheiro com isso?
                </SectionTitle>
                <p className="text-neutral-400 text-lg md:text-xl leading-relaxed mb-8">
                  Se você quer começar a trabalhar com manutenção, a gente também ensina o passo a passo. 
                  Mesmo quem nunca mexeu com isso consegue começar e já faturar nas primeiras semanas.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                  {[
                    { icon: CheckCircle2, text: "Aprenda na prática" },
                    { icon: Sparkles, text: "Comece do zero" },
                    { icon: DollarSign, text: "Possibilidade de renda extra" },
                    { icon: MessageCircle, text: "Suporte inicial técnico" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
                      <item.icon size={18} className="text-royal-blue" />
                      <span className="text-sm font-bold uppercase tracking-tight text-white/80">{item.text}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-royal-blue uppercase tracking-[0.3em] mb-1">Preço promocional</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl md:text-5xl font-display font-black text-white">R$ 600</span>
                      <span className="text-neutral-600 font-bold uppercase text-[10px] tracking-widest">À vista ou Cartão</span>
                    </div>
                  </div>
                  <div className="h-12 w-[1px] bg-white/10 hidden md:block" />
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-royal-blue/20 flex items-center justify-center text-royal-blue transform -rotate-12">
                      <Truck size={20} />
                    </div>
                    <div>
                      <span className="block text-[10px] font-black uppercase tracking-widest text-neutral-500">Bônus Exclusivo</span>
                      <span className="text-sm font-bold text-white">Caixa de ferramentas inclusa</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative group lg:pl-12"
              >
                <div className="p-10 rounded-[3rem] bg-card-bg border border-royal-blue/30 shadow-[0_0_80px_rgba(0,242,255,0.1)] relative z-20">
                   <h3 className="font-display font-black text-3xl uppercase tracking-tighter mb-6">Investimento<br/>no seu futuro</h3>
                   <div className="space-y-6 mb-10">
                      <p className="text-neutral-400 text-sm leading-relaxed">
                        Nosso curso é focado no que realmente importa: prática. Você vai aprender a abrir aparelhos, trocar componentes e realizar diagnósticos reais.
                      </p>
                      <div className="flex items-center gap-4 p-4 rounded-2xl bg-royal-blue/5 border border-royal-blue/20">
                         <ShieldCheck className="text-royal-blue" size={24} />
                         <div>
                            <span className="block text-xs font-black uppercase tracking-widest text-royal-blue">Garantia de aprendizado</span>
                            <span className="text-[10px] text-white/50">Suporte pós-curso via WhatsApp</span>
                         </div>
                      </div>
                   </div>
                   <a 
                    href={WA_CURSO}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-3 w-full py-5 bg-royal-blue text-black rounded-2xl font-display font-black tracking-widest transition-all hover:glow-cyan active:scale-95"
                  >
                    <span>QUERO APRENDER AGORA!</span>
                    <ChevronRight size={20} />
                  </a>
                  <p className="text-center mt-4 text-[10px] font-bold text-neutral-600 uppercase tracking-[0.2em]">
                    Aceitamos todos os cartões de crédito
                  </p>
                </div>
                <div className="absolute -top-10 -right-10 w-64 h-64 bg-royal-blue/10 blur-[100px] rounded-full -z-10" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION: PROBLEM */}
        <section className="py-24 px-6 md:px-12 relative overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative group rounded-3xl overflow-hidden aspect-video md:aspect-[4/5] bg-neutral-900 border border-white/5"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-deep-black via-transparent to-transparent z-10" />
              <img 
                src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=1000" 
                alt="Phone repair" 
                className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 scale-110 group-hover:scale-100"
              />
              <div className="absolute bottom-8 left-8 z-20">
                <div className="flex gap-2">
                   {[CheckCircle2, XCircle, HelpCircle].map((Icon, i) => (
                     <div key={i} className="p-2 bg-royal-blue/10 backdrop-blur-md rounded-lg text-royal-blue border border-royal-blue/20">
                       <Icon size={20} />
                     </div>
                   ))}
                </div>
              </div>
            </motion.div>

            <div>
              <SectionTitle subtitle="Dificuldade">
                Seu celular quebrou<br/>
                e virou dor de cabeça?
              </SectionTitle>
              <p className="text-neutral-400 text-lg md:text-xl leading-relaxed mb-8">
                Tela quebrada, bateria ruim, celular travando… e ainda ter que sair de casa pra resolver tudo isso. O trânsito, a espera e a insegurança de deixar seu aparelho em qualquer lugar.
              </p>
              <div className="space-y-4">
                {['Frustração com atendimento lento', 'Perda de tempo no trânsito', 'Equipamentos sem garantia real'].map((item, i) => (
                   <div key={i} className="flex items-center gap-3 text-neutral-300">
                     <div className="w-5 h-5 rounded-full border border-royal-blue/30 flex items-center justify-center text-royal-blue">
                        <div className="w-1 h-1 bg-current rounded-full" />
                     </div>
                     <span className="font-medium">{item}</span>
                   </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: SOLUTION */}
        <section className="py-24 px-6 md:px-12 bg-white/[0.02] border-y border-white/5">
          <div className="max-w-7xl mx-auto text-center">
            <SectionTitle subtitle="A Solução">
              A gente vai até você.
            </SectionTitle>
            <p className="text-neutral-400 text-lg md:text-2xl max-w-3xl mx-auto mb-12">
              Você não precisa sair de casa ou do trabalho. A gente resolve no conforto de onde você estiver, com rapidez e transparência total.
            </p>
            <div className="inline-block p-1 rounded-2xl bg-gradient-to-r from-royal-blue/50 via-white/10 to-royal-blue/50">
               <div className="bg-deep-black px-12 py-8 rounded-[14px]">
                  <span className="text-royal-blue font-display font-black text-3xl md:text-5xl uppercase tracking-[0.1em] text-glow-cyan animate-pulse">
                    ATENDIMENTO A DOMICÍLIO
                  </span>
               </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: BENEFITS */}
        <section className="py-24 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: Truck, title: "Atendimento a domicilio", desc: "No seu tempo, no seu lugar." },
                  { icon: Clock, title: "Rapidez no serviço", desc: "Soluções ágeis e precisas." },
                  { icon: ShieldCheck, title: "Qualidade garantida", desc: "Peças premium com garantia." },
                  { icon: Star, title: "Atendimento confiável", desc: "Milhares de aparelhos reparados." }
                ].map((benefit, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-8 rounded-3xl bg-card-bg border border-white/5 hover:border-royal-blue/40 transition-all group"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-royal-blue/10 flex items-center justify-center text-royal-blue mb-6 group-hover:scale-110 transition-transform">
                      <benefit.icon size={28} />
                    </div>
                    <h3 className="font-display font-bold text-xl uppercase tracking-tighter mb-3">{benefit.title}</h3>
                    <p className="text-neutral-500 text-sm leading-relaxed">{benefit.desc}</p>
                  </motion.div>
                ))}
             </div>
          </div>
        </section>

        {/* SECTION 4: HOW IT WORKS */}
        <section className="py-24 px-6 md:px-12 relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
             <SectionTitle subtitle="Praticidade">
                Como funciona
             </SectionTitle>
             
             <div className="relative mt-20">
                {/* Connecting Line */}
                <div className="hidden lg:block absolute top-[40px] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-royal-blue/20 to-transparent" />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                   {[
                     { step: "01", title: "Chama no WhatsApp", desc: "Fale direto com o técnico." },
                     { step: "02", title: "Explica o problema", desc: "Enviamos o orçamento na hora." },
                     { step: "03", title: "Agenda o horário", desc: "Escolha o melhor momento." },
                     { step: "04", title: "A gente resolve", desc: "Manutenção feita na sua frente." }
                   ].map((item, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="relative z-20 group"
                      >
                         <div className="w-20 h-20 rounded-full bg-deep-black border-2 border-royal-blue/20 flex items-center justify-center mb-6 group-hover:border-royal-blue transition-colors">
                            <span className="font-display font-[900] text-3xl text-royal-blue">{item.step}</span>
                         </div>
                         <h4 className="font-display font-bold text-lg uppercase mb-2">{item.title}</h4>
                         <p className="text-neutral-500 text-sm">{item.desc}</p>
                      </motion.div>
                   ))}
                </div>
             </div>
          </div>
        </section>

        {/* SECTION 5: SERVICES */}
        <section id="servicos" className="py-24 px-6 md:px-12 bg-white/[0.01]">
          <div className="max-w-7xl mx-auto">
             <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                <SectionTitle subtitle="O que fazemos">
                  Especialista multimarca
                </SectionTitle>
                <a href="#contato" className="text-royal-blue font-bold flex items-center gap-2 group">
                   Ver todos os serviços <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title: "Troca de tela", price: "Premium", icon: Smartphone },
                  { title: "Troca de bateria", price: "Original", icon: Battery },
                  { title: "Reparo de placa", price: "Avançado", icon: Cpu },
                  { title: "Revisão geral", price: "Preventiva", icon: Settings }
                ].map((service, i) => (
                   <motion.div 
                     key={i}
                     whileHover={{ y: -10 }}
                     className="p-10 rounded-[2.5rem] bg-card-bg border border-white/5 flex flex-col items-center text-center group"
                   >
                     <div className="w-20 h-20 rounded-3xl bg-royal-blue/5 flex items-center justify-center text-royal-blue mb-8 group-hover:bg-royal-blue group-hover:text-black transition-all">
                        <service.icon size={32} />
                     </div>
                     <h5 className="font-display font-black text-2xl uppercase tracking-tighter mb-2">{service.title}</h5>
                     <span className="text-royal-blue text-[10px] font-black uppercase tracking-widest bg-royal-blue/10 px-4 py-1 rounded-full">
                        {service.price}
                     </span>
                   </motion.div>
                ))}
             </div>
          </div>
        </section>

        {/* SECTION 6: PROVA SOCIAL */}
        <section className="py-24 px-6 md:px-12 relative">
          <div className="max-w-7xl mx-auto">
             <SectionTitle subtitle="Testemunhos">
                Quem já aprovou
             </SectionTitle>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                   { name: "Carlos Alberto", text: "“Resolveu rápido e ficou perfeito. O atendimento em casa facilita demais a vida.”" },
                   { name: "Luciana Costa", text: "“Nem precisei sair de casa. Técnico muito profissional e cuidadoso com o aparelho.”" },
                   { name: "Ricardo Silva", text: "“Atendimento muito bom. Explicação clara sobre o problema e preço justo.”" }
                ].map((test, i) => (
                   <motion.div 
                     key={i}
                     initial={{ opacity: 0, scale: 0.95 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     viewport={{ once: true }}
                     className="p-10 rounded-3xl bg-neutral-900/50 border border-white/5 relative"
                   >
                      <div className="flex gap-1 text-royal-blue mb-6">
                         {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
                      </div>
                      <p className="text-white text-lg font-medium leading-relaxed mb-8 italic">{test.text}</p>
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-full bg-royal-blue/20" />
                         <span className="font-bold text-neutral-400 uppercase tracking-widest text-xs">{test.name}</span>
                      </div>
                   </motion.div>
                ))}
             </div>
          </div>
        </section>

        {/* SECTION 7: FINAL CTA */}
        <section id="contato" className="py-24 px-6 md:px-12 text-center relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto relative z-20"
          >
             <h2 className="font-display font-[900] text-5xl md:text-8xl tracking-tight uppercase leading-[0.85] mb-8">
                Resolve isso <span className="text-royal-blue">hoje.</span>
             </h2>
             <p className="text-neutral-400 text-xl font-medium mb-12">
                Não deixe pra depois o que podemos resolver agora na sua frente.
             </p>
             <div className="flex flex-col items-center gap-6">
                <a 
                  href={WA_CONTATO}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative inline-flex items-center justify-center gap-4 px-12 py-6 bg-royal-blue text-black rounded-full font-display font-black tracking-[0.2em] text-xl overflow-hidden shadow-[0_20px_80px_rgba(0,242,255,0.4)]"
                >
                  <MessageCircle size={28} fill="currentColor" />
                  <span>FALAR NO WHATSAPP</span>
                </a>
                <span className="text-royal-blue text-xs font-black uppercase tracking-widest flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-current animate-ping" />
                   Resposta rápida garantida
                </span>
             </div>
          </motion.div>
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-radial-glow opacity-30 pointer-events-none" />
        </section>

        {/* FOOTER */}
        <footer className="py-12 px-6 md:px-12 border-t border-white/5">
           <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex flex-col items-center md:items-start gap-4">
                 <span className="font-display font-black text-2xl tracking-tighter uppercase">
                    DANTAS<span className="text-neutral-400">MANUTENCEL</span>
                 </span>
                 <p className="text-neutral-600 text-xs font-bold uppercase tracking-widest max-w-[200px] text-center md:text-left">
                    Assistência técnica especializada em São Paulo e Região.
                 </p>
              </div>
              
              <div className="flex flex-col items-center md:items-end gap-2">
                 <span className="text-xs font-black uppercase tracking-widest text-neutral-400">Região de atendimento</span>
                 <span className="text-neutral-500 text-sm">São Paulo • Grande SP • ABC</span>
              </div>
           </div>
           <div className="max-w-7xl mx-auto mt-12 pt-12 border-t border-white/[0.02] text-center text-[10px] font-mono text-neutral-700 uppercase tracking-widest">
              © 2026 DANTASMANUTENCEL. Todos os direitos reservados.
           </div>
        </footer>

        {/* Background Parallax Decorative Elements */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 bg-deep-black">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
            <motion.div 
              style={{ y: y1 }}
              className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-royal-blue/5 blur-[150px] rounded-full" 
            />
            <motion.div 
              style={{ y: y2 }}
              className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-royal-blue/5 blur-[150px] rounded-full" 
            />
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}

