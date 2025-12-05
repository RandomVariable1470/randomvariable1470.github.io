import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Line } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
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
  { lat: 39.9042, lng: 116.4074, name: "Beijing" },
  { lat: -23.5505, lng: -46.6333, name: "São Paulo" },
  { lat: 19.4326, lng: -99.1332, name: "Mexico City" },
  { lat: 1.3521, lng: 103.8198, name: "Singapore" },
  { lat: 25.2048, lng: 55.2708, name: "Dubai" },
  { lat: 37.5665, lng: 126.978, name: "Seoul" },
  { lat: 52.52, lng: 13.405, name: "Berlin" },
  { lat: 34.0522, lng: -118.2437, name: "Los Angeles" },
  { lat: 22.3193, lng: 114.1694, name: "Hong Kong" },
  { lat: 19.076, lng: 72.8777, name: "Mumbai" },
  { lat: 28.6139, lng: 77.209, name: "New Delhi" },
];

// Network connections between major hubs
const NETWORK_CONNECTIONS: [number, number][] = [
  [16, 15], // New Delhi - Mumbai
  [16, 2],  // New Delhi - Tokyo
  [16, 1],  // New Delhi - London
  [16, 10], // New Delhi - Dubai
  [16, 9],  // New Delhi - Singapore
  [0, 1],   // New York - London
  [0, 13],  // New York - Los Angeles
  [0, 7],   // New York - São Paulo
  [1, 3],   // London - Paris
  [1, 12],  // London - Berlin
  [1, 10],  // London - Dubai
  [2, 11],  // Tokyo - Seoul
  [2, 6],   // Tokyo - Beijing
  [2, 14],  // Tokyo - Hong Kong
  [4, 9],   // Sydney - Singapore
  [6, 14],  // Beijing - Hong Kong
  [9, 10],  // Singapore - Dubai
  [5, 12],  // Moscow - Berlin
];

// Generate arc points between two positions on sphere
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
    // Interpolate between start and end
    const point = new THREE.Vector3().lerpVectors(startVec, endVec, t);
    // Normalize and push outward for arc effect
    point.normalize();
    // Calculate arc height - higher in the middle
    const arcHeight = Math.sin(t * Math.PI) * 0.3;
    point.multiplyScalar(radius + arcHeight);
    points.push([point.x, point.y, point.z]);
  }
  
  return points;
};

