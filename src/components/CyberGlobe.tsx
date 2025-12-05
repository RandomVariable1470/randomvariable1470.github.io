import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";

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

const WireframeGlobe = ({ isZoomed }: { isZoomed: boolean }) => {
  const globeRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Create wireframe sphere geometry
  const wireframeGeometry = useMemo(() => {
    const geometry = new THREE.IcosahedronGeometry(2, 3);
    return geometry;
  }, []);

  // Create particle positions for links
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(200 * 3);
    for (let i = 0; i < 200; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 2 + Math.random() * 0.5;
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.cos(phi);
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (globeRef.current && !isZoomed) {
      globeRef.current.rotation.y += 0.002;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001;
    }
  });

  const delhiPosition = latLngToVector3(NEW_DELHI.lat, NEW_DELHI.lng, 2.05);

  return (
    <group ref={globeRef}>
      {/* Wireframe globe */}
      <mesh geometry={wireframeGeometry}>
        <meshBasicMaterial
          color="#2dd4bf"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Inner glow sphere */}
      <mesh>
        <sphereGeometry args={[1.95, 32, 32]} />
        <meshBasicMaterial
          color="#0d9488"
          transparent
          opacity={0.05}
        />
      </mesh>

      {/* Latitude/longitude lines */}
      {[...Array(8)].map((_, i) => (
        <mesh key={`lat-${i}`} rotation={[0, 0, (i * Math.PI) / 8]}>
          <torusGeometry args={[2, 0.005, 8, 64]} />
          <meshBasicMaterial color="#2dd4bf" transparent opacity={0.2} />
        </mesh>
      ))}
      {[...Array(8)].map((_, i) => (
        <mesh key={`lng-${i}`} rotation={[(i * Math.PI) / 8, Math.PI / 2, 0]}>
          <torusGeometry args={[2, 0.005, 8, 64]} />
          <meshBasicMaterial color="#2dd4bf" transparent opacity={0.2} />
        </mesh>
      ))}

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
          size={0.03}
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>

      {/* New Delhi pin */}
      <group position={delhiPosition}>
        <mesh>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#2dd4bf" />
        </mesh>
        {/* Glow ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.1, 0.15, 32]} />
          <meshBasicMaterial color="#5eead4" transparent opacity={0.5} side={THREE.DoubleSide} />
        </mesh>
        {/* Pulse rings */}
        {[0.2, 0.3, 0.4].map((size, i) => (
          <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[size, size + 0.02, 32]} />
            <meshBasicMaterial 
              color="#2dd4bf" 
              transparent 
              opacity={0.3 - i * 0.1} 
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}
        
        {isZoomed && (
          <Html position={[0.3, 0.3, 0]} center>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-background/90 backdrop-blur-md border border-primary/30 rounded-lg px-4 py-2 whitespace-nowrap"
            >
              <p className="text-primary font-mono text-sm font-bold">📍 New Delhi</p>
              <p className="text-muted-foreground text-xs">You found Random Variable!</p>
            </motion.div>
          </Html>
        )}
      </group>
    </group>
  );
};

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
            <div className="w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          </div>

          <Canvas
            camera={{ position: isZoomed ? [0, 1, 4] : [0, 0, 6], fov: 45 }}
            style={{ background: 'transparent' }}
          >
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={0.5} />
            <WireframeGlobe isZoomed={isZoomed} />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate={!isZoomed}
              autoRotateSpeed={0.5}
              target={isZoomed ? latLngToVector3(NEW_DELHI.lat, NEW_DELHI.lng, 0) : [0, 0, 0]}
            />
          </Canvas>

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
