import splitCSSRule from './split-css-rule';

describe('split css rule', () => {
  test('not valid', () => {
    const rules = ['linear-gradinet(90deg,', 'url(a'];
    rules.forEach(rule => expect(splitCSSRule(rule)).toEqual([rule]));
    expect(splitCSSRule(rules.join(','))).toEqual([rules.join(',')]);
  });

  test('background', () => {
    const rules = ['#fff', 'linear-gradinet(90deg,#fff,rgba(0,0,0,.2))', 'url(a.png)'];
    rules.forEach(rule => expect(splitCSSRule(rule)).toEqual([rule]));
    expect(splitCSSRule(rules.join(','))).toEqual(rules);
  });

  test('shadow', () => {
    const rules = ['inset 0 0 0 10px rgba(0,0,0,.2)', '10px 10px 20px #000'];
    rules.forEach(rule => expect(splitCSSRule(rule)).toEqual([rule]));
    expect(splitCSSRule(rules.join(','))).toEqual(rules);
  });

  test('transition', () => {
    const rules = ['color 1s', 'opacity 4s ease-in-out 1s', 'opacity 4s cubic-bezier(0,0,1,1) 1s'];
    rules.forEach(rule => expect(splitCSSRule(rule)).toEqual([rule]));
    expect(splitCSSRule(rules.join(','))).toEqual(rules);
  });

  test('transform', () => {
    // space separator
    const rules = ['rotate(90deg)', 'scale(2, 0.5)', 'matrix(1.0, 2.0, 3.0, 4.0, 5.0, 6.0)'];
    rules.forEach(rule => expect(splitCSSRule(rule, ' ')).toEqual([rule]));
    expect(splitCSSRule(rules.join(' '), ' ')).toEqual(rules);
  });

  test('animation', () => {
    const rules = [
      '3s ease-in 1s 2 reverse both paused slidein',
      '3s cubic-bezier(0,0,1,1) 1s slidein',
    ];
    rules.forEach(rule => expect(splitCSSRule(rule)).toEqual([rule]));
    expect(splitCSSRule(rules.join(','))).toEqual(rules);
  });
});
