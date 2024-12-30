import "@/assets/style.css";
import App from "./App.vue";
import { onMessage } from "webext-bridge/content-script";

onMessage("SIGNOUT", async () => {
  const logoutBtn = document.querySelector("div.ubadge__dropdown a:last-child");
  if (logoutBtn) {
    logoutBtn.click();
  }
});

const app = createApp(App);
const root = document.createElement("div");
root.id = "tms-ease";
document.body.appendChild(root);

app.mount(root);
