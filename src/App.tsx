import { useEffect, useState } from 'react';

const colors = [
  '#FF6B6B', // coral red
  '#4ECDC4', // teal
  '#FFE66D', // sunny yellow
  '#95E1D3', // mint
  '#F38181', // salmon
  '#AA96DA', // lavender
  '#FCBAD3', // pink
  '#A8D8EA', // sky blue
  '#FF9F43', // orange
  '#6C5CE7', // purple
];

const shapes = ['circle', 'triangle', 'square', 'diamond'] as const;

interface FloatingShape {
  id: number;
  shape: typeof shapes[number];
  color: string;
  size: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
}

function generateShapes(count: number): FloatingShape[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    shape: shapes[Math.floor(Math.random() * shapes.length)],
    color: colors[Math.floor(Math.random() * colors.length)],
    size: Math.random() * 40 + 20,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 15,
    delay: Math.random() * -20,
  }));
}

function ShapeElement({ shape }: { shape: FloatingShape }) {
  const baseStyle = {
    position: 'absolute' as const,
    left: `${shape.x}%`,
    top: `${shape.y}%`,
    width: shape.size,
    height: shape.size,
    opacity: 0.6,
    animation: `float ${shape.duration}s ease-in-out infinite`,
    animationDelay: `${shape.delay}s`,
  };

  if (shape.shape === 'circle') {
    return (
      <div
        style={{
          ...baseStyle,
          backgroundColor: shape.color,
          borderRadius: '50%',
        }}
      />
    );
  }

  if (shape.shape === 'triangle') {
    return (
      <div
        style={{
          ...baseStyle,
          width: 0,
          height: 0,
          backgroundColor: 'transparent',
          borderLeft: `${shape.size / 2}px solid transparent`,
          borderRight: `${shape.size / 2}px solid transparent`,
          borderBottom: `${shape.size}px solid ${shape.color}`,
        }}
      />
    );
  }

  if (shape.shape === 'diamond') {
    return (
      <div
        style={{
          ...baseStyle,
          backgroundColor: shape.color,
          transform: 'rotate(45deg)',
        }}
      />
    );
  }

  return (
    <div
      style={{
        ...baseStyle,
        backgroundColor: shape.color,
        borderRadius: '4px',
      }}
    />
  );
}

function BouncingLetter({ letter, index, color }: { letter: string; index: number; color: string }) {
  return (
    <span
      className="inline-block animate-bounce cursor-default transition-transform hover:scale-125"
      style={{
        color,
        animationDelay: `${index * 0.1}s`,
        animationDuration: '0.8s',
        textShadow: `3px 3px 0 rgba(0,0,0,0.1)`,
      }}
    >
      {letter}
    </span>
  );
}

export default function App() {
  const [shapes, setShapes] = useState<FloatingShape[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setShapes(generateShapes(20));
    setMounted(true);
  }, []);

  const helloLetters = 'Hello'.split('');
  const worldLetters = 'World!'.split('');

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#FFF8E7] flex flex-col">
      {/* Floating shapes background */}
      <div className="absolute inset-0 pointer-events-none">
        {shapes.map((shape) => (
          <ShapeElement key={shape.id} shape={shape} />
        ))}
      </div>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div
          className={`text-center transition-all duration-1000 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Hello */}
          <h1 className="font-display text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-bold tracking-tight mb-2 md:mb-4">
            {helloLetters.map((letter, i) => (
              <BouncingLetter
                key={i}
                letter={letter}
                index={i}
                color={colors[i % colors.length]}
              />
            ))}
          </h1>

          {/* World */}
          <h1 className="font-display text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-bold tracking-tight">
            {worldLetters.map((letter, i) => (
              <BouncingLetter
                key={i}
                letter={letter}
                index={i + helloLetters.length}
                color={colors[(i + 5) % colors.length]}
              />
            ))}
          </h1>

          {/* Decorative underline */}
          <div className="mt-8 md:mt-12 flex justify-center gap-2 md:gap-3">
            {colors.slice(0, 6).map((color, i) => (
              <div
                key={i}
                className="w-6 h-6 md:w-8 md:h-8 rounded-full animate-pulse"
                style={{
                  backgroundColor: color,
                  animationDelay: `${i * 0.15}s`,
                  boxShadow: `0 4px 20px ${color}80`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Fun tagline */}
        <p
          className={`mt-8 md:mt-12 text-lg md:text-xl text-gray-600 font-body tracking-wide transition-all duration-1000 delay-500 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Welcome to the colorful side of code
        </p>
      </main>

      {/* Footer */}
      <footer className="relative z-10 pb-4 md:pb-6 text-center">
        <p className="text-xs md:text-sm text-gray-400 font-body">
          Requested by <span className="text-gray-500">@PauliusX</span> · Built by <span className="text-gray-500">@clonkbot</span>
        </p>
      </footer>

      {/* CSS for animations */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          25% {
            transform: translateY(-30px) rotate(5deg);
          }
          50% {
            transform: translateY(-15px) rotate(-3deg);
          }
          75% {
            transform: translateY(-25px) rotate(2deg);
          }
        }
      `}</style>
    </div>
  );
}
