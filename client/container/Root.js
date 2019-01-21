let exported;

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
    exported = require("./Root.prod").default;
} else {
    exported = require("./Root.dev").default;
}

export default exported;
