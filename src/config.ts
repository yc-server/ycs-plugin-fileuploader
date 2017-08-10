import { IErrors } from './errors';

export interface IConfigItem {
  name: string;
  tags: string[];
  endpoint: string;
  path: string;
  authRole: string;
  allowTypes: string[];
  min: number;
  max: number;
  errors: IErrors;
  url: (x: any) => string;
}

export type IConfig = IConfigItem[];
