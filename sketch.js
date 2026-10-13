const r = require("raylib");

function running() {
    return !r.WindowShouldClose();
}

function setup() {

    const window = {
        WIDTH: 1200,
        HEIGHT: 600,
        FPS: 60
    }

    const Bar = {
        width: 50,
        gap: 10
    }

    const array = [10, 45, 78, 23, 90, 56, 34, 67, 89, 40];

    // const array = [12, 47, 83, 29, 95, 58, 36, 71, 88, 42, 15, 63, 74, 50, 91, 27, 66, 39, 82, 55];

    const largestNumber = findLargest(array)

    const largestNumberHeight = largestHeight(window.HEIGHT)

    const scalingValue = largestNumberHeight / largestNumber;

    const avg = findAverage(array)

    r.InitWindow(window.WIDTH, window.HEIGHT, "Averages")
    r.SetTargetFPS(window.FPS)

    return { array, window, Bar, scalingValue, avg }
}

function update() {
    // change the state
}

function findLargest(array) {
    let largest = array[0];

    for (const index in array) {
        largest = Math.max(largest, array[index]);
    }

    return largest
}

function largestHeight(screenheight) {
    return screenheight * 90 / 100;
}

function drawBar(number, bar, scalingValue, height, index) {

    const barHeight = scalingValue * number

    console.log(scalingValue)

    const rectangle = {
        x: (bar.width * index) + (bar.gap * (index + 1)),
        y: height - barHeight,
        width: bar.width,
        height: barHeight,
    }

    r.DrawRectangleRec(rectangle, r.DARKBLUE)
}

function avgLine(avg, scalingValue, window) {
    const avgAxis = scalingValue * avg

    const lineObj = {
        start: {
            x: 0,
            y: window.HEIGHT - avgAxis
        },
        end: {
            x: window.WIDTH,
            y: window.HEIGHT - avgAxis
        }
    }

    r.DrawLineV(lineObj.start, lineObj.end, r.RED)
}

function findAverage(array) {
    let total = 0;

    for (const element of array) {
        total += element;
    }

    return total / array.length
}

function draw(world) {

    r.BeginDrawing();

    r.ClearBackground(r.RAYWHITE)

    for (let i = 0; i < world.array.length; i++) {
        drawBar(world.array[i], world.Bar, world.scalingValue, world.window.HEIGHT, i)
    }

    avgLine(world.avg, world.scalingValue, world.window)

    r.EndDrawing();
}

function teardown() {
    r.CloseWindow();
}

module.exports = {
    running,
    setup,
    update,
    draw,
    teardown,
};