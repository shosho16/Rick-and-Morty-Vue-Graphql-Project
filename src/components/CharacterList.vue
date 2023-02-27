<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex justify-center">
        <div class="full-width">
          <div class="row search justify-center">
            <form @submit.prevent="pressed">
              <div class="flex no-wrap mt-two">
                <div class="search">
                  <q-input v-model="search" outlined type="search" :rules="[val => !!val || 'Field is required']">
                  </q-input>
                </div>
                <div class="search-wrapper">
                  <q-btn @click="setPage()" type="submit" color="primary" label="Search"></q-btn>
                </div>
              </div>
            </form>
            <div class="full-width">
              <pagination @selectedPage="getPage" :pages="pages" :currentPage="defaultPage" ref="pagination" />
            </div>
            <div class="table">
              <q-markup-table>
                <thead class="table-head">
                  <tr>
                    <th class="text-left">Name</th>
                    <th class="text-right">Species</th>
                    <th class="text-right">Gender</th>
                    <th class="text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in response" :key="item.id">
                    <td class="text-left">
                      <RouterLink
                        :to="{ path: `/charactepage/${item.name}/${item.status}/${item.species}/${item.gender}` }">{{
                          item.name }}</RouterLink>
                    </td>
                    <td class="text-right">{{ item.species }}</td>
                    <td class="text-right">{{ item.gender }}</td>
                    <td class="text-right">{{ item.status }}</td>
                  </tr>
                </tbody>
              </q-markup-table>
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import PaginationVS from './PaginationVS.vue'
export default {
  name: 'HelloWorld',

  components: {
    'pagination': PaginationVS,
  },

  methods: {
    getPage(value) {
      this.getCharacters(this.name, value);
    },

    setPage() {
      this.$refs.pagination.setPage()
    },

    async getCharacters(name = '', pages) {
      const pageResult = pages ? "page: " + pages + "" : ""
      const endpoint = "https://rickandmortyapi.com/graphql";
      const headers = {
        "content-type": "application/json",
      };
      const graphqlQuery = {
        "query": `query {
          characters(${pageResult} filter: { name: "${name}" }) {
            info {
              pages
            }
            results {
              name
              status
              species
              type
              gender
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

      this.pages = data.data.characters.info.pages;
      this.response = data.data.characters.results
      console.log(data.errors);
    },

    pressed() {
      this.getCharacters(this.search);
      this.name = this.search;
      this.defaultPage = 1;
    },
  },

  data() {
    return {
      pages: '',
      defaultPage: '',
      response: []
    };
  },

  beforeMount() {
    this.getCharacters();
  }

}
</script>

<style>
  .search {
    max-width: 1024px;
    margin: 0 auto;
    width: 100%;
  }

  .search label {
    padding: 0;
  }

  .search-wrapper {
    display: flex;
    justify-content: flex-end;
  }

  .form {
    width: 50%;
    margin: 0 auto;
  }

  .table {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    width: 100%;
  }

  .table-head {
    background-color: #e0e0e0;
  }

  .table-head tr th {
    font-size: large;
  }

  .mt-two {
    margin-top: 2rem;
  }
</style>