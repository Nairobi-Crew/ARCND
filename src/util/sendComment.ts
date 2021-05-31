/**
 * Отправка комментария обрпатной связи на сервер
 * @param comment
 */
const sendComment = async (comment: string): Promise<Response | string> => {
  const trimmed: string = comment.trim();
  if (trimmed === '') {
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject('Empty');
  }
  return fetch('/comment', { method: 'POST', body: JSON.stringify({ comment }), headers: { 'Content-type': 'Application/json' } });
};

export default sendComment;
