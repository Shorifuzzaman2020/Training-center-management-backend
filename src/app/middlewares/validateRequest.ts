import { NextFunction, Request, Response } from "express";
import { ZodSchema, ZodError } from "zod";

const validateRequest =
    (schema: ZodSchema<any>) =>
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                await schema.parseAsync({
                    body: req.body,
                    query: req.query,
                    params: req.params,
                });

                next();
            } catch (error) {
                if (error instanceof ZodError) {
                    return res.status(400).json({
                        success: false,
                        message: "Validation Error",
                        errors: error.issues.map((issue) => ({
                            field: issue.path.join("."),
                            message: issue.message,
                        })),
                    });
                }

                next(error);
            }
        };

export default validateRequest;