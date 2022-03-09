// Change color every second letter
const userPost = document.querySelector('.user__name');
const userPostSplit = userPost.textContent.split('');

userPostSplit.forEach((el, index) => {
  if (index % 2 === 0) {
    userPostSplit[index] = '<span style="color:#f9ca24">' + userPostSplit[index] + '</span>';
    userPost.innerHTML = userPostSplit.join('');
  }
});
