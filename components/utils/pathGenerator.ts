/**
 * Path Generator Utility
 * Generates smooth patrol paths for spaceship animation
 */

export interface PathPoint {
  x: number;
  y: number;
}

/**
 * Generate a figure-8 (infinity loop) patrol path
 * @param screenWidth - Current screen width
 * @param screenHeight - Current screen height
 * @param padding - Padding from screen edges (default: 100px)
 * @returns Array of path points for animation
 */
export function generateFigure8Path(
  screenWidth: number,
  screenHeight: number,
  padding: number = 100
): PathPoint[] {
  const points: PathPoint[] = [];
  const centerX = screenWidth / 2;
  const centerY = screenHeight / 2;

  // Adjust radius based on screen size with padding
  const radiusX = (screenWidth - padding * 2) * 0.35;
  const radiusY = (screenHeight - padding * 2) * 0.3;

  // Generate points along figure-8 curve
  const numPoints = 100; // Smooth curve with 100 points
  for (let i = 0; i < numPoints; i++) {
    const t = (i / numPoints) * Math.PI * 2;

    // Lissajous curve (figure-8 pattern)
    const x = centerX + radiusX * Math.sin(t * 2);
    const y = centerY + radiusY * Math.sin(t);

    points.push({ x, y });
  }

  return points;
}

/**
 * Generate an infinity loop patrol path (alternative)
 */
export function generateInfinityPath(
  screenWidth: number,
  screenHeight: number,
  padding: number = 100
): PathPoint[] {
  const points: PathPoint[] = [];
  const centerX = screenWidth / 2;
  const centerY = screenHeight / 2;

  const radiusX = (screenWidth - padding * 2) * 0.4;
  const radiusY = (screenHeight - padding * 2) * 0.25;

  const numPoints = 100;
  for (let i = 0; i < numPoints; i++) {
    const t = (i / numPoints) * Math.PI * 2;

    // Parametric infinity curve
    const scale = 2 / (3 - Math.cos(2 * t));
    const x = centerX + radiusX * scale * Math.cos(t);
    const y = centerY + radiusY * scale * Math.sin(2 * t) / 2;

    points.push({ x, y });
  }

  return points;
}

/**
 * Calculate rotation angle to face direction of movement
 * @param currentPoint - Current position
 * @param nextPoint - Next position
 * @returns Rotation angle in degrees
 */
export function calculateRotation(currentPoint: PathPoint, nextPoint: PathPoint): number {
  const dx = nextPoint.x - currentPoint.x;
  const dy = nextPoint.y - currentPoint.y;

  // Calculate angle in degrees, +90 to make spaceship point upward by default
  const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;

  return angle;
}

/**
 * Generate array of rotation values for entire path
 */
export function generateRotationPath(points: PathPoint[]): number[] {
  const rotations: number[] = [];

  for (let i = 0; i < points.length; i++) {
    const current = points[i];
    const next = points[(i + 1) % points.length]; // Wrap around to first point

    rotations.push(calculateRotation(current, next));
  }

  return rotations;
}

/**
 * Get responsive padding based on screen size
 */
export function getResponsivePadding(screenWidth: number): number {
  if (screenWidth < 640) {
    return 60; // Mobile: smaller padding
  } else if (screenWidth < 1024) {
    return 80; // Tablet
  } else {
    return 100; // Desktop
  }
}
