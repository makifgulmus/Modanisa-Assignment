<template>
  <div class="todoItem">
    <span>
      {{ todo.text }}
    </span>
    <input type="checkbox" id="checkbox" />
  </div>
</template>

<script>
export default {
  props: ["todo", "todotext"],
};
</script>

<style>
.todoItem {
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
