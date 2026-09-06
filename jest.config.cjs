module.exports = {
    testEnvironment: 'jsdom',
    testEnvironmentOptions: {
        customExportConditions: ['node', 'node-addons']
    },
    transform: {
        '^.+\\.vue$': '@vue/vue3-jest',
        '^.+\\.ts$': [
            'ts-jest',
            {
                tsconfig: 'tsconfig.spec.json',
            }
        ]
    },
    moduleFileExtensions: ['ts', 'js', 'json', 'vue'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
},
    testMatch: [
        '<rootDir>/src/tests/unit/**/*.spec.ts',
        '<rootDir>/src/tests/components/**/*.spec.ts',
        '<rootDir>/src/tests/unit/**/*.test.ts',
        '<rootDir>/src/tests/components/**/*.test.ts'
    ]
}