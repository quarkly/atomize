import bootstrap from '../atomic-styles/bootstrap';

describe('Test transformers', () => {
  describe('Space transformer', () => {
    test('number to pixel transform', () => {
      const rule = bootstrap({});
      expect(rule({ margin: 23 })).toStrictEqual({ margin: '23px' });
      expect(rule({ margin: 33 })).toStrictEqual({ margin: '33px' });
    });
    test('negative number to pixel transform', () => {
      const rule = bootstrap({});
      expect(rule({ margin: -23 })).toStrictEqual({ margin: '-23px' });
      expect(rule({ margin: -33 })).toStrictEqual({ margin: '-33px' });
    });
    test('no transform', () => {
      const rule = bootstrap({});
      expect(rule({ margin: '-2%' })).toStrictEqual({ margin: '-2%' });
      expect(rule({ margin: 'inherit' })).toStrictEqual({ margin: 'inherit' });
    });
    test('number scale %', () => {
      const rule = bootstrap({});
      expect(rule({ margin: 1 / 2 })).toStrictEqual({ margin: '0.5px' });
    });
  });
  describe('Pixel transformer', () => {
    test('zero transform', () => {
      const rule = bootstrap({});
      expect(rule({ top: 0 })).toStrictEqual({ top: 0 });
      expect(rule({ right: 0 })).toStrictEqual({ right: 0 });
    });
  });
  describe('Width transformer', () => {
    test('zero transform', () => {
      const rule = bootstrap({});
      expect(rule({ width: 0 })).toStrictEqual({ width: '0%' });
    });
    test('number scale %', () => {
      const rule = bootstrap({});
      expect(rule({ width: 1 })).toStrictEqual({ width: '100%' });
      expect(rule({ width: 1 / 2 })).toStrictEqual({ width: '50%' });
      expect(rule({ width: 1 / 5 })).toStrictEqual({ width: '20%' });
    });
    test('number scale px', () => {
      const rule = bootstrap({});
      expect(rule({ width: 11 })).toStrictEqual({ width: '11px' });
      expect(rule({ width: 111 })).toStrictEqual({ width: '111px' });
    });
    test('number scale strict px', () => {
      const rule = bootstrap({});
      expect(rule({ width: '11px' })).toStrictEqual({ width: '11px' });
      expect(rule({ width: '111px' })).toStrictEqual({ width: '111px' });
    });
    test('number scale strict em/rem', () => {
      const rule = bootstrap({});
      expect(rule({ width: '11em' })).toStrictEqual({ width: '11em' });
      expect(rule({ width: '111rem' })).toStrictEqual({ width: '111rem' });
    });
  });
  describe('font-size transformer', () => {
    test('pixel number', () => {
      const rule = bootstrap({});
      expect(rule({ 'font-size': 14 })).toStrictEqual({ 'font-size': '14px' });
      expect(rule({ 'font-size': 12 })).toStrictEqual({ 'font-size': '12px' });
      expect(rule({ 'font-size': 16 })).toStrictEqual({ 'font-size': '16px' });
    });
    test('pixel string', () => {
      const rule = bootstrap({});
      expect(rule({ 'font-size': '14px' })).toStrictEqual({ 'font-size': '14px' });
      expect(rule({ 'font-size': '12px' })).toStrictEqual({ 'font-size': '12px' });
      expect(rule({ 'font-size': '16px' })).toStrictEqual({ 'font-size': '16px' });
    });
    test('em string', () => {
      const rule = bootstrap({});
      expect(rule({ 'font-size': '2em' })).toStrictEqual({ 'font-size': '2em' });
      expect(rule({ 'font-size': '6em' })).toStrictEqual({ 'font-size': '6em' });
      expect(rule({ 'font-size': '1em' })).toStrictEqual({ 'font-size': '1em' });
    });
  });
});
