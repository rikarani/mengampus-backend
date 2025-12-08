type BaseResponse = {
  message: string;
};

type Failed = BaseResponse & {
  success: false;
  errorCode?: string;
  errors?: Record<string, string[]>;
};

type Success<T> = BaseResponse & {
  success: true;
  data: T;
};

export type API<T = null> = Success<T> | Failed;
