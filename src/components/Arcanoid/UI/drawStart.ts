import {
  START_MESSAGE1,
  START_MESSAGE2, START_MESSAGE3,
  START_MESSAGE_HEIGHT,
  START_MESSAGE_WIDTH,
} from 'Components/Arcanoid/settings';
import { gameProperties } from 'Components/Arcanoid/Game/GameObjects/GameProperties';

const drawStartMessage = () => {
  const { ctx } = gameProperties;
  if (!ctx) {
    return;
  }
  if (gameProperties.gameStarted || !gameProperties.neverStarted) {
    return;
  }
  const screenWidth = ctx.canvas.width;
  const screenHeight = ctx.canvas.height;
  const centerX = Math.round(screenWidth / 2);
  const centerY = Math.round(screenHeight / 2);
  const width = Math.round((screenWidth / 100) * START_MESSAGE_WIDTH);
  const height = Math.round((screenHeight / 100) * START_MESSAGE_HEIGHT);
  const halfWidth = Math.round(width / 2);
  const halfHeight = Math.round(height / 2);
  ctx.beginPath();
  ctx.font = '20px Arial bold';
  ctx.fillStyle = 'silver';
  ctx.strokeStyle = 'gray';
  ctx.fillRect(centerX - halfWidth, centerY - halfHeight, width, height);
  ctx.strokeRect(centerX - halfWidth, centerY - halfHeight, width, height);
  if (gameProperties.useShadows) {
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY = 10;
    ctx.shadowColor = 'rgb(20, 20, 20)';
  }
  ctx.closePath();
  ctx.beginPath();
  ctx.fillStyle = 'black';
  ctx.fillText(START_MESSAGE1, centerX, centerY - 40);
  ctx.fillText(START_MESSAGE2, centerX, centerY);
  ctx.fillText(START_MESSAGE3, centerX, centerY + 40);
  ctx.closePath();
};

export default drawStartMessage;
