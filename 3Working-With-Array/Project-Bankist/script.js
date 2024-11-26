"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = "";

  const move = sort ? movements.slice().sort((a, b) => a - b) : movements;

  move.forEach(function (mov, i) {
    const balanceStatus = mov > 0 ? "deposit" : "withdrawal";

    const movementHtml = `
    <div class="movements__row">
      <div class="movements__type movements__type--${balanceStatus}">${i + 1} ${balanceStatus}</div>
      <div class="movements__value">${mov}€</div>
    </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", movementHtml);
  });
};

const creatUserName = function (accs) {
  accs.forEach((acc) => {
    acc.userName = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};

creatUserName(accounts);

function balance(acc) {
  const currentBalance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  acc.balance = currentBalance;
  labelBalance.textContent = `${currentBalance}€`;
}

const calcDisplaySummary = function (accounts) {
  const income = accounts.movements.filter((mov) => mov > 0).reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${income}€`;

  const outcome = accounts.movements.filter((mov) => mov < 0).reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outcome)}€`;

  const interest = accounts.movements
    .filter((mov) => mov > 0)
    .map((mov) => (mov * accounts.interestRate) / 100)
    .filter((int) => int >= 1)
    .reduce((acc, int) => acc + int, 0);

  labelSumInterest.textContent = `${interest}€`;
};

// current account

// update ui

const updateUI = function (acc) {
  // display movement
  displayMovements(acc.movements);

  // display balance
  balance(acc);

  // display summery
  calcDisplaySummary(acc);
};

let currentAccount;

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();

  currentAccount = accounts.find((user) => user.userName === inputLoginUsername.value);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // display ui and message
    labelWelcome.textContent = `Welcome Back ${currentAccount.owner.split(" ")[0]}`;
    containerApp.classList.add("active");

    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const transferAmount = Number(inputTransferAmount.value);
  const reciverAccount = accounts.find((user) => user.userName === inputTransferTo.value);

  if (transferAmount > 0 && reciverAccount && currentAccount.balance >= transferAmount && reciverAccount?.userName !== currentAccount.userName) {
    currentAccount.movements.push(-transferAmount);
    reciverAccount.movements.push(transferAmount);
    updateUI(currentAccount);
    updateUI(reciverAccount);
  }
  inputTransferAmount.value = inputTransferTo.value = "";
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some((mov) => mov >= amount * 0.1)) {
    currentAccount.movements.push(Number(inputLoanAmount.value));
    inputLoanAmount.value = "";
    updateUI(currentAccount);
  } else {
    alert("The Loan Amount Is More Than Your Current Balance");
  }
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  if (currentAccount.userName === inputCloseUsername.value && currentAccount.pin === Number(inputClosePin.value)) {
    const index = accounts.findIndex((user) => user.userName === currentAccount.userName);
    console.log(index);
    accounts.splice(index, 1);
    containerApp.classList.remove("active");
    inputCloseUsername.value = inputClosePin.value = "";
  }
});

let sorted = false;

btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

// const accountMovements = accounts.map((acc) => acc.movements);
// const allMovements = accountMovements.flat();
// console.log(allMovements);
// const sumAllMovements = allMovements.reduce((acc, mov) => acc + mov, 0);
// console.log(sumAllMovements);

const overallBalance = accounts
  .map((acc) => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);

console.log(overallBalance);

// flatmap flat map methods does first map and the flat it require callback function and its only goes one level deep

const overallBalance1 = accounts.flatMap((acc) => acc.movements).reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance1);
