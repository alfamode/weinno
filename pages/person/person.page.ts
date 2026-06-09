import { Page } from '@playwright/test';
import {
    PageHandle,
    PersonFormData,
} from '@pages/person/person.types';
import * as A from '@pages/person/actions';
import * as F from '@pages/person/flows';

export class PersonPage {
    readonly navigation: A.PersonNavigation;
    readonly form: A.PersonForm;
    readonly error: A.PersonError;
    constructor(private page: Page) {
        const pageHandle: PageHandle = {
            get: () => this.page,
            set: (page: Page) => {
                this.page = page;
            },
        };
        this.navigation = new A.PersonNavigation(pageHandle);
        this.form = new A.PersonForm(pageHandle.get);
        this.error = new A.PersonError(pageHandle.get);
    }

    async flow<T extends F.Registry.FlowName>(
        name: T,
        data: PersonFormData
    ): Promise<ReturnType<typeof F.Registry.flows[T]>> {
        const flowFunction = F.Registry.flows[name];
        if (!flowFunction)
            throw new Error(`Flow "${name}" not found in registry`);
        return flowFunction(this, data) as ReturnType<typeof F.Registry.flows[T]>;
    }
}
