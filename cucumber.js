module.exports = {
    default: {
        requireModule: [
            'ts-node/register',
            'tsconfig-paths/register'
        ],
        require: ['features/**/*.ts'],
        format: ['progress'],
        paths: ['features/'],
    },
};