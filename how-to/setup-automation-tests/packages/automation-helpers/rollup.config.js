import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import packageDetails from "./package.json";

const plugins = [
    commonjs({
        ignoreDynamicRequires: true
    }),
    resolve({
        preferBuiltins: true,
        browser: process.env.BROWSER
    })
];

const globs = {};
for (const dep in packageDetails.dependencies) {
    globs[dep] = dep;
}

export default {
    input: `./es/index.js`,
    output: {
        file: `dist/cjs/index.js`,
        format: "cjs",
        name: packageDetails.name
            .split("-")
            .map(p => p[0].toUpperCase() + p.slice(1))
            .join(""),
        compact: false,
        sourcemap: "inline",
        exports: "auto",
        globals: globs
    },
    external: ["fs/promises"].concat(Object.keys(globs)),
    onwarn: message => {
        if (!["EMPTY_BUNDLE"].includes(message.code)) {
            console.error(message);
            process.exit(1);
        }
    },
    plugins
};
