import { shallowMount } from "@vue/test-utils";
import SingleItem from "../../src/components/SingleItem.vue";

describe("todo items existing and rendering correctly", () => {
  const spy = jest.spyOn(SingleItem.methods, "changeTodoStatus");
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(SingleItem, {
      propsData: {
        todo: { text: "Buy some milk", done: false },
      },
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("exists and renders as a single todo item with text and done attributes", () => {
    expect(wrapper.findAll("span").length).toBe(1);
    const doneBoxes = wrapper.findAll("#checkbox");
    expect(doneBoxes.length).toBe(1);
  });

  it("marks item as done when item is clicked", () => {
    const items = wrapper.findAll("span");
    expect(items.length).toBe(1);
    items.trigger("click");
    expect(spy).toHaveBeenCalledTimes(1);
    const doneBoxes = wrapper.findAll("#checkbox");
    expect(doneBoxes.length).toBe(1);
  });
});
