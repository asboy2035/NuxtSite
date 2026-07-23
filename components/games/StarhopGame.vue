<script setup lang="ts">
  import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

  type Platform = {
    x: number
    y: number
    w: number
    h: number
  }

  type Token = {
    x: number
    y: number
    r: number
    glow: number
  }

  type Enemy = {
    x: number
    y: number
    r: number
    wobble: number
    dir: number
  }

  type Star = {
    x: number
    y: number
    r: number
    a: number
    speed: number
  }

  type ShootingStar = {
    x: number
    y: number
    vx: number
    vy: number
    life: number
    ttl: number
  }

  const canvasEl = ref<HTMLCanvasElement | null>(null)
  const score = ref(0)
  const tokens = ref(0)
  const best = ref(0)
  const statusKey = ref('starhop.statusReady')
  const isGameOver = ref(false)
  const easyMode = ref(false)
  const { t } = useI18n()
  const status = computed(() => (statusKey.value ? t(statusKey.value) : ''))
  const labels = computed(() => ({
    title: t('starhop.title'),
    hud: t('starhop.hud'),
    easyMode: t('starhop.easyMode'),
    gameOver: t('starhop.gameOver'),
    score: t('starhop.score'),
    tokens: t('starhop.tokens'),
    best: t('starhop.best'),
    aria: t('starhop.aria'),
  }))

  let ctx: CanvasRenderingContext2D | null = null
  let rafId = 0
  let lastTime = 0
  let width = 0
  let height = 0
  let dpr = 1
  let running = false
  let started = false
  let cleanup: (() => void) | null = null

  const palette = {
    background: '#c3acff',
    foreground: '#a28fc9',
    text: '#190043',
    accent: '#9f75e8',
    shadow: 'rgba(244, 226, 255, 0.8)',
    swirly01: '#8f5bea',
    swirly02: '#da5abd',
  }

  const player = {
    x: 0,
    y: 0,
    r: 18,
    vy: 0,
    jumpCount: 0,
    coyote: 0,
    tilt: 0,
  }

  let speed = 260
  let distance = 0
  const gravity = 1800
  const jumpVelocity = 620
  const maxJump = 2
  const coyoteTime = 0.12

  const platforms: Platform[] = []
  const tokensList: Token[] = []
  const enemies: Enemy[] = []
  const stars: Star[] = []
  const shootingStars: ShootingStar[] = []

  let nextPlatformX = 0
  let lastHudUpdate = 0
  let lastShoot = 0

  const rand = (min: number, max: number): number =>
    Math.random() * (max - min) + min

  const clamp = (value: number, min: number, max: number): number =>
    Math.min(max, Math.max(min, value))

  const readPalette = (): void => {
    const styles = getComputedStyle(document.documentElement)
    palette.background =
      styles.getPropertyValue('--backgroundColor').trim() || palette.background
    palette.foreground =
      styles.getPropertyValue('--foregroundOpaque').trim() || palette.foreground
    palette.text = styles.getPropertyValue('--textColor').trim() || palette.text
    palette.accent =
      styles.getPropertyValue('--accentColor').trim() || palette.accent
    palette.shadow =
      styles.getPropertyValue('--shadowColor').trim() || palette.shadow
    palette.swirly01 =
      styles.getPropertyValue('--swirly01').trim() || palette.swirly01
    palette.swirly02 =
      styles.getPropertyValue('--swirly02').trim() || palette.swirly02
  }

  const resize = (): void => {
    if (!canvasEl.value || !ctx) return
    const rect = canvasEl.value.getBoundingClientRect()
    width = Math.max(320, rect.width)
    height = Math.max(320, rect.height)
    dpr = window.devicePixelRatio || 1

    canvasEl.value.width = Math.floor(width * dpr)
    canvasEl.value.height = Math.floor(height * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    player.r = clamp(height * 0.035, 14, 22)
    player.x = width * 0.25
  }

  const seedStars = (): void => {
    stars.length = 0
    const count = Math.floor(width * 0.14)
    for (let i = 0; i < count; i += 1) {
      stars.push({
        x: rand(0, width),
        y: rand(0, height),
        r: rand(0.6, 1.8),
        a: rand(0.4, 0.95),
        speed: rand(10, 28),
      })
    }
  }

  const resetWorld = (): void => {
    speed = 260
    distance = 0
    player.y = height * 0.5
    player.vy = 0
    player.jumpCount = 0
    player.coyote = 0
    player.tilt = 0

    platforms.length = 0
    tokensList.length = 0
    enemies.length = 0

    const baseY = height * 0.74
    const startWidth = width * 0.8

    platforms.push({
      x: 0,
      y: baseY,
      w: startWidth,
      h: clamp(height * 0.035, 12, 18),
    })

    nextPlatformX = startWidth
    while (nextPlatformX < width * 1.8) {
      addPlatform()
    }

    score.value = 0
    tokens.value = 0
    isGameOver.value = false
    statusKey.value = 'starhop.statusReady'
  }

  const addPlatform = (): void => {
    const minW = width * 0.18
    const maxW = width * 0.32
    const gap = rand(width * 0.08, width * 0.18)
    const w = rand(minW, maxW)
    const baseY = height * 0.74
    const variance = height * 0.22
    const y = clamp(baseY - rand(0, variance), height * 0.32, height * 0.82)

    const platform: Platform = {
      x: nextPlatformX + gap,
      y,
      w,
      h: clamp(height * 0.035, 12, 18),
    }
    platforms.push(platform)

    if (Math.random() < 0.7) {
      const tokenCount = Math.floor(rand(1, 4))
      for (let i = 0; i < tokenCount; i += 1) {
        tokensList.push({
          x: platform.x + platform.w * rand(0.2, 0.8),
          y: platform.y - rand(22, 44),
          r: rand(6, 10),
          glow: rand(0.6, 1),
        })
      }
    }

    if (!easyMode.value && Math.random() < 0.35) {
      enemies.push({
        x: platform.x + platform.w * rand(0.2, 0.8),
        y: platform.y - clamp(height * 0.022, 10, 14),
        r: clamp(height * 0.022, 10, 14),
        wobble: rand(0, Math.PI * 2),
        dir: Math.random() < 0.5 ? -1 : 1,
      })
    }

    nextPlatformX = platform.x + platform.w
  }

  const syncEasyMode = (): void => {
    if (easyMode.value) {
      enemies.length = 0
    }
  }

  const handleJump = (): void => {
    if (isGameOver.value) {
      resetWorld()
      started = true
      running = true
      statusKey.value = ''
      return
    }

    if (!started) {
      started = true
      running = true
      statusKey.value = ''
    }

    const canJump = player.coyote > 0 || player.jumpCount < maxJump
    if (canJump) {
      player.vy = -jumpVelocity
      player.jumpCount += 1
      player.coyote = 0
    }
  }

  const updatePlayer = (dt: number): void => {
    player.vy += gravity * dt
    const nextY = player.y + player.vy * dt

    let landed = false
    if (player.vy >= 0) {
      for (const platform of platforms) {
        const withinX =
          player.x + player.r > platform.x + 6 &&
          player.x - player.r < platform.x + platform.w - 6
        const crossed =
          player.y + player.r <= platform.y && nextY + player.r >= platform.y
        if (withinX && crossed) {
          player.y = platform.y - player.r
          player.vy = 0
          player.jumpCount = 0
          player.coyote = coyoteTime
          landed = true
          break
        }
      }
    }

    if (!landed) {
      player.y = nextY
      player.coyote = Math.max(0, player.coyote - dt)
    }

    player.tilt = clamp(player.vy / 900, -0.35, 0.35)
  }

  const updateWorld = (dt: number): void => {
    const shift = speed * dt
    distance += shift
    speed = Math.min(520, speed + dt * 8)

    nextPlatformX -= shift
    for (const platform of platforms) {
      platform.x -= shift
    }
    for (const token of tokensList) {
      token.x -= shift
    }
    for (const enemy of enemies) {
      enemy.x -= shift
      enemy.wobble += dt * 4
      enemy.x += Math.sin(enemy.wobble) * enemy.dir * dt * 10
    }
    for (const star of stars) {
      star.x -= star.speed * dt
      if (star.x < -10) {
        star.x = width + 10
        star.y = rand(0, height)
      }
    }
    for (const streak of shootingStars) {
      streak.x += streak.vx * dt
      streak.y += streak.vy * dt
      streak.life += dt
    }

    while (platforms.length && platforms[0]!.x + platforms[0]!.w < -80) {
      platforms.shift()
    }
    while (tokensList.length && tokensList[0]!.x < -80) {
      tokensList.shift()
    }
    while (enemies.length && enemies[0]!.x + enemies[0]!.r < -80) {
      enemies.shift()
    }
    while (
      shootingStars.length &&
      shootingStars[0]!.life > shootingStars[0]!.ttl
    ) {
      shootingStars.shift()
    }

    while (nextPlatformX < width * 1.8) {
      addPlatform()
    }

    if (easyMode.value && enemies.length) {
      enemies.length = 0
    }

    if (player.y - player.r > height + 80) {
      triggerGameOver()
    }
  }

  const handleCollisions = (): void => {
    for (let i = tokensList.length - 1; i >= 0; i -= 1) {
      const token = tokensList[i]
      const dx = player.x - token!.x
      const dy = player.y - token!.y
      const dist = Math.hypot(dx, dy)
      if (dist < player.r + token!.r + 6) {
        tokensList.splice(i, 1)
        tokens.value += 1
        score.value += 60
      }
    }

    if (easyMode.value) {
      enemies.length = 0
      return
    }

    for (const enemy of enemies) {
      const dx = player.x - enemy.x
      const dy = player.y - enemy.y
      const dist = Math.hypot(dx, dy)
      if (dist < player.r + enemy.r * 0.9) {
        triggerGameOver()
        return
      }
    }
  }

  const triggerGameOver = (): void => {
    if (isGameOver.value) return
    isGameOver.value = true
    running = false
    statusKey.value = 'starhop.statusRetry'
    best.value = Math.max(best.value, score.value)
  }

  const updateScore = (dt: number, now: number): void => {
    score.value += Math.floor(speed * dt * 0.08)
    if (now - lastHudUpdate > 120) {
      lastHudUpdate = now
    }
  }

  const spawnShootingStar = (now: number): void => {
    if (now - lastShoot < 2400 || shootingStars.length > 2) return
    if (Math.random() < 0.5) return

    lastShoot = now
    shootingStars.push({
      x: rand(width * 0.2, width * 0.9),
      y: rand(0, height * 0.4),
      vx: rand(120, 220),
      vy: rand(80, 140),
      life: 0,
      ttl: rand(0.6, 1.1),
    })
  }

  const drawBackground = (): void => {
    if (!ctx) return
    const gradient = ctx.createLinearGradient(0, 0, 0, height)
    gradient.addColorStop(0, palette.swirly01)
    gradient.addColorStop(0.6, palette.swirly02)
    gradient.addColorStop(1, palette.background)

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    ctx.save()
    ctx.globalAlpha = 0.6
    for (const star of stars) {
      ctx.fillStyle = `rgba(255, 255, 255, ${star.a})`
      ctx.beginPath()
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.restore()

    ctx.save()
    ctx.lineCap = 'round'
    for (const streak of shootingStars) {
      const alpha = 1 - streak.life / streak.ttl
      ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(streak.x, streak.y)
      ctx.lineTo(streak.x - streak.vx * 0.15, streak.y - streak.vy * 0.15)
      ctx.stroke()
    }
    ctx.restore()

    ctx.save()
    ctx.globalAlpha = 0.4
    for (let i = 0; i < 4; i += 1) {
      const x = ((distance * 0.08 + i * 220) % (width + 240)) - 120
      const y = height * (0.15 + i * 0.15)
      const radius = width * 0.18
      const puff = ctx.createRadialGradient(x, y, 0, x, y, radius)
      puff.addColorStop(0, 'rgba(255,255,255,0.35)')
      puff.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = puff
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.restore()
  }

  const drawPlatforms = (): void => {
    if (!ctx) return
    ctx.save()
    ctx.shadowColor = palette.shadow
    ctx.shadowBlur = 12
    ctx.fillStyle = palette.foreground
    for (const platform of platforms) {
      const radius = Math.min(platform.h * 0.5, 10)
      if (ctx.roundRect) {
        ctx.beginPath()
        ctx.roundRect(platform.x, platform.y, platform.w, platform.h, radius)
        ctx.fill()
      } else {
        ctx.beginPath()
        ctx.moveTo(platform.x + radius, platform.y)
        ctx.lineTo(platform.x + platform.w - radius, platform.y)
        ctx.quadraticCurveTo(
          platform.x + platform.w,
          platform.y,
          platform.x + platform.w,
          platform.y + radius
        )
        ctx.lineTo(platform.x + platform.w, platform.y + platform.h - radius)
        ctx.quadraticCurveTo(
          platform.x + platform.w,
          platform.y + platform.h,
          platform.x + platform.w - radius,
          platform.y + platform.h
        )
        ctx.lineTo(platform.x + radius, platform.y + platform.h)
        ctx.quadraticCurveTo(
          platform.x,
          platform.y + platform.h,
          platform.x,
          platform.y + platform.h - radius
        )
        ctx.lineTo(platform.x, platform.y + radius)
        ctx.quadraticCurveTo(
          platform.x,
          platform.y,
          platform.x + radius,
          platform.y
        )
        ctx.closePath()
        ctx.fill()
      }
      ctx.fillStyle = palette.accent
      ctx.globalAlpha = 0.4
      if (ctx.roundRect) {
        ctx.beginPath()
        ctx.roundRect(
          platform.x,
          platform.y,
          platform.w,
          platform.h * 0.45,
          radius
        )
        ctx.fill()
      } else {
        ctx.beginPath()
        ctx.moveTo(platform.x + radius, platform.y)
        ctx.lineTo(platform.x + platform.w - radius, platform.y)
        ctx.quadraticCurveTo(
          platform.x + platform.w,
          platform.y,
          platform.x + platform.w,
          platform.y + radius
        )
        ctx.lineTo(platform.x + platform.w, platform.y + platform.h * 0.45)
        ctx.lineTo(platform.x, platform.y + platform.h * 0.45)
        ctx.lineTo(platform.x, platform.y + radius)
        ctx.quadraticCurveTo(
          platform.x,
          platform.y,
          platform.x + radius,
          platform.y
        )
        ctx.closePath()
        ctx.fill()
      }
      ctx.globalAlpha = 1
      ctx.fillStyle = palette.foreground
    }
    ctx.restore()
  }

  const drawTokens = (): void => {
    if (!ctx) return
    ctx.save()
    for (const token of tokensList) {
      const glow = ctx.createRadialGradient(
        token.x,
        token.y,
        0,
        token.x,
        token.y,
        token.r * 2.4
      )
      glow.addColorStop(0, `rgba(255, 245, 255, ${0.6 * token.glow})`)
      glow.addColorStop(0.6, `rgba(255, 184, 250, ${0.28 * token.glow})`)
      glow.addColorStop(1, 'rgba(255, 184, 250, 0)')
      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(token.x, token.y, token.r * 3, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = '#fff'
      ctx.beginPath()
      ctx.arc(token.x, token.y, token.r, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.restore()
  }

  const drawEnemies = (): void => {
    if (!ctx) return
    ctx.save()
    for (const enemy of enemies) {
      const bob = Math.sin(enemy.wobble) * 2
      ctx.fillStyle = '#ff4b5c'
      ctx.beginPath()
      ctx.arc(enemy.x, enemy.y + bob, enemy.r, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)'
      ctx.beginPath()
      ctx.arc(
        enemy.x - enemy.r * 0.3,
        enemy.y + bob - enemy.r * 0.1,
        enemy.r * 0.3,
        0,
        Math.PI * 2
      )
      ctx.arc(
        enemy.x + enemy.r * 0.3,
        enemy.y + bob - enemy.r * 0.1,
        enemy.r * 0.3,
        0,
        Math.PI * 2
      )
      ctx.fill()
    }
    ctx.restore()
  }

  const drawPlayer = (): void => {
    if (!ctx) return
    ctx.save()
    ctx.translate(player.x, player.y)
    ctx.rotate(player.tilt)

    const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, player.r * 2.5)
    glow.addColorStop(0, 'rgba(255, 255, 255, 0.75)')
    glow.addColorStop(0.5, 'rgba(255, 195, 255, 0.45)')
    glow.addColorStop(1, 'rgba(255, 195, 255, 0)')
    ctx.fillStyle = glow
    ctx.beginPath()
    ctx.arc(0, 0, player.r * 2.5, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = '#fff'
    ctx.beginPath()
    ctx.arc(0, 0, player.r, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = 'rgba(159, 117, 232, 0.5)'
    ctx.beginPath()
    ctx.arc(-player.r * 0.3, -player.r * 0.3, player.r * 0.4, 0, Math.PI * 2)
    ctx.fill()

    ctx.restore()
  }

  const render = (now: number): void => {
    if (!ctx) return
    drawBackground()
    drawPlatforms()
    drawTokens()
    drawEnemies()
    drawPlayer()

    ctx.save()
    ctx.globalAlpha = 0.8
    ctx.font = `600 ${clamp(width * 0.03, 18, 26)}px "PP Agrandir", sans-serif`
    ctx.fillStyle = palette.text
    ctx.fillText(`${labels.value.score} ${score.value}`, 24, 36)
    ctx.font = `500 ${clamp(width * 0.024, 14, 20)}px "PP Neue Montreal", sans-serif`
    ctx.fillStyle = palette.text
    ctx.fillText(`${labels.value.tokens} ${tokens.value}`, 24, 62)
    if (best.value > 0) {
      ctx.fillText(`${labels.value.best} ${best.value}`, 24, 86)
    }
    ctx.restore()
  }

  const loop = (now: number): void => {
    const delta = (now - lastTime) / 1000
    lastTime = now

    if (running) {
      updatePlayer(delta)
      updateWorld(delta)
      handleCollisions()
      updateScore(delta, now)
      spawnShootingStar(now)
    }

    render(now)
    rafId = requestAnimationFrame(loop)
  }

  const attachControls = (): (() => void) => {
    const handleKey = (event: KeyboardEvent): void => {
      if (
        event.code === 'Space' ||
        event.code === 'ArrowUp' ||
        event.code === 'KeyW'
      ) {
        event.preventDefault()
        handleJump()
      }
    }

    const handlePointer = (event: PointerEvent): void => {
      event.preventDefault()
      handleJump()
    }

    window.addEventListener('keydown', handleKey)
    canvasEl.value?.addEventListener('pointerdown', handlePointer)

    return () => {
      window.removeEventListener('keydown', handleKey)
      canvasEl.value?.removeEventListener('pointerdown', handlePointer)
    }
  }

  onMounted(() => {
    if (!canvasEl.value) return
    ctx = canvasEl.value.getContext('2d')
    if (!ctx) return

    readPalette()
    resize()
    seedStars()
    resetWorld()
    syncEasyMode()

    const observer = new ResizeObserver(() => {
      resize()
      seedStars()
      resetWorld()
      syncEasyMode()
    })
    observer.observe(canvasEl.value)

    const detach = attachControls()

    lastTime = performance.now()
    rafId = requestAnimationFrame(loop)
    cleanup = () => {
      observer.disconnect()
      detach()
      cancelAnimationFrame(rafId)
    }
  })

  onBeforeUnmount(() => {
    cleanup?.()
  })
</script>

<template>
  <div class="starhop">
    <canvas ref="canvasEl" class="starhopCanvas" :aria-label="labels.aria" />
    <div class="hud">
      <h2>{{ labels.title }}</h2>
      <p>{{ labels.hud }}</p>
      <p class="small">{{ status }}</p>
      <label class="toggle">
        <input v-model="easyMode" type="checkbox" @change="syncEasyMode" />
        <span>{{ labels.easyMode }}</span>
      </label>
    </div>
    <div v-if="isGameOver" class="overlay">{{ labels.gameOver }}</div>
  </div>
</template>

<style scoped lang="sass">
  .starhop
    position: relative
    display: block
    width: 100%
    min-height: 360px
    border-radius: 1.5rem
    overflow: hidden
    box-shadow: 0 30px 80px rgba(68, 26, 120, 0.25)
    background: var(--backgroundColor)

  .starhopCanvas
    width: 100%
    height: clamp(360px, 60vh, 640px)
    backdrop-filter: blur(1rem)
    display: block
    border-radius: 1.5rem
    touch-action: none

  .hud
    position: absolute
    top: 1.25rem
    right: 1.25rem
    max-width: 18rem
    padding: 0.85rem
    display: flex
    align-items: flex-start
    gap: 0.35rem
    background: var(--foregroundColor)
    border: 0.1rem solid var(--foregroundColor)
    border-radius: 1rem
    text-align: left
    color: #fff

    h2
      font-size: 1.2rem
      margin: 0
      color: #fff

    p
      margin: 0
      font-size: 0.9rem
      color: rgba(255, 255, 255, 0.9)

    .small
      font-size: 0.78rem
      opacity: 0.9

    .toggle
      display: flex
      align-items: center
      gap: 0.5rem
      font-size: 0.85rem
      opacity: 0.9
      margin-top: 0.35rem

      input
        width: 1rem
        height: 1rem

  .overlay
    position: absolute
    inset: 0
    display: flex
    align-items: center
    justify-content: center
    font-family: var(--headerFont)
    font-size: clamp(1.5rem, 4vw, 2.5rem)
    background: rgba(12, 0, 35, 0.35)
    color: #fff
    text-transform: uppercase
    letter-spacing: 3px

  @media (max-width: 720px)
    .hud
      left: 1rem
      right: 1rem
      max-width: none
      bottom: 1rem
      top: auto
</style>
