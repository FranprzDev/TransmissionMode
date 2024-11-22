'use client'

import { useState, useEffect } from 'react'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function DarkDataTransmission() {
  const [activeDemo, setActiveDemo] = useState<'simplex' | 'half' | 'full'>('simplex')
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationStep, setAnimationStep] = useState(0)

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAnimating) {
      timer = setInterval(() => {
        setAnimationStep((prev) => (prev + 1) % (activeDemo === 'half' ? 2 : 1));
      }, 1000); // Aumentar la velocidad de la animación

      setTimeout(() => {
        setIsAnimating(false);
        clearInterval(timer);
      }, 5000);
    } else {
      setAnimationStep(0);
    }
    return () => {
      clearInterval(timer);
    };
  }, [isAnimating, activeDemo]);

  const startAnimation = () => {
    setIsAnimating(true);
  };

  const renderDots = (reverse = false, count = 15) => { 
    const dots = [];
    for (let i = 0; i < count; i++) {
      dots.push(
        <div
          key={i}
          className={`absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-purple-500 
            ${isAnimating ? `animate-transmission-${activeDemo}${reverse ? '-reverse' : ''}` : ''}`}
          style={{
            left: `${reverse ? 100 - (i / (count - 1)) * 100 : (i / (count - 1)) * 100}%`,
            animationDelay: `${(i / (count - 1)) * 1}s` 
          }}
        />
      );
    }
    return dots;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 flex flex-col">
      <h1 className="text-2xl font-bold text-center mb-8">Tipo de Transmisión</h1>
      
      <div className="w-full max-w-2xl mx-auto space-y-8 flex-grow">
        <div className="flex justify-center gap-4">
          <Button
            variant={activeDemo === 'simplex' ? "default" : "outline"}
            onClick={() => { setActiveDemo('simplex'); setIsAnimating(false); }}
            className={`bg-purple-700 hover:bg-purple-600 text-white ${activeDemo === 'simplex' ? 'border-4 border-purple-400' : 'border-purple-500'}`}
          >
            Simplex (B)
          </Button>
          <Button
            variant={activeDemo === 'half' ? "default" : "outline"}
            onClick={() => { setActiveDemo('half'); setIsAnimating(false); }}
            className={`bg-purple-700 hover:bg-purple-600 text-white ${activeDemo === 'half' ? 'border-4 border-purple-400' : 'border-purple-500'}`}
          >
            Half-Duplex (B)
          </Button>
          <Button
            variant={activeDemo === 'full' ? "default" : "outline"}
            onClick={() => { setActiveDemo('full'); setIsAnimating(false); }}
            className={`bg-purple-700 hover:bg-purple-600 text-white ${activeDemo === 'full' ? 'border-4 border-purple-400' : 'border-purple-500'}`}
          >
            Full-Duplex (B/2)
          </Button>
        </div>

        <Card className="p-8 bg-gray-800 border-gray-700">
          <div className="relative h-48">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 border-2 border-gray-600 p-4 rounded-lg bg-gray-800">
              <div className="text-sm font-medium mb-2 text-gray-300">Emisor</div>
              <div className="w-20 h-10 bg-gray-700 rounded flex items-center justify-center text-gray-300">
                DATOS
              </div>
            </div>
            
            <div className="absolute right-0 top-1/2 -translate-y-1/2 border-2 border-gray-600 p-4 rounded-lg bg-gray-800">
              <div className="text-sm font-medium mb-2 text-gray-300">Receptor</div>
              <div className="w-20 h-10 bg-gray-700 rounded flex items-center justify-center text-gray-300">
                DATOS
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              {activeDemo === 'simplex' && (
                <div className="w-1/2 h-1 bg-gray-700 relative">
                  {isAnimating && renderDots(false, 15)}
                  <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 text-purple-500" />
                </div>
              )}
              
              {activeDemo === 'half' && (
                <div className="w-1/2 h-1 bg-gray-700 relative">
                  {isAnimating && (animationStep === 0 ? renderDots() : renderDots(true))}
                  <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 text-purple-500" />
                  <ArrowLeft className="absolute left-0 top-1/2 -translate-y-1/2 text-purple-500" />
                </div>
              )}
              
              {activeDemo === 'full' && (
                <div className="relative w-1/2 h-1 bg-gray-700">
                  {isAnimating && renderDots(false, 15)}
                  {isAnimating && renderDots(true, 15)}
                  <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 text-purple-500" />
                  <ArrowLeft className="absolute left-0 top-1/2 -translate-y-1/2 text-purple-500" />
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 text-center">
            <Button 
              onClick={startAnimation} 
              disabled={isAnimating}
              className="bg-purple-700 hover:bg-purple-600 text-white"
            >
              {isAnimating ? 'Transmitiendo...' : 'Comenzar transmisión'}
            </Button>
          </div>
        </Card>

        <div className="text-sm text-gray-400 text-center">
          {activeDemo === 'simplex' && 'Transmisión Simplex: Envío unidireccional de datos (Ancho de banda: B)'}
          {activeDemo === 'half' && 'Transmisión Half-Duplex: Envío bidireccional alternado (Ancho de banda: B)'}
          {activeDemo === 'full' && 'Transmisión Full-Duplex: Envío bidireccional simultáneo (Ancho de banda: B/2 por canal)'}
        </div>
      </div>

      <footer className="mt-8 text-center text-sm text-gray-500">
        Hecho por Francisco Miguel Perez - 56355 - Comunicaciones 3K2
      </footer>

      <style jsx global>{`
        @keyframes transmission-simplex {
          0% { transform: translateX(0) translateY(-50%); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateX(100%) translateY(-50%); opacity: 0; }
        }
        
        @keyframes transmission-half {
          0% { transform: translateX(0) translateY(-50%); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateX(100%) translateY(-50%); opacity: 0; }
        }
        
        @keyframes transmission-half-reverse {
          0% { transform: translateX(100%) translateY(-50%); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateX(0) translateY(-50%); opacity: 0; }
        }
        
        @keyframes transmission-full {
          0% { transform: translateX(0) translateY(-50%); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateX(100%) translateY(-50%); opacity: 0; }
        }
        
        @keyframes transmission-full-reverse {
          0% { transform: translateX(100%) translateY(-50%); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateX(0) translateY(-50%); opacity: 0; }
        }
        
        .animate-transmission-simplex {
          animation: transmission-simplex 1s linear;
        }
        
        .animate-transmission-half {
          animation: transmission-half 1s linear;
        }
        
        .animate-transmission-half-reverse {
          animation: transmission-half-reverse 1s linear;
        }
        
        .animate-transmission-full {
          animation: transmission-full 1s linear;
        }
        
        .animate-transmission-full-reverse {
          animation: transmission-full-reverse 1s linear;
        }
      `}</style>
    </div>
  )
}
