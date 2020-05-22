import { searchRuleInKey, searchBreakpointInKey, searchEffectInKey } from './search-rule';

describe('Chain styles', () => {
  test('searchRuleInKey', () => {
    expect(searchRuleInKey('hover-phone-bgc')).toStrictEqual('bgc');
    expect(searchRuleInKey('hover-tablet-bgc')).toStrictEqual('bgc');
    expect(searchRuleInKey('bgc')).toStrictEqual('bgc');
    expect(searchRuleInKey('hover-tablet-fake')).toStrictEqual(false);
  });
  test('searchBreakpointInKey', () => {
    const breakpoints = { phone: true, tablet: true };
    expect(searchBreakpointInKey('hover-phone', breakpoints)).toStrictEqual('phone');
    expect(searchBreakpointInKey('hover-tablet', breakpoints)).toStrictEqual('tablet');
  });
  test('searchEffectInKey', () => {
    const effects = { hover: true };
    expect(searchEffectInKey('hover', effects)).toStrictEqual('hover');
    expect(searchEffectInKey('fake', effects)).toStrictEqual(false);
  });
});
