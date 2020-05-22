export default {
  defaultWidth: 1280,
  breakpoints: {
    sm: [{ type: 'max-width', value: 576 }],
    md: [{ type: 'max-width', value: 768 }],
    lg: [{ type: 'max-width', value: 992 }],
  },
  color: {
    dark: '#04080C',
    darkL1: '#0E1317',
    darkL2: '#191E22',
    grey: '#6F839F',
    greyD1: '#637897',
    greyD2: '#586D8E',
    light: '#F7FBFF',
    lightD1: '#EDF2F6',
    lightD2: '#E4E8EC',
    green: '#00875A',
    primary: '#0077CC',
    secondary: '#FFC400',
    orange: '#FF7C22',
    red: '#DE350B',
    purple: '#FD6DF9',
    indigo: '#9B6CFC',
  },
  fontFamily: {
    sans:
      "-apple-system, system-ui, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    sansHeavy:
      "Impact, Haettenschweiler, 'Franklin Gothic Bold', Charcoal, 'Helvetica Inserat', 'Bitstream Vera Sans Bold', 'Arial Black', sans-serif",
    sansHelvetica:
      "Frutiger, 'Frutiger Linotype', Univers, Calibri, 'Gill Sans', 'Gill Sans MT', 'Myriad Pro', Myriad, 'DejaVu Sans Condensed', 'Liberation Sans', 'Nimbus Sans L', Tahoma, Geneva, 'Helvetica Neue', Helvetica, Arial, sans-serif",
    sansVerdana:
      "Corbel, 'Lucida Grande', 'Lucida Sans Unicode', 'DejaVu Sans', 'Bitstream Vera Sans', 'Liberation Sans', Verdana, 'Verdana Ref', sans-serif",
    sansTrebuchet:
      "'Segoe UI', Candara, 'Bitstream Vera Sans', 'DejaVu Sans', 'Trebuchet MS', Verdana, 'Verdana Ref', sans-serif",
    mono:
      "Consolas, 'Andale Mono WT', 'Andale Mono', 'Lucida Console', 'Lucida Sans Typewriter', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', 'Liberation Mono', 'Nimbus Mono L', Monaco, 'Courier New', Courier, monospace",
    serifTimes:
      "Cambria, 'Hoefler Text', Utopia, 'Liberation Serif', 'Nimbus Roman No9 L Regular', Times, 'Times New Roman', serif",
    serifGeorgia:
      "Constantia, 'Lucida Bright', Lucidabright, 'Lucida Serif', Lucida, 'DejaVu Serif', 'Bitstream Vera Serif', 'Liberation Serif', Georgia, serif",
    serifGaramond:
      "'Palatino Linotype', Palatino, Palladio, 'URW Palladio L', 'Book Antiqua', Baskerville, 'Bookman Old Style', 'Bitstream Charter', 'Nimbus Roman No9 L', Garamond, 'Apple Garamond', 'ITC Garamond Narrow', 'New Century Schoolbook', 'Century Schoolbook', 'Century Schoolbook L', Georgia, serif",
  },
  font: {
    headline1: 'normal 900 72px/1.2 --fontFamily-sans',
    headline2: 'normal 900 42px/1.2 --fontFamily-sans',
    headline3: 'normal 500 28px/1.2 --fontFamily-sans',
    base: 'normal 300 16px/1.5 --fontFamily-sans',
    lead: 'normal 300 20px/1.5 --fontFamily-sans',
  },
  boxShadow: {
    m: '0 4px 5px -1px rgba(0, 0, 0, 0.1)',
    l: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    xxl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  },
  background: {
    primaryGradient: 'linear-gradient(180deg, --color-primary, transparent) no-repeat 0 0',
    secondaryGradient: 'linear-gradient(180deg, --color-secondary, transparent) no-repeat 0 0',
  },
  transform: {
    rotate90: 'rotate(90deg)',
    rotate180: 'rotate(180deg)',
    flipX: 'scaleX(-1)',
    flipY: 'scaleY(-1)',
  },
  transition: {
    opacityOut: 'opacity --transitionDuration-normal --transitionTimingFunction-easeOut',
    transformOut: 'transform --transitionDuration-normal --transitionTimingFunction-easeOut',
    transformInOut: 'transform --transitionDuration-normal --transitionTimingFunction-easeInOut',
  },
  transitionTimingFunction: {
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  },
  transitionDuration: {
    fastest: '0.1s',
    fast: '0.2s',
    normal: '0.3s',
  },
  filter: {
    grayscale: 'grayscale(100%)',
    invert: 'invert(100%)',
    blur: 'blur(10px)',
  },
  animation: {},
  keyframes: {
    fadeIn: [
      { key: 'from', props: [{ opacity: 0 }] },
      { key: 'to', props: [{ opacity: 1 }] },
    ],
    fadeOut: [
      { key: 'from', props: [{ opacity: 1 }] },
      { key: 'to', props: [{ opacity: 0 }] },
    ],
  },
  components: {
    section: {
      maxWidth: { default: '1280px' },
      minWidth: { default: '300px' },
      width: { default: '90%' },
    },
    stack: {
      gap: {
        default: '32px',
        small: '16px',
      },
    },
  },
};
