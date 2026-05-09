import React from "react";
import { Canvas } from "@react-three/fiber";
import { PointerLockControls } from "@react-three/drei";
import { useTexture } from "@react-three/drei";
import { Text } from "@react-three/drei";
import { DoubleSide } from "three";
import { useRef, useState } from "react";
import { Physics, useBox, usePlane, useSphere } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { Raycaster, Vector2, Vector3 } from "three";

function FloorPhysics() {
  usePlane(() => ({
    type: "Static",
    position: [0, -1, 0],
    rotation: [-Math.PI / 2, 0, 0],
  }));
  return null;
}

function WallPhysics() {
  useBox(() => ({
    type: "Static",
    position: [0, 0, -5],
    args: [5, 2, 0.2],
  }));
  useBox(() => ({
    type: "Static",
    position: [-2.5, 0, 0],
    rotation: [0, Math.PI / 2, 0],
    args: [10, 2, 0.2],
  }));
  useBox(() => ({
    type: "Static",
    position: [2.5, 0, 0],
    rotation: [0, -Math.PI / 2, 0],
    args: [10, 2, 0.2],
  }));
  useBox(() => ({
    type: "Static",
    position: [0, 0, 5],
    rotation: [0, Math.PI, 0],
    args: [5, 2, 0.2],
  }));
  return null;
}

