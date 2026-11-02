import { voxelize } from './voxel'

// ─────────────────────────────────────────────────────────────────────────────
// FUNNY PALS — extra free characters. Same 64×80 pixel grid as the originals;
// voxelize() gives them the chunky 3D look.
// ─────────────────────────────────────────────────────────────────────────────

const Toast = () => (
  <svg viewBox="0 0 64 80" width="64" height="80" xmlns="http://www.w3.org/2000/svg">
    {/* Crust + bread */}
    <rect x="4"  y="6"  width="56" height="14" fill="#A0522D"/>
    <rect x="8"  y="10" width="48" height="52" fill="#A0522D"/>
    <rect x="8"  y="10" width="48" height="10" fill="#F5DEB3"/>
    <rect x="12" y="14" width="40" height="44" fill="#F5DEB3"/>
    {/* Butter pat */}
    <rect x="24" y="15" width="16" height="8"  fill="#FFF176"/>
    {/* Cool sunglasses */}
    <rect x="14" y="28" width="14" height="8"  fill="#111111"/>
    <rect x="36" y="28" width="14" height="8"  fill="#111111"/>
    <rect x="28" y="30" width="8"  height="3"  fill="#111111"/>
    <rect x="16" y="29" width="4"  height="2"  fill="#FFFFFF"/>
    <rect x="38" y="29" width="4"  height="2"  fill="#FFFFFF"/>
    {/* Cheeks + smirk */}
    <rect x="15" y="40" width="6"  height="4"  fill="#F48FB1"/>
    <rect x="43" y="40" width="6"  height="4"  fill="#F48FB1"/>
    <rect x="26" y="44" width="14" height="3"  fill="#6D4C41"/>
    <rect x="38" y="42" width="3"  height="3"  fill="#6D4C41"/>
    {/* Arms */}
    <rect x="0"  y="34" width="8"  height="4"  fill="#6D4C41"/>
    <rect x="56" y="30" width="8"  height="4"  fill="#6D4C41"/>
    {/* Legs + red sneakers */}
    <rect x="18" y="62" width="6"  height="12" fill="#6D4C41"/>
    <rect x="40" y="62" width="6"  height="12" fill="#6D4C41"/>
    <rect x="14" y="74" width="12" height="5"  fill="#E53935"/>
    <rect x="40" y="74" width="12" height="5"  fill="#E53935"/>
  </svg>
)

const RubberDuck = () => (
  <svg viewBox="0 0 64 80" width="64" height="80" xmlns="http://www.w3.org/2000/svg">
    {/* Shower cap */}
    <rect x="16" y="2"  width="34" height="8"  fill="#F48FB1"/>
    <rect x="22" y="4"  width="3"  height="3"  fill="#FFFFFF"/>
    <rect x="32" y="4"  width="3"  height="3"  fill="#FFFFFF"/>
    <rect x="42" y="4"  width="3"  height="3"  fill="#FFFFFF"/>
    {/* Head */}
    <rect x="18" y="10" width="30" height="24" fill="#FFEB3B"/>
    <rect x="34" y="15" width="7"  height="7"  fill="#111111"/>
    <rect x="35" y="16" width="2"  height="2"  fill="#FFFFFF"/>
    {/* Beak */}
    <rect x="46" y="20" width="16" height="7"  fill="#FF9800"/>
    <rect x="46" y="27" width="13" height="4"  fill="#F57C00"/>
    {/* Body, tail, wing */}
    <rect x="0"  y="30" width="10" height="10" fill="#FFEB3B"/>
    <rect x="4"  y="34" width="54" height="28" fill="#FFEB3B"/>
    <rect x="16" y="40" width="22" height="12" fill="#FBC02D"/>
    {/* Bath water + bubbles */}
    <rect x="0"  y="60" width="64" height="12" fill="#4FC3F7"/>
    <rect x="0"  y="60" width="64" height="3"  fill="#B3E5FC"/>
    <rect x="2"  y="52" width="7"  height="7"  fill="#E1F5FE"/>
    <rect x="54" y="50" width="9"  height="9"  fill="#E1F5FE"/>
    <rect x="58" y="44" width="5"  height="5"  fill="#E1F5FE"/>
  </svg>
)

