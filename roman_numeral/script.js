const numerals = {
    1000: 'M',
    900: 'CM',
    500: 'D',
    400: 'CD',
    100: 'C',
    90: 'XC',
    50: 'L',
    40: 'XL',
    10: 'X',
    9: 'IX',
    5: 'V',
    4: 'IV',
    1: 'I'
}


const MIN_INPUT_NUMBER = 1;
const MAX_INPUT_NUMBER = 3999;

const convertToRoman = (num) => {
  if (!num) return;

  let result = [];
  let numeralsKeys = Object.keys(numerals).map(Number).sort((a,b) => a > b ? -1 : a < b ? 1 : 0);
    
  for (let i = 0; num > 0 && i <= numeralsKeys.length; i++) {
    if (numeralsKeys[i] > num) {
    continue;
    }
    let arabic = numeralsKeys[i];
    let amount = Math.floor(num / arabic);
    num -= amount * arabic;
    while (amount-- > 0) {
      result.push(numerals[arabic]);
    }
  }
  return result.join('');
}


const isBelowMin = (num) => {
  return num < MIN_INPUT_NUMBER ? true : false;
}

const isAboveMax = (num) => {
  return num > MAX_INPUT_NUMBER ? true : false;
}

const update = (input, output) => {
  const number = input.value;
  let outText;
  if (!number) {
    outText = 'Please enter a valid number.';
  } else if (isBelowMin(number)) {
    outText = `Please enter a number greater than or equal to ${MIN_INPUT_NUMBER}.`;
  } else if (isAboveMax(number)) {
    outText = `Please enter a number less than or equal to ${MAX_INPUT_NUMBER}.`;
  } else {
    outText = convertToRoman(number);
  }
  output.innerText = outText;
  output.classList.remove('hidden');
}
