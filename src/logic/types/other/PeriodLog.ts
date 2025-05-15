import { Macros } from '../core/Macros';
import { LogResponse } from '../response/LogResponse';

export interface PeriodLog {
  logs: LogResponse[];
  macros: Macros;
  periodFrom: Date;
  periodUntil: Date;
}
