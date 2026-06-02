import { expect, Page } from "@playwright/test";
import {
    DEFAULT_PERSON_FEILDS,
    PersonFieldKey,
    PersonFormData
} from "./types";
import { PERSON_FIELD_HOOKS } from "./hooks.index";
import { getData } from "@utils";

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
        await expect(page).toHaveURL(/\/Person\/PersonManagment$/i);
    }
}