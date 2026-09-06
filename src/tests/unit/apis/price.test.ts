import { getPaperPrices } from "@/apis/price";

describe('getPaperPrices', () => {
    const mockFetch = jest.fn();

    beforeEach(() => {
        global.fetch = mockFetch
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('when API success', () => {
        it('should fetch A4 prices as default', async () => {
            const mockRes = {
                paper_size: 'a4',
                prices: []
            }

            mockFetch.mockResolvedValue({
                ok: true,
                json: jest.fn().mockResolvedValue(mockRes)
            });

            const result = await getPaperPrices();

            expect(result).toEqual(mockRes);

            expect(mockFetch).toHaveBeenCalledWith('https://us-central1-fe-ws-test.cloudfunctions.net/prices?paper_size=a4');

            expect(mockFetch).toHaveBeenCalledTimes(1)
        })

        it('should fetch prices for specific size', async () => {
            const mockRes = {
                paper_size: 'a3',
                prices: []
            }

            mockFetch.mockResolvedValue({
                ok: true,
                json: jest.fn().mockResolvedValue(mockRes)
            });

            const result = await getPaperPrices('a3');

            expect(result).toEqual(mockRes);

            expect(mockFetch).toHaveBeenCalledWith('https://us-central1-fe-ws-test.cloudfunctions.net/prices?paper_size=a3');

            expect(mockFetch).toHaveBeenCalledTimes(1)
        })

        it('should return null when API returns null', async () => {
            mockFetch.mockResolvedValue({
                ok: true,
                json: jest.fn().mockResolvedValue(null),
            });

            const result = await getPaperPrices();

            expect(result).toBeNull();
        });
    })

    describe('when API fails', () => {
        it('should throw an error when API return 500', async () => {
            mockFetch.mockResolvedValue({
                ok: false,
                status: 500,
                statusText: 'Internal Server Error',
            });

            await expect(getPaperPrices())
                .rejects
                .toThrow(
                    'API call failed with status 500: Internal Server Error'
                );
        });

        it('should throw an error when fetch fails', async () => {
            mockFetch.mockRejectedValue(
                new Error('Network error')
            );

            await expect(getPaperPrices())
                .rejects
                .toThrow('Network error');
        });
    });
})