/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export interface WebGLGlobeProps {
  className?: string;
  lightPosition?: 'left' | 'right';
}

/**
 * A hyper-premium, minimalist 3D rendering engine.
 * Renders a sophisticated, abstract 3D spatial dynamic structure:
 * Dynamic floating obsidian geometric shards and an ultra-fine 3D parametric mathematical mesh grid.
 * Configured with strict high-contrast Rembrandt lighting cascading from the top-left.
 */
export default function WebGLGlobe({
  className = '',
  lightPosition = 'left',
}: WebGLGlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth || window.innerWidth;
    const height = containerRef.current.clientHeight || window.innerHeight;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.background = null; // transparent canvas to blend with parent background

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
    // Position camera slightly offset to create a luxurious spatial arrangement
    camera.position.set(0, 0, 14);

    // 2. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const structureGroup = new THREE.Group();
    scene.add(structureGroup);

    // 3. Rembrandt Lighting Setup
    // A single, deliberate, high-contrast, directional soft light source cascading from the top-left.
    const rembrandtLight = new THREE.DirectionalLight('#E2E8F0', 2.8);
    rembrandtLight.position.set(-10, 10, 6);
    rembrandtLight.castShadow = true;
    rembrandtLight.shadow.mapSize.width = 1024;
    rembrandtLight.shadow.mapSize.height = 1024;
    scene.add(rembrandtLight);

    // Extremely minimal, subtle neutral-dark bounce fill light to prevent total pitch black in crevices, keeping shadows readable
    const bounceLight = new THREE.DirectionalLight('#222222', 0.45);
    bounceLight.position.set(8, -8, -4);
    scene.add(bounceLight);

    // Very dark ambient base
    const ambientLight = new THREE.AmbientLight('#0B0B0F', 0.1);
    scene.add(ambientLight);

    // 4. Abstract 3D Spatial Structure Design
    
    // A. Floating Obsidian Geometric Shards
    // Create an intricate group of asymmetric, razor-sharp obsidian geometric pieces
    const shardGroup = new THREE.Group();
    structureGroup.add(shardGroup);

    const obsidianMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0a0a0f,                 // Deep obsidian black
      roughness: 0.12,                  // Very polished surface
      metalness: 0.95,                 // highly metallic/reflective
      clearcoat: 1.0,                  // crystal-like outer lacquer
      clearcoatRoughness: 0.05,
      reflectivity: 0.9,
      flatShading: true,               // force flat polygonal facets
      side: THREE.DoubleSide
    });

    const shards: THREE.Mesh[] = [];
    const shardCount = 14;

    for (let i = 0; i < shardCount; i++) {
      // Create interesting shards using low segment count geometries
      let geometry: THREE.BufferGeometry;
      const sizeScale = 0.4 + Math.random() * 0.75;
      
      const geomType = i % 3;
      if (geomType === 0) {
        geometry = new THREE.IcosahedronGeometry(sizeScale, 0); // razor sharp faceted sphere
      } else if (geomType === 1) {
        geometry = new THREE.TetrahedronGeometry(sizeScale * 1.2, 0);
      } else {
        geometry = new THREE.ConeGeometry(sizeScale * 0.7, sizeScale * 1.5, 4); // sharp architectural spikes
      }

      const shard = new THREE.Mesh(geometry, obsidianMaterial);
      
      // Arrange shards in a sophisticated floating central cluster
      const angle = (i / shardCount) * Math.PI * 2;
      const radius = 1.2 + Math.random() * 1.8;
      
      shard.position.set(
        Math.cos(angle) * radius + (Math.random() - 0.5) * 0.6,
        Math.sin(angle) * (radius * 0.75) + (Math.random() - 0.5) * 0.6,
        (Math.random() - 0.5) * 1.5
      );

      // Random elegant rotations
      shard.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      // Store physics metadata on the objects for individual animations
      shard.userData = {
        spinSpeedX: (Math.random() - 0.5) * 0.006,
        spinSpeedY: (Math.random() - 0.5) * 0.006,
        driftSpeed: 0.15 + Math.random() * 0.35,
        driftOffset: Math.random() * 100,
        originalY: shard.position.y
      };

      shard.castShadow = true;
      shard.receiveShadow = true;
      shardGroup.add(shard);
      shards.push(shard);
    }

    // B. Ultra-Fine 3D Parametric Wave Mesh Grid
    // Represents elegant, structural multi-dimensional mathematical grids
    const gridRows = 32;
    const gridCols = 32;
    const gridGeometry = new THREE.BufferGeometry();
    const positions: number[] = [];
    const indices: number[] = [];

    // Base coordinate arrays for parametric wave surface
    const gridWidth = 9.0;
    const gridHeight = 9.0;

    for (let r = 0; r <= gridRows; r++) {
      for (let c = 0; c <= gridCols; c++) {
        const x = (c / gridCols - 0.5) * gridWidth;
        const y = (r / gridRows - 0.5) * gridHeight;
        positions.push(x, y, 0);
      }
    }

    // Create a fine wireframe structure instead of solid faces
    for (let r = 0; r < gridRows; r++) {
      for (let c = 0; c < gridCols; c++) {
        const row1 = r * (gridCols + 1);
        const row2 = (r + 1) * (gridCols + 1);

        // Horizontal line
        indices.push(row1 + c, row1 + c + 1);
        // Vertical line
        indices.push(row1 + c, row2 + c);
      }
    }

    // Connect last row & column boundaries
    for (let c = 0; c < gridCols; c++) {
      const lastRow = gridRows * (gridCols + 1);
      indices.push(lastRow + c, lastRow + c + 1);
    }
    for (let r = 0; r < gridRows; r++) {
      const lastCol = r * (gridCols + 1) + gridCols;
      const nextLastCol = (r + 1) * (gridCols + 1) + gridCols;
      indices.push(lastCol, nextLastCol);
    }

    gridGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    gridGeometry.setIndex(indices);

    // Precise, ultra-fine lines with muted neutral grey and absolute low-key glow
    const gridMaterial = new THREE.LineBasicMaterial({
      color: 0x333333, // Muted neutral gray (luxurious, low key)
      transparent: true,
      opacity: 0.18,
      linewidth: 1, // standard 1px high precision rendering
    });

    const mathematicalMesh = new THREE.LineSegments(gridGeometry, gridMaterial);
    mathematicalMesh.position.set(0, 0, -2.0); // place just behind the obsidian shards
    mathematicalMesh.rotation.x = Math.PI / 4.5; // beautiful tilt to mimic dynamic space terrain
    structureGroup.add(mathematicalMesh);

    // Dynamic wave equation simulation for the mesh structure
    const positionAttribute = gridGeometry.attributes.position;

    // Elegant background starfield - microscopic, low contrast twinkle stars (highly luxurious)
    const starCount = 180;
    const starsGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      // Disperse microscopic points very faintly in the far landscape
      const radius = 10.0 + Math.random() * 12.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2.0 * Math.random() - 1.0);
      
      starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = radius * Math.cos(phi) - 3.0;
    }
    starsGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));

    const starTexture = (() => {
      const canvas = document.createElement('canvas');
      canvas.width = 8;
      canvas.height = 8;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const grad = ctx.createRadialGradient(4, 4, 0, 4, 4, 4);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 8, 8);
      }
      return new THREE.CanvasTexture(canvas);
    })();

    const starMat = new THREE.PointsMaterial({
      size: 0.10,
      map: starTexture,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const spaceDust = new THREE.Points(starsGeo, starMat);
    scene.add(spaceDust);

    // Initial position of structure
    structureGroup.rotation.y = lightPosition === 'right' ? 0.35 : -0.35;
    structureGroup.rotation.x = 0.15;

    // Interactive inertia systems
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let rotationVelocity = { x: 0.0002, y: 0.0006 };
    let dragVelocity = { x: 0, y: 0 };
    
    let hoverX = 0;
    let hoverY = 0;

    const handleStart = (clientX: number, clientY: number) => {
      isDragging = true;
      previousMousePosition = { x: clientX, y: clientY };
    };

    const handleMove = (clientX: number, clientY: number) => {
      hoverX = (clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      hoverY = (clientY - window.innerHeight / 2) / (window.innerHeight / 2);

      if (!isDragging) return;

      const deltaX = clientX - previousMousePosition.x;
      const deltaY = clientY - previousMousePosition.y;

      dragVelocity.y = deltaX * 0.0012;
      dragVelocity.x = deltaY * 0.0012;

      previousMousePosition = { x: clientX, y: clientY };
    };

    const handleEnd = () => {
      isDragging = false;
    };

    const onMouseDown = (e: MouseEvent) => handleStart(e.clientX, e.clientY);
    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const onMouseUp = () => handleEnd();

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleStart(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onTouchEnd = () => handleEnd();

    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // 5. Animation Loop
    let animationFrameId: number;
    let time = 0;
    
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      time += 0.008;

      // Slowly decay vector velocities back to standard fine ambient orbital drift speed
      if (!isDragging) {
        dragVelocity.y += (0.0006 - dragVelocity.y) * 0.04;
        dragVelocity.x += (0.0001 - dragVelocity.x) * 0.04;
      }

      // Rotate group
      structureGroup.rotation.y += dragVelocity.y;
      structureGroup.rotation.x += dragVelocity.x;

      // Animate individual shards floating & spinning with distinct math offsets
      shards.forEach((shard, idx) => {
        shard.rotation.x += shard.userData.spinSpeedX;
        shard.rotation.y += shard.userData.spinSpeedY;
        
        // Gentle wave drift
        const wave = Math.sin(time * shard.userData.driftSpeed + shard.userData.driftOffset);
        shard.position.y = shard.userData.originalY + wave * 0.22;
        shard.position.x += Math.cos(time * 0.2 + idx) * 0.0015;
      });

      // Wave-surface displacement of the physical parameters grid
      const posArr = positionAttribute.array as Float32Array;
      for (let r = 0; r <= gridRows; r++) {
        for (let c = 0; c <= gridCols; c++) {
          const idx = (r * (gridCols + 1) + c) * 3;
          const originalX = posArr[idx];
          const originalY = posArr[idx + 1];
          
          // Double sin wave to generate elite topological surface flow
          const z = Math.sin(originalX * 0.6 + time * 0.8) * Math.cos(originalY * 0.5 + time * 0.6) * 0.48;
          posArr[idx + 2] = z;
        }
      }
      positionAttribute.needsUpdate = true;

      // Spin stars/background dust extremely slow too
      spaceDust.rotation.y += 0.00008;

      // Smooth camera reactive subtle tracking to cursor coordinates
      camera.position.x += (hoverX * 0.8 - camera.position.x) * 0.03;
      camera.position.y += (-hoverY * 0.8 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // 6. Responsive Resize Handling
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(containerRef.current);

    // Cleanup Resources
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      resizeObserver.disconnect();
      if (rendererRef.current && containerRef.current) {
        try {
          containerRef.current.removeChild(rendererRef.current.domElement);
         } catch (e) {
          // Ignore
         }
      }
      
      shardGroup.children.forEach((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
        }
      });
      obsidianMaterial.dispose();
      gridGeometry.dispose();
      gridMaterial.dispose();
      starsGeo.dispose();
      starMat.dispose();
      starTexture.dispose();
    };
  }, [lightPosition]);

  return (
    <div 
      id="axiom-dynamic-geometric-container"
      ref={containerRef} 
      className={`w-full h-full min-h-[300px] pointer-events-none relative select-none ${className}`}
    />
  );
}
