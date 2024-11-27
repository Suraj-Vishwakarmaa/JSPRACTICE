// flat method
// flatmap method

const arr = [[2, 4, 6], [8, 10, 12], 14, 16];
console.log(arr.flat());

// by default flat method only go 1 level deep

const arr2 = [[[2, 4], 6], [8, [10, 12]], 14, 16];
console.log(arr2.flat(2));

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

const overallBalance = accounts
  .map((acc) => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance);

// flat map method

const overallBalance1 = accounts.flatMap((acc) => acc.movements).reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance1);
