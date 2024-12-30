import App from "./App.vue";

const app = createApp(App);
const root = document.createElement("div");
root.id = "tms-ease";
document.body.appendChild(root);

app.mount(root);
