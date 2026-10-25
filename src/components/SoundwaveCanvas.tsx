import React, { useEffect, useRef } from 'react';

interface SoundwaveCanvasProps {
  isSpeaking: boolean;
  heatScore: number;
  isInterrupted: boolean;
  activeColor?: string;
}

export const SoundwaveCanvas: React.FC<SoundwaveCanvasProps> = ({
  isSpeaking,
  heatScore,
  isInterrupted,
  activeColor = '#CCFF00',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let phase = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const numBars = 48;
      const barWidth = canvas.width / numBars - 2;
      const centerY = canvas.height / 2;

      phase += isSpeaking ? 0.08 + (heatScore / 100) * 0.08 : 0.02;

      for (let i = 0; i < numBars; i++) {
        let height: number;

        if (isInterrupted) {
          // Sharp irregular jagged spikes during interruption collision
          height = Math.sin(phase * 4 + i) * 28 + Math.random() * 20;
        } else if (isSpeaking) {
          // Dynamic voice frequency wave modulated by heat
          const wave1 = Math.sin(phase + i * 0.3) * 16;
          const wave2 = Math.cos(phase * 1.5 + i * 0.15) * 12;
          const heatMultiplier = 1 + (heatScore / 100) * 0.8;
          height = Math.abs(wave1 + wave2) * heatMultiplier + 4;
        } else {
          // Idle resting baseline
          height = 3 + Math.sin(phase + i * 0.2) * 2;
        }

        const x = i * (barWidth + 2);
        const y = centerY - height / 2;

        ctx.fillStyle = isInterrupted
          ? '#FF5C00'
          : isSpeaking
          ? activeColor
          : 'rgba(250, 250, 248, 0.15)';

        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, height, 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isSpeaking, heatScore, isInterrupted, activeColor]);

  return (
    <div className="w-full h-12 flex items-center justify-center bg-[#0B0B0C]/60 rounded-xl overflow-hidden border border-[#FAFAF8]/10 px-2">
      <canvas
        ref={canvasRef}
        width={420}
        height={48}
        className="w-full h-full block"
      />
    </div>
  );
};
