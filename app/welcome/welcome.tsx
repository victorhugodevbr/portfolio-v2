import { useState, useEffect, useRef, lazy, Suspense, memo } from "react";
import { PersonalImage } from "~/components/personal-image";
import { LoadingScreen } from "~/components/loading-screen";
import { AnimatedText } from "~/components/animated-text";
import { gsap } from "gsap";
import { FloatingIcons } from "~/components/floating-icons";
import SpotlightCard from "~/components/SpotlightCard";
import ScrollReveal from "~/components/ScrollReveal";
import ProjectCard from "~/components/ProjectCard";
import { motion } from "framer-motion";

const Plasma = lazy(() => import("~/components/Plasma"));
const LightPillar = lazy(() => import("~/components/LightPillar"));
const Waves = lazy(() => import("~/components/Waves"));

const preloadImages = [
  '/personal-image.png',
  '/rubcube-logo.png',
  '/rubbank-cellphone.png',
  '/maranata-logo.png',
  '/maranata-cellphone.png',
  '/brasilcard-logo.png',
  '/brasilcard-cellphone.png',
];

const preloadImage = (src: string) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = resolve;
    img.onerror = reject;
    img.src = src;
  });
};

export function Welcome() {
  const [showLoading, setShowLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const projectsSectionRef = useRef<HTMLDivElement>(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const totalProjects = 4;

  useEffect(() => {
    Promise.all(preloadImages.map(src => preloadImage(src).catch(() => {})));
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!projectsSectionRef.current) return;

      const rect = projectsSectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (rect.top <= 0 && rect.bottom >= viewportHeight) {
        const scrollTop = -rect.top;
        const index = Math.min(
          totalProjects - 1,
          Math.max(0, Math.floor(scrollTop / viewportHeight))
        );
        setActiveProjectIndex(index);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!showLoading && showContent && imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { y: "100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 1.5, ease: "power3.out", delay: 2.2 }
      );
    }
  }, [showLoading, showContent]);

  const handleLoadingComplete = () => {
    setShowLoading(false);
    setTimeout(() => {
      setShowContent(true);
    }, 100);
  };

  if (showLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <main className="w-full h-full bg-black">
      <div className="flex relative h-[100dvh] overflow-hidden">
        <Suspense fallback={<div className="plasma-container" style={{ background: 'radial-gradient(circle, rgba(183,4,126,0.15) 0%, rgba(0,0,0,1) 70%)', willChange: 'transform' }} />}>
          <Plasma
            color="#b7047e"
            speed={0.2}
            direction="forward"
            scale={2.2}
            opacity={1}
            mouseInteractive={false}
          />
        </Suspense>
        <div className="absolute flex flex-col px-10 z-0 h-full w-full items-center justify-between mt-20">
          <div className="flex flex-col items-center justify-top">
            {showContent && (
                <>
                  <AnimatedText
                    text="Olá, eu sou"
                    className="font-bold text-white text-[clamp(35px,3.75vw,72px)] drop-shadow-[0_0_clamp(6px,1vw,12px)_white] text-center"
                    delay={0.3}
                  />
                  <AnimatedText
                    text="Victor Hugo"
                    className="font-bold text-white text-[clamp(50px,5vw,96px)] drop-shadow-[0_0_clamp(8px,1.5vw,16px)_white] text-center whitespace-nowrap"
                    delay={0.9}
                  />
                  <AnimatedText
                    text="Desenvolvedor Full Stack / Designer UI & UX"
                    className="font-bold text-white text-[clamp(24px,2.1vw,40px)] drop-shadow-[0_0_clamp(2px,0.5vw,4px)_white] text-center"
                    delay={1.5}
                  />
                </>
            )}
          </div>
          <div ref={imageRef} style={{ transform: 'translateY(100%)', opacity: 0 }}>
            <PersonalImage />
          </div>
        </div>
      </div>
      <div className="flex relative min-h-[100dvh] overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <FloatingIcons />
        </div>
        <div className="relative z-10 w-full p-20 gap-10 flex flex-col md:items-center md:justify-center">
          <ScrollReveal y={80} duration={0.8}>
            <h1 className="text-white text-4xl flex flex-col sm:flex-row sm:flex-wrap sm:gap-2">
              <span>Sou</span>
              <span className="sm:mx-0 mx-auto">especializado</span>
              <span className="sm:ml-0 ml-auto">em</span>
            </h1>
          </ScrollReveal>
          
          <ScrollReveal y={100} duration={1} delay={0.1}>
            <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(183, 4, 126, 0.37)">
              <div className="flex flex-col gap-2 text-white p-6 md:p-8 lg:p-10 max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold">Desenvolvimento Frontend</h2>
                <p className="text-lg leading-relaxed">
              Implementação de interfaces modernas com Flutter, React e Next.js, priorizando acessibilidade, responsividade e design system para garantir consistência e usabilidade em escala.
                </p>
              </div>
            </SpotlightCard>
          </ScrollReveal>
          
          <ScrollReveal y={100} duration={1} delay={0.2}>
            <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(32, 0, 230, 0.37)">
              <div className="flex flex-col gap-2 text-white p-6 md:p-8 lg:p-10 max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold">Backend & Banco de Dados</h2>
                <p className="text-lg leading-relaxed">
              Estruturo aplicações com arquitetura escalável, seguindo princípios de Clean Code, utilizando Prisma ORM e testes automatizados para garantir integrações confiáveis e manutenção eficiente.
                </p>
              </div>
            </SpotlightCard>
          </ScrollReveal>
          
          <ScrollReveal y={30} duration={1} delay={0.3}>
            <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(183, 4, 126, 0.37)">
              <div className="flex flex-col gap-2 text-white p-6 md:p-8 lg:p-10 max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold">Designer UI/UX</h2>
                <p className="text-lg leading-relaxed">
              Desenho experiências centradas no usuário com prototipação ágil, aplicação das heurísticas de Nielsen, design system consistente e foco em responsividade mobile-first.
                </p>
              </div>
            </SpotlightCard>
          </ScrollReveal>
        </div>
      </div>
      <section
        ref={projectsSectionRef}
        className="relative"
        style={{ height: `${totalProjects * 100}vh` }}
      >
        <div className="sticky top-0 h-screen flex flex-col px-20 lg:px-60 items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Suspense fallback={<div className="w-full h-full" style={{ minHeight: '400px' }} />}>
              <LightPillar
                topColor="#b7047e"
                bottomColor="#2000e6"
                intensity={1}
                rotationSpeed={0}
                glowAmount={0.02}
                pillarWidth={3}
                pillarHeight={0.1}
                noiseIntensity={0.5}
                pillarRotation={50}
                interactive={false}
                mixBlendMode="screen"
                quality="high"
              />
            </Suspense>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none z-[1]" />
          
          <h1 className="text-white text-4xl z-20 mt-20">Projetos</h1>
          
          <div className="relative w-full h-full flex items-center justify-center px-20 z-10">
            <motion.div
              className="absolute"
              style={{
                zIndex: activeProjectIndex === 0 ? 10 : activeProjectIndex > 0 ? 5 : 1,
              }}
              animate={{
                scale: activeProjectIndex === 0 ? 1 : 0,
                opacity: activeProjectIndex === 0 ? 1 : 0,
                y: activeProjectIndex > 0 ? 140 : 0,
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <ProjectCard
                backgroundColor="#6B7AE5"
                logo="/rubcube-logo.png"
                logoOpacity={0.2}
                logoPosition={{ top: '-2.5rem', left: '-5rem' }}
                logoSize={{ width: '45rem', height: '45rem' }}
                logoRotation={19}
                title={{
                  line1: { text: 'RUB', color: '#1D1C3E', size: 'clamp(64px,8vw,128px)' },
                  line2: { text: 'BANK', color: 'white', size: 'clamp(64px,8vw,128px)' },
                }}
                titleWeight={900}
                description="Projeto de um banco digital completo, o RUB BANK foi criado em um bootcamp intensivo. Desenvolvi a solução de ponta a ponta: da API segura no backend ao aplicativo mobile com interface moderna, incluindo também a landing page de apresentação."
                phoneImage="/rubbank-cellphone.png"
                buttonColor="white"
                buttonTextColor="#6B7AE5"
              />
            </motion.div>

            <motion.div
              className="absolute"
              style={{
                zIndex: activeProjectIndex === 1 ? 10 : activeProjectIndex > 1 ? 5 : 1,
              }}
              animate={{
                scale: activeProjectIndex === 1 ? 1 : 0,
                opacity: activeProjectIndex === 1 ? 1 : 0,
                y: activeProjectIndex > 1 ? 140 : 0,
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <ProjectCard
                backgroundColor="#FFAA00"
                logo="/maranata-logo.png"
                logoOpacity={0.3}
                logoPosition={{ top: '-12.5rem', left: '-20rem' }}
                logoSize={{ width: '60rem', height: '60rem' }}
                logoRotation={19}
                title={{
                  line1: { text: 'MARANATA', color: '#191919', size: 'clamp(44px,6vw,96px)' },
                  line2: { 
                    text: 'CHURCH', 
                    color: '#FFAA00', 
                    size: 'clamp(24px,3vw,48px)',
                    style: { textShadow: '0px 0px clamp(10px, 0vw, 20px) rgba(0, 0, 0, 0.3)' }
                  },
                }}
                titleWeight={700}
                description="Este é um projeto desenvolvido de ponta a ponta para a Maranata Church, criando uma plataforma digital para centralizar a comunicação e a organização da comunidade. Como único designer e desenvolvedor, fui responsável por todo o ciclo do produto, desde o levantamento de requisitos com o cliente até a implementação e entrega da solução completa."
                phoneImage="/maranata-cellphone.png"
                buttonColor="white"
                buttonTextColor="#FFAA00"
              />
            </motion.div>

            <motion.div
              className="absolute"
              style={{
                zIndex: activeProjectIndex === 2 ? 10 : activeProjectIndex > 2 ? 5 : 1,
              }}
              animate={{
                scale: activeProjectIndex === 2 ? 1 : 0,
                opacity: activeProjectIndex === 2 ? 1 : 0,
                y: activeProjectIndex > 2 ? 140 : 0,
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <ProjectCard
                backgroundColor="#004B89"
                logo="/brasilcard-logo.png"
                logoOpacity={0.2}
                logoPosition={{ top: '-10rem', left: '-11.25rem' }}
                logoSize={{ width: '62.5rem', height: '62.5rem' }}
                logoRotation={16}
                title={{
                  line1: { text: 'BrasilCard', color: 'white', size: 'clamp(48px,6vw,96px)' },
                }}
                titleFont="Roboto Slab"
                titleWeight={600}
                description="Participei como desenvolvedor frontend no projeto do aplicativo BrasilCard, uma plataforma completa para gerenciamento de cartões. Integrado a uma equipe de desenvolvimento, meu foco foi colaborar na construção da interface e da experiência do usuário."
                phoneImage="/brasilcard-cellphone.png"
                buttonColor="white"
                buttonTextColor="#004B89"
              />
            </motion.div>
          </div>
        </div>
      </section>
      <div className="flex relative overflow-hidden">
        <Suspense fallback={<div className="w-full h-full" style={{ minHeight: '600px', background: 'transparent' }} />}>
          <Waves
            lineColor="#b70a7e"
            backgroundColor="transparent"
            waveSpeedX={0.0125}
            waveSpeedY={0.01}
            waveAmpX={40}
            waveAmpY={20}
            friction={0.9}
            tension={0.05}
            maxCursorMove={120}
            xGap={12}
            yGap={36}
          />
        </Suspense>
        <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent pointer-events-none z-10" />
        <div className="relative z-20 w-full flex p-40 gap-10 flex flex-col">
          <div className="flex flex-row w-full">
            <div className="flex flex-col gap-2 w-full">
              <h2 className="text-white text-4xl">FAQ</h2>
              <h1 className="text-white text-6xl font-bold pr-10">Dúvidas Comuns</h1>
              <p className="text-white text-lg pr-10">
                Se você tiver outras dúvidas, pode me contatar por e-mail{" "}
                <a href="mailto:victorhugovicentedev@hotmail.com" className="underline">
                  victorhugovicentedev@hotmail.com
                </a>
              </p>
            </div>
            <div className="flex flex-col gap-6 w-full">
              <details className="bg-white rounded-lg p-6 cursor-pointer group">
                <summary className="font-bold text-lg list-none flex justify-between items-center">
                  Você é designer ou desenvolvedor?
                  <span className="text-2xl transition-transform group-open:rotate-90" aria-hidden="true">▸</span>
                </summary>
                <p className="mt-4 text-gray-700">
                  Sou um desenvolvedor com especialização em full-stack, mas meu maior diferencial é meu background em design UI/UX. Isso me dá uma visão mais técnica para o desenvolvimento front-end, pois consigo entender a lógica por trás da experiência do usuário.
                </p>
              </details>
              <details className="bg-white rounded-lg p-6 cursor-pointer group">
                <summary className="font-bold text-lg list-none flex justify-between items-center">
                  Como você gerencia um projeto desde a concepção (design UI/UX) até a implementação (desenvolvimento e deploy)?
                  <span className="text-2xl transition-transform group-open:rotate-90" aria-hidden="true">▸</span>
                </summary>
                <p className="mt-4 text-gray-700">
                  Eu gerencio o projeto de ponta a ponta, unindo a visão de design à execução técnica. Começo com o levantamento de requisitos e a criação do design (UI/UX), depois defino a arquitetura e desenvolvo banco de dados, back-end e o front-end. Por fim, executo o deploy e garanto a manutenção, entregando uma solução coesa e completa.
                </p>  
              </details>
              <details className="bg-white rounded-lg p-6 cursor-pointer group">
                <summary className="font-bold text-lg list-none flex justify-between items-center">
                  Como você lida com mudanças de escopo durante um projeto?
                  <span className="text-2xl transition-transform group-open:rotate-90" aria-hidden="true">▸</span>
                </summary>
                <p className="mt-4 text-gray-700">
                  Eu lido com mudanças de forma proativa. Analiso o impacto no projeto, discuto as opções com o desenvolvedor parceiro (quando tem), levo até o cliente e, em seguida, formalizo a decisão para garantir que as expectativas estejam sempre alinhadas.
                </p>
              </details>
              <details className="bg-white rounded-lg p-6 cursor-pointer group">
                <summary className="font-bold text-lg list-none flex justify-between items-center">
                  O que você considera um projeto bem-sucedido e como você mede o sucesso?
                  <span className="text-2xl transition-transform group-open:rotate-90" aria-hidden="true">▸</span>
                </summary>
                <p className="mt-4 text-gray-700">
                  Para mim, um projeto bem-sucedido é aquele que resolve o problema do usuário, atinge os objetivos de negócio e tem alta qualidade técnica. Meço o sucesso através do impacto gerado e de métricas como a satisfação do usuário, resultados de negócio (KPIs) e a performance da aplicação.
                </p>
              </details>
            </div>
          </div>
          <div className="flex flex-row w-full items-center">
            <div className="flex flex-col gap-4 w-full">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-cover bg-center bg-black" style={{ backgroundImage: "url('/personal-image.png')" }} aria-label="Foto de Victor Hugo" />
                <p className="text-white text-4xl font-semibold">Vamos construir juntos.</p>
              </div>
              <div className="flex gap-4">
                <button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded flex items-center gap-3 hover:bg-white hover:text-black transition group" aria-label="Visitar meu perfil do LinkedIn">
                  Meu LinkedIn
                  <img src="/icons/linkedin.svg" alt="" className="w-6 h-6 brightness-0 invert group-hover:invert-0" aria-hidden="true" />
                </button>
                <button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded flex items-center gap-3 hover:bg-white hover:text-black transition group" aria-label="Baixar meu currículo">
                  Baixar meu currículo
                  <img src="/icons/github.svg" alt="" className="w-6 h-6 brightness-0 invert group-hover:invert-0" aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#B7047E] to-[#510238] rounded-lg py-20 text-center w-full border-2 border-white">
              <h3 className="text-white text-4xl font-bold mb-2">Experimente sem riscos!</h3>
              <p className="text-white text-lg">Vamos construir algo incrível juntos</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}