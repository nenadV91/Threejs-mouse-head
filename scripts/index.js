const app = new App({ setup, animate });
app.useOrbitControls = false;

window.addEventListener('resize', app.handleResize, false);
window.addEventListener('mousemove', handleMouseMove, false);
window.addEventListener('click', handleClick, false);
window.onload = app.init;

const controls = { 
  wireframe: false,
  opacity: 0.75
};

let shape;
var mouse = new THREE.Vector2();
var radians = Math.PI / 180;
let freeze = false;


function setup(app) {
  var ambientLight = new THREE.AmbientLight(0x111111, 1.5);
  ambientLight.name = 'ambient';
  app.scene.add(ambientLight);


  var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(0, 10, 30);
  directionalLight.name = 'directional';
  app.scene.add(directionalLight);


  shape = createShape();
  app.scene.add(shape);
  window.shape = shape;


  app.addControlGui(gui => {
    gui.add(controls, 'opacity', 0, 1);
    gui.add(controls, 'wireframe');
  });
}

function animate(app) {
  TWEEN.update();
  shape.material.map.needsUpdate = true;
  shape.material.opacity = controls.opacity;
  shape.material.wireframe = controls.wireframe

  updateShape();
}



function createEarthMaterial() {
  const options = { wireframe: true, transparent: true }
  return new THREE.MeshPhongMaterial(options);
}

function createCanvasMaterial() {
  const texture = new THREE.Texture(createCanvas());
  const material = new THREE.MeshPhongMaterial();
  texture.minFilter = THREE.LinearFilter;

  material.map = texture;
  material.transparent = true;
  material.opacity = 0.6;

  return material;
}

function createShape() {
  const material = createCanvasMaterial();
  const geometry = new THREE.SphereGeometry(15, 60, 60);
  const mesh = new THREE.Mesh( geometry, material );
  mesh.name = 'shape';
  return mesh;
}



function handleMouseMove(event) {
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

function updateShape() {
  shape.rotation.y = (-mouse.x * -65 + 90) * radians - Math.PI;
  shape.rotation.z = (mouse.y * 35) * radians;
}



function handleClick() {
  jump()
}
