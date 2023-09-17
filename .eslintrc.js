module.exports = {
    "env": {
        "es2021": true,
        "node": true
    },
    "extends": "standard-with-typescript",
    "overrides": [
        {
            files: ["*.spec.ts"],
            plugins: ["jest"],
            extends: ["plugin:jest/recommended"],
            rules: {
                "jest/prefer-expect-assertions": "off",
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
    }
}
