window.Glaze = Ember.Application.create();

// Default load order. Override as you see fit.
require("store");
require("modules/*/model");
require("modules/*/controller");
require("modules/*/view");
require("helpers/*");
require("router");
require("modules/*/route");

// Create fixtures

