import { shallowMount } from "@vue/test-utils";
import TodoItems from "../../src/components/TodoItems.vue";
require("jest-fetch-mock").enableMocks();

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

  it("calls the fetch method", () => {
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
