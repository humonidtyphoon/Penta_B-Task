//this dictioniary has fixed values for each Direction on X and Y
const advance = {
    F: { North: { x: 0, y: 1 }, East: { x: 1, y: 0 }, South: { x: 0, y: -1 }, West: { x: -1, y: 0 } },
    B: { North: { x: 0, y: -1 }, East: { x: -1, y: 0 }, South: { x: 0, y: 1 }, West: { x: 1, y: 0 } },
};

// this Dictionary has fixed values for rotations if R it will increase by 1, if L it will increse by -1
const rotate = {
    R: 1,
    L: -1
};
// each Direction will have a number representing it to help reducing Conditions     
//either make the variable names lower case or uppercase
const Directions = {
    North: 1,
    East: 2,
    South: 3,
    West: 4,
};
const Obstacles = [[1, 4], [3, 5], [7, 4]];
// Class Rover has data about the rover "Cordinations" and "Direction"        
const Rover = class {
    #x;
    #y;
    #direction;
    #directionNumber;
    // Constructor initialize the Rover with the start cordinations and start direction
    constructor(x, y, direction) {
        // check if placing the rover is valid. 
        //change goodPlace to suitablePos or smth
        let goodPlace = true;
        for (let obstacle of Obstacles) {
            if (x === obstacle[0] && y === obstacle[1])
                goodPlace = false;

        }
        // if the position is valid it will be placed successfully. 
        if (goodPlace) {
            this.#x = x;
            this.#y = y;
            this.#direction = direction;
            this.#directionNumber = Directions[direction];
            console.log(`The Rover Is Placed Successfully.`);
        }
        // if it isn't a valid postion, it will be redirected to the origin. 
        else {
            this.#x = 0;
            this.#y = 0;
            this.#direction = 'East';
            this.#directionNumber = Directions[this.#direction];
            console.log(`The Rover Can't Be Placed Here. The Rover Will Be Redirected To The Origin:(0,0) East.`);
        }

    }

    //move function take the commands and start applying them by moving the Rover and changing it's cordintaions.  
    move(commands) {
        for (let command of commands) {
            //checks if the commands are rotations or not, if true it will change the direction based on the rotation. 
            if (command === "L" || command === "R") {
                this.#directionNumber += rotate[command]
                //if the direction is bigger than 4 (West) then it will return to 1 (North).  
                if (this.#directionNumber > 4) this.#directionNumber = 1;

                //if the direction is equal 0 then it will return to 4 (West).
                else if (this.#directionNumber === 0) this.#directionNumber = 4;

                //find the direction name in the object by its value.  
                this.#direction = Object.keys(Directions).find(key => Directions[key] === this.#directionNumber);
                continue;
            }
            //moving the Rover based on command F and B on X and Y. 
            //check if it is valid position to move. 
            if (this.isValidPostion(this.#x, this.#y, command)) {
                this.#x += advance[command][this.#direction]['x'];
                this.#y += advance[command][this.#direction]['y'];
            }
            //if it isn't valid position then stop the rover and show the position it stopped at. 
            else {
                console.log(`(${this.#x},${this.#y}) ${this.#direction} STOPPED.`);
                return `(${this.#x},${this.#y}) ${this.#direction} STOPPED.`;
            }
        }
        // all commands are done. show the rover's postion.
        console.log(`(${this.#x},${this.#y}) ${this.#direction}.`);
        return `(${this.#x},${this.#y}) ${this.#direction}.`;
    }

    //position validation based on obstacles positions 
    isValidPostion(x, y, command) {
        x += advance[command][this.#direction]['x'];
        y += advance[command][this.#direction]['y'];
        for (let obstacle of Obstacles) {
            if (x === obstacle[0] && y === obstacle[1])
                return false
        }
        return true;
    }
}

module.exports = Rover;
