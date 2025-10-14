// Touch gesture detection for swipe actions

// Extract x and y coordinates from touch
const getTouchCoords = touch => ({ x: touch.clientX, y: touch.clientY });

// Determine swipe direction from distance
const getSwipeDirection = (distX, distY) => {
  const absX = Math.abs(distX);
  const absY = Math.abs(distY);
  if (absX > absY) return distX > 0 ? 'right' : 'left';
  if (absY > absX) return distY > 0 ? 'down' : 'up';
  return null;
};

// Calculate distance between two points
const calculateDistance = (start, end) => ({ x: end.x - start.x, y: end.y - start.y });

// Check if swipe meets minimum distance
const isValidSwipe = (distX, distY, min) => Math.abs(distX) > Math.abs(distY) && Math.abs(distX) > min;

// Process swipe gesture
const processSwipe = (start, end, min) => {
  const dist = calculateDistance(start, end);
  const valid = isValidSwipe(dist.x, dist.y, min);
  return { isValid: valid, direction: valid ? getSwipeDirection(dist.x, dist.y) : null };
};

// Create touch event handlers for swipe detection
export const createSwipeHandlers = (callbacks, min = 50) => {
  const state = { x: 0, y: 0 };

  return {
    handleStart: e => {
      const coords = getTouchCoords(e.touches[0]);
      state.x = coords.x;
      state.y = coords.y;
    },
    handleEnd: e => {
      const { isValid, direction } = processSwipe({ x: state.x, y: state.y }, getTouchCoords(e.changedTouches[0]), min);
      if (isValid && direction && callbacks[direction]) callbacks[direction]();
    },
  };
};
