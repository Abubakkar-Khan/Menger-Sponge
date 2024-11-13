class Box {
    constructor(x, y, z, r) {
        this.pos = createVector(x, y, z);  // Use p5.js's createVector for 3D coordinates
        this.r = r;
    }

    show() {
        push();  // Use push() to save the current transformation state

        translate(this.pos.x, this.pos.y, this.pos.z);
        fill(255, 50, 50);
        box(this.r);

        pop();  // Use pop() to restore the transformation state
    }

    generate() {
        let boxes = [];
        let newR = this.r / 3; // Use the current box's r value

        for (let x = -1; x < 2; x++) {
            for (let y = -1; y < 2; y++) {
                for (let z = -1; z < 2; z++) {
                    if (x === 0 && y === 0 && z === 0) {
                        // Skip this iteration (center position)
                        continue;
                    }

                    let sum = abs(x) + abs(y) + abs(z);

                    if (!(sum <= 1)) {
                        let b = new Box(
                            this.pos.x + x * newR,
                            this.pos.y + y * newR,
                            this.pos.z + z * newR,
                            newR
                        );
                        b.color = color(5, 20, 20); 
                        boxes.push(b);
                    }
                }
            }
        }

        return boxes;
    }
}

let sponge = [];
let orignal = [];  // Corrected the typo here
let x = 0;  // Initialize the click count variable
let a = 0;

function setup() {
    
    let canvas = createCanvas(500, 500, WEBGL); // Set the size of the canvas as needed
    canvas.parent('canvas-container'); // Specify the container's ID

    
    let b = new Box(0, 0, 0, 200);
    sponge.push(b);
    orignal.push(b);  // Save the original state

}

function mousePressed() {
    if (x >= 3) {
        sponge = orignal;  // Reset the sponge array to the original state
        x = 0;  // Reset click count to 0
    } else 
    {
        let next = [];
        for (let b of sponge) {
            next = next.concat(b.generate()); // Generate the next level of boxes
            
        }
        sponge = next;
        x += 1;  // Increment click count
    }
}


function draw() {

    
    background(22);

    noStroke();

    rotateX(-.3);
    rotateY(-0.2);
    // rotateZ();
    //rotateZ(a * 0.3);

    lights();

    for (let b of sponge) {
        b.show();
    }

    

    //a += 0.01;
}
