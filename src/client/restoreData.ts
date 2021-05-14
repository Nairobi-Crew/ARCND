// eslint-disable-next-line import/prefer-default-export
export function restoreData() {
  const element = document.getElementById('data');

  if (element && element.textContent) {
    return JSON.parse(
      element.textContent.replace(/&lt;/g, '<'),
    );
  }
  return {};
}
