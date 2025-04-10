let p5;

let x = 300;
let y = 300;
let angle = 90;
let dia = 20;

export function main(_p5) {
  p5 = _p5;

  p5.setup = _ => {
    var canvas = p5.createCanvas(900, 900);
    canvas.parent("p5Canvas");
  };

  p5.mousePressed = () => {
    if (
      p5.mouseX > 0 &&
      p5.mouseX < p5.width &&
      p5.mouseY > 0 &&
      p5.mouseY < p5.height
    ) {
      let fs = p5.fullscreen();
      p5.fullscreen(!fs);
    }
  };

  p5.draw = _ => {
    p5.background("#131313");

    p5.translate(p5.width / 2, p5.height / 2);
    p5.rotate(p5.radians(14.3 + angle / 3));
    for (let a = 0; a < 360; a += 10) {
      p5.push();

      if (angle < 720) {
        p5.rotate(p5.radians(a) * p5.cos(p5.radians(angle)));
      } else {
        p5.rotate(p5.radians(a));
      }
      p5.stroke(255);
      p5.strokeWeight(3);

      p5.line(x * p5.sin(p5.radians(angle)), 0, 0, y - dia / 2);

      p5.noStroke();
      p5.fill(255);
      p5.ellipse(x * p5.sin(p5.radians(angle)), 0, dia / 2, dia / 2);

      p5.stroke(255);
      p5.noFill();
      p5.ellipse(0, y, dia, dia);
      p5.pop();
    }
    angle++;
  };
}
