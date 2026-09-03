import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { 
  Sun, 
  Rotate3d, 
  Maximize2, 
  Minimize2, 
  Layers, 
  Grid3X3, 
  Compass, 
  Sparkles, 
  Droplets, 
  CloudSun, 
  Activity, 
  ShieldCheck, 
  Zap, 
  Thermometer, 
  ArrowUpRight,
  Info,
  CheckCircle2,
  Eye,
  Sliders
} from 'lucide-react';
import { Translation } from '../translations';

interface Solar3DStudioProps {
  t: Translation;
}

type ViewMode = 'single' | 'array' | 'exploded' | 'tracker';
type WeatherMode = 'sunny' | 'cloudy' | 'soiled';

export default function Solar3DStudio({ t }: Solar3DStudioProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // User Interactive States
  const [viewMode, setViewMode] = useState<ViewMode>('single');
  const [timeOfDay, setTimeOfDay] = useState<number>(12.5); // 12:30 PM (peak sun)
  const [tiltAngle, setTiltAngle] = useState<number>(32); // 32° is optimal for Uzbekistan
  const [weatherMode, setWeatherMode] = useState<WeatherMode>('sunny');
  const [isAutoRotate, setIsAutoRotate] = useState<boolean>(false);
  const [isCleaning, setIsCleaning] = useState<boolean>(false);
  const [cleanProgress, setCleanProgress] = useState<number>(100);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [selectedLayer, setSelectedLayer] = useState<number | null>(null);

  // Three.js References
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sunLightRef = useRef<THREE.DirectionalLight | null>(null);
  const sunSphereRef = useRef<THREE.Mesh | null>(null);
  const rootGroupRef = useRef<THREE.Group | null>(null);
  const explodedGroupRef = useRef<THREE.Group | null>(null);
  const singleGroupRef = useRef<THREE.Group | null>(null);
  const arrayGroupRef = useRef<THREE.Group | null>(null);
  const trackerGroupRef = useRef<THREE.Group | null>(null);
  const dustMeshRef = useRef<THREE.Mesh | null>(null);
  const waterParticlesRef = useRef<THREE.Points | null>(null);

  // Camera Orbit State
  const orbitRef = useRef({
    isDragging: false,
    prevMouseX: 0,
    prevMouseY: 0,
    spherical: {
      radius: 4.5,
      theta: Math.PI / 4, // Horizontal angle (45 deg)
      phi: Math.PI / 3    // Vertical angle (60 deg from Y-axis)
    },
    target: new THREE.Vector3(0, 0.4, 0)
  });

  // Calculate live engineering physics metrics
  const telemetry = useMemo(() => {
    // Sun elevation based on timeOfDay (6h to 19h)
    // 6:00 -> 0 deg, 12:30 -> ~70 deg (Summer Tashkent latitude 41°N)
    const hourNormalized = (timeOfDay - 6) / 13; // 0 to 1
    const sunElevationDeg = Math.sin(hourNormalized * Math.PI) * 72; // max 72° at noon
    const sunAzimuthDeg = (timeOfDay - 12.5) * 15; // 0° is True South, -deg East, +deg West

    // Base Irradiance
    let baseIrradiance = 0;
    if (sunElevationDeg > 0) {
      baseIrradiance = Math.sin((sunElevationDeg * Math.PI) / 180) * 1050; // W/m²
    }

    if (weatherMode === 'cloudy') {
      baseIrradiance *= 0.42;
    } else if (weatherMode === 'soiled') {
      baseIrradiance *= 0.82; // 18% soiling loss
    }

    // Alignment factor: how well does the panel tilt face the sun elevation
    // Panel faces south at angle tiltAngle. Sun elevation is sunElevationDeg
    const effectiveTilt = viewMode === 'tracker' 
      ? Math.max(10, Math.min(55, 90 - sunElevationDeg)) 
      : tiltAngle;

    const angleDiffRad = Math.abs((90 - sunElevationDeg) - effectiveTilt) * (Math.PI / 180);
    const cosFactor = Math.max(0.05, Math.cos(angleDiffRad));
    
    // Albedo contribution from ground (bifaciality factor ~22% extra)
    const bifacialGain = 1.15; // 15% average backside albedo in arid Uzbekistan soil

    const moduleRatingW = 650; // 650W TOPCon module
    const currentW = Math.round(
      (baseIrradiance / 1000) * cosFactor * bifacialGain * (moduleRatingW / 1.15) * (cleanProgress / 100)
    );

    const actualOutput = Math.max(0, Math.min(710, currentW));
    const totalOutputWatts = viewMode === 'array' ? actualOutput * 9 : actualOutput;
    const efficiency = (22.8 * (cleanProgress / 100) * (weatherMode === 'soiled' ? 0.82 : 1)).toFixed(1);
    const cellTemp = Math.round(25 + (baseIrradiance / 1000) * 28 * (weatherMode === 'sunny' ? 1 : 0.6));
    const dailyEstKWh = (
      (totalOutputWatts * (viewMode === 'array' ? 6.2 : 0.68) * 5.4) / 1000
    ).toFixed(2);
    const co2OffsetKg = (parseFloat(dailyEstKWh) * 0.76).toFixed(2);

    return {
      sunElevationDeg: Math.round(sunElevationDeg),
      sunAzimuthDeg: Math.round(sunAzimuthDeg),
      effectiveTilt: Math.round(effectiveTilt),
      irradiance: Math.round(baseIrradiance * cosFactor),
      actualOutput: totalOutputWatts,
      efficiency,
      cellTemp,
      dailyEstKWh,
      co2OffsetKg,
      isPeak: Math.abs(effectiveTilt - 32) <= 3 && Math.abs(timeOfDay - 12.5) <= 1.5
    };
  }, [timeOfDay, tiltAngle, weatherMode, viewMode, cleanProgress]);

  // Handle robotic cleaning trigger
  const handleStartCleaning = () => {
    if (isCleaning) return;
    setIsCleaning(true);
    let prog = 0;
    const interval = setInterval(() => {
      prog += 5;
      if (prog >= 100) {
        clearInterval(interval);
        setIsCleaning(false);
        setCleanProgress(100);
        setWeatherMode('sunny');
      } else {
        setCleanProgress(prog);
      }
    }, 80);
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Camera preset handlers
  const setCameraPreset = (preset: 'front' | 'side' | 'rear' | 'iso') => {
    const orb = orbitRef.current;
    if (preset === 'front') {
      orb.spherical.theta = 0;
      orb.spherical.phi = Math.PI / 2.6;
      orb.spherical.radius = 3.6;
    } else if (preset === 'side') {
      orb.spherical.theta = -Math.PI / 2;
      orb.spherical.phi = Math.PI / 2.4;
      orb.spherical.radius = 3.8;
    } else if (preset === 'rear') {
      orb.spherical.theta = Math.PI;
      orb.spherical.phi = Math.PI / 2.5;
      orb.spherical.radius = 3.8;
    } else {
      orb.spherical.theta = Math.PI / 4;
      orb.spherical.phi = Math.PI / 3;
      orb.spherical.radius = 4.5;
    }
  };

  // Three.js Initialization
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const width = mount.clientWidth || 800;
    const height = mount.clientHeight || 560;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    mount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lights
    const hemiLight = new THREE.HemisphereLight(0xe0f2fe, 0x1e293b, 0.65);
    scene.add(hemiLight);

    const sunLight = new THREE.DirectionalLight(0xfff7ed, 2.5);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 25;
    const shadowSize = 4;
    sunLight.shadow.camera.left = -shadowSize;
    sunLight.shadow.camera.right = shadowSize;
    sunLight.shadow.camera.top = shadowSize;
    sunLight.shadow.camera.bottom = -shadowSize;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);
    sunLightRef.current = sunLight;

    // Visual Sun Sphere in the sky
    const sunGeo = new THREE.SphereGeometry(0.25, 32, 32);
    const sunMat = new THREE.MeshBasicMaterial({ color: 0xffb800 });
    const sunSphere = new THREE.Mesh(sunGeo, sunMat);
    scene.add(sunSphere);
    sunSphereRef.current = sunSphere;

    // Ground & Grid
    const groundGeo = new THREE.PlaneGeometry(30, 30);
    const groundMat = new THREE.MeshStandardMaterial({ 
      color: 0x090e17, 
      roughness: 0.9, 
      metalness: 0.1 
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.55;
    ground.receiveShadow = true;
    scene.add(ground);

    const gridHelper = new THREE.GridHelper(20, 20, 0x0284c7, 0x1e293b);
    gridHelper.position.y = -0.54;
    scene.add(gridHelper);

    // Root Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);
    rootGroupRef.current = rootGroup;

    // Helper to build procedural solar cell texture
    const createCellTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Deep monocrystalline dark silicon background with anti-reflective coating
        const grad = ctx.createLinearGradient(0, 0, 512, 1024);
        grad.addColorStop(0, '#06172d');
        grad.addColorStop(0.5, '#040d1a');
        grad.addColorStop(1, '#061830');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 512, 1024);

        // Draw 132 half-cut cell divisions (2 columns of 66 half cells, or 6x22 grid)
        const cols = 6;
        const rows = 22;
        const cellW = 512 / cols;
        const cellH = 1024 / rows;

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const x = c * cellW;
            const y = r * cellH;

            // Semi-octagonal wafer chamfers
            ctx.fillStyle = '#0a2344';
            ctx.fillRect(x + 1.5, y + 1.5, cellW - 3, cellH - 3);

            // 16 Multi-Busbars (ultra-fine silver conductive ribbons)
            ctx.strokeStyle = 'rgba(215, 230, 255, 0.65)';
            ctx.lineWidth = 0.8;
            const busbars = 4; // visible ribbons per mini cell
            for (let b = 1; b <= busbars; b++) {
              const bx = x + (cellW / (busbars + 1)) * b;
              ctx.beginPath();
              ctx.moveTo(bx, y + 2);
              ctx.lineTo(bx, y + cellH - 2);
              ctx.stroke();
            }

            // Sub-grid cell borders (white EVA gaps)
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1.2;
            ctx.strokeRect(x, y, cellW, cellH);
          }
        }

        // Center split gap for half-cell architecture (reduces shading loss)
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 508, 512, 8);
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1;
        ctx.strokeRect(0, 508, 512, 8);
      }
      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;
      return texture;
    };

    const cellTexture = createCellTexture();

    // Reusable Materials
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.94,
      opacity: 0.95,
      transparent: true,
      roughness: 0.05,
      metalness: 0.1,
      ior: 1.52, // Glass index of refraction
      reflectivity: 0.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04
    });

    const cellMat = new THREE.MeshStandardMaterial({
      map: cellTexture,
      roughness: 0.28,
      metalness: 0.65
    });

    const frameMat = new THREE.MeshStandardMaterial({
      color: 0xcfd8dc,
      roughness: 0.35,
      metalness: 0.85
    });

    const rearGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0xdbeafe,
      transmission: 0.85,
      opacity: 0.88,
      transparent: true,
      roughness: 0.12,
      metalness: 0.2
    });

    const steelMountMat = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      roughness: 0.5,
      metalness: 0.75
    });

    const jBoxMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.4,
      metalness: 0.2
    });

    // --- Build Mode 1: Single Module (Dimensions: 1.134m width x 2.278m height) ---
    const singleGroup = new THREE.Group();
    singleGroupRef.current = singleGroup;

    const pw = 1.134; // meters
    const ph = 2.278; // meters
    const pd = 0.035; // 35mm frame depth

    // Panel Assembly Container
    const panelPivot = new THREE.Group();
    panelPivot.name = 'panelPivot';

    // Solar cells plane
    const cellsGeo = new THREE.PlaneGeometry(pw - 0.04, ph - 0.04);
    const cellsMesh = new THREE.Mesh(cellsGeo, cellMat);
    cellsMesh.castShadow = true;
    panelPivot.add(cellsMesh);

    // Front Tempered Glass
    const frontGlassGeo = new THREE.PlaneGeometry(pw - 0.02, ph - 0.02);
    const frontGlassMesh = new THREE.Mesh(frontGlassGeo, glassMat);
    frontGlassMesh.position.z = 0.003;
    panelPivot.add(frontGlassMesh);

    // Dust Layer on Front Glass (semi-transparent desert dust)
    const dustGeo = new THREE.PlaneGeometry(pw - 0.02, ph - 0.02);
    const dustMat = new THREE.MeshStandardMaterial({
      color: 0xc89d66, // warm dust color
      roughness: 0.95,
      metalness: 0.05,
      transparent: true,
      opacity: 0.0
    });
    const dustMesh = new THREE.Mesh(dustGeo, dustMat);
    dustMesh.position.z = 0.004;
    panelPivot.add(dustMesh);
    dustMeshRef.current = dustMesh;

    // Rear Bifacial Glass
    const rearGlassGeo = new THREE.PlaneGeometry(pw - 0.02, ph - 0.02);
    const rearGlassMesh = new THREE.Mesh(rearGlassGeo, rearGlassMat);
    rearGlassMesh.position.z = -0.003;
    rearGlassMesh.rotation.y = Math.PI;
    panelPivot.add(rearGlassMesh);

    // Aluminium Frame Outer Box (Extruded Border)
    const frameGroup = new THREE.Group();
    const borderThickness = 0.025;

    // Top / Bottom Frame rails
    const tbGeo = new THREE.BoxGeometry(pw, borderThickness, pd);
    const topFrame = new THREE.Mesh(tbGeo, frameMat);
    topFrame.position.y = ph / 2 - borderThickness / 2;
    topFrame.castShadow = true;
    const btmFrame = new THREE.Mesh(tbGeo, frameMat);
    btmFrame.position.y = -ph / 2 + borderThickness / 2;
    btmFrame.castShadow = true;
    frameGroup.add(topFrame, btmFrame);

    // Left / Right Frame rails
    const lrGeo = new THREE.BoxGeometry(borderThickness, ph, pd);
    const leftFrame = new THREE.Mesh(lrGeo, frameMat);
    leftFrame.position.x = -pw / 2 + borderThickness / 2;
    leftFrame.castShadow = true;
    const rightFrame = new THREE.Mesh(lrGeo, frameMat);
    rightFrame.position.x = pw / 2 - borderThickness / 2;
    rightFrame.castShadow = true;
    frameGroup.add(leftFrame, rightFrame);
    panelPivot.add(frameGroup);

    // Split Junction Boxes on Rear (3 boxes for TOPCon diodes)
    const jBoxGeo = new THREE.BoxGeometry(0.12, 0.08, 0.03);
    for (let j = -1; j <= 1; j++) {
      const jBox = new THREE.Mesh(jBoxGeo, jBoxMat);
      jBox.position.set(j * 0.35, 0.45, -0.02);
      jBox.castShadow = true;
      panelPivot.add(jBox);
    }

    // Mounting Structure (Industrial Unistrut Galvanized Legs)
    const mountStructure = new THREE.Group();
    const legGeo = new THREE.CylinderGeometry(0.025, 0.025, 1.4, 16);
    const leg1 = new THREE.Mesh(legGeo, steelMountMat);
    leg1.position.set(-pw / 2 + 0.15, -0.2, -0.35);
    leg1.rotation.x = 0.2;
    leg1.castShadow = true;

    const leg2 = new THREE.Mesh(legGeo, steelMountMat);
    leg2.position.set(pw / 2 - 0.15, -0.2, -0.35);
    leg2.rotation.x = 0.2;
    leg2.castShadow = true;

    // Cross-strut
    const strutGeo = new THREE.BoxGeometry(pw + 0.1, 0.04, 0.04);
    const strut = new THREE.Mesh(strutGeo, steelMountMat);
    strut.position.set(0, -0.1, -0.35);
    strut.castShadow = true;
    mountStructure.add(leg1, leg2, strut);

    singleGroup.add(panelPivot);
    singleGroup.add(mountStructure);
    rootGroup.add(singleGroup);

    // --- Build Mode 2: Industrial Solar Array (3x3 = 9 panels) ---
    const arrayGroup = new THREE.Group();
    arrayGroupRef.current = arrayGroup;
    arrayGroup.visible = false;

    const spacingX = pw + 0.04;
    const spacingY = ph + 0.06;

    for (let row = -1; row <= 1; row++) {
      for (let col = -1; col <= 1; col++) {
        const miniPanel = panelPivot.clone();
        miniPanel.position.set(col * spacingX, 0.6, row * 0.85);
        miniPanel.scale.set(0.9, 0.9, 0.9);
        miniPanel.rotation.x = -THREE.MathUtils.degToRad(32);
        arrayGroup.add(miniPanel);
      }
    }

    // Industrial Central String Inverter on Array Corner
    const inverterGeo = new THREE.BoxGeometry(0.5, 0.8, 0.3);
    const inverterMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.3 });
    const inverter = new THREE.Mesh(inverterGeo, inverterMat);
    inverter.position.set(pw * 1.8, -0.1, 1.2);
    inverter.castShadow = true;
    arrayGroup.add(inverter);
    rootGroup.add(arrayGroup);

    // --- Build Mode 3: Exploded Layer View (7 Layers) ---
    const explodedGroup = new THREE.Group();
    explodedGroupRef.current = explodedGroup;
    explodedGroup.visible = false;

    const layerItems = [
      { name: 'glass', geo: frontGlassGeo, mat: glassMat, offsetZ: 0.55, label: '3.2mm Anti-Reflective Glass' },
      { name: 'evaTop', geo: cellsGeo, mat: new THREE.MeshStandardMaterial({ color: 0xe0f2fe, transparent: true, opacity: 0.5 }), offsetZ: 0.38, label: 'EVA Encapsulant Film' },
      { name: 'cells', geo: cellsGeo, mat: cellMat, offsetZ: 0.20, label: '132 N-Type TOPCon Half-Cells (16BB)' },
      { name: 'evaBottom', geo: cellsGeo, mat: new THREE.MeshStandardMaterial({ color: 0xbae6fd, transparent: true, opacity: 0.5 }), offsetZ: 0.02, label: 'Bottom POE Encapsulant' },
      { name: 'backsheet', geo: rearGlassGeo, mat: rearGlassMat, offsetZ: -0.16, label: 'Bifacial Transparent Backsheet' },
      { name: 'frame', geo: tbGeo, mat: frameMat, offsetZ: -0.34, label: '35mm Anodized Aluminium Frame' },
      { name: 'jbox', geo: jBoxGeo, mat: jBoxMat, offsetZ: -0.52, label: 'IP68 Junction Box with Diodes' }
    ];

    layerItems.forEach((layer, idx) => {
      const mesh = new THREE.Mesh(layer.geo, layer.mat);
      mesh.position.z = layer.offsetZ;
      mesh.name = `layer-${idx}`;
      explodedGroup.add(mesh);

      // Connecting guide rod
      const rodGeo = new THREE.CylinderGeometry(0.003, 0.003, 1.1, 8);
      const rodMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.4 });
      const rodL = new THREE.Mesh(rodGeo, rodMat);
      rodL.rotation.x = Math.PI / 2;
      rodL.position.set(-pw / 2 + 0.05, ph / 2 - 0.05, 0);
      explodedGroup.add(rodL);
    });

    rootGroup.add(explodedGroup);

    // --- Build Mode 4: Sun Tracker (Single-axis horizontal motor tube) ---
    const trackerGroup = new THREE.Group();
    trackerGroupRef.current = trackerGroup;
    trackerGroup.visible = false;

    const torqueTubeGeo = new THREE.CylinderGeometry(0.06, 0.06, pw * 2.8, 16);
    const torqueTube = new THREE.Mesh(torqueTubeGeo, steelMountMat);
    torqueTube.rotation.z = Math.PI / 2;
    torqueTube.position.y = 0.2;
    torqueTube.castShadow = true;

    const slewingMotorGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.25, 16);
    const motorMat = new THREE.MeshStandardMaterial({ color: 0xf97316 });
    const slewingMotor = new THREE.Mesh(slewingMotorGeo, motorMat);
    slewingMotor.position.set(0, 0.2, 0);
    slewingMotor.rotation.x = Math.PI / 2;

    const trackerPanel = panelPivot.clone();
    trackerPanel.position.set(0, 0.2, 0);
    trackerGroup.add(torqueTube, slewingMotor, trackerPanel);
    rootGroup.add(trackerGroup);

    // Water particles for Jet Washing animation
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let p = 0; p < particleCount * 3; p += 3) {
      particlePos[p] = (Math.random() - 0.5) * pw;
      particlePos[p + 1] = (Math.random() - 0.5) * ph;
      particlePos[p + 2] = 0.05 + Math.random() * 0.1;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.035,
      transparent: true,
      opacity: 0.0
    });
    const waterPoints = new THREE.Points(particleGeo, particleMat);
    singleGroup.add(waterPoints);
    waterParticlesRef.current = waterPoints;

    // Pointer event listeners for 3D Camera Orbit
    const onPointerDown = (e: PointerEvent) => {
      orbitRef.current.isDragging = true;
      orbitRef.current.prevMouseX = e.clientX;
      orbitRef.current.prevMouseY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!orbitRef.current.isDragging) return;
      const deltaX = e.clientX - orbitRef.current.prevMouseX;
      const deltaY = e.clientY - orbitRef.current.prevMouseY;
      orbitRef.current.prevMouseX = e.clientX;
      orbitRef.current.prevMouseY = e.clientY;

      orbitRef.current.spherical.theta -= deltaX * 0.007;
      orbitRef.current.spherical.phi = Math.max(
        0.1,
        Math.min(Math.PI / 2 + 0.05, orbitRef.current.spherical.phi - deltaY * 0.007)
      );
    };

    const onPointerUp = () => {
      orbitRef.current.isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      orbitRef.current.spherical.radius = Math.max(
        1.8,
        Math.min(8.5, orbitRef.current.spherical.radius + e.deltaY * 0.003)
      );
    };

    mount.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    mount.addEventListener('wheel', onWheel, { passive: false });

    // ResizeObserver for clean responsive canvas
    const resizeObserver = new ResizeObserver(() => {
      if (!mountRef.current || !rendererRef.current || !cameraRef.current) return;
      const newW = mountRef.current.clientWidth;
      const newH = mountRef.current.clientHeight;
      cameraRef.current.aspect = newW / newH;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newW, newH);
    });
    resizeObserver.observe(mount);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Auto rotation
      if (isAutoRotate && !orbitRef.current.isDragging) {
        orbitRef.current.spherical.theta += delta * 0.4;
      }

      // Convert spherical coordinates to camera position
      const orb = orbitRef.current;
      const r = orb.spherical.radius;
      const phi = orb.spherical.phi;
      const theta = orb.spherical.theta;

      camera.position.x = orb.target.x + r * Math.sin(phi) * Math.sin(theta);
      camera.position.y = orb.target.y + r * Math.cos(phi);
      camera.position.z = orb.target.z + r * Math.sin(phi) * Math.cos(theta);
      camera.lookAt(orb.target);

      // Water Particles in cleaning mode
      if (waterParticlesRef.current) {
        if (isCleaning) {
          (waterParticlesRef.current.material as THREE.PointsMaterial).opacity = 0.8;
          const pos = waterParticlesRef.current.geometry.attributes.position.array as Float32Array;
          for (let i = 1; i < pos.length; i += 3) {
            pos[i] -= delta * 2.5;
            if (pos[i] < -ph / 2) {
              pos[i] = ph / 2;
            }
          }
          waterParticlesRef.current.geometry.attributes.position.needsUpdate = true;
        } else {
          (waterParticlesRef.current.material as THREE.PointsMaterial).opacity = 0.0;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      mount.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      mount.removeEventListener('wheel', onWheel);
      if (renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update Dynamic Sun Light & Position
  useEffect(() => {
    if (!sunLightRef.current || !sunSphereRef.current) return;

    const hourNorm = (timeOfDay - 6) / 13; // 0 to 1
    const elevationRad = THREE.MathUtils.degToRad(Math.sin(hourNorm * Math.PI) * 72);
    const azimuthRad = THREE.MathUtils.degToRad((timeOfDay - 12.5) * 15);

    const sunDist = 12;
    const sunX = sunDist * Math.cos(elevationRad) * Math.sin(azimuthRad);
    const sunY = Math.max(0.2, sunDist * Math.sin(elevationRad));
    const sunZ = sunDist * Math.cos(elevationRad) * Math.cos(azimuthRad);

    sunLightRef.current.position.set(sunX, sunY, sunZ);
    sunSphereRef.current.position.set(sunX * 0.7, sunY * 0.7, sunZ * 0.7);

    // Warm sun color temperature
    if (timeOfDay < 8.5 || timeOfDay > 17.5) {
      sunLightRef.current.color.setHex(0xffaa44); // Golden Hour
      sunLightRef.current.intensity = 1.6;
    } else {
      sunLightRef.current.color.setHex(0xfff8ee); // Bright Noon
      sunLightRef.current.intensity = weatherMode === 'cloudy' ? 1.0 : 2.5;
    }
  }, [timeOfDay, weatherMode]);

  // Update Tilt Angle for Single Module & Tracker
  useEffect(() => {
    if (!singleGroupRef.current || !trackerGroupRef.current) return;

    const panelPivot = singleGroupRef.current.getObjectByName('panelPivot');
    if (panelPivot) {
      const tiltRad = THREE.MathUtils.degToRad(tiltAngle);
      panelPivot.rotation.x = -tiltRad;
    }

    if (viewMode === 'tracker') {
      const trackerAngle = (timeOfDay - 12.5) * 6; // East to West tracking (+/-45 deg)
      trackerGroupRef.current.rotation.y = THREE.MathUtils.degToRad(trackerAngle);
    }
  }, [tiltAngle, timeOfDay, viewMode]);

  // Update Active Mode Visibility
  useEffect(() => {
    if (!singleGroupRef.current || !arrayGroupRef.current || !explodedGroupRef.current || !trackerGroupRef.current) {
      return;
    }

    singleGroupRef.current.visible = viewMode === 'single';
    arrayGroupRef.current.visible = viewMode === 'array';
    explodedGroupRef.current.visible = viewMode === 'exploded';
    trackerGroupRef.current.visible = viewMode === 'tracker';

    // Adjust camera focus depending on mode
    if (viewMode === 'array') {
      orbitRef.current.spherical.radius = 6.8;
      orbitRef.current.target.set(0, 0.6, 0);
    } else if (viewMode === 'exploded') {
      orbitRef.current.spherical.radius = 4.2;
      orbitRef.current.spherical.theta = Math.PI / 3.5;
      orbitRef.current.target.set(0, 0.3, 0);
    } else {
      orbitRef.current.spherical.radius = 4.5;
      orbitRef.current.target.set(0, 0.4, 0);
    }
  }, [viewMode]);

  // Update Dust Layer Opacity
  useEffect(() => {
    if (!dustMeshRef.current) return;
    const dustMat = dustMeshRef.current.material as THREE.MeshStandardMaterial;
    if (weatherMode === 'soiled') {
      dustMat.opacity = 0.55 * (1 - cleanProgress / 100) + 0.25;
    } else {
      dustMat.opacity = 0.0;
    }
  }, [weatherMode, cleanProgress]);

  const s = t.solar3d;

  return (
    <section 
      id="solar3d" 
      ref={containerRef}
      className={`relative bg-slate-950 text-white overflow-hidden py-16 border-t border-b border-slate-900 ${
        isFullscreen ? 'fixed inset-0 z-50 p-6 flex flex-col justify-between' : ''
      }`}
    >
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 bg-brand-orange/10 border border-brand-orange/30 px-3 py-1 rounded-full text-brand-orange text-xs font-mono font-bold tracking-wider uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{s.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
              {s.title}
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mt-2 leading-relaxed">
              {s.subtitle}
            </p>
          </div>

          {/* Mode Selector Tabs */}
          <div className="flex flex-wrap items-center bg-slate-900 border border-slate-800 p-1.5 rounded-2xl gap-1">
            <button
              onClick={() => setViewMode('single')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'single'
                  ? 'bg-brand-orange text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>{s.modeSingle}</span>
            </button>

            <button
              onClick={() => setViewMode('array')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'array'
                  ? 'bg-brand-orange text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
              <span>{s.modeArray}</span>
            </button>

            <button
              onClick={() => setViewMode('exploded')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'exploded'
                  ? 'bg-brand-orange text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>{s.modeExploded}</span>
            </button>

            <button
              onClick={() => setViewMode('tracker')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'tracker'
                  ? 'bg-brand-orange text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>{s.modeTracker}</span>
            </button>
          </div>
        </div>

        {/* Main 3D Canvas & Studio Layout */}
        <div className="grid lg:grid-cols-12 gap-6 items-start">
          
          {/* 3D Canvas Viewport (8 Cols) */}
          <div className="lg:col-span-8 relative bg-slate-900/90 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
            
            {/* Top Toolbar Overlay */}
            <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
              
              {/* Sun Position Indicator */}
              <div className="pointer-events-auto flex items-center space-x-2.5 bg-slate-950/80 backdrop-blur-md border border-slate-800/80 px-3 py-1.5 rounded-full text-xs font-mono">
                <Sun className={`w-3.5 h-3.5 ${timeOfDay >= 11 && timeOfDay <= 14 ? 'text-amber-400' : 'text-brand-orange'}`} />
                <span className="text-slate-200">
                  {Math.floor(timeOfDay).toString().padStart(2, '0')}:
                  {Math.round((timeOfDay % 1) * 60).toString().padStart(2, '0')}
                </span>
                <span className="text-slate-500">|</span>
                <span className="text-brand-orange font-bold">{telemetry.sunElevationDeg}° Elev</span>
              </div>

              {/* View Presets & Fullscreen */}
              <div className="pointer-events-auto flex items-center space-x-1.5 bg-slate-950/80 backdrop-blur-md border border-slate-800/80 p-1 rounded-2xl">
                <button
                  onClick={() => setCameraPreset('front')}
                  title={s.viewFront}
                  className="px-2.5 py-1 text-[11px] font-mono font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                >
                  {s.viewFront}
                </button>
                <button
                  onClick={() => setCameraPreset('side')}
                  title={s.viewSide}
                  className="px-2.5 py-1 text-[11px] font-mono font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                >
                  {s.viewSide}
                </button>
                <button
                  onClick={() => setCameraPreset('rear')}
                  title={s.viewRear}
                  className="px-2.5 py-1 text-[11px] font-mono font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                >
                  {s.viewRear}
                </button>
                <button
                  onClick={() => setIsAutoRotate(!isAutoRotate)}
                  title={s.autoRotate}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    isAutoRotate ? 'bg-brand-blue text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Rotate3d className="w-4 h-4" />
                </button>
                <button
                  onClick={toggleFullscreen}
                  title="Fullscreen"
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Three.js Canvas Container */}
            <div
              ref={mountRef}
              className="w-full h-[460px] sm:h-[540px] cursor-grab active:cursor-grabbing touch-none select-none relative"
            />

            {/* Floating Live Telemetry HUD Bar on Bottom of Canvas */}
            <div className="absolute bottom-4 left-4 right-4 z-20 bg-slate-950/85 backdrop-blur-md border border-slate-800 rounded-2xl p-3 sm:p-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 block tracking-wider">
                  {s.currentOutput}
                </span>
                <span className="text-xl sm:text-2xl font-mono font-bold text-brand-orange flex items-baseline">
                  {telemetry.actualOutput} <span className="text-xs text-slate-400 ml-1 font-sans">W</span>
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 block tracking-wider">
                  {s.irradiance}
                </span>
                <span className="text-xl sm:text-2xl font-mono font-bold text-white flex items-baseline">
                  {telemetry.irradiance} <span className="text-xs text-slate-400 ml-1 font-sans">W/m²</span>
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 block tracking-wider">
                  {s.efficiency}
                </span>
                <span className="text-xl sm:text-2xl font-mono font-bold text-emerald-400 flex items-baseline">
                  {telemetry.efficiency}%
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 block tracking-wider">
                  {s.cellTemp}
                </span>
                <span className="text-xl sm:text-2xl font-mono font-bold text-sky-300 flex items-baseline">
                  {telemetry.cellTemp}°C
                </span>
              </div>
            </div>

            {/* Exploded View Layer Legend Callout */}
            {viewMode === 'exploded' && (
              <div className="absolute top-16 left-4 z-20 max-w-xs bg-slate-950/90 backdrop-blur-md border border-brand-blue/40 rounded-2xl p-3.5 shadow-xl text-xs space-y-2">
                <div className="flex items-center space-x-1.5 text-brand-orange font-mono font-bold uppercase text-[10px]">
                  <Layers className="w-3.5 h-3.5" />
                  <span>{s.moduleAnatomy}</span>
                </div>
                <ul className="space-y-1 text-[11px] text-slate-300">
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-sky-400" />
                    <span>{s.layerLabels.glass}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-400" />
                    <span>{s.layerLabels.cells}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-slate-300" />
                    <span>{s.layerLabels.frame}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>{s.layerLabels.jbox}</span>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Interactive Physics & Simulation Controls Panel (4 Cols) */}
          <div className="lg:col-span-4 space-y-5">
            
            {/* Control Group 1: Sun Trajectory Slider */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-2">
                  <Sun className="w-4 h-4 text-brand-orange" />
                  <span>{s.timeOfDay}</span>
                </label>
                <span className="text-xs font-mono font-bold text-brand-orange bg-brand-orange/10 px-2.5 py-0.5 rounded-full">
                  {Math.floor(timeOfDay)}:{Math.round((timeOfDay % 1) * 60).toString().padStart(2, '0')}
                </span>
              </div>

              <input
                type="range"
                min="6"
                max="19"
                step="0.25"
                value={timeOfDay}
                onChange={(e) => setTimeOfDay(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-orange"
              />

              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>{s.sunriseLabel}</span>
                <span className="text-amber-400 font-bold">{s.peakLabel}</span>
                <span>{s.sunsetLabel}</span>
              </div>
            </div>

            {/* Control Group 2: Tilt Angle Slider & Uzbekistan Optimal Preset */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-2">
                  <Sliders className="w-4 h-4 text-sky-400" />
                  <span>{s.tiltAngle}</span>
                </label>
                <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full ${
                  telemetry.isPeak ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-300'
                }`}>
                  {tiltAngle}° {telemetry.isPeak ? s.optimalBadge : ''}
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="60"
                step="1"
                value={tiltAngle}
                disabled={viewMode === 'tracker'}
                onChange={(e) => setTiltAngle(parseInt(e.target.value))}
                className={`w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-blue ${
                  viewMode === 'tracker' ? 'opacity-40 cursor-not-allowed' : ''
                }`}
              />

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-slate-400">
                  {s.optimalTilt}
                </span>
                <button
                  onClick={() => setTiltAngle(32)}
                  disabled={viewMode === 'tracker'}
                  className="text-xs font-mono font-bold text-brand-orange hover:text-brand-orange-light transition-colors underline cursor-pointer"
                >
                  {s.setOptimal}
                </button>
              </div>
            </div>

            {/* Control Group 3: Weather, Desert Dust Soiling & Robotic Clean */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4">
              <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-2">
                <CloudSun className="w-4 h-4 text-amber-300" />
                <span>{s.weatherCondition}</span>
              </label>

              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => { setWeatherMode('sunny'); setCleanProgress(100); }}
                  className={`p-2.5 rounded-xl text-center text-xs font-semibold transition-all border cursor-pointer ${
                    weatherMode === 'sunny'
                      ? 'bg-amber-400/10 border-amber-400/50 text-amber-300'
                      : 'bg-slate-850 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Sun className="w-4 h-4 mx-auto mb-1" />
                  <span className="block truncate text-[11px]">{s.weatherSunny.split(' ')[0]}</span>
                </button>

                <button
                  onClick={() => setWeatherMode('cloudy')}
                  className={`p-2.5 rounded-xl text-center text-xs font-semibold transition-all border cursor-pointer ${
                    weatherMode === 'cloudy'
                      ? 'bg-sky-500/10 border-sky-500/50 text-sky-300'
                      : 'bg-slate-850 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <CloudSun className="w-4 h-4 mx-auto mb-1" />
                  <span className="block truncate text-[11px]">{s.weatherCloudy.split(' ')[0]}</span>
                </button>

                <button
                  onClick={() => { setWeatherMode('soiled'); setCleanProgress(78); }}
                  className={`p-2.5 rounded-xl text-center text-xs font-semibold transition-all border cursor-pointer ${
                    weatherMode === 'soiled'
                      ? 'bg-amber-700/20 border-amber-600/50 text-amber-400'
                      : 'bg-slate-850 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Sparkles className="w-4 h-4 mx-auto mb-1" />
                  <span className="block truncate text-[11px]">{s.weatherSoiled.split(' ')[0]}</span>
                </button>
              </div>

              {/* Robotic Jet Wash Action */}
              <button
                onClick={handleStartCleaning}
                disabled={isCleaning}
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-sky-900/20 transition-all cursor-pointer text-xs"
              >
                <Droplets className={`w-4 h-4 ${isCleaning ? 'animate-bounce' : ''}`} />
                <span>{isCleaning ? `Washing (${cleanProgress}%)` : s.cleanPanels}</span>
              </button>
            </div>

            {/* Performance Estimates Box */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-5 space-y-3">
              <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                {s.specsTitle}
              </h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-850">
                  <span className="text-slate-500 text-[10px] uppercase font-mono block">{s.dailyEst}</span>
                  <span className="text-base font-bold text-white font-mono mt-0.5 block">{telemetry.dailyEstKWh} kWh</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-850">
                  <span className="text-slate-500 text-[10px] uppercase font-mono block">{s.co2Offset}</span>
                  <span className="text-base font-bold text-emerald-400 font-mono mt-0.5 block">{telemetry.co2OffsetKg} kg</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
