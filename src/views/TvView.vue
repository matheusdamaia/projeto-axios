<script setup>
import { ref, onMounted } from 'vue'
import api from '@/plugins/axios'
import Loading from 'vue-loading-overlay'
import { useGenreStore } from '@/stores/genre'

const genreStore = useGenreStore()
const tvShows = ref([])
const isLoading = ref(false)

const listTvShows = async (genreId) => {
  isLoading.value = true
  const response = await api.get('discover/tv', {
    params: { with_genres: genreId, language: 'pt-BR' },
  })
  tvShows.value = response.data.results
  isLoading.value = false
}

onMounted(async () => {
  await genreStore.getAllGenres('tv')
})

const getGenreName = (id) => genreStore.genres.find((genre) => genre.id === id)?.name || ''

const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR')
</script>

<template>
  <h1>Programas de TV</h1>
  <ul class="genre-list">
    <li
      v-for="genre in genreStore.genres"
      :key="genre.id"
      class="genre-item"
      @click="listTvShows(genre.id)"
    >
      {{ genre.name }}
    </li>
  </ul>

  <loading v-model:active="isLoading" is-full-page />

  <div class="movie-list">
    <div v-for="tv in tvShows" :key="tv.id" class="movie-card">
      <img :src="`https://image.tmdb.org/t/p/w500${tv.poster_path}`" :alt="tv.name" />
      <div class="movie-details">
        <p class="movie-title">{{ tv.name }}</p>
        <p class="movie-release-date">{{ formatDate(tv.first_air_date) }}</p>
        <p class="movie-genres">
          <span v-for="genre_id in tv.genre_ids" :key="genre_id" @click="listTvShows(genre_id)">
            {{ getGenreName(genre_id) }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.genre-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  list-style: none;
  margin: 2rem;
}
.genre-item {
  background-color: #5d6424;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  color: #fff;
}
.genre-item:hover {
  cursor: pointer;
  background-color: #7d8a2e;
  box-shadow: 0 0 0.5rem #387250;
}
.movie-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  gap: 1.5rem;
  justify-items: center;
  margin: 2rem;
}
.movie-card {
  width: 15rem;
  height: 30rem;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0 0.5rem #000;
}
.movie-card img {
  width: 100%;
  height: 20rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem #000;
}
.movie-details {
  padding: 0.5rem;
}
.movie-title {
  font-size: 1rem;
  font-weight: bold;
  line-height: 1.3rem;
  height: 3.2rem;
}
.movie-genres {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  gap: 0.2rem;
}
.movie-genres span {
  background-color: #748708;
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  color: #fff;
  font-size: 0.8rem;
  font-weight: bold;
}
.movie-genres span:hover {
  cursor: pointer;
  background-color: #455a08;
  box-shadow: 0 0 0.5rem #748708;
}
</style>
