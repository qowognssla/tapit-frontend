<template>
  <form @submit.prevent="handleLogin" class="bg-white rounded-xl shadow-xl p-6 space-y-6">
    <div>
      <label for="username" class="block mb-2 text-slate-700 font-medium">Username</label>
      <input
        id="username"
        v-model="username"
        type="text"
        required
        placeholder="아이디 입력"
        class="w-full px-4 py-3 text-slate-800 border-b-2 border-slate-600 outline-none focus:border-slate-700 transition duration-150"
      />
    </div>
    <div>
      <label for="password" class="block mb-2 text-slate-700 font-medium">Password</label>
      <input
        id="password"
        v-model="password"
        type="password"
        required
        placeholder="비밀번호 입력"
        class="w-full px-4 py-3 text-slate-800 border-b-2 border-slate-600 outline-none focus:border-slate-700 transition duration-150"
      />
    </div>
    <div>
      <button
        type="submit"
        class="w-full py-3 px-4 inline-flex justify-center items-center text-white font-semibold bg-slate-600 hover:bg-slate-700 rounded-md shadow-sm transition-colors"
      >
        로그인
      </button>
    </div>
    <!-- 푸터: 비밀번호 찾기 및 계정 생성 링크 
    <footer class="flex justify-between text-sm text-slate-600">
      <RouterLink :to="{ name: 'login-find' }" class="hover:text-slate-700 underline">
        비밀번호를 잊으셧나요?
      </RouterLink>
      <RouterLink to="/signup" class="hover:text-slate-700 underline"> 계정 생성 </RouterLink>
    </footer>
    -->
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const username = ref('')
const password = ref('')
const router = useRouter()

const handleLogin = async () => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', {
      username: username.value,
      password: password.value,
      type: 'user',
    })
    const token = response.data.token
    localStorage.setItem('token', token)
    //alert('로그인 성공')
    router.push({ name: 'dashboard' }) // 필요 시 수정
  } catch (err: any) {
    alert(err.response?.data?.message || '로그인 실패')
  }
}
</script>

<style scoped></style>
