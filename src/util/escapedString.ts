// return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') //экранирование
// eslint-disable-next-line import/prefer-default-export
export const escapedString = (stringBeEscaped: string): string => (stringBeEscaped
  ? stringBeEscaped.replace(/[&/\\#,+()$~%.'":*?<>{}]/g, '')
  : '');
