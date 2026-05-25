'use client';

import { useEffect, useRef, useState } from 'react';

const ACADEMIC_SYMBOLS = ['π', '∑', '√', 'x²', '∞', 'Δ', '÷', 'f(x)', '±', '≠', '%', '²', '∫', 'θ', 'Aa', 'Bb', '→', '…', '≈', '"'];
const STEAM_SYMBOLS = ['{ }', '</>', 'if', 'def', '01', '#', '( )', '==', '&&', '//', '[ ]', '++', 'AI', '<>', '/*', 'fn', 'var', 'int'];
const SYMBOL_COUNT = 22;

type SymbolSpec = {
  id: string;
  text: string;
  left: number;
  angle: number;
  duration: number;
  delay: number;
  fontSize: number;
  group: 'academic' | 'steam';
};

function buildSpecs(symbols: string[], group: 'academic' | 'steam'): SymbolSpec[] {
  return Array.from({ length: SYMBOL_COUNT }, (_, i) => {
    const xPercent = 3 + (i / (SYMBOL_COUNT - 1)) * 94;
    return {
      id: `${group}-${i}`,
      text: symbols[Math.floor(Math.random() * symbols.length)] ?? symbols[0],
      left: xPercent,
      angle: -((xPercent - 50) * 0.45),
      duration: 5 + Math.random() * 5,
      delay: -(Math.random() * 10),
      fontSize: 11 + Math.random() * 10,
      group,
    };
  });
}

export function RisingSymbols({ activeSlide }: { activeSlide: 0 | 1 }) {
  const [specs, setSpecs] = useState<SymbolSpec[] | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSpecs([...buildSpecs(ACADEMIC_SYMBOLS, 'academic'), ...buildSpecs(STEAM_SYMBOLS, 'steam')]);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const academic = container.querySelectorAll('[data-group="academic"]');
    const steam = container.querySelectorAll('[data-group="steam"]');

    if (activeSlide === 0) {
      steam.forEach((el) => el.classList.add('hero-sym-hidden'));
      window.setTimeout(() => {
        academic.forEach((el) => el.classList.remove('hero-sym-hidden'));
      }, 400);
    } else {
      academic.forEach((el) => el.classList.add('hero-sym-hidden'));
      window.setTimeout(() => {
        steam.forEach((el) => el.classList.remove('hero-sym-hidden'));
      }, 400);
    }
  }, [activeSlide]);

  if (!specs) return null;

  return (
    <div ref={containerRef} className="hero-symbols-container" aria-hidden>
      {specs.map((spec) => (
        <div
          key={spec.id}
          data-group={spec.group}
          className={`hero-sym hero-sym-${spec.group} ${spec.group === 'steam' ? 'hero-sym-hidden' : ''}`}
          style={{
            left: `${spec.left}%`,
            fontSize: `${spec.fontSize}px`,
            transform: `rotate(${spec.angle}deg)`,
            animationDuration: `${spec.duration}s`,
            animationDelay: `${spec.delay}s`,
          }}
        >
          {spec.text}
        </div>
      ))}
    </div>
  );
}