const Sloth = () => (
  <svg viewBox="0 0 64 80" width="64" height="80" xmlns="http://www.w3.org/2000/svg">
    <text x="50" y="12" fontSize="10" fill="#90CAF9" fontFamily="monospace">z</text>
    <text x="57" y="4"  fontSize="7"  fill="#90CAF9" fontFamily="monospace">z</text>
    {/* Head + face mask */}
    <rect x="10" y="10" width="44" height="30" fill="#8D6E63"/>
    <rect x="16" y="16" width="32" height="22" fill="#D7CCC8"/>
    {/* Sleepy eye patches with closed eyes */}
    <rect x="18" y="20" width="11" height="8"  fill="#4E342E"/>
    <rect x="35" y="20" width="11" height="8"  fill="#4E342E"/>
    <rect x="20" y="24" width="7"  height="2"  fill="#D7CCC8"/>
    <rect x="37" y="24" width="7"  height="2"  fill="#D7CCC8"/>
    {/* Nose + lazy smile */}
    <rect x="29" y="28" width="6"  height="4"  fill="#3E2723"/>
    <rect x="26" y="34" width="12" height="2"  fill="#3E2723"/>
    {/* Body + belly */}
    <rect x="10" y="40" width="44" height="26" fill="#8D6E63"/>
    <rect x="20" y="44" width="24" height="18" fill="#A1887F"/>
    {/* Long dangly arms with claws */}
    <rect x="2"  y="38" width="10" height="24" fill="#8D6E63"/>
    <rect x="52" y="38" width="10" height="24" fill="#8D6E63"/>
    <rect x="2"  y="62" width="3"  height="4"  fill="#EEEEEE"/>
    <rect x="7"  y="62" width="3"  height="4"  fill="#EEEEEE"/>
    <rect x="54" y="62" width="3"  height="4"  fill="#EEEEEE"/>
    <rect x="59" y="62" width="3"  height="4"  fill="#EEEEEE"/>
    {/* Legs + slippers */}
    <rect x="14" y="66" width="12" height="8"  fill="#6D4C41"/>
    <rect x="38" y="66" width="12" height="8"  fill="#6D4C41"/>
    <rect x="12" y="74" width="16" height="5"  fill="#CE93D8"/>
    <rect x="36" y="74" width="16" height="5"  fill="#CE93D8"/>
  </svg>
)

const Taco = () => (
  <svg viewBox="0 0 64 80" width="64" height="80" xmlns="http://www.w3.org/2000/svg">
    {/* Fillings */}
    <rect x="6"  y="18" width="52" height="10" fill="#7CB342"/>
    <rect x="10" y="14" width="8"  height="6"  fill="#7CB342"/>
    <rect x="30" y="12" width="8"  height="8"  fill="#7CB342"/>
    <rect x="12" y="16" width="8"  height="6"  fill="#E53935"/>
    <rect x="42" y="14" width="9"  height="7"  fill="#E53935"/>
    <rect x="22" y="18" width="14" height="5"  fill="#FFEB3B"/>
    {/* Shell */}
    <rect x="4"  y="26" width="56" height="30" fill="#F9A825"/>
    <rect x="10" y="56" width="44" height="6"  fill="#F9A825"/>
    <rect x="10" y="50" width="4"  height="4"  fill="#E65100"/>
    <rect x="50" y="30" width="4"  height="4"  fill="#E65100"/>
    <rect x="46" y="52" width="4"  height="4"  fill="#E65100"/>
    {/* Googly eyes */}
    <rect x="16" y="30" width="10" height="10" fill="#FFFFFF"/>
    <rect x="20" y="33" width="5"  height="5"  fill="#111111"/>
    <rect x="38" y="30" width="10" height="10" fill="#FFFFFF"/>
    <rect x="39" y="33" width="5"  height="5"  fill="#111111"/>
    {/* Big mustache */}
    <rect x="22" y="43" width="20" height="4"  fill="#3E2723"/>
    <rect x="17" y="45" width="7"  height="5"  fill="#3E2723"/>
    <rect x="40" y="45" width="7"  height="5"  fill="#3E2723"/>
    {/* Legs + boots */}
    <rect x="18" y="62" width="5"  height="12" fill="#5D4037"/>
    <rect x="41" y="62" width="5"  height="12" fill="#5D4037"/>
    <rect x="14" y="74" width="11" height="5"  fill="#212121"/>
    <rect x="39" y="74" width="11" height="5"  fill="#212121"/>
  </svg>
)

