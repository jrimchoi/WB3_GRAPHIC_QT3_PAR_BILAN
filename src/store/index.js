import { defineStore } from "pinia";

export const usedStore = defineStore("counter", {
    state: () => ({
        counter: 0,
        space3D: "",
        widgetEvent: "",
        csrf: ""
    }),
    actions: {
        incrementCounter() {
            this.counter++;
        },
        decrementCounter() {
            this.counter--;
        },
        updateWidgetEvent(data) {
            this.widgetEvent = data;
        },
        updateActiveSpace(data) {
            this.activeSpace = data;
            this.space3D = data["3DSpace"];
        },
        updateCsrf(data) {
            this.Csrf = data;
        }
    }
});
