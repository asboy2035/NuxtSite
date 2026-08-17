<script setup lang="ts">
  const localePath = useLocalePath()

  await navigateTo(localePath('/work?scroll=services'), {
    redirectCode: 301,
  })
</script>
