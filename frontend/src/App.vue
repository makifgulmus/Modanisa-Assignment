<template>
  <div id="app">
    <add-item> </add-item>
    <todo-items></todo-items>
  </div>
</template>

<script>
import TodoItems from "./components/TodoItems";
import AddItem from "./components/AddItem.vue";

export default {
  name: "App",
  components: {
    AddItem,
    TodoItems,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
