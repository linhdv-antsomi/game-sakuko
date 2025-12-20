type SD = "asc" | "desc";

export type Filter = {
  column: string;
  data_type: string;
  operator: string;
  value: unknown;
};

export interface GetListParams {
  signal?: AbortSignal;
  page?: number;
  limit?: number;
  sort?: string | string[];
  sd?: SD | SD[];
  from?: string;
  to?: string;
  filters?: {
    OR: {
      AND: Filter[];
    }[];
  };
}

export interface GetHLListParams {
  page?: number;
  limit?: number;
  from?: string;
  to?: string;
}

export interface GetListResponse<T> {
  code: number;
  message: string;
  data: {
    entries: T[];
    total: number;
  };
}

export interface CommonResponse<T> {
  code: number;
  message: string;
  data: T;
  errorCode?: number;
}
