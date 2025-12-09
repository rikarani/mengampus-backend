import "express-serve-static-core";

import { auth } from "./src/lib/auth";

declare module "express-serve-static-core" {
  interface Request {
    session?: typeof auth.$Infer.Session;
  }
}
