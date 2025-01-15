import { authUser } from "./auth";
import { addressSchema, validate } from "./validate";

export async function combined_address(req: any, res: any, next: any) {
  authUser(req, res, next);
  validate(addressSchema);
  next();
}
