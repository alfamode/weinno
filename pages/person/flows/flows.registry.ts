import { defineNewPerson } from './define-person.flow';

export const flows = {
    defineNewPerson,
} as const;

export type FlowName = keyof typeof flows;