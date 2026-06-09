import { PersonPage } from '@pages/person/person.page';
import { PersonFormData } from '@pages/person/person.types';

export async function defineNewPerson(
    personPage: PersonPage,
    data: PersonFormData
): Promise<void> {
    try {
        await personPage.navigation.toDefinePerson();
        await personPage.form.fillDefinitionFields(data);
        await personPage.form.submit();
    } catch (error) {
        console.error(`There was an error in filling person form:\n${error}`);
        await personPage.error.expectFieldInvalid();
    }
}