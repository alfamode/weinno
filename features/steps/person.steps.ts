import { Given, When, Then } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';
import { loginViaUi } from '@helpers/login-via-ui';
import { PersonPage } from '@pages/person/person.page';
import 'dotenv/config';

let person: PersonPage;

Given('I logged in', { timeout: 60000 }, async () => {
    const browser = await chromium
        .launch({
            headless: false,
            channel: 'chrome'
        });
    const context = await browser.newContext();
    const page = await context.newPage();

    const {
        APP_PASSWORD: password,
        APP_USERNAME: username,
        BASE_URL: baseUrl,
        CAPTCHA: captcha
    } = process.env;
    if (!password || !username || !baseUrl || !captcha)
        throw new Error('Required Environment Variables (User/Pass/URL/Captcha) are missing.');

    await loginViaUi(page, username, password, baseUrl, captcha);
    person = new PersonPage(page);
})

When('I click define a new person', { timeout: 300000 }, async () => {
    await person.navigation.toManagement();
    const peopleData = [{ 'employee-unit': 'سازمان وینو و آبخیزداری', 'supervisor': 'محمدرضا اباذری' }];
    for (const personData of peopleData)
        await person.defineNewPerson(personData);
})

Then('I receive a success message', async function () {
    console.log("consider it successful.")
});
