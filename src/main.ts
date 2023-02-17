import 'dotenv/config';

import express from 'express';

// Importing env vars
import { PORT } from '@shared/constants/env';

// Importing routes
import TestingRoute from '@services/testing/routes/testing.routes';

// Importing utils
import baseMiddleware from '@shared/middleware/basic-middleware';
import { shutdownServer } from '@shared/helpers/functions/shutdown-server.function';
import { Logger } from '@shared/helpers/classes/logger.class';
import ErrorHandler from '@shared/middleware/error-handler';

// Starting express app
const app = express();

app.use(baseMiddleware);

// Using routers
app.use('/', TestingRoute);

app.use(ErrorHandler);

//Puerto de escucha
app.set('PORT', PORT || 5001);

// conexion a base de datos
// comenzar servidor
Logger.info('Warming up API');

// Inicializacion de bot de telegram *
Logger.info(`** Server is listening on http://localhost:${app.get('PORT')} **`);
const server = app.listen(app.get('PORT'));

// This should not happen, but just in case
process.on('uncaughtException', (error: Error) =>
  shutdownServer('UNCAUGHT EXCEPTION! 💥 Shutting down...', server, error)
);

// Soft kill triggered by the OS
process.on('SIGTERM', () =>
  shutdownServer('👋 SIGTERM RECEIVED. Shutting down gracefully...', server)
);

// Usually triggered by control-c
process.on('SIGINT', () =>
  shutdownServer('👋 SIGINT RECEIVED. Shutting down gracefully...', server)
);
