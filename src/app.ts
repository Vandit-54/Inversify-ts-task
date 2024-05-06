import 'reflect-metadata';
import  express  from 'express';
import { InversifyExpressServer, cookies } from 'inversify-express-utils';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import session from 'express-session';

