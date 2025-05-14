import { PaginatedResult, paginateResult } from "@src/logic/types/other/PaginatedResult";
import { Repository } from "typeorm";

export const getPaginatedResult = async (
  pageIndex: number,
  pageSize: number,
  where: any,
  relations: any,
  repository: Repository<any>,
): Promise<PaginatedResult<any>> => {
  
  const [meals, totalCount] = await repository
    .findAndCount({
      where,
      take: pageSize,
      skip: pageIndex * pageSize,
      relations
    });

    return paginateResult(meals, pageIndex, pageSize, totalCount);
};