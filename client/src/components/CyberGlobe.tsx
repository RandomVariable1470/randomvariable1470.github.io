import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Line } from "@react-three/drei";
import * as THREE from "three";
import React from "react";

// Convert lat/lng to 3D position on sphere
const latLngToVector3 = (lat: number, lng: number, radius: number) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
};

// New Delhi coordinates
const NEW_DELHI = { lat: 28.6139, lng: 77.209 };

// Major city coordinates for city lights effect
const MAJOR_CITIES = [
  { lat: 40.7128, lng: -74.006, name: "New York" },
  { lat: 51.5074, lng: -0.1278, name: "London" },
  { lat: 35.6762, lng: 139.6503, name: "Tokyo" },
  { lat: 48.8566, lng: 2.3522, name: "Paris" },
  { lat: -33.8688, lng: 151.2093, name: "Sydney" },
  { lat: 55.7558, lng: 37.6173, name: "Moscow" },
  { lat: 1.3521, lng: 103.8198, name: "Singapore" },
  { lat: 25.2048, lng: 55.2708, name: "Dubai" },
  { lat: 52.52, lng: 13.405, name: "Berlin" },
  { lat: 34.0522, lng: -118.2437, name: "Los Angeles" },
  { lat: 28.6139, lng: 77.209, name: "New Delhi" },
];

const generateArcPoints = (
  start: { lat: number; lng: number },
  end: { lat: number; lng: number },
  radius: number,
  segments: number = 50
): [number, number, number][] => {
  const startVec = latLngToVector3(start.lat, start.lng, radius);
  const endVec = latLngToVector3(end.lat, end.lng, radius);

  const points: [number, number, number][] = [];

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const point = new THREE.Vector3().lerpVectors(startVec, endVec, t);
    point.normalize();
    const arcHeight = Math.sin(t * Math.PI) * 0.3;
    point.multiplyScalar(radius + arcHeight);
    points.push([point.x, point.y, point.z]);
  }

  return points;
};

const CyberEarth = () => {
  const globeRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  const continentParticles = useMemo(() => {
    const positions: number[] = [];
    const count = 600; // Reduced particle count for performance

    for (let i = 0; i < count; i++) {
      const lat = (Math.random() - 0.5) * 140;
      const lng = (Math.random() - 0.5) * 360;

      const isLand =
        (lat > 15 && lat < 70 && lng > -170 && lng < -50) ||
        (lat > -60 && lat < 15 && lng > -85 && lng < -30) ||
        (lat > 35 && lat < 72 && lng > -10 && lng < 60) ||
        (lat > -35 && lat < 37 && lng > -20 && lng < 55) ||
        (lat > 5 && lat < 75 && lng > 60 && lng < 150);

      if (isLand && Math.random() > 0.4) {
        const pos = latLngToVector3(lat, lng, 2.01);
        positions.push(pos.x, pos.y, pos.z);
      }
    }
    return new Float32Array(positions);
  }, []);

  const equatorPoints = useMemo((): [number, number, number][] => {
    const points: [number, number, number][] = [];
    for (let i = 0; i <= 64; i++) {
      const theta = (i / 64) * Math.PI * 2;
      points.push([2.03 * Math.cos(theta), 0, 2.03 * Math.sin(theta)]);
    }
    return points;
  }, []);

  const delhiPosition = latLngToVector3(NEW_DELHI.lat, NEW_DELHI.lng, 2.08);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0005;
    }
  });

  return (
    <group ref={globeRef}>
      {/* Core dark sphere */}
      <mesh>
        <sphereGeometry args={[1.98, 64, 64]} />
        <meshBasicMaterial color="#0a0a0f" transparent opacity={0.95} />
      </mesh>

      {/* Grid wireframe */}
      <mesh>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial color="#2dd4bf" wireframe transparent opacity={0.1} />
      </mesh>

      {/* Equator line - glowing */}
      <Line points={equatorPoints} color="#2dd4bf" lineWidth={1} transparent opacity={0.6} />

      {/* Continent particle points */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[continentParticles, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#5eead4" size={0.025} transparent opacity={0.6} sizeAttenuation />
      </points>

      {/* City hub markers */}
      {MAJOR_CITIES.map((city, i) => {
        const pos = latLngToVector3(city.lat, city.lng, 2.03);
        return (
          <mesh key={`hub-${i}`} position={[pos.x, pos.y, pos.z]}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshBasicMaterial color="#5eead4" transparent opacity={0.8} />
          </mesh>
        );
      })}

      {/* Atmosphere glow */}
      <mesh scale={1.12}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshBasicMaterial color="#2dd4bf" transparent opacity={0.05} side={THREE.BackSide} />
      </mesh>

      {/* New Delhi pin */}
      <group position={delhiPosition}>
        <mesh>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#2dd4bf" transparent opacity={0.9} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        <pointLight color="#2dd4bf" intensity={2} distance={1} />
      </group>
    </group>
  );
};

// Error Boundary for WebGL context loss
class GlobeErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) return <div className="h-full flex items-center justify-center text-primary/50 text-xs">WebGL Error</div>;
    return this.props.children;
  }
}

const CyberGlobe = () => {
  return (
    <div className="relative h-64 w-full bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden group hover:border-primary/30 transition-colors">
      <div className="absolute top-4 left-4 z-10">
        <h3 className="text-primary font-mono text-[10px] uppercase font-bold tracking-widest mb-1">Base of Operations</h3>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <p className="text-sm font-bold text-foreground">New Delhi, India</p>
        </div>
      </div>

      <GlobeErrorBoundary>
        <Canvas
          camera={{ position: [0, 0, 5.5], fov: 45 }}
          style={{ background: 'transparent' }}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={0.8} color="#ffffff" />
          <pointLight position={[-10, -5, -10]} intensity={0.5} color="#2dd4bf" />

          <React.Suspense fallback={null}>
            <CyberEarth />
          </React.Suspense>

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={1.0}
            minPolarAngle={Math.PI / 2.5}
            maxPolarAngle={Math.PI / 1.5}
          />
        </Canvas>
      </GlobeErrorBoundary>
    </div>
  );
};

export default CyberGlobe;
