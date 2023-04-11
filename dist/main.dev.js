"use strict";

VANTA.GLOBE({
  el: ".vanta-canvas",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00,
  scale: 1.00,
  scaleMobile: 1.00
});
document.querySelector('.vanta-canvas').style.width = '100%';
document.querySelector('.vanta-canvas').style.minHeight = 'calc(84vh - 100px)';