import { FieldHook, PersonFieldKey } from './types';
import { notImplemented } from './helpers';

export const miscKeys = [
    'personnel-picture-manual-selection',
    'signature-manual-selection',
] as const satisfies readonly PersonFieldKey[];

export const miscHooks: Partial<Record<(typeof miscKeys)[number], FieldHook>> = {
    'personnel-picture-manual-selection': notImplemented,
    'signature-manual-selection': notImplemented,
};
