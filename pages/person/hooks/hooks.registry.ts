import {
    PersonFieldKey,
    FieldHook,
} from '@pages/person/person.types';
import { identityHooks } from '@pages/person/hooks/identity.hooks';
import { contactHooks } from '@pages/person/hooks/contact.hooks';
import { employmentHooks } from '@pages/person/hooks/employment.hooks';
import { financeHooks } from '@pages/person/hooks/finance.hooks';
import { miscHooks } from '@pages/person/hooks/misc.hooks';

export const PERSON_FIELD_GROUPS = {
    identity: Object.keys(identityHooks),
    contact: Object.keys(contactHooks),
    employment: Object.keys(employmentHooks),
    finance: Object.keys(financeHooks),
    misc: Object.keys(miscHooks),
} as const;

export const PERSON_FIELD_HOOKS: Record<PersonFieldKey, FieldHook> = {
    ...identityHooks,
    ...contactHooks,
    ...employmentHooks,
    ...financeHooks,
    ...miscHooks,
} as Record<PersonFieldKey, FieldHook>;
