export const GAME_CONFIG = {
  // Canvas dimensions
  CANVAS_WIDTH: 800,
  CANVAS_HEIGHT: 600,
  
  // Player settings
  PLAYER_SPEED: 200,
  PLAYER_SIZE: 15,
  
  // Bullet settings
  BULLET_SPEED: 400,
  BULLET_SIZE: 3,
  BULLET_COOLDOWN: 100, // milliseconds
  
  // Enemy settings
  ENEMY_SPEED: 80,
  ENEMY_SIZE: 12,
  ENEMY_SPAWN_RATE: 2000, // milliseconds
  MAX_ENEMIES: 15,
  ENEMY_POINTS: 100,
  
  // Human settings
  HUMAN_SPEED: 30,
  HUMAN_SIZE: 10,
  HUMAN_SPAWN_RATE: 5000, // milliseconds
  MAX_HUMANS: 8,
  HUMAN_POINTS: 500,
  
  // Colors
  COLORS: {
    PLAYER: '#00ff00',
    BULLET: '#ffff00',
    ENEMY: '#ff0000',
    HUMAN: '#0080ff',
    BACKGROUND: '#000000'
  }
};