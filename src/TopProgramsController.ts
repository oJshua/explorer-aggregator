import { Controller, Get, Route } from "tsoa";
import { TopPrograms } from "./aggregators/TopPrograms";
import { Program } from "./models/Program";

@Route("top-programs")
export class TopProgramsController extends Controller {
  @Get()
  public async all(): Promise<Program[]> {
    return await TopPrograms.getPrograms();
  }
}
