<script setup lang="ts">
  import Card from "@/components/layout/Card.vue"
  import HStack from "@/components/layout/HStack.vue"
  import {Icon} from "@iconify/vue"
  import CardTitle from "@/components/utils/CardTitle.vue";
</script>

<template>
  <card class="spaced">
    <card-title
      title="More Links"
      icon="solar:menu-dots-line-duotone"
    />

    <p>Other stuff</p>

    <h-stack>
      <a href="https://app.warp.dev/referral/KVWRZZ">
        <button>
          <Icon icon="mingcute:terminal-fill" />
          Warp
        </button>
      </a>

      <a href="https://stats.foldingathome.org/donor/id/732018511">
        <button>
          <Icon icon="material-symbols:network-node" />
          FaH
        </button>
      </a>

      <a href="https://www.last.fm/user/asboy_lfm">
        <button>
          <Icon icon="solar:music-note-outline" />
          Last.fm
        </button>
      </a>
    </h-stack>

    <h3>Playlists</h3>
    <h-stack>
      <router-link to="/playlists/topsongs">
        <button>
          <Icon icon="solar:music-note-outline" />
          Top Songs
        </button>
      </router-link>
    </h-stack>
  </card>
</template>
