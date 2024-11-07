"use strict";

// 1 destruring of an array
// 2 switching variables
// 3 reciving value from function
// 4 nested destrutring
// 5 default value in destrutring

// destruturing is a feature that takes out the individual values from array and objects into seprate variables

// Data needed for a later exercise
// const flights = "_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30";

// Data needed for first part of the section
const restaurant = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  // openingHours: {
  //   thu: {
  //     open: 12,
  //     close: 22,
  //   },
  //   fri: {
  //     open: 11,
  //     close: 23,
  //   },
  //   sat: {
  //     open: 0, // Open 24 hours
  //     close: 24,
  //   },
  // },
};

const arr = [2, 4, 6];
const [a, b, c] = arr;
console.log(a, b, c);

// const [first, second] = restaurant["categories"];

// if you want to skip a value in an array for destruturing then just leave a blank space

let [first, , second] = restaurant["categories"];
console.log(first, second);

// switching variables

[first, second] = [second, first];
console.log(first, second);

// receving 2 values from function destruturing

const [starterMenu, MainCourse] = restaurant.order(2, 0);
console.log(starterMenu, MainCourse);

// destruring inside destruturing

const nested = [2, 4, [5, 6]];
const [i, j, [, k]] = nested;
console.log(i, j, k);

const marks = [49, 52];

const [p = 0, q = 0, r = 0] = marks;
console.log(p, q, r);
