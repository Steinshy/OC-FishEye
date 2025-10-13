const getTouchCoordinates = touch => ({
  x: touch.clientX,
  y: touch.clientY,
});

const getSwipeDirection = (distanceX, distanceY) => {
  const absX = Math.abs(distanceX);
  const absY = Math.abs(distanceY);

  if (absX > absY) {
    return distanceX > 0 ? 'right' : 'left';
  }

  if (absY > absX) {
    return distanceY > 0 ? 'down' : 'up';
  }

  return null;
};

const calculateSwipeDistance = (startCoords, endCoords) => ({
  x: endCoords.x - startCoords.x,
  y: endCoords.y - startCoords.y,
});

const isValidSwipe = (distanceX, distanceY, minDistance) => {
  return Math.abs(distanceX) > Math.abs(distanceY) && Math.abs(distanceX) > minDistance;
};

const processSwipe = (startCoords, endCoords, minDistance) => {
  const distance = calculateSwipeDistance(startCoords, endCoords);
  const isValid = isValidSwipe(distance.x, distance.y, minDistance);
  const direction = isValid ? getSwipeDirection(distance.x, distance.y) : null;

  return { isValid, direction, distance };
};

export const createSwipeHandlers = (callbacks, minDistance = 50) => {
  const touchState = { startX: 0, startY: 0 };

  return {
    handleStart: e => {
      const coords = getTouchCoordinates(e.touches[0]);
      touchState.startX = coords.x;
      touchState.startY = coords.y;
    },
    handleEnd: e => {
      const startCoords = { x: touchState.startX, y: touchState.startY };
      const endCoords = getTouchCoordinates(e.changedTouches[0]);
      const { isValid, direction } = processSwipe(startCoords, endCoords, minDistance);

      if (isValid && direction && callbacks[direction]) {
        callbacks[direction]();
      }
    },
  };
};
