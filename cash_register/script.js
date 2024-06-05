let price = 3.26;
const UNIT = [
  ["PENNY", 0.01],
  ["NICKEL", 0.05],
  ["DIME", 0.1],
  ["QUARTER", 0.25],
  ["ONE", 1],
  ["FIVE", 5],
  ["TEN", 10],
  ["TWENTY", 20],
  ["ONE HUNDRED", 100]
];

let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

const displayOutput = document.getElementById('output');
const cash = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');
const priceScreen = document.getElementById('price-screen');
const cashDrawerDisplay = document.getElementById('register_drawer');

const formatResults = (result) => {

  const cashRegister = result;
  let outputHTML = `<p>Status: ${cashRegister.status}</p>`;
  cashRegister.change.forEach(([denomination, amount]) => {
    outputHTML += `<p>${denomination}: $${amount}</p>`;
  });
  return outputHTML;
};

const formatDrawer = (cid) => {
  let registerNewHTML = cid.map(([denomination, amount]) => {
    return `<p>${denomination}: $${amount.toFixed(2)}</p>`;
  }).join('');
  return registerNewHTML;
};


const changeBills = (rest, cid) => {
  let change = [];

  for (let i = UNIT.length - 1; rest > 0 && i >= 0; i--) {
    let currUnit = UNIT[i][1];
    if (currUnit > rest || cid[i][1] == 0) {
      continue;
    }
    let amountRequired = Math.floor(rest / currUnit);
    let amountAtCheckout = cid[i][1] / currUnit;

    if (amountRequired > amountAtCheckout) {
      rest -= cid[i][1];
      change.push([cid[i][0], cid[i][1]]);
      cid[i][1] = 0;
    } else {
      rest -= amountRequired * currUnit;
      change.push([cid[i][0], amountRequired * currUnit]);
      cid[i][1] -= (amountRequired * currUnit);
    }
    rest = Math.round(rest * 100) / 100;
  }
  return change;
};

const checkCash = (price, cash, cid) => {
  let change = [];
  let status;
  let rest = Math.round((Number(cash.value) - price) * 100) / 100;
  let kassaSum = cid.reduce((accumulator, currentValue) => {
    return accumulator + currentValue[1]
  }, 0);
  kassaSum = Math.round(kassaSum * 100) / 100;

  if (rest > kassaSum) {
    status = "INSUFFICIENT_FUNDS";
    change = [];
  } else if (rest == kassaSum) {
    status = "CLOSED";
    change = cid;
  } else {
    status = "OPEN";
    change = changeBills(rest, cid);

    let changeSum = change.reduce((accumulator, currentValue) => {
      return accumulator + currentValue[1]
    }, 0);
    changeSum = Math.round(changeSum * 100) / 100;

    if (rest != changeSum) {
      status = "INSUFFICIENT_FUNDS";
      change = [];
    }
  }
  return { status: status, change: change };
}

const checkCashRegister = () => {
  if (Number(cash.value) < price) {
    alert('Customer does not have enough money to purchase the item');
    cash.value = '';
    return;
  }

  if (Number(cash.value) === price) {
    displayOutput.innerHTML =
      '<p>No change due - customer paid with exact cash</p>';
    cash.value = '';
    return;
  }

  let resultOutput = checkCash(price, cash, cid);
  displayOutput.innerHTML = formatResults(resultOutput);
  cash.value = '';
  cashDrawerDisplay.innerHTML = formatDrawer(cid);

}
const checkResults = () => {
  if (!cash.value) {
    return;
  }
  checkCashRegister();
};

purchaseBtn.addEventListener('click', checkResults);


