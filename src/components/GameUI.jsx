import React from 'react';
import '../styles/GameUI.css';

const GameUI = ({ 
  score, 
  lives, 
  level, 
  gameStarted, 
  gameOver, 
  isPaused, 
  onStartGame, 
  onPauseGame, 
  onResetGame 
}) => {
  return (
    <div className="game-ui">
      <div className="game-stats">
        <div className="stat">
          <span className="stat-label">SCORE:</span>
          <span className="stat-value">{score.toLocaleString()}</span>
        </div>
        <div className="stat">
          <span className="stat-label">LIVES:</span>
          <span className="stat-value">{lives}</span>
        </div>
        <div className="stat">
          <span className="stat-label">LEVEL:</span>
          <span className="stat-value">{level}</span>
        </div>
      </div>

      <div className="game-controls">
        {!gameStarted && (
          <button className="game-button start-button" onClick={onStartGame}>
            START GAME
          </button>
        )}
        
        {gameStarted && !gameOver && (
          <button className="game-button pause-button" onClick={onPauseGame}>
            {isPaused ? 'RESUME' : 'PAUSE'}
          </button>
        )}
        
        {gameStarted && (
          <button className="game-button reset-button" onClick={onResetGame}>
            RESET
          </button>
        )}
      </div>

      {gameOver && (
        <div className="game-over-screen">
          <h2 className="game-over-title">GAME OVER</h2>
          <p className="final-score">Final Score: {score.toLocaleString()}</p>
          <button className="game-button restart-button" onClick={onStartGame}>
            PLAY AGAIN
          </button>
        </div>
      )}

      {isPaused && gameStarted && !gameOver && (
        <div className="pause-screen">
          <h2 className="pause-title">PAUSED</h2>
          <div className="controls-help">
            <p>WASD or Arrow Keys: Move</p>
            <p>Mouse: Aim and Shoot</p>
            <p>IJKL: Shoot Direction</p>
          </div>
        </div>
      )}

      {!gameStarted && (
        <div className="instructions">
          <h2 className="instructions-title">ROBOTRON: 2084</h2>
          <div className="controls-help">
            <p><strong>Movement:</strong> WASD or Arrow Keys</p>
            <p><strong>Shooting:</strong> Mouse or IJKL Keys</p>
            <p><strong>Objective:</strong> Rescue humans, destroy robots!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameUI;