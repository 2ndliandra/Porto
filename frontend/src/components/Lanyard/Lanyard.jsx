/* eslint-disable react/no-unknown-property */
'use client';
import { useEffect, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

import cardGLB from './card.glb';
import lanyardTexture from './lanyard.png';
import profileImg from '../../assets/profile.jpeg';

import * as THREE from 'three';
import './Lanyard.css';

extend({ MeshLineGeometry, MeshLineMaterial });

export default function Lanyard({ position = [0, 0, 20], gravity = [0, -40, 0], fov = 35, transparent = true }) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="lanyard-wrapper">
      <Canvas
        camera={{ position: position, fov: fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
          <Band isMobile={isMobile} />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={10}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}

function Band({ maxSpeed = 50, minSpeed = 0, isMobile = false }) {
  const band = useRef(),
    fixed = useRef(),
    j1 = useRef(),
    j2 = useRef(),
    j3 = useRef(),
    card = useRef();
  const vec = new THREE.Vector3(),
    ang = new THREE.Vector3(),
    rot = new THREE.Vector3(),
    dir = new THREE.Vector3();
  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 4, linearDamping: 4 };
  const { nodes, materials } = useGLTF(cardGLB);
  const texture = useTexture(lanyardTexture);
  const profileTexture = useTexture(profileImg);
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
  );
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);
  const [customTexture, setCustomTexture] = useState(null);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 720;
    const ctx = canvas.getContext('2d');

    // Make canvas background transparent initially
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Minimalist Black Background
    if (ctx.roundRect) {
      ctx.beginPath();
      ctx.roundRect(0, 0, canvas.width, canvas.height, 32); 
      ctx.fillStyle = '#0f172a'; // Deep matte black/slate
      ctx.fill();
      ctx.clip(); 
    } else {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Top Accent line (White)
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, 12);
    
    // Subtle grid pattern 
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;
    for(let i=0; i<canvas.width; i+=40) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
    }
    for(let i=0; i<canvas.height; i+=40) {
      ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke();
    }

    // Name Typography
    ctx.fillStyle = '#ffffff'; 
    ctx.font = 'bold 36px "Inter", system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Moch Novaliandra', canvas.width / 2, 530);

    // Role Typography
    ctx.fillStyle = '#9ca3af'; // light gray
    ctx.font = '500 22px "Inter", system-ui, sans-serif';
    ctx.fillText('Backend Developer', canvas.width / 2, 575);
    
    // "VERIFIED PROFILE" badge (Minimalist)
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    if (ctx.roundRect) {
      ctx.beginPath();
      ctx.roundRect(canvas.width/2 - 90, 610, 180, 36, 18);
      ctx.stroke();
    } else {
      ctx.strokeRect(canvas.width/2 - 90, 610, 180, 36);
    }
    
    ctx.fillStyle = '#ffffff'; 
    ctx.font = 'bold 15px "Inter", system-ui, sans-serif';
    ctx.fillText('VERIFIED PROFILE', canvas.width / 2, 633);

    // Load Profile Image
    const img = new window.Image();
    img.src = profileImg; 
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      ctx.save();
      
      const cx = canvas.width / 2;
      const cy = 260; 
      const r = 140;

      // Glow behind circle
      ctx.shadowColor = 'rgba(6, 182, 212, 0.5)';
      ctx.shadowBlur = 40;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      
      ctx.shadowBlur = 0; // Reset shadow for clipping

      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.clip();
      
      const scale = Math.max((r*2) / img.width, (r*2) / img.height);
      const x = cx - (img.width / 2) * scale;
      const y = cy - (img.height / 2) * scale;
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      
      ctx.restore();

      // Border for the circle
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = '#ffffff'; // white border
      ctx.lineWidth = 6;
      ctx.stroke();

      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.flipY = false;
      setCustomTexture(tex);
    };
  }, []);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.5, 0]
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }
    if (fixed.current) {
      [j1, j2].forEach(ref => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = 'chordal';
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          
          {/* Custom Dynamic Badge Overlaid perfectly onto front face */}
          <group
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={e => (e.target.releasePointerCapture(e.pointerId), drag(false))}
            onPointerDown={e => (
              e.target.setPointerCapture(e.pointerId),
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())))
            )}
          >
            <mesh position={[0, 0, 0.012]} rotation={[0, 0, Math.PI]} scale={[-1, 1, 1]}>
              <planeGeometry args={[1.6, 2.25]} />
              <meshPhysicalMaterial
                map={customTexture || profileTexture}
                clearcoat={1}
                clearcoatRoughness={0.15}
                roughness={0.2}
                metalness={0.5}
                transparent={true}
              />
            </mesh>
            
            <group scale={2.25} position={[0, -1.2, -0.05]}>
              <mesh geometry={nodes.card.geometry}>
                <meshPhysicalMaterial
                  color="#0f172a" // Match black/slate backing
                  clearcoat={1}
                  clearcoatRoughness={0.15}
                  roughness={0.2}
                  metalness={0.5}
                />
              </mesh>
              <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
              <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
            </group>
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="#334155" // dark minimalist grey color to match the card theme
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap={false}
          lineWidth={1}
        />
      </mesh>
    </>
  );
}
