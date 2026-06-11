<template>
  <div class="overflow-hidden rounded-3xl border border-white/10 bg-black/20">
    <button v-if="firstImage" class="block w-full" @click="open = true">
      <img :src="firstImage" class="aspect-square w-full object-cover transition hover:scale-[1.02]" />
    </button>
    <div v-else class="flex aspect-square items-center justify-center text-slate-500">{{ item.status }}</div>
    <div class="space-y-2 p-4">
      <div class="line-clamp-2 text-sm text-slate-200">{{ item.prompt }}</div>
      <div class="flex flex-wrap gap-2 text-xs text-slate-400">
        <span>{{ item.size }}</span><span>{{ item.quality }}</span><span>{{ item.output_format }}</span><span>{{ item.status }}</span>
      </div>
      <div v-if="firstImage" class="flex gap-2 pt-1">
        <button class="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-cyan-200" @click="open = true">放大查看</button>
        <a :href="firstImage" download class="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-cyan-200">下载</a>
      </div>
      <p v-if="item.error" class="text-xs text-red-300">{{ item.error }}</p>
    </div>
    <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-8" @click="open = false">
      <div class="flex max-h-full max-w-6xl flex-col gap-4" @click.stop>
        <img :src="firstImage" class="max-h-[82vh] max-w-full rounded-3xl object-contain" />
        <div class="flex justify-center gap-3">
          <a :href="firstImage" download class="btn btn-primary">下载图片</a>
          <button class="btn border border-white/10 bg-white/10" @click="open = false">关闭</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({ item: { type: Object, required: true } })
const open = ref(false)
const firstImage = computed(() => {
  try {
    const images = JSON.parse(props.item.image_path || '[]')
    return images[0]
  } catch {
    return ''
  }
})
</script>
