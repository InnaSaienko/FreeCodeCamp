const update = (input, output) => {
  const str = input.value;
  if (!str) {
    alert('Please provide a phone number');
    return;
  }
  let outText;
  output.textContent = "";
  if (isValid(str)) {
    outText = `Valid US number: <strong>${str}</strong>`;
  } else if (!isValid(str)) {
    outText = `Invalid US number: <strong>${str}</strong>`;
  }
  output.insertAdjacentHTML("beforeend", outText);
}

const isValid = (str) => {
  const regex = /^(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/;
  return regex.test(str)? true: false;
}  

const checkPhoneNumberBtn = document.getElementById('check-btn');

checkPhoneNumberBtn.addEventListener('click', () => {
  const input = document.getElementById('user-input');
  const output = document.getElementById('results-div');
  update(input, output);
  input.value = '';
});

const clearPhoneNumberBtn = document.getElementById('clear-btn');

clearPhoneNumberBtn.addEventListener('click', () => {
  const output = document.getElementById('results-div');
  output.textContent = '';
});
