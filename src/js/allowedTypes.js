import Bowman from './characters/Bowman';
import Magician from './characters/Magician';
import Swordsman from './characters/Swordsman';
import Daemon from './characters/Daemon';
import Undead from './characters/Undead';
import Vampire from './characters/Vampire';

const allowedTypes = {
  good: [Bowman, Magician, Swordsman],
  evil: [Daemon, Undead, Vampire],
};

export default allowedTypes;
