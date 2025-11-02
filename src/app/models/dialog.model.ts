import { Type } from '@angular/core';

export interface AppDialog<T = any> {
  id: string;
  title: string;
  component: Type<T>;
  data?: Partial<T>;
  visible: boolean;
  minimized: boolean;
  modal?: boolean;
}
