export function generateValidNationalCode(prefix?: string): string {
    let base: string;
    if (prefix) {
        if (!/^\d{9}$/.test(prefix)) throw new Error('Input must be exactly 9 digits.');
        if (/^000/.test(prefix)) throw new Error('Only two leading zeros are allowed.');
        base = prefix;
    } else {
        const min = 1000000;
        const max = 999999999;
        const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        base = randomNum.toString().padStart(9, '0');
    }

    const digits = base.split('').map(Number);
    const sum = digits.reduce((acc, curr, index) => acc + curr * (10 - index), 0);
    const remainder = sum % 11;
    const controlDigit = remainder < 2 ? remainder : 11 - remainder;

    return base + controlDigit;
}

export function generateValidIbanCode(suffix?: string): string {
    const base = suffix && /^\d{22}$/.test(suffix)
        ? suffix
        : Array.from({ length: 22 }, () => Math.floor(Math.random() * 10)).join('');

    return `IR12${base}`;
}
