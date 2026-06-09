import type { PersonFieldKey } from '@pages/person/person.types';
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
            throw new Error(`Unsupported field type: ${type}`);
    }
}

export function getData(type: FeildKey, data?: string): string {
    try {
        return getRandom(type, data);
    }
    catch (e) {
        if (e instanceof Error
            && /unsupported .* type/i.test(e.message))
            return getStandard(type);
        else
            throw e;
    }
}
