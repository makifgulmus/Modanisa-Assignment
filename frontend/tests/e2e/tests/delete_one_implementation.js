"use strict";
const expect = require("expect");
const { $, goto, click, text, isChecked, write, focus } = require("taiko");
const assert = require("assert").strict;

step(
  "Given ToDo list with rest for a while and drink water item in order",
  async () => {
    await focus($("#todoInput"));
    await write("Rest for a while");
    await click("Add Item");
    await write("Drink water");
    await click("Add Item");
  }
);
step("When I click on delete button next to rest for a while", async () => {
  await click("Delete Item");
});
step("Then I should see drink water item in ToDo list", async () => {
  await assert.ok(await text("Drink water").exists());
});
