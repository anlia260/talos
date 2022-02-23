import path from "path";
const projectRoot = path.resolve(path.join(__dirname, "..", "..", ".."));
export default {
    dllLib: ["react", "react-dom", "babel-polyfill"],
    source: {
        root: path.join(projectRoot, "client"),
        public: path.join(projectRoot, "client", "public"),
        entry: path.join(projectRoot, "client", "public", "index.html"),
    },
    build: {
        pathPrefix: "./static/",
        index: path.join(projectRoot, "build"),
        public: path.join(projectRoot, "build"),
        dll: path.join(projectRoot, "build", "dll"),
        sourcemap: path.join(projectRoot, "build", "sourcemap"),
        static: path.join(projectRoot, "build", "static"),
        entry: path.join(projectRoot, "build", "index.html"),
        asset: path.join(projectRoot, "build", "map.json"),
        manifest: path.join(projectRoot, "build", "dll", "manifest.json"),
    },
};
