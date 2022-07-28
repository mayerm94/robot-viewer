import React, { useRef, useState } from 'react';
import AppContext from '../context/AppContext';
import Kinematics from 'kinematics';

const geometry = [
  [0, 2, 0], // V0: 0x 2y
  [0, 2, 0], // V1: 0x 2y
  [0, 2, 0], // V2: 0x 2y
  [0, 0, 0], // V3: 2x 0y
  [0, 0, 0], // V4: 0x 2y
];

// const geometry = [
//   [0, 0, 2], // V0: 0x 2y
//   [0, 0, 2], // V1: 0x 2y
//   [0, 0, 2], // V2: 0x 2y
//   [2, 0, 0], // V3: 2x 0y
//   [0, 2, 0], // V4: 0x 2y
// ];

// const geometry = [
//   [0, 0, 2], // V0: 0x 2y
//   [0, 0, 2], // V1: 0x 2y
//   [0, 0, 2], // V2: 0x 2y
//   [2, 0, 0], // V3: 2x 0y
//   [0, 2, 0], // V4: 0x 2y
// ];

const RobotKin = new Kinematics.default(geometry);

/**
 * Provide any application specific data
 */
const AppProvider = ({ children }) => {
  const [colorScheme, setColorScheme] = useState('dark');
  const [navOpen, setNavOpen] = useState(false);
  const [orbitEnabled, setOrbitalEnabled] = useState(true);

  const setBall = useRef();

  const control = {
    setBall,
  };

  const [config, setConfig] = useState({
    base: 1,
    v0: 1,
    v1: 1,
    v2: 1,
    v3: 1,
    v4: 1,
    v5: 1,
    // Below is default
    // j0: 0,
    // j1: 0,
    // j2: -Math.PI / 2,
    // j3: 0,
    // j4: Math.PI / 2,
    // j5: Math.PI,
    // x: 5,
    // y: 0,
    // z: 10,
    // r1: 0,
    // r2: 0,
    // r3: 0,
    // Below is for sideways testing
    // j0: 0,
    // j1: 0,
    // j2: -Math.PI / 2,
    // j3: 0,
    // j4: 0,
    // j5: 0,
    // x: 9.5,
    // y: 0,
    // z: 5.5,
    // r1: -90,
    // r2: -90,
    // r3: 0,
    x: 7,
    y: -1,
    z: 9.5,
    r1: -90,
    r2: -90,
    r3: 0,
    // For other dims
  });

  const toggleColorScheme = () => {
    setColorScheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    document.getElementById('app-html').classList.toggle('spectrum--light');
    document.getElementById('app-html').classList.toggle('spectrum--darkest');
  };

  const toggleNav = () => {
    setNavOpen((prev) => !prev);
  };

  const closeNav = () => {
    setNavOpen(false);
  };

  const toggleOrbital = () => {
    setOrbitalEnabled((prev) => !prev);
  };

  const value = {
    colorScheme,
    setColorScheme,
    toggleColorScheme,
    navOpen,
    closeNav,
    toggleNav,
    config,
    setConfig,
    RobotKin,
    orbitEnabled,
    toggleOrbital,
    control,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
