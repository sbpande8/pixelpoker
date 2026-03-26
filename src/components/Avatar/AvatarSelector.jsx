import { useState } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// VOXEL BLOCK HELPER
// Each "block" = front face (rect) + top face (polygon) for 3D flat-shaded look
// ─────────────────────────────────────────────────────────────────────────────
// All SVGs: viewBox="0 0 64 80" width="64" height="80"

// ── FREE AVATARS ──────────────────────────────────────────────────────────────

const Chicken = () => (
  <svg viewBox="0 0 64 80" width="64" height="80" xmlns="http://www.w3.org/2000/svg">
    {/* Comb – 3 red bumps */}
    <rect x="16" y="2"  width="8"  height="10" fill="#FF4136"/>
    <rect x="28" y="0"  width="8"  height="12" fill="#FF4136"/>
    <rect x="40" y="2"  width="8"  height="10" fill="#FF4136"/>
    {/* Head top face */}
    <polygon points="10,12 54,12 58,8 14,8" fill="#FFF9C4"/>
    {/* Head front */}
    <rect x="10" y="12" width="44" height="28" fill="#FFFDE7"/>
    {/* Eyes */}
    <rect x="16" y="18" width="10" height="10" fill="#1A1A1A"/>
    <rect x="18" y="20" width="3"  height="3"  fill="#FFFFFF"/>
    <rect x="38" y="18" width="10" height="10" fill="#1A1A1A"/>
    <rect x="40" y="20" width="3"  height="3"  fill="#FFFFFF"/>
    {/* Beak */}
    <rect x="24" y="30" width="16" height="8"  fill="#FF8C00"/>
    <polygon points="24,38 40,38 32,44" fill="#E65C00"/>
    {/* Wattle */}
    <rect x="28" y="38" width="8"  height="8"  fill="#FF4136"/>
    {/* Body top face */}
    <polygon points="8,40 56,40 60,36 12,36" fill="#FFF9C4"/>
    {/* Body front */}
    <rect x="8"  y="40" width="48" height="24" fill="#FFFDE7"/>
    {/* Wing left */}
    <rect x="0"  y="42" width="10" height="18" fill="#F5EEC8"/>
    {/* Wing right */}
    <rect x="54" y="42" width="10" height="18" fill="#F5EEC8"/>
    {/* Feet */}
    <rect x="14" y="64" width="8"  height="10" fill="#FF8C00"/>
    <rect x="6"  y="70" width="18" height="5"  fill="#FF8C00"/>
    <rect x="42" y="64" width="8"  height="10" fill="#FF8C00"/>
    <rect x="40" y="70" width="18" height="5"  fill="#FF8C00"/>
  </svg>
)

const Cow = () => (
  <svg viewBox="0 0 64 80" width="64" height="80" xmlns="http://www.w3.org/2000/svg">
    {/* Horns */}
    <rect x="12" y="2"  width="8"  height="14" fill="#C8963E"/>
    <rect x="44" y="2"  width="8"  height="14" fill="#C8963E"/>
    {/* Head top face */}
    <polygon points="10,14 54,14 58,10 14,10" fill="#F5F5F5"/>
    {/* Head */}
    <rect x="10" y="14" width="44" height="28" fill="#FFFFFF"/>
    {/* Black patch */}
    <rect x="10" y="14" width="18" height="16" fill="#1A1A1A"/>
    <rect x="40" y="22" width="14" height="12" fill="#1A1A1A"/>
    {/* Eyes */}
    <rect x="14" y="16" width="8"  height="8"  fill="#FFFFFF"/>
    <rect x="16" y="18" width="4"  height="4"  fill="#1A1A1A"/>
    <rect x="42" y="24" width="8"  height="8"  fill="#FFFFFF"/>
    <rect x="44" y="26" width="4"  height="4"  fill="#1A1A1A"/>
    {/* Snout */}
    <rect x="18" y="32" width="28" height="14" fill="#FFB3BA"/>
    <rect x="22" y="35" width="7"  height="7"  fill="#E07B88"/>
    <rect x="35" y="35" width="7"  height="7"  fill="#E07B88"/>
    {/* Body top face */}
    <polygon points="8,42 56,42 60,38 12,38" fill="#F5F5F5"/>
    {/* Body */}
    <rect x="8"  y="42" width="48" height="24" fill="#FFFFFF"/>
    {/* Body spot */}
    <rect x="14" y="46" width="16" height="14" fill="#1A1A1A"/>
    <rect x="42" y="50" width="12" height="12" fill="#1A1A1A"/>
    {/* Bell */}
    <rect x="26" y="62" width="12" height="10" fill="#FDD835"/>
    <rect x="30" y="68" width="4"  height="4"  fill="#795548"/>
    {/* Legs */}
    <rect x="12" y="66" width="12" height="12" fill="#EEEEEE"/>
    <rect x="40" y="66" width="12" height="12" fill="#EEEEEE"/>
  </svg>
)

const Kangaroo = () => (
  <svg viewBox="0 0 64 80" width="64" height="80" xmlns="http://www.w3.org/2000/svg">
    {/* Ears */}
    <rect x="10" y="0"  width="10" height="18" fill="#C8763B"/>
    <rect x="12" y="2"  width="6"  height="14" fill="#FFB3BA"/>
    <rect x="44" y="0"  width="10" height="18" fill="#C8763B"/>
    <rect x="46" y="2"  width="6"  height="14" fill="#FFB3BA"/>
    {/* Head top */}
    <polygon points="14,18 50,18 54,14 18,14" fill="#E8A050"/>
    {/* Head */}
    <rect x="14" y="18" width="36" height="26" fill="#C8763B"/>
    {/* Snout protrusion */}
    <rect x="20" y="32" width="24" height="14" fill="#A85A20"/>
    {/* Eyes */}
    <rect x="18" y="22" width="10" height="10" fill="#FFFFFF"/>
    <rect x="20" y="24" width="6"  height="6"  fill="#1A1A1A"/>
    <rect x="22" y="25" width="2"  height="2"  fill="#FFFFFF"/>
    <rect x="36" y="22" width="10" height="10" fill="#FFFFFF"/>
    <rect x="38" y="24" width="6"  height="6"  fill="#1A1A1A"/>
    <rect x="40" y="25" width="2"  height="2"  fill="#FFFFFF"/>
    {/* Nose */}
    <rect x="28" y="32" width="8"  height="6"  fill="#7B3A10"/>
    {/* Body top */}
    <polygon points="10,44 54,44 58,40 14,40" fill="#E8A050"/>
    {/* Body */}
    <rect x="10" y="44" width="44" height="24" fill="#C8763B"/>
    {/* Pouch */}
    <rect x="20" y="50" width="22" height="16" fill="#A85A20"/>
    {/* Joey head */}
    <rect x="25" y="50" width="12" height="10" fill="#E8C070"/>
    <rect x="27" y="52" width="3"  height="3"  fill="#1A1A1A"/>
    <rect x="34" y="52" width="3"  height="3"  fill="#1A1A1A"/>
    {/* Tail */}
    <rect x="52" y="54" width="10" height="22" fill="#A85A20"/>
    <rect x="56" y="70" width="8"  height="10" fill="#8B4510"/>
    {/* Legs */}
    <rect x="14" y="66" width="14" height="14" fill="#A85A20"/>
    <rect x="36" y="66" width="14" height="14" fill="#A85A20"/>
  </svg>
)

