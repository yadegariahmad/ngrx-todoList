import { Response } from '../models';

export function responseHandler(okStatusNumber: number, res: Response)
{
  if (res.status === okStatusNumber)
  {
    return res.content;
  } else
  {
    throw new Error(res.message);
  }
}
