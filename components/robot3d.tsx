"use client"

import { useRef, useState, useEffect, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Html, RoundedBox } from "@react-three/drei"
import { useTheme } from "next-themes"
import * as THREE from "three"

const NIGHT = {
  body: "#262819",
  screen: "#101108",
  accent: "#d6ff4b",
  trim: "#3c3e2e",
  particle: "#d6ff4b",
  particleOpacity: 0.4,
}
const DAY = {
  body: "#eceadb",
  screen: "#f6f4e8",
  accent: "#5e7d0c",
  trim: "#b9b7a4",
  particle: "#7d8a52",
  particleOpacity: 0.28,
}

const QUIPS = ["beep boop", "sys.online ✓", "scroll on ↓", "nice cursor.", "ask him about agents", "94% autonomous, btw"]

type Mood = "normal" | "sleepy" | "startled"
type Palette = typeof NIGHT

declare global {
  interface Window {
    __bootDone?: boolean
  }
}

const PARTICLE_COUNT = 90

/* Floating particle depth-field — gives the whole page 3D parallax depth */
function DepthField({ palette }: { palette: Palette }) {
  const ref = useRef<THREE.Points>(null)
  const pointer = useRef({ x: 0, y: 0 })

  const positions = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      arr[i * 3] = (Math.random() * 2 - 1) * 12
      arr[i * 3 + 1] = (Math.random() * 2 - 1) * 8
      arr[i * 3 + 2] = -3.5 - Math.random() * 6
    }
    return arr
  }, [])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.z = clock.elapsedTime * 0.008
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, pointer.current.x * 1.1, 0.04)
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, pointer.current.y * 0.7, 0.04)
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={palette.particle}
        size={0.055}
        sizeAttenuation
        transparent
        opacity={palette.particleOpacity}
      />
    </points>
  )
}

