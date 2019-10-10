window.onload = function() {
  const canvas        = document.createElement("CANVAS");
  const context       = canvas.getContext("2d");
  const particles     = [];
  const NUM_PARTICLES = 5000;
  const GRAVITY       = 0;
  const MIN_X_VEL     = -0.5;
  const MAX_X_VEL     = 0.5;
  const MIN_Y_VEL     = -0.1;
  const MAX_Y_VEL     = -1;
  const MIN_SIZE      = 7;
  const MAX_SIZE      = 5;
  const originPoint   = { x: 200, y: 300 };
  const colors        = ["#333333", "orange", "red", "#4466FF", "teal"];
  let isMouseDown     = false;

  document.body.appendChild(canvas);

  canvas.width  = 800;
  canvas.height = 800;

  document.body.style.background = "#111111";

  canvas.style.background = "#111111";
  canvas.style.border = "solid 4px white"
  canvas.style.display = "block";
  canvas.style.margin = "0 auto";
  canvas.style.marginTop = `${((window.innerHeight / 2) - (canvas.height / 2))}px`;

  const random = (min, max) => Math.random() * (max - min) + min;

  for (let i = 0; i < NUM_PARTICLES; i ++) {
    const _size = random(MIN_SIZE, MAX_SIZE);

    particles.push({
      x: 200,
      y: 300,
      origin: { x: originPoint.x, y: originPoint.y},
      size: _size,
      color: colors[ Math.round( random(0, colors.length) ) ],
      speed: random(.1, 5),
      traveled: 0,
      alpha: 1,
      alphaFactor: random(0.0001, 0.01),
      vel: { x: random(MIN_X_VEL, MAX_X_VEL), y: random(MIN_Y_VEL, MAX_Y_VEL) }
    })
  }

  const update = function() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i ++) {
      const p = particles[i];

      p.alpha -= p.alphaFactor;
      p.x += p.vel.x * p.speed;
      p.y += p.vel.y * p.speed;
      p.vel.y += GRAVITY;

      if (p.alpha < 0.2 || p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
        p.alpha = 1;
        p.alphaFactor = random(0.0001, 0.01);
        p.x = originPoint.x;
        p.y = originPoint.y;
        p.vel.y = random(MIN_Y_VEL, MAX_Y_VEL) ;
      }

      // draw
      context.globalAlpha = p.alpha;
      context.fillStyle = p.color;
      context.fillRect(p.x, p.y, p.size, p.size);
    }
  };

  const tick = function() {
    update();requestAnimationFrame(tick);
  };

  canvas.onmousedown = function({ offsetX, offsetY }) {
    isMouseDown = true;

    originPoint.x = offsetX;
    originPoint.y = offsetY;
  };

  canvas.onmouseup = function({ offsetX, offsetY }) {
    isMouseDown = false;

    originPoint.x = offsetX;
    originPoint.y = offsetY;
  };

  canvas.onmousemove = function({ offsetX, offsetY }) {
    if (isMouseDown) {
      originPoint.x = offsetX;
      originPoint.y = offsetY;
    }
  }

  tick();
}
