import test, {expect} from "playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/');
});

test.describe("UI Components", async () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
  });

  test("input fields", async ({ page }) => {
    const usingTheGridEmailInput = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: 'Email'});

    await usingTheGridEmailInput.fill('test@test.com');
    await usingTheGridEmailInput.clear();
    await usingTheGridEmailInput.pressSequentially('test2@test.com', {delay: 500});

    // generic assertion

    const inputValue = await usingTheGridEmailInput.inputValue();
    expect(inputValue).toEqual('test2@test.com');


    // locator assertion
    await expect(usingTheGridEmailInput).toHaveValue('test2@test.com');
  });

  test("radio buttons", async ({ page }) => {
    const usingTheGridFrom = page.locator('nb-card', {hasText: "Using the Grid"});
    await usingTheGridFrom.getByLabel('Option 1').check({force: true});
    await usingTheGridFrom.getByRole('radio', {name: 'Option 2'}).check({force: true});

    const radioStatus = await usingTheGridFrom.getByRole('radio', {name: 'Option 2'}).isChecked();
    expect(radioStatus).toBeTruthy();
    expect(await usingTheGridFrom.getByRole('radio', {name: 'Option 1'}).isChecked()).toBeFalsy();
  });

});

test("checkboxes", async ({page}) => {
  await page.getByText('Modal & Overlays').click();
  await page.getByText('Toastr').click();

  await page.getByRole('checkbox', {name: 'Hide on click'}).click({force: true});
  await page.getByRole('checkbox', {name: 'Prevent arising of duplicate toast'}).check({force: true});
  await page.getByRole('checkbox', {name: 'Show toast with icon'}).uncheck({force: true});

  const allBoxes = await page.getByRole('checkbox');
  for (const checkbox of await allBoxes.all()) {
    await checkbox.uncheck({force: true});
    expect(await checkbox.isChecked()).toBeFalsy();
  }

});


test("list and drop-down", async ({page}) => {
  await page.locator('ngx-header nb-select').click();


});
