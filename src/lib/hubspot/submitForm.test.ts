import {
  isHubSpotFormsConfigured,
  splitFullName,
  submitHubSpotForm,
  syncHubSpotLeadIfConfigured,
} from './submitForm';

const ORIGINAL_ENV = process.env;
const ORIGINAL_FETCH = global.fetch;

describe('isHubSpotFormsConfigured', () => {
  beforeEach(() => {
    process.env = { ...ORIGINAL_ENV };
  });

  afterAll(() => {
    process.env = ORIGINAL_ENV;
  });

  it('returns false when portal or form guid is missing', () => {
    delete process.env.HUBSPOT_PORTAL_ID;
    delete process.env.HUBSPOT_FORM_GUID;
    expect(isHubSpotFormsConfigured()).toBe(false);
  });

  it('returns true when both env vars are set', () => {
    process.env.HUBSPOT_PORTAL_ID = '49050588';
    process.env.HUBSPOT_FORM_GUID = '8bb212e9-e59a-4b4f-a416-a23f1de1cefa';
    expect(isHubSpotFormsConfigured()).toBe(true);
  });
});

describe('submitHubSpotForm', () => {
  beforeEach(() => {
    process.env = { ...ORIGINAL_ENV };
    process.env.HUBSPOT_PORTAL_ID = '49050588';
    process.env.HUBSPOT_FORM_GUID = '8bb212e9-e59a-4b4f-a416-a23f1de1cefa';
  });

  afterEach(() => {
    global.fetch = ORIGINAL_FETCH;
    process.env = ORIGINAL_ENV;
  });

  it('returns not configured when env is missing', async () => {
    delete process.env.HUBSPOT_PORTAL_ID;
    const result = await submitHubSpotForm([{ name: 'email', value: 'a@b.com' }]);
    expect(result).toEqual({ ok: false, message: 'HubSpot Forms API is not configured' });
  });

  it('posts fields to HubSpot Forms API and returns ok on success', async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      text: async () => '{"inlineMessage":""}',
    });
    global.fetch = fetchMock as typeof fetch;

    const fields = [
      { name: 'firstname', value: 'Test' },
      { name: 'email', value: 'test@example.com' },
    ];
    const result = await submitHubSpotForm(fields, {
      pageUri: 'https://growwiseschool.org/contact',
      pageName: 'Contact',
    });

    expect(result).toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.hsforms.com/submissions/v3/integration/submit/49050588/8bb212e9-e59a-4b4f-a416-a23f1de1cefa',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fields,
          context: {
            pageUri: 'https://growwiseschool.org/contact',
            pageName: 'Contact',
          },
        }),
      }),
    );
  });

  it('returns failure when HubSpot rejects the submission', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 400,
      text: async () => '{"message":"Invalid field"}',
    }) as typeof fetch;

    const result = await submitHubSpotForm([{ name: 'email', value: 'bad' }]);
    expect(result).toEqual({
      ok: false,
      message: 'HubSpot submission failed',
      status: 400,
    });
  });
});

describe('syncHubSpotLeadIfConfigured', () => {
  beforeEach(() => {
    process.env = { ...ORIGINAL_ENV };
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    global.fetch = ORIGINAL_FETCH;
    process.env = ORIGINAL_ENV;
    jest.restoreAllMocks();
  });

  it('skips sync when HubSpot env is not configured', async () => {
    delete process.env.HUBSPOT_PORTAL_ID;
    delete process.env.HUBSPOT_FORM_GUID;
    process.env.NODE_ENV = 'production';

    await syncHubSpotLeadIfConfigured(
      [{ name: 'email', value: 'test@example.com' }],
      { pageName: 'Test' },
      'self-check',
    );

    expect(console.warn).toHaveBeenCalledWith(
      '[self-check] HubSpot CRM skipped — set HUBSPOT_PORTAL_ID and HUBSPOT_FORM_GUID on the server',
    );
  });

  it('logs success when HubSpot accepts the lead', async () => {
    process.env.HUBSPOT_PORTAL_ID = '49050588';
    process.env.HUBSPOT_FORM_GUID = '8bb212e9-e59a-4b4f-a416-a23f1de1cefa';
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      text: async () => '{"inlineMessage":""}',
    }) as typeof fetch;

    await syncHubSpotLeadIfConfigured(
      [{ name: 'email', value: 'test@example.com' }],
      { pageName: 'Math finals practice' },
      'math-finals-practice',
    );

    expect(console.log).toHaveBeenCalledWith('[math-finals-practice] HubSpot CRM sync ok');
  });
});

describe('splitFullName', () => {
  it('splits first and last', () => {
    expect(splitFullName('Jane Doe')).toEqual({
      firstname: 'Jane',
      lastname: 'Doe',
    });
  });

  it('handles single token', () => {
    expect(splitFullName('Madonna')).toEqual({
      firstname: 'Madonna',
      lastname: '',
    });
  });

  it('trims and keeps rest as lastname', () => {
    expect(splitFullName('  A B C  ')).toEqual({
      firstname: 'A',
      lastname: 'B C',
    });
  });
});
