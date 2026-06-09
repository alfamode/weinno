import {
    PersonFieldKey,
    FieldHook,
} from '@pages/person/person.types';
import {
    notImplemented,
} from '@pages/person/hooks/factories';

export const miscKeys = [
    'personnel-picture-manual-selection',
    'signature-manual-selection',
] as const satisfies readonly PersonFieldKey[];

export const miscHooks: Partial<Record<(typeof miscKeys)[number], FieldHook>> = {
    'personnel-picture-manual-selection': notImplemented,
    'signature-manual-selection': notImplemented,
};
