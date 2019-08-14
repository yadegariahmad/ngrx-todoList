import { Response } from '../models';

export function responseHandler(okStatusNumber: number, res: Response)
{
  if (res.status === okStatusNumber)
  {
    return true;
  } else
  {
    throw new Error(res.message);
  }
}
