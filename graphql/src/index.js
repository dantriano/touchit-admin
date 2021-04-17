import cors from "cors";
import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { ApolloServer, AuthenticationError } from "apollo-server-express";
import * as utils from "./resolvers/utils";

import schemas from "./schemas";
import resolvers from "./resolvers";
import models from "./models";

const app = express();
app.use(cors());

const verifyToken = async (req) => {
  if (!req.headers.authorization)
    throw new AuthenticationError("No estas autorizado");
  const token = req.headers.authorization;
  try {
    return await jwt.verify(token,"asd");
    return await jwt.verify(token,utils.jwtSeed);
  } catch (err) {
    console.log(err);
  }
};
const isAdmin = async (req) => {
  const company = req.headers.CurrentCompany || "";
  if (company)
    return await models.companyModel.find({ _id: utils.objectId(company) });
};

const server = new ApolloServer({
  typeDefs: schemas,
  resolvers,
  context: async ({ req }) => {
    if (req) {
      const isLocal = ["same-origin" /*, "same-site"*/].includes(
        req.headers["sec-fetch-site"]
      );
      const me =
        isLocal ||
        req.body.operationName == "login" ||
        (await verifyToken(req));
      console.log(me);
      //me.company = await isAdmin(req)
      return {
        me,
        models: models,
      };
    }
  },
});

server.applyMiddleware({ app, path: "/graphql" });
server.applyMiddleware({ app, path: "/api" });

app.listen(5000, () => {
  mongoose.connect(
    "mongodb://devroot:devroot@mongo:27017/touch_it?authSource=admin",
    { useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true }
  );
});
