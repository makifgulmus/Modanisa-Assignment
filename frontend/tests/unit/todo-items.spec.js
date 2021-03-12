import { shallowMount } from "@vue/test-utils";
import TodoItems from "../../src/components/TodoItems.vue";
require("jest-fetch-mock").enableMocks();

describe("Rendering and functioning correctly", () => {
  const spy = jest.spyOn(TodoItems.methods, "getTodos");
  jest.mock("axios", () => ({
    get: Promise.resolve([
      {
        text: "Buy some milk",
        done: false,
      },
    ]),
  }));

  let wrapper;
  beforeEach(() => {
    fetch.resetMocks();
    wrapper = shallowMount(TodoItems, {});
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("calls the fetch method", async () => {
    fetch.mockResponseOnce(
      JSON.stringify([
        {
          text: "Buy some milk",
          done: false,
        },
      ])
    );
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
