/**
 * Everything is an object (or not)
 * 
In JS there are two types of value: primitives (the primitive data type) and objects
objects are complex things: arrays, functions, objects, dates

OOD makes use of objects, properties and methods.
used to store data, structure applications into models and keep code clean

prototypes/constructors create a blueprint for an instance of a related object

jane, mark and john are instances of a person. When they are created we define their name, year of birth etc.

inheritance is when an object is based on another object, and gains access to the parent's properties and methods
e.g. an athlete object can inherit from person object, with new properties and methods

JavaScript is a prototype based language. Each and every object has a prototype property.
we add methods and properties we want to be inherited to the prototype property
the prototype is the prototype of all object instances, not the object (e.g. Person) itself.
every object also inherits the Object prototype with its own properties e.g. hasOwnProperty

// The Prototype chain
Acts similarly to the scope chain. JS tries to find the called property or function in the first object, and if it cant find it it looks in the prototype of the parent, until it reaches null.
 */

// Function constructor

//object literal to create John:
var john = {
  name: 'John',
  yearOfBirth: 1990,
  job: 'teacher',
}

// function constructor is a pattern for creating a blueprint

var Person = function(name, yearOfBirth, job) {
  this.name = name;
  this.yearOfBirth = yearOfBirth;
  this.job = job;
  // can add methods here, but it is a convention to add them to the prototype instead as below.
}

// Add the method to the prototype property instead of the constructor which can be inherited
Person.prototype.calculateAge = function() {
  console.log(2020 - this.yearOfBirth);
}

// properties can also be added to the prototype property, but it is a convention to add them in the constructor
// properties inherited from the prototype are not defined as an ownProperty of the instance
// john.hasOwnProperty('lastname') !== true
Person.prototype.lastname = 'Smith';

// instantiation of the Person object
// when we use the new operator
// 1. A new EMPTY object is created
// 2. A function is called, with a new execution context and a new context for the 'this' variable, which points to the empty object we created

john = new Person('John', 1990, 'teacher');

console.log(john)
john.calculateAge()

var jane = new Person('Jane', 1969, 'designer');
var mark = new Person('Mark', 1948, 'retired');
jane.calculateAge();
mark.calculateAge();
console.log(jane.lastname);

// can also be used to add methods to built in objects!
Array.prototype.name = 'hello'

// Object.create

const personProto = {
  calculateAge: function() {
    console.log(2020 - this.yearOfBirth);
  }
}

var harry = Object.create(personProto);
harry.name = 'harry';
harry.yearOfBirth = 1990;
harry.job = 'gardener';

var gemma = Object.create(personProto, {
  name: { value: 'Jane'},
  yearOfBirth: { value: 1969 },
  job: { value: 'chef' }
})

// primitives vs objects

// variables containing primitive data contain that data itself
// variables containing objects do not contain the data, but point to a reference in memory

// Copying and mutating primitives
var a = 23;
var b = 23;
a = 46;
console.log(a);
console.log(b);

// each variable above has its own copy of the data and can be mutated independently


// copying and mutating objects
var obj1 = {
  name: 'John',
  age: 26
}

var obj2 = obj1;
obj1.age = 30;

// the variables above hold a reference which point to the exact same object in memory, so the mutation mutates the same array

// Functions

var age = 27;
var obj = {
  name: 'Jonas',
  city: 'Lisbon'
}

function change(a, b) {
  a = 30;
  b.city = 'London'
  // this function creates a copy of the primitive, but it still edits the original object as it is a reference
}

change(age, obj) 
console.log(age)
console.log(obj.city)

/////////////////
// functions //
// a function is an instance of the Object type
// we can store functions in a variable
// we can pass functions into functions as an argument
// functions can also return functions

var years = [1990,1965,1937,2005,1998];

function arrayCalc(arr, fn) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(fn(arr[i]));
  }
  return result;
}

function calculateAge(el) {
  return 2020 - el;
}

function isFullAge(el) {
  return el >= 18;
}

var ages = arrayCalc(years, calculateAge);
var fullAges = arrayCalc(ages, isFullAge);

console.log(ages);
console.log(fullAges);

// Functions returning functions

function interviewQuestion(job) {
  if (job === 'designer') {
    return function(name) {
      console.log(`${name}, can you please explain what UX design is?`)
    }
  } else if (job === 'teacher') {
    return function(name) {
      console.log(`What do you teach, ${name}?`)
    } 
  } else {
    return function(name) {
      console.log(`What do you do, ${name}`)
    }
  }
}

var teacherQuestion = interviewQuestion('teacher');
var designerQuestion = interviewQuestion('designer');

teacherQuestion('john')
designerQuestion('michael')
teacherQuestion('jane')
designerQuestion('claire')

interviewQuestion('designer')('mark');

