<template>
  <div class="q-pa-lg flex flex-center">
    <q-pagination v-model="current" color="primary" :max="pages" :max-pages="6" :boundary-numbers="false"
      @click="disparaAcao()" />
  </div>
</template>
  
<script>
import { ref } from 'vue'
export default {
  methods: {
    disparaAcao() {
      this.$emit('selectedPage', this.current);
    },
    setPage(){
      this.current = 1
    }
  },
  props: ['pages', 'currentPage'],
  setup() {
    return {
      current: ref(1)
    }
  },
}
</script>