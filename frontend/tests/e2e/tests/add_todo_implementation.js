/* globals gauge*/
"use strict";
const path = require("path");
const expect = require("expect");
const { $, openBrowser, write, closeBrowser, goto, click } = require("taiko");
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
step("When I go to the app, I should see an empty todo form", async () => {
  await goto("localhost:8080");
  const inputText = await $("#todoInput");
  const addButton = await $("#addButton");
  expect(inputText).toBeTruthy();
  expect(addButton).toBeTruthy();
});

step(
  "When I write buy some milk to text box and click to add button",
  async () => {
    await write("Buy some milk");
    await click("Add Item");
  }
);

step("Then I should see buy some milk item in ToDo list", async () => {
  const todoButton = await $(".todoItem");
  expect(todoButton).toBeTruthy();
});
