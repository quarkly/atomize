export type Config = {
  name ?: string
  description ?: Descripton
  effects ?: Effects
  propInfo ?: PropInfo
  // TODO
  styles?: any
  overrides ?: any
}

interface Prop {
  description ?: Descripton;
}

interface SimpleProp extends Prop {
  control: 'select' | 'radio-group'
  variants: string[];
}

interface DifficultProp extends Prop {
  control: 'input'
}

export type PropInfo = {
  [key: string]: SimpleProp | DifficultProp
}

export type Control = 'input' | 'select' | 'color' | 'font' | 'shadow' | 'transition' | 'transform' | 'filter' | 'background' | 'checkbox-icon' | 'radio-icon' | 'radio-group' | 'checkbox'


export type Descripton = {
  [key: string]: Language
}

// TODO: Add more languages
export type Language = 'en' | 'de' | 'ru'

export type Effects = {
  [key: string]: string // any string, because you can do something like: ':hover > button > svg:first-child'
}

// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/34757#issuecomment-488848720
export interface CompoundedComponent extends React.ForwardRefExoticComponent<React.RefAttributes<HTMLInputElement>> {
  description?: Descripton
  effects?: Effects
  propInfo: PropInfo
  // TODO
  styles?: any
  overrides ?: any
}

export type Tags = keyof JSX.IntrinsicElements

export type AtomFunction = (tag: React.ComponentType<any>) => (config: Config, defaultProps?: any) => CompoundedComponent


export interface Atom extends AtomComponentFactories {
  (tag: React.ComponentType<any>): (config, defaultProps) => CompoundedComponent
}

type AtomComponentFactories = {
  [tag in Tags]: (config, defaultProps) => CompoundedComponent
}

export type AtomCreateFunction = (tag: Tags | React.ComponentType<any>, config?: Config, defaultProps?: any) => CompoundedComponent