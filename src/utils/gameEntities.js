import { GAME_CONFIG } from './gameConfig';

export const createPlayer = () => ({
  x: GAME_CONFIG.CANVAS_WIDTH / 2,
  y: GAME_CONFIG.CANVAS_HEIGHT / 2,
  size: GAME_CONFIG.PLAYER_SIZE,
  speed: GAME_CONFIG.PLAYER_SPEED
});

export const createBullet = (x, y, direction) => {
  const magnitude = Math.sqrt(direction.x * direction.x + direction.y * direction.y);
  const normalizedDirection = {
    x: direction.x / magnitude,
    y: direction.y / magnitude
  };
  
  return {
    x,
    y,
    vx: normalizedDirection.x * GAME_CONFIG.BULLET_SPEED,
    vy: normalizedDirection.y * GAME_CONFIG.BULLET_SPEED,
    size: GAME_CONFIG.BULLET_SIZE
  };
};

export const createEnemy = () => {
  const side = Math.floor(Math.random() * 4);
  let x, y;
  
  switch (side) {
    case 0: // top
      x = Math.random() * GAME_CONFIG.CANVAS_WIDTH;
      y = -GAME_CONFIG.ENEMY_SIZE;
      break;
    case 1: // right
      x = GAME_CONFIG.CANVAS_WIDTH + GAME_CONFIG.ENEMY_SIZE;
      y = Math.random() * GAME_CONFIG.CANVAS_HEIGHT;
      break;
    case 2: // bottom
      x = Math.random() * GAME_CONFIG.CANVAS_WIDTH;
      y = GAME_CONFIG.CANVAS_HEIGHT + GAME_CONFIG.ENEMY_SIZE;
      break;
    case 3: // left
      x = -GAME_CONFIG.ENEMY_SIZE;
      y = Math.random() * GAME_CONFIG.CANVAS_HEIGHT;
      break;
  }
  
  return {
    x,
    y,
    size: GAME_CONFIG.ENEMY_SIZE,
    speed: GAME_CONFIG.ENEMY_SPEED + Math.random() * 40 - 20, // Add some variation
    type: Math.random() > 0.7 ? 'fast' : 'normal'
  };
};

export const createHuman = () => ({
  x: Math.random() * (GAME_CONFIG.CANVAS_WIDTH - GAME_CONFIG.HUMAN_SIZE * 2) + GAME_CONFIG.HUMAN_SIZE,
  y: Math.random() * (GAME_CONFIG.CANVAS_HEIGHT - GAME_CONFIG.HUMAN_SIZE * 2) + GAME_CONFIG.HUMAN_SIZE,
  size: GAME_CONFIG.HUMAN_SIZE,
  speed: GAME_CONFIG.HUMAN_SPEED
});