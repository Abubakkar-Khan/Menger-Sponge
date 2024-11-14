class Box {
    constructor(x, y, z, r) {
        // Initialize the Box position using p5.js's createVector for 3D coordinates
        this.pos = createVector(x, y, z);
        this.r = r; // Store the size of the box
    }

    show() {
        // Save the current transformation state
        push();

        // Move to the box's position in 3D space
        translate(this.pos.x, this.pos.y, this.pos.z);
        fill(255, 50, 50);  // Set box color
        box(this.r);  // Draw the box with the specified size

        // Restore the previous transformation state
        pop();
    }

    generate() {
        let boxes = [];  // Array to store smaller boxes
        let newR = this.r / 3;  // Reduce the box size for next generation

        // Loop through all positions in a 3x3x3 grid around the current box
        for (let x = -1; x < 2; x++) {
            for (let y = -1; y < 2; y++) {
                for (let z = -1; z < 2; z++) {
                    // Skip the center box
                    if (x === 0 && y === 0 && z === 0) continue;

                    // Only create boxes that aren’t along just one axis
                    let sum = abs(x) + abs(y) + abs(z);
                    if (sum > 1) {
                        // Create a new smaller Box at this position
                        let b = new Box(
                            this.pos.x + x * newR,
                            this.pos.y + y * newR,
                            this.pos.z + z * newR,
                            newR
                        );
                        boxes.push(b); // Add to the array
                    }
                }
            }
        }

        return boxes; // Return the new array of boxes
    }
}

let sponge = []; // Array to store current sponge state
let original = []; // Array to store the original sponge state
let x = 0; // Variable to count clicks
let a = 0; // Rotation angle variable

function setup() {
    createCanvas(500, 500, WEBGL); // Create a 3D canvas

    // Create the initial box and add it to sponge and original arrays
    let b = new Box(0, 0, 0, 200);
    sponge.push(b);
    original.push(b);
}

function mousePressed() {
    // If clicked 3 times, reset to the original box
    if (x >= 2) {
        sponge = original;  // Reset sponge to original state
        x = 0; // Reset click count
    } else {
        let next = []; // Array to store the next generation of boxes
        // Generate and add the next level of boxes for each box in sponge
        for (let b of sponge) {
            next = next.concat(b.generate());
        }
        sponge = next; // Update sponge with the new generation
        x += 1; // Increment click count
    }
}

function draw() {
    background(22); // Set background color
    noStroke(); // Remove outlines

    // Rotate the entire sponge slowly
    rotateX(a);
    rotateY(a * 0.5);
    rotateZ(a * 0.3);

    lights(); // Enable lighting for 3D effect

    // Draw each box in the sponge array
    for (let b of sponge) {
        b.show();
    }

    // Increment rotation angle for animation
    a += 0.01;
}
