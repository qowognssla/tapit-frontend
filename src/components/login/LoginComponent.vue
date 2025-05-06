<template>
  <form @submit.prevent="$emit('submit')" class="bg-white rounded-xl shadow-xl p-6 space-y-6">
    <div>
      <label for="email" class="block mb-2 text-slate-700 font-medium">Email</label>
      <input
        id="email"
        v-model="email"
        type="email"
        required
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
    <footer class="flex justify-between text-sm text-slate-600">
      <RouterLink :to="{ name: 'login-find' }" class="hover:text-slate-700 underline">
        비밀번호를 잊으셧나요?
      </RouterLink>
      <RouterLink to="/signup" class="hover:text-slate-700 underline"> 계정 생성 </RouterLink>
    </footer>
  </form>
</template>

<script setup lang="ts">
import { defineEmits, ref } from 'vue'
import { RouterLink } from 'vue-router'

defineEmits<{
  (e: 'submit'): void
}>()

const email = ref('')
const password = ref('')
</script>

<style scoped></style>
