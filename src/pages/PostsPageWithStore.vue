<template>
  <div>
    <h1>Страница с постами (Store)</h1>
    <my-input
        v-focus
        :model-value="searchQuery"
        @update:model-value="setSearchQuery"
        placeholder="Поиск..."
    />
    <div class="app-buttons">
      <my-button class="post-btn" @click="dialogVisible = true">Добавить</my-button>
      <my-select :model-value="selectedSort" @update:model-value="setSelectedSort" :options="sortOptions"></my-select>
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost"></post-form>
    </my-dialog>
    <post-list v-if="!loading" :posts="sortedAndSearchedPosts" @remove="removePost"></post-list>
    <div v-else>Идет загрузка...</div>
    <div v-intersection="loadMore" class="observer"></div>
  </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import {mapMutations, mapState, mapActions, mapGetters} from 'vuex';
export default {
  components: {PostList, PostForm},
  data() {
    return {
      dialogVisible: false,
    }
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
    }),
    ...mapState({
      posts: state => state.post.posts,
      loading: state => state.post.loading,
      selectedSort: state => state.post.selectedSort,
      searchQuery: state => state.post.searchQuery,
      page: state => state.post.page,
      limit: state => state.post.limit,
      totalPages: state => state.post.totalPages,
      sortOptions: state => state.post.sortOptions
    }),
  },
  watch: {
  },
  methods: {
    ...mapActions({
      fetchPosts: 'post/fetchPosts',
      loadMore: 'post/loadMore'
    }),
    ...mapMutations({
      setPage: 'post/setPage',
      setSearchQuery: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort'
    }),
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
