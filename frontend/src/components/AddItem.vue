<template>
  <div class="addItemClass">
    <form>
      <input
        id="todoInput"
        ref="todoInput"
        v-model="newTodo"
        @keydown.enter.prevent="itemAdded(newTodo)"
        placeholder="What to do?"
        type="text"
      />
      <button @click.prevent="itemAdded(newTodo)" type="submit" id="addButton">
        Add Item
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  async mounted() {
    this.$refs["todoInput"].focus();
  },
  data() {
    return {
      newTodo: "",
    };
  },
  methods: {
    async itemAdded(newTodo) {
      if (newTodo.length > 1) {
        await axios.post(
          `http://35.224.219.240/todo-items`,
          {
            text: `${newTodo}`,
            done: false,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        window.location.reload();
        this.newTodo = "";
        this.$refs["todoInput"].value = "";
      }
    },
  },
};
</script>

<style>
.addItemClass {
  right: 0;
}
form {
  display: flex;
  margin-bottom: 2rem;
}
#todoInput {
  background-color: #d5d2d2;
  border-width: thin;
  height: 2rem;
  font-size: 20px;
  margin-right: 0.5rem;
  width: 80%;
}
input:focus {
  outline-width: 0;
}
</style>
