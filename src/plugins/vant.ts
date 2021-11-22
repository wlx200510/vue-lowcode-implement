import type { VueConstructor } from "vue";
import Vant from "vant";
import "vant/lib/index.css";
import "@vant/touch-emulator";

export const setupVant = (app: VueConstructor): void => {
  app.use(Vant);
};
