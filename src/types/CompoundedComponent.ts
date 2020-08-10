import * as React from 'react';
import { AvailableProps, Aliases } from './AvailableProps';

import { Descripton, Effects, PropInfo } from './QuarklyWidget';

// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/34757#issuecomment-488848720
export interface CompoundedComponent<
  C extends keyof JSX.IntrinsicElements | React.ComponentType<any>
> extends React.ForwardRefExoticComponent<CompoundedComponentProps<C>> {
  description?: Descripton;
  effects?: Effects;
  propInfo?: PropInfo;
  // TODO
  styles?: any;
  overrides?: any;
}

export type CompoundedComponentProps<
  C extends keyof JSX.IntrinsicElements | React.ComponentType<any>
> = Partial<React.ComponentPropsWithRef<C>> &
  WithChildrenIfReactComponentClass<C> &
  AvailableProps &
  Aliases;

type WithChildrenIfReactComponentClass<
  C extends keyof JSX.IntrinsicElements | React.ComponentType<any>
> = C extends React.ComponentClass<any> ? { children?: React.ReactNode } : Record<string, unknown>;
