import { Session } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import Jwt from 'jsonwebtoken';
import { sessionAuthError } from '@/errors';
import { sessionData, sessionTokenData } from '@/protocols';
import { sessionRepository } from '@/repositories';

const SECRET_KEY = process.env.SECRET_KEY;
const TOKEN_MAX_AGE = parseInt(process.env.TOKEN_MAX_AGE);

function tokenConfig() {
  return {
    httpOnly: true,
    maxAge: TOKEN_MAX_AGE,
  };
}

function generateToken(data: sessionTokenData) {
  return Jwt.sign(data, SECRET_KEY);
}

function verifyToken(token: string) {
  return Jwt.verify(token, SECRET_KEY);
}

async function saveSession(session: sessionData): Promise<Session> {
  return await sessionRepository.createToken(session);
}

function validateAuthorization() {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { sessionToken } = req.cookies;

    if (!sessionToken) throw sessionAuthError();

    const verifiedToken = verifyToken(sessionToken);
    if (!verifiedToken) throw sessionAuthError();

    if (!(await sessionRepository.readUnique(sessionToken))) throw sessionAuthError();

    res.locals.token = verifiedToken;

    next();
  };
}

export const sessionMiddleware = { tokenConfig, generateToken, verifyToken, saveSession, validateAuthorization };
