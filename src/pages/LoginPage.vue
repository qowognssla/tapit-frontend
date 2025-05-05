<template>
  <div class="flex h-screen bg-indigo-700">
    <div class="w-full max-w-xs m-auto bg-indigo-100 rounded p-5">
      <header>
        <img class="w-20 mx-auto mb-5" src="https://img.icons8.com/fluent/344/year-of-tiger.png" />
        <FindComponent />
      </header>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import LoginComponent from '@/components/login/Login.vue'
import FindComponent from '@/components/login/Find.vue'

import axios from 'axios'

const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref<string>('')

async function login() {
  error.value = ''
  try {
    const { data } = await axios.post('/login', {
      email: email.value,
      password: password.value,
    })
    localStorage.setItem('token', data.token)
    router.push('/dashboard')
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      error.value = e.response?.data?.message ?? '로그인에 실패했습니다.'
    } else {
      error.value = '알 수 없는 오류가 발생했습니다.'
    }
  }
}
</script>
