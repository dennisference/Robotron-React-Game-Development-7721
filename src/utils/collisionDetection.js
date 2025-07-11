export const checkBulletEnemyCollision = (bullet, enemy) => {
  const dx = bullet.x - enemy.x;
  const dy = bullet.y - enemy.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance < bullet.size + enemy.size;
};

export const checkPlayerEnemyCollision = (player, enemy) => {
  const dx = player.x - enemy.x;
  const dy = player.y - enemy.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance < player.size + enemy.size;
};

export const checkPlayerHumanCollision = (player, human) => {
  const dx = player.x - human.x;
  const dy = player.y - human.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance < player.size + human.size;
};