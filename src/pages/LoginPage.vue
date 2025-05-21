<template>
  <div class="flex h-screen bg-slate-800">
    <div class="w-full max-w-md m-auto bg-white rounded-xl p-6 shadow-lg">
      <header class="text-center mb-2">
        <img class="mx-auto w-40 max-w-[50%] md:w-40" src="@/assets/tapit.svg" alt="logo" />
      </header>

      <div class="flex-grow">
        <RouterView />
      </div>

      <!-- 푸터: 회사 연락처 -->
      <footer class="mt-4 text-center text-sm text-gray-600">
        이메일: <a href="mailto:info@company.com" class="underline">info@company.com</a> | 전화:
        <a href="tel:+82212345678" class="underline">02-1234-5678</a>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, RouterView } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref<string>('')

</script>

<style scoped>
/* 필요 시 추가적인 스타일을 여기에 작성하세요 */
</style>
