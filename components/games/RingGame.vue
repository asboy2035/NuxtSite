<script setup lang="ts">
  import { onBeforeUnmount, onMounted, ref } from 'vue'

  type BlockKind = 'regular' | 'explosion' | 'item'
  type ItemKind = 'grow' | 'shrink' | 'fast' | 'slow'
  type Block = {
    angle: number
    span: number
    hp: number
    maxHp: number
    kind: BlockKind
    alive: boolean
  }
  type Ring = {
    radius: number
    thickness: number
    rotation: number
    speed: number
    color: string
    blocks: Block[]
  }
  type Pickup = { angle: number; radius: number; kind: ItemKind; life: number }

  const canvas = ref<HTMLCanvasElement | null>(null)
  const level = ref(1)
  const lives = ref(3)
  const remaining = ref(0)
  const state = ref<'ready' | 'playing' | 'paused' | 'lost' | 'complete'>(
    'ready'
  )
  const { t } = useI18n()

  let context: CanvasRenderingContext2D | null = null
  let frame = 0
  let previous = 0
  let width = 0
  let height = 0
  let scale = 1
  let arena = 0
  let centreX = 0
  let centreY = 0
  let paddleAngle = Math.PI / 2
  let paddleSize = 0.3
  let paddleBoost = 0
  let ballSpeedBoost = 1
  let ballDocked = true
  let keyDirection = 0
  let rings: Ring[] = []
  let pickups: Pickup[] = []
  let levelDelay = 0
  const ball = { x: 0, y: 0, vx: 0, vy: 0, radius: 8 }

  const themes = [
    [ '#8be9fd', '#bd93f9', '#ff79c6' ],
    [ '#67e8f9', '#38bdf8', '#818cf8' ],
    [ '#a7f3d0', '#34d399', '#2dd4bf' ],
    [ '#fde68a', '#fb923c', '#f472b6' ],
    [ '#f9a8d4', '#e879f9', '#a78bfa' ],
    [ '#c4b5fd', '#60a5fa', '#22d3ee' ],
    [ '#86efac', '#facc15', '#fb7185' ],
    [ '#fdba74', '#f87171', '#e879f9' ],
    [ '#99f6e4', '#a5b4fc', '#f0abfc' ],
    [ '#bef264', '#2dd4bf', '#38bdf8' ],
  ]
  const plannedLevels = [
    [ 1, 9, 1, 0 ],
    [ 1, 11, 1, 0 ],
    [ 2, 9, 1, 0 ],
    [ 2, 11, 1, 0.08 ],
    [ 2, 12, 2, -0.1 ],
    [ 3, 10, 2, 0.12 ],
    [ 3, 12, 2, -0.15 ],
    [ 3, 13, 2, 0.18 ],
    [ 4, 11, 3, -0.2 ],
    [ 4, 13, 3, 0.24 ],
  ] as const

  const clamp = (value: number, min: number, max: number) =>
    Math.min(max, Math.max(min, value))
  const between = (angle: number, start: number, span: number) =>
    (angle - start + Math.PI * 4) % (Math.PI * 2) <= span
  const angleAt = (x: number, y: number) => Math.atan2(y - centreY, x - centreX)
  const distanceAt = (x: number, y: number) =>
    Math.hypot(x - centreX, y - centreY)

  function resize(): void {
    if (!canvas.value || !context) return
    const rect = canvas.value.getBoundingClientRect()
    width = Math.max(300, rect.width)
    height = Math.max(360, rect.height)
    scale = Math.min(window.devicePixelRatio || 1, 2)
    canvas.value.width = Math.floor(width * scale)
    canvas.value.height = Math.floor(height * scale)
    context.setTransform(scale, 0, 0, scale, 0, 0)
    centreX = width / 2
    centreY = height / 2
    arena = Math.min(width, height) * 0.4
    ball.radius = clamp(arena * 0.035, 6, 11)
    if (state.value !== 'playing') resetBall()
  }

  function resetBall(): void {
    const paddleThickness = clamp(arena * 0.065, 10, 18)
    const dockRadius = arena * 1.05 - paddleThickness / 2 - ball.radius
    ball.x = centreX + Math.cos(paddleAngle) * dockRadius
    ball.y = centreY + Math.sin(paddleAngle) * dockRadius
    ball.vx = 0
    ball.vy = 0
    ballDocked = true
  }

  function releaseBall(): void {
    const direction = paddleAngle + Math.PI + (Math.random() - 0.5) * 0.34
    const speed = arena * 1.05
    ball.vx = Math.cos(direction) * speed
    ball.vy = Math.sin(direction) * speed
    ballDocked = false
  }

  function buildLevel(number: number): void {
    const preset = plannedLevels[number - 1]
    const generated = !preset
    const ringCount = preset?.[0] ?? clamp(3 + Math.floor(number / 3), 3, 6)
    const blockCount = preset?.[1] ?? 10 + Math.min(8, Math.floor(number / 2))
    const durability = preset?.[2] ?? clamp(1 + Math.floor(number / 6), 1, 3)
    const baseSpin = preset?.[3] ?? 0.12 + Math.min(number, 30) * 0.012
    const colors = themes[(number - 1) % themes.length]!
    rings = Array.from({ length: ringCount }, (_, index) => {
      const count = blockCount + index * (generated ? 1 : 0)
      const gap = 0.035
      const span = (Math.PI * 2) / count
      const offset = (index % 2) * span * 0.45
      const blocks = Array.from({ length: count }, (_, blockIndex): Block => {
        const special = number > 2 && Math.random() < 0.12
        const item = !special && number > 1 && Math.random() < 0.14
        const hp =
          number < 3
            ? 1
            : clamp(durability + (Math.random() > 0.72 ? 1 : 0), 1, 3)
        return {
          angle: offset + blockIndex * span + gap / 2,
          span: span - gap,
          hp,
          maxHp: hp,
          kind: special ? 'explosion' : item ? 'item' : 'regular',
          alive: true,
        }
      })
      return {
        radius: arena * (0.24 + index * (0.52 / Math.max(1, ringCount - 1))),
        thickness: clamp(arena * 0.09, 14, 25),
        rotation: 0,
        speed:
          number < 3
            ? 0
            : baseSpin * (index % 2 ? -1 : 1) * (0.55 + index * 0.22),
        color: colors[index % colors.length]!,
        blocks,
      }
    })
    pickups = []
    remaining.value = rings.reduce(
      (total, ring) => total + ring.blocks.length,
      0
    )
    paddleSize = 0.3
    paddleBoost = 0
    ballSpeedBoost = 1
    levelDelay = 0
    resetBall()
  }

  function start(): void {
    if (state.value === 'lost' || state.value === 'complete') {
      level.value = 1
      lives.value = 3
      buildLevel(level.value)
      state.value = 'playing'
      return
    }
    if (state.value === 'ready') {
      state.value = 'playing'
    }
  }

  function togglePause(): void {
    if (state.value === 'playing') state.value = 'paused'
    else if (state.value === 'paused') state.value = 'playing'
  }

  function loseBall(): void {
    lives.value -= 1
    if (lives.value <= 0) state.value = 'lost'
    else {
      resetBall()
      state.value = 'ready'
    }
  }

  function spawnPickup(angle: number, radius: number): void {
    const kinds: ItemKind[] = [ 'grow', 'shrink', 'fast', 'slow' ]
    pickups.push({
      angle,
      radius,
      kind: kinds[Math.floor(Math.random() * kinds.length)]!,
      life: 9,
    })
  }

  function breakBlock(ring: Ring, block: Block, hitAngle: number): void {
    if (!block.alive) return
    block.alive = false
    remaining.value -= 1
    if (block.kind === 'item') spawnPickup(hitAngle, ring.radius)
    if (block.kind === 'explosion') {
      ring.blocks.forEach((candidate) => {
        const delta = Math.abs(
          ((candidate.angle - block.angle + Math.PI * 3) % (Math.PI * 2)) -
            Math.PI
        )
        if (candidate.alive && delta < block.span * 1.7) {
          candidate.alive = false
          remaining.value -= 1
        }
      })
    }
  }

  function hitBlock(ring: Ring, block: Block, hitAngle: number): void {
    block.hp -= 1
    if (block.hp <= 0) breakBlock(ring, block, hitAngle)
  }

  function update(dt: number): void {
    if (state.value === 'complete') {
      levelDelay -= dt
      if (levelDelay <= 0) {
        level.value += 1
        buildLevel(level.value)
        state.value = 'playing'
      }
      return
    }
    if (state.value !== 'playing') return
    if (levelDelay > 0) {
      levelDelay -= dt
      if (levelDelay <= 0) {
        level.value += 1
        buildLevel(level.value)
      }
      return
    }
    paddleAngle += keyDirection * dt * 2.8
    paddleBoost = Math.max(0, paddleBoost - dt)
    if (paddleBoost === 0) paddleSize = clamp(paddleSize, 0.2, 0.5)
    for (const ring of rings) ring.rotation += ring.speed * dt
    if (ballDocked) {
      resetBall()
      return
    }
    ball.x += ball.vx * dt * ballSpeedBoost
    ball.y += ball.vy * dt * ballSpeedBoost

    const radius = distanceAt(ball.x, ball.y)
    const ballAngle = angleAt(ball.x, ball.y)
    for (const ring of rings) {
      if (Math.abs(radius - ring.radius) > ring.thickness / 2 + ball.radius)
        continue
      const block = ring.blocks.find(
        (candidate) =>
          candidate.alive &&
          between(ballAngle, candidate.angle + ring.rotation, candidate.span)
      )
      if (!block) continue
      const nx = Math.cos(ballAngle)
      const ny = Math.sin(ballAngle)
      const dot = ball.vx * nx + ball.vy * ny
      ball.vx -= 2 * dot * nx
      ball.vy -= 2 * dot * ny
      ball.x +=
        nx *
        (ring.thickness / 2 + ball.radius) *
        (radius > ring.radius ? 1 : -1)
      ball.y +=
        ny *
        (ring.thickness / 2 + ball.radius) *
        (radius > ring.radius ? 1 : -1)
      hitBlock(ring, block, ballAngle - ring.rotation)
      break
    }

    const paddleRadius = arena * 1.05
    const paddleThickness = clamp(arena * 0.065, 10, 18)
    const paddleCatchMargin = 0.045
    const insidePaddleEdge = paddleRadius - paddleThickness / 2 - ball.radius
    const onPaddle =
      Math.abs(
        ((ballAngle - paddleAngle + Math.PI * 3) % (Math.PI * 2)) - Math.PI
      ) <
      paddleSize / 2 + paddleCatchMargin
    if (radius >= insidePaddleEdge && onPaddle) {
      const nx = Math.cos(ballAngle)
      const ny = Math.sin(ballAngle)
      const speed = Math.hypot(ball.vx, ball.vy)
      const offset =
        ((ballAngle - paddleAngle + Math.PI * 3) % (Math.PI * 2)) - Math.PI
      const edge = paddleSize / 2 + paddleCatchMargin
      const deflection = clamp(offset / edge, -1, 1) * 0.78
      const returnAngle = ballAngle + Math.PI - deflection
      ball.vx = Math.cos(returnAngle) * speed
      ball.vy = Math.sin(returnAngle) * speed
      ball.x = centreX + nx * insidePaddleEdge
      ball.y = centreY + ny * insidePaddleEdge
    } else if (radius > paddleRadius + ball.radius) {
      loseBall()
      return
    } else if (radius < arena * 0.12 + ball.radius) {
      const nx = Math.cos(ballAngle)
      const ny = Math.sin(ballAngle)
      const dot = ball.vx * nx + ball.vy * ny
      ball.vx -= 2 * dot * nx
      ball.vy -= 2 * dot * ny
      ball.x = centreX + nx * (arena * 0.12 + ball.radius)
      ball.y = centreY + ny * (arena * 0.12 + ball.radius)
    }

    pickups = pickups.filter((pickup) => {
      pickup.radius += arena * dt * 0.12
      pickup.life -= dt
      const nearPaddle =
        pickup.radius > arena * 0.94 &&
        Math.abs(
          ((pickup.angle - paddleAngle + Math.PI * 3) % (Math.PI * 2)) - Math.PI
        ) <
          paddleSize / 2
      if (nearPaddle) {
        if (pickup.kind === 'grow')
          paddleSize = clamp(paddleSize + 0.12, 0.2, 0.56)
        if (pickup.kind === 'shrink')
          paddleSize = clamp(paddleSize - 0.1, 0.16, 0.56)
        if (pickup.kind === 'fast') ballSpeedBoost = 1.34
        if (pickup.kind === 'slow') ballSpeedBoost = 0.72
        paddleBoost = 6
        return false
      }
      return pickup.life > 0 && pickup.radius < arena * 1.1
    })

    if (remaining.value <= 0) {
      levelDelay = 1.1
      state.value = 'complete'
    }
  }

  function point(radius: number, angle: number): { x: number; y: number } {
    return {
      x: centreX + Math.cos(angle) * radius,
      y: centreY + Math.sin(angle) * radius,
    }
  }

  function trapezoid(
    ctx: CanvasRenderingContext2D,
    radius: number,
    thickness: number,
    angle: number,
    span: number
  ): void {
    const inner = radius - thickness / 2
    const outer = radius + thickness / 2
    const inset = Math.min(span * 0.12, 0.025)
    const a = point(inner, angle + inset)
    const b = point(outer, angle + inset * 0.45)
    const c = point(outer, angle + span - inset * 0.45)
    const d = point(inner, angle + span - inset)
    ctx.beginPath()
    ctx.moveTo(a.x, a.y)
    ctx.lineTo(b.x, b.y)
    ctx.lineTo(c.x, c.y)
    ctx.lineTo(d.x, d.y)
    ctx.closePath()
  }

  function shade(hex: string, amount: number): string {
    const value = Number.parseInt(hex.slice(1), 16)
    const adjust = (shift: number) =>
      clamp(((value >> shift) & 255) + amount, 0, 255)
    return `rgb(${adjust(16)}, ${adjust(8)}, ${adjust(0)})`
  }

  function draw(): void {
    if (!context) return
    const ctx = context
    ctx.clearRect(0, 0, width, height)
    const glow = ctx.createRadialGradient(
      centreX,
      centreY,
      0,
      centreX,
      centreY,
      arena * 1.25
    )
    glow.addColorStop(0, 'rgba(18, 25, 58, .82)')
    glow.addColorStop(0.72, 'rgba(9, 13, 34, .36)')
    glow.addColorStop(1, 'rgba(0, 0, 0, 0)')
    ctx.fillStyle = glow
    ctx.fillRect(0, 0, width, height)

    ctx.strokeStyle = 'rgba(255,255,255,.14)'
    ctx.lineWidth = clamp(arena * 0.025, 3, 7)
    ctx.beginPath()
    ctx.arc(centreX, centreY, arena * 1.05, 0, Math.PI * 2)
    ctx.stroke()
    for (const ring of rings) {
      for (const block of ring.blocks) {
        if (!block.alive) continue
        const angle = block.angle + ring.rotation
        trapezoid(ctx, ring.radius, ring.thickness, angle, block.span)
        const color =
          block.kind === 'explosion'
            ? '#fb7185'
            : block.kind === 'item'
              ? '#facc15'
              : ring.color
        const middle = angle + block.span / 2
        const outer = point(ring.radius + ring.thickness / 2, middle)
        const inner = point(ring.radius - ring.thickness / 2, middle)
        const gradient = ctx.createLinearGradient(
          outer.x,
          outer.y,
          inner.x,
          inner.y
        )
        gradient.addColorStop(0, shade(color, 54))
        gradient.addColorStop(0.38, color)
        gradient.addColorStop(1, shade(color, -58))
        ctx.fillStyle = gradient
        ctx.globalAlpha = 0.7 + (block.hp / block.maxHp) * 0.3
        ctx.fill()
        ctx.strokeStyle = 'rgba(255,255,255,.72)'
        ctx.lineWidth = 1.5
        ctx.stroke()
        if (block.maxHp > 1) {
          const mid = angle + block.span / 2
          ctx.fillStyle = 'rgba(10, 12, 35, .68)'
          ctx.font = `bold ${clamp(arena * 0.055, 10, 16)}px sans-serif`
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(
            String(block.hp),
            centreX + Math.cos(mid) * ring.radius,
            centreY + Math.sin(mid) * ring.radius
          )
        }
      }
    }
    ctx.globalAlpha = 1
    for (const pickup of pickups) {
      const x = centreX + Math.cos(pickup.angle) * pickup.radius
      const y = centreY + Math.sin(pickup.angle) * pickup.radius
      ctx.fillStyle =
        pickup.kind === 'grow'
          ? '#86efac'
          : pickup.kind === 'shrink'
            ? '#fda4af'
            : pickup.kind === 'fast'
              ? '#fbbf24'
              : '#67e8f9'
      ctx.beginPath()
      ctx.arc(x, y, clamp(arena * 0.035, 6, 10), 0, Math.PI * 2)
      ctx.fill()
    }
    const paddleRadius = arena * 1.05
    ctx.strokeStyle = '#f8fafc'
    ctx.lineWidth = clamp(arena * 0.065, 10, 18)
    ctx.lineCap = 'round'
    ctx.beginPath()
    ctx.arc(
      centreX,
      centreY,
      paddleRadius,
      paddleAngle - paddleSize / 2,
      paddleAngle + paddleSize / 2
    )
    ctx.stroke()
    ctx.fillStyle = '#e0e7ff'
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
    ctx.fill()
    const core = arena * 0.12
    ctx.fillStyle = 'rgba(255,255,255,.16)'
    ctx.strokeStyle = 'rgba(255,255,255,.42)'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(centreX, centreY, core, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()
  }

  function loop(time: number): void {
    const dt = Math.min((time - previous) / 1000 || 0, 0.033)
    previous = time
    update(dt)
    draw()
    frame = requestAnimationFrame(loop)
  }

  function setPaddle(event: PointerEvent): void {
    if (!canvas.value) return
    const rect = canvas.value.getBoundingClientRect()
    paddleAngle = Math.atan2(
      event.clientY - rect.top - centreY,
      event.clientX - rect.left - centreX
    )
  }

  function handleCanvasClick(event: PointerEvent): void {
    setPaddle(event)
    if (state.value === 'playing' && ballDocked) releaseBall()
  }

  function keydown(event: KeyboardEvent): void {
    if ([ 'ArrowLeft', 'a', 'A' ].includes(event.key)) {
      keyDirection = -1
      event.preventDefault()
    }
    if ([ 'ArrowRight', 's', 'S', 'd', 'D' ].includes(event.key)) {
      keyDirection = 1
      event.preventDefault()
    }
    if (event.key === ' ') {
      togglePause()
      event.preventDefault()
    }
  }
  function keyup(event: KeyboardEvent): void {
    if (
      [ 'ArrowLeft', 'ArrowRight', 'a', 'A', 's', 'S', 'd', 'D' ].includes(
        event.key
      )
    )
      keyDirection = 0
  }

  onMounted(() => {
    context = canvas.value?.getContext('2d') ?? null
    resize()
    buildLevel(level.value)
    window.addEventListener('resize', resize)
    window.addEventListener('keydown', keydown)
    window.addEventListener('keyup', keyup)
    frame = requestAnimationFrame(loop)
  })
  onBeforeUnmount(() => {
    cancelAnimationFrame(frame)
    window.removeEventListener('resize', resize)
    window.removeEventListener('keydown', keydown)
    window.removeEventListener('keyup', keyup)
  })
</script>

<template>
  <section class="ringGame" :aria-label="t('ring.aria')">
    <header class="hud">
      <span>{{ t('ring.level') }} {{ level }}</span
      ><span>{{ t('ring.blocks') }} {{ remaining }}</span
      ><span>{{ t('ring.lives') }} {{ lives }}</span>
    </header>
    <canvas
      ref="canvas"
      class="gameCanvas"
      @pointermove="setPaddle"
      @pointerdown="handleCanvasClick"
    />
    <div v-if="state !== 'playing'" class="overlay">
      <h2>
        {{
          state === 'lost'
            ? t('ring.gameOver')
            : state === 'complete'
              ? t('ring.complete')
              : t('ring.title')
        }}
      </h2>
      <p>
        {{ state === 'ready' ? t('ring.description') : t('ring.controls') }}
      </p>
      <button class="prominent" @click="start">
        {{ state === 'ready' ? t('ring.start') : t('ring.restart') }}
      </button>
    </div>
    <div class="mobileControls">
      <button
        :aria-label="t('ring.left')"
        @pointerdown="keyDirection = -1"
        @pointerup="keyDirection = 0"
      >
        ◀</button
      ><button
        :aria-label="t('ring.right')"
        @pointerdown="keyDirection = 1"
        @pointerup="keyDirection = 0"
      >
        ▶</button
      ><button @click="togglePause">
        {{ state === 'paused' ? t('ring.start') : 'Ⅱ' }}
      </button>
    </div>
  </section>
</template>

<style scoped lang="sass">
  .ringGame
    position: relative
    width: min(100%, 46rem)
    overflow: hidden
    border: 1px solid rgba(255,255,255,.16)
    border-radius: 1.5rem
    background: rgba(8, 12, 32, .58)
    box-shadow: 0 1rem 3rem rgba(0,0,0,.25)
    backdrop-filter: blur(.7rem)
  .hud
    position: absolute
    top: .85rem
    right: 1rem
    left: 1rem
    z-index: 2
    display: flex
    justify-content: space-between
    font-size: .8rem
    font-weight: 700
    letter-spacing: .08em
    text-transform: uppercase
  .gameCanvas
    display: block
    width: 100%
    height: min(67vh, 42rem)
    cursor: crosshair
    touch-action: none
  .overlay
    position: absolute
    inset: 0
    display: grid
    place-content: center
    gap: .85rem
    padding: 3rem
    text-align: center
    background: rgba(7, 10, 28, .48)
    h2, p
      margin: 0
    p
      max-width: 26rem
  .mobileControls
    position: absolute
    right: 1rem
    bottom: 1rem
    left: 1rem
    display: flex
    flex-direction: row
    justify-content: center
    gap: .5rem
    button
      min-width: 3rem
      min-height: 2.5rem
  @media (min-width: 800px)
    .mobileControls
      display: none
</style>
