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
          height = Math.sin(phase * 4 + i) * 32 + Math.random() * 22;
        } else if (isSpeaking) {
          // Dynamic voice frequency wave modulated by heat
          const wave1 = Math.sin(phase * 2 + i * 0.35) * 18;
          const wave2 = Math.cos(phase * 2.5 + i * 0.2) * 14;
          const heatMultiplier = 1 + (heatScore / 100) * 0.9;
          height = Math.abs(wave1 + wave2) * heatMultiplier + 6;
        } else {
          // Elegant resting studio baseline
          const wave = Math.sin(phase + i * 0.25) * 6;
          height = 6 + Math.abs(wave);
        }

        const x = i * (barWidth + 2);
        const y = centerY - height / 2;

        ctx.fillStyle = isInterrupted
          ? '#DC2626'
          : isSpeaking
          ? activeColor
          : 'rgba(15, 23, 42, 0.18)';

        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, Math.max(4, height), 2);
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
    <div className="w-full h-12 flex items-center justify-center bg-slate-50/80 rounded-2xl overflow-hidden border border-slate-200/80 px-3">
      <canvas
        ref={canvasRef}
        width={420}
        height={48}
        className="w-full h-full block"
      />
    </div>
  );
};
