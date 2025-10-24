
<script setup>
import { defineProps, onMounted, ref } from 'vue'
import { useTvStore } from '@/stores/tv'
import Loading from 'vue-loading-overlay'

const tvStore = useTvStore()
const isLoading = ref(true)

const props = defineProps({
  tvId: {
    type: Number,
    required: true
  }
})

onMounted(async () => {
  isLoading.value = true
  await tvStore.getTvDetail(props.tvId)
  isLoading.value = false
})

const formatDate = (date) => date ? new Date(date).toLocaleDateString('pt-BR') : ''
</script>

<template>
  <loading v-model:active="isLoading" is-full-page />

  <div v-if="tvStore.currentTv.name" class="tv-details-container">
    <div class="poster">
      <img
        :src="`https://image.tmdb.org/t/p/w500${tvStore.currentTv.poster_path}`"
        :alt="tvStore.currentTv.name"
      />
    </div>

    <div class="info">
      <h1>{{ tvStore.currentTv.name }}</h1>
      <h3 v-if="tvStore.currentTv.tagline">{{ tvStore.currentTv.tagline }}</h3>
      <p>{{ tvStore.currentTv.overview }}</p>
      <p>Primeiro Episódio: {{ formatDate(tvStore.currentTv.first_air_date) }}</p>
      <p>Último Episódio: {{ formatDate(tvStore.currentTv.last_air_date) }}</p>
      <p>Avaliação: {{ tvStore.currentTv.vote_average }}</p>

      <div class="companies">
        <h4>Produtoras:</h4>
        <div class="company-list">
          <template v-for="company in tvStore.currentTv.production_companies || []" :key="company.id">
            <img
              v-if="company.logo_path"
              :src="`https://image.tmdb.org/t/p/w92${company.logo_path}`"
              :alt="company.name"
            />
            <p v-else>{{ company.name }}</p>
          </template>
        </div>
      </div>
    </div>
  </div>

  <div v-else-if="!isLoading" class="loading-error">
    <p>Detalhes da série não encontrados.</p>
  </div>
</template>

<style scoped>
.tv-details-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin: 2rem;
}

.poster img {
  width: 300px;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem #000;
  cursor: pointer;
}

.info {
  flex: 1;
  min-width: 300px;
}

.info h1 {
  margin: 0;
  font-size: 2rem;
}

.info h3 {
  margin: 0.5rem 0;
  font-style: italic;
  color: #b4b4b4;
}

.info p {
  margin: 0.5rem 0;
}

.companies {
  margin-top: 1rem;
}

.company-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
}

.company-list img {
  height: 2rem;
  object-fit: contain;
}


</style>
