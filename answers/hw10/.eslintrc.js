module.exports = {
    "extends": "airbnb-base",
    "plugins": [
        "import"
    ],
    "globals": {
      "window": true,
      "document": true
    },
    "rules": {
      "func-names": ["error", "never"],
      "no-multi-spaces": ["error", { "ignoreEOLComments": true }],
      "brace-style": ["error", "stroustrup"]
    }
};