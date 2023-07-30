/* eslint-disable @typescript-eslint/ban-types */
import { StyledInterface, AnyStyledComponent } from 'styled-components';
import { CompoundedComponent, Config } from './CompoundedComponent';

export type Tags = keyof StyledInterface;

export type AtomComponentFactories = {
  [tag in keyof JSX.IntrinsicElements]: <P extends object, U extends boolean = true>(
    config?: Config<U>,
    defaultProps?: any,
  ) => CompoundedComponent<keyof JSX.IntrinsicElements, P, U>;
};

export interface Atom extends AtomComponentFactories {
  <C extends AnyStyledComponent | (keyof JSX.IntrinsicElements | React.ComponentType<any>)>(
    tag: C,
  ): <P extends object, U extends boolean = true>(
    config: Config<U>,
    defaultProps: any,
  ) => CompoundedComponent<typeof tag, P, U>;
}
