import React, { useRef, useEffect, forwardRef } from 'react';
import { drawPlayer, drawBullet, drawEnemy, drawHuman, drawBackground } from '../utils/gameRenderer';

const GameCanvas = forwardRef(({ gameState, width, height }, ref) => {
  const internalRef = useRef(null);
  const canvasRef = ref || internalRef;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw background
    drawBackground(ctx, width, height);

    // Draw game objects
    gameState.bullets.forEach(bullet => drawBullet(ctx, bullet));
    gameState.enemies.forEach(enemy => drawEnemy(ctx, enemy));
    gameState.humans.forEach(human => drawHuman(ctx, human));
    drawPlayer(ctx, gameState.player);

  }, [gameState, width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{ 
        border: '2px solid #00ff00',
        backgroundColor: '#000',
        display: 'block'
      }}
    />
  );
});

GameCanvas.displayName = 'GameCanvas';

export default GameCanvas;