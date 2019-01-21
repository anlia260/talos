import path from "path";
const projectRoot = path.resolve(path.join(__dirname, "..", "..", ".."));
export default {
    dllLib: ["react", "react-dom", "babel-polyfill", "echarts-for-react"],
    source: {
        root: path.join(projectRoot, "client"),
        api: path.join(projectRoot, "client", "constant", "dev_api.js"),
        debug: path.join(projectRoot, "tools", "debug"),
        public: path.join(projectRoot, "client", "public"),
        entry: path.join(projectRoot, "client", "public", "index.html")
    },
    build: {
        pathPrefix: "/front/static/",
        index: path.join(projectRoot, "build"),
        public: path.join(projectRoot, "build", "public"),
        dll: path.join(projectRoot, "build", "dll"),
        sourcemap: path.join(projectRoot, "build", "sourcemap", "youtop-dsp"),
        static: path.join(projectRoot, "build", "public", "static"),
        entry: path.join(projectRoot, "build", "public", "index.html"),
        asset: path.join(projectRoot, "build", "public", "map.json"),
        manifest: path.join(projectRoot, "build", "dll", "manifest.json")
    }
};