const Alien = () => (
  <svg viewBox="0 0 64 80" width="64" height="80" xmlns="http://www.w3.org/2000/svg">
    {/* Antennae */}
    <rect x="20" y="3"  width="3"  height="9"  fill="#9CCC65"/>
    <rect x="41" y="3"  width="3"  height="9"  fill="#9CCC65"/>
    <rect x="18" y="0"  width="7"  height="5"  fill="#F06292"/>
    <rect x="39" y="0"  width="7"  height="5"  fill="#F06292"/>
    {/* Head with three eyes */}
    <rect x="8"  y="10" width="48" height="30" fill="#8BC34A"/>
    <rect x="12" y="17" width="11" height="11" fill="#111111"/>
    <rect x="14" y="19" width="3"  height="3"  fill="#FFFFFF"/>
    <rect x="27" y="14" width="11" height="11" fill="#111111"/>
    <rect x="29" y="16" width="3"  height="3"  fill="#FFFFFF"/>
    <rect x="42" y="17" width="11" height="11" fill="#111111"/>
    <rect x="44" y="19" width="3"  height="3"  fill="#FFFFFF"/>
    {/* Silly grin */}
    <rect x="22" y="31" width="20" height="4"  fill="#33691E"/>
    <rect x="34" y="35" width="5"  height="3"  fill="#F06292"/>
    {/* Space suit */}
    <rect x="14" y="40" width="36" height="24" fill="#B0BEC5"/>
    <rect x="14" y="52" width="36" height="4"  fill="#FFD600"/>
    <rect x="28" y="44" width="8"  height="6"  fill="#E53935"/>
    {/* Arms (one waving) */}
    <rect x="6"  y="40" width="8"  height="18" fill="#8BC34A"/>
    <rect x="50" y="30" width="8"  height="16" fill="#8BC34A"/>
    {/* Legs */}
    <rect x="18" y="64" width="10" height="14" fill="#8BC34A"/>
    <rect x="36" y="64" width="10" height="14" fill="#8BC34A"/>
  </svg>
)

const Coffee = () => (
  <svg viewBox="0 0 64 80" width="64" height="80" xmlns="http://www.w3.org/2000/svg">
    {/* Steam */}
    <rect x="22" y="0"  width="4"  height="8"  fill="#ECEFF1"/>
    <rect x="30" y="3"  width="4"  height="6"  fill="#ECEFF1"/>
    <rect x="38" y="0"  width="4"  height="8"  fill="#ECEFF1"/>
    {/* Lid */}
    <rect x="10" y="12" width="44" height="6"  fill="#FFFFFF"/>
    <rect x="6"  y="18" width="52" height="4"  fill="#E0E0E0"/>
    {/* Cup + sleeve */}
    <rect x="10" y="22" width="44" height="40" fill="#FAFAFA"/>
    <rect x="10" y="34" width="44" height="16" fill="#8D6E63"/>
    {/* Exhausted eyes with bags */}
    <rect x="16" y="37" width="11" height="7"  fill="#FFFFFF"/>
    <rect x="20" y="40" width="4"  height="4"  fill="#111111"/>
    <rect x="16" y="37" width="11" height="3"  fill="#D7CCC8"/>
    <rect x="16" y="45" width="11" height="2"  fill="#4E342E"/>
    <rect x="37" y="37" width="11" height="7"  fill="#FFFFFF"/>
    <rect x="40" y="40" width="4"  height="4"  fill="#111111"/>
    <rect x="37" y="37" width="11" height="3"  fill="#D7CCC8"/>
    <rect x="37" y="45" width="11" height="2"  fill="#4E342E"/>
    {/* Wobbly mouth */}
    <rect x="25" y="54" width="5"  height="3"  fill="#424242"/>
    <rect x="30" y="56" width="5"  height="3"  fill="#424242"/>
    <rect x="35" y="54" width="5"  height="3"  fill="#424242"/>
    {/* Legs + sneakers */}
    <rect x="18" y="62" width="6"  height="11" fill="#424242"/>
    <rect x="40" y="62" width="6"  height="11" fill="#424242"/>
    <rect x="14" y="73" width="12" height="5"  fill="#29B6F6"/>
    <rect x="38" y="73" width="12" height="5"  fill="#29B6F6"/>
  </svg>
)

