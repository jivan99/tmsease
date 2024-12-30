import { sendMessage } from "webext-bridge/background";

browser.runtime.onInstalled.addListener(() => {
  console.log("Howdy! from background script.");
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
