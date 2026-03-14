
import { Request, Response } from "express";
import { EmployeeService } from "./employee.service";

const createEmployee = async (req: Request, res: Response) => {
    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Employee photo is required",
            });
        }
        if (req.body.role) req.body.role = req.body.role.split(",");
        if (req.body.weekendDays) req.body.weekendDays = req.body.weekendDays.split(",");

        const result = await EmployeeService.createEmployee(
            req.body,
            req.file
        );

        res.status(201).json({
            success: true,
            message: "Employee created successfully",
            data: result,
        });

    } catch (error: any) {
        console.log("EMPLOYEE ERROR:", error?.response?.data || error.message);

        res.status(500).json({
            success: false,
            message: "Employee creation failed",
            error: error?.response?.data || error.message,
        });
    }
};

const getAllEmployees = async (req: Request, res: Response) => {
    try {
        const result = await EmployeeService.getAllEmployees();

        res.status(200).json({
            success: true,
            count: result.length,
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve employees",
            error: error.message,
        });
    }
}

const getEmployeeById = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const result = await EmployeeService.getAllEmployees();
    const employee = result.find((e) => e._id.toString() === id);

    if (!employee) {
        return res.status(404).json({
            success: false,
            message: "Employee not found",
        });
    }

    res.status(200).json({
        success: true,
        data: employee,
    });
};

const updateEmployee = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;

        if (req.body.role) req.body.role = req.body.role.split(",");
        if (req.body.weekendDays) req.body.weekendDays = req.body.weekendDays.split(",");

        const result = await EmployeeService.updateEmployee(
            id,
            req.body,
            req.file
        );

        res.status(200).json({
            success: true,
            message: "Employee updated successfully",
            data: result,
        });

    } catch (error: any) {
        console.log("EMPLOYEE UPDATE ERROR:", error?.response?.data || error.message);

        res.status(500).json({
            success: false,
            message: "Employee update failed",
            error: error?.response?.data || error.message,
        });
    }
};

const deleteEmployee = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;

        await EmployeeService.deleteEmployee(id);

        res.status(200).json({
            success: true,
            message: "Employee deleted successfully",
        });

    } catch (error: any) {
        console.log("EMPLOYEE DELETE ERROR:", error?.response?.data || error.message);

        res.status(500).json({
            success: false,
            message: "Employee deletion failed",
            error: error?.response?.data || error.message,
        });
    }
};

export const EmployeeController = {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
};