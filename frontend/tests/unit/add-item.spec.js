import { shallowMount } from "@vue/test-utils";
import AddItem from "../../src/components/AddItem.vue";
require("jest-fetch-mock").enableMocks();

describe("Rendering properly and having the correct elements", () => {
  let wrapper;
  beforeEach(() => {
    fetch.resetMocks();
    wrapper = shallowMount(AddItem, {});
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("exists and renders correctly", () => {
    const addItemForm = wrapper.findAll("input");
    const addItemButton = wrapper.findAll("#addButton");
    expect(addItemForm.length).toBe(1);
    expect(addItemButton.length).toBe(1);
  });
  it("triggers post request when new item is added", async () => {
    await wrapper.setData({ newTodo: "Buy some milk" });
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            text: "Buy some milk",
            done: false,
          }),
      })
    );
    const addItemButtons = wrapper.findAll("#addButton");
    expect(addItemButtons).toHaveLength(1);
    addItemButtons.at(0).trigger("click");
    expect(wrapper.vm.newTodo).toBe("Buy some milk");
  });
});
