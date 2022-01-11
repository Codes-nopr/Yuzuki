// eslint-disable-next-line no-console
module.exports = (client, node, error) => console.log(`Node ${node.options.identifier} encountered an error: ${error.message}.`);
