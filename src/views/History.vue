<template>
  <div class="flex h-full min-h-0 flex-col space-y-4">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-black">历史记录</h1>
      <div class="flex gap-2">
        <button class="rounded-xl border border-white/10 px-4 py-2 text-sm" @click="load">刷新</button>
        <button class="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-2 text-sm text-red-200" @click="clearHistory">一键清空</button>
      </div>
    </div>
    <section class="grid min-h-0 flex-1 gap-6 lg:grid-cols-2">
      <div class="card min-h-0 overflow-hidden rounded-3xl p-6">
        <h2 class="mb-4 text-xl font-bold">生图记录</h2>
        <div class="grid max-h-[calc(100%-3rem)] gap-4 overflow-y-auto pr-2 md:grid-cols-2 xl:grid-cols-3">
          <RecordCard v-for="item in generations" :key="'g'+item.id" :item="item" />
        </div>
        <p v-if="!generations.length" class="text-slate-400">暂无记录</p>
      </div>
      <div class="card min-h-0 overflow-hidden rounded-3xl p-6">
        <h2 class="mb-4 text-xl font-bold">改图记录</h2>
        <div class="grid max-h-[calc(100%-3rem)] gap-4 overflow-y-auto pr-2 md:grid-cols-2 xl:grid-cols-3">
          <RecordCard v-for="item in edits" :key="'e'+item.id" :item="item" />
        </div>
        <p v-if="!edits.length" class="text-slate-400">暂无记录</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import RecordCard from '../components/RecordCard.vue'

const generations = ref([])
const edits = ref([])
async function load() {
  const { data } = await axios.get('/api/history')
  generations.value = data.generations
  edits.value = data.edits
}
async function clearHistory() {
  if (!confirm('确定清空所有历史记录吗？')) return
  await axios.delete('/api/history')
  generations.value = []
  edits.value = []
}
onMounted(load)
</script>
