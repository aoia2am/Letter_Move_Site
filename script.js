// =============================
// 要素取得
// =============================

const star = document.getElementById("star");
const fig = document.getElementById("fig");

const flower1 = document.getElementById("flower1");
const flower2 = document.getElementById("flower2");

const canvas = document.getElementById("space-canvas");
const ctx = canvas.getContext("2d");

let figTimer;

// =============================
// Canvasサイズ
// =============================

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// =============================
// 星空エフェクト
// =============================

let stars = [];
let animationRunning = false;

class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.radius = Math.random() * 1.5 + 0.5;

        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;

        this.alpha = Math.random();
        this.twinkle = Math.random() * 0.02 + 0.005;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        this.alpha += this.twinkle;

        if (this.alpha > 1 || this.alpha < 0.2) {
            this.twinkle *= -1;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${this.alpha})`;
        ctx.fill();
    }
}

function createStars() {
    stars = [];
    for (let i = 0; i < 100; i++) {
        stars.push(new Star());
    }
}

function animateStars() {

    if (!animationRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
        star.update();
        star.draw();
    });

    for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {

            const dx = stars[i].x - stars[j].x;
            const dy = stars[i].y - stars[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
                const alpha = (1 - distance / 120) * 0.15;

                ctx.beginPath();
                ctx.moveTo(stars[i].x, stars[i].y);
                ctx.lineTo(stars[j].x, stars[j].y);

                ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(animateStars);
}

star.addEventListener("click", () => {

    if (animationRunning) {
        animationRunning = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
    }

    createStars();
    animationRunning = true;
    animateStars();
});

// =============================
// 無花果
// =============================

fig.addEventListener("click", () => {

    document.body.classList.add("fig-mode");

    clearTimeout(figTimer);

    figTimer = setTimeout(() => {
        document.body.classList.remove("fig-mode");
    }, 3000);

});

// =============================
// 造花
// =============================

function runAwayFlowers() {

    flower1.classList.add("run-away");
    flower2.classList.add("run-away");

    setTimeout(() => {
        flower1.classList.remove("run-away");
        flower2.classList.remove("run-away");
    }, 2000);

}

flower1.addEventListener("click", runAwayFlowers);
flower2.addEventListener("click", runAwayFlowers);
