<script setup lang="ts">
  import Card from "@/components/layout/Card.vue";
  import Spacer from "@/components/utils/Spacer.vue";
  import Description from "@/components/premade/Description.vue";
  import VStack from "@/components/layout/VStack.vue";
  import HStack from "@/components/layout/HStack.vue";
  import {Icon} from "@iconify/vue";
</script>

<template>
  <card>
    <v-stack class="edgeToEdge">
      <description />
      <spacer />

      <h-stack class="edgeToEdge">
        <Icon icon="solar:arrow-right-line-duotone" width="24" height="24" />
        <router-link to="/links">
          <button>
            <Icon icon="solar:link-minimalistic-2-line-duotone" width="24" height="24" />
            Links
          </button>
        </router-link>

        <router-link to="/apps/">
          <button>
            <Icon icon="solar:widget-2-line-duotone" width="24" height="24" />
            Apps
          </button>
        </router-link>

        <router-link to="/goodies/">
          <button>
            <Icon icon="solar:inbox-line-line-duotone" width="24" height="24" />
            Goodies
          </button>
        </router-link>

        <a href="https://github.com/asboy2035/asboy2035" aria-labelledby="viewSrc">
          <button class="transparent" aria-label="View Source Code" id="viewSrc" style="scale: 1.5">
            <Icon icon="solar:code-line-duotone" width="24" height="24" aria-labelledby="viewSrc" />
          </button>
        </a>
      </h-stack>
    </v-stack>
  </card>
</template>
