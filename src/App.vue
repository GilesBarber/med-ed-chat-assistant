<template>
  <v-app>
      <v-main>
          <RouterView />
      </v-main>
  </v-app>
</template>
<script>

import {useTheme} from 'vuetify'
import {RouterView} from 'vue-router'

export default {
  components: {
      RouterView
  },
  setup() {
      const theme = useTheme()
      
      const toggleTheme = () => {
          theme.global.name.value = theme.global.current.value.dark ?
           'light' : 'dark' 
      }
      return {toggleTheme, theme}
  },
}
</script>
