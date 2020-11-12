export function calcTileType(index, boardSize) {
  // TODO: write logic here
  if (index === 0) return 'top-left';
  if (index === boardSize - 1) return 'top-right';
  if (index === boardSize ** 2 - boardSize) return 'bottom-left';
  if (index === boardSize ** 2 - 1) return 'bottom-right';
  if (index > 0 && index < boardSize - 1) return 'top';
  if (index % boardSize === 0) return 'left';
  if (index % boardSize === boardSize - 1) return 'right';
  if (index < boardSize ** 2 - 1 && index > boardSize ** 2 - boardSize) return 'bottom';
  return 'center';
}

export function calcAvailableMoves(character) {
  const availableMoves = [];

  const up = [];
  const down = [];
  const left = [];
  const right = [];
  const leftUp = [];
  const leftDown = [];
  const rightUp = [];
  const rightDown = [];

  for (let i = 1; i <= character.character.move; i += 1) {
    up.push(character.position - 8 * i);
    down.push(character.position + 8 * i);
    left.push(character.position - 1 * i);
    right.push(character.position + 1 * i);
    leftUp.push(character.position - 9 * i);
    leftDown.push(character.position + 7 * i);
    rightUp.push(character.position - 7 * i);
    rightDown.push(character.position + 9 * i);
  }

  availableMoves.push(...up, ...down);
  const directionsToEdit = [left, right, leftUp, leftDown, rightUp, rightDown];

  for (const direction of directionsToEdit) {
    // eslint-disable-next-line max-len
    const indexToRemoveFrom = direction.findIndex((position) => position % 8 === 0 || position % 8 === 7);
    if (indexToRemoveFrom > -1) {
      if (character.position % 8 === 0 || character.position % 8 === 7) {
        direction.splice(indexToRemoveFrom);
      } else {
        direction.splice(indexToRemoveFrom + 1);
      }
    }
    availableMoves.push(...direction);
  }

  return availableMoves;
}

export function calcAttackRange(character) {
  const attackRange = [];
  const range = character.character.attackRange;
  const { position } = character;

  const horizontalRange = [];
  for (let i = position - range; i <= position + range; i += 1) {
    horizontalRange.push(i);
  }

  // eslint-disable-next-line max-len
  for (let i = horizontalRange.indexOf(position), k = i; (i >= 0, k < horizontalRange.length); i -= 1, k += 1) {
    if (horizontalRange[i] % 8 === 0) {
      horizontalRange.splice(0, i);
      break;
    }
    if (horizontalRange[k] % 8 === 7) {
      horizontalRange.splice(k + 1, horizontalRange.length);
      break;
    }
  }

  for (const attackPosition of horizontalRange) {
    for (let i = attackPosition - 8 * range; i <= attackPosition + 8 * range; i += 8) {
      attackRange.push(i);
    }
  }

  attackRange.splice(attackRange.indexOf(position), 1);

  return attackRange;
}

export function calcHealthLevel(health) {
  if (health < 15) {
    return 'critical';
  }

  if (health < 50) {
    return 'normal';
  }

  return 'high';
}

export function randomNumber(max, min = 0) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}
