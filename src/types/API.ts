export type API<T = {}> = {
  success: boolean;
  data: {
    message?: string;
  } & T;
};
