export function GradientBackground(context, width, height, margin = 0) {
  // Off-white background
  context.fillStyle = "hsl(0, 0%, 98%)";
  context.fillRect(0, 0, width, height);

  // Gradient foreground
  const fill = context.createLinearGradient(0, 0, width, height);
  fill.addColorStop(0, "cyan");
  fill.addColorStop(1, "orange");

  // Fill rectangle
  context.fillStyle = fill;
  context.fillRect(margin, margin, width - margin * 2, height - margin * 2);
}
