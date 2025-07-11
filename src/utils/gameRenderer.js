import { GAME_CONFIG } from './gameConfig';

export const drawBackground = (ctx, width, height) => {
  ctx.fillStyle = GAME_CONFIG.COLORS.BACKGROUND;
  ctx.fillRect(0, 0, width, height);
  
  // Draw grid pattern
  ctx.strokeStyle = 'rgba(0, 255, 0, 0.1)';
  ctx.lineWidth = 1;
  
  for (let x = 0; x <= width; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  
  for (let y = 0; y <= height; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
};

export const drawPlayer = (ctx, player) => {
  ctx.fillStyle = GAME_CONFIG.COLORS.PLAYER;
  ctx.strokeStyle = GAME_CONFIG.COLORS.PLAYER;
  ctx.lineWidth = 2;
  
  // Draw player as a square with glowing effect
  ctx.shadowColor = GAME_CONFIG.COLORS.PLAYER;
  ctx.shadowBlur = 10;
  
  ctx.fillRect(
    player.x - player.size / 2,
    player.y - player.size / 2,
    player.size,
    player.size
  );
  
  ctx.shadowBlur = 0;
};

export const drawBullet = (ctx, bullet) => {
  ctx.fillStyle = GAME_CONFIG.COLORS.BULLET;
  ctx.shadowColor = GAME_CONFIG.COLORS.BULLET;
  ctx.shadowBlur = 5;
  
  ctx.beginPath();
  ctx.arc(bullet.x, bullet.y, bullet.size, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.shadowBlur = 0;
};

export const drawEnemy = (ctx, enemy) => {
  const color = enemy.type === 'fast' ? '#ff6600' : GAME_CONFIG.COLORS.ENEMY;
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  
  ctx.shadowColor = color;
  ctx.shadowBlur = 8;
  
  // Draw enemy as a diamond shape
  ctx.beginPath();
  ctx.moveTo(enemy.x, enemy.y - enemy.size);
  ctx.lineTo(enemy.x + enemy.size, enemy.y);
  ctx.lineTo(enemy.x, enemy.y + enemy.size);
  ctx.lineTo(enemy.x - enemy.size, enemy.y);
  ctx.closePath();
  ctx.fill();
  
  ctx.shadowBlur = 0;
};

export const drawHuman = (ctx, human) => {
  ctx.fillStyle = GAME_CONFIG.COLORS.HUMAN;
  ctx.strokeStyle = GAME_CONFIG.COLORS.HUMAN;
  ctx.lineWidth = 1;
  
  ctx.shadowColor = GAME_CONFIG.COLORS.HUMAN;
  ctx.shadowBlur = 5;
  
  // Draw human as a circle
  ctx.beginPath();
  ctx.arc(human.x, human.y, human.size, 0, Math.PI * 2);
  ctx.fill();
  
  // Draw a small cross inside to indicate it's a human
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(human.x - human.size / 2, human.y);
  ctx.lineTo(human.x + human.size / 2, human.y);
  ctx.moveTo(human.x, human.y - human.size / 2);
  ctx.lineTo(human.x, human.y + human.size / 2);
  ctx.stroke();
  
  ctx.shadowBlur = 0;
};