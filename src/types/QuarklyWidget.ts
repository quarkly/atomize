export interface Prop {
  description?: Descripton;
}

export interface SimpleProp extends Prop {
  control: 'select' | 'radio-group';
  variants: string[];
}

export interface DifficultProp extends Prop {
  control: 'input';
}

export type PropInfo = {
  [key: string]: SimpleProp | DifficultProp;
};

export type Control =
  | 'input'
  | 'select'
  | 'color'
  | 'font'
  | 'shadow'
  | 'transition'
  | 'transform'
  | 'filter'
  | 'background'
  | 'checkbox-icon'
  | 'radio-icon'
  | 'radio-group'
  | 'checkbox';

export type Descripton = {
  [key: string]: Language;
};

// TODO: Add more languages
export type Language = 'en' | 'de' | 'ru';

export type Effects = {
  [key: string]: string; // any string, because you can do something like: ':hover > button > svg:first-child'
};
