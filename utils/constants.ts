import type { PersonFieldKey } from '@pages/person/types';

export function getStandard(type: PersonFieldKey): string {
    // TODO based of type that is PersonFieldKey or CourseFieldKey, 
    // we can change data provided over here.
    switch (type) {
        case 'nationality':
            return 'ایرانی';
        case 'national-code':
            return '5992439013';
        case 'firstname':
            return 'محمد';
        case 'surname':
            return 'متقی';
        case 'male-parent':
            return 'احمد';
        case 'date-of-birth':
            return '13521023';
        case 'mobile':
            return '09131519001';
        case 'location-of-birth':
            return 'میبد';
        case 'location-of-registration':
            return 'یزد';
        case 'firstname-english':
            return 'Mohammad';
        case 'surname-english':
            return 'Mottaghi';
        case 'male-parent-english':
            return 'Ahamad';
        case 'location-of-birth-english':
            return 'Meybod';
        case 'location-of-registration-english':
            return 'Yazd';
        case 'marital-status':
            return 'متاهل';
        case 'personnel-code':
            return '0901';
        case 'id-certificate-code':
            return '1492';
        case 'gender':
            return 'مرد';
        case 'province':
            return 'یزد';
        case 'town':
            return 'یزد';
        case 'email':
            return 'mottaghi.mohammad@yazd.ac.ir';
        case 'organization':
            return 'گروه وینو';
        case 'job-title':
            return 'کارشناس امور تنخواه';
        case 'employment-type':
            return 'رسمی';
        case 'date-of-employment':
            return '13860517';
        case 'employee-unit':
            return 'سازمان وینو و آبخیزداری';
        case 'work-number':
            return '03536219001';
        case 'higher-education-degree':
            return 'لیسانس';
        case 'higher-education-field':
            return 'حقوق عمومی';
        case 'training-basis':
            return 'شغل';
        case 'degree-reference-code':
            return '102938475612';
        case 'address':
            return 'یزد, بهاباد, خیابان جمهوری, کوچه هفدهم, پلاک 23';
        case 'postal-code':
            return '8915043210';
        case 'insurance-date':
            return '13860518';
        case 'insurance-code':
            return '13950201';
        case 'tamin-username':
            return 'mottaghi.mohammad';
        case 'tamin-password':
            return 'tamin@mottaghi-yazd';
        case 'assigned-shift':
            return 'شیفت کاری تست';
        case 'shift-group':
            return 'دستی';
        case 'person-type':
            return 'فراگیران';
        case 'supervisor':
            return 'اصغر آشتیانی';
        case 'bank-name':
            return 'ملی';
        case 'branch-name':
            return 'ابوذر یزد';
        case 'branch-code':
            return '3517';
        case 'debit-card-number':
            return '6037143682432788';
        case 'deposit-type':
            return 'سرمایه گذاری کوتاه مدت';
        case 'deposit-number':
            return '1170692824536';
        case 'deposit-owner-name':
            return 'محمد متقی اصل';
        case 'iban':
            return 'IR930170000001170692824536';
        case 'personnel-picture-manual-selection':
            return 'false';
        case 'signature-manual-selection':
            return 'false';
        default:
            throw Error("There is Field Key missing that is not defined in utils.");
    }
}
