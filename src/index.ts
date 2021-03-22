require("dotenv").config();

import express from "express";
import { app } from "./app";
import { TopPrograms } from "./aggregators/TopPrograms";
import { ConfirmedBlockSubscription } from "./subscriptions/ConfirmedBlockSubscription";

const port = process.env.PORT || 3000;

app.use("/swagger.json", express.static(__dirname + "/tsoa/swagger.json"));

(async () => {
  await TopPrograms.start();
  await ConfirmedBlockSubscription.start();

  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
})();
