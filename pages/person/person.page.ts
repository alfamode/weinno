import { expect, Page } from '@playwright/test';
import { PageHandle, PersonFormData } from './types';
import { PersonNavigation } from './person.navigation';
import { PersonForm } from './person.form';
import { PersonError } from './person.error';

export class PersonPage {
    readonly navigation: PersonNavigation;
    readonly form: PersonForm;
    readonly error: PersonError;
    constructor(private page: Page) {
        const pageHandle: PageHandle = {
            get: () => this.page,
            set: (page: Page) => {
                this.page = page;
            },
        };
        this.navigation = new PersonNavigation(pageHandle);
        this.form = new PersonForm(pageHandle.get);
        this.error = new PersonError(pageHandle.get);
    }

    async defineNewPerson(data: PersonFormData) {
        try {
            await this.navigation.toDefinePerson();
            await this.form.fillDefinitionFields(data);
            await this.form.submit();
        }
        catch (error) {
            console.error(`There was an error in filling person form: \n${error}`);
            await this.page.pause();
            await this.error.expectFieldInvalid();
        }
    }
}
