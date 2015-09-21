var config = {};

config.server = {};
config.certificates = {};
config.api = {};
config.app = {};

config.server.url = 'SERVER_NAME';
config.server.port = 4242,

config.certificates.key = ".\\cert\\client_key.pem";
config.certificates.cert = ".\\cert\\client.pem";

config.api.startTaskPath = "/qrs/task/start/synchronous?name=";
config.api.xrfkey = "abcdefghijklmnop";

config.app.port = 8000;

module.exports = config;