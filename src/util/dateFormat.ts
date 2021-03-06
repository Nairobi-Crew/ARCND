import replaceAll from './replaceAll';

const dateFormat = (
  date: Date | number,
  format = 'dd-mm-yy HH:MM:SS',
): string => { // форматирование даты
  let d: Date;
  try {
    d = new Date(date);
  } catch (e) {
    d = date as Date;
  }
  try {
    const formatter = Intl.DateTimeFormat('ru', {
      weekday: 'long',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
      // timeZone: 'UTC',
    });
    const parts = formatter.formatToParts(d);

    const getPart = (part: string) => {
      const found = parts.find(({ type }) => type === part);
      return found ? found.value : '';
    };

    // дни, начиная с 0, дополняем справа '0'
    const day: string = (`0${getPart('day')}`).slice(-2);
    // месяцы, начиная с 0, дополняем справа '0'
    const month: string = (`0${getPart('month')}`).slice(-2);
    // годы, дополняем справа '0'
    const fullYear: string = (`0000${getPart('year')}`).slice(-4);
    const year: string = (`00${getPart('year')}`).slice(-2);
    // часы, дополняем справа '0'
    const hours: string = (`0${getPart('hour')}`).slice(-2);
    // минуты, дополняем справа '0'
    const minutes: string = (`0${getPart('minute')}`).slice(-2);
    // секунды, дополняем справа '0'
    const seconds: string = (`0${getPart('second')}`).slice(-2);
    let result: string = format;
    // меняем форматную строку - dd  на дни
    result = replaceAll(result, 'dd', day);
    result = replaceAll(result, 'mm', month);// и т.д.
    result = replaceAll(result, 'yyyy', fullYear);
    result = replaceAll(result, 'yy', year);
    result = replaceAll(result, 'HH', hours);
    result = replaceAll(result, 'MM', minutes);
    result = replaceAll(result, 'SS', seconds);

    return result;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(`Ошибка в дате ${date}`);
    return 'Неверная дата';
  }
};

export default dateFormat;
