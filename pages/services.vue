<script setup lang="ts">
  const localePath = useLocalePath()

  await navigateTo(localePath('/work'), {
    redirectCode: 301,
  })
</script>
