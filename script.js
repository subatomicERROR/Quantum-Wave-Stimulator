const canvas = document.getElementById('waveCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let wave = {
    y: canvas.height / 2,
    length: 0.01,
    amplitude: 100,
    frequency: 0.01
};

let increment = wave.frequency;
let increaseInterval, decreaseInterval;

document.getElementById('increase-frequency').addEventListener('mousedown', () => {
    increaseInterval = setInterval(() => {
        wave.frequency += 0.001;
    }, 50);
});

document.getElementById('increase-frequency').addEventListener('mouseup', () => {
    clearInterval(increaseInterval);
});

document.getElementById('decrease-frequency').addEventListener('mousedown', () => {
    decreaseInterval = setInterval(() => {
        wave.frequency -= 0.001;
    }, 50);
});

document.getElementById('decrease-frequency').addEventListener('mouseup', () => {
    clearInterval(decreaseInterval);
});

document.getElementById('set-frequency').addEventListener('change', (event) => {
    wave.frequency = parseFloat(event.target.value) / 1000;
});

document.getElementById('reset-frequency').addEventListener('click', () => {
    wave.frequency = 0.01;
});

function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);

    for (let i = 0; i < canvas.width; i++) {
        ctx.lineTo(i, wave.y + Math.sin(i * wave.length + increment) * wave.amplitude * Math.sin(increment));
    }

    ctx.strokeStyle = `hsl(${Math.abs(Math.sin(increment) * 360)}, 50%, 50%)`;
    ctx.stroke();
    increment += wave.frequency;
}

animate();