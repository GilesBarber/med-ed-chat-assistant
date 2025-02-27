<template>
    <div :class="message.role ==='user' ? 'user' : 'assistant'" class="content">
        <v-row class="d-flex overflow-auto">
            <v-col cols="12" sm="2" class="align-start">
                <v-sheet class="ma-2 pa-2 flex-row">
                    <v-avatar v-if="message.role ==='assistant'" class="prof-innov8or">

                    </v-avatar>
                    <v-btn v-if="message.role ==='assistant'">Professor<br>Innov8or</v-btn>
                </v-sheet>
            </v-col>
            <v-col cols="12" sm="10" class="align-self-center">
                <v-sheet class="ma-2 pa-2">
                    <pre v-html="message.content" class="preWrap"></pre>
                </v-sheet>
            </v-col>
        </v-row>
    </div>
</template>

<script>

export default {
    props: ['msg'],
    setup(props) {
        const message = props.msg
        // console.log( message)
        return {message}
    },
}
</script>

<style scoped>
    .content {
        flex: 1;
        font-family: "Source Sans 3", sans-serif;
    }
    .preWrap {
        white-space: pre-wrap;
    }
    .flex-row{
        display: flex;
        flex-direction: row;
    }

    .user{
        text-align: left;
    }

    .user .preWrap{
        background-color: darkgreen;
        padding: 0.5rem 1rem;
        width: fit-content;
        border-radius: 1rem 0 1rem 1rem;
        float: right;
    }

    .assistant{
        text-align: left;
    }

    .assistant .preWrap{
        background-color: rgba(169, 169, 169, 0.425);
        padding: 0.5rem 1rem;
        width: fit-content;
        border-radius: 0 1rem 1rem 1rem;
    }

    .prof-innov8or{
        background-image: url('../assets/images/prof-innov8.jpg');
        background-size: contain;
    }
</style>