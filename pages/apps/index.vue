<script setup lang="ts">
  const localePath = useLocalePath()

  await navigateTo(localePath('/work?scroll=apps'), {
    redirectCode: 301,
  })
</script>
