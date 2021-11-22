import type { VueConstructor } from "vue";
import "element-ui/lib/theme-chalk/index.css";
import ElementUI from "element-ui";

export function setupElement(app: VueConstructor): void {
  app.use(ElementUI, { size: "small" });
}
