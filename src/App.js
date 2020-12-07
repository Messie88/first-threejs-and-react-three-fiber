import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "react-three-fiber";
// import { Box } from "drei";
import { softShadows, MeshWobbleMaterial, OrbitControls } from "drei";
import { useSpring, a } from "react-spring/three";

import "./App.scss";

softShadows();

const SpinnigMesh = ({ position, args, color, speed }) => {
  const [expand, setExpand] = useState(false);

  const props = useSpring({
    scale: expand ? [1.4, 1.4, 1.4] : [1, 1, 1],
  });

  const mesh = useRef(null);

  // useFrame is for animations.
  // Whenever we use useFrame, it has to be in its own component
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

  // args={[width, height, depth]}

  return (
    <a.mesh
      onClick={() => setExpand(!expand)}
      scale={props.scale}
      castShadow
      position={position}
      ref={mesh}
    >
      {/* 
  <Box>
    <meshStandardMaterial attach="material" />
  </Box> 
  >>>>>> This above is the same of what bellow
  */}

      <boxBufferGeometry attach="geometry" args={args} />
      <MeshWobbleMaterial
        attach="material"
        color={color}
        speed={1}
        factor={0.6}
      />
    </a.mesh>
  );
};

function App() {
  return (
    <>
      <Canvas
        shadowMap
        colorManagement
        camera={{ position: [-5, 2, 10], fov: 60 }}
      >
        {/* ambientLight globally illumitates all of the objects on the scene equally and, that makes everything to have a bit of light to it each */}
        <ambientLight intensity={0.3} />
        {/* directionalLight is the main source of lights */}
        <directionalLight
          castShadow
          position={[0, 10, 0]}
          intensity={1.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        {/* pointLight adds same lights */}
        <pointLight position={[-10, 0, -20]} intensity={0.5} />
        <pointLight position={[0, -10, 0]} intensity={1.5} />
        {/* let's add a plane in order to see the shadow of our Spinning Meshes */}
        <group>
          <mesh
            receiveShadow
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -3, 0]}
          >
            <planeBufferGeometry attach="geometry" args={[100, 100]} />
            {/* This will need to cast a shadow */}
            <shadowMaterial attach="material" opacity={0.3} />
          </mesh>
          <SpinnigMesh
            position={[0, 1, 0]}
            color="pink"
            args={[3, 2, 1]}
            speed={6}
          />
          <SpinnigMesh position={[-2, 1, -5]} color="lightblue" speed={2} />
          <SpinnigMesh position={[5, 1, -2]} color="lightblue" speed={6} />
        </group>

        {/* orbitControls allows us zoom in , zoom out and rotate the elements of our Canvas */}
        <OrbitControls />
      </Canvas>
    </>
  );
}

export default App;
