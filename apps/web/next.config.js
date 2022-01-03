const withTM = require("next-transpile-modules")(["crt-terminal"]);

module.exports = withTM({
  reactStrictMode: true,
});
