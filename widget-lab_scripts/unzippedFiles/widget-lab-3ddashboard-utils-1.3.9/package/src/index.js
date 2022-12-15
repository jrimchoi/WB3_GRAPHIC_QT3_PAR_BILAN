import requireJsContent from "!!raw-loader!requirejs/require";

const _isWidget = !!window.UWA;
/**
 * Mock the Widget Object normally provided by 3DDashboard
 */
const Widget = function () {
    const events = {};
    let title = "";
    const prefs = (() => {
        let prefsLocal = localStorage.getItem("_prefs_4_Widget_");
        if (prefsLocal) {
            try {
                prefsLocal = JSON.parse(prefsLocal);
            } catch (e) {
                prefsLocal = {};
                localStorage.setItem("_prefs_4_Widget_", JSON.stringify(prefsLocal));
            }
        } else {
            prefsLocal = {};
            localStorage.setItem("_prefs_4_Widget_", JSON.stringify(prefsLocal));
        }
        return prefsLocal;
    })();

    const _savePrefsLocalStorage = () => {
        localStorage.setItem("_prefs_4_Widget_", JSON.stringify(prefs));
    };

    this.uwaUrl = "./";

    this.id = "standalone";

    this.data = {};

    this.addEvent = (event, callback) => {
        events[event] = callback;
        if (event === "onLoad") {
            if (document.readyState === "loading") {
                window.addEventListener("DOMContentLoaded", callback);
            } else {
                callback();
            }
        }
    };

    this.addPreference = pref => {
        // console.log(`Preference added ${pref}`);
        pref.value = pref.defaultValue;
        prefs[pref.name] = pref;
        _savePrefsLocalStorage();
    };

    this.getPreference = prefName => {
        return prefs[prefName];
    };

    this.getValue = prefName => {
        return prefs[prefName] === undefined ? undefined : prefs[prefName].value;
    };

    this.setValue = (prefName, value) => {
        prefs[prefName].value = value;
        _savePrefsLocalStorage();
    };

    this.setTitle = t => {
        title = t;
        document.title = title;
    };

    this.setIcon = i => {
        let link = document.querySelector("link[rel~='icon']");
        if (!link) {
            link = document.createElement("link");
            link.rel = "icon";
            document.getElementsByTagName("head")[0].appendChild(link);
        }
        link.href = i;
    };

    this.dispatchEvent = () => {
        // console.debug(`Event received ${args}`);
    };
};

/**
 * Mock the UWA Object normally provided by 3DDashboard
 */
const UWA = function () {
    this.log = args => {
        /* eslint no-console:off */
        console.log(args);
    };
};

/**
 * Load requirejs lib
 */
const loadRequire = () => {
    const script = document.createElement("script"); // Make a script DOM node
    script.innerHTML = requireJsContent; // Set it's src to the provided URL
    document.head.appendChild(script);
};

/**
 * Mock the libraries provided by 3DDashboard
 */
const initRequireModules = () => {
    const define =
        window.define ||
        (() => {
            console.error("Requirejs not loaded.");
        });
    define("DS/TagNavigatorProxy/TagNavigatorProxy", [], () => {
        const TagNavigatorProxy = function () {
            this.createProxy = () => {
                return {
                    activate: () => {},
                    addEvent: () => {},
                    addSubjectsTags: () => {},
                    configurePredicates: () => {},
                    deactivate: () => {},
                    die: () => {},
                    focusOnSubjects: () => {},
                    getCurrentFilter: () => {
                        return {};
                    },
                    setPredicates: () => {},
                    setSubjectsTags: () => {},
                    setTags: () => {},
                    unfocus: () => {},
                    unsetTags: () => {}
                };
            };
        };
        return new TagNavigatorProxy();
    });
    define("DS/PlatformAPI/PlatformAPI", [], () => {
        const PlatformAPI = function () {
            this.getUser = () => {
                return {
                    address: "An address for test purpose",
                    city: "VelizyLand",
                    email: "rogrigo@hotmail.com",
                    enabled: true,
                    firstname: "Rodrigo",
                    id: 7,
                    language: "en",
                    lastName: "Sanchez",
                    login: "RG0",
                    superUser: false,
                    telephone: "",
                    type: 3,
                    properties: {}
                };
            };
            this.publish = () => {};
            this.subscribe = (topic, callback) => {
                return { topic, callback };
            };
        };
        return new PlatformAPI();
    });
};

/**
 * Initialize the widget object
 * In Standalone mode :
 *      - Create the widget object with some (to be completed) API
 *      - Create the UWA object with some (to be completed) API
 */
const init = () => {
    if (!_isWidget) {
        window.widget = new Widget();
        window.UWA = new UWA();
        loadRequire();
        initRequireModules();
    }
    window.widget.uwaPath = window.widget.uwaUrl.substring(0, window.widget.uwaUrl.lastIndexOf("/") + 1);
    __webpack_public_path__ = window.widget.uwaPath;
};

/**
 * Toolbox for 3DDashboard
 */
function Utils() {
    // List of path of the css files to deactivate with the following function
    const widgetDefaultStyleSheets = ["UWA/assets/css/iframe.css"];
    this.disableDefaultCSS = bDeactivate => {
        // Activate or deactivate widgets default css
        // To re-activate the Default CSS files pass a false boolean, if no parameters are passed it's considered as true
        let disableOptions = true;
        if (typeof bDeactivate === "boolean" && bDeactivate === false) {
            disableOptions = false;
        }
        const styleSheets = document.styleSheets;
        for (let i = 0; i < styleSheets.length; i++) {
            const sheet = styleSheets.item(i);
            for (const partialUrlToTest of widgetDefaultStyleSheets) {
                if (sheet.href && sheet.href.indexOf(partialUrlToTest) !== -1) {
                    sheet.disabled = disableOptions;
                }
            }
        }
    };

    this.isWidget = () => _isWidget;

    // Visibility Change Notification
    const visibility = {
        pageVisible: true, // top Page visible (browser)
        bodyVisible: true, // Body visible in page (iframe / scrolling)
        visible: true,
        callbacks: [],
        fireChange(changes) {
            Object.assign(this, changes);
            // Visible if : Page(tab) is displayed, and Body element is visible in Viewport
            const vis = this.pageVisible && this.bodyVisible;
            if (this.visible !== vis) {
                this.visible = vis;
                this.callbacks.forEach(cb => cb(this.visible));
            }
        },
        onChange(cb) {
            cb(this.visible);
            this.callbacks.push(cb);
        }
    };
    // visibilitychange : Works only for fullpage (browser tab)!
    document.addEventListener("visibilitychange", () => visibility.fireChange({ pageVisible: !document.hidden }));
    visibility.fireChange({ pageVisible: !document.hidden }); // Init Page visibility
    // IntersectionObserver : Works only in iframe !
    const observer = new window.IntersectionObserver(([elem]) => visibility.fireChange({ bodyVisible: elem.isIntersecting }), { threshold: 0.1 });
    observer.observe(document.querySelector("body"));

    this.onVisibilityChange = cb => visibility.onChange(cb);
}

init();
const { widget, requirejs } = window;
const { disableDefaultCSS, onVisibilityChange, isWidget } = new Utils();

export { widget, requirejs, UWA, disableDefaultCSS, onVisibilityChange, isWidget };
