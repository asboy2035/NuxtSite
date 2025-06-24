<template>
  <card>
    <h1>Customize</h1>

    <input
      v-model="localData.name"
      placeholder="Name"
      class="transparent"
      style="font-size: x-large"
    />
    <input
      v-model="localData.username"
      placeholder="Username"
    />
    <input
      v-model="localData.url"
      placeholder="URL"
    />
    <textarea
      v-model="localData.bio"
      placeholder="Bio"
      style="height: 5rem;"
    />

    <label>Avatar</label>
    <input
      type="file"
      @change="handleFile($event, 'avatar')"
    />

    <label>Banner</label>
    <input
      type="file"
      @change="handleFile($event, 'banner')"
    />

    <label>Accent Color</label>
    <input
      type="color"
      v-model="localData.accent"
    />

    <interior-item>
      <v-stack>
        <label>Interests</label>
        <input
          v-model="interest"
          @keyup.enter="addInterest"
          class="input"
          placeholder="Press Enter to add"
        />

        <h-stack>
          <span
            v-for="(tag, i) in localData.interests"
            :key="i"
            style="
              background: var(--foregroundColor);
              padding: 0.3rem 0.6rem;
              border-radius: 2rem;
              cursor: pointer;"
            @click="removeInterest(i)"
          >
            {{ tag }} ✕
          </span>
        </h-stack>
      </v-stack>
    </interior-item>
  </card>
</template>

<script setup>
  import { ref, watch } from 'vue'
  import Card from "@/components/layout/Card.vue"
  import InteriorItem from "@/components/layout/InteriorItem.vue"
  import VStack from "@/components/layout/VStack.vue"
  import HStack from "@/components/layout/HStack.vue"

  const props = defineProps(['modelValue'])
  const emit = defineEmits(['update:modelValue'])
  const localData = ref({ ...props.modelValue })
  const interest = ref('')

  watch(
    localData,
    () => emit('update:modelValue', localData.value),
    { deep: true }
  )

  const handleFile = (e, field) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        localData.value[field] = reader.result
      }
      reader.readAsDataURL(file)
    }
  }

  const addInterest = () => {
    if (interest.value.trim()) {
      localData.value.interests.push(interest.value.trim())
      interest.value = ''
    }
  }

  const removeInterest = (index) => {
    localData.value.interests.splice(index, 1)
  }
</script>