const OldMan = () => (
  <svg viewBox="0 0 64 80" width="64" height="80" xmlns="http://www.w3.org/2000/svg">
    {/* White hair sides */}
    <rect x="8"  y="8"  width="10" height="16" fill="#E0E0E0"/>
    <rect x="46" y="8"  width="10" height="16" fill="#E0E0E0"/>
    <rect x="10" y="4"  width="44" height="12" fill="#E0E0E0"/>
    {/* Head top */}
    <polygon points="14,16 50,16 54,12 18,12" fill="#FFE0B2"/>
    {/* Head */}
    <rect x="14" y="16" width="36" height="24" fill="#FFCC80"/>
    {/* Glasses frames */}
    <rect x="14" y="22" width="13" height="10" fill="#37474F"/>
    <rect x="37" y="22" width="13" height="10" fill="#37474F"/>
    <rect x="27" y="25" width="10" height="4"  fill="#37474F"/>
    {/* Eyes behind glass */}
    <rect x="16" y="24" width="9"  height="6"  fill="#B3E5FC"/>
    <rect x="19" y="25" width="3"  height="4"  fill="#1A1A1A"/>
    <rect x="39" y="24" width="9"  height="6"  fill="#B3E5FC"/>
    <rect x="42" y="25" width="3"  height="4"  fill="#1A1A1A"/>
    {/* Moustache */}
    <rect x="22" y="34" width="20" height="5"  fill="#D0D0D0"/>
    {/* Suit top */}
    <polygon points="10,40 54,40 58,36 14,36" fill="#607D8B"/>
    {/* Suit body */}
    <rect x="10" y="40" width="44" height="28" fill="#546E7A"/>
    {/* Lapels */}
    <polygon points="22,40 32,52 10,40" fill="#455A64"/>
    <polygon points="42,40 32,52 54,40" fill="#455A64"/>
    {/* Shirt */}
    <rect x="28" y="40" width="8"  height="14" fill="#FFFFFF"/>
    {/* Tie */}
    <polygon points="30,40 34,40 33,56 31,56" fill="#D32F2F"/>
    {/* Buttons */}
    <rect x="30" y="58" width="4"  height="4"  fill="#37474F"/>
    <rect x="30" y="64" width="4"  height="4"  fill="#37474F"/>
    {/* Cane */}
    <rect x="56" y="36" width="4"  height="36" fill="#795548"/>
    <rect x="52" y="34" width="12" height="4"  fill="#795548"/>
    {/* Shoes */}
    <rect x="12" y="66" width="14" height="8"  fill="#1A1A1A"/>
    <rect x="38" y="66" width="14" height="8"  fill="#1A1A1A"/>
  </svg>
)

const BirthdayCake = () => (
  <svg viewBox="0 0 64 80" width="64" height="80" xmlns="http://www.w3.org/2000/svg">
    {/* Candles */}
    <rect x="14" y="4"  width="6"  height="14" fill="#FDD835"/>
    <rect x="29" y="2"  width="6"  height="16" fill="#CE93D8"/>
    <rect x="44" y="4"  width="6"  height="14" fill="#80DEEA"/>
    {/* Flames */}
    <polygon points="17,4 20,4 18.5,0" fill="#FF8C00"/>
    <polygon points="32,2 35,2 33.5,0" fill="#FF8C00"/>
    <polygon points="47,4 50,4 48.5,0" fill="#FF8C00"/>
    {/* Top tier top face */}
    <polygon points="14,18 50,18 54,14 18,14" fill="#F48FB1"/>
    {/* Top tier */}
    <rect x="14" y="18" width="36" height="16" fill="#E91E8C"/>
    {/* Face eyes */}
    <rect x="22" y="22" width="6"  height="6"  fill="#1A1A1A"/>
    <rect x="36" y="22" width="6"  height="6"  fill="#1A1A1A"/>
    <rect x="24" y="23" width="2"  height="2"  fill="#FFFFFF"/>
    <rect x="38" y="23" width="2"  height="2"  fill="#FFFFFF"/>
    {/* Smile */}
    <rect x="22" y="30" width="20" height="3"  fill="#1A1A1A"/>
    <rect x="22" y="33" width="4"  height="2"  fill="#1A1A1A"/>
    <rect x="38" y="33" width="4"  height="2"  fill="#1A1A1A"/>
    {/* Frosting drips */}
    <rect x="14" y="34" width="4"  height="6"  fill="#FFFFFF"/>
    <rect x="30" y="34" width="4"  height="8"  fill="#FFFFFF"/>
    <rect x="46" y="34" width="4"  height="6"  fill="#FFFFFF"/>
    {/* Middle tier top */}
    <polygon points="10,36 54,36 58,32 14,32" fill="#CE93D8"/>
    {/* Middle tier */}
    <rect x="10" y="36" width="44" height="16" fill="#9C27B0"/>
    {/* Sprinkles */}
    <rect x="14" y="40" width="8"  height="3"  fill="#FDD835" transform="rotate(-30 14 40)"/>
    <rect x="28" y="44" width="8"  height="3"  fill="#80DEEA" transform="rotate(20 28 44)"/>
    <rect x="42" y="40" width="8"  height="3"  fill="#F48FB1" transform="rotate(-15 42 40)"/>
    <rect x="20" y="46" width="8"  height="3"  fill="#FF8A65" transform="rotate(10 20 46)"/>
    {/* Bottom tier top */}
    <polygon points="6,52 58,52 62,48 10,48" fill="#EF9A9A"/>
    {/* Bottom tier */}
    <rect x="6"  y="52" width="52" height="14" fill="#E53935"/>
    {/* Base plate */}
    <rect x="4"  y="64" width="56" height="8"  fill="#CE93D8"/>
    <polygon points="4,64 60,64 64,60 8,60" fill="#F3E5F5"/>
  </svg>
)

