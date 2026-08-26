<script setup lang="ts">
  const localePath = useLocalePath()

  await navigateTo(
    localePath({
      path: '/extras',
    })
  )
</script>
