import { HOME_GRAPH_JSON_LD } from '../homeGraphJsonLd';

describe('HOME_GRAPH_JSON_LD', () => {
  it('contains the homepage FAQPage without duplicating the site-wide organization', () => {
    expect(HOME_GRAPH_JSON_LD['@context']).toBe('https://schema.org');
    expect(HOME_GRAPH_JSON_LD['@graph']).toHaveLength(1);
    expect(HOME_GRAPH_JSON_LD['@graph'][0]['@type']).toBe('FAQPage');
  });

  it('includes all visible homepage FAQ questions from HOME_VISIBLE_FAQS', () => {
    const faqNode = HOME_GRAPH_JSON_LD['@graph'][0];
    expect(faqNode.mainEntity).toHaveLength(9);
    expect(faqNode.mainEntity[0].name).toBe('What age should my child start coding?');
  });

});
