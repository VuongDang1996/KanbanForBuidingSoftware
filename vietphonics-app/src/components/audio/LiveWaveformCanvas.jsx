import React, { useRef, useEffect } from 'react';

/**
 * PRON-101: LiveWaveformCanvas
 * Real-time 60 FPS 2D Canvas Audio Visualizer
 * Renders 64 symmetrical frequency bars with neon gradient (Sky-400 to Rose-500)
 * Uses AnalyserNode with FFT Size 1024 without frame drops.
 */
export default function LiveWaveformCanvas({
  analyserNode = null,
  isRecording = false,
  barCount = 64,
  height = 96,
  className = ''
}) {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high-DPI retina display
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width || 600;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const bufferLength = analyserNode?.frequencyBinCount || 512;
    const dataArray = new Uint8Array(bufferLength);

    let idlePhase = 0;

    const renderFrame = () => {
      ctx.clearRect(0, 0, width, height);

      // Create neon gradient from Sky-400 (#38bdf8) to Rose-500 (#f43f5e)
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, '#38bdf8');
      gradient.addColorStop(0.5, '#ec4899');
      gradient.addColorStop(1, '#f43f5e');

      ctx.fillStyle = gradient;
      ctx.shadowColor = isRecording ? '#f43f5e' : 'transparent';
      ctx.shadowBlur = isRecording ? 8 : 0;

      const halfBars = Math.floor(barCount / 2);
      const barSpacing = width / barCount;
      const barWidth = Math.max(2, barSpacing - 2);
      const centerY = height / 2;

      if (isRecording && analyserNode) {
        analyserNode.getByteFrequencyData(dataArray);

        // Draw 64 symmetrical bars mirrored outward from center
        for (let i = 0; i < halfBars; i++) {
          // Sample low to mid-high speech frequencies (first 128 bins)
          const binIndex = Math.min(Math.floor((i / halfBars) * 120) + 2, bufferLength - 1);
          const rawValue = dataArray[binIndex] || 0;
          const normalized = rawValue / 255;
          const barHeight = Math.max(4, normalized * (height * 0.85));

          // Left side
          const leftX = width / 2 - (i + 1) * barSpacing;
          const leftY = centerY - barHeight / 2;
          ctx.beginPath();
          ctx.roundRect(leftX, leftY, barWidth, barHeight, 3);
          ctx.fill();

          // Right side (symmetrical mirror)
          const rightX = width / 2 + i * barSpacing;
          const rightY = centerY - barHeight / 2;
          ctx.beginPath();
          ctx.roundRect(rightX, rightY, barWidth, barHeight, 3);
          ctx.fill();
        }
      } else {
        // Idle state: Subtle breathing sine wave
        idlePhase += 0.04;
        for (let i = 0; i < barCount; i++) {
          const wave = Math.sin(idlePhase + i * 0.2);
          const barHeight = 4 + Math.abs(wave) * 8;
          const x = i * barSpacing;
          const y = centerY - barHeight / 2;

          ctx.fillStyle = '#cbd5e1';
          ctx.beginPath();
          ctx.roundRect(x, y, barWidth, barHeight, 2);
          ctx.fill();
        }
      }

      animationFrameRef.current = requestAnimationFrame(renderFrame);
    };

    renderFrame();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [analyserNode, isRecording, barCount, height]);

  return (
    <div className={`relative w-full overflow-hidden rounded-2xl bg-slate-900/5 p-3 flex flex-col items-center justify-center border border-slate-200/60 shadow-inner ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full"
        style={{ height: `${height}px` }}
      />
      <div className="flex items-center justify-between w-full px-2 pt-1 font-mono text-[10px] text-slate-400">
        <span className="flex items-center gap-1">
          <span className={`w-2 h-2 rounded-full ${isRecording ? 'bg-rose-500 animate-ping' : 'bg-slate-300'}`} />
          <span>{isRecording ? 'Live 60 FPS • PCM 16kHz' : 'Sẵn Sàng Ghi Âm'}</span>
        </span>
        <span>FFT: 1024 • 64 Bands</span>
      </div>
    </div>
  );
}
