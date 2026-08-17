<script setup lang="ts">
  const route = useRoute()
  const localePath = useLocalePath()

  await navigateTo(localePath(`/work/${route.params.slug}`), {
    redirectCode: 301,
  })
</script>
