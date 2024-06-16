import { Session } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import Jwt from 'jsonwebtoken';
import { sessionAuthError } from '@/errors';
import { sessionData, sessionTokenData } from '@/protocols';
import { sessionRepository } from '@/repositories';

const SECRET_KEY = process.env.SECRET_KEY;

function generateToken(data: sessionTokenData) {
  return Jwt.sign(data, SECRET_KEY);
}

async function saveSession(session: sessionData): Promise<Session> {
  return await sessionRepository.createToken(session);
}

function validateAuthorization() {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { sessionToken } = req.cookies;

    if (!sessionToken) throw sessionAuthError();

    if (!Jwt.verify(sessionToken, SECRET_KEY)) throw sessionAuthError();

    if (!(await sessionRepository.readUnique(sessionToken))) throw sessionAuthError();

    next();
  };
}

export const sessionMiddleware = { generateToken, saveSession, validateAuthorization };
