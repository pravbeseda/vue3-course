<template>
  <div>
    <h1>Страница с постами</h1>
    <my-input
        v-focus
        v-model="searchQuery"
        placeholder="Поиск..."
    />
    <div class="app-buttons">
      <my-button class="post-btn" @click="dialogVisible = true">Добавить</my-button>
      <my-select v-model="selectedSort" :options="sortOptions"></my-select>
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost"></post-form>
    </my-dialog>
    <post-list v-if="!loading" :posts="sortedAndSearchedPosts" @remove="removePost"></post-list>
    <div v-else>Идет загрузка...</div>
    <div v-intersection="loadMore" class="observer"></div>
    <!--div class="page-wrapper">
      <div
          class="page"
          :class="{ 'current-page': page === pageNum }"
          v-for="pageNum in totalPages" :key="pageNum"
          @click="goPage(pageNum)"
      >
        {{ pageNum }}
      </div>
    </div-->
  </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import axios from "axios";
export default {
  components: {PostList, PostForm},
  data() {
    return {
      posts: [],
      dialogVisible: false,
      loading: false,
      selectedSort: '',
      searchQuery: '',
      page: 1,
      limit: 10,
      totalPages: 0,
      sortOptions: [
        {value: 'title', name: 'По названию'},
        {value: 'body', name: 'По тексту'},
      ]
    }
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]));
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter(post => post.title?.toLowerCase().includes(this.searchQuery?.toLowerCase()));
    }
  },
  watch: {
    /*page() {
      this.fetchPosts();
    }*/
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(id) {
      this.posts = this.posts.filter(p => p.id !== id);
    },
    goPage(pageNum) {
      this.page = pageNum;
    },
    async fetchPosts() {
      try {
        this.loading = true;
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`, {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.posts = response.data;
      } catch (e) {
        console.error(e);
      } finally {
        this.loading = false;
      }
    },
    async loadMore() {
      this.page++;
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`, {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.posts = [ ...this.posts, ...response.data ];
      } catch (e) {
        console.error(e);
      } finally {
      }
    }
  }
}
</script>

<style scoped>
.app-buttons {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
}

.page-wrapper {
  display: flex;
  margin-top: 15px;
}
.page {
  padding: 10px;
  border: 1px solid black;
}
.current-page {
  border: 2px solid blue;
}
.observer {
  height: 30px;
}

</style>