const Penguin = () => (
  <svg viewBox="0 0 64 80" width="64" height="80" xmlns="http://www.w3.org/2000/svg">
    {/* Head top */}
    <polygon points="12,14 52,14 56,10 16,10" fill="#424242"/>
    {/* Head */}
    <rect x="12" y="14" width="40" height="28" fill="#212121"/>
    {/* White face */}
    <rect x="18" y="16" width="28" height="22" fill="#FAFAFA"/>
    {/* Eyes */}
    <rect x="20" y="18" width="10" height="10" fill="#212121"/>
    <rect x="22" y="20" width="4"  height="4"  fill="#FFFFFF"/>
    <rect x="24" y="21" width="2"  height="2"  fill="#1A1A1A"/>
    <rect x="34" y="18" width="10" height="10" fill="#212121"/>
    <rect x="36" y="20" width="4"  height="4"  fill="#FFFFFF"/>
    <rect x="38" y="21" width="2"  height="2"  fill="#1A1A1A"/>
    {/* Beak */}
    <rect x="24" y="30" width="16" height="8"  fill="#FF9800"/>
    <polygon points="24,38 40,38 32,44" fill="#E65100"/>
    {/* Scarf */}
    <rect x="10" y="40" width="44" height="8"  fill="#F44336"/>
    <rect x="12" y="46" width="8"  height="12" fill="#F44336"/>
    {/* Body top */}
    <polygon points="10,46 54,46 58,42 14,42" fill="#424242"/>
    {/* Body */}
    <rect x="10" y="46" width="44" height="24" fill="#212121"/>
    {/* Belly */}
    <rect x="18" y="46" width="28" height="22" fill="#FAFAFA"/>
    {/* Wings */}
    <rect x="0"  y="46" width="12" height="20" fill="#212121"/>
    <rect x="52" y="46" width="12" height="20" fill="#212121"/>
    {/* Feet */}
    <rect x="14" y="68" width="14" height="6"  fill="#FF9800"/>
    <rect x="36" y="68" width="14" height="6"  fill="#FF9800"/>
    <rect x="10" y="72" width="18" height="4"  fill="#E65100"/>
    <rect x="36" y="72" width="18" height="4"  fill="#E65100"/>
  </svg>
)

const PiratParrot = () => (
  <svg viewBox="0 0 64 80" width="64" height="80" xmlns="http://www.w3.org/2000/svg">
    {/* Hat top */}
    <polygon points="10,8 54,8 58,4 14,4" fill="#212121"/>
    {/* Hat */}
    <rect x="10" y="8"  width="44" height="14" fill="#1A1A1A"/>
    <rect x="6"  y="20" width="52" height="6"  fill="#212121"/>
    {/* Skull & crossbones on hat */}
    <rect x="26" y="10" width="12" height="10" fill="#FFFFFF"/>
    <rect x="28" y="10" width="8"  height="6"  fill="#FFFFFF"/>
    <rect x="29" y="12" width="3"  height="3"  fill="#1A1A1A"/>
    <rect x="35" y="12" width="3"  height="3"  fill="#1A1A1A"/>
    <rect x="25" y="17" width="14" height="2"  fill="#FFFFFF"/>
    <rect x="31" y="14" width="2"  height="8"  fill="#FFFFFF"/>
    {/* Red head feathers */}
    <rect x="8"  y="24" width="8"  height="14" fill="#D32F2F"/>
    <rect x="48" y="24" width="8"  height="14" fill="#D32F2F"/>
    {/* Head top */}
    <polygon points="12,26 52,26 56,22 16,22" fill="#43A047"/>
    {/* Head */}
    <rect x="12" y="26" width="40" height="24" fill="#2E7D32"/>
    {/* Eye patch */}
    <rect x="14" y="30" width="14" height="10" fill="#1A1A1A"/>
    <rect x="8"  y="32" width="8"  height="4"  fill="#1A1A1A"/>
    {/* Good eye */}
    <rect x="36" y="30" width="12" height="12" fill="#FDD835"/>
    <rect x="39" y="33" width="6"  height="6"  fill="#1A1A1A"/>
    <rect x="40" y="34" width="2"  height="2"  fill="#FFFFFF"/>
    {/* Beak */}
    <rect x="22" y="42" width="20" height="8"  fill="#FDD835"/>
    <polygon points="22,50 42,50 32,56" fill="#F9A825"/>
    {/* Body top */}
    <polygon points="10,50 54,50 58,46 14,46" fill="#43A047"/>
    {/* Body */}
    <rect x="10" y="50" width="44" height="20" fill="#2E7D32"/>
    {/* Belly */}
    <rect x="20" y="52" width="24" height="16" fill="#66BB6A"/>
    {/* Wings */}
    <rect x="0"  y="50" width="12" height="18" fill="#1B5E20"/>
    <rect x="52" y="50" width="12" height="18" fill="#1B5E20"/>
    {/* Talons */}
    <rect x="16" y="68" width="6"  height="10" fill="#F9A825"/>
    <rect x="10" y="74" width="14" height="4"  fill="#F9A825"/>
    <rect x="42" y="68" width="6"  height="10" fill="#F9A825"/>
    <rect x="40" y="74" width="14" height="4"  fill="#F9A825"/>
  </svg>
)

