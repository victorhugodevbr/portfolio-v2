import { useState, useEffect, useRef } from "react";
import { PersonalImage } from "~/components/personal-image";
import Plasma from "~/components/Plasma";
import { LoadingScreen } from "~/components/loading-screen";
import { AnimatedText } from "~/components/animated-text";
import { gsap } from "gsap";
import { FloatingIcons } from "~/components/floating-icons";
import SpotlightCard from "~/components/SpotlightCard";
import ScrollReveal from "~/components/ScrollReveal";
import LightPillar from "~/components/LightPillar";
import RubcubeLogo from "~/../public/rubcube-logo.png";
import RubbankCellphone from "~/../public/rubbank-cellphone.png";

export function Welcome() {
  const [showLoading, setShowLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

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
    <main className="w-full h-full bg-black overflow-hidden">
      <div className="flex relative h-[100dvh] overflow-hidden">
        <Plasma
          color="#b7047e"
          speed={0.2}
          direction="forward"
          scale={2.2}
          opacity={1}
          mouseInteractive={false}
        />
        <div className="absolute flex flex-col z-0 h-full w-full items-center justify-between mt-20">
          <div className="flex flex-col items-center justify-top">
            {showContent && (
              <>
                <AnimatedText
                  text="Hi, I am"
                  className="font-bold text-white text-[clamp(40px,3.75vw,72px)] drop-shadow-[0_0_clamp(6px,1vw,12px)_white]"
                  delay={0.3}
                />
                <AnimatedText
                  text="Victor Hugo"
                  className="font-bold text-white text-[clamp(60px,5vw,96px)] drop-shadow-[0_0_clamp(8px,1.5vw,16px)_white]"
                  delay={0.9}
                />
                <AnimatedText
                  text="Full Stack developer / UI & UX Designer"
                  className="font-bold text-white text-[clamp(24px,2.1vw,40px)] drop-shadow-[0_0_clamp(2px,0.5vw,4px)_white]"
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
      <div className="flex relative h-[100dvh] overflow-hidden">
        <FloatingIcons />
        <div className="relative z-10 w-full p-20 gap-10 flex flex-col">
          <ScrollReveal y={80} duration={0.8}>
            <h1 className="text-white text-4xl">I specialize in</h1>
          </ScrollReveal>
          
          <ScrollReveal y={100} duration={1} delay={0.1}>
            <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(183, 4, 126, 0.37)">
              <div className="flex flex-col gap-2 text-white p-6 md:p-8 lg:p-10 max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-3xl font-bold">Frontend Developer</h2>
                <p className="text-lg leading-relaxed">
                  Desenvolvimento de interfaces modernas com Flutter, React e Next.js, priorizando acessibilidade, responsividade e design system para garantir consistência e usabilidade em escala.
                </p>
              </div>
            </SpotlightCard>
          </ScrollReveal>
          
          <ScrollReveal y={100} duration={1} delay={0.2}>
            <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(32, 0, 230, 0.37)">
              <div className="flex flex-col gap-2 text-white p-6 md:p-8 lg:p-10 max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-3xl font-bold">Backend & Database</h2>
                <p className="text-lg leading-relaxed">
                  Estruturo aplicações com arquitetura escalável, seguindo princípios de Clean Code, utilizando Prisma ORM e testes automatizados para garantir integrações confiáveis e manutenção eficiente.
                </p>
              </div>
            </SpotlightCard>
          </ScrollReveal>
          
          <ScrollReveal y={30} duration={1} delay={0.3}>
            <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(183, 4, 126, 0.37)">
              <div className="flex flex-col gap-2 text-white p-6 md:p-8 lg:p-10 max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-3xl font-bold">UI/UX Designer</h2>
                <p className="text-lg leading-relaxed">
                  Desenho experiências centradas no usuário com prototipação ágil, aplicação das heurísticas de Nielsen, design system consistente e foco em responsividade mobile-first.
                </p>
              </div>
            </SpotlightCard>
          </ScrollReveal>
        </div>
      </div>
      <div className="flex flex-col justify-top items-center relative py-20 overflow-hidden">
        <LightPillar
          topColor="#ec4899"
          bottomColor="#3b82f6"
          intensity={1}
          rotationSpeed={0.3}
          glowAmount={0.002}
          pillarWidth={3}
          pillarHeight={0.1}
          noiseIntensity={0.5}
          pillarRotation={25}
          interactive={false}
          mixBlendMode="screen"
          quality="high"
        />
        <div className="flex flex-col gap-10 h-full w-full items-center justify-top px-60">
          <h1 className="text-white text-4xl">Projects</h1>
          <div className="relative flex flex-row gap-2 p-6 md:p-8 lg:p-20 w-full bg-[#6B7AE5] rounded-3xl overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <img src={RubcubeLogo} alt="Figma" className='rounded-sm' />
            </div>
            <div className="relative flex flex-col justify-center gap-4">
              <div>
                <h2 className="font-[900] text-[#1D1C3E] text-[clamp(64px,8vw,128px)] leading-[0.9]">RUB</h2>
                <h2 className="font-[900] text-white text-[clamp(64px,8vw,128px)] leading-[0.9]">BANK</h2>
              </div>
                <p className="relative text-[clamp(14px,1.25vw,24px)] leading-[1.2] font-bold text-white">
                Projeto de um banco digital completo, o RUB BANK foi criado em um bootcamp intensivo. Desenvolvi a solução de ponta a ponta: da API segura no backend ao aplicativo mobile com interface moderna, incluindo também a landing page de apresentação.
                </p>
            </div>
            <img src={RubbankCellphone} alt="Rubbank Cellphone" className="relative w-[27.6vw] h-[59.07vh]" />
          </div>
          <div className="relative flex flex-row gap-2 p-6 md:p-8 lg:p-20 w-full bg-[#6B7AE5] rounded-3xl overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <img src={RubcubeLogo} alt="Figma" className='rounded-sm' />
            </div>
            <div className="relative flex flex-col justify-center gap-4">
              <div>
                <h2 className="font-[900] text-[#1D1C3E] text-[clamp(64px,8vw,128px)] leading-[0.9]">RUB</h2>
                <h2 className="font-[900] text-white text-[clamp(64px,8vw,128px)] leading-[0.9]">BANK</h2>
              </div>
                <p className="relative text-[clamp(14px,1.25vw,24px)] leading-[1.2] font-bold text-white">
                Projeto de um banco digital completo, o RUB BANK foi criado em um bootcamp intensivo. Desenvolvi a solução de ponta a ponta: da API segura no backend ao aplicativo mobile com interface moderna, incluindo também a landing page de apresentação.
                </p>
            </div>
            <img src={RubbankCellphone} alt="Rubbank Cellphone" className="relative w-[27.6vw] h-[59.07vh]" />
          </div>
          <div className="relative flex flex-row gap-2 p-6 md:p-8 lg:p-20 w-full bg-[#6B7AE5] rounded-3xl overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <img src={RubcubeLogo} alt="Figma" className='rounded-sm' />
            </div>
            <div className="relative flex flex-col justify-center gap-4">
              <div>
                <h2 className="font-[900] text-[#1D1C3E] text-[clamp(64px,8vw,128px)] leading-[0.9]">RUB</h2>
                <h2 className="font-[900] text-white text-[clamp(64px,8vw,128px)] leading-[0.9]">BANK</h2>
              </div>
                <p className="relative text-[clamp(14px,1.25vw,24px)] leading-[1.2] font-bold text-white">
                Projeto de um banco digital completo, o RUB BANK foi criado em um bootcamp intensivo. Desenvolvi a solução de ponta a ponta: da API segura no backend ao aplicativo mobile com interface moderna, incluindo também a landing page de apresentação.
                </p>
            </div>
            <img src={RubbankCellphone} alt="Rubbank Cellphone" className="relative w-[27.6vw] h-[59.07vh]" />
          </div>
        </div>
      </div>
    </main>
  );
}