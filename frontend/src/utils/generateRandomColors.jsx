function generateRandomColors(number) {
  const backgroundColor = [];
  const borderColor = [];

  // Helper function to generate a random hex color
  function randomHexColor() {
    return `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`;
  }

  // Generate `number` random colors
  for (let i = 0; i < number; i++) {
    const hexColor = randomHexColor();
    backgroundColor.push(hexToRgba(hexColor, 0.2)); // Add transparency to background colors
    borderColor.push(hexColor); // Solid color for border
  }

  return {
    backgroundColor,
    borderColor,
  };
}

// Helper function to convert hex color to rgba
function hexToRgba(hex, alpha = 1) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default generateRandomColors;
