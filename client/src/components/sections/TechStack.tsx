import { useRef, useMemo, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { motion, useInView } from 'framer-motion';
import * as THREE from 'three';

// Tech stack data from resume
const techStack = [
  { name: 'JavaScript', icon: '/assets/icons/javascript.svg', color: '#F7DF1E' },
  { name: 'TypeScript', icon: '/assets/icons/typescript.svg', color: '#3178C6' },
  { name: 'React', icon: '/assets/icons/react.svg', color: '#61DAFB' },
  { name: 'Node.js', icon: '/assets/icons/nodejs.svg', color: '#339933' },
  { name: 'Express', icon: '/assets/icons/express.svg', color: '#888888' },
  { name: 'Redux', icon: '/assets/icons/redux.svg', color: '#764ABC' },
  { name: 'Tailwind', icon: '/assets/icons/tailwind.svg', color: '#06B6D4' },
  { name: 'MongoDB', icon: '/assets/icons/mongodb.svg', color: '#47A248' },
  { name: 'PostgreSQL', icon: '/assets/icons/postgresql.svg', color: '#4169E1' },
  { name: 'Prisma', icon: '/assets/icons/prisma.svg', color: '#16A394' },
  { name: 'Redis', icon: '/assets/icons/redis.svg', color: '#DC382D' },
  { name: 'Docker', icon: '/assets/icons/docker.svg', color: '#2496ED' },
  { name: 'Git', icon: '/assets/icons/git.svg', color: '#F05032' },
  { name: 'HTML5', icon: '/assets/icons/html5.svg', color: '#E34F26' },
  { name: 'CSS3', icon: '/assets/icons/css3.svg', color: '#1572B6' },
  { name: 'Postman', icon: '/assets/icons/postman.svg', color: '#FF6C37' },
];

// Rotating tech icon component
interface TechIconProps {
  position: [number, number, number];
  tech: { name: string; icon: string; color: string };
  index: number;
}

const TechIcon = ({ position, tech }: TechIconProps) => {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.lookAt(state.camera.position);
    }
  });

  return (
    <group ref={ref} position={position}>
      <Html
        center
        distanceFactor={10}
        style={{
          transition: 'all 0.2s',
          opacity: 1,
          transform: 'scale(1)',
        }}
      >
        <div className="flex flex-col items-center gap-1.5 cursor-pointer hover:scale-110 transition-transform">
          <div style={{ width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src={tech.icon}
              alt={tech.name}
              style={{
                width: '48px',
                height: '48px',
                objectFit: 'contain',
                filter: `drop-shadow(0 0 8px ${tech.color}40)`,
              }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const fallback = e.currentTarget.parentElement?.querySelector('[data-fallback]') as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            <div
              data-fallback
              style={{ display: 'none', width: '48px', height: '48px', borderRadius: '50%', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold', color: tech.color, border: `2px solid ${tech.color}` }}
            >
              {tech.name.substring(0, 2).toUpperCase()}
            </div>
          </div>
          <span className="text-xs text-white/80 font-medium whitespace-nowrap">
            {tech.name}
          </span>
        </div>
      </Html>
    </group>
  );
};

// Rotating sphere with wireframe
const RotatingSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const elapsed = useRef(0);

  useFrame((_, delta) => {
    if (meshRef.current) {
      elapsed.current += delta;
      meshRef.current.rotation.y += 0.002;
      meshRef.current.rotation.x = Math.sin(elapsed.current * 0.2) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2.8, 32, 32]} />
      <meshBasicMaterial
        color="#D32F2F"
        wireframe
        transparent
        opacity={0.12}
      />
    </mesh>
  );
};

// Inner glowing sphere
const InnerSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y -= 0.001;
    }
  });

  return (
    <Sphere ref={meshRef} args={[2, 64, 64]}>
      <MeshDistortMaterial
        color="#1a1a1a"
        attach="material"
        distort={0.3}
        speed={2}
        roughness={0.4}
      />
    </Sphere>
  );
};

// Tech icons orbit
const TechOrbit = () => {
  const groupRef = useRef<THREE.Group>(null);

  const iconPositions = useMemo(() => {
    const positions: [number, number, number][] = [];
    const radius = 5.5;
    const count = techStack.length;

    // Fibonacci sphere distribution for even spacing
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = goldenAngle * i;

      const x = Math.cos(theta) * radiusAtY * radius;
      const z = Math.sin(theta) * radiusAtY * radius;

      positions.push([x, y * radius * 0.7, z]);
    }

    return positions;
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={groupRef}>
      {techStack.map((tech, index) => (
        <TechIcon
          key={tech.name}
          position={iconPositions[index]}
          tech={tech}
          index={index}
        />
      ))}
    </group>
  );
};

// Main 3D Scene
const Scene = ({ enableControls }: { enableControls: boolean }) => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#D32F2F" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#FFC107" />

      <RotatingSphere />
      <InnerSphere />
      <TechOrbit />

      {enableControls && (
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      )}
    </>
  );
};

// Main TechStack component
const TechStack = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(pointer: coarse)').matches : false
  );

  useEffect(() => {
    const media = window.matchMedia('(pointer: coarse)');
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => setIsMobile(e.matches);
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

  return (
    <section
      id="stack"
      ref={sectionRef}
      className="py-20 md:py-32 bg-dark-500 relative"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-500 via-dark-600 to-dark-500" />

      {/* Animated background lines */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary-500 to-transparent" />
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-500 to-transparent" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <span className="block w-fit mx-auto px-4 py-2 bg-primary-500/20 text-primary-500 rounded-full font-medium text-sm mb-4">
            Tech Stack
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            My <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            The technologies I use to build powerful, scalable applications.
          </p>
        </motion.div>

        {/* 3D Tech Sphere */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full h-[500px] md:h-[600px] lg:h-[700px]"
          style={{ touchAction: isMobile ? 'pan-y' : 'auto' }}
        >
          <Canvas
            camera={{ position: [0, 0, 14], fov: 50 }}
            style={{ background: 'transparent', pointerEvents: isMobile ? 'none' : 'auto' }}
          >
            <Suspense fallback={null}>
              <Scene enableControls={!isMobile} />
            </Suspense>
          </Canvas>
        </motion.div>

    
      </div>
    </section>
  );
};

export default TechStack;