const Pigeon = () => (
  <svg viewBox="0 0 64 80" width="64" height="80" xmlns="http://www.w3.org/2000/svg">
    {/* Tail feathers */}
    <rect x="46" y="50" width="18" height="10" fill="#757575"/>
    <rect x="50" y="56" width="14" height="8"  fill="#616161"/>
    {/* Head top */}
    <polygon points="14,14 50,14 54,10 18,10" fill="#BDBDBD"/>
    {/* Head */}
    <rect x="14" y="14" width="36" height="24" fill="#9E9E9E"/>
    {/* Iridescent neck */}
    <rect x="16" y="34" width="32" height="12" fill="#7B1FA2"/>
    <rect x="20" y="36" width="24" height="8"  fill="#9C27B0"/>
    {/* Beak */}
    <rect x="6"  y="24" width="14" height="6"  fill="#FDD835"/>
    <polygon points="6,24 6,30 2,27" fill="#F9A825"/>
    {/* Eye */}
    <rect x="18" y="18" width="10" height="10" fill="#FDD835"/>
    <rect x="20" y="20" width="6"  height="6"  fill="#1A1A1A"/>
    <rect x="21" y="21" width="2"  height="2"  fill="#FFFFFF"/>
    {/* Body top */}
    <polygon points="8,44 56,44 60,40 12,40" fill="#BDBDBD"/>
    {/* Body */}
    <rect x="8"  y="44" width="48" height="22" fill="#9E9E9E"/>
    {/* Wing detail lines */}
    <rect x="10" y="48" width="44" height="3"  fill="#757575"/>
    <rect x="10" y="54" width="44" height="3"  fill="#757575"/>
    {/* Feet */}
    <rect x="18" y="64" width="6"  height="12" fill="#FF9800"/>
    <rect x="10" y="72" width="16" height="4"  fill="#FF9800"/>
    <rect x="40" y="64" width="6"  height="12" fill="#FF9800"/>
    <rect x="36" y="72" width="16" height="4"  fill="#FF9800"/>
  </svg>
)

const Fox = () => (
  <svg viewBox="0 0 64 80" width="64" height="80" xmlns="http://www.w3.org/2000/svg">
    {/* Ears */}
    <polygon points="8,18 14,2 26,18"  fill="#F57C00"/>
    <polygon points="12,18 16,8 22,18" fill="#B71C1C"/>
    <polygon points="56,18 50,2 38,18" fill="#F57C00"/>
    <polygon points="52,18 48,8 42,18" fill="#B71C1C"/>
    {/* Head top */}
    <polygon points="10,18 54,18 58,14 14,14" fill="#FFB74D"/>
    {/* Head */}
    <rect x="10" y="18" width="44" height="24" fill="#F57C00"/>
    {/* White muzzle */}
    <rect x="16" y="30" width="32" height="14" fill="#FFF8E1"/>
    {/* Eyes */}
    <rect x="14" y="22" width="10" height="10" fill="#FFFFFF"/>
    <rect x="16" y="24" width="6"  height="6"  fill="#1A1A1A"/>
    <rect x="17" y="25" width="2"  height="2"  fill="#FFFFFF"/>
    <rect x="40" y="22" width="10" height="10" fill="#FFFFFF"/>
    <rect x="42" y="24" width="6"  height="6"  fill="#1A1A1A"/>
    <rect x="43" y="25" width="2"  height="2"  fill="#FFFFFF"/>
    {/* Nose */}
    <rect x="28" y="30" width="8"  height="6"  fill="#1A1A1A"/>
    {/* Body top */}
    <polygon points="8,42 56,42 60,38 12,38" fill="#FFB74D"/>
    {/* Body */}
    <rect x="8"  y="42" width="48" height="24" fill="#F57C00"/>
    {/* White chest */}
    <rect x="18" y="44" width="28" height="20" fill="#FFF8E1"/>
    {/* Tail */}
    <rect x="50" y="46" width="14" height="22" fill="#F57C00"/>
    <rect x="52" y="62" width="12" height="8"  fill="#FFFFFF"/>
    {/* Legs */}
    <rect x="12" y="64" width="12" height="14" fill="#E65100"/>
    <rect x="40" y="64" width="12" height="14" fill="#E65100"/>
  </svg>
)

const Frog = () => (
  <svg viewBox="0 0 64 80" width="64" height="80" xmlns="http://www.w3.org/2000/svg">
    {/* Eye bumps on top of head */}
    <rect x="8"  y="4"  width="16" height="16" fill="#00C853"/>
    <rect x="40" y="4"  width="16" height="16" fill="#00C853"/>
    {/* Eyeballs */}
    <rect x="8"  y="4"  width="16" height="16" fill="#FFFFFF"/>
    <rect x="40" y="4"  width="16" height="16" fill="#FFFFFF"/>
    <rect x="11" y="7"  width="10" height="10" fill="#1A1A1A"/>
    <rect x="43" y="7"  width="10" height="10" fill="#1A1A1A"/>
    <rect x="12" y="8"  width="3"  height="3"  fill="#FFFFFF"/>
    <rect x="44" y="8"  width="3"  height="3"  fill="#FFFFFF"/>
    {/* Head top */}
    <polygon points="6,20 58,20 62,16 10,16" fill="#69F0AE"/>
    {/* Head */}
    <rect x="6"  y="20" width="52" height="20" fill="#00C853"/>
    {/* Nostrils */}
    <rect x="24" y="24" width="6"  height="4"  fill="#00A843"/>
    <rect x="34" y="24" width="6"  height="4"  fill="#00A843"/>
    {/* Wide mouth */}
    <rect x="6"  y="36" width="52" height="6"  fill="#1A1A1A"/>
    <rect x="8"  y="38" width="48" height="4"  fill="#EF5350"/>
    {/* Body top */}
    <polygon points="6,42 58,42 62,38 10,38" fill="#69F0AE"/>
    {/* Body */}
    <rect x="6"  y="42" width="52" height="24" fill="#00C853"/>
    {/* Belly */}
    <rect x="14" y="44" width="36" height="20" fill="#B9F6CA"/>
    {/* Arms */}
    <rect x="0"  y="44" width="8"  height="18" fill="#00A843"/>
    <rect x="56" y="44" width="8"  height="18" fill="#00A843"/>
    {/* Legs */}
    <rect x="4"  y="60" width="20" height="10" fill="#00A843"/>
    <rect x="40" y="60" width="20" height="10" fill="#00A843"/>
    {/* Feet */}
    <rect x="0"  y="66" width="22" height="8"  fill="#007A33"/>
    <rect x="42" y="66" width="22" height="8"  fill="#007A33"/>
  </svg>
)

