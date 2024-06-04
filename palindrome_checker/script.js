
const update = (input, output) => {
  const str = input.value;
  if (!str) {
    alert('Please input a value');
    return;
  }
  let outText;
  output.textContent = "";
  if (isPalindromeAlt(str)) {
    outText = `<strong>${str}</strong> is a palindrome`;
  } else if (!isPalindromeAlt(str)) {
    outText = `<strong>${str}</strong> is not a palindrome`;
  }
  output.insertAdjacentHTML("beforeend", outText);
}
  
const checkPalindromeBtn = document.getElementById('check-btn');
checkPalindromeBtn.addEventListener('click', () => {
  const input = document.getElementById('text-input');
  update(input, output);
  input.innerText = '';
});

const isPalindromeAlt = (str) => {
  const newStr = str.toLowerCase().replace(/[\W_]/g, '');
  let i = 0;
  let j = newStr.length - 1;
  for (; i < j && newStr[i] == newStr[j]; i++, j--);
  return i < j ? false: true ;
}

