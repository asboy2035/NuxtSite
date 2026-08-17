<script setup lang="ts">
  const localePath = useLocalePath()

  await navigateTo(localePath('/work?scroll=projects'), {
    redirectCode: 301,
  })
</script>