// ── PREMIUM AVATARS ───────────────────────────────────────────────────────────

const Dragon = () => (
  <svg viewBox="0 0 64 80" width="64" height="80" xmlns="http://www.w3.org/2000/svg">
    {/* Wings */}
    <polygon points="0,20 16,36 10,60"  fill="#B71C1C"/>
    <polygon points="4,20 16,36 8,26"   fill="#D32F2F"/>
    <polygon points="64,20 48,36 54,60" fill="#B71C1C"/>
    <polygon points="60,20 48,36 56,26" fill="#D32F2F"/>
    {/* Back spikes */}
    <polygon points="22,16 26,4 30,16"  fill="#FDD835"/>
    <polygon points="30,14 34,2 38,14"  fill="#FDD835"/>
    <polygon points="38,16 42,4 46,16"  fill="#FDD835"/>
    {/* Head top */}
    <polygon points="14,18 50,18 54,14 18,14" fill="#E53935"/>
    {/* Head */}
    <rect x="14" y="18" width="36" height="22" fill="#C62828"/>
    {/* Horns */}
    <rect x="16" y="8"  width="6"  height="12" fill="#FDD835"/>
    <rect x="42" y="8"  width="6"  height="12" fill="#FDD835"/>
    {/* Eyes (slit pupils) */}
    <rect x="18" y="22" width="10" height="10" fill="#FDD835"/>
    <rect x="21" y="22" width="4"  height="10" fill="#1A1A1A"/>
    <rect x="36" y="22" width="10" height="10" fill="#FDD835"/>
    <rect x="39" y="22" width="4"  height="10" fill="#1A1A1A"/>
    {/* Nostrils + fire */}
    <rect x="22" y="36" width="6"  height="4"  fill="#7B1FA2"/>
    <rect x="36" y="36" width="6"  height="4"  fill="#7B1FA2"/>
    <polygon points="24,40 28,40 20,52 16,48" fill="#FF8C00"/>
    <polygon points="36,40 40,40 44,52 48,48" fill="#FF8C00"/>
    <polygon points="22,40 30,40 26,56"       fill="#FDD835"/>
    <polygon points="34,40 42,40 38,56"       fill="#FDD835"/>
    {/* Body top */}
    <polygon points="12,40 52,40 56,36 16,36" fill="#E53935"/>
    {/* Body */}
    <rect x="12" y="40" width="40" height="24" fill="#C62828"/>
    {/* Belly scales */}
    <rect x="20" y="42" width="24" height="20" fill="#EF9A9A"/>
    <rect x="22" y="46" width="20" height="4"  fill="#C62828"/>
    <rect x="22" y="54" width="20" height="4"  fill="#C62828"/>
    {/* Claws */}
    <rect x="14" y="62" width="10" height="12" fill="#B71C1C"/>
    <rect x="10" y="70" width="6"  height="4"  fill="#FDD835"/>
    <rect x="16" y="72" width="4"  height="4"  fill="#FDD835"/>
    <rect x="40" y="62" width="10" height="12" fill="#B71C1C"/>
    <rect x="44" y="70" width="6"  height="4"  fill="#FDD835"/>
    <rect x="40" y="72" width="4"  height="4"  fill="#FDD835"/>
  </svg>
)

const King = () => (
  <svg viewBox="0 0 64 80" width="64" height="80" xmlns="http://www.w3.org/2000/svg">
    {/* Crown base */}
    <rect x="12" y="16" width="40" height="10" fill="#FDD835"/>
    {/* Crown points */}
    <rect x="12" y="6"  width="8"  height="12" fill="#FDD835"/>
    <rect x="28" y="4"  width="8"  height="14" fill="#FDD835"/>
    <rect x="44" y="6"  width="8"  height="12" fill="#FDD835"/>
    {/* Crown gems */}
    <rect x="14" y="8"  width="4"  height="4"  fill="#F44336"/>
    <rect x="30" y="6"  width="4"  height="4"  fill="#4CAF50"/>
    <rect x="46" y="8"  width="4"  height="4"  fill="#2196F3"/>
    {/* Crown band gems */}
    <rect x="18" y="18" width="4"  height="4"  fill="#E91E63"/>
    <rect x="30" y="18" width="4"  height="4"  fill="#9C27B0"/>
    <rect x="42" y="18" width="4"  height="4"  fill="#FF9800"/>
    {/* Head top */}
    <polygon points="14,26 50,26 54,22 18,22" fill="#FFCC80"/>
    {/* Head */}
    <rect x="14" y="26" width="36" height="20" fill="#FFCC80"/>
    {/* Eyes */}
    <rect x="18" y="30" width="8"  height="8"  fill="#1A1A1A"/>
    <rect x="20" y="32" width="2"  height="2"  fill="#FFFFFF"/>
    <rect x="38" y="30" width="8"  height="8"  fill="#1A1A1A"/>
    <rect x="40" y="32" width="2"  height="2"  fill="#FFFFFF"/>
    {/* Moustache */}
    <rect x="20" y="42" width="24" height="4"  fill="#795548"/>
    {/* Robe top */}
    <polygon points="8,46 56,46 60,42 12,42" fill="#7E57C2"/>
    {/* Robe */}
    <rect x="8"  y="46" width="48" height="30" fill="#4A148C"/>
    {/* Robe collar */}
    <polygon points="24,46 32,58 8,46"  fill="#5E35B1"/>
    <polygon points="40,46 32,58 56,46" fill="#5E35B1"/>
    {/* Ermine trim & spots */}
    <rect x="8"  y="70" width="48" height="6"  fill="#FFFFFF"/>
    <rect x="12" y="70" width="4"  height="6"  fill="#1A1A1A"/>
    <rect x="24" y="70" width="4"  height="6"  fill="#1A1A1A"/>
    <rect x="36" y="70" width="4"  height="6"  fill="#1A1A1A"/>
    <rect x="48" y="70" width="4"  height="6"  fill="#1A1A1A"/>
    {/* Belt */}
    <rect x="8"  y="58" width="48" height="6"  fill="#FDD835"/>
    <rect x="28" y="56" width="8"  height="10" fill="#F9A825"/>
    {/* Scepter */}
    <rect x="54" y="24" width="4"  height="32" fill="#795548"/>
    <rect x="50" y="22" width="12" height="6"  fill="#FDD835"/>
    <rect x="52" y="18" width="8"  height="6"  fill="#F44336"/>
  </svg>
)

