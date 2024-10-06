import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useChatStore = defineStore('chat', () => {
  const chat = ref([])
  function addChat(data) {
    chat.value.push(data)
  }

  return { chat, addChat }
})
