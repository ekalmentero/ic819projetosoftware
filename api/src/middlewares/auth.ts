import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export async function authenticate(req: Request, res: Response, next: any) {
  const { authorization } = req.headers;

  if (!req.headers || !authorization) {
    
    return res.status(401).json({ data: null, error: "Credenciais inválidas." });
  }
  
  const [, token] = authorization.split(" ");
  
  if (!token) {
    return res.status(401).json({ data: null, error: "Credenciais inválidas." });
  }

  try {
    const data = jwt.verify(token, process.env.TOKEN_SECRET ?? "foo");
    const {id, email, name, admin } = data as any;
    req.user = { id, email, name, admin };
    return next();
    
  } catch (error) {
    console.log(error);
    return res.status(401).json({ data: null, error: "Credenciais inválidas." });
  }
}
