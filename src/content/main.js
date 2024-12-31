import "@/assets/style.css";
import App from "./App.vue";
import { onMessage } from "webext-bridge/content-script";

const createMyApp = () => createApp(App);
let app = null;

const root = document.createElement("div");
root.id = "tms-ease";
root.classList.add(
  "fixed",
  "top-0",
  "left-0",
  "w-screen",
  "h-screen",
  "z-infinity",
  "bg-[var(--orange)]",
  "flex",
  "justify-center",
  "items-center"
);

document.body.appendChild(root);

onMessage("MOUNT_APP", async () => {
  app = createMyApp();
  app.mount(root);
});

onMessage("UNMOUNT_APP", async () => {
  if (app) {
    app.unmount();
    app = null;
  }
});

onMessage("SIGNOUT", async () => {
  const logoutBtn = document.querySelector("div.ubadge__dropdown a:last-child");
  if (logoutBtn) {
    logoutBtn.click();
  }
});
