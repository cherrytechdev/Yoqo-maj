// YoqoCard3D.tsx — carte YOQO en 3D (three.js), sans dépendance React supplémentaire.
// Textures :      public/card/yoqo-front.jpg  et  public/card/yoqo-back.jpg
// Utilisation :   <YoqoCard3D />                 (rotation auto + glisser pour tourner)
//                 <YoqoCard3D view="front" />    ("auto" | "front" | "back")
//                 <YoqoCard3D anchor={ref} progress={p} />  canvas plein conteneur : la carte se cale sur `anchor`,
//                 puis p.current de 0 à 1 la fait tourner, venir au centre et zoomer jusqu'à remplir l'écran

import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

export type YoqoCardView = 'auto' | 'front' | 'back'

export interface YoqoCard3DProps {
  view?: YoqoCardView
  className?: string
  style?: React.CSSProperties
  anchor?: React.RefObject<HTMLElement | null>
  progress?: { current: number }
}

export const YoqoCard3D: React.FC<YoqoCard3DProps> = ({ view = 'auto', className = '', style, anchor, progress }) => {
  const hostRef = useRef<HTMLDivElement>(null)
  const viewRef = useRef<YoqoCardView>(view)
  const anchorRef = useRef(anchor)
  const progressRef = useRef(progress)
  const apiRef = useRef<{ setMode: (m: YoqoCardView) => void } | null>(null)

  useEffect(() => {
    viewRef.current = view
    apiRef.current?.setMode(view)
  }, [view])

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.NoToneMapping
    host.appendChild(renderer.domElement)
    renderer.domElement.style.display = 'block'
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100)
    camera.position.set(0, 0, 7.8)

    scene.add(new THREE.HemisphereLight(0xffffff, 0x223344, 1.4))
    const key = new THREE.DirectionalLight(0xffffff, 3.2); key.position.set(3, 4, 6); scene.add(key)
    const rim = new THREE.DirectionalLight(0x9fe4ff, 2.0); rim.position.set(-5, 2, -4); scene.add(rim)
    const fill = new THREE.DirectionalLight(0xffffff, 1.0); fill.position.set(-3, -2, 5); scene.add(fill)

    // Dimensions de la carte (portrait), proportions de l'illustration
    const W = 2.0, H = W * (1062 / 640), T = 0.03, R = W * 0.085
    const shape = new THREE.Shape()
    { const x = -W / 2, y = -H / 2
      shape.moveTo(x + R, y); shape.lineTo(x + W - R, y); shape.quadraticCurveTo(x + W, y, x + W, y + R)
      shape.lineTo(x + W, y + H - R); shape.quadraticCurveTo(x + W, y + H, x + W - R, y + H)
      shape.lineTo(x + R, y + H); shape.quadraticCurveTo(x, y + H, x, y + H - R)
      shape.lineTo(x, y + R); shape.quadraticCurveTo(x, y, x + R, y) }

    const faceGeometry = () => {
      const g = new THREE.ShapeGeometry(shape, 24)
      const pos = g.attributes.position, uv = g.attributes.uv
      for (let i = 0; i < pos.count; i++) uv.setXY(i, (pos.getX(i) + W / 2) / W, (pos.getY(i) + H / 2) / H)
      uv.needsUpdate = true
      return g
    }
    const loader = new THREE.TextureLoader()
    const tex = (src: string) => { const t = loader.load(src); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = renderer.capabilities.getMaxAnisotropy(); return t }
    const faceMat = (map: THREE.Texture) => new THREE.MeshPhysicalMaterial({ map, roughness: 0.6, clearcoat: 0.15, clearcoatRoughness: 0.4, specularIntensity: 0.35 })

    const card = new THREE.Group()
    const front = new THREE.Mesh(faceGeometry(), faceMat(tex('/card/yoqo-front.jpg')))
    front.position.z = T / 2 + 0.0005
    const back = new THREE.Mesh(faceGeometry(), faceMat(tex('/card/yoqo-back.jpg')))
    back.rotation.y = Math.PI; back.position.z = -T / 2 - 0.0005
    const edge = new THREE.Mesh(
      new THREE.ExtrudeGeometry(shape, { depth: T, bevelEnabled: false, curveSegments: 24 }),
      new THREE.MeshPhysicalMaterial({ color: 0x0a1626, roughness: 0.35, clearcoat: 0.4 })
    )
    edge.position.z = -T / 2
    card.add(edge, front, back)
    scene.add(card)

    // Animation et interaction
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const Z_BACK = Math.PI / 2 // le dos est horizontal : quart de tour pour le lire droit
    let mode: YoqoCardView = 'auto', targetY = 0, targetX = 0, targetZ = 0
    let rotY = -0.35, rotX = 0.08, rotZ = 0, velY = 0, dragging = false, lastX = 0, lastY = 0, idleUntil = 0
    const nearest = (cur: number, base: number) => base + Math.round((cur - base) / (2 * Math.PI)) * 2 * Math.PI
    const setMode = (m: YoqoCardView) => {
      mode = reduce && m === 'auto' ? 'front' : m
      if (mode === 'auto') targetZ = 0
      if (mode === 'front') { targetY = nearest(rotY, 0); targetX = 0.06; targetZ = 0 }
      if (mode === 'back') { targetY = nearest(rotY, Math.PI); targetX = 0; targetZ = Z_BACK }
    }
    apiRef.current = { setMode }
    setMode(viewRef.current)

    // avec une ancre, le canvas couvre tout le conteneur et la manipulation se fait sur l'ancre
    const anchorEl = anchorRef.current?.current ?? null
    if (anchorEl) renderer.domElement.style.pointerEvents = 'none'
    const el = anchorEl ?? renderer.domElement
    el.style.touchAction = 'pan-y'
    el.style.cursor = 'grab'
    const down = (e: PointerEvent) => { if (spinning) return; dragging = true; lastX = e.clientX; lastY = e.clientY; velY = 0; el.setPointerCapture(e.pointerId) }
    const move = (e: PointerEvent) => {
      if (!dragging) return
      const dx = e.clientX - lastX, dy = e.clientY - lastY; lastX = e.clientX; lastY = e.clientY
      rotY += dx * 0.01; rotX = Math.max(-0.6, Math.min(0.6, rotX + dy * 0.006)); velY = dx * 0.01
    }
    const up = () => {
      if (!dragging) return; dragging = false; idleUntil = performance.now() + 2500
      if (mode !== 'auto') targetY = nearest(rotY, mode === 'back' ? Math.PI : 0)
    }
    el.addEventListener('pointerdown', down); el.addEventListener('pointermove', move)
    el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up)

    // place de la carte au repos (sur l'ancre) et échelle qui remplit l'écran en fin de zoom
    let s0 = 1, x0 = 0, y0 = 0, s1 = 1
    const resize = () => {
      const r = host.getBoundingClientRect()
      if (!r.width || !r.height) return
      renderer.setSize(r.width, r.height, false)
      camera.aspect = r.width / r.height
      camera.position.z = camera.aspect < 0.8 ? 9.6 : 7.8
      camera.updateProjectionMatrix()
      const V = 2 * camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))
      if (anchorEl) {
        const a = anchorEl.getBoundingClientRect(), upp = V / r.height
        s0 = a.height / r.height
        x0 = (a.left + a.width / 2 - (r.left + r.width / 2)) * upp
        y0 = -(a.top + a.height / 2 - (r.top + r.height / 2)) * upp
      }
      s1 = Math.max((V * camera.aspect * 1.15) / W, (V * 1.15) / H)
    }
    const ro = new ResizeObserver(resize); ro.observe(host); if (anchorEl) ro.observe(anchorEl); resize()

    let spinning = false, startY = 0, startX = 0, startZ = 0, endY = 0
    const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
    const easeInOut = (v: number) => (v < 0.5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2)

    const clock = new THREE.Clock()
    let raf = 0
    const tick = () => {
      raf = requestAnimationFrame(tick)
      const t = clock.getElapsedTime()
      const p = clamp01(progressRef.current?.current ?? 0)
      // GSAP transmet 0.000001 en haut de page : seuil plutôt que zéro exact
      if (p > 0.001 && !spinning) {
        spinning = true; dragging = false
        startY = rotY; startX = rotX; startZ = rotZ
        endY = Math.ceil(startY / (2 * Math.PI)) * 2 * Math.PI + 4 * Math.PI // deux tours, fin de face
      } else if (p <= 0.001 && spinning) {
        spinning = false; rotY = startY; rotX = startX; rotZ = startZ
      }
      // pas de rendu quand le conteneur est hors écran (test direct, fiable avec le pin GSAP)
      const hr = host.getBoundingClientRect()
      if (hr.bottom <= 0 || hr.top >= window.innerHeight) return
      if (spinning) {
        const rp = easeInOut(clamp01(p / 0.75)), mp = easeInOut(clamp01(p / 0.6))
        const sp = p * p * p
        card.rotation.set(startX + (0 - startX) * rp, startY + (endY - startY) * rp, startZ * (1 - rp))
        card.position.set(x0 * (1 - mp), y0 * (1 - mp), 0)
        card.scale.setScalar(s0 * Math.pow(s1 / s0, sp))
        renderer.render(scene, camera)
        return
      }
      if (!dragging) {
        if (mode === 'auto' && performance.now() > idleUntil) {
          velY += (0.006 - velY) * 0.03; rotY += velY
          rotX += (0.12 * Math.sin(t * 0.6) - rotX) * 0.03
        } else if (mode === 'auto') { velY *= 0.95; rotY += velY }
        else { rotY += (targetY - rotY) * 0.08; rotX += (targetX - rotX) * 0.08 }
      }
      rotZ += (targetZ - rotZ) * 0.08
      card.rotation.set(rotX, rotY, rotZ + (mode === 'auto' && !reduce ? 0.05 * Math.sin(t * 0.8) : 0))
      card.position.set(x0, y0 + (reduce ? 0 : 0.06 * s0 * Math.sin(t * 1.2)), 0)
      card.scale.setScalar(s0)
      renderer.render(scene, camera)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf); ro.disconnect()
      el.removeEventListener('pointerdown', down); el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', up)
      scene.traverse((o) => {
        const mesh = o as THREE.Mesh
        mesh.geometry?.dispose()
        const mat = mesh.material as THREE.MeshPhysicalMaterial | undefined
        if (mat) { mat.map?.dispose(); mat.dispose() }
      })
      renderer.dispose(); host.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={hostRef}
      className={className}
      style={{ width: '100%', aspectRatio: '4 / 3', ...style }}
      role="img"
      aria-label="Carte YOQO Platinum Prepaid en 3D"
    />
  )
}
