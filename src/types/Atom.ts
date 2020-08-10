import { StyledInterface, AnyStyledComponent } from 'styled-components';
import { CompoundedComponent } from './CompoundedComponent';
import { Effects, Descripton, PropInfo } from './QuarklyWidget';

export type Tags = keyof JSX.IntrinsicElements;

export type MakeCompoundedComponent<
  C extends keyof JSX.IntrinsicElements | React.ComponentType<any>
> = (config?: Config, defaultProps?: any) => CompoundedComponent<C>;

export type AtomComponentFactories = {
  [tag in Tags]: MakeCompoundedComponent<tag>;
};

export type AtomFunction = (
  component: React.ComponentType<any>,
) => MakeCompoundedComponent<typeof component>;

export interface Atom extends AtomComponentFactories {
  (tag: React.ComponentType<any>): MakeCompoundedComponent<typeof tag>;
}

export type MakeAtomFunction = (
  tag: Tags | React.ComponentType<any>,
  config?: Config,
  defaultProps?: any,
) => CompoundedComponent<typeof tag>;

export type MakeComponentFunction = (
  styled: StyledInterface,
  tag: AnyStyledComponent,
  styles: any,
  config: Config,
  other: any,
) => CompoundedComponent<typeof tag>;

export type Config = {
  name?: string;
  description?: Descripton;
  effects?: Effects;
  propInfo?: PropInfo;
  useAliases?: boolean;
  // TODO
  styles?: any;
  overrides?: any;
};
