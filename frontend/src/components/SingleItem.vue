<template>
  <div v-bind:class="{ todoItemDone: isDone, todoItemNotDone: !isDone }">
    <span @click="changeTodoStatus">
      {{ todo.text }}
    </span>
    <input
      type="checkbox"
      id="checkbox"
      v-model="checked"
      @click="changeTodoStatus"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: false,
      isDone: false,
    };
  },
  props: ["todo"],
  methods: {
    changeTodoStatus() {
      this.isDone = !this.isDone;
      this.checked = !this.checked;
    },
  },
};
</script>

<style>
.todoItemDone {
  display: flex;
  justify-content: center;
  text-decoration: line-through;
}
.todoItemNotDone {
  display: flex;
  justify-content: center;
}
span {
  font-size: 1.2rem;
}
input[type="checkbox"] {
  width: 5%;
}
</style>
