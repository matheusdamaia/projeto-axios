<script setup>
import { defineProps, onMounted, ref } from 'vue'
import { useMovieStore } from '@/stores/movie'
import Loading from 'vue-loading-overlay'

const movieStore = useMovieStore()
const isLoading = ref(true)

const props = defineProps({
  movieId: {
    type: Number,
    required: true,
  },
})

onMounted(async () => {
  isLoading.value = true
  await movieStore.getMovieDetail(props.movieId)
  isLoading.value = false
})

const formatDate = (date) => (date ? new Date(date).toLocaleDateString('pt-BR') : '')
</script>

<template>
  <loading v-model:active="isLoading" is-full-page />

  <div v-if="movieStore.currentMovie.title" class="movie-details-container">
    <div class="poster">
      <img
        :src="`https://image.tmdb.org/t/p/w500${movieStore.currentMovie.poster_path}`"
        :alt="movieStore.currentMovie.title"
      />
    </div>

    <div class="info">
      <h1>{{ movieStore.currentMovie.title }}</h1>
      <h3 v-if="movieStore.currentMovie.tagline">{{ movieStore.currentMovie.tagline }}</h3>
      <p>{{ movieStore.currentMovie.overview }}</p>
      <p>Orçamento: ${{ movieStore.currentMovie.budget.toLocaleString() }}</p>
      <p>Avaliação: {{ movieStore.currentMovie.vote_average }}</p>
      <p>Data de lançamento: {{ formatDate(movieStore.currentMovie.release_date) }}</p>

      <div class="companies">
        <h4>Produtoras:</h4>
        <div class="company-list">
          <template
            v-for="company in movieStore.currentMovie.production_companies || []"
            :key="company.id"
          >
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
    <p>Detalhes do filme não encontrados.</p>
  </div>
</template>

<style scoped>
.movie-details-container {
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
  color: #555;
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
  height: 20px;
  object-fit: contain;
}
</style>
