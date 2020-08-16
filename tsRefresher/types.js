// boolean
var isCool = true;
// number
var age = 56;
// string
var eyeColor = 'brown';
var favoriteQuote = "I'm not old, I'm only " + age;
// Array
var pets = ['cat', 'dog', 'pigs'];
var petsAgain = ['turtle', 'cow', 'lizard'];
// object
var wizard = {
    a: 'John'
};
// wizard = 5
// null and undefined
var meh = undefined;
var what = null;
// Tuple
var basket;
basket = ['basketball', 5];
// Enum
var Size;
(function (Size) {
    Size[Size["Small"] = 1] = "Small";
    Size[Size["Medium"] = 2] = "Medium";
    Size[Size["Large"] = 3] = "Large";
})(Size || (Size = {}));
var sizeNumber = Size.Medium;
var sizeName = Size[2];
// Any <!!!>
var whatever = 'everything is gonna be...';
whatever = 123;
whatever = null;
whatever = Size.Large;
whatever = basket;
// void
var sing = function () {
    console.log('lalala la la');
    // return 123
};
// never
var error = function () {
    throw Error('oops');
};
var fightRobotArmy = function (robots) {
    console.log('FIGHT');
};
fightRobotArmy({ count: 2, type: 'Johnny 5' });
fightRobotArmy({ count: 4, type: 'Megaman', magic: 'Thunder Beam' });
var fightRobotArmyInline = function (robots) {
    console.log('FIGHT');
};
var dog = {};
dog.count;
// Function
var fightRobotArmyAgain = function (robots) {
    console.log('FIGHT');
};
// Classes
var Animal = /** @class */ (function () {
    function Animal(sound) {
        this.sing = 'la la la';
        this.roll = '. . .';
        this.sing = sound;
    }
    Animal.prototype.greet = function () {
        return "Hello, " + this.sing;
    };
    return Animal;
}());
var lion = new Animal('RAAAWWR');
console.log(lion.greet());
console.log(lion.roll);
// Union & Inference
var confused = 'hello';
// confused = 42
console.log(confused);
var x = 123;
// x = '123'
