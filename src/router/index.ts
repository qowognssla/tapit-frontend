import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import LoginPage from '@/pages/LoginPage.vue'
import DashboardPage from '@/pages/DashboardPage.vue'

import LoginComponent from '@/components/login/Login.vue'
import FindComponent from '@/components/login/Find.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/login' },
  {
    path: '/login',
    component: LoginPage,
    children: [
      { path: '', component: LoginComponent },
      { path: 'find', name: 'login-find', component: FindComponent },
    ],
  },
  { path: '/dashboard', component: DashboardPage },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
