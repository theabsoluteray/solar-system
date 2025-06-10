// Three.js Solar System Simulation

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// Lighting
const sunLight = new THREE.PointLight(0xffffff, 1.5);
scene.add(sunLight);
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

// Sun
const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);
sunLight.position.set(0, 0, 0);

// Planets data
const planetsData = [
  { name: 'Mercury', radius: 0.4, distance: 10, speed: 0.01, color: 0x888888 },
  { name: 'Venus', radius: 0.6, distance: 15, speed: 0.008, color: 0xe39e1c },
  { name: 'Earth', radius: 0.7, distance: 20, speed: 0.006, color: 0x2233ff },
  { name: 'Mars', radius: 0.5, distance: 25, speed: 0.004, color: 0xc1440e },
  { name: 'Jupiter', radius: 1.5, distance: 35, speed: 0.002, color: 0xd8ca9d },
  { name: 'Saturn', radius: 1.2, distance: 45, speed: 0.0015, color: 0xead6b8 },
  { name: 'Uranus', radius: 0.9, distance: 55, speed: 0.001, color: 0x5580aa },
  { name: 'Neptune', radius: 0.9, distance: 65, speed: 0.0008, color: 0x366896 }
];

// Create planets
const planets = [];
planetsData.forEach(data => {
  const geometry = new THREE.SphereGeometry(data.radius, 32, 32);
  const material = new THREE.MeshPhongMaterial({ color: data.color });
  const planet = new THREE.Mesh(geometry, material);
  const orbit = new THREE.Object3D();
  orbit.add(planet);
  planet.position.x = data.distance;
  scene.add(orbit);
  planets.push({ mesh: planet, orbit: orbit, speed: data.speed, name: data.name });
});

// Camera position
camera.position.z = 100;

// Animation loop
const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();
  planets.forEach(planet => {
    planet.orbit.rotation.y += planet.speed;
    planet.mesh.rotation.y += 0.01;
  });
  renderer.render(scene, camera);
}
animate();

// Speed control UI
const controlsDiv = document.getElementById('controls');
planets.forEach(planet => {
  const label = document.createElement('div');
  label.textContent = planet.name;
  controlsDiv.appendChild(label);
  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = 0;
  slider.max = 0.02;
  slider.step = 0.001;
  slider.value = planet.speed;
  slider.oninput = (e) => {
    planet.speed = parseFloat(e.target.value);
  };
  controlsDiv.appendChild(slider);
});

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}); 