const Banana = () => (
  <svg viewBox="0 0 64 80" width="64" height="80" xmlns="http://www.w3.org/2000/svg">
    {/* Stem */}
    <rect x="30" y="0"  width="6"  height="8"  fill="#5D4037"/>
    {/* Curvy body */}
    <rect x="26" y="6"  width="14" height="8"  fill="#FFEB3B"/>
    <rect x="22" y="12" width="22" height="50" fill="#FFEB3B"/>
    <rect x="26" y="60" width="18" height="8"  fill="#FFEB3B"/>
    <rect x="38" y="14" width="6"  height="46" fill="#FBC02D"/>
    <rect x="24" y="48" width="4"  height="4"  fill="#8D6E63"/>
    <rect x="34" y="66" width="8"  height="4"  fill="#5D4037"/>
    {/* Googly eyes */}
    <rect x="23" y="22" width="9"  height="9"  fill="#FFFFFF"/>
    <rect x="27" y="25" width="4"  height="4"  fill="#111111"/>
    <rect x="34" y="20" width="9"  height="9"  fill="#FFFFFF"/>
    <rect x="35" y="22" width="4"  height="4"  fill="#111111"/>
    {/* Open grin */}
    <rect x="27" y="35" width="12" height="5"  fill="#5D4037"/>
    <rect x="29" y="38" width="8"  height="2"  fill="#E57373"/>
    {/* Waving arms */}
    <rect x="12" y="34" width="10" height="4"  fill="#5D4037"/>
    <rect x="10" y="24" width="4"  height="12" fill="#5D4037"/>
    <rect x="44" y="36" width="10" height="4"  fill="#5D4037"/>
    {/* Legs + shoes */}
    <rect x="26" y="68" width="4"  height="7"  fill="#5D4037"/>
    <rect x="38" y="68" width="4"  height="7"  fill="#5D4037"/>
    <rect x="21" y="74" width="10" height="5"  fill="#E53935"/>
    <rect x="37" y="74" width="10" height="5"  fill="#E53935"/>
  </svg>
)

const Pug = () => (
  <svg viewBox="0 0 64 80" width="64" height="80" xmlns="http://www.w3.org/2000/svg">
    {/* Floppy ears */}
    <rect x="6"  y="12" width="12" height="12" fill="#3E2723"/>
    <rect x="46" y="12" width="12" height="12" fill="#3E2723"/>
    {/* Head + wrinkles */}
    <rect x="10" y="14" width="44" height="30" fill="#D7B98E"/>
    <rect x="24" y="18" width="16" height="2"  fill="#A1887F"/>
    <rect x="26" y="22" width="12" height="2"  fill="#A1887F"/>
    {/* Black mask */}
    <rect x="18" y="28" width="28" height="16" fill="#3E2723"/>
    {/* Bulgy eyes */}
    <rect x="12" y="25" width="11" height="11" fill="#111111"/>
    <rect x="14" y="27" width="4"  height="4"  fill="#FFFFFF"/>
    <rect x="41" y="25" width="11" height="11" fill="#111111"/>
    <rect x="43" y="27" width="4"  height="4"  fill="#FFFFFF"/>
    {/* Nose + derpy tongue */}
    <rect x="28" y="30" width="8"  height="4"  fill="#111111"/>
    <rect x="31" y="40" width="6"  height="8"  fill="#F06292"/>
    {/* Body, collar, tag */}
    <rect x="10" y="44" width="44" height="22" fill="#D7B98E"/>
    <rect x="10" y="44" width="44" height="4"  fill="#E53935"/>
    <rect x="29" y="48" width="6"  height="5"  fill="#FFD600"/>
    {/* Curly tail */}
    <rect x="54" y="46" width="8"  height="6"  fill="#D7B98E"/>
    <rect x="58" y="42" width="4"  height="6"  fill="#D7B98E"/>
    {/* Legs */}
    <rect x="14" y="66" width="10" height="12" fill="#D7B98E"/>
    <rect x="40" y="66" width="10" height="12" fill="#D7B98E"/>
    <rect x="14" y="75" width="10" height="3"  fill="#3E2723"/>
    <rect x="40" y="75" width="10" height="3"  fill="#3E2723"/>
  </svg>
)

