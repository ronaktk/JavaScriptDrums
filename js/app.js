// Initiate engine to draw to DOM canvas with id "myCanvas" and detail its
// dimensions.
jmParticleEngine.init('myCanvas', window.innerWidth, window.innerHeight);

// Define a particle generators - each generates particles of one particle type.

function particleGenerator() {
  var size = jmParticleEngine.randomNumber(20, undefined, true);
  // Note context of this is bound to the emitter calling the function,
  // so we can simply grab the emitter's x and y for its starting point.
  return jmParticleEngine.generateParticle(
      // Start at the emitter's x co-ordinate.
      this.x,
      // Start at the emitter's y co-ordinate.
      this.y,
      // Width.
      size,
      // Height.
      size,
      // Rotation.
      0,
      // xVelocity.
      jmParticleEngine.randomNumber(15, 7.5, false),
      // yVelocity.
      jmParticleEngine.randomNumber(15, 7.5, false),
      // Life.
      64,
      // How will particle change size vs life.
      // 0 - no change, same size always.
      // 1 - smaller with age.
      // 2 - larger with age.
      0,
      // Red.
      jmParticleEngine.randomNumber(255, 0, true),
      // Green.
      jmParticleEngine.randomNumber(64, 0, true),
      // Blue.
      jmParticleEngine.randomNumber(32, 0, true)
  );
}

// Generate emitters using the particle generator function defined above.

var emit = jmParticleEngine.generateEmitter(Math.ceil(window.innerWidth / 4),
    Math.ceil(window.innerHeight / 2), 1000, particleGenerator);

jmParticleEngine.addEmitter(emit, true);

// Attach emitters to mouse position.
jmParticleEngine.attachHandler('myCanvas', 'mousemove', function(e){
  if (!e) {
    e = window.event;
  }
  emit.x = e.clientX;
  emit.y = e.clientY;
});

// Event listener for changing particle effect dropdown.
jmParticleEngine.attachHandler('changer', 'change', function(e){
  if (!e) {
    e = window.event;
  }
  var sel = document.getElementById('changer');
  var val = sel[sel.selectedIndex].value;
  emit.stop();
  if (val === '1') {
    emit.start();
  }
});
