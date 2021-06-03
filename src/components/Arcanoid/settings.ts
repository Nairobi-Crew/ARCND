export const GAME_CANVAS_ID = 'arcanoid';

export const FPS = 50; // максимум кадров/с
export const NO_SHADOWS = false;

// отступы на канвас

export const BALL_SPEED_LIMIT = 2;
export const BALL_MIN_SPEED = 4;
export const BALL_MAX_SPEED = 20;
export const IDLE_TIME = 5000;

export const MARGIN_LEFT = 2;
export const MARGIN_RIGHT = 2;
export const MARGIN_TOP = 100;
export const MARGIN_BOTTOM = 30;

export const ROCKET_HEIGHT = 20; // высота ракетки
export const ROCKET_WIDTH = 200; // ширина ракетки
export const ROCKET_MOVE_STEP = 14; // шаг перемещения ракетки
export const ROCKET_PARTS = 12; // количество зон ракетки для изменения угла откока шарика
export const ROCKET_PART_SPEED_MULT = 3; // коэффициет увеличения скрости
export const ROCKET_PART_SPEED_CHANGER = 4; // коэффициет увеличения скрости при "угловом" ударе

export const HELP_FILL_STYLE = '#fff'; // стили, текст и шрифт отображения информации
export const HELP_STROKE_STYLE = 'rgba(255, 255, 255, 0.5)';
export const HELP_TEXT = 'Стрелки влево-вправо - перемещение рокетки, ENTER - полноэкранный режим, SPACE - старт игры/выстрел, ESC - выход';
export const HELP_FONT = '18px Arial';

export const SOUND_SPLIT = 9;
export const SOUND_BLOCK = 3;
export const SOUND_WALL = 7;
export const SOUND_ROCKET = 6;
export const SOUND_SHOOT = 2;
export const SOUND_LIVES = 5;
export const SOUND_GOAL = 1;
export const SOUND_GAME_OVER = 6;
export const SOUND_BLOCK_SHOOT = 2;

export const SCORES_BLOCK = 4; // количество очков за попадание в блок
export const SCORES_ROCKET = 2; // количество очков за отбивание шарика
export const SCORES_FILL_STYLE = '#fff'; // стили, текст и шрифт отображения счета
export const SCORES_STROKE_STYLE = 'rgba(255, 255, 255, 0.5)';
export const SCORES_TEXT = 'Счет:';
export const SCORES_FONT = '20px Arial';

export type brickColor = {
  fill: string
  stroke: string
}

export const brickColors: brickColor[] = [];
brickColors.push({ stroke: 'reb', fill: 'blue' });
brickColors.push({ stroke: 'gray', fill: 'white' });
brickColors.push({ stroke: 'rgb(0, 100, 100)', fill: 'rgb(0, 200, 200)' });
brickColors.push({ stroke: 'green', fill: 'lime' });
brickColors.push({ stroke: 'navy', fill: 'blue' });
brickColors.push({ stroke: 'rgb(128, 0, 0)', fill: 'rgb(255, 0, 0)' });

// Уровни
export const LEVEL_FILL_STYLE = '#ff0'; // стили, текст и шрифт уровня
export const LEVEL_STROKE_STYLE = 'rgba(255, 255, 255, 0.5)';
export const LEVEL_TEXT = 'Уровень:';
export const LEVEL_FONT = '20px Arial';
export const LEVEL_STRING_LENGTH = 180; // максимальная длина обрабатываемой строки
export const LEVEL_BLOCKS_WIDTH = 5; // % ширина блока
export const LEVEL_BLOCKS_HEIGHT = 5; // % высота блока
export const LEVEL_BLOCK_SPACE = 0.25; // расстояние меду блоками: 0,25 1/4 ширины блока

// Бонусы
export const THING_SPEED = 2; // скорость падения бонуса - пикселей в кадр
export const THING_WIDTH = 30; // ширина бонуса
export const THING_HEIGHT = 20; // высота бонуса
export const THING_FONT = '10px Arial'; // шрифт буквы
export const THING_SHOW_TYPE = true; // отображать на блоке тип бонуса
export const THING_GUN_LETTER = 'П';
export const THING_GLUE_LETTER = 'К';
export const THING_EXPAND_LETTER = 'Ш';
export const THING_COMPRESS_LETTER = 'У';
export const THING_SPLIT_LETTER = 'Т';
export const THING_FIREBALL_LETTER = 'Ф';
export const THING_ROCKETMAX_LETTER = 'М';
export const THING_TYPE_CLEAR: 'yes' | 'no' | 'random' | 'if_random' = 'random';
export const SPLIT_ALL_BALLS = true;
export const SPLIT_QTY = 3;
export const FIREBALL_TIME = 10000;
export const ROCKETMAX_TIME = 10000;

// выстрелы
export const SHOOT_INTERVAL = 150; // минимальный интервал между выстрелами, мс
export const SHOOT_WIDTH = 8; // ширина выстрела
export const SHOOT_HEIGHT = 15; // высота выстрела
export const SHOOT_SPEED = 6; // скорость выстрела, пикс/кадр
export const SHOOT_QTY = -5; // максимальное количество выстрелов с бонуса,
// отрицательное число - бесконечность
export const GLUE_QTY = 5; // количество "клея", отрицательное число - бесконечность

// ствол
export const GUN_HEIGHT = 20; // высота
export const GUN_WIDTH = 10; // ширина

export const LIVES_BALL_RADIUS = 10; // радиус шаров "жизни"
// eslint-disable-next-line no-shadow
export enum EVENTS {
  GOAL = 'too:bad-goal',
  BALL_RETURN = 'good:ball-return',
  GAME_OVER = 'sorry:game-over',
  BLOCK = 'block:crash',
  GUN = 'take:a:gun',
  GLUE = 'take:a:glue',
  SPLIT = 'take:3balls',
  FIREBALL = 'take:fireball',
  EXPAND = 'expand:a:rocket',
  COMPRESS = 'compress:a:rocket',
  BRICK_CRASH = 'yeah:brick-level',
  ROCKETMAX = 'take:rocket_max',
}
