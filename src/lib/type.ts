export interface FetchDataResponse<T> {
  data: T;
}

export interface FetchDataOptions {
  revalidate: boolean;
}
