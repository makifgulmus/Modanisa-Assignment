import { shallowMount } from "@vue/test-utils";
import TodoItems from "../../src/components/TodoItems.vue";
import moxios from "moxios";
require("jest-fetch-mock").enableMocks();

beforeEach(() => {
  moxios.install();
});

afterEach(() => {
  moxios.uninstall();
});

describe("Rendering and functioning correctly", () => {
  const spy = jest.spyOn(TodoItems.methods, "getTodos");

  let wrapper;
  beforeEach(() => {
    fetch.resetMocks();
    wrapper = shallowMount(TodoItems, {});
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("calls the fetch method when it gets created", async () => {
    moxios.stubRequest(`http://35.224.219.240/todos-list`, {
      status: 200,
      response: [
        {
          text: "Buy some milk",
          done: false,
        },
      ],
    });
    expect(spy).toHaveBeenCalledTimes(1);
    await wrapper.vm.getTodos();
    expect(wrapper.vm.todos).toStrictEqual([
      {
        text: "Buy some milk",
        done: false,
      },
    ]);
  });

  it("calls updateTodo() and it runs as expected", async () => {
    await wrapper.setData({
      todos: [
        {
          text: "Buy some milk",
          done: false,
        },
      ],
    });
    moxios.stubRequest("http://35.224.219.240/todo-items", {
      status: 200,
      response: {
        text: "Buy some milk",
        done: true,
      },
    });
    await wrapper.vm.updateTodo({
      text: "Buy some milk",
      done: false,
    });
    expect(wrapper.vm.todos).toStrictEqual([
      {
        text: "Buy some milk",
        done: false,
      },
    ]);
  });

  it("calls deleteTodo() and it runs as expected", async () => {
    await wrapper.setData({
      todos: [
        {
          text: "Buy some milk",
          done: false,
        },
      ],
    });
    moxios.stubRequest("http://35.224.219.240/todo-items", {
      status: 200,
      response: {
        msg: "Todo Deleted",
      },
    });
    await wrapper.vm.deleteTodo("Buy some milk");
  });
});