const Skater = () => (
  <svg viewBox="0 0 64 80" width="64" height="80" xmlns="http://www.w3.org/2000/svg">
    {/* Cap (backwards) */}
    <rect x="10" y="8"  width="44" height="10" fill="#1565C0"/>
    <rect x="12" y="10" width="40" height="8"  fill="#1976D2"/>
    <rect x="20" y="16" width="24" height="6"  fill="#1565C0"/>
    {/* Cap brim pointing backwards */}
    <rect x="10" y="14" width="14" height="4"  fill="#0D47A1"/>
    {/* Head top */}
    <polygon points="14,18 50,18 54,14 18,14" fill="#FFCC80"/>
    {/* Head */}
    <rect x="14" y="18" width="36" height="20" fill="#FFCC80"/>
    {/* Eyes */}
    <rect x="18" y="22" width="8"  height="8"  fill="#1A1A1A"/>
    <rect x="20" y="24" width="2"  height="2"  fill="#FFFFFF"/>
    <rect x="38" y="22" width="8"  height="8"  fill="#1A1A1A"/>
    <rect x="40" y="24" width="2"  height="2"  fill="#FFFFFF"/>
    {/* Smirk */}
    <rect x="32" y="32" width="12" height="4"  fill="#1A1A1A"/>
    <rect x="40" y="32" width="4"  height="4"  fill="#FFCC80"/>
    {/* Hoodie top */}
    <polygon points="10,38 54,38 58,34 14,34" fill="#1976D2"/>
    {/* Hoodie */}
    <rect x="10" y="38" width="44" height="22" fill="#1565C0"/>
    {/* Hoodie pocket */}
    <rect x="20" y="48" width="24" height="10" fill="#0D47A1"/>
    {/* Sleeves */}
    <rect x="0"  y="38" width="12" height="18" fill="#1565C0"/>
    <rect x="52" y="38" width="12" height="18" fill="#1565C0"/>
    {/* Jeans */}
    <rect x="12" y="58" width="16" height="16" fill="#1565C0"/>
    <rect x="36" y="58" width="16" height="16" fill="#1565C0"/>
    {/* Shoes */}
    <rect x="8"  y="70" width="20" height="8"  fill="#212121"/>
    <rect x="36" y="70" width="20" height="8"  fill="#212121"/>
    {/* Skateboard */}
    <rect x="4"  y="76" width="56" height="6"  fill="#D84315"/>
    <rect x="4"  y="78" width="56" height="2"  fill="#BF360C"/>
    <rect x="10" y="80" width="8"  height="4"  fill="#424242"/>
    <rect x="46" y="80" width="8"  height="4"  fill="#424242"/>
  </svg>
)

const Astronaut = () => (
  <svg viewBox="0 0 64 80" width="64" height="80" xmlns="http://www.w3.org/2000/svg">
    {/* Helmet top */}
    <polygon points="10,16 54,16 58,12 14,12" fill="#FFFFFF"/>
    {/* Helmet */}
    <rect x="10" y="16" width="44" height="26" fill="#ECEFF1"/>
    {/* Visor */}
    <rect x="16" y="20" width="32" height="18" fill="#1565C0"/>
    {/* Visor reflection */}
    <rect x="18" y="22" width="10" height="4"  fill="#42A5F5"/>
    <rect x="18" y="28" width="6"  height="3"  fill="#42A5F5"/>
    {/* Helmet ring */}
    <rect x="10" y="40" width="44" height="4"  fill="#B0BEC5"/>
    {/* Suit top */}
    <polygon points="8,44 56,44 60,40 12,40" fill="#FFFFFF"/>
    {/* Suit body */}
    <rect x="8"  y="44" width="48" height="26" fill="#ECEFF1"/>
    {/* Chest display */}
    <rect x="18" y="48" width="28" height="16" fill="#90A4AE"/>
    <rect x="20" y="50" width="10" height="4"  fill="#42A5F5"/>
    <rect x="32" y="50" width="4"  height="4"  fill="#F44336"/>
    <rect x="20" y="56" width="6"  height="4"  fill="#4CAF50"/>
    <rect x="28" y="56" width="6"  height="4"  fill="#FDD835"/>
    {/* Arms */}
    <rect x="0"  y="44" width="10" height="20" fill="#ECEFF1"/>
    <rect x="0"  y="62" width="10" height="8"  fill="#37474F"/>
    <rect x="54" y="44" width="10" height="20" fill="#ECEFF1"/>
    <rect x="54" y="62" width="10" height="8"  fill="#37474F"/>
    {/* Oxygen pack */}
    <rect x="48" y="46" width="8"  height="14" fill="#B0BEC5"/>
    {/* Boots */}
    <rect x="10" y="68" width="18" height="10" fill="#37474F"/>
    <rect x="36" y="68" width="18" height="10" fill="#37474F"/>
    {/* Flag patch */}
    <rect x="10" y="46" width="6"  height="4"  fill="#F44336"/>
    <rect x="10" y="46" width="3"  height="2"  fill="#1565C0"/>
  </svg>
)

