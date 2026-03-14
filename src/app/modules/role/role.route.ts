import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { RoleController } from "./role.controller";
import { RoleValidation } from "./role.validation";

const router = express.Router();

router.post(
    "/create-role",
    validateRequest(RoleValidation.createRoleValidationSchema),
    RoleController.createRole
);

router.get("/", RoleController.getRoles);
router.get("/:id", RoleController.getRoleById);
router.patch(
    "/:id",
    validateRequest(RoleValidation.updateRoleValidationSchema),
    RoleController.updateRole
);
//

router.delete("/:id", RoleController.removeRole);

export default router;