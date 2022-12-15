/* eslint-disable no-magic-numbers */
module.exports = {
    extends: ["plugin:vue/recommended", "./widget"],
    rules: {
        "vue/html-indent": [
            "warn",
            4,
            {
                attribute: 1,
                baseIndent: 1,
                closeBracket: 0,
                alignAttributesVertically: true,
                ignores: []
            }
        ],
        "vue/max-attributes-per-line": [
            "warn",
            {
                singleline: {
                    max: 10
                },
                multiline: {
                    max: 1
                }
            }
        ],
        "vue/html-self-closing": [
            "warn",
            {
                html: {
                    void: "always",
                    normal: "never",
                    component: "always"
                },
                svg: "never",
                math: "never"
            }
        ],
        "vue/singleline-html-element-content-newline": "off",
        "vue/script-indent": "off",
        "vue/require-default-prop": "off",
        "vue/component-tags-order": [
            "error",
            {
                order: ["i18n", "template", "style", "script"]
            }
        ],
        "vue/v-slot-style": [
            1,
            {
                atComponent: "shorthand",
                default: "shorthand",
                named: "shorthand"
            }
        ],
        "vue/valid-v-slot": "off",
        "vue/no-lone-template": "off"
    }
};
