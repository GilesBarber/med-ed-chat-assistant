<template>
    <div class="splash">
        <h1 class="heading">Welcome to the Chat App</h1>
        <button class="btn-start" @click="startChat">Start Chat</button>
    </div>
</template>

<script>
export default {
    name: 'Splash',
    data() {
        return {
            // Your data properties here
        };
    },
    methods: {
        // Your methods here
        startChat() {            
            this.$router.push({ name: 'chatView' });

        }
    }
};
</script>

<style scoped>

.splash {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    min-width: 800px;
    min-height: 800px;
    background-image: url('../assets/images/professor-innov8or.jpg');
    background-size: cover;
    background-position: center 0px;
    background-repeat: no-repeat;
    font-family: "Source Sans 3", sans-serif;
}

.heading{
    color: white;
    font-size: 2rem;
    text-align: center;
}

.btn-start {
    border-radius: 14px;
    margin-top: 1rem;
    padding: 10px 20px;
    background-color: rgba(0, 0, 0, 0.4);
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.8);
    cursor: pointer;
    font-size: 1.2rem;
    font-weight: bold;
}
.btn-start:hover {
    background-color: rgba(0, 0, 0, 0.7);
}
</style>