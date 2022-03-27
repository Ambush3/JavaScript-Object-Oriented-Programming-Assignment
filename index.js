
// Object Literals
const circle = {
    radius: 1,
    location: {
        x: 1,
        y: 1
    },
    draw: function () {
        console.log('draw');
    }
};
// radius and location would be members
// draw would be a method

circle.draw();  // draw



// Factory Function
function createCircle(radius) {
    return {
        radius,
        draw: function () {
            console.log('draw');
        }
    };
}
const circle = createCircle(1);


// Constructor Function
// First letter of function name needs to be capitalized
function Circle(radius) {
    console.log('this', this);
    this.radius = radius;
    this.draw = function () {
        console.log('draw');
    }
}
const another = new Circle(1);  // new operator creates a new empty object
// takes this to point at that object
// Every object has a constructor property

// x and y are two independent variables
// primitives are copied by their value
// objects are copied by their reference
let number = 10;
function increase(number) {
    number++;
}
increase(number);
console.log(number);  // 10 - number is not changed because it is a local variable

// 

let obj = { value: 10 };
function increase(ob) {
    ob.value++;
}
increase(obj);
console.log(obj);  // 11 - obj is changed because it is a reference to the object

// Adding and removing properties  
circle.location = { x: 1 };
// another way to write this code
circle['location'] = { x: 1 };


// Enumerating properties
for (let key in circle) {
    if (typeof circle[key] !== 'function') {
        console.log(key, circle[key]);
    };
}

const keys = Object.keys(circle);
console.log(keys);  // radius, location, draw   

if ('radius' in circle) {
    console.log('Circle has a radius');
};


//Abstraction
// Hides the details. Show only essentials  
function Circle(radius) {
    this.radius = radius;
    this.defaultLocation = { x: 0, y: 0 };

    this.computeOptimumLocation = function () {
    }
    this.draw = function () {
        this.computeOptimumLocation();
        console.log('draw');
    };
}

const circle = new Circle(10);
circle.computeOptimumLocation();
circle.draw();

// Private Properties
// Only accessible from inside the object
function Circle(radius) {
    this.radius = radius;
    let defaultLocation = { x: 0, y: 0 };
    this.getDefaultLocation = function () {
        return defaultLocation;
    }
}


// Getters and Setters
// Getters and Setters are used to control access to properties
// Getters are used to get the value of a property  and Setters to set the value
// Getters and Setters are not used to change the value of a property
function Circle(radius) {
    this.radius = radius;

    let defaultLocation = { x: 0, y: 0 };

    this.getDefaultLocation = function () {
        return defaultLocation;
    };

    this.draw = function () {
        console.log('draw');
    };

    Object.defineProperty(this, 'defaultLocation', {
        get: function () {
            return defaultLocation;
        },
        set: function (value) {
            if (!value.x || !value.y)
                throw new Error('Invalid location.');

            defaultLocation = value;    // value is the new value
        }
    });
}

const circle = new Circle(10);
circle.defaultLocation = 1;
circle.draw();


// Exercise 
// Stopwatch
function Stopwatch() {
    let startTime, endTime, running, duration = 0;

    this.startTime = function () {
        if (running)
            throw new Error('Stopwatch has already started.');

        running = true;
        startTime = new Date();
    };

    this.stop = function () {
        if (!running)
            throw new Error('Stopwatch is not started.');

        running = false;
        endTime = new Date();
        duration += endTime - startTime;
    };

    this.reset = function () {
        startTime = null;
        endTime = null;
        running = false;
        duration = 0;
    };

    Object.defineProperty(this, 'duration', {
        get: function () { return duration; }
    });
}