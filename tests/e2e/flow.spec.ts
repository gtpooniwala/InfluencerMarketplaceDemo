import { expect, test } from "@playwright/test";

test("judge click-through: intake to auto report", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: "Start a campaign" }).click();
  await expect(page).toHaveURL(/\/brand\/onboarding$/);

  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page).toHaveURL(/\/campaign\/new$/);

  await expect(page.getByRole("heading", { name: "What this means" })).toBeVisible();
  await page.getByRole("button", { name: "Use sample context" }).click();
  await page.getByRole("button", { name: "Generate campaign plan" }).click();

  await expect(page).toHaveURL(/\/campaign\/plan$/);
  await expect(page.getByRole("heading", { name: "What this means" })).toBeVisible();
  await page.getByRole("button", { name: "Show recommended creators" }).click();

  await expect(page).toHaveURL(/\/campaign\/match$/);
  await expect(page.getByRole("heading", { name: "What this means" })).toBeVisible();
  await page.getByRole("button", { name: "Select" }).first().click();
  await page.getByRole("button", { name: "Select" }).nth(1).click();
  await page.getByRole("button", { name: "Reach out with tailored scripts" }).click();
  await expect(page.getByRole("heading", { name: "Outreach review" })).toBeVisible();
  await page.getByRole("button", { name: "Send outreach" }).click();

  await expect(page).toHaveURL(/\/campaign\/operator$/);
  await page.getByRole("button", { name: "Send follow-up" }).click();
  await expect(page.getByText("Follow-up sent.")).toBeVisible();
  await page.getByRole("button", { name: "View auto report" }).click();

  await expect(page).toHaveURL(/\/campaign\/report$/);
  await expect(page.getByRole("heading", { name: "Predicted vs Actual" })).toBeVisible();
});

