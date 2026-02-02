import React from 'react'
import { motion } from 'framer-motion'

type FloatingIconProps = {
  children: React.ReactNode
  delay: number
  duration: number
  x: number
  y: number
  rotation: number
}
function FloatingIcon({
  children,
  delay,
  duration,
  x,
  y,
  rotation,
}: FloatingIconProps) {
  return (
    <motion.div
      className="absolute"
      style={{
        left: `${x}%`,
        top: `${y}%`,
      }}
      initial={{
        y: 0,
      }}
      animate={{
        y: [-12, 12, -12],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <div
        className="w-16 h-16 md:w-20 md:h-20 rounded-lg flex items-center justify-center shadow-lg"
        style={{
          transform: `rotate(${rotation}deg)`,
          border: '3px solid #2000E6',
        }}
      >
        {children}
      </div>
    </motion.div>
  )
}

function FigmaIcon() {
  return (
    <img src="/figma-icon.png" alt="Figma" className='rounded-sm' />
  )
}
function PostgreSQLIcon() {
  return (
    <img src="/postgresql-icon.png" alt="PostgreSQL" className='rounded-sm' />
  )
}
function ReactIcon() {
  return (
    <img src="/react-icon.png" alt="React" className='rounded-sm' />
  )
}
function NestJSIcon() {
  return (
    <img src="/nestjs-icon.png" alt="NestJS" className='rounded-sm' />
  )
}
function PhotoshopIcon() {
  return (
    <img src="/photoshop-icon.png" alt="Photoshop" className='rounded-sm' />
  )
}
function TypeScriptIcon() {
  return (
    <img src="/ts-icon.png" alt="TypeScript" className='rounded-sm' />
  )
}
function FlutterIcon() {
  return (
    <img src="/flutter-icon.png" alt="Flutter" className='rounded-sm' />
  )
}
export function FloatingIcons() {
  const icons = [
    {
      component: <FigmaIcon />,
      x: 23,
      y: 15,
      delay: 0,
      duration: 4,
      rotation: -8,
    },
    {
      component: <PostgreSQLIcon />,
      x: 70,
      y: 10,
      delay: 0.5,
      duration: 3.5,
      rotation: 5,
    },
    {
      component: <ReactIcon />,
      x: 50,
      y: 25,
      delay: 1,
      duration: 4.2,
      rotation: -5,
    },
    {
      component: <NestJSIcon />,
      x: 15,
      y: 50,
      delay: 1.5,
      duration: 3.8,
      rotation: 8,
    },
    {
      component: <PhotoshopIcon />,
      x: 35,
      y: 40,
      delay: 2,
      duration: 4.5,
      rotation: -12,
    },
    {
      component: <TypeScriptIcon />,
      x: 80,
      y: 42,
      delay: 0.8,
      duration: 3.2,
      rotation: 6,
    },
    {
      component: <FlutterIcon />,
      x: 60,
      y: 55,
      delay: 1.2,
      duration: 4,
      rotation: -3,
    },
  ]
  return (
    <div className="relative w-full h-full">
      {icons.map((icon, index) => (
        <FloatingIcon
          key={index}
          delay={icon.delay}
          duration={icon.duration}
          x={icon.x}
          y={icon.y}
          rotation={icon.rotation}
        >
          {icon.component}
        </FloatingIcon>
      ))}

      <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
        <svg
          viewBox="0 0 800 200"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ec4899" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <motion.path
            d="M0,100 Q100,50 200,100 T400,100 T600,100 T800,100 L800,200 L0,200 Z"
            fill="url(#waveGradient)"
            initial={{
              d: 'M0,100 Q100,50 200,100 T400,100 T600,100 T800,100 L800,200 L0,200 Z',
            }}
            animate={{
              d: [
                'M0,100 Q100,50 200,100 T400,100 T600,100 T800,100 L800,200 L0,200 Z',
                'M0,100 Q100,150 200,100 T400,100 T600,100 T800,100 L800,200 L0,200 Z',
                'M0,100 Q100,50 200,100 T400,100 T600,100 T800,100 L800,200 L0,200 Z',
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.path
            d="M0,120 Q150,80 300,120 T600,120 T800,120 L800,200 L0,200 Z"
            fill="url(#waveGradient)"
            opacity="0.5"
            animate={{
              d: [
                'M0,120 Q150,80 300,120 T600,120 T800,120 L800,200 L0,200 Z',
                'M0,120 Q150,160 300,120 T600,120 T800,120 L800,200 L0,200 Z',
                'M0,120 Q150,80 300,120 T600,120 T800,120 L800,200 L0,200 Z',
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.5,
            }}
          />
        </svg>
      </div>
    </div>
  )
}
