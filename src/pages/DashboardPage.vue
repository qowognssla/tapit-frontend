<template>
  <div class="bg-gray-100 font-sans min-h-screen">
    <div class="flex flex-col md:flex-row min-h-screen">
      <!-- Sidebar -->
      <aside
        class="bg-white shadow-lg fixed md:static inset-y-0 left-0 z-50 w-20 md:w-64 flex flex-col h-screen"
        :class="{ 'w-64': openSidebar, 'hidden md:block': !openSidebar }"
      >
        <!-- 상단: 로고 & 메뉴 -->
        <div class="flex-grow flex flex-col">
          <div class="p-4 flex items-center justify-between border-b">
            <h1
              class="text-xl font-bold text-slate-600 transition-opacity duration-300"
              :class="{
                'opacity-100': openSidebar || windowWidth >= 768,
                'opacity-0 hidden': !openSidebar && windowWidth < 768,
              }"
            >
              TapIt
            </h1>
            <button
              @click="openSidebar = !openSidebar"
              class="md:hidden p-2 rounded-full hover:bg-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>

          <!-- 메뉴 -->
          <nav class="flex-1 overflow-y-auto">
            <ul class="py-4 space-y-2">
              <li v-for="section in sections" :key="section.id">
                <a
                  href="#"
                  @click.prevent="((activeSection = section.id), (openSidebar = false))"
                  class="flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors"
                  :class="{ 'bg-gray-100': activeSection === section.id }"
                >
                  <component :is="section.icon" class="h-5 w-5 text-gray-600" />
                  <span
                    class="text-gray-700 transition-opacity duration-300"
                    :class="{
                      'block opacity-100': openSidebar || windowWidth >= 768,
                      'hidden opacity-0': !openSidebar && windowWidth < 768,
                    }"
                  >
                    {{ section.label }}
                  </span>
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <!-- 하단: Logout 버튼 -->
        <div class="p-4">
          <button
            @click="logout"
            class="w-full py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M17 16l4-4m0 0l-4-4" />
              <path d="M7 12h14M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
            </svg>
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 p-4 md:p-6 overflow-y-auto">
        <!-- 모바일용 토글 바 -->
        <div class="md:hidden flex justify-between items-center mb-4">
          <h1 class="text-xl font-bold text-gray-800">TapIt</h1>
          <button @click="openSidebar = !openSidebar" class="p-2 rounded-full hover:bg-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        <DashboardComponent v-if="activeSection === 'merchants'" />
        <DashboardChatComponent v-if="activeSection === 'chat'" />
        <DashboardSettingComponent v-if="activeSection === 'settings'" />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import DashboardComponent from '@/components/dashboard/DashboardComponent.vue'
import DashboardChatComponent from '@/components/dashboard/DashboardChatComponent.vue'
import DashboardSettingComponent from '@/components/dashboard/DashboardSettingComponent.vue'
import {
  BuildingStorefrontIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  Cog6ToothIcon,
} from '@heroicons/vue/24/outline'

const openSidebar = ref(false)
const activeSection = ref('merchants')
const windowWidth = ref(window.innerWidth)

const sections = [
  { id: 'merchants', label: 'Merchants', icon: BuildingStorefrontIcon },
  { id: 'chat', label: 'Conversations', icon: ChatBubbleOvalLeftEllipsisIcon },
  { id: 'settings', label: 'Settings', icon: Cog6ToothIcon },
]

const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth
}

const logout = () => {
  localStorage.removeItem('token')
  location.href = '/login'
}

onMounted(() => {
  window.addEventListener('resize', updateWindowWidth)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWindowWidth)
})
</script>

<style scoped></style>
