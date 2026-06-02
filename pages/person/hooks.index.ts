import { FieldHook, PersonFieldKey } from './types';
import { contactHooks, contactKeys } from './hooks.contact';
import { employmentHooks, employmentKeys } from './hooks.employment';
import { financeHooks, financeKeys } from './hooks.finance';
import { identityHooks, identityKeys } from './hooks.identity';
import { miscHooks, miscKeys } from './hooks.misc';

export const PERSON_FIELD_GROUPS = {
  identity: identityKeys,
  contact: contactKeys,
  employment: employmentKeys,
  finance: financeKeys,
  misc: miscKeys,
} as const satisfies Record<string, readonly PersonFieldKey[]>;

export const PERSON_FIELD_HOOKS: Record<PersonFieldKey, FieldHook> = {
    ...(identityHooks as Record<PersonFieldKey, FieldHook>),
    ...(contactHooks as Record<PersonFieldKey, FieldHook>),
    ...(employmentHooks as Record<PersonFieldKey, FieldHook>),
    ...(financeHooks as Record<PersonFieldKey, FieldHook>),
    ...(miscHooks as Record<PersonFieldKey, FieldHook>),
};
