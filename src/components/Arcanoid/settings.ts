export const GAME_CANVAS_ID = 'arcanoid';

export const FPS = 80; // максимум кадров/с

// отступы на канвас

export const BALL_SPEED_LIMIT = 1;

export const ROCKET_HEIGHT = 20; // высота ракетки
export const ROCKET_WIDTH = 200; // ширина ракетки
export const ROCKET_MOVE_STEP = 14; // шаг перемещения ракетки
export const ROCKET_PARTS = 12; // количество зон ракетки для изменения угла откока шарика
export const ROCKET_PART_SPEED_MULT = 2; // коэффициет увеличения скрости
export const ROCKET_PART_SPEED_CHANGER = 3; // коэффициет увеличения скрости при "угловом" ударе

export const HELP_FILL_STYLE = '#fff'; // стили, текст и шрифт отображения информации
export const HELP_STROKE_STYLE = 'rgba(255, 255, 255, 0.5)';
export const HELP_TEXT = 'Стрелки влево-вправо - перемещение рокетки, ENTER - полноэкранный режим, SPACE - старт игры/выстрел, ESC - выход';
export const HELP_FONT = '18px Arial';

export const SCORES_FILL_STYLE = '#fff'; // стили, текст и шрифт отображения счета
export const SCORES_STROKE_STYLE = 'rgba(255, 255, 255, 0.5)';
export const SCORES_TEXT = 'Счет:';
export const SCORES_FONT = '20px Arial';

// Уровни
export const LEVEL_FILL_STYLE = '#ff0'; // стили, текст и шрифт уровня
export const LEVEL_STROKE_STYLE = 'rgba(255, 255, 255, 0.5)';
export const LEVEL_TEXT = 'Уровень:';
export const LEVEL_FONT = '20px Arial';
export const LEVEL_STRING_LENGTH = 50; // максимальная длина обрабатываемой строки
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
export const SPLIT_ALL_BALLS = false;
export const SPLIT_QTY = 3;

// выстрелы
export const SHOOT_INTERVAL = 150; // минимальный интервал между выстрелами, мс
export const SHOOT_WIDTH = 8; // ширина выстрела
export const SHOOT_HEIGHT = 15; // высота выстрела
export const SHOOT_SPEED = 4; // скорость выстрела, пикс/кадр
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
  EXPAND = 'expand:a:rocket',
  COMPRESS = 'compress:a:rocket',
  BRICK_CRASH = 'yeah:brick-level'
}
