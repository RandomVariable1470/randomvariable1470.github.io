import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

// Local textures
import earthTextureUrl from "@/assets/earth-blue-marble.jpg";
import bumpTextureUrl from "@/assets/earth-topology.png";

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

const Earth = ({ isZoomed }: { isZoomed: boolean }) => {
  const earthRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Load local textures
  const [earthTexture, bumpTexture] = useTexture([earthTextureUrl, bumpTextureUrl]);

  // Create particle positions for atmosphere effect
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(300 * 3);
    for (let i = 0; i < 300; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 2.2 + Math.random() * 0.3;
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.cos(phi);
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }
    return positions;
  }, []);

  useFrame(() => {
    if (earthRef.current && !isZoomed) {
      earthRef.current.rotation.y += 0.001;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0005;
    }
  });

  const delhiPosition = latLngToVector3(NEW_DELHI.lat, NEW_DELHI.lng, 2.05);

  return (
    <group>
      {/* Main Earth sphere */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshPhongMaterial
          map={earthTexture}
          bumpMap={bumpTexture}
          bumpScale={0.05}
          specular={new THREE.Color('#2dd4bf')}
          shininess={5}
        />
      </mesh>

      {/* Atmosphere glow */}
      <mesh scale={1.15}>
        <sphereGeometry args={[2, 64, 64]} />
        <shaderMaterial
          transparent
          side={THREE.BackSide}
          uniforms={{
            glowColor: { value: new THREE.Color('#2dd4bf') },
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
              float intensity = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
              gl_FragColor = vec4(glowColor, intensity * 0.4);
            }
          `}
        />
      </mesh>

      {/* Cyber grid overlay */}
      <mesh>
        <sphereGeometry args={[2.01, 32, 32]} />
        <meshBasicMaterial
          color="#2dd4bf"
          wireframe
          transparent
          opacity={0.05}
        />
      </mesh>

      {/* Floating particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#5eead4"
          size={0.02}
          transparent
          opacity={0.5}
          sizeAttenuation
        />
      </points>

      {/* New Delhi pin */}
      <group position={delhiPosition}>
        {/* Pin base */}
        <mesh>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color="#2dd4bf" />
        </mesh>
        
        {/* Glow effect */}
        <pointLight color="#2dd4bf" intensity={0.5} distance={0.5} />
        
        {/* Pulse rings */}
        {[0.1, 0.15, 0.2].map((size, i) => (
          <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[size, size + 0.015, 32]} />
            <meshBasicMaterial 
              color="#2dd4bf" 
              transparent 
              opacity={0.4 - i * 0.1} 
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}

        {/* Pin spike pointing outward */}
        <mesh position={[0, 0, 0.15]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.03, 0.15, 8]} />
          <meshBasicMaterial color="#2dd4bf" />
        </mesh>
        
        {isZoomed && (
          <Html position={[0.3, 0.3, 0]} center>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-background/90 backdrop-blur-md border border-primary/30 rounded-lg px-4 py-2 whitespace-nowrap shadow-lg shadow-primary/20"
            >
              <p className="text-primary font-mono text-sm font-bold">📍 New Delhi, India</p>
              <p className="text-muted-foreground text-xs">You found Random Variable!</p>
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
    <meshBasicMaterial color="#1a1a2e" wireframe />
  </mesh>
);

// Error boundary for Three.js canvas
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
              <span className="text-2xl">🌍</span>
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
          {/* Glow background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
          </div>

          <GlobeErrorBoundary>
            <Canvas
              camera={{ position: isZoomed ? [0, 1, 4] : [0, 0, 6], fov: 45 }}
              style={{ background: 'transparent' }}
              gl={{ antialias: true, alpha: true }}
            >
              <ambientLight intensity={0.3} />
              <directionalLight position={[5, 3, 5]} intensity={1} />
              <directionalLight position={[-5, -3, -5]} intensity={0.3} color="#2dd4bf" />
              
              <React.Suspense fallback={<LoadingFallback />}>
                <Earth isZoomed={isZoomed} />
              </React.Suspense>
              
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate={!isZoomed}
                autoRotateSpeed={0.3}
                target={isZoomed ? latLngToVector3(NEW_DELHI.lat, NEW_DELHI.lng, 0) : [0, 0, 0]}
              />
            </Canvas>
          </GlobeErrorBoundary>

          {/* Corner decorations */}
          <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary/30" />
          <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-primary/30" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-primary/30" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary/30" />
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