const CEO = () => (
  <svg viewBox="0 0 64 80" width="64" height="80" xmlns="http://www.w3.org/2000/svg">
    {/* Slicked hair */}
    <rect x="14" y="8"  width="36" height="10" fill="#1A1A1A"/>
    <rect x="10" y="12" width="44" height="6"  fill="#212121"/>
    {/* Head top */}
    <polygon points="14,18 50,18 54,14 18,14" fill="#FFCC80"/>
    {/* Head */}
    <rect x="14" y="18" width="36" height="20" fill="#FFCC80"/>
    {/* Sunglasses */}
    <rect x="14" y="22" width="14" height="8"  fill="#1A1A1A"/>
    <rect x="36" y="22" width="14" height="8"  fill="#1A1A1A"/>
    <rect x="28" y="24" width="8"  height="4"  fill="#1A1A1A"/>
    <rect x="10" y="24" width="6"  height="4"  fill="#1A1A1A"/>
    <rect x="48" y="24" width="6"  height="4"  fill="#1A1A1A"/>
    {/* Smirk */}
    <rect x="30" y="32" width="14" height="4"  fill="#1A1A1A"/>
    {/* Suit top */}
    <polygon points="8,38 56,38 60,34 12,34" fill="#37474F"/>
    {/* Suit */}
    <rect x="8"  y="38" width="48" height="30" fill="#263238"/>
    {/* Lapels */}
    <polygon points="22,38 32,52 8,38"  fill="#37474F"/>
    <polygon points="42,38 32,52 56,38" fill="#37474F"/>
    {/* Shirt */}
    <rect x="28" y="38" width="8"  height="16" fill="#FFFFFF"/>
    {/* Tie */}
    <polygon points="30,38 34,38 33,56 31,56" fill="#D32F2F"/>
    {/* Pocket square */}
    <rect x="10" y="40" width="6"  height="4"  fill="#FFFFFF"/>
    {/* Watch */}
    <rect x="4"  y="52" width="6"  height="6"  fill="#FDD835"/>
    {/* Briefcase */}
    <rect x="48" y="52" width="16" height="14" fill="#795548"/>
    <rect x="52" y="50" width="8"  height="6"  fill="#6D4C41"/>
    <rect x="48" y="58" width="16" height="2"  fill="#6D4C41"/>
    {/* Arms */}
    <rect x="0"  y="38" width="10" height="22" fill="#263238"/>
    <rect x="54" y="38" width="10" height="22" fill="#263238"/>
    {/* Shoes */}
    <rect x="10" y="66" width="16" height="8"  fill="#1A1A1A"/>
    <rect x="38" y="66" width="16" height="8"  fill="#1A1A1A"/>
  </svg>
)

const Bodybuilder = () => (
  <svg viewBox="0 0 64 80" width="64" height="80" xmlns="http://www.w3.org/2000/svg">
    {/* Headband */}
    <rect x="12" y="10" width="40" height="8"  fill="#D32F2F"/>
    <rect x="10" y="12" width="44" height="4"  fill="#F44336"/>
    {/* Head top */}
    <polygon points="14,18 50,18 54,14 18,14" fill="#FFCC80"/>
    {/* Head */}
    <rect x="14" y="18" width="36" height="20" fill="#FFCC80"/>
    {/* Determined brows */}
    <rect x="14" y="20" width="14" height="4"  fill="#795548"/>
    <rect x="36" y="20" width="14" height="4"  fill="#795548"/>
    {/* Eyes */}
    <rect x="18" y="24" width="8"  height="6"  fill="#1A1A1A"/>
    <rect x="38" y="24" width="8"  height="6"  fill="#1A1A1A"/>
    {/* Gritted teeth */}
    <rect x="18" y="32" width="28" height="5"  fill="#1A1A1A"/>
    <rect x="20" y="33" width="24" height="3"  fill="#FFFFFF"/>
    {/* MASSIVE arms */}
    <rect x="0"  y="36" width="16" height="28" fill="#FFCC80"/>
    <rect x="0"  y="60" width="16" height="8"  fill="#FFCC80"/>
    <rect x="48" y="36" width="16" height="28" fill="#FFCC80"/>
    <rect x="48" y="60" width="16" height="8"  fill="#FFCC80"/>
    {/* Neck */}
    <rect x="22" y="36" width="20" height="6"  fill="#FFCC80"/>
    {/* Tank top top */}
    <polygon points="16,42 48,42 52,38 20,38" fill="#EF5350"/>
    {/* Tank top */}
    <rect x="16" y="42" width="32" height="20" fill="#C62828"/>
    {/* Muscle lines */}
    <rect x="30" y="42" width="4"  height="20" fill="#B71C1C"/>
    <rect x="16" y="52" width="32" height="3"  fill="#B71C1C"/>
    {/* Shorts */}
    <rect x="14" y="60" width="36" height="14" fill="#1565C0"/>
    <rect x="30" y="60" width="4"  height="14" fill="#0D47A1"/>
    {/* Shoes */}
    <rect x="10" y="70" width="18" height="8"  fill="#212121"/>
    <rect x="36" y="70" width="18" height="8"  fill="#212121"/>
    {/* Dumbbell */}
    <rect x="54" y="52" width="10" height="6"  fill="#424242"/>
    <rect x="56" y="48" width="6"  height="14" fill="#616161"/>
    <rect x="0"  y="52" width="10" height="6"  fill="#424242"/>
    <rect x="2"  y="48" width="6"  height="14" fill="#616161"/>
  </svg>
)

// ── Avatar data ───────────────────────────────────────────────────────────────

export const FREE_AVATARS = [
  { id: 'chicken',   name: 'Clucky',      SVG: Chicken      },
  { id: 'cow',       name: 'Mooface',     SVG: Cow          },
  { id: 'kangaroo',  name: 'Skip',        SVG: Kangaroo     },
  { id: 'oldman',    name: 'Gramps',      SVG: OldMan       },
  { id: 'cake',      name: 'Sprinkles',   SVG: BirthdayCake },
  { id: 'penguin',   name: 'Waddles',     SVG: Penguin      },
  { id: 'parrot',    name: "Cap'n Pixel", SVG: PiratParrot  },
  { id: 'pigeon',    name: 'Birdy',       SVG: Pigeon       },
  { id: 'fox',       name: 'Foxy',        SVG: Fox          },
  { id: 'frog',      name: 'Jumpy',       SVG: Frog         },
]

