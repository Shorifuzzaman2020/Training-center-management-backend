import { Role } from "./role.model";

const createRoleIntoDB = async (payload: any) => {

    // check duplicate
    const existing = await Role.findOne({ name: payload.name });
    if (existing) {
        throw new Error("Role already exists");
    }

    const result = await Role.create(payload);
    return result;
};

const getAllRoles = async () => {
    return await Role.find().sort({ createdAt: -1 });
};

const deleteRole = async (id: string) => {
    return await Role.findByIdAndDelete(id);
};

const getRoleById = async (id: string) => {
    const role = await Role.findById(id);

    if (!role) {
        throw new Error("Role not found");
    }

    return role;
};

const updateRole = async (id: string, payload: any) => {
    const updatedRole = await Role.findByIdAndUpdate(id, payload, {
        new: true,
    });

    if (!updatedRole) {
        throw new Error("Role not found");
    }

    return updatedRole;
};

export const RoleService = {
    createRoleIntoDB,
    getAllRoles,
    deleteRole,
    getRoleById,
    updateRole,
};