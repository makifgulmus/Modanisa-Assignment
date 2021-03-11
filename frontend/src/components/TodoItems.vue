<template>
  <div>
    <ul v-for="todo in todos" :key="todo.text">
      <single-item :todo="todo"></single-item>
    </ul>
  </div>
</template>

<script>
import SingleItem from "./SingleItem.vue";
export default {
  data() {
    return {
      todos: [],
    };
  },

  methods: {
    async getTodos() {
      await fetch(`/api/todos-list`)
        .then((response) => response.json())
        .then((response) => {
          response.forEach((item) => {
            this.todos.push(item);
          });
        })
        .catch((error) => console.log(error));
    },
  },

  components: { SingleItem },
  async created() {
    this.getTodos();
  },
};
</script>

<style></style>
