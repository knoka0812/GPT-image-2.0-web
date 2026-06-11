<template>
  <div class="flex min-h-screen items-center justify-center">
    <div class="card w-full max-w-md rounded-3xl p-8">
      <div class="mb-8 text-center">
        <div class="text-3xl font-black">Image Studio</div>
        <p class="mt-2 text-slate-400">登录后开始创作 AI 图片</p>
      </div>
      <div class="space-y-4">
        <input v-model="username" class="field" placeholder="用户名" />
        <input v-model="password" class="field" type="password" placeholder="密码" />
        <button class="btn btn-primary w-full" :disabled="loading" @click="submit(false)">{{ loading ? '处理中...' : '登录' }}</button>
        <button class="btn w-full border border-white/10 text-slate-300" :disabled="loading" @click="submit(true)">注册新账号</button>
        <p v-if="error" class="rounded-xl bg-red-500/15 p-3 text-sm text-red-200">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function submit(register) {
  error.value = ''
  loading.value = true
  try {
    const { data } = await axios.post(register ? '/api/auth/register' : '/api/auth/login', { username: username.value, password: password.value })
    localStorage.setItem('token', data.token)
    router.push('/settings')
  } catch (e) {
    error.value = e.response?.data?.error || e.message
  } finally {
    loading.value = false
  }
}
</script>
