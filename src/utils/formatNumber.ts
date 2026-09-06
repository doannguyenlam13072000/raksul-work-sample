export const formatNumber = (number: number): string => {
    if (!Number.isInteger(number) || number < 0) {
        throw new Error('Invalid number');
    }

    let result = '';
    const digits = String(number);

    for (let i = 0; i < digits.length; i++) {
        if (i > 0 && (digits.length - i) % 3 === 0) {
            result += ',';
        }

        result += digits[i];
    }

    return result;
}