function Room({ pictureRefs }) {
  const pictures = useTexture([
    "/img/wall_1.jpg",
    "/img/wall_2.jpg",
    "/img/wall_3.jpg",
    "/img/wall_4.jpg",
  ]);

  return (
    <group>
      <mesh position={[0, 0, -5]}>
        <planeGeometry args={[5, 2]} />
        <meshBasicMaterial color="#fff7d6" side={DoubleSide} />
      </mesh>

      <mesh position={[0, 0, 5]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[5, 2]} />
        <meshBasicMaterial color="#fff7d6" side={DoubleSide} />
      </mesh>

      <mesh position={[-2.5, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[10, 2]} />
        <meshBasicMaterial color="#fff4cc" side={DoubleSide} />
      </mesh>

      <mesh position={[2.5, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[10, 2]} />
        <meshBasicMaterial color="#fff1bf" side={DoubleSide} />
      </mesh>

      <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[5, 10]} />
        <meshBasicMaterial color="#94a3b8" side={DoubleSide} />
      </mesh>

      <mesh position={[0, 1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[5, 10]} />
        <meshBasicMaterial color="#e2e8f0" side={DoubleSide} />
      </mesh>

      <GalleryPicture
        pictureRef={pictureRefs[0]}
        texture={pictures[0]}
        position={[-2.39, 0, -2.5]}
        rotation={[0, Math.PI / 2, 0]}
      />
      <GalleryPicture
        pictureRef={pictureRefs[1]}
        texture={pictures[1]}
        position={[-2.39, 0, 2.5]}
        rotation={[0, Math.PI / 2, 0]}
      />
      <GalleryPicture
        pictureRef={pictureRefs[2]}
        texture={pictures[2]}
        position={[2.39, 0, -2.5]}
        rotation={[0, -Math.PI / 2, 0]}
      />
      <GalleryPicture
        pictureRef={pictureRefs[3]}
        texture={pictures[3]}
        position={[2.39, 0, 2.5]}
        rotation={[0, -Math.PI / 2, 0]}
      />

      <TextPoster text="E-Galerija" position={[0, 0.1, -4.89]} />
    </group>
  );
}

function GalleryPicture({ pictureRef, texture, position, rotation }) {
  return (
    <mesh ref={pictureRef} position={position} rotation={rotation}>
      <planeGeometry args={[1.1, 1]} />
      <meshBasicMaterial map={texture} side={DoubleSide} />
    </mesh>
  );
}

function TextPoster({ text, position }) {
  return (
    <group position={position}>
      <mesh>
        <planeGeometry args={[3.8, 1]} />
        <meshBasicMaterial color="#fffef7" side={DoubleSide} />
      </mesh>
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[3.5, 0.65]} />
        <meshBasicMaterial color="#fef3c7" side={DoubleSide} />
      </mesh>
      <Text
        position={[0, 0, 0.03]}
        fontSize={0.32}
        color="#111827"
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </group>
  );
}

function PlayerCamera({ onKeysChange, playerPosRef }) {
  const { camera } = useThree();
  const keys = useRef({ w: false, a: false, s: false, d: false, space: false });
  const velocityRef = useRef([0, 0, 0]);
  const positionRef = useRef([0, 0, 0]);
  const [ref, api] = useSphere(() => ({
    mass: 1,
    position: [0, -0.2, 0],
    args: [0.35],
    linearDamping: 0.95,
    angularDamping: 1,
    fixedRotation: true,
  }));

  useEffect(() => api.velocity.subscribe((v) => (velocityRef.current = v)), [api.velocity]);
  useEffect(() => api.position.subscribe((p) => (positionRef.current = p)), [api.position]);

  useEffect(() => {
    const syncKeys = () => onKeysChange({ ...keys.current });

    const onKeyDown = (event) => {
      const key = event.key.toLowerCase();
      const mapped = key === " " ? "space" : key;
      if (mapped in keys.current) {
        keys.current[mapped] = true;
        syncKeys();
      }
    };
    const onKeyUp = (event) => {
      const key = event.key.toLowerCase();
      const mapped = key === " " ? "space" : key;
      if (mapped in keys.current) {
        keys.current[mapped] = false;
        syncKeys();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [onKeysChange]);

  const forward = useRef(new Vector3());
  const right = useRef(new Vector3());
  const move = useRef(new Vector3());

  useFrame(() => {
    camera.position.set(positionRef.current[0], positionRef.current[1], positionRef.current[2]);
    playerPosRef.current = [...positionRef.current];

    move.current.set(0, 0, 0);

    camera.getWorldDirection(forward.current);
    forward.current.y = 0;
    forward.current.normalize();
    right.current.set(-forward.current.z, 0, forward.current.x).normalize();

    if (keys.current.w) move.current.add(forward.current);
    if (keys.current.s) move.current.sub(forward.current);
    if (keys.current.a) move.current.sub(right.current);
    if (keys.current.d) move.current.add(right.current);

    const canJump = Math.abs(velocityRef.current[1]) < 0.05;
    const jumpVelocity = keys.current.space && canJump ? 5.5 : velocityRef.current[1];

    if (move.current.lengthSq() > 0) {
      move.current.normalize().multiplyScalar(8);
      api.velocity.set(move.current.x, jumpVelocity, move.current.z);
    } else {
      api.velocity.set(0, jumpVelocity, 0);
    }
  });

  return (
    <mesh ref={ref} visible={false}>
      <sphereGeometry args={[0.35, 8, 8]} />
      <meshBasicMaterial color="#ffffff" />
    </mesh>
  );
}

function InteractionDetector({ pictureRefs, pictureLinks, playerPosRef, onInteractableChange }) {
  const { camera } = useThree();
  const raycasterRef = useRef(new Raycaster());
  const centerRef = useRef(new Vector2(0, 0));
  const tempPos = useRef(new Vector3());

  useFrame(() => {
    const raycaster = raycasterRef.current;
    raycaster.setFromCamera(centerRef.current, camera);

    const objects = pictureRefs.map((r) => r.current).filter(Boolean);
    if (objects.length === 0) {
      onInteractableChange(null);
      return;
    }

    const intersections = raycaster.intersectObjects(objects, false);
    if (intersections.length === 0) {
      onInteractableChange(null);
      return;
    }

    const hitObject = intersections[0].object;
    const index = objects.findIndex((obj) => obj === hitObject);
    if (index === -1) {
      onInteractableChange(null);
      return;
    }

    const picPos = objects[index].getWorldPosition(tempPos.current);
    const dx = playerPosRef.current[0] - picPos.x;
    const dy = playerPosRef.current[1] - picPos.y;
    const dz = playerPosRef.current[2] - picPos.z;
    const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

    if (distance <= 2.2) {
      onInteractableChange(pictureLinks[index]);
    } else {
      onInteractableChange(null);
    }
  });

  return null;
}

export default function App() {
  const controlsRef = useRef(null);
  const [locked, setLocked] = useState(false);
  const [pressed, setPressed] = useState({ w: false, a: false, s: false, d: false, space: false });
  const [activeLink, setActiveLink] = useState(null);
  const playerPosRef = useRef([0, 0, 0]);
  const pictureRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const pictureLinks = [
    "https://en.wikipedia.org/wiki/Art_gallery",
    "https://en.wikipedia.org/wiki/Painting",
    "https://en.wikipedia.org/wiki/Modern_art",
    "https://en.wikipedia.org/wiki/Sculpture",
  ];

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key.toLowerCase() === "e" && activeLink) {
        window.open(activeLink, "_blank", "noopener,noreferrer");
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeLink]);

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 12,
          left: 12,
          zIndex: 10,
          padding: "8px 10px",
          borderRadius: 8,
          background: "rgba(0,0,0,0.7)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
          fontSize: 13,
        }}
      >
        Step 7: Picture interaction enabled
      </div>
      <button
        type="button"
        onClick={() => {
          if (!controlsRef.current) return;
          if (locked) {
            controlsRef.current.unlock();
          } else {
            controlsRef.current.lock();
          }
        }}
        style={{
          position: "fixed",
          top: 12,
          right: 12,
          zIndex: 30,
          border: "none",
          borderRadius: 8,
          padding: "10px 14px",
          background: "#111827",
          color: "#fff",
          fontFamily: "system-ui, sans-serif",
          fontSize: 14,
          cursor: "pointer",
        }}
      >
        {locked ? "Unlock Pointer" : "Lock Pointer"}
      </button>

      <Canvas
        camera={{ position: [0, 0, 0], fov: 90, near: 0.1, far: 100 }}
        style={{ width: "100vw", height: "100vh", background: "#0f172a" }}
        gl={{ antialias: false, alpha: false }}
        onCreated={({ camera }) => {
          camera.lookAt(0, 0, -5);
        }}
      >
        <Physics gravity={[0, -9.81, 0]}>
          <FloorPhysics />
          <WallPhysics />
          <Room pictureRefs={pictureRefs} />
          <PlayerCamera onKeysChange={setPressed} playerPosRef={playerPosRef} />
          <InteractionDetector
            pictureRefs={pictureRefs}
            pictureLinks={pictureLinks}
            playerPosRef={playerPosRef}
            onInteractableChange={setActiveLink}
          />
          <PointerLockControls
            ref={controlsRef}
            onLock={() => setLocked(true)}
            onUnlock={() => setLocked(false)}
          />
        </Physics>
      </Canvas>
      <div
        style={{
          position: "fixed",
          right: 16,
          bottom: 16,
          zIndex: 35,
          display: "grid",
          gridTemplateColumns: "repeat(3, 52px)",
          gridTemplateRows: "repeat(3, 52px)",
          gap: 6,
          pointerEvents: "none",
        }}
      >
        <KeyBox label="W" active={pressed.w} col={2} row={1} />
        <KeyBox label="A" active={pressed.a} col={1} row={2} />
        <KeyBox label="S" active={pressed.s} col={2} row={2} />
        <KeyBox label="D" active={pressed.d} col={3} row={2} />
        <KeyBox label="SPACE" active={pressed.space} col={1} row={3} span={3} />
      </div>
      {!locked && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            display: "grid",
            placeItems: "center",
            color: "#fff",
            fontFamily: "system-ui, sans-serif",
            fontSize: 20,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            background: "rgba(5, 10, 20, 0.2)",
            pointerEvents: "none",
            zIndex: 20,
          }}
        >
          Click Lock Pointer to Look Around
        </div>
      )}
      {locked && activeLink && (
        <div
          style={{
            position: "fixed",
            left: "50%",
            bottom: 24,
            transform: "translateX(-50%)",
            zIndex: 40,
            padding: "10px 14px",
            borderRadius: 10,
            background: "rgba(17, 24, 39, 0.92)",
            color: "#fff",
            fontFamily: "system-ui, sans-serif",
            fontSize: 16,
            letterSpacing: "0.02em",
            border: "1px solid #60a5fa",
          }}
        >
          Press E to Open Artwork Link
        </div>
      )}
    </>
  );
}

function KeyBox({ label, active, col, row, span = 1 }) {
  return (
    <div
      style={{
        gridColumn: col,
        gridColumnEnd: `span ${span}`,
        gridRow: row,
        borderRadius: 10,
        display: "grid",
        placeItems: "center",
        fontFamily: "system-ui, sans-serif",
        fontWeight: 700,
        color: active ? "#07111f" : "#e5e7eb",
        background: active ? "#60a5fa" : "rgba(17, 24, 39, 0.85)",
        border: active ? "2px solid #bfdbfe" : "2px solid #374151",
        boxShadow: active ? "0 0 20px rgba(96,165,250,0.8)" : "none",
      }}
    >
      {label}
    </div>
  );
}