export const PREMIUM_AVATARS = [
  { id: 'dragon',      name: 'Blaze',    SVG: Dragon      },
  { id: 'king',        name: 'Rex',      SVG: King        },
  { id: 'skater',      name: 'Shred',    SVG: Skater      },
  { id: 'astronaut',   name: 'Cosmos',   SVG: Astronaut   },
  { id: 'ceo',         name: 'The Boss', SVG: CEO         },
  { id: 'bodybuilder', name: 'Flex',     SVG: Bodybuilder },
]

export const ALL_AVATARS = [...FREE_AVATARS, ...PREMIUM_AVATARS]

export function getAvatar(id) {
  return FREE_AVATARS.find((a) => a.id === id) || FREE_AVATARS[0]
}

// ── Avatar card ───────────────────────────────────────────────────────────────

function AvatarCard({ avatar, selected, premium, delay, onClick }) {
  const [hovered, setHovered] = useState(false)
  const AvatarSVG = avatar.SVG

  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center flex-shrink-0 focus:outline-none relative"
      style={{ width: 80 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Bounce wrapper */}
      <div style={{
        animation: `avatarBounce 0.9s ease-in-out infinite`,
        animationDelay: `${delay}s`,
        transformOrigin: 'bottom center',
        position: 'relative',
      }}>
        {/* Scale on hover / selected */}
        <div style={{
          transform: `scale(${selected ? 1.2 : hovered ? 1.12 : 1})`,
          transition: 'transform 0.15s ease, filter 0.15s ease',
          filter: premium && !hovered ? 'grayscale(1) brightness(0.45)' : undefined,
        }}>
          <AvatarSVG />
        </div>

        {/* Lock for premium */}
        {premium && (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 26,
          }}>🔒</div>
        )}

        {/* Selection glow ring */}
        {selected && (
          <div style={{
            position: 'absolute', bottom: 2, left: '50%',
            transform: 'translateX(-50%)',
            width: 52, height: 10, borderRadius: '50%',
            background: '#a78bfa', opacity: 0.9,
            filter: 'blur(4px)',
          }}/>
        )}
      </div>

      {/* Ground shadow */}
      <div style={{
        width: 38, height: 7, borderRadius: '50%',
        background: 'rgba(0,0,0,0.4)',
        marginTop: 2,
        animation: `shadowPulse 0.9s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}/>

      {/* Name label — always shown when selected, else on hover */}
      <span
        className="text-[8px] font-pixel text-white text-center mt-2 leading-tight"
        style={{
          opacity: selected || hovered ? 1 : 0,
          transition: 'opacity 0.15s',
          minHeight: 16,
        }}
      >
        {avatar.name}
      </span>
    </button>
  )
}

// ── Main selector ─────────────────────────────────────────────────────────────

export default function AvatarSelector({ onComplete, roomCode, initialUsername = '', initialAvatarId = null }) {
  const [username, setUsername] = useState(initialUsername)
  const [selectedId, setSelectedId] = useState(initialAvatarId)
  const [premiumAlert, setPremiumAlert] = useState(false)

  function handlePremiumClick() {
    setPremiumAlert(true)
    setTimeout(() => setPremiumAlert(false), 2800)
  }

  function handleEnter() {
    if (!username.trim() || !selectedId) return
    onComplete(username.trim(), selectedId)
  }

  const canEnter = username.trim().length > 0 && selectedId !== null

  return (
    <div className="min-h-screen flex flex-col items-center gap-6 px-4 pt-8 pb-16">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-lg font-pixel text-pixel-accent">PIXEL POKER</h1>
        {roomCode && (
          <p className="text-[9px] text-gray-500 font-pixel mt-1">
            JOINING ROOM <span className="text-pixel-cyan">{roomCode}</span>
          </p>
        )}
      </div>

      {/* Name input */}
      <div className="w-full max-w-xs flex flex-col gap-2">
        <label className="text-[9px] font-pixel text-gray-400">YOUR NAME</label>
        <input
          type="text"
          placeholder="e.g. Phil"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input-pixel text-center"
          maxLength={20}
          autoFocus
          onKeyDown={(e) => e.key === 'Enter' && handleEnter()}
        />
      </div>

      {/* FREE Pixel Pals */}
      <div className="w-full">
        <p className="text-[9px] font-pixel text-pixel-green mb-1 px-4">
          PIXEL PALS <span className="text-gray-600 ml-2">FREE</span>
        </p>
        <div className="scrollbar-hide" style={{ overflowX: 'auto', overflowY: 'visible' }}>
          <div className="flex gap-1 px-4 w-max" style={{ paddingTop: 20, paddingBottom: 8 }}>
            {FREE_AVATARS.map((av, i) => (
              <AvatarCard
                key={av.id}
                avatar={av}
                selected={selectedId === av.id}
                premium={false}
                delay={i * 0.1}
                onClick={() => setSelectedId(av.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* PREMIUM Pixel Legends */}
      <div className="w-full">
        <p className="text-[9px] font-pixel text-yellow-500 mb-1 px-4">
          PIXEL LEGENDS <span className="text-gray-600 ml-2">PREMIUM</span>
        </p>
        <div className="scrollbar-hide" style={{ overflowX: 'auto', overflowY: 'visible' }}>
          <div className="flex gap-1 px-4 w-max" style={{ paddingTop: 20, paddingBottom: 8 }}>
            {PREMIUM_AVATARS.map((av, i) => (
              <AvatarCard
                key={av.id}
                avatar={av}
                selected={false}
                premium={true}
                delay={i * 0.15 + 0.5}
                onClick={handlePremiumClick}
              />
            ))}
          </div>
        </div>
        {premiumAlert && (
          <p className="text-[9px] font-pixel text-yellow-400 text-center animate-pulse px-4">
            ✨ Pixel Legends coming soon!
          </p>
        )}
      </div>

      {/* CTA */}
      <div className="flex flex-col items-center gap-3">
        {!selectedId && username.trim() && (
          <p className="text-[9px] font-pixel text-pixel-yellow animate-pulse">
            ↑ Pick your Pixel Pal to continue
          </p>
        )}
        <button
          onClick={handleEnter}
          disabled={!canEnter}
          className="btn-pixel disabled:opacity-30 disabled:cursor-not-allowed"
          style={{ minWidth: 240, fontSize: 10 }}
        >
          NEXT →
        </button>
      </div>
    </div>
  )
}
