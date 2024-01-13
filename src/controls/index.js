function easeOutQuad(x) {
  return 1 - (1 - x) * (1 - x);
}

const userControls = {};

const handleUserKeyDown = (e) => {
  userControls[e.key.toLowerCase()] = true;
};

const handleUserKeyUp = (e) => {
  userControls[e.key.toLowerCase()] = false;
};

window.addEventListener("keydown", handleUserKeyDown);
window.addEventListener("keyup", handleUserKeyUp);

const maxAngularVelocity = 0.04;
let jawAngularVelocity = 0;
let pitchAngularVelocity = 0;
const shipMovementSpeed = 0.006;
let turboBoost = 0;

export function updateSpaceshipAxis(xAxis, yAxis, zAxis, shipPosition, camera) {
  jawAngularVelocity *= 0.95;
  pitchAngularVelocity *= 0.95;

  jawAngularVelocity = Math.abs(jawAngularVelocity) > maxAngularVelocity ? Math.sign(jawAngularVelocity) * maxAngularVelocity : jawAngularVelocity;
  pitchAngularVelocity = Math.abs(pitchAngularVelocity) > maxAngularVelocity ? Math.sign(pitchAngularVelocity) * maxAngularVelocity : pitchAngularVelocity;

  if (userControls["a"]) jawAngularVelocity += 0.0025;
  if (userControls["d"]) jawAngularVelocity -= 0.0025;
  if (userControls["w"]) pitchAngularVelocity -= 0.0025;
  if (userControls["s"]) pitchAngularVelocity += 0.0025;

  if (userControls["r"]) {
    jawAngularVelocity = 0;
    pitchAngularVelocity = 0;
    turboBoost = 0;
    xAxis.set(1, 0, 0);
    yAxis.set(0, 1, 0);
    zAxis.set(0, 0, 1);
    shipPosition.set(0, 3, 7);
  }

  xAxis.applyAxisAngle(zAxis, jawAngularVelocity);
  yAxis.applyAxisAngle(zAxis, jawAngularVelocity);
  yAxis.applyAxisAngle(xAxis, pitchAngularVelocity);
  zAxis.applyAxisAngle(xAxis, pitchAngularVelocity);

  xAxis.normalize();
  yAxis.normalize();
  zAxis.normalize();

  if (userControls.shift) turboBoost += 0.025;
  else turboBoost *= 0.95;

  turboBoost = Math.min(Math.max(turboBoost, 0), 1);

  const turboSpeed = easeOutQuad(turboBoost) * 0.02;

  camera.fov = 45 + turboSpeed * 900;
  camera.updateProjectionMatrix();

  shipPosition.add(zAxis.clone().multiplyScalar(-shipMovementSpeed - turboSpeed));
}