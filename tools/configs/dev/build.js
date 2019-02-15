import path from "path";

const projectRoot = path.resolve(path.join(__dirname, "..", "..", ".."));
export default {
    dllLib: Object.keys(
        require(path.join(projectRoot, "package.json")).dependencies
    ),
    source: {
        entry: path.join(projectRoot, "client", "public", "index.html"),
        root: path.join(projectRoot, "client"),
        public: path.join(projectRoot, "client", "public")
    },
    build: {
        public: path.join(projectRoot, "tmp"),
        entry: path.join(projectRoot, "tmp", "index.html"),
        asset: path.join(projectRoot, "tmp", "map.json"),
        style: path.join(projectRoot, "tmp", "main.css"),
        dll: path.join(projectRoot, "tmp", "dll"),
        manifest: path.join(projectRoot, "tmp", "dll", "manifest.json"),
        pathPrefix: "/static/",
        dest: {
            root: path.join(projectRoot, "tmp", "static"),
            image: path.join(projectRoot, "tmp", "static", "img"),
            font: path.join(projectRoot, "tmp", "static", "font")
        }
    }
};
