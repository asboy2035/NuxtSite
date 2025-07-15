<script setup lang="ts">
  import Card from "@/components/layout/Card.vue"
  import CardTitle from "@/components/utils/CardTitle.vue"
  import { onMounted, ref, watch } from 'vue'
  import createGlobe from 'cobe'
  import InteriorItem from "~/components/layout/InteriorItem.vue";

  const canvasRef = ref<HTMLCanvasElement | null>(null)
  const isDarkMode = ref(0)

  let phi = 0
  let theta = 0.25
  let lastX = 0
  let velocity = 0
  let targetVelocity = 0.0015
  let isDragging = false

  let globe: any  = null

  const createGlobeInstance = () => {
    if (globe) globe.destroy()

    globe = createGlobe(canvasRef.value!, {
      devicePixelRatio: 2,
      width: 300 * 2,
      height: 600,
      phi: 0,
      theta,
      dark: isDarkMode.value,
      diffuse: 1.4,
      mapSamples: 20000,
      mapBrightness: 6,
      baseColor: [0.32, 0.14, 0.93],
      markerColor: [0.63, 0.49, 0.02],
      glowColor: [0.49, 0.43, 0.73],
      markers: [
        { location: [44.84685, 0.62871], size: 0.1 }, // Bordeaux
      ],
      onRender: (state) => {
        if (!isDragging) {
          velocity = targetVelocity
        }
        phi += velocity
        velocity *= 0.95
        state.phi = phi
        state.theta = theta
      }
    })
  }

  if (import.meta.client) {
    isDarkMode.value = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 1 : 0

    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      mediaQuery.addEventListener('change', (e) => {
        isDarkMode.value = e.matches ? 1 : 0
      })
    }
  }

  onMounted(() => {
    createGlobeInstance()
    const canvas = document.getElementById("globe")

    watch(isDarkMode, () => {
      createGlobeInstance()
    })

    // Mouse drag listeners
    const onPointerDown = (e: PointerEvent) => {
      isDragging = true
      lastX = e.clientX
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return
      const deltaX = e.clientX - lastX
      lastX = e.clientX
      velocity = deltaX * 0.005
    }

    const onPointerUp = () => {
      isDragging = false
    }

    canvas?.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)

    return () => {
      globe.destroy()
      canvas?.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
    }
  })
</script>

<template>
  <card class="autoSpace locationCard">
    <card-title
      title="Bordeaux, FR"
      icon="solar:point-on-map-line-duotone"
    />

    <interior-item class="locationGlobe">
      <canvas ref="canvasRef" id="globe" />
    </interior-item>
  </card>
</template>

<style scoped lang="sass">
  .locationGlobe
    display: flex
    position: relative
    justify-content: flex-end
    align-items: flex-end
    width: calc(100% - 1.5rem)
    height: 16rem
    overflow: hidden

    canvas
      position: absolute
      width: 100%
      min-height: 300px
      max-height: 100%
      scale: 2
      transform: translateX(-50)
      top: 50%
</style>
