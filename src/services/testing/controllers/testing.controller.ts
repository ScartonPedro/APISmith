//dependencias
import { RequestHandler } from 'express';

import catchAsync from '@shared/utils/catch-async';

export const apiStatus: RequestHandler = catchAsync(async (_, res) => {
  res.status(200).json({ ok: true });
});
