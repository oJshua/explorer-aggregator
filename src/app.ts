import express from "express";
import { RegisterRoutes } from "./tsoa/routes";

export const app = express();

RegisterRoutes(app);
