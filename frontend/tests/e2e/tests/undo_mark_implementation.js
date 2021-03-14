"use strict";
const expect = require("expect");
const { $, goto, click, text, waitFor, checkBox, isChecked } = require("taiko");
const assert = require("assert").strict;

step("Given ToDo list with buy some milk item marked as done", async () => {
  await assert.ok(await text("Buy some milk").exists());
  await checkBox({ id: "checkbox" }).isChecked();
});

step("When I click on text", async () => {
  await click("Buy some milk");
});

step("Then I should see buy some milk item not marked as done", async () => {
  await !checkBox({ id: "checkbox" }).isChecked();
});
