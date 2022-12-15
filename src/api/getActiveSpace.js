import { widget } from "@widget-lab/3ddashboard-utils";
import { _getPlatformServices } from "../plugins/3dexperience_api";
import { ENV_ID } from "../constant/constant";
import { usedStore } from "../store/index";

export default function getActiveSpace() {
    console.log("je suis dans getActiveSpace");
    const store = usedStore();

    _getPlatformServices(
        null,
        response => {
            let tenants = [];
            let tenantOptions = [];
            let selectedTenantValue;
            let activeSpace;

            // Load all the tenants
            for (let item of response) {
                if ("3DSpace" in item) {
                    tenantOptions.push({
                        label: `${item.displayName} ( ${item.platformId} )`,
                        value: `${tenantOptions.length}`
                    });
                    tenantOptions.sort();
                    tenants.push(item);
                }
            }

            for (let [index, tenant] of tenants.entries()) {
                if (tenant.platformId === ENV_ID) {
                    activeSpace = tenant;
                    selectedTenantValue = index;
                }
            }
            widget.addPreference({
                name: "_CurrentTenantID_",
                type: "list",
                label: "Tenant",
                defaultValue: selectedTenantValue,
                options: tenantOptions
            });
            store.updateActiveSpace(activeSpace);
            store.updateWidgetEvent("onGetActiveSpace");
        },
        error => {
            console.log(error);
        }
    );
}
