import React, { useEffect, useRef, useState } from 'react'
import Spline from '@splinetool/react-spline'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

interface Step3DViewerProps {
  src: string
  poster?: string
  alt?: string
  className?: string
}

const ThreeViewer: React.FC<{ src: string; poster?: string }> = ({ src, poster }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    setLoading(true)
    setError(false)

    const scene = new THREE.Scene()
    const width = container.clientWidth || 400
    const height = container.clientHeight || 300

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2

    while (container.firstChild) {
      container.removeChild(container.firstChild)
    }
    container.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.autoRotate = true
    controls.autoRotateSpeed = 1.5
    controls.enableZoom = true

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6)
    scene.add(ambientLight)

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.5)
    dirLight1.position.set(5, 10, 7)
    scene.add(dirLight1)

    const dirLight2 = new THREE.DirectionalLight(0x0ea5d9, 1.5)
    dirLight2.position.set(-5, -5, -5)
    scene.add(dirLight2)

    let animationFrameId: number

    const handleLoadedObject = (object: THREE.Object3D) => {
      const box = new THREE.Box3().setFromObject(object)
      const center = box.getCenter(new THREE.Vector3())
      const size = box.getSize(new THREE.Vector3())

      object.position.x -= center.x
      object.position.y -= center.y
      object.position.z -= center.z

      scene.add(object)

      const maxDim = Math.max(size.x, size.y, size.z)
      const fov = camera.fov * (Math.PI / 180)
      let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2))
      cameraZ *= 1.4

      camera.position.set(0, size.y * 0.1, cameraZ)
      camera.lookAt(0, 0, 0)
      controls.target.set(0, 0, 0)
      controls.update()

      setLoading(false)

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate)
        controls.update()
        renderer.render(scene, camera)
      }
      animate()
    }

    const safeUrl = encodeURI(src)

    if (src.endsWith('.obj')) {
      const objLoader = new OBJLoader()
      objLoader.load(
        safeUrl,
        (obj) => handleLoadedObject(obj),
        undefined,
        (err) => {
          console.error('Error loading OBJ model:', err)
          setError(true)
          setLoading(false)
        }
      )
    } else {
      const gltfLoader = new GLTFLoader()
      gltfLoader.load(
        safeUrl,
        (gltf) => handleLoadedObject(gltf.scene),
        undefined,
        (err) => {
          console.error('Error loading GLTF/GLB model:', err)
          setError(true)
          setLoading(false)
        }
      )
    }

    const handleResize = () => {
      if (!container) return
      const w = container.clientWidth
      const h = container.clientHeight
      if (w === 0 || h === 0) return
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
      renderer.dispose()
      if (container && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [src])

  if (error && poster) {
    return <img src={poster} alt="3D preview" className="w-full h-full object-cover" />
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-[2px] z-10">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-3 border-[#0ea5d9] border-t-transparent rounded-full animate-spin" />
            <span className="text-xs text-[#5d7284] font-medium">Chargement 3D...</span>
          </div>
        </div>
      )}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
    </div>
  )
}

const SplineViewer: React.FC<{ scene: string; poster?: string }> = ({ scene, poster }) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  if (error && poster) {
    return <img src={poster} alt="3D preview" className="w-full h-full object-cover" />
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-[2px] z-10">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-3 border-[#0ea5d9] border-t-transparent rounded-full animate-spin" />
            <span className="text-xs text-[#5d7284] font-medium">Chargement 3D...</span>
          </div>
        </div>
      )}
      <Spline
        scene={encodeURI(scene)}
        onLoad={() => setLoading(false)}
        onError={(err) => {
          console.error('Spline load error:', err)
          setError(true)
          setLoading(false)
        }}
        className="w-full h-full"
      />
    </div>
  )
}

export const Step3DViewer: React.FC<Step3DViewerProps> = ({ src, poster, alt, className = '' }) => {
  const isSpline = src.endsWith('.spline') || src.endsWith('.splinecode')
  const is3DModel = src.endsWith('.gltf') || src.endsWith('.glb') || src.endsWith('.obj')

  return (
    <div className={`w-full h-full relative overflow-hidden ${className}`}>
      {isSpline ? (
        <SplineViewer scene={src} poster={poster} />
      ) : is3DModel ? (
        <ThreeViewer src={src} poster={poster} />
      ) : (
        <img src={src || poster} alt={alt || 'Step visual'} className="w-full h-full object-cover" />
      )}
    </div>
  )
}
