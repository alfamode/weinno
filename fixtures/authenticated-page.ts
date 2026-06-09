import { test as base } from '@playwright/test';
import { loginViaUi } from '@helpers/login-via-ui';
import 'dotenv/config';

type Fixtures = {
  authenticadPage: import('@playwright/test').Page;
};

export const test = base.extend<Fixtures>({
  authenticadPage: async ({ page }, use) => {
    const {
        APP_PASSWORD: password,
        APP_USERNAME: username,
        BASE_URL: baseUrl,
        CAPTCHA: captcha
    } = process.env;

    if (!password || !username || !baseUrl || !captcha) {
        throw new Error(`Required Environment Variables (${username ?? '/User'}${password ?? '/Password'}${baseUrl ?? '/URL'}${captcha ?? '/Captcha'}) are missing.`);
    }

    await loginViaUi(page, username, password, baseUrl, captcha);
    await use(page);
  },
});
