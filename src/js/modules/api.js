export const sendForm = (onSuccess, onFail, body) => {
  fetch(
    'mail.php',
    {
      method: 'POST',
      body: body
    }
  )
    .then((response) => {
      return response.ok ? response : onFail();
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      onFail();
    });
};
