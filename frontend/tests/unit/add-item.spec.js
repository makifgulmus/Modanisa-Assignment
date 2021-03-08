import { shallowMount } from "@vue/test-utils";
import AddItem from "../../src/components/AddItem.vue";

describe("Rendering properly and having the correct elements", () => {
  let wrapper;
  beforeEach(() => {
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
});
