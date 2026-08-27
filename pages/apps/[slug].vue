<script setup lang="ts">
  const localePath = useLocalePath()
  const route = useRoute()

  await navigateTo(
    localePath({
      path: `/work/${route.params.slug}`,
    })
  )
</script>
