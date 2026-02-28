import { expect, Page, test } from "@playwright/test";

const completeToCoordination = async (page: Page) => {
  await page.goto("/");
  await page.getByRole("button", { name: "I'm a Brand" }).click();

  await expect(page).toHaveURL(/\/brand\/onboarding$/);
  await page.getByLabel("Company name").fill("Northstar Nutrition");
  await page.getByRole("button", { name: "Save & Next: Campaign Setup" }).click();

  await expect(page).toHaveURL(/\/brand\/campaign\/new$/);
  await page.getByLabel("Campaign name").fill("Spring Creator Push");
  await page.getByLabel("Objective").fill("Drive awareness and conversions with creator-led content.");
  await page.getByRole("button", { name: "Save & Next: Find Matches" }).click();

  await expect(page).toHaveURL(/\/brand\/campaign\/.+\/matches$/);
  await expect(page.getByRole("heading", { name: "Influencer Matches" })).toBeVisible();

  const selectButtons = page.getByRole("button", { name: "Select" });
  await selectButtons.first().click();
  await selectButtons.nth(1).click();
  await page.getByRole("button", { name: "Send Offers & Next" }).click();

  await expect(page).toHaveURL(/\/brand\/campaign\/.+\/coord$/);
  await expect(page.getByRole("heading", { name: "Coordination Workspace" })).toBeVisible();
};

test("brand can complete onboarding to coordination flow", async ({ page }) => {
  await completeToCoordination(page);
  await expect(page.getByText("Simulate Accept").first()).toBeVisible();
  await expect(page.getByText("Deliverables Checklist").first()).toBeVisible();
});

test("coordination supports status simulation, messaging, and checklist toggles", async ({ page }) => {
  await completeToCoordination(page);

  await page.getByRole("button", { name: "Simulate Accept" }).first().click();
  await expect(page.getByText("Accepted").first()).toBeVisible();

  const input = page.getByPlaceholder("Type a message...").first();
  await input.fill("Please share final draft by Friday.");
  await page.getByRole("button", { name: "Send" }).first().click();
  await expect(page.getByText("Please share final draft by Friday.").first()).toBeVisible();

  const firstCheckbox = page.locator("input[type='checkbox']").first();
  await firstCheckbox.check();
  await expect(firstCheckbox).toBeChecked();
});
