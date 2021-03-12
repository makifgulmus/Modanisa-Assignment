<template>
  <div>
    <ul v-for="todo in todos" :key="todo.text">
      <single-item :todo="todo"></single-item>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import SingleItem from "./SingleItem.vue";
export default {
  data() {
    return {
      todos: [],
    };
  },

  methods: {
    async getTodos() {
      var vm = this;
      await axios.get(`/api/todos-list`).then(function(response) {
        response.data.forEach((item) => {
          vm.todos.push(item);
        });
      });
    },
  },

  components: { SingleItem },
  async created() {
    this.getTodos();
  },
};
</script>

<style></style>
