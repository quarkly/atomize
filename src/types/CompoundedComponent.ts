/* eslint-disable @typescript-eslint/ban-types */
import * as React from 'react';
import { StyledInterface, StyledComponent, AnyStyledComponent } from 'styled-components';
import { AvailableProps, Aliases } from './AvailableProps';
import { Descripton, Effects, PropInfo } from './QuarklyWidget';

type AtomizeProps<U extends boolean> = AvailableProps & (U extends true ? Aliases : {});

export type CompoundedComponent<
  T extends AnyStyledComponent | (keyof JSX.IntrinsicElements | React.ComponentType<any>),
  P extends object,
  U extends boolean
> = StyledComponent<T, any, P & { children?: React.ReactNode } & AtomizeProps<U>, never> & {
  description?: Descripton;
  effects?: Effects;
  propInfo?: PropInfo;
  // TODO
  styles?: any;
  overrides?: any;
};

/*

// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/34757#issuecomment-488848720
export interface CompoundedComponent<C extends keyof StyledInterface, T extends boolean>
  extends React.ForwardRefExoticComponent<
    T extends true ? CompoundedComponentPropsWithAliases<C> : CompoundedComponentProps<C>
  > {
  description?: Descripton;
  effects?: Effects;
  propInfo?: PropInfo;
  // TODO
  styles?: any;
  overrides?: any;
}

export type CompoundedComponentProps<C extends keyof StyledInterface> = Partial<
  React.ComponentPropsWithRef<C>
> &
  WithChildrenIfReactComponentClass<C> &
  AvailableProps;

export type CompoundedComponentPropsWithAliases<
  C extends keyof StyledInterface
> = CompoundedComponentProps<C> & Aliases;

type WithChildrenIfReactComponentClass<
  C extends keyof StyledInterface
> = C extends React.ComponentClass<any> ? { children?: React.ReactNode } : Record<string, unknown>;

*/
