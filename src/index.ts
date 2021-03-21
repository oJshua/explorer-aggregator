import express from "express";
import { app } from "./app";

const port = process.env.PORT || 3000;

app.use("/swagger.json", express.static(__dirname + "/tsoa/swagger.json"));

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
