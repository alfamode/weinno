import { expect, Page } from '@playwright/test';
import * as utils from '@utils';
import {
    PersonFormData,
    PersonFieldKey,
    DEFAULT_PERSON_FEILDS
} from '@pages/person/person.types';
import {
    Registry
} from '@pages/person/hooks';

const { getData } = utils;
const { PERSON_FIELD_HOOKS } = Registry;

export class PersonForm {
    constructor(private getPage: () => Page) { }

    async fillDefinitionFields(
        data: PersonFormData = {},
        fieldsToPopulate?: PersonFieldKey[]
    ) {
        const page = this.getPage();
        const baseFields = fieldsToPopulate ?? DEFAULT_PERSON_FEILDS;
        const dataFields = Object.keys(data) as PersonFieldKey[];

        const fields = [...new Set([...baseFields, ...dataFields])];

        for (const key of fields) {
            const hook = PERSON_FIELD_HOOKS[key];

            if (!hook) {
                throw new Error(`No hook registered for field: ${key}`);
            }

            const value = data[key] ?? getData(key);
            console.debug(`>> ${key} : ${value}\n`);
            await hook({ page, value });
        }
    }

    async submit() {
        const page = this.getPage();
        await page.getByRole('button', { name: 'ثبـت اطلاعات' }).click();
        // Wait for success, then back to management
        await expect(page).toHaveURL(/\/Person\/PersonManagment$/i, { timeout: 30000 });
    }
}
