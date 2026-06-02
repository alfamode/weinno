import { test, expect } from '@fixtures/authenticatedPage';
import { PersonPage } from '@pages/person/person.page';
import { parseCsv } from '@utils';
import * as path from 'path';


test('Bulk define persons', async ({ authenticadPage }) => {
    const person = new PersonPage(authenticadPage);
    await person.navigation.toManagement();

    const csvPath = path.join(process.cwd(), 'data', 'people.csv');
    const peopleData = [{ 'employee-unit': 'سازمان وینو و آبخیزداری', 'supervisor': 'محمدرضا اباذری' }]; // parseCsv(csvPath);

    for (const personData of peopleData)
        await person.defineNewPerson(personData);

    await authenticadPage.pause();
});
