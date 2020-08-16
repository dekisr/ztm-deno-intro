// boolean
let isCool: boolean = true

// number
let age: number = 56

// string
let eyeColor: string = 'brown'
let favoriteQuote: string = `I'm not old, I'm only ${age}`

// Array
let pets: string[] = ['cat', 'dog', 'pigs']
let petsAgain: Array<string> = ['turtle', 'cow', 'lizard']

// object
let wizard: object = {
  a: 'John',
}
// wizard = 5

// null and undefined
let meh: undefined = undefined
let what: null = null

// Tuple
let basket: [string, number]
basket = ['basketball', 5]

// Enum
enum Size {
  Small = 1,
  Medium = 2,
  Large = 3,
}
let sizeNumber: number = Size.Medium
let sizeName: string = Size[2]

// Any <!!!>
let whatever: any = 'everything is gonna be...'
whatever = 123
whatever = null
whatever = Size.Large
whatever = basket

// void
let sing = (): void => {
  console.log('lalala la la')
  // return 123
}

// never
let error = (): never => {
  throw Error('oops')
}

// interface & type
type MageArmy = {
  count: number
  type: string
  magic: string
}
interface RobotArmy {
  count: number
  type: string
  magic?: string
}
let fightRobotArmy = (robots: RobotArmy) => {
  console.log('FIGHT')
}
fightRobotArmy({ count: 2, type: 'Johnny 5' })
fightRobotArmy({ count: 4, type: 'Megaman', magic: 'Thunder Beam' })
let fightRobotArmyInline = (robots: {
  count: number
  type: string
  magic: string
}) => {
  console.log('FIGHT')
}

// Type Assertion
interface CatArmy {
  count: number
  type: string
  magic: string
}
let dog = {} as CatArmy
dog.count

// Function
let fightRobotArmyAgain = (robots: RobotArmy): void => {
  console.log('FIGHT')
}

// Classes
class Animal {
  private sing: string = 'la la la'
  public roll: string = '. . .'
  constructor(sound: string) {
    this.sing = sound
  }
  greet(): string {
    return `Hello, ${this.sing}`
  }
}
let lion = new Animal('RAAAWWR')
console.log(lion.greet())
console.log(lion.roll)

// Union & Inference
let confused: string | boolean = 'hello'
// confused = 42
console.log(confused)
let x = 123
// x = '123'