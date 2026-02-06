# Guia de Uso - Componentes Otimizados

## 🎯 Como Usar os Hooks de Performance

### useThrottle
Use para limitar a taxa de execução de funções (ex: scroll, resize):

```typescript
import { useThrottle } from '~/hooks/useThrottle';

function MyComponent() {
  const handleScroll = useThrottle((e: Event) => {
    // Sua lógica aqui
  }, 100); // Executará no máximo a cada 100ms

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);
}
```

### useRAFThrottle
Use para sincronizar com frames de animação (~60fps):

```typescript
import { useRAFThrottle } from '~/hooks/useRAF';

function AnimatedComponent() {
  const handleMouseMove = useRAFThrottle((e: MouseEvent) => {
    // Atualizações de posição, etc.
  });

  return <div onMouseMove={handleMouseMove}>...</div>;
}
```

### useIntersectionObserver
Use para lazy loading e animações on-scroll:

```typescript
import { useIntersectionObserver } from '~/hooks/useIntersectionObserver';

function LazyComponent() {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px',
    freezeOnceVisible: true // Ótimo para animações que só rodam uma vez
  });

  return (
    <div ref={ref}>
      {isVisible && <ExpensiveComponent />}
    </div>
  );
}
```

## 🎨 Otimizando Novos Componentes

### Checklist para Novos Componentes

```typescript
import { memo, useCallback, useMemo } from 'react';

// ✅ 1. Sempre use memo para componentes que renderizam frequentemente
const MyComponent = memo(function MyComponent({ data, onClick }) {
  
  // ✅ 2. Use useCallback para funções passadas como props
  const handleClick = useCallback(() => {
    onClick(data.id);
  }, [onClick, data.id]);

  // ✅ 3. Use useMemo para cálculos pesados
  const processedData = useMemo(() => {
    return expensiveCalculation(data);
  }, [data]);

  // ✅ 4. Adicione will-change apenas durante animações
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <div 
      style={{ 
        willChange: isAnimating ? 'transform, opacity' : 'auto'
      }}
      onClick={handleClick}
    >
      {processedData.map(item => (
        <Item key={item.id} {...item} />
      ))}
    </div>
  );
});

export default MyComponent;
```

## 🎭 Padrões de Animação Otimizados

### GSAP com Will-Change

```typescript
useEffect(() => {
  const element = ref.current;
  if (!element) return;

  // ✅ Adicionar will-change antes da animação
  gsap.fromTo(
    element,
    { willChange: 'transform, opacity', opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      onComplete: () => {
        // ✅ Remover will-change após completar
        gsap.set(element, { willChange: 'auto' });
      }
    }
  );
}, []);
```

### Framer Motion Otimizado

```typescript
import { motion } from 'framer-motion';

const variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

// ✅ Use variants para melhor performance
<motion.div
  variants={variants}
  initial="hidden"
  animate="visible"
  style={{ willChange: 'transform, opacity' }}
>
  Content
</motion.div>
```

## 🖼️ Otimização de Imagens

### Lazy Loading de Imagens

```typescript
// ✅ Adicione loading="lazy" para imagens below the fold
<img 
  src="/projeto.png" 
  alt="Projeto" 
  loading="lazy"
  decoding="async"
/>

// ✅ Para imagens críticas (above the fold), use preload
// No root.tsx:
{ rel: "preload", href: "/hero-image.png", as: "image" }
```

### Preload Programático

```typescript
const preloadImage = (src: string) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = resolve;
    img.onerror = reject;
    img.src = src;
  });
};

// Usar em useEffect
useEffect(() => {
  const criticalImages = ['/image1.png', '/image2.png'];
  Promise.all(criticalImages.map(preloadImage));
}, []);
```

## 🎮 WebGL/Canvas Performance

### Configuração Adaptativa

```typescript
import { getQualitySettings, getOptimizedPixelRatio } from '~/lib/performance';

const quality = getQualitySettings(); // 'low' | 'medium' | 'high'
const pixelRatio = getOptimizedPixelRatio(); // Otimizado automaticamente

const renderer = new THREE.WebGLRenderer({
  antialias: quality === 'high',
  powerPreference: quality === 'low' ? 'low-power' : 'high-performance',
  precision: quality === 'low' ? 'lowp' : 'highp'
});

renderer.setPixelRatio(pixelRatio);
```

## 📱 Detecção de Dispositivos

```typescript
import { isLowEndDevice, prefersReducedMotion } from '~/lib/performance';

function AdaptiveComponent() {
  const [quality, setQuality] = useState(() => 
    isLowEndDevice() ? 'low' : 'high'
  );

  const shouldAnimate = !prefersReducedMotion();

  return (
    <div>
      {quality === 'high' && <HighQualityEffect />}
      {shouldAnimate && <AnimatedElement />}
    </div>
  );
}
```

## 🚫 Antipadrões (Evite!)

### ❌ Não Use

```typescript
// ❌ Re-criar funções em cada render
function BadComponent() {
  const handleClick = () => { /* ... */ }; // Nova função a cada render!
  return <button onClick={handleClick}>Click</button>;
}

// ❌ Cálculos pesados sem useMemo
function BadComponent({ items }) {
  const sorted = items.sort(); // Recalcula a cada render!
  return <div>{sorted.map(...)}</div>;
}

// ❌ will-change permanente
<div style={{ willChange: 'transform' }}> // Desperdiça memória!

// ❌ Event listeners sem throttle
window.addEventListener('mousemove', handleMove); // Executa centenas de vezes!
```

### ✅ Use Isto

```typescript
// ✅ useCallback para funções
function GoodComponent() {
  const handleClick = useCallback(() => { /* ... */ }, []);
  return <button onClick={handleClick}>Click</button>;
}

// ✅ useMemo para cálculos
function GoodComponent({ items }) {
  const sorted = useMemo(() => items.sort(), [items]);
  return <div>{sorted.map(...)}</div>;
}

// ✅ will-change condicional
<div style={{ willChange: isAnimating ? 'transform' : 'auto' }}>

// ✅ Event listeners com throttle
const handleMove = useThrottle((e) => { /* ... */ }, 16);
window.addEventListener('mousemove', handleMove);
```

## 📊 Medindo Performance

### Performance API

```typescript
// Marcar início
performance.mark('component-start');

// Seu código...

// Marcar fim
performance.mark('component-end');

// Medir
performance.measure('component-render', 'component-start', 'component-end');

// Ver resultados
const measure = performance.getEntriesByName('component-render')[0];
console.log(`Render time: ${measure.duration}ms`);
```

### React DevTools Profiler

1. Abra React DevTools
2. Vá para a aba "Profiler"
3. Clique em "Record"
4. Interaja com o site
5. Pare a gravação
6. Analise componentes que renderizam muito

### Lighthouse CI

```bash
# Instalar
npm install -g @lhci/cli

# Rodar
lhci autorun --collect.url=http://localhost:5173
```

## 🎯 Metas de Performance

### Core Web Vitals

- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms  
- **CLS** (Cumulative Layout Shift): < 0.1

### Custom Metrics

- **TTI** (Time to Interactive): < 3.5s
- **FPS** (Frames Per Second): 60fps consistente
- **Bundle Size**: < 200KB (gzipped)

---

**Dica Final**: Sempre teste em dispositivos reais de baixo desempenho! 🚀
