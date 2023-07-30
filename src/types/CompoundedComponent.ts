import * as React from 'react';
import { StyledComponent, AnyStyledComponent } from 'styled-components';
import { AvailableProps, Aliases } from '../constants/dict';
import { Descripton, Effects, PropInfo } from './QuarklyWidget';
/*
// https://github.com/microsoft/TypeScript/issues/32447

type Breakpoints = 'md' | 'sm' | 'lg';

type WithBreakpoints<T extends object> = {
  [K in keyof T as `${Breakpoints}-${string & K}`]?: T[K];
};
*/

export type Config<UseAliases extends boolean> = {
  name?: string;
  description?: Descripton;
  effects?: Effects;
  propInfo?: PropInfo;
  useAliases?: UseAliases;
  forwardCssProperties?: boolean;
  // TODO
  styles?: any;
  overrides?: any;
};

type AtomizeProps<U extends boolean> = AvailableProps & (U extends true ? Aliases : {});

export type CompoundedComponent<
  T extends AnyStyledComponent | keyof JSX.IntrinsicElements | React.ComponentType<any>,
  P extends object,
  U extends boolean,
> = StyledComponent<T, any, P & { children?: React.ReactNode } & AtomizeProps<U>, never> &
  Config<U>;
