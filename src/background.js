import { sendMessage } from "webext-bridge/background";

(async () => {
  const text = await browser.runtime.sendNativeMessage("com.jivan99.tmsease", {
    message: "ping"
  });
  console.log({ text });
})();

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

browser.downloads.onChanged.addListener(async (delta) => {
  try {
    if (delta.state && delta.state.current === "complete") {
      const [download] = await browser.downloads.search({ id: delta.id });
      if (download?.filename?.includes("captcha")) {
        const tabs = await browser.tabs.query({
          active: true,
          currentWindow: true
        });

        if (tabs.length) {
          await sendMessage(
            "DOWNLOAD_COMPLETE",
            {},
            `content-script@${tabs[0].id}`
          );
        }
      }
    }
  } catch (err) {
    console.log({ err });
  }
});
