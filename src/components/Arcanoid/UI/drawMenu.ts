import { GameWindowProps } from 'Components/Arcanoid/Game/types';
import { gameObjects } from 'Components/Arcanoid/Game/GameObjects/GameFieldObjects';

const drawMenu = (gameWindow: GameWindowProps) => {
  const menuWidth = Math.round(gameWindow.width / 8);
  const menuHeight = Math.round(gameWindow.height / 8);
  const centerX = Math.round((gameWindow.left + gameWindow.width) / 2);
  const centerY = Math.round((gameWindow.top + gameWindow.height) / 2);
  const { ctx } = gameObjects;
  ctx.strokeStyle = 'white';
  ctx.fillStyle = 'black';
  ctx.fillRect(centerX - menuWidth, centerY - menuHeight, menuWidth * 2, menuHeight * 2);
  ctx.textAlign = 'center';
  ctx.strokeText('Выйти? [Y]', centerX, centerY);
};

export default drawMenu;