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
        designSystemId: '48b73e9d-9636-4e13-8125-f6433265a97d',
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
                    ((!!prices.length && !!prices.every(({ price }) => !!price)) || prices.__wwtype !== undefined)
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
        {
            name: 'Confirm payment',
            code: 'confirmPayment',
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/ConfirmPayment.vue'),
            getIsValid({ elementId, redirectPage }) {
                return !!elementId && !!redirectPage;
            },
            /* wwEditor:end */
        },
        {
            name: 'Confirm card payment',
            code: 'confirmCardPayment',
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/ConfirmCardPayment.vue'),
            getIsValid({ clientSecret, elementId }) {
                return !!clientSecret && !!elementId;
            },
            /* wwEditor:end */
        },
    ],
};