const CyberEarth = ({ isZoomed }: { isZoomed: boolean }) => {
  const globeRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const cityLightsRef = useRef<THREE.Points>(null);

  // Create continent particle positions
  const continentParticles = useMemo(() => {
    const positions: number[] = [];
    const count = 800;
    
    for (let i = 0; i < count; i++) {
      const lat = (Math.random() - 0.5) * 140;
      const lng = (Math.random() - 0.5) * 360;
      
      const isLand = 
        (lat > 15 && lat < 70 && lng > -170 && lng < -50) ||
        (lat > -60 && lat < 15 && lng > -85 && lng < -30) ||
        (lat > 35 && lat < 72 && lng > -10 && lng < 60) ||
        (lat > -35 && lat < 37 && lng > -20 && lng < 55) ||
        (lat > 5 && lat < 75 && lng > 60 && lng < 150) ||
        (lat > -45 && lat < -10 && lng > 110 && lng < 155) ||
        (lat > 5 && lat < 35 && lng > 65 && lng < 95);
      
      if (isLand && Math.random() > 0.3) {
        const pos = latLngToVector3(lat, lng, 2.01);
        positions.push(pos.x, pos.y, pos.z);
      }
    }
    return new Float32Array(positions);
  }, []);

  // Create city lights positions
  const cityLightsPositions = useMemo(() => {
    const positions: number[] = [];
    MAJOR_CITIES.forEach(city => {
      for (let i = 0; i < 5; i++) {
        const offsetLat = city.lat + (Math.random() - 0.5) * 3;
        const offsetLng = city.lng + (Math.random() - 0.5) * 3;
        const pos = latLngToVector3(offsetLat, offsetLng, 2.02);
        positions.push(pos.x, pos.y, pos.z);
      }
    });
    return new Float32Array(positions);
  }, []);

  // Generate network arc lines
  const networkArcs = useMemo(() => {
    return NETWORK_CONNECTIONS.map(([startIdx, endIdx]) => {
      const start = MAJOR_CITIES[startIdx];
      const end = MAJOR_CITIES[endIdx];
      return generateArcPoints(start, end, 2.02);
    });
  }, []);

  // Floating atmosphere particles
  const atmosphereParticles = useMemo(() => {
    const positions = new Float32Array(400 * 3);
    for (let i = 0; i < 400; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 2.3 + Math.random() * 0.5;
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.cos(phi);
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }
    return positions;
  }, []);

  // Create equator line points
  const equatorPoints = useMemo((): [number, number, number][] => {
    const points: [number, number, number][] = [];
    for (let i = 0; i <= 64; i++) {
      const theta = (i / 64) * Math.PI * 2;
      points.push([2.03 * Math.cos(theta), 0, 2.03 * Math.sin(theta)]);
    }
    return points;
  }, []);

  // Create latitude lines
  const latitudeLines = useMemo((): [number, number, number][][] => {
    const lines: [number, number, number][][] = [];
    [-60, -30, 30, 60].forEach(lat => {
      const points: [number, number, number][] = [];
      const r = 2.03 * Math.cos(lat * Math.PI / 180);
      const y = 2.03 * Math.sin(lat * Math.PI / 180);
      for (let i = 0; i <= 64; i++) {
        const theta = (i / 64) * Math.PI * 2;
        points.push([r * Math.cos(theta), y, r * Math.sin(theta)]);
      }
      lines.push(points);
    });
    return lines;
  }, []);

  // Create longitude lines
  const longitudeLines = useMemo((): [number, number, number][][] => {
    const lines: [number, number, number][][] = [];
    for (let lng = 0; lng < 360; lng += 30) {
      const points: [number, number, number][] = [];
      for (let lat = -90; lat <= 90; lat += 5) {
        const pos = latLngToVector3(lat, lng, 2.03);
        points.push([pos.x, pos.y, pos.z]);
      }
      lines.push(points);
    }
    return lines;
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (globeRef.current && !isZoomed) {
      globeRef.current.rotation.y += 0.002;
    }
    
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0008;
    }

    if (cityLightsRef.current) {
      const material = cityLightsRef.current.material as THREE.PointsMaterial;
      material.opacity = 0.6 + Math.sin(time * 2) * 0.3;
    }
  });

  const delhiPosition = latLngToVector3(NEW_DELHI.lat, NEW_DELHI.lng, 2.08);

  return (
    <group ref={globeRef}>
      {/* Core dark sphere */}
      <mesh>
        <sphereGeometry args={[1.98, 64, 64]} />
        <meshBasicMaterial color="#0a0a0f" transparent opacity={0.95} />
      </mesh>

      {/* Inner glow sphere */}
      <mesh>
        <sphereGeometry args={[1.99, 64, 64]} />
        <meshBasicMaterial color="#0d2d2d" transparent opacity={0.5} />
      </mesh>

      {/* Primary grid wireframe */}
      <mesh>
        <sphereGeometry args={[2, 48, 48]} />
        <meshBasicMaterial color="#2dd4bf" wireframe transparent opacity={0.15} />
      </mesh>

      {/* Secondary finer grid */}
      <mesh>
        <sphereGeometry args={[2.005, 24, 24]} />
        <meshBasicMaterial color="#5eead4" wireframe transparent opacity={0.08} />
      </mesh>

      {/* Equator line - glowing */}
      <Line points={equatorPoints} color="#2dd4bf" lineWidth={2} transparent opacity={0.8} />

      {/* Latitude lines */}
      {latitudeLines.map((points, i) => (
        <Line key={`lat-${i}`} points={points} color="#2dd4bf" lineWidth={1} transparent opacity={0.25} />
      ))}

      {/* Longitude lines */}
      {longitudeLines.map((points, i) => (
        <Line key={`lng-${i}`} points={points} color="#2dd4bf" lineWidth={1} transparent opacity={0.2} />
      ))}

      {/* Continent particle points */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[continentParticles, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#5eead4" size={0.025} transparent opacity={0.7} sizeAttenuation />
      </points>

      {/* City lights - glowing dots */}
      <points ref={cityLightsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[cityLightsPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#ffffff" size={0.04} transparent opacity={0.8} sizeAttenuation />
      </points>

      {/* Network connection arcs */}
      {networkArcs.map((arcPoints, i) => (
        <Line
          key={`arc-${i}`}
          points={arcPoints}
          color="#2dd4bf"
          lineWidth={1}
          transparent
          opacity={0.4}
        />
      ))}

      {/* City hub markers */}
      {MAJOR_CITIES.map((city, i) => {
        const pos = latLngToVector3(city.lat, city.lng, 2.03);
        return (
          <mesh key={`hub-${i}`} position={[pos.x, pos.y, pos.z]}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshBasicMaterial color="#5eead4" transparent opacity={0.9} />
          </mesh>
        );
      })}

      {/* Atmosphere glow - outer ring */}
      <mesh scale={1.12}>
        <sphereGeometry args={[2, 64, 64]} />
        <shaderMaterial
          transparent
          side={THREE.BackSide}
          uniforms={{
            glowColor: { value: new THREE.Color('#2dd4bf') },
            intensity: { value: 1.2 },
          }}
          vertexShader={`
            varying vec3 vNormal;
            void main() {
              vNormal = normalize(normalMatrix * normal);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            varying vec3 vNormal;
            uniform vec3 glowColor;
            uniform float intensity;
            void main() {
              float glow = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.5);
              gl_FragColor = vec4(glowColor, glow * intensity * 0.6);
            }
          `}
        />
      </mesh>

      {/* Inner atmosphere rim light */}
      <mesh scale={1.05}>
        <sphereGeometry args={[2, 64, 64]} />
        <shaderMaterial
          transparent
          side={THREE.BackSide}
          uniforms={{
            glowColor: { value: new THREE.Color('#5eead4') },
          }}
          vertexShader={`
            varying vec3 vNormal;
            void main() {
              vNormal = normalize(normalMatrix * normal);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            varying vec3 vNormal;
            uniform vec3 glowColor;
            void main() {
              float rim = pow(0.5 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
              gl_FragColor = vec4(glowColor, rim * 0.4);
            }
          `}
        />
      </mesh>

      {/* Floating atmosphere particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[atmosphereParticles, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#5eead4" size={0.015} transparent opacity={0.4} sizeAttenuation />
      </points>

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

        {[0.12, 0.18, 0.25, 0.33].map((size, i) => (
          <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[size, size + 0.02, 32]} />
            <meshBasicMaterial color="#2dd4bf" transparent opacity={0.5 - i * 0.1} side={THREE.DoubleSide} />
          </mesh>
        ))}

        <mesh position={[0, 0, 0.18]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.04, 0.2, 8]} />
          <meshBasicMaterial color="#2dd4bf" />
        </mesh>

        {isZoomed && (
          <Html position={[0.4, 0.4, 0]} center>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-background/95 backdrop-blur-md border border-primary/50 rounded-lg px-4 py-3 whitespace-nowrap shadow-lg shadow-primary/30"
            >
              <p className="text-primary font-mono text-sm font-bold">📍 New Delhi, India</p>
              <p className="text-muted-foreground text-xs mt-1">You found Random Variable!</p>
            </motion.div>
          </Html>
        )}
      </group>
    </group>
  );
};

const LoadingFallback = () => (
  <mesh>
    <sphereGeometry args={[2, 32, 32]} />
    <meshBasicMaterial color="#0a1a1a" wireframe />
  </mesh>
);

class GlobeErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full border-2 border-primary/30 flex items-center justify-center">
              <span className="text-2xl">🌐</span>
            </div>
            <p className="text-muted-foreground text-sm">Globe loading...</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const CyberGlobe = () => {
  const [isZoomed, setIsZoomed] = useState(false);

  const zoomedCameraPosition = useMemo(() => {
    const pos = latLngToVector3(NEW_DELHI.lat, NEW_DELHI.lng, 5);
    return [pos.x, pos.y, pos.z] as [number, number, number];
  }, []);

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <span className="text-primary font-mono text-sm tracking-wider">// LOCATE</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            Where in the <span className="text-primary">World</span>?
          </h2>
          <p className="text-muted-foreground mt-2">Click the globe to zoom in</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="relative h-[400px] md:h-[500px] cursor-pointer"
          onClick={() => setIsZoomed(!isZoomed)}
        >
          {/* Enhanced glow background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
            <div className="absolute w-64 h-64 bg-primary/30 rounded-full blur-[60px]" />
          </div>

          <GlobeErrorBoundary>
            <Canvas
              camera={{ position: isZoomed ? zoomedCameraPosition : [0, 0, 6], fov: 45 }}
              style={{ background: 'transparent' }}
              gl={{ antialias: true, alpha: true }}
            >
              <ambientLight intensity={0.2} />
              <pointLight position={[10, 10, 10]} intensity={0.5} color="#ffffff" />
              <pointLight position={[-10, -10, -10]} intensity={0.3} color="#2dd4bf" />

              <React.Suspense fallback={<LoadingFallback />}>
                <CyberEarth isZoomed={isZoomed} />
              </React.Suspense>

              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate={!isZoomed}
                autoRotateSpeed={0.5}
                target={[0, 0, 0]}
              />
            </Canvas>
          </GlobeErrorBoundary>

          {/* Corner decorations with glow */}
          <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary/50 shadow-[0_0_10px_rgba(45,212,191,0.3)]" />
          <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-primary/50 shadow-[0_0_10px_rgba(45,212,191,0.3)]" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-primary/50 shadow-[0_0_10px_rgba(45,212,191,0.3)]" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary/50 shadow-[0_0_10px_rgba(45,212,191,0.3)]" />
        </motion.div>

        <AnimatePresence>
          {isZoomed && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center text-muted-foreground text-sm mt-4"
            >
              🎯 Target acquired! Click again to zoom out
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CyberGlobe;
