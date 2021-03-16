<template>
  <div class="todoDiv">
    <p @click="changeTodoStatus()" v-bind:class="{ todoItemDone: isDone }">
      {{ todo.text }}
    </p>
    <div class="buttonsClass">
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
  border-style: groove;
  border-width: 1.5px;
  border-color: #91b0b7;
  justify-content: space-between;
  align-items: center;
}

.buttonsClass {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  margin-left: 1rem;
  margin-right: 1rem;
}

.todoItemDone {
  text-decoration: line-through;
}

p {
  font-size: 1.2rem;
  color: white;
  margin-left: 1rem;
}
input[type="checkbox"] {
  transform: scale(2);
  -ms-transform: scale(2);
  -webkit-transform: scale(2);
  margin: 0;
}

#deleteButton {
  display: inline-block;
  margin-left: 1rem;
}
</style>
