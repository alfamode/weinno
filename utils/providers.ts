import type { PersonFieldKey } from '@pages/person/types';
import { generateValidNationalCode, generateValidIbanCode } from './factories';
import { getStandard } from './constants';

export type FeildKey = PersonFieldKey;

export function getRandom(type: FeildKey, data?: string): string {
    switch (type) {
        case 'national-code':
            return generateValidNationalCode(data);
        case 'iban':
            return generateValidIbanCode(data);
        default:
            return null;
    }
}

export function getData(type: FeildKey, data?: string): string {
    return getRandom(type, data) ?? getStandard(type);
}
