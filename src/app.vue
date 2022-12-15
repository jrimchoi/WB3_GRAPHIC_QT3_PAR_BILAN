<template>
    <v-app>
        <v-container class="fill-height ma-0 pa-0" fluid>
            <v-layout class="split">
                <section class="left">
                    <SideBar />
                </section>
                <section class="right">
                    <v-sheet cols="12" color="grey lighten-3">
                        <h1>Hello My World Beam !</h1>
                        <span>count : {{ store.counter }}</span>
                        <br />
                        <v-btn color="#ff6600" @click="store.incrementCounter()"> Count +1 </v-btn>
                        <v-btn color="#ff6600" @click="store.decrementCounter()"> Count -1 </v-btn>
                        <br />
                        <br />
                        <v-btn color="#ff6600" @click="store.updateWidgetEvent('onClick')"> onClick event </v-btn>
                        <span> Event : {{ store.widgetEvent }} </span>
                    </v-sheet>
                </section>
            </v-layout>
        </v-container>
    </v-app>
</template>

<style scoped>
@import "./style/main.css";
</style>

<script>
import { widget } from "@widget-lab/3ddashboard-utils";
import SideBar from "./components/SideBar.vue";
import { InitdbPROJETS, InitdbPIVETEAU, InitdbCLIENTS } from "../config/config";
import { onMounted, watch } from "@vue/composition-api";
import { storeToRefs } from "pinia";
import { usedStore } from "./store/index";

console.debug(widget);

export default {
    components: { SideBar },
    setup() {
        const store = usedStore();
        const storeState = storeToRefs(store);

        watch(storeState.widgetEvent, widgetEvent => console.log(widgetEvent));

        onMounted(() => {
            widget.addPreference({
                name: "dbPROJETS",
                type: "text",
                label: "dbPROJETS",
                defaultValue: InitdbPROJETS()
            });

            widget.addPreference({
                name: "dbPIVETEAU",
                type: "text",
                label: "dbPIVETEAU",
                defaultValue: InitdbPIVETEAU()
            });

            widget.addPreference({
                name: "dbCLIENTS",
                type: "text",
                // type: "hidden",
                label: "dbCLIENTS",
                defaultValue: InitdbCLIENTS()
            });

            widget.addPreference({
                name: "datadbPIVETEAU",
                type: "text",
                label: "datadbPIVETEAU",
                defaultValue: ""
            });

            widget.addPreference({
                name: "dataPROJETS",
                type: "text",
                label: "dataPROJETS",
                defaultValue: ""
            });
        });

        return { store };
    }
};
</script>
