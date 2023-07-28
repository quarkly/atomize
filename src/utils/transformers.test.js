import bootstrap from '../atomic-styles/bootstrap';

describe('Test transformers', () => {
  describe('Space transformer', () => {
    test('number to pixel transform', () => {
      const rule = bootstrap({});
      expect(rule({ margin: 23 }).cssObject).toStrictEqual({ margin: '23px' });
      expect(rule({ margin: 33 }).cssObject).toStrictEqual({ margin: '33px' });
    });
    test('negative number to pixel transform', () => {
      const rule = bootstrap({});
      expect(rule({ margin: -23 }).cssObject).toStrictEqual({ margin: '-23px' });
      expect(rule({ margin: -33 }).cssObject).toStrictEqual({ margin: '-33px' });
    });
    test('no transform', () => {
      const rule = bootstrap({});
      expect(rule({ margin: '-2%' }).cssObject).toStrictEqual({ margin: '-2%' });
      expect(rule({ margin: 'inherit' }).cssObject).toStrictEqual({ margin: 'inherit' });
    });
    test('number scale %', () => {
      const rule = bootstrap({});
      expect(rule({ margin: 1 / 2 }).cssObject).toStrictEqual({ margin: '0.5px' });
    });
  });
  describe('Pixel transformer', () => {
    test('zero transform', () => {
      const rule = bootstrap({});
      expect(rule({ top: 0 }).cssObject).toStrictEqual({ top: 0 });
      expect(rule({ right: 0 }).cssObject).toStrictEqual({ right: 0 });
    });
  });
  describe('Width transformer', () => {
    test('zero transform', () => {
      const rule = bootstrap({});
      expect(rule({ width: 0 }).cssObject).toStrictEqual({ width: '0%' });
    });
    test('number scale %', () => {
      const rule = bootstrap({});
      expect(rule({ width: 1 }).cssObject).toStrictEqual({ width: '100%' });
      expect(rule({ width: 1 / 2 }).cssObject).toStrictEqual({ width: '50%' });
      expect(rule({ width: 1 / 5 }).cssObject).toStrictEqual({ width: '20%' });
    });
    test('number scale px', () => {
      const rule = bootstrap({});
      expect(rule({ width: 11 }).cssObject).toStrictEqual({ width: '11px' });
      expect(rule({ width: 111 }).cssObject).toStrictEqual({ width: '111px' });
    });
    test('number scale strict px', () => {
      const rule = bootstrap({});
      expect(rule({ width: '11px' }).cssObject).toStrictEqual({ width: '11px' });
      expect(rule({ width: '111px' }).cssObject).toStrictEqual({ width: '111px' });
    });
    test('number scale strict em/rem', () => {
      const rule = bootstrap({});
      expect(rule({ width: '11em' }).cssObject).toStrictEqual({ width: '11em' });
      expect(rule({ width: '111rem' }).cssObject).toStrictEqual({ width: '111rem' });
    });
  });
  describe('font-size transformer', () => {
    test('pixel number', () => {
      const rule = bootstrap({});
      expect(rule({ 'font-size': 14 }).cssObject).toStrictEqual({ 'font-size': '14px' });
      expect(rule({ 'font-size': 12 }).cssObject).toStrictEqual({ 'font-size': '12px' });
      expect(rule({ 'font-size': 16 }).cssObject).toStrictEqual({ 'font-size': '16px' });
    });
    test('pixel string', () => {
      const rule = bootstrap({});
      expect(rule({ 'font-size': '14px' }).cssObject).toStrictEqual({ 'font-size': '14px' });
      expect(rule({ 'font-size': '12px' }).cssObject).toStrictEqual({ 'font-size': '12px' });
      expect(rule({ 'font-size': '16px' }).cssObject).toStrictEqual({ 'font-size': '16px' });
    });
    test('em string', () => {
      const rule = bootstrap({});
      expect(rule({ 'font-size': '2em' }).cssObject).toStrictEqual({ 'font-size': '2em' });
      expect(rule({ 'font-size': '6em' }).cssObject).toStrictEqual({ 'font-size': '6em' });
      expect(rule({ 'font-size': '1em' }).cssObject).toStrictEqual({ 'font-size': '1em' });
    });
  });
});
