// import 3ddashboard utils before imports requiring static ressources (such as vuetify webfonts)
import { widget, disableDefaultCSS, requirejs, onVisibilityChange } from "@widget-lab/3ddashboard-utils";
import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { usedStore } from "./store/index.js";
import VueCompositionAPI from "@vue/composition-api";
import { createPinia, PiniaVuePlugin } from "pinia";

disableDefaultCSS(true);

widget.setTitle("Widget Template Vue Beam Cube");

const pinia = createPinia();
Vue.use(PiniaVuePlugin);

Vue.use(VueCompositionAPI);

const mainComponent = new Vue({
    usedStore,
    vuetify,
    pinia,
    render: h => h(App)
});

mainComponent.$mount("app");

const store = usedStore();

const start = () => {
    requirejs(["DS/PlatformAPI/PlatformAPI"], (/* PlatformAPI */) => {
        // use 3DDashboard APIs
    });

    onVisibilityChange((/* visibility */) => {
        // widget (or fullpage) visibility has changed
        // you can enable/disable periodic data refresh based on visibility
    });
};

/**
 * Entry point for both standalone & 3DDashboard modes
 */
widget.addEvent("onLoad", () => {
    start();
    store.updateWidgetEvent("onLoad");
});

widget.addEvent("onRefresh", () => {
    store.updateWidgetEvent("onRefresh");
});

widget.addEvent("onResize", () => {
    store.updateWidgetEvent("onResize");
});
