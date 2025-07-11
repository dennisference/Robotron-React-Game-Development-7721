import { useState, useCallback } from 'react';
import { GAME_CONFIG } from '../utils/gameConfig';
import { 
  createPlayer, 
  createBullet, 
  createEnemy, 
  createHuman 
} from '../utils/gameEntities';
import { 
  checkBulletEnemyCollision, 
  checkPlayerEnemyCollision, 
  checkPlayerHumanCollision 
} from '../utils/collisionDetection';

export const useGameState = () => {
  const [gameState, setGameState] = useState({
    player: createPlayer(),
    bullets: [],
    enemies: [],
    humans: [],
    score: 0,
    lives: 3,
    level: 1,
    lastBulletTime: 0,
    lastEnemySpawn: 0,
    lastHumanSpawn: 0
  });

  const updatePlayer = useCallback((keys, deltaTime) => {
    setGameState(prev => {
      const newPlayer = { ...prev.player };
      const speed = GAME_CONFIG.PLAYER_SPEED * deltaTime;

      // Handle movement
      if (keys.left) newPlayer.x -= speed;
      if (keys.right) newPlayer.x += speed;
      if (keys.up) newPlayer.y -= speed;
      if (keys.down) newPlayer.y += speed;

      // Keep player within bounds
      newPlayer.x = Math.max(newPlayer.size, Math.min(GAME_CONFIG.CANVAS_WIDTH - newPlayer.size, newPlayer.x));
      newPlayer.y = Math.max(newPlayer.size, Math.min(GAME_CONFIG.CANVAS_HEIGHT - newPlayer.size, newPlayer.y));

      return { ...prev, player: newPlayer };
    });
  }, []);

  const addBullet = useCallback((x, y, direction) => {
    setGameState(prev => {
      const now = Date.now();
      if (now - prev.lastBulletTime < GAME_CONFIG.BULLET_COOLDOWN) {
        return prev;
      }

      const bullet = createBullet(x, y, direction);
      return {
        ...prev,
        bullets: [...prev.bullets, bullet],
        lastBulletTime: now
      };
    });
  }, []);

  const updateBullets = useCallback((deltaTime) => {
    setGameState(prev => ({
      ...prev,
      bullets: prev.bullets
        .map(bullet => ({
          ...bullet,
          x: bullet.x + bullet.vx * deltaTime,
          y: bullet.y + bullet.vy * deltaTime
        }))
        .filter(bullet => 
          bullet.x > 0 && 
          bullet.x < GAME_CONFIG.CANVAS_WIDTH && 
          bullet.y > 0 && 
          bullet.y < GAME_CONFIG.CANVAS_HEIGHT
        )
    }));
  }, []);

  const updateEnemies = useCallback((deltaTime, player) => {
    setGameState(prev => ({
      ...prev,
      enemies: prev.enemies.map(enemy => {
        const dx = player.x - enemy.x;
        const dy = player.y - enemy.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 0) {
          const speed = enemy.speed * deltaTime;
          return {
            ...enemy,
            x: enemy.x + (dx / distance) * speed,
            y: enemy.y + (dy / distance) * speed
          };
        }
        return enemy;
      })
    }));
  }, []);

  const updateHumans = useCallback((deltaTime) => {
    setGameState(prev => ({
      ...prev,
      humans: prev.humans.map(human => {
        // Simple random movement for humans
        const angle = Math.random() * Math.PI * 2;
        const speed = human.speed * deltaTime;
        let newX = human.x + Math.cos(angle) * speed;
        let newY = human.y + Math.sin(angle) * speed;

        // Keep humans within bounds
        newX = Math.max(human.size, Math.min(GAME_CONFIG.CANVAS_WIDTH - human.size, newX));
        newY = Math.max(human.size, Math.min(GAME_CONFIG.CANVAS_HEIGHT - human.size, newY));

        return { ...human, x: newX, y: newY };
      })
    }));
  }, []);

  const checkCollisions = useCallback(() => {
    let playerHit = false;
    let scoreIncrease = 0;

    setGameState(prev => {
      const newState = { ...prev };
      const bulletsToRemove = [];
      const enemiesToRemove = [];
      const humansToRemove = [];

      // Check bullet-enemy collisions
      newState.bullets.forEach((bullet, bulletIndex) => {
        newState.enemies.forEach((enemy, enemyIndex) => {
          if (checkBulletEnemyCollision(bullet, enemy)) {
            bulletsToRemove.push(bulletIndex);
            enemiesToRemove.push(enemyIndex);
            scoreIncrease += GAME_CONFIG.ENEMY_POINTS;
          }
        });
      });

      // Check player-enemy collisions
      newState.enemies.forEach(enemy => {
        if (checkPlayerEnemyCollision(newState.player, enemy)) {
          playerHit = true;
        }
      });

      // Check player-human collisions
      newState.humans.forEach((human, humanIndex) => {
        if (checkPlayerHumanCollision(newState.player, human)) {
          humansToRemove.push(humanIndex);
          scoreIncrease += GAME_CONFIG.HUMAN_POINTS;
        }
      });

      // Remove collided objects
      newState.bullets = newState.bullets.filter((_, index) => !bulletsToRemove.includes(index));
      newState.enemies = newState.enemies.filter((_, index) => !enemiesToRemove.includes(index));
      newState.humans = newState.humans.filter((_, index) => !humansToRemove.includes(index));

      return newState;
    });

    return { playerHit, scoreIncrease };
  }, []);

  const spawnEnemies = useCallback(() => {
    setGameState(prev => {
      const now = Date.now();
      if (now - prev.lastEnemySpawn < GAME_CONFIG.ENEMY_SPAWN_RATE) {
        return prev;
      }

      if (prev.enemies.length < GAME_CONFIG.MAX_ENEMIES) {
        const enemy = createEnemy();
        return {
          ...prev,
          enemies: [...prev.enemies, enemy],
          lastEnemySpawn: now
        };
      }
      return prev;
    });
  }, []);

  const spawnHumans = useCallback(() => {
    setGameState(prev => {
      const now = Date.now();
      if (now - prev.lastHumanSpawn < GAME_CONFIG.HUMAN_SPAWN_RATE) {
        return prev;
      }

      if (prev.humans.length < GAME_CONFIG.MAX_HUMANS) {
        const human = createHuman();
        return {
          ...prev,
          humans: [...prev.humans, human],
          lastHumanSpawn: now
        };
      }
      return prev;
    });
  }, []);

  const incrementScore = useCallback((points) => {
    setGameState(prev => ({
      ...prev,
      score: prev.score + points
    }));
  }, []);

  const resetGame = useCallback(() => {
    setGameState({
      player: createPlayer(),
      bullets: [],
      enemies: [],
      humans: [],
      score: 0,
      lives: 3,
      level: 1,
      lastBulletTime: 0,
      lastEnemySpawn: 0,
      lastHumanSpawn: 0
    });
  }, []);

  return {
    gameState,
    updatePlayer,
    addBullet,
    updateBullets,
    updateEnemies,
    updateHumans,
    checkCollisions,
    spawnEnemies,
    spawnHumans,
    incrementScore,
    resetGame
  };
};