<template>
  <div>
    <form>
      <input
        id="todoInput"
        ref="todoInput"
        v-model="newTodo"
        placeholder="What to do?"
        type="text"
      />
      <button>
        Add Item
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTodo: "",
    };
  },
};
</script>

<style>
form {
  display: flex;
  justify-content: center;
}
input {
  width: 25%;
  height: 2rem;
  font-size: 20px;
}
input:focus {
  outline-width: 0;
}
</style>
