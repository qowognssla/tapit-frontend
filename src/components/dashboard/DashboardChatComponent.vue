<template>
  <div class="flex-1 w-full h-full overflow-hidden">
    <vue-advanced-chat
      class="w-full h-full"
      :current-user-id="currentUserId"
      :rooms="JSON.stringify(rooms)"
      :messages="JSON.stringify(messages)"
      @send-message="onSendMessage"
    />
  </div>
</template>

<style scoped>
html,
body,
#app {
  height: 100%;
  margin: 0;
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
import { register } from 'vue-advanced-chat'

register()

const currentUserId = 'admin-001'

const rooms = ref([
  {
    roomId: 'room-1',
    roomName: '가맹점 - 강남점',
    users: [
      {
        _id: 'admin-001',
        username: '운영자',
        avatar: '/logo_tapit.svg',
      },
      {
        _id: 'user-123',
        username: '김철수',
        avatar: 'https://i.pravatar.cc/150?u=user123',
      },
    ],
  },
])

const messages = ref([
  {
    _id: 'msg-1',
    content: '안녕하세요, 무엇을 도와드릴까요?',
    senderId: 'admin-001',
    timestamp: new Date().toISOString(),
  },
])

function onSendMessage({ content, roomId }: { content: string; roomId: string }) {
  messages.value.push({
    _id: `msg-${messages.value.length + 1}`,
    content,
    senderId: currentUserId,
    timestamp: new Date().toISOString(),
  })
}

function startVideoCall() {
  alert('비디오 콜을 시작합니다! (연결 로직 여기에 구현)')
}
</script>
