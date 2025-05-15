import {
  PaginatedResult,
  paginateResult,
} from '@src/logic/types/other/PaginatedResult';
import logger from '@src/logic/utils/logger';
import { Repository, ObjectLiteral, FindOptionsWhere } from 'typeorm';

type MapperFn<Entity, DTO> = (entity: Entity) => DTO;

export const getPaginatedResult = async <Entity extends ObjectLiteral, DTO>(
  pageIndex: number,
  pageSize: number,
  where: FindOptionsWhere<Entity>,
  relations: string[] | undefined,
  repository: Repository<Entity>,
  mapper: MapperFn<Entity, DTO>,
): Promise<PaginatedResult<DTO>> => {
  const [items, totalCount] = await repository.findAndCount({
    where,
    take: pageSize,
    skip: pageIndex * pageSize,
    relations,
  });

  logger.debug(JSON.stringify(items));

  const dtoItems = items.map(mapper);

  return paginateResult(dtoItems, pageIndex, pageSize, totalCount);
};
