import { HOME_GRAPH_JSON_LD } from '../homeGraphJsonLd';

describe('HOME_GRAPH_JSON_LD', () => {
  it('has @graph with EducationalOrganization and FAQPage', () => {
    expect(HOME_GRAPH_JSON_LD['@context']).toBe('https://schema.org');
    expect(HOME_GRAPH_JSON_LD['@graph']).toHaveLength(2);
    expect(HOME_GRAPH_JSON_LD['@graph'][0]['@type']).toBe('EducationalOrganization');
    expect(HOME_GRAPH_JSON_LD['@graph'][1]['@type']).toBe('FAQPage');
  });

  it('includes all visible homepage FAQ questions from HOME_VISIBLE_FAQS', () => {
    const faqNode = HOME_GRAPH_JSON_LD['@graph'][1];
    expect(faqNode.mainEntity).toHaveLength(9);
    expect(faqNode.mainEntity[0].name).toBe('What age should my child start coding?');
  });

  it('includes EducationalOrganization contact and rating fields', () => {
    const org = HOME_GRAPH_JSON_LD['@graph'][0];
    expect(org.email).toBe('contact@growwiseschool.org');
    expect(org.aggregateRating?.ratingValue).toBe('4.9');
    expect(org.aggregateRating?.reviewCount).toBe('40');
  });
});
