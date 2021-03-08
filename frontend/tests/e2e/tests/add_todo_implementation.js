/* globals gauge*/
"use strict";
const path = require("path");
const {
  openBrowser,
  write,
  closeBrowser,
  goto,
  press,
  screenshot,
  above,
  click,
  focus,
  checkBox,
  listItem,
  toLeftOf,
  link,
  text,
  into,
  textBox,
  evaluate,
} = require("taiko");
const assert = require("assert");
const headless = process.env.headless_chrome.toLowerCase() === "true";

beforeSuite(async () => {
  await openBrowser({
    headless: headless,
  });
});

afterSuite(async () => {
  await closeBrowser();
});
step("When I go to the app, I should see an empty todo form", async (item) => {
  await goto("localhost:8080");
  await assert.ok(await text("What to do?").exists());
  await assert.ok(await button("Add Item").exists());
});

step(
  "When I write buy some milk to text box and click to add button",
  async (item) => {
    await write("Buy some milk");
    await click("Add Item");
  }
);

step("Then I should see buy some milk item in ToDo list", async (item) => {
  await assert.ok(await text("Buy some milk").exists());
});
