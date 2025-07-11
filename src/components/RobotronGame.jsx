import React, { useState, useEffect, useRef, useCallback } from 'react';
import GameCanvas from './GameCanvas';
import GameUI from './GameUI';
import { useGameState } from '../hooks/useGameState';
import { useGameLoop } from '../hooks/useGameLoop';
import { useInput } from '../hooks/useInput';
import { GAME_CONFIG } from '../utils/gameConfig';

const RobotronGame = () => {
  const canvasRef = useRef(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Initialize game state
  const {
    gameState,
    updatePlayer,
    addBullet,
    updateBullets,
    updateEnemies,
    updateHumans,
    checkCollisions,
    spawnEnemies,
    spawnHumans,
    resetGame,
    incrementScore
  } = useGameState();

  // Handle input
  const { keys, mousePos } = useInput(canvasRef);

  // Game loop
  const gameLoop = useCallback((deltaTime) => {
    if (!gameStarted || gameOver || isPaused) return;

    // Update player position based on input
    updatePlayer(keys, deltaTime);

    // Handle shooting
    if (keys.shooting || keys.mouseDown) {
      const shootDirection = mousePos ? 
        { x: mousePos.x - gameState.player.x, y: mousePos.y - gameState.player.y } :
        { x: keys.shootX, y: keys.shootY };
      
      if (shootDirection.x !== 0 || shootDirection.y !== 0) {
        addBullet(gameState.player.x, gameState.player.y, shootDirection);
      }
    }

    // Update game objects
    updateBullets(deltaTime);
    updateEnemies(deltaTime, gameState.player);
    updateHumans(deltaTime);

    // Check collisions
    const collisionResults = checkCollisions();
    
    if (collisionResults.playerHit) {
      setGameOver(true);
    }

    if (collisionResults.scoreIncrease > 0) {
      incrementScore(collisionResults.scoreIncrease);
    }

    // Spawn new enemies and humans
    spawnEnemies();
    spawnHumans();

  }, [gameStarted, gameOver, isPaused, keys, mousePos, gameState.player, updatePlayer, addBullet, updateBullets, updateEnemies, updateHumans, checkCollisions, spawnEnemies, spawnHumans, incrementScore]);

  useGameLoop(gameLoop);

  const handleStartGame = () => {
    setGameStarted(true);
    setGameOver(false);
    resetGame();
  };

  const handlePauseGame = () => {
    setIsPaused(!isPaused);
  };

  const handleResetGame = () => {
    setGameStarted(false);
    setGameOver(false);
    resetGame();
  };

  return (
    <div className="robotron-game">
      <GameUI 
        score={gameState.score}
        lives={gameState.lives}
        level={gameState.level}
        gameStarted={gameStarted}
        gameOver={gameOver}
        isPaused={isPaused}
        onStartGame={handleStartGame}
        onPauseGame={handlePauseGame}
        onResetGame={handleResetGame}
      />
      <GameCanvas 
        ref={canvasRef}
        gameState={gameState}
        width={GAME_CONFIG.CANVAS_WIDTH}
        height={GAME_CONFIG.CANVAS_HEIGHT}
      />
    </div>
  );
};

export default RobotronGame;