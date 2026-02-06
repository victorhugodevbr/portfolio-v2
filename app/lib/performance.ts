/**
 * Configurações de Performance do Portfolio
 * Ajuste esses valores para otimizar para diferentes dispositivos
 */

export const PERFORMANCE_CONFIG = {
  // Throttle/Debounce delays (em ms)
  MOUSE_MOVE_THROTTLE: 16, // ~60fps
  SCROLL_THROTTLE: 16,
  RESIZE_DEBOUNCE: 150,
  
  // Lazy loading
  INTERSECTION_THRESHOLD: 0.1,
  INTERSECTION_ROOT_MARGIN: '50px',
  
  // WebGL/Canvas
  MAX_PIXEL_RATIO: 1.5, // Limita DPR para melhor performance
  LOW_END_PIXEL_RATIO: 0.5,
  
  // Animações
  REDUCE_MOTION_DURATION: 0.01, // Duração mínima se prefers-reduced-motion
  
  // Code splitting
  PRELOAD_DELAY: 100, // Delay antes de preload de componentes lazy
} as const;

/**
 * Detecta se é um dispositivo de baixo desempenho
 */
export function isLowEndDevice(): boolean {
  // Verifica hardware concurrency (núcleos de CPU)
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) {
    return true;
  }
  
  // Verifica memória do dispositivo (se disponível)
  const memory = (navigator as any).deviceMemory;
  if (memory && memory < 4) {
    return true;
  }
  
  // Verifica se é mobile
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    return true;
  }
  
  return false;
}

/**
 * Retorna configuração de qualidade baseada no dispositivo
 */
export function getQualitySettings(): 'low' | 'medium' | 'high' {
  if (isLowEndDevice()) return 'low';
  
  // Verifica connection (se disponível)
  const connection = (navigator as any).connection;
  if (connection) {
    const effectiveType = connection.effectiveType;
    if (effectiveType === '2g' || effectiveType === 'slow-2g') {
      return 'low';
    }
    if (effectiveType === '3g') {
      return 'medium';
    }
  }
  
  return 'high';
}

/**
 * Verifica se o usuário prefere animações reduzidas
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Retorna pixel ratio otimizado para performance
 */
export function getOptimizedPixelRatio(): number {
  const quality = getQualitySettings();
  const baseRatio = window.devicePixelRatio || 1;
  
  if (quality === 'low') {
    return Math.min(baseRatio, PERFORMANCE_CONFIG.LOW_END_PIXEL_RATIO);
  }
  
  return Math.min(baseRatio, PERFORMANCE_CONFIG.MAX_PIXEL_RATIO);
}
