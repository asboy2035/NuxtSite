<template>
  <div class="fullScreenCover">
    <div class="fullScreenCoverContent">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="sass">
  .fullScreenCover
    position: fixed
    display: flex
    top: 0
    left: 0
    width: 100vw
    height: 100vh
    height: 100dvh
    align-items: center
    justify-content: center
    z-index: 34
    padding: var(--contentPadding)

    opacity: 0
    background: rgba(0, 0, 0, 0.5)
    backdrop-filter: blur(0.5rem)
    border-radius: 0
    animation: opacity 0.2s ease forwards

  .fullScreenCoverContent
    flex-direction: column
    overflow-y: scroll
    width: 100%

  @keyframes opacity
    0%
      opacity: 0

    100%
      opacity: 1

  @media (prefers-color-scheme: light)
    .fullScreenCover
      background: rgb(225 225 225 / 0.3)
</style>
