<template>
  <div class="window-container" :class="{ 'window-mobile': isDevice }">
    <vue-advanced-chat
      ref="chatWindow"
      :height="screenHeight"
      :theme="theme"
      :current-user-id="currentUserId"
      :rooms="JSON.stringify(rooms)"
      :room-id="roomId"
      :loading-rooms="loadingRooms"
      :rooms-loaded="roomsLoaded"
      :messages="JSON.stringify(messages)"
      :messages-loaded="messagesLoaded"
      :room-message="roomMessage"
      :room-actions="JSON.stringify(roomActions)"
      :menu-actions="JSON.stringify(menuActions)"
      :message-selection-actions="JSON.stringify(messageSelectionActions)"
      :templates-text="JSON.stringify(templatesText)"
      @fetch-more-rooms="fetchMoreRooms"
      @fetch-messages="fetchMessages"
      @send-message="sendMessage"
      @edit-message="editMessage"
      @delete-message="deleteMessage"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { io, Socket } from 'socket.io-client'
import { register } from 'vue-advanced-chat'
import { PropType } from 'vue'

register()

interface Room {
  roomId: string
  // ... other properties
}

interface Message {
  _id: string
  senderId: string
  content: string
  // ... other properties
}

const props = defineProps({
  currentUserId: { type: String, required: true },
  theme: { type: String, required: true },
  isDevice: { type: Boolean, required: true }
})

const rooms = ref<Room[]>([])
const messages = ref<Message[]>([])
const loadingRooms = ref(false)
const roomsLoaded = ref(false)
const messagesLoaded = ref(false)
const roomId = ref<string | null>(null)
const roomMessage = ref('')
const socket = ref<Socket | null>(null)

const roomActions = ref([
  { name: 'inviteUser', title: 'Invite User' },
  { name: 'removeUser', title: 'Remove User' },
  { name: 'deleteRoom', title: 'Delete Room' }
])
const menuActions = ref([
  { name: 'inviteUser', title: 'Invite User' },
  { name: 'removeUser', title: 'Remove User' },
  { name: 'deleteRoom', title: 'Delete Room' }
])
const messageSelectionActions = ref([{ name: 'deleteMessages', title: 'Delete' }])
const templatesText = ref([
  { tag: 'help', text: 'This is the help' },
  { tag: 'action', text: 'This is the action' }
])

const screenHeight = computed(() =>
  props.isDevice ? `${window.innerHeight}px` : 'calc(100vh - 80px)'
)

onMounted(async () => {
  socket.value = io('http://localhost:5000')
  socket.value.on('newMessage', (msg: Message) => {
    if (msg.senderId !== props.currentUserId) {
      messages.value = [...messages.value, msg]
    }
  })
  await fetchRooms()
})

async function fetchRooms() {
  loadingRooms.value = true
  try {
    const res = await axios.get('/api/chat/rooms', { params: { userId: props.currentUserId } })
    rooms.value = res.data
    roomsLoaded.value = true
    if (rooms.value.length) {
      roomId.value = rooms.value[0].roomId
      socket.value?.emit('joinRoom', { roomId: roomId.value })
      await fetchMessages({ room: rooms.value[0] })
    }
  } finally {
    loadingRooms.value = false
  }
}

function fetchMoreRooms() {
  // TODO: 구현 필요
}

async function fetchMessages({ room }: { room: Room }) {
  messagesLoaded.value = false
  try {
    const res = await axios.get(`/api/chat/messages/${room.roomId}`)
    messages.value = res.data
    socket.value?.emit('joinRoom', { roomId: room.roomId })
    roomId.value = room.roomId
  } catch (e) {
    console.error('메시지 불러오기 실패', e)
  } finally {
    messagesLoaded.value = true
  }
}

async function sendMessage({ content, roomId: rid, files, replyMessage }: any) {
  try {
    const body = {
      roomId: rid,
      senderId: props.currentUserId,
      content,
      timestamp: new Date().toISOString(),
      files,
      replyMessage
    }
    const res = await axios.post('/api/chat/messages', body)
    messages.value = [...messages.value, res.data]
    socket.value?.emit('sendMessage', res.data)
  } catch (e) {
    console.error('메시지 전송 실패', e)
  }
}

async function editMessage({ messageId, newContent, roomId }: any) {
  try {
    const res = await axios.patch(`/api/chat/messages/${messageId}`, { content: newContent })
    const idx = messages.value.findIndex(m => m._id === messageId)
    if (idx !== -1) messages.value[idx] = res.data
    // 편집 실시간 소켓 필요시 추가
  } catch (e) {
    console.error('메시지 수정 실패', e)
  }
}

async function deleteMessage({ message, roomId }: any) {
  try {
    await axios.delete(`/api/chat/messages/${message._id}`)
    messages.value = messages.value.filter(m => m._id !== message._id)
    // 삭제 실시간 소켓 필요시 추가
  } catch (e) {
    console.error('메시지 삭제 실패', e)
  }
}
</script>
