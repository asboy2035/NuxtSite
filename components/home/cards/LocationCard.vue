<script setup lang="ts">
  import createGlobe from 'cobe'
  import { onMounted, ref, watch } from 'vue'

  import Card from '+/layout/Card.vue'
  import InteriorItem from '+/layout/InteriorItem.vue'
  import CardTitle from '+/utils/CardTitle.vue'

  const canvasRef = ref<HTMLCanvasElement | null>(null)
  const isDarkMode = ref(0)

  let phi = 0
  let theta = 0.25
  let lastX = 0
  let velocity = 0
  let targetVelocity = 0.0015
  let isDragging = false

  let globe: any = null

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
      mapSamples: 12000,
      mapBrightness: 6,
      baseColor:
        isDarkMode.value == 1 ? [ 0.32, 0.14, 0.93 ] : [ 0.64, 0.51, 0.88 ], // Dark: Light colors
      markerColor: [ 0.63, 0.49, 0.02 ],
      glowColor:
        isDarkMode.value == 1 ? [ 0.49, 0.43, 0.73 ] : [ 0.53, 0.39, 0.79 ], // Dark: Light colors
      markers: [
        { location: [ 44.84685, 0.62871 ], size: 0.1 }, // Bordeaux
      ],
      onRender: (state) => {
        if (!isDragging) {
          velocity = targetVelocity
        }
        phi += velocity
        velocity *= 0.95
        state.phi = phi
        state.theta = theta
      },
    })
  }

  if (import.meta.client) {
    isDarkMode.value =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 1
        : 0

    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      mediaQuery.addEventListener('change', (e) => {
        isDarkMode.value = e.matches ? 1 : 0
      })
    }
  }

  onMounted(() => {
    createGlobeInstance()
    const canvas = document.getElementById('globe')

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
  <Card :index="2" class="autoSpace locationCard">
    <CardTitle title="home.location" icon="solar:point-on-map-line-duotone" />

    <!--Cobe Globe-->
    <InteriorItem class="locationGlobe">
      <canvas ref="canvasRef" id="globe" />
    </InteriorItem>
  </Card>
</template>

<style scoped lang="sass">
  .locationGlobe
    display: flex
    position: relative
    justify-content: flex-end
    align-items: flex-end
    width: 100%
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
