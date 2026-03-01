import { expect, test } from "@playwright/test";

test("judge click-through: start to campaign dashboard", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: "Start campaign" }).click();
  await expect(page).toHaveURL(/\/brand\/onboarding$/);

  await page.getByRole("button", { name: "Generate profile" }).click();
  await expect(page.getByRole("heading", { name: "Brand Profile" })).toBeVisible();
  await page.getByRole("button", { name: "Continue to campaign" }).click();

  await expect(page).toHaveURL(/\/campaign\/new$/);
  await page.getByRole("button", { name: "Use sample campaign" }).click();
  await page.getByRole("button", { name: "Generate campaign brief" }).click();
  await page.getByRole("button", { name: "Review campaign plan" }).click();

  await expect(page).toHaveURL(/\/campaign\/plan$/);
  await page.getByRole("button", { name: "Show recommended creators" }).click();

  await expect(page).toHaveURL(/\/campaign\/match$/);
  await page.getByRole("button", { name: "Select" }).first().click();
  await page.getByRole("button", { name: "Select" }).nth(1).click();
  await page.getByRole("button", { name: "Reach out to selected" }).click();
  await expect(page.getByRole("heading", { name: "Outreach drafts" })).toBeVisible();
  await page.getByRole("button", { name: "Send outreach" }).click();

  await expect(page).toHaveURL(/\/campaign\/operator$/);
  await page.getByRole("button", { name: "Send follow-up" }).click();
  await page.getByRole("button", { name: "Open campaign dashboard" }).click();

  await expect(page).toHaveURL(/\/campaign\/report$/);
  await expect(page.getByRole("heading", { name: "Campaign Dashboard" })).toBeVisible();
});
