export function DrawCircle(context, x, y, radius) {
  // begin path, draw circle like above comments
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fillStyle = "goldenrod";
  context.fill();
  context.lineWidth = 30;
  context.strokeStyle = "yellow";
  context.stroke();
}
