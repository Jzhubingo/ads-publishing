module.exports = {
    db: {
        mongodb: {
            uri: 'mongodb://localhost/ads',
        },
        redis: {
            host: 'localhost',
            port: 6379,
            db: 5,
            options: {
                return_buffers: false,
                auth_pass: '',
            },
        },
    },
    token: {
        privateKey: 'xxxx'
    }
};