<template>
    <h2>Character Profile</h2>
    <div class="column items-center">
        <div class="column items-center card">
            <div class="info">
                <img v-bind:src="character.image" v-bind:alt="character.name">
                <div class="column">
                    <span>
                        <span>Name:</span>
                        {{ character.name }}
                    </span>
                    <span>
                        <span>Status:</span>
                        {{ character.status }}
                    </span>
                    <span>
                        <span>Species:</span>
                        {{ character.species }}
                    </span>
                    <span>
                        <span>Gender:</span>
                        {{ character.gender }}
                    </span>
                </div>
            </div>
            <div class="episodes">
                <span>
                    Episode List
                </span>
                <ul>
                    <li v-for="episode in character.episodes" v-bind:key="episode.id">
                        {{ episode.episode }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
import { reactive } from 'vue';
const route = useRoute();
console.log(route)
const character = reactive({
    name: '',
    status: '',
    species: '',
    gender: '',
    image: '',
    episodes: []
})
async function getCharacterInfo(name, status, species, gender) {
    const endpoint = "https://rickandmortyapi.com/graphql";
    const headers = {
        "content-type": "application/json",
    };
    const graphqlQuery = {
        "query": `query {
          characters(filter: { name: "${name}" status: "${status}" species: "${species}" gender: "${gender}"}) {
            results {
              name
              status
              species
              type
              gender
              image
              episode {
                id
                episode
                }
            }
          }
        }`,
    };

    const options = {
        "method": "POST",
        "headers": headers,
        "body": JSON.stringify(graphqlQuery)
    };

    const response = await fetch(endpoint, options);
    const data = await response.json();

    character.name = data.data.characters.results[0].name
    character.status = data.data.characters.results[0].status
    character.species = data.data.characters.results[0].species
    character.gender = data.data.characters.results[0].gender
    character.episodes = data.data.characters.results[0].episode
    character.image = data.data.characters.results[0].image
    console.log(data.errors); //
}
onMounted(() => {
    getCharacterInfo(route.params.name, route.params.status, route.params.species, route.params.gender);
})
</script>
<style>
.card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    padding-top: 2rem;
    padding-bottom: 1rem;
    background-color: #e0e0e0;
    width: 70%;
}

.info {
    border-bottom: 1px solid grey;
    padding: 1rem 4rem 1rem 4rem;
    border-bottom: 1px solid grey;
}

.episodes {
    margin-top: 2rem;
}

.episodes ul {
    padding: 0;
}
</style>