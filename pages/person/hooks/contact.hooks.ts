import {
    PersonFieldKey,
    FieldHook,
} from '@pages/person/person.types';
import {
    fill,
    chosen,
} from '@pages/person/hooks/factories';

export const contactKeys = [
    'mobile',
    'province',
    'town',
    'email',
    'address',
    'postal-code',
    'work-number',
] as const satisfies readonly PersonFieldKey[];

export const contactHooks: Partial<Record<(typeof contactKeys)[number], FieldHook>> = {
    'mobile': fill('#Mobile'),
    'province': chosen('#ProvinceId_chosen'),
    'town': chosen('#CountyId_chosen'),
    'email': fill('#EmailAddress'),
    'address': fill('#Address'),
    'postal-code': fill('#ZipCode'),
    'work-number': fill('#WorkPhone'),
};
