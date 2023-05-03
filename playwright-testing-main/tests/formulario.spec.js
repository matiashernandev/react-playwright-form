const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173");
});

test.describe("Testing Form", () => {
  test("debería mostrar mensaje correcto", async ({ page }) => {
    await page.getByLabel("Name", { exact: true }).fill("Hernán");
    await page.getByLabel("Surname").fill("Arroyo");
    await page.getByLabel("Username").fill("nkwaaaa");
    await page.getByLabel("Email").fill("nkwaaaa@gmail.com");
    await page.getByLabel("Password").fill("12345");

    await page.getByRole("button").click();

    const p = await page.getByTestId("success-message");

    await expect(p).toBeVisible();
  });

  test("deberían borrarse los campos de texto", async ({ page }) => {
    const inputName = await page.getByLabel("Name", { exact: true });
    const inputSurname = await page.getByLabel("Surname");
    const inputUsername = await page.getByLabel("Username");
    const inputEmail = await page.getByLabel("Email");
    const inputPassword = await page.getByLabel("Password");

    await inputName.fill("Hernán");
    await inputSurname.fill("Arroyo");
    await inputUsername.fill("nkwaaaa");
    await inputEmail.fill("nkwaaaa@gmail.com");
    await inputPassword.fill("12345");

    await page.getByRole("button").click();

    await expect(inputName).toBeEmpty();
    await expect(inputSurname).toBeEmpty();
    await expect(inputUsername).toBeEmpty();
    await expect(inputEmail).toBeEmpty();
    await expect(inputPassword).toBeEmpty();
  });
});
