import { test } from '@fixtures/authenticated-page';
import { PersonPage } from '@pages/person/person.page';
import { parseCsv } from '@utils';
import * as path from 'path';

test('Bulk define persons', async ({ authenticadPage }) => {
    const person = new PersonPage(authenticadPage);
    await person.navigation.toManagement();

    const csvPath = path.join(process.cwd(), 'data', 'people-minimal.csv');
    const peopleData = parseCsv(csvPath);

    for (const personData of peopleData)
        await person.flow('defineNewPerson', personData);
});
