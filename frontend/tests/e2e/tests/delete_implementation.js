"use strict";
const expect = require("expect");
const {
  $,
  goto,
  click,
  text,
  waitFor,
  checkBox,
  isChecked,
  write,
  focus,
  textBox,
  button,
} = require("taiko");
const assert = require("assert").strict;

step("Given ToDo list with rest for a while item", async () => {
  await click("Delete Item");
  await click("Delete Item");
  await focus($("#todoInput"));
  await write("Rest for a while");
  await click("Add Item");
});
step(
  "When I click on delete button next to rest for a while item",
  async () => {
    await click("Delete Item");
  }
);
step("Then List should be empty", async () => {
  await assert.ok(!(await button("Delete Item").exists(0, 0)));
});