const Llama = () => (
  <svg viewBox="0 0 64 80" width="64" height="80" xmlns="http://www.w3.org/2000/svg">
    {/* Ears + fancy hair tuft */}
    <rect x="18" y="0"  width="5"  height="10" fill="#F5F5F5"/>
    <rect x="36" y="0"  width="5"  height="10" fill="#F5F5F5"/>
    <rect x="22" y="4"  width="14" height="7"  fill="#FFFFFF"/>
    {/* Head + snout */}
    <rect x="18" y="10" width="24" height="18" fill="#F5F5F5"/>
    <rect x="24" y="20" width="22" height="10" fill="#EFEBE9"/>
    <rect x="40" y="22" width="4"  height="3"  fill="#4E342E"/>
    {/* Dramatic eyelashes */}
    <rect x="21" y="14" width="5"  height="5"  fill="#111111"/>
    <rect x="32" y="14" width="5"  height="5"  fill="#111111"/>
    <rect x="20" y="12" width="7"  height="2"  fill="#111111"/>
    <rect x="31" y="12" width="7"  height="2"  fill="#111111"/>
    <rect x="30" y="27" width="10" height="2"  fill="#6D4C41"/>
    {/* Long neck */}
    <rect x="20" y="28" width="16" height="14" fill="#F5F5F5"/>
    {/* Body + party blanket */}
    <rect x="6"  y="40" width="52" height="22" fill="#F5F5F5"/>
    <rect x="14" y="40" width="34" height="13" fill="#E91E63"/>
    <rect x="14" y="44" width="34" height="2"  fill="#FFEB3B"/>
    <rect x="14" y="49" width="34" height="2"  fill="#00BCD4"/>
    {/* Tail */}
    <rect x="0"  y="40" width="8"  height="7"  fill="#F5F5F5"/>
    {/* Four legs + hooves */}
    <rect x="8"  y="62" width="7"  height="13" fill="#F5F5F5"/>
    <rect x="20" y="62" width="7"  height="13" fill="#F5F5F5"/>
    <rect x="38" y="62" width="7"  height="13" fill="#F5F5F5"/>
    <rect x="50" y="62" width="7"  height="13" fill="#F5F5F5"/>
    <rect x="8"  y="75" width="7"  height="3"  fill="#5D4037"/>
    <rect x="20" y="75" width="7"  height="3"  fill="#5D4037"/>
    <rect x="38" y="75" width="7"  height="3"  fill="#5D4037"/>
    <rect x="50" y="75" width="7"  height="3"  fill="#5D4037"/>
  </svg>
)

const Ghost = () => (
  <svg viewBox="0 0 64 80" width="64" height="80" xmlns="http://www.w3.org/2000/svg">
    {/* Party hat */}
    <polygon points="22,12 42,12 32,0" fill="#AB47BC"/>
    <rect x="26" y="7"  width="3"  height="3"  fill="#FFEB3B"/>
    <rect x="34" y="4"  width="3"  height="3"  fill="#4DD0E1"/>
    {/* Sheet body */}
    <rect x="14" y="10" width="36" height="6"  fill="#FAFAFA"/>
    <rect x="10" y="14" width="44" height="50" fill="#FAFAFA"/>
    {/* Wavy hem */}
    <rect x="10" y="64" width="9"  height="10" fill="#FAFAFA"/>
    <rect x="27" y="64" width="10" height="10" fill="#FAFAFA"/>
    <rect x="45" y="64" width="9"  height="10" fill="#FAFAFA"/>
    {/* Eyes, blush, surprised mouth */}
    <rect x="20" y="24" width="8"  height="12" fill="#111111"/>
    <rect x="22" y="26" width="3"  height="3"  fill="#FFFFFF"/>
    <rect x="36" y="24" width="8"  height="12" fill="#111111"/>
    <rect x="38" y="26" width="3"  height="3"  fill="#FFFFFF"/>
    <rect x="13" y="38" width="7"  height="4"  fill="#F8BBD0"/>
    <rect x="44" y="38" width="7"  height="4"  fill="#F8BBD0"/>
    <rect x="28" y="40" width="8"  height="9"  fill="#111111"/>
    <rect x="30" y="44" width="4"  height="4"  fill="#E57373"/>
    {/* Spooky arms */}
    <rect x="2"  y="36" width="9"  height="8"  fill="#FAFAFA"/>
    <rect x="53" y="28" width="9"  height="8"  fill="#FAFAFA"/>
  </svg>
)

export const FUNNY_AVATARS = [
  { id: 'toast',   name: 'Sir Toasty',  SVG: voxelize(Toast)      },
  { id: 'duck',    name: 'Quackers',    SVG: voxelize(RubberDuck) },
  { id: 'sloth',   name: 'Snooze',      SVG: voxelize(Sloth)      },
  { id: 'taco',    name: 'Crunch',      SVG: voxelize(Taco)       },
  { id: 'alien',   name: 'Zorp',        SVG: voxelize(Alien)      },
  { id: 'coffee',  name: 'Decaf Dave',  SVG: voxelize(Coffee)     },
  { id: 'banana',  name: 'Peely',       SVG: voxelize(Banana)     },
  { id: 'pug',     name: 'Frank',       SVG: voxelize(Pug)        },
  { id: 'llama',   name: 'Drama Llama', SVG: voxelize(Llama)      },
  { id: 'ghost',   name: 'Boo',         SVG: voxelize(Ghost)      },
]
