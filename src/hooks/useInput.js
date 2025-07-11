import { useState, useEffect, useCallback } from 'react';

export const useInput = (canvasRef) => {
  const [keys, setKeys] = useState({
    left: false,
    right: false,
    up: false,
    down: false,
    shootLeft: false,
    shootRight: false,
    shootUp: false,
    shootDown: false,
    shooting: false,
    shootX: 0,
    shootY: 0,
    mouseDown: false
  });

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleKeyDown = useCallback((e) => {
    const key = e.key.toLowerCase();
    setKeys(prev => {
      const newKeys = { ...prev };
      
      // Movement keys
      if (key === 'a' || key === 'arrowleft') newKeys.left = true;
      if (key === 'd' || key === 'arrowright') newKeys.right = true;
      if (key === 'w' || key === 'arrowup') newKeys.up = true;
      if (key === 's' || key === 'arrowdown') newKeys.down = true;
      
      // Shooting keys
      if (key === 'j') newKeys.shootLeft = true;
      if (key === 'l') newKeys.shootRight = true;
      if (key === 'i') newKeys.shootUp = true;
      if (key === 'k') newKeys.shootDown = true;

      // Update shooting direction
      let shootX = 0;
      let shootY = 0;
      if (newKeys.shootLeft) shootX -= 1;
      if (newKeys.shootRight) shootX += 1;
      if (newKeys.shootUp) shootY -= 1;
      if (newKeys.shootDown) shootY += 1;

      newKeys.shootX = shootX;
      newKeys.shootY = shootY;
      newKeys.shooting = shootX !== 0 || shootY !== 0;

      return newKeys;
    });
  }, []);

  const handleKeyUp = useCallback((e) => {
    const key = e.key.toLowerCase();
    setKeys(prev => {
      const newKeys = { ...prev };
      
      // Movement keys
      if (key === 'a' || key === 'arrowleft') newKeys.left = false;
      if (key === 'd' || key === 'arrowright') newKeys.right = false;
      if (key === 'w' || key === 'arrowup') newKeys.up = false;
      if (key === 's' || key === 'arrowdown') newKeys.down = false;
      
      // Shooting keys
      if (key === 'j') newKeys.shootLeft = false;
      if (key === 'l') newKeys.shootRight = false;
      if (key === 'i') newKeys.shootUp = false;
      if (key === 'k') newKeys.shootDown = false;

      // Update shooting direction
      let shootX = 0;
      let shootY = 0;
      if (newKeys.shootLeft) shootX -= 1;
      if (newKeys.shootRight) shootX += 1;
      if (newKeys.shootUp) shootY -= 1;
      if (newKeys.shootDown) shootY += 1;

      newKeys.shootX = shootX;
      newKeys.shootY = shootY;
      newKeys.shooting = shootX !== 0 || shootY !== 0;

      return newKeys;
    });
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  }, [canvasRef]);

  const handleMouseDown = useCallback(() => {
    setKeys(prev => ({ ...prev, mouseDown: true }));
  }, []);

  const handleMouseUp = useCallback(() => {
    setKeys(prev => ({ ...prev, mouseDown: false }));
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    if (canvasRef.current) {
      canvasRef.current.addEventListener('mousemove', handleMouseMove);
      canvasRef.current.addEventListener('mousedown', handleMouseDown);
      canvasRef.current.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      
      if (canvasRef.current) {
        canvasRef.current.removeEventListener('mousemove', handleMouseMove);
        canvasRef.current.removeEventListener('mousedown', handleMouseDown);
        canvasRef.current.removeEventListener('mouseup', handleMouseUp);
      }
    };
  }, [handleKeyDown, handleKeyUp, handleMouseMove, handleMouseDown, handleMouseUp, canvasRef]);

  return { keys, mousePos };
};