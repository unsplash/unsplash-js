const context = require.context("../test", true, /-test\.js$/);
context.keys().forEach(context);
export default context;
