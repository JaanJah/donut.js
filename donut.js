let a = 0;
let b = 0;

// Terminal size
const height = 24;
const width = 80;

// Clear terminal
process.stdout.write('\033[2J');

setInterval((() => {
    let zeroes = [];
    let screen = [];

    for (let k = 0; k < 1760; k++) {
        zeroes[k] = 0;
        screen[k] = k % 80 == 79 ? "\n" : " ";
    }

    let j = 0;
    for (let j = 0; j < 6.28; j += 0.07) {
        const sinJ = Math.sin(j);
        const cosJ = Math.cos(j);
        for (let i = 0; i < 6.28; i += 0.02) {
            const sinA = Math.sin(a);
            const cosA = Math.cos(a);
            const cosB = Math.cos(b);
            const sinB = Math.sin(b);

            const sinI = Math.sin(i);
            const cosI = Math.cos(i);

            const cosJ2 = cosJ + 2;
            const mess = 1 / (sinI * cosJ2 * sinA + sinJ * cosA + 5);
            const t = sinI * cosJ2 * cosA - sinJ * sinA;

            // 40 is the left screen shift
            const x = 0 | (40 + 30 * mess * (cosI * cosJ2 * cosB - t * sinB));
            // 12 is the down screen shift
            const y = 0 | (12 + 15 * mess * (cosI * cosJ2 * sinB + t * cosB));
            const o = x + width * y;
            
            const N = 0 | (8 * ((sinJ * sinA - sinI * cosJ * cosA) * cosB - sinI * cosJ * sinA - sinJ * cosA - cosI * cosJ * sinB));

            if (0 <= y && y < 22 && 0 <= x && x < 79 && zeroes[o] < mess) {
                zeroes[o] = mess;
                screen[o] = ".,-~:;=!*#$@"[N > 0 ? N : 0];
            }
        }

        process.stdout.write('\033[H');
        process.stdout.write(screen.join(""));

        a += 0.07;
        b += 0.03;
    }
}), 50);