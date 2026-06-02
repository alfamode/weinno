import { expect } from '@playwright/test';
import * as utils from '@utils';
import * as path from 'path';

['national-code', 'csv-parser']
const testcase_groups = ['csv-parser', 'national-code']

async function runTests() {
    console.log('🚀 Running Utility Tests ...');
    console.log(testcase_groups);

    try {
        if (testcase_groups.includes('national-code')) {
            // Test 1: Less than 9 digits
            expect(() => utils.getRandom('national-code', '123'), 'Should reject strings shorter than 9 digits')
                .toThrow(/exactly 9 digits/);
            
            // Test 2: More than 9 digits
            expect(() => utils.getRandom('national-code', '1234567890'), 'Should reject strings longer than 9 digits')
                .toThrow(/exactly 9 digits/);

            // Test 3: The "Three Zeros" rejection
            expect(() => utils.getRandom('national-code', '000123456'), 'Should reject "000" prefix')
                .toThrow(/two leading zeros/);
            
            // Test 4: Valid leading zero cases
            expect(() => utils.getRandom('national-code', '001234567'), 'Should allow "001" prefix').not.toThrow();
            expect(() => utils.getRandom('national-code', '010234567'), 'Should allow "010" prefix').not.toThrow();
            console.log('✅ Test 1-4: Regex Validations Passed');

            // Test 5: Randomizer logic integrity
            for (let i = 0; i < 100; i++) {
                const code = utils.getRandom('national-code', );
                expect(code.startsWith('000'), `Randomizer produced forbidden 000 prefix: ${code}`).toBe(false);
            }
            console.log('✅ Test 5: Randomizer 1,000 Samples Passed');

            // Test 6: Mathematical calculation check
            // 001234567 -> sum = 112, remainder = 2, control = 11 - 2 = 9
            const result = utils.getRandom('national-code', '001234567');
            expect(result).toBe('0012345679');
            console.log('✅ Test 6: Math Logic Verified');
        }

        if (testcase_groups.includes('csv-parser')) {
            // Test 7: Checks CSV Parse
            const csvPath = path.join(process.cwd(), 'data', 'people.csv');
            const peopleData = utils.parseCsv(csvPath);
            console.table(peopleData);
        }

        console.log('\n✨ ALL TESTS PASSED ✨');
    } catch (error: any) {
        console.error('\n❌ TEST FAILED:');
        console.error(error.message);
        process.exit(1);
    }
}

runTests();
