<template>
    <v-navigation-drawer id="sidebar__content" permanent fixed expand-on-hover app>
        <v-list-item class="px-2">
            <v-img :src="URL_LOGO" max-width="95%" />
        </v-list-item>
        <v-list>
            <v-list-item v-for="([icon, text], i) in items" :key="i" link @click="next">
                <v-list-item-icon>
                    <v-icon color="teal lighten-4">
                        {{ icon }}
                    </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>{{ text }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
    name: "SideBar",
    data() {
        return {
            WIDGET_ROOT: "https://widget.beamcube.bzh/WB3_Template/",
            URL_LOGO: "https://widget.beamcube.bzh/WB3_Template/assets/PROJETBOIS_MJ.png",
            items: [
                ["mdi-chart-bar-stacked", "title - 1"],
                ["mdi-account-supervisor-circle", "title - 2"],
                ["mdi-clock-start", "title - 3"]
            ]
        };
    },
    methods: {
        next() {
            alert("You clicked on the menu ! ");
        }
    }
};
</script>