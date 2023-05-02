export type IResponse = {
  status: string;
  message: string;
  data: {} | [];
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}
