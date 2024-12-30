import { sendMessage } from "webext-bridge/background";

browser.runtime.onInstalled.addListener(() => {
  console.log("Howdy! from background script.");
});

browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab?.url?.includes("login")) {
    await sendMessage("MOUNT_APP", {}, `content-script@${tabId}`);
    return;
  }

  await sendMessage("UNMOUNT_APP", {}, `content-script@${tabId}`);
});

browser.commands.onCommand.addListener(async (command) => {
  if (command === "SIGNOUT") {
    const tabs = await browser.tabs.query({
      active: true,
      currentWindow: true
    });

    if (tabs.length) {
      await sendMessage(command, {}, `content-script@${tabs[0].id}`);
    }
  }
});
