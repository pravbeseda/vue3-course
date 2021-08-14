<template>
  <div>
    <h1>Страница с постами (Composition Api)</h1>
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
      <post-form></post-form>
    </my-dialog>
    <post-list v-if="!loading" :posts="sortedAndSearchedPosts"></post-list>
    <div v-else>Идет загрузка...</div>
  </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import {usePosts} from "@/hooks/usePosts";
import useSortedPosts from "@/hooks/useSortedPosts";
import useSortedAndSearchedPosts from "@/hooks/useSortedAndSearchedPosts";
export default {
  components: {PostList, PostForm},
  data() {
    return {
      dialogVisible: false,
      sortOptions: [
        {value: 'title', name: 'По названию'},
        {value: 'body', name: 'По тексту'},
      ]
    }
  },
  setup(props) {
    const { posts, loading, totalPages } = usePosts(10);
    const { selectedSort, sortedPosts } = useSortedPosts(posts);
    const { searchQuery, sortedAndSearchedPosts } = useSortedAndSearchedPosts(sortedPosts)

    return {
      posts, loading, totalPages, selectedSort, sortedPosts, searchQuery, sortedAndSearchedPosts
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
