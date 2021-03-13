<template>
  <div class="todoDiv">
    <span @click="changeTodoStatus()" v-bind:class="{ todoItemDone: isDone }">
      {{ todo.text }}
    </span>
    <input
      type="checkbox"
      id="checkbox"
      v-model="checked"
      @click="changeTodoStatus"
    />
    <button @click="deleteItem(todo.text)" type="submit" id="deleteButton">
      Delete Item
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: this.todo.done,
      isDone: this.todo.done,
    };
  },
  props: ["todo"],
  methods: {
    changeTodoStatus() {
      this.isDone = !this.isDone;
      this.checked = !this.checked;
      this.$emit("todo-updated", JSON.parse(JSON.stringify(this.todo)));
    },
    deleteItem() {
      this.$emit("todo-deleted", JSON.parse(JSON.stringify(this.todo.text)));
    },
  },
};
</script>

<style>
.todoDiv {
  display: flex;
  justify-content: center;
}

.todoItemDone {
  text-decoration: line-through;
}

span {
  font-size: 1.2rem;
}
input[type="checkbox"] {
  width: 5%;
}
</style>
