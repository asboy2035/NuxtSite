<script setup lang="ts">
  defineProps<{
    title: string
    description: string
    group: string
  }>()
</script>

<template>
  <div class="pagePreview">
    <div class="content">
      <div class="group">
        <img class="avatar" src="/images/avatar.webp" alt="ash's Avatar" />
        <p class="groupText groupName">{{ group }}</p>
        <p class="groupText separator">/</p>
        <p class="groupText">@a35hie</p>
      </div>

      <h1 class="title">{{ title }}</h1>
      <p class="description">{{ description }}</p>
    </div>

    <img
      src="/images/SitePreviewBg.webp"
      class="background"
      alt="Preview Background"
    />
  </div>
</template>

<style scoped lang="css">
  .pagePreview {
    width: 100%;
    height: 100%;
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 3rem;
    background: #0c0023;
    color: rgba(240, 240, 240, 0.9);
    font-family: 'Nata Sans', 'Noto Sans JP', 'Noto Sans SC', sans-serif;
    text-align: center;
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1;
  }

  .group {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    margin-bottom: 1rem;
  }

  .groupName {
    font-weight: 600;
  }

  .group .avatar {
    width: 3rem;
    height: 3rem;
    border-radius: 1rem;
    margin-right: 1rem;
  }

  .group .groupText {
    font-size: 2rem;
  }

  .group .separator {
    opacity: 0.6;
  }

  .title {
    font-size: 6.5rem;
    font-weight: 700;
  }

  .description {
    font-size: 2.75rem;
    font-weight: 500;
  }

  .background {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
