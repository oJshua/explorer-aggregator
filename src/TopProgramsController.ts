import { Controller, Get, Route } from "tsoa";
import { Program } from "./models/Program";

@Route("top-programs")
export class TopProgramsController extends Controller {
  @Get()
  public async all(): Promise<Program[]> {
    return [];
  }
}
