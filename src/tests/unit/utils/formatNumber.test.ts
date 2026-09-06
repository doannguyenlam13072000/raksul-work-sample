import { formatNumber } from "@/utils/formatNumber";

describe('first group test', () => {
    it('first test', () => {
        const result = formatNumber(1);

        expect(result).toBe('1')
    })
})