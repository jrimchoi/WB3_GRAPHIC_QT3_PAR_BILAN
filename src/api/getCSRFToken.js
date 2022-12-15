import { _httpCallAuthenticated } from "../plugins/3dexperience_api";
import { usedStore } from "../store/index";

export default function getCSRFToken(url, resolve, error) {
    const store = usedStore();

    _httpCallAuthenticated(url + "/resources/v1/application/CSRF", {
        onComplete(response) {
            response = JSON.parse(response);
            store.updateCsrf(response.csrf);
            store.updateWidgetEvent("onGetCSRFToken");
        },
        onFailure(error) {
            console.log("bad getCSRFToken", error);
        }
    });
}
