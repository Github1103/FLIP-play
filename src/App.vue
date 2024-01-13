<script setup>
import { onMounted, reactive, ref } from 'vue'
import { getSisterGenerator, preload } from './utils'
import { FLIPAnimation } from './utils/FLIP-animation'

const imgs = ref()
const images = reactive([])
const getSister = getSisterGenerator()

onMounted(() => {
  const loadData = getSister()
  images.push(...loadData)
})

async function add() {
  const loadData = getSister()
  await preload(loadData)

  const change = () => {
    images.splice(0, 0, ...loadData)
  }

  FLIPAnimation(imgs.value.slice(), change)
}

async function shuffle() {
  const change = () => {
    const length = images.length
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * length)
      const temp = images[i]
      images[i] = images[randomIndex]
      images[randomIndex] = temp
    }
  }

  FLIPAnimation(imgs.value.slice(), change)
}
</script>

<template>
  <div class="actions">
    <button @click="add">
      Add
    </button>
    <button @click="shuffle">
      shuffle
    </button>
  </div>
  <div class="wrap">
    <div v-for="src in images" :key="src" class="img-wrap">
      <img ref="imgs" class="img" :src="src">
    </div>
  </div>
</template>

<style scoped>
.actions {
  width: 100%;
  max-width: 500px;
  display: flex;
  padding: 10px;
  gap: 10px;
}
.wrap {
  margin: auto;
  max-width: 500px;
  display: flex;
  flex-wrap: wrap;
  column-count: 4;
}
.img-wrap {
  width: 25%;
  padding: 8px;
}
.img {
  width: 100%;
  height: 200px;
  border-radius: 8px;
  object-fit: cover;
}
</style>
