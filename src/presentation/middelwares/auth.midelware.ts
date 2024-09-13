import { Request, Response, NextFunction } from "express";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";

export class AuthMiddelware {
  static validateJWT = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const authorization = req.header("Authorization");
    if (!authorization) return res.status(401).json({ error: "No Token" });
    if (!authorization.startsWith("Bearer "))
      return res.status(401).json({ error: "Invalid Bearer" });

    const token = authorization.split(" ").at(1) || "";

    try {
      //Todo:
      const payload = await JwtAdapter.validateToken<{ id: string }>(token);
      if (!payload) {
        return res.status(401).json({ error: "Invalid Token" });
      }

      //Todo: Implementar Datasource
      const user = await UserModel.findById(payload.id);
      if (!user) {
        return res
          .status(401)
          .json({ error: "Invalid Token - User Not Found" });
      }

      req.body.user = user;

      next();
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}