function Drone({ palette }: { palette: Palette }) {
  const { viewport } = useThree()
  const root = useRef<THREE.Group>(null)
  const inner = useRef<THREE.Group>(null)
  const head = useRef<THREE.Group>(null)
  const eyeL = useRef<THREE.Mesh>(null)
  const eyeR = useRef<THREE.Mesh>(null)
  const legL = useRef<THREE.Mesh>(null)
  const legR = useRef<THREE.Mesh>(null)
  const antennaTip = useRef<THREE.Mesh>(null)
  const thruster = useRef<THREE.Mesh>(null)

  const [msg, setMsg] = useState<string | null>(null)
  const [mood, setMood] = useState<Mood>("normal")

  const s = useRef({
    initialized: false,
    entered: false,
    greeted: false,
    pos: new THREE.Vector3(),
    target: new THREE.Vector3(),
    prevPos: new THREE.Vector3(),
    vel: new THREE.Vector3(),
    lookTarget: new THREE.Vector3(0, 0, 8),
    side: 1,
    retargetAt: 0,
    nextBlinkAt: 2.5,
    blinkUntil: 0,
    nextQuipAt: 18,
    msgUntil: 0,
    shownMsg: null as string | null,
    startledUntil: 0,
    startleCooldownUntil: 0,
    lastActivity: 0,
    mood: "normal" as Mood,
    pointer: new THREE.Vector2(0, 0),
    pointerPrev: { x: 0, y: 0, t: 0 },
    approachSpeed: 0,
    pointerDist: 1,
  })

  // Route every message change through one guard so setMsg fires once per
  // logical change — never per frame, and never against a stale closure.
  const say = (text: string | null) => {
    if (s.current.shownMsg !== text) {
      s.current.shownMsg = text
      setMsg(text)
    }
  }
  const setMoodOnce = (m: Mood) => {
    if (s.current.mood !== m) {
      s.current.mood = m
      setMood(m)
    }
  }

  useEffect(() => {
    const st = s.current
    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1
      const ny = -(e.clientY / window.innerHeight) * 2 + 1
      st.pointer.set(nx, ny)
      const now = performance.now()
      const halfW = viewport.width / 2
      const halfH = viewport.height / 2
      const rx = st.pos.x / halfW
      const ry = st.pos.y / halfH
      const dist = Math.hypot(nx - rx, ny - ry)
      if (st.pointerPrev.t) {
        const dt = Math.max(now - st.pointerPrev.t, 1)
        const prevDist = Math.hypot(st.pointerPrev.x - rx, st.pointerPrev.y - ry)
        st.approachSpeed = ((prevDist - dist) / dt) * 1000
      }
      st.pointerDist = dist
      st.pointerPrev = { x: nx, y: ny, t: now }
      st.lastActivity = now
    }
    const onActivity = () => {
      s.current.lastActivity = performance.now()
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    window.addEventListener("wheel", onActivity, { passive: true })
    window.addEventListener("keydown", onActivity)
    window.addEventListener("click", onActivity)
    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("wheel", onActivity)
      window.removeEventListener("keydown", onActivity)
      window.removeEventListener("click", onActivity)
    }
  }, [viewport.width, viewport.height])

  const pickTarget = (vw: number, vh: number) => {
    for (let i = 0; i < 8; i++) {
      const x = (Math.random() * 2 - 1) * (vw / 2 - 1.2)
      const y = (Math.random() * 2 - 1) * (vh / 2 - 1.2)
      if (Math.abs(x) > vw * 0.18 || Math.abs(y) > vh * 0.26) {
        return new THREE.Vector3(x, y, 0)
      }
    }
    return new THREE.Vector3(vw / 2 - 1.4, vh / 2 - 1.5, 0)
  }

  useFrame(({ clock }, dt) => {
    const st = s.current
    const t = clock.elapsedTime
    const vw = viewport.width
    const vh = viewport.height
    const now = performance.now()

    if (!st.initialized) {
      st.initialized = true
      st.pos.set(vw / 2 + 3, vh / 2 + 2, 0)
      st.prevPos.copy(st.pos)
      st.target.copy(st.pos)
      st.lastActivity = now
    }

    if (!st.entered && typeof window !== "undefined" && window.__bootDone) {
      st.entered = true
      st.target = pickTarget(vw, vh)
      st.retargetAt = t + 6 + Math.random() * 5
    }

    // --- mood ---
    const idleMs = now - st.lastActivity
    if (st.mood !== "startled") {
      if (idleMs > 25000 && st.mood !== "sleepy") {
        setMoodOnce("sleepy")
        say("zzz…")
        st.msgUntil = Infinity
        st.target.set(-vw / 2 + 1.1, -vh / 2 + 1.0, 0)
      } else if (idleMs < 25000 && st.mood === "sleepy") {
        setMoodOnce("normal")
        say(null)
        st.msgUntil = 0
        st.retargetAt = 0
      }
    }

    if (
      st.entered &&
      st.mood === "normal" &&
      st.pointerDist < 0.3 &&
      st.approachSpeed > 2.4 &&
      now / 1000 > st.startleCooldownUntil
    ) {
      setMoodOnce("startled")
      st.startledUntil = t + 0.9
      st.startleCooldownUntil = now / 1000 + 5
      say("!")
      st.msgUntil = t + 0.9
      const away = new THREE.Vector3(st.pos.x - (st.pointer.x * vw) / 2, st.pos.y - (st.pointer.y * vh) / 2, 0)
      away.normalize().multiplyScalar(2.4)
      st.target.copy(st.pos).add(away)
      st.target.x = THREE.MathUtils.clamp(st.target.x, -vw / 2 + 1, vw / 2 - 1)
      st.target.y = THREE.MathUtils.clamp(st.target.y, -vh / 2 + 1.1, vh / 2 - 1.1)
    }
    if (st.mood === "startled" && t > st.startledUntil) {
      setMoodOnce("normal")
    }

    // --- targeting: realtime cursor companion, wander when the cursor rests ---
    const pointerActive = st.pointerPrev.t > 0 && now - st.pointerPrev.t < 3500
    if (st.entered && st.mood === "normal") {
      if (pointerActive) {
        const cx = (st.pointer.x * vw) / 2
        const cy = (st.pointer.y * vh) / 2
        if (Math.abs(cx) > 1.6) st.side = cx > 0 ? -1 : 1
        st.target.set(
          THREE.MathUtils.clamp(cx + st.side * 1.7, -vw / 2 + 0.9, vw / 2 - 0.9),
          THREE.MathUtils.clamp(cy + 0.55, -vh / 2 + 1.0, vh / 2 - 1.0),
          0,
        )
        st.retargetAt = t + 4
      } else if (t > st.retargetAt || st.pos.distanceTo(st.target) < 0.25) {
        st.target = pickTarget(vw, vh)
        st.retargetAt = t + 6 + Math.random() * 6
      }
    }

    // --- movement ---
    const speed =
      st.mood === "startled" ? 3.4 : st.mood === "sleepy" ? 0.7 : pointerActive ? 2.4 : 1.1
    const alpha = 1 - Math.exp(-dt * speed)
    st.prevPos.copy(st.pos)
    st.pos.lerp(st.target, alpha)
    st.vel.copy(st.pos).sub(st.prevPos).divideScalar(Math.max(dt, 1e-4))
    // Defensive: never let NaN/Inf from a frame hiccup poison the transform
    if (!isFinite(st.vel.x) || !isFinite(st.vel.y) || !isFinite(st.vel.z)) {
      st.vel.set(0, 0, 0)
    }
    if (!isFinite(st.pos.x) || !isFinite(st.pos.y) || !isFinite(st.pos.z)) {
      st.pos.set(vw / 2 - 1.4, vh / 2 - 1.5, 0)
    }

    if (root.current) {
      root.current.position.copy(st.pos)
    }
    if (inner.current) {
      const bobAmp = st.mood === "sleepy" ? 0.03 : 0.07
      inner.current.position.y = Math.sin(t * 2.1) * bobAmp
      const bank = THREE.MathUtils.clamp(-st.vel.x * 0.09, -0.42, 0.42)
      const pitch = THREE.MathUtils.clamp(st.vel.y * 0.055, -0.26, 0.26)
      const sleepyTilt = st.mood === "sleepy" ? 0.22 : 0
      inner.current.rotation.z = THREE.MathUtils.lerp(inner.current.rotation.z, bank + sleepyTilt, 0.12)
      inner.current.rotation.x = THREE.MathUtils.lerp(inner.current.rotation.x, pitch, 0.12)
    }

    // --- head: near-realtime cursor tracking ---
    if (head.current) {
      const cx = (st.pointer.x * vw) / 2
      const cy = (st.pointer.y * vh) / 2
      const goal =
        st.mood === "sleepy"
          ? new THREE.Vector3(st.pos.x, st.pos.y - 4, 6)
          : new THREE.Vector3(cx, cy, 6)
      st.lookTarget.lerp(goal, 1 - Math.exp(-dt * 16))
      head.current.lookAt(st.lookTarget)
    }

    // --- eyes ---
    let eyeScale = 1
    if (st.mood === "sleepy") {
      eyeScale = 0.28
    } else {
      if (t > st.nextBlinkAt) {
        st.blinkUntil = t + 0.13
        st.nextBlinkAt = t + 2.2 + Math.random() * 3.2
      }
      if (t < st.blinkUntil) eyeScale = 0.08
      if (st.mood === "startled") eyeScale = 1.45
    }
    for (const eye of [eyeL.current, eyeR.current]) {
      if (eye) eye.scale.y = THREE.MathUtils.lerp(eye.scale.y, eyeScale, 0.35)
    }

    const swing = Math.sin(t * 2.6) * 0.12 - THREE.MathUtils.clamp(st.vel.x * 0.06, -0.3, 0.3)
    if (legL.current) legL.current.rotation.x = swing
    if (legR.current) legR.current.rotation.x = -swing * 0.8

    if (antennaTip.current) {
      const m = antennaTip.current.material as THREE.MeshStandardMaterial
      m.emissiveIntensity = st.mood === "sleepy" ? 0.4 : 1.6 + Math.sin(t * 4) * 0.8
    }
    if (thruster.current) {
      const flick = 0.75 + Math.sin(t * 22) * 0.18 + Math.random() * 0.06
      thruster.current.scale.set(flick, flick * (st.mood === "sleepy" ? 0.5 : 1), flick)
    }

    // --- quips (ref-driven; never reads stale React state) ---
    if (st.entered && !st.greeted && t > 1.2) {
      st.greeted = true
      say("yo.")
      st.msgUntil = t + 3.5
      st.nextQuipAt = t + 16 + Math.random() * 14
    }
    if (st.mood === "normal" && st.greeted) {
      if (st.shownMsg && t > st.msgUntil) say(null)
      if (!st.shownMsg && t > st.nextQuipAt) {
        say(QUIPS[Math.floor(Math.random() * QUIPS.length)])
        st.msgUntil = t + 3
        st.nextQuipAt = t + 16 + Math.random() * 18
      }
    }
  })

  const accent = palette.accent

  return (
    <group ref={root} scale={0.62}>
      <group ref={inner}>
        {/* head */}
        <group ref={head}>
          <RoundedBox args={[1.2, 0.9, 0.65]} radius={0.09} smoothness={3}>
            <meshStandardMaterial color={palette.body} metalness={0.35} roughness={0.55} />
          </RoundedBox>
          <RoundedBox args={[0.95, 0.62, 0.08]} radius={0.04} smoothness={3} position={[0, 0.02, 0.32]}>
            <meshStandardMaterial color={palette.screen} metalness={0.1} roughness={0.4} />
          </RoundedBox>
          {/* eyes — basic material keeps the brand hue exact */}
          <mesh ref={eyeL} position={[-0.2, 0.08, 0.38]}>
            <boxGeometry args={[0.15, 0.2, 0.02]} />
            <meshBasicMaterial color={accent} toneMapped={false} />
          </mesh>
          <mesh ref={eyeR} position={[0.2, 0.08, 0.38]}>
            <boxGeometry args={[0.15, 0.2, 0.02]} />
            <meshBasicMaterial color={accent} toneMapped={false} />
          </mesh>
          <mesh position={[0, -0.16, 0.38]}>
            <boxGeometry args={[0.28, 0.035, 0.02]} />
            <meshBasicMaterial color={accent} toneMapped={false} transparent opacity={0.8} />
          </mesh>
          <mesh position={[-0.66, 0, 0]}>
            <boxGeometry args={[0.1, 0.34, 0.34]} />
            <meshStandardMaterial color={palette.trim} metalness={0.4} roughness={0.5} />
          </mesh>
          <mesh position={[0.66, 0, 0]}>
            <boxGeometry args={[0.1, 0.34, 0.34]} />
            <meshStandardMaterial color={palette.trim} metalness={0.4} roughness={0.5} />
          </mesh>
          <mesh position={[0, 0.62, 0]}>
            <cylinderGeometry args={[0.018, 0.018, 0.34]} />
            <meshStandardMaterial color={palette.trim} />
          </mesh>
          <mesh ref={antennaTip} position={[0, 0.84, 0]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.6} toneMapped={false} />
          </mesh>
        </group>

        {/* neck + body */}
        <mesh position={[0, -0.55, 0]}>
          <cylinderGeometry args={[0.09, 0.12, 0.18]} />
          <meshStandardMaterial color={palette.trim} />
        </mesh>
        <RoundedBox args={[0.6, 0.34, 0.42]} radius={0.06} smoothness={3} position={[0, -0.8, 0]}>
          <meshStandardMaterial color={palette.body} metalness={0.35} roughness={0.55} />
        </RoundedBox>
        <mesh ref={legL} position={[-0.16, -1.08, 0]}>
          <boxGeometry args={[0.09, 0.26, 0.09]} />
          <meshStandardMaterial color={palette.trim} />
        </mesh>
        <mesh ref={legR} position={[0.16, -1.08, 0]}>
          <boxGeometry args={[0.09, 0.26, 0.09]} />
          <meshStandardMaterial color={palette.trim} />
        </mesh>
        <mesh ref={thruster} position={[0, -1.05, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.16, 0.42, 16, 1, true]} />
          <meshBasicMaterial color={accent} transparent opacity={0.35} side={THREE.DoubleSide} />
        </mesh>
        <pointLight color={accent} intensity={1.8} distance={3} position={[0, -1.1, 0.4]} />

        {msg && (
          <Html position={[0.75, 1.15, 0]} center zIndexRange={[39, 31]} className="pointer-events-none">
            <div
              className={`whitespace-nowrap border bg-background px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-widest ${
                mood === "startled"
                  ? "border-primary text-primary"
                  : mood === "sleepy"
                    ? "border-border text-muted-foreground animate-pulse"
                    : "border-border text-foreground"
              }`}
            >
              {msg}
            </div>
          </Html>
        )}
      </group>
    </group>
  )
}

export default function Robot3DScene() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [active, setActive] = useState(true)
  useEffect(() => setMounted(true), [])

  // Pause the WebGL render loop entirely while the tab is backgrounded.
  useEffect(() => {
    const onVis = () => setActive(!document.hidden)
    document.addEventListener("visibilitychange", onVis)
    return () => document.removeEventListener("visibilitychange", onVis)
  }, [])

  const palette = mounted && resolvedTheme === "light" ? DAY : NIGHT

  return (
    <div className="fixed inset-0 z-30 pointer-events-none hidden md:block" aria-hidden="true">
      <Canvas
        frameloop={active ? "always" : "never"}
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        style={{ pointerEvents: "none" }}
      >
        <ambientLight intensity={1.1} />
        <directionalLight position={[4, 6, 8]} intensity={1.4} />
        <directionalLight position={[-5, -2, 6]} intensity={0.4} />
        <DepthField palette={palette} />
        <Drone palette={palette} />
      </Canvas>
    </div>
  )
}
