'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

type Direction = 'up' | 'down' | 'left' | 'right'

interface Options {
  y?: number
  x?: number
  from?: Direction
  duration?: number
  stagger?: number
  delay?: number
}

function resolveFromValues(from: Direction, y?: number, x?: number) {
  switch (from) {
    case 'left': return { x: -(x ?? 60), y: 0 }
    case 'right': return { x: x ?? 60, y: 0 }
    case 'down': return { x: 0, y: y ?? 40 }
    case 'up':
    default: return { x: 0, y: -(y ?? 40) }
  }
}

export function useScrollReveal<T extends HTMLElement>(opts: Options = {}) {
  const ref = useRef<T>(null)
  useEffect(() => {
    if (!ref.current) return
    const { from = 'down', y, x, duration = 0.8, stagger = 0.12, delay = 0 } = opts
    const fromVals = resolveFromValues(from, y, x)
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current!.children,
        { opacity: 0, ...fromVals },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration,
          stagger,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
            once: true,
          },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [opts.from, opts.y, opts.x, opts.duration, opts.stagger, opts.delay])
  return ref
}
