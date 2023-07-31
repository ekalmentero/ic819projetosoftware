import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

export const BaseDatabase = new PrismaClient();