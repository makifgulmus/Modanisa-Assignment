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
  it("triggers post request when new item is added", () => {
    const itemAdded = jest.fn();
    wrapper.setMethods({ itemAdded });
    itemAdded.mockReturnValue({
      text: "Buy some milk",
      done: false,
    });
    const addItemButton = wrapper.findAll("#addButton");
    addItemButton.trigger("click");
    expect(itemAdded).toBeCalled();
  });
});
