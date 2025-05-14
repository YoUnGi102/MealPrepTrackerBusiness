export interface PaginatedResult<T> {
  data: T[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
}

export function paginateResult<T>(
  data: T[],
  pageIndex: number,
  pageSize: number,
  totalCount: number,
): PaginatedResult<T> {
  return {
    data,
    pageIndex,
    pageSize,
    totalCount,
  };
}
