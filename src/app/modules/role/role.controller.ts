import { Request, Response } from "express";
import { RoleService } from "./role.service";

const createRole = async (req: Request, res: Response) => {
    try {
        const result = await RoleService.createRoleIntoDB(req.body);

        res.status(201).json({
            success: true,
            message: "Role created successfully",
            data: result,
        });

    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const getRoles = async (req: Request, res: Response) => {
    const result = await RoleService.getAllRoles();

    res.status(200).json({
        success: true,
        data: result,
    });
};

const getRoleById = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const result = await RoleService.getAllRoles();
    const role = result.find((r) => r._id.toString() === id);

    if (!role) {
        return res.status(404).json({
            success: false,
            message: "Role not found",
        });
    }

    res.status(200).json({
        success: true,
        data: role,
    });
};

const updateRole = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const result = await RoleService.updateRole(
            id,
            req.body
        );

        res.status(200).json({
            success: true,
            message: "Role updated successfully",
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to update role",
            error: error.message,
        });
    }
};
const removeRole = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid role ID",
        });
    }

    await RoleService.deleteRole(id);

    res.status(200).json({
        success: true,
        message: "Role deleted",
    });
};

export const RoleController = {
    createRole,
    getRoles,
    getRoleById,
    updateRole,
    removeRole,
};