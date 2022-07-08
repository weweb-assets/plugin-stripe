export default {
    editor: {
        settings: [
            {
                label: 'Configuration',
                icon: 'advanced',
                edit: () => import('./src/components/Configuration/SettingsEdit.vue'),
                summary: () => import('./src/components/Configuration/SettingsSummary.vue'),
                getIsValid(settings) {
                    const { publicApiKey } = settings.publicData;
                    const { privateApiKey } = settings.privateData;
                    return !!publicApiKey && !!privateApiKey;
                },
            },
        ],
    },
    actions: [
        {
            name: 'Checkout',
            code: 'checkout',
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/Checkout.vue'),
            getIsValid({ mode, paymentMethods, prices, successPage, cancelPage }) {
                return (
                    !!mode &&
                    !!paymentMethods &&
                    !!paymentMethods.length &&
                    !!prices &&
                    !!prices.length &&
                    !!prices.every(({ price }) => !!price) &&
                    !!successPage &&
                    !!cancelPage
                );
            },
            /* wwEditor:end */
        },
        {
            name: 'Customer portal',
            code: 'customerPortal',
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/CustomerPortal.vue'),
            getIsValid({ customerId, cancelPage }) {
                return !!customerId && !!cancelPage;
            },
            /* wwEditor:end */
        },
        {
            name: 'Create payment intent',
            code: 'createPaymentIntent',
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/CreatePaymentIntent.vue'),
            getIsValid({ paymentMethods, prices }) {
                return (
                    !!paymentMethods &&
                    !!paymentMethods.length &&
                    !!prices &&
                    !!prices.length &&
                    !!prices.every(({ price }) => !!price)
                );
            },
            /* wwEditor:end */
        },
        {
            name: 'Retrieve payment intent',
            code: 'retrievePaymentIntent',
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/RetrievePaymentIntent.vue'),
            getIsValid({ clientSecret }) {
                return !!clientSecret;
            },
            /* wwEditor:end */
        },
    ],
};
