<script setup>
import { ref, onMounted } from 'vue'
import { io } from 'socket.io-client'
import { useChatStore } from '@/stores/chat'

const user = ref('')
const message = ref('')

const socket = io('localhost:3000')

const store = useChatStore()

const sendMessage = (e) => {
  e.preventDefault()

  socket.emit('SEND_MESSAGE', {
    user: user.value,
    message: message.value
  })
  message.value = ''
}

onMounted(() => {
  socket.on('MESSAGE', (data) => {
    store.addChat(data)
  })
})
</script>

<template>
  <form @submit.prevent="sendMessage" class="card">
    <div class="header">
      <h3>Chat App</h3>
      <div class="user">
        <label for="user">User:</label>
        <input type="text" v-model="user" class="form-control" placeholder="Enter user" />
      </div>
    </div>
    <hr />
    <div class="body">
      <div
        :class="`message ${msg.user === user ? 'me' : 'other'}`"
        v-for="(msg, index) in store.chat"
        :key="index"
      >
        <div class="chat">
          <div class="sender">{{ msg.user === user ? 'You' : msg.user }}</div>
          <div class="text">{{ msg.message }}</div>
        </div>
      </div>
    </div>
    <hr />
    <div class="footer">
      <input type="text" v-model="message" class="form-message" placeholder="Enter message" />
      <button type="submit" class="button">Send</button>
    </div>
  </form>
</template>

<style>
.card {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 500px;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
}
.user {
  display: flex;
  align-items: center;
  gap: 10px;
}

.body {
  height: 40vh;
  overflow-y: scroll;
}

.message {
  display: flex;
}

.me {
  justify-content: flex-end;
}

.other {
  justify-content: flex-start;
}

.chat {
  width: fit-content;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
  min-width: 20%;
  max-width: 45%;
  flex-direction: column;
}

.other .chat {
  background-color: #ccc;
}

.me .chat {
  background-color: #595959;
  color: #fff;
}

.sender {
  font-size: 12px;
}

.text {
  font-weight: normal;
  line-height: 1.6;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  gap: 10px;
}

.form-message {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.button {
  padding: 10px 20px;
  background-color: #007bff;
  border: 1px solid #007bff;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
}
</style>
