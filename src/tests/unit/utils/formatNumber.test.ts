import { formatNumber } from "@/utils/formatNumber";

// should + expect behavior + if condition
describe('formatNumber', () => {
    it('should return single digit without formatting', () => {
        const result = formatNumber(1);

        expect(result).toBe('1')
    })

    it('should return 2 digit without formatting', () => {
        const result = formatNumber(10);

        expect(result).toBe('10')
    })

    it('should return 0 number without formatting', () => {
        const result = formatNumber(0);

        expect(result).toBe('0')
    })

    it('should return 2 digit without formatting', () => {
        const result = formatNumber(100);

        expect(result).toBe('100')
    })

    it('should return 4 digit number with commas', () => {
        const result = formatNumber(1000);

        expect(result).toBe('1,000')
    })

    it('should return 5 digit number with commas', () => {
        const result = formatNumber(12345);

        expect(result).toBe('12,345')
    })

    it('should return 6 digit number with commas', () => {
        const result = formatNumber(123456);

        expect(result).toBe('123,456')
    })

    it('should format large number with commas', () => {
        const result = formatNumber(123456789);

        expect(result).toBe('123,456,789')
    })

    it('should format million number with commas', () => {
        const result = formatNumber(1000000000);

        expect(result).toBe('1,000,000,000')
    })

    it('should throw error if negative number', () => {
        expect(() => formatNumber(-100)).toThrow('Invalid number');
    })

    it('should throw error if decimal number', () => {
        expect(() => formatNumber(1.234)).toThrow('Invalid number');
    })

    it('should throw error if NaN', () => {
        expect(() => formatNumber(NaN)).toThrow('Invalid number');
    })

    it('should throw error if Infinity', () => {
        expect(() => formatNumber(Infinity)).toThrow('Invalid number');
    })
})