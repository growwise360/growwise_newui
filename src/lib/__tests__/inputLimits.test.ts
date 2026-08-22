import { isAcceptableLeadEmail, isValidEmailShape } from '../inputLimits';

describe('email validation', () => {
  it('accepts normal parent email addresses', () => {
    expect(isAcceptableLeadEmail('parent.name+math@gmail.com')).toBe(true);
    expect(isAcceptableLeadEmail('family@subdomain.school.org')).toBe(true);
  });

  it('rejects malformed addresses', () => {
    expect(isValidEmailShape('.parent@example.edu')).toBe(false);
    expect(isValidEmailShape('parent..name@example.edu')).toBe(false);
    expect(isValidEmailShape('parent@-example.edu')).toBe(false);
    expect(isValidEmailShape('parent@example..edu')).toBe(false);
  });

  it('rejects obvious fake and disposable lead addresses', () => {
    expect(isAcceptableLeadEmail('parent@mailinator.com')).toBe(false);
    expect(isAcceptableLeadEmail('test@gmail.com')).toBe(false);
    expect(isAcceptableLeadEmail('fake123@yahoo.com')).toBe(false);
  });

  it('rejects common domain misspellings', () => {
    expect(isAcceptableLeadEmail('parent@gmial.com')).toBe(false);
    expect(isAcceptableLeadEmail('parent@gmail.con')).toBe(false);
    expect(isAcceptableLeadEmail('family@outlok.com')).toBe(false);
    expect(isAcceptableLeadEmail('family@yahooo.com')).toBe(false);
  });

  it('rejects strongly random or placeholder-like registrations', () => {
    expect(isAcceptableLeadEmail('123448294@gmail.com')).toBe(false);
    expect(isAcceptableLeadEmail('12345@yahoo.com')).toBe(false);
    expect(isAcceptableLeadEmail('a1b2c3d4e5f6@gmail.com')).toBe(false);
    expect(isAcceptableLeadEmail('xkqzptrmnbvc@gmail.com')).toBe(false);
    expect(isAcceptableLeadEmail('aaaaaaaaaa@gmail.com')).toBe(false);
    expect(isAcceptableLeadEmail('anonymous@gmail.com')).toBe(false);
  });

  it('does not over-reject realistic addresses', () => {
    expect(isAcceptableLeadEmail('johnsmith123@gmail.com')).toBe(true);
    expect(isAcceptableLeadEmail('priya.patel@outlook.com')).toBe(true);
    expect(isAcceptableLeadEmail('family2026@schooldistrict.org')).toBe(true);
  });
});
