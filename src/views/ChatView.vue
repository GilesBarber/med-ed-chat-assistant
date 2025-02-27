<script setup>
import Chat from '../components/Chat.vue'
</script>

<template>
  <main class="chatView">
    <Suspense>
    <Chat />
    <template #fallback>
      <div>Loading Professor Innov8or...</div>
    </template>
  </Suspense>
  </main>
</template>

<style>

body {
  font-family: "Source Sans 3", sans-serif;

}

.chatView{
  background-image: url('../assets/images/professor-innov8or.jpg');
  background-size: 240%;
  background-position: 0px 0px;
  background-repeat: no-repeat;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

</style>