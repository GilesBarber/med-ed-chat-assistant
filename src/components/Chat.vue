<template>
    <v-sheet
        class="mx-auto mt-1 container"
        elevation="4"
    >
    <Message v-for="(message, index) in messages" :key="index" :msg="message" />
    </v-sheet>
    <v-sheet
        class="mx-auto mt-1 container pa-5"
        elevation="4"
        height="auto"
    >
        <div class="d-flex">
            <v-textarea
                label="prompt"
                variant="underlined"
                class="me-5"
                v-model="message"
            ></v-textarea>
            <v-btn
                @click="userInput"
                icon="mdi-send"
                class="align-self-center"
            ></v-btn>
        </div>
    </v-sheet>
</template>

<script>
import Message from './Message.vue'
import {reactive, ref} from 'vue'
import openai from '../helpers/useOpenAi'
import firstPrompt from '../helpers/mountScript'

async function initAssistant() {
  try {
    const assistant = await openai.beta.assistants.create({
      instructions: firstPrompt,
      name: "Professor Innov8or",
      model: "gpt-4o",
    });
    const thread = await openai.beta.threads.create();
    return { assistantId: assistant.id, threadId: thread.id };
  } catch (error) {
    console.error("Error initializing assistant:", error);
    throw error;
  }
}

export default {
  components: {
    Message,
  },
  async setup() {
    // Initialize and store state locally
    const { assistantId, threadId } = await initAssistant();

    const message = ref('');
    const messages = reactive([]);

    // Polling helper to check run status
    const pollRunStatus = async (threadId, runId, maxRetries = 10, delay = 800) => {
      for (let i = 0; i < maxRetries; i++) {
        try {
          const runStatus = await openai.beta.threads.runs.retrieve(threadId, runId);
          if (runStatus.status === 'completed') {
            return true;
          } else {
            console.log("Run status:", runStatus.status);            
          }
          await new Promise(resolve => setTimeout(resolve, delay));
        } catch (error) {
          console.error("Error polling run status:", error);
          break;
        }
      }
      return false;
    };

    const chat = async (msg) => {
      try {
        const run = await openai.beta.threads.runs.create(threadId, { assistant_id: assistantId });
        const runId = run.id;

        const completed = await pollRunStatus(threadId, runId);
        if (completed) {
          const stream = openai.beta.threads.runs.stream(threadId, { assistant_id: assistantId });
          // Process stream data here as needed
        //   console.log("Stream:", stream);

          const threadMessages = await openai.beta.threads.messages.list(threadId);
          // For example, get the latest message
          const latest = threadMessages.data[threadMessages.data.length - 1];
          messages.push({
            role: latest.role,
            content: latest.content[0].text.value,
          });
        } else {
          console.warn("The run did not complete in the expected time.");
        }
      } catch (error) {
        console.error("Chat error:", error);
      }
    };

    const userInput = () => {
      if (!message.value) return;
      messages.push({
        role: 'user',
        content: message.value,
      });
      chat(message.value);
      message.value = '';
    };

    return { userInput, message, messages };
  },

    mounted() {
        
    }
}
</script>


<style scoped>
    .container {
        font-family: "Source Sans 3", sans-serif;
        max-height: 600px;
        height: 75%;
        width: 85%;
        overflow-y: auto;
        overflow-x: hidden;
        border-radius: 12px;
    }
</style>