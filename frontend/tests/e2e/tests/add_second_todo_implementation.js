"use strict";
const expect = require("expect");
const { $, write, goto, click, below, text } = require("taiko");
const assert = require("assert").strict;

step(
  "When I go to the app, I should see a todo list with one item",
  async () => {
    await goto("localhost:8080");
    const inputText = await $("#todoInput");
    const addButton = await $("#addButton");
    const firstItem = await $(".todoItem");
    expect(inputText).toBeTruthy();
    expect(addButton).toBeTruthy();
    expect(firstItem).toBeTruthy();
  }
);

step(
  "When I write enjoy the assignment to text box and click to add button",
  async () => {
    await write("Enjoy the assignment");
    await click("Add Item");
  }
);

step(
  "Then I should see enjoy the assignment in ToDo list below buy some milk",
  async () => {
    await assert.ok(await text("Buy some milk").exists());
    await assert.ok(await text("Enjoy the assignment").exists());
  }
);
