process.env.NODE_ENV = "test";
const app = require("../app");
const seedDb = require("..seed/seed");
const data = require("..seed/testdata");
const { expect } = require("chai");
const request = require("supertest")(app);
const mongoose = require("mongoose");
