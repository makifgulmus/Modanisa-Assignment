"use strict";
const expect = require("expect");
const { $, goto, click, text, waitFor, checkBox, isChecked } = require("taiko");
const assert = require("assert").strict;

step("Given ToDo list with buy some milk item", async () => {
  await goto("localhost:8080");
  await assert.ok(await text("Buy some milk").exists());
});

step("When I click on buy some milk text", async () => {
  const buySomeMilkText = await text("Buy some milk");
  await click("Buy some milk");
});

step("Then I should see buy some milk item marked as done", async () => {
  await checkBox({ id: "checkbox" }).isChecked();
  await waitFor(2000);
});
