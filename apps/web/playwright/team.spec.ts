import { expect, test } from "playwright/test";

import { login, signUpAndLogin, signupUsingInviteToken, skipOnboarding } from "./utils/helper";
import { invites, users } from "./utils/mock";

// Helper function to click on dropdown
async function clickOnDropdown(page) {
  const dropdownTrigger = page.locator("#userDropdownTrigger");
  await expect(dropdownTrigger).toBeVisible();
  await dropdownTrigger.click();
}

test.describe("Team member management", async () => {
  test.describe.configure({ mode: "serial" });
  const { email, password, name } = users.team[0];
  let inviteLink: string;

  test.describe("Invite team member", async () => {
    test("Sign up and login", async ({ page }) => {
      // ...
    });

    test("Invite member", async ({ page }) => {
      // ...
    });

    test("Copy invite link", async ({ page }) => {
      // ...
    });
  });

  test.describe("Accept invite and remove member", async () => {
    test("Accept invite", async ({ page }) => {
      // ...
    });

    test("Remove member", async ({ page }) => {
      // ...
    });
  });
});
    await expect(dropdownTrigger).toBeVisible();
    await dropdownTrigger.click();

    const dropdownContentWrapper = page.locator("#userDropdownContentWrapper");
    await expect(dropdownContentWrapper).toBeVisible();

    await page.getByRole("link", { name: "Team" }).click();

    await expect(page.locator("#membersInfoWrapper")).toBeVisible();

    const lastMemberInfo = page.locator("#membersInfoWrapper > .singleMemberInfo:last-child");
    await expect(lastMemberInfo).toBeVisible();

    const pendingSpan = lastMemberInfo.locator("span").filter({ hasText: "Pending" });
    await expect(pendingSpan).toBeVisible();

    const shareInviteButton = page.locator("#shareInviteButton");
    await expect(shareInviteButton).toBeVisible();

    await shareInviteButton.click();

    const inviteLinkText = page.locator("#inviteLinkText");
    await expect(inviteLinkText).toBeVisible();

    // invite link text is a paragraph, and we need the text inside it
    const inviteLinkTextContent = await inviteLinkText.textContent();
    if (inviteLinkTextContent) {
      inviteLink = inviteLinkTextContent;
    }
  });

  test("Accept Invite", async ({ page }) => {
    const { email, name, password } = users.team[1];
    page.goto(inviteLink);

    await page.waitForURL(/\/invite\?token=[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+/);

    // Create account button
    await expect(page.getByRole("link", { name: "Create account" })).toBeVisible();
    await page.getByRole("link", { name: "Create account" }).click();

    await signupUsingInviteToken(page, name, email, password);
    await skipOnboarding(page);
  });

  test("Remove Member", async ({ page }) => {
    await login(page, email, password);

    const dropdownTrigger = page.locator("#userDropdownTrigger");
    await expect(dropdownTrigger).toBeVisible();
    await dropdownTrigger.click();

    const dropdownContentWrapper = page.locator("#userDropdownContentWrapper");
    await expect(dropdownContentWrapper).toBeVisible();

    await page.getByRole("link", { name: "Team" }).click();

    await expect(page.locator("#membersInfoWrapper")).toBeVisible();

    const lastMemberInfo = page.locator("#membersInfoWrapper > .singleMemberInfo:last-child");
    await expect(lastMemberInfo).toBeVisible();

    const deleteMemberButton = lastMemberInfo.locator("#deleteMemberButton");
    await expect(deleteMemberButton).toBeVisible();

    await deleteMemberButton.click();

    await expect(page.getByRole("button", { name: "Delete", exact: true })).toBeVisible();
    await page.getByRole("button", { name: "Delete", exact: true }).click();
  });
});
