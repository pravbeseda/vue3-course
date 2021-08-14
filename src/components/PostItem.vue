<template>
  <div class="post">
    <div>
      <div>{{ post.id }}</div>
      <div><strong>Название: </strong> {{ post.title }}</div>
      <div><strong>Описание: </strong> {{ post.body }}</div>
    </div>
    <div class="post-btns">
      <my-button class="btn" @click="$router.push(`/posts/${post.id}`)">Открыть</my-button>
      <my-button class="btn" @click="$emit('remove', post.id)">Удалить</my-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  }

}
</script>

<style scoped>
.post {
  padding: 15px;
  border: 2px solid blue;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.btn {
  margin-left: 10px;
}
.post-btns {
  display: flex;
}
</style>
