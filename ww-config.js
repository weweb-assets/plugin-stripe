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
            copilot: {
                description: "Create a Stripe checkout session and redirect to the payment page",
                returns: "void - Redirects to Stripe checkout page",
                schema: {
                    mode: {
                        type: "string",
                        description: "Payment mode (payment or subscription)",
                        bindable: true
                    },
                    prices: {
                        type: "array",
                        description: "Array of price objects with price IDs and quantities",
                        bindable: true
                    },
                    paymentMethods: {
                        type: "array",
                        description: "Allowed payment methods",
                        bindable: true
                    },
                    successPage: {
                        type: "string",
                        description: "Page ID to redirect after successful payment",
                        bindable: true
                    },
                    cancelPage: {
                        type: "string", 
                        description: "Page ID to redirect if payment is cancelled",
                        bindable: true
                    }
                }
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
            copilot: {
                description: "Create and redirect to Stripe customer portal session",
                returns: "void - Redirects to customer portal",
                schema: {
                    customerId: {
                        type: "string",
                        description: "Stripe customer ID",
                        bindable: true
                    },
                    cancelPage: {
                        type: "string",
                        description: "Page ID to redirect when leaving portal",
                        bindable: true
                    }
                }
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
            copilot: {
                description: "Create a new Stripe payment intent",
                returns: "Payment intent object",
                schema: {
                    prices: {
                        type: "array",
                        description: "Array of price objects with price IDs and quantities",
                        bindable: true
                    },
                    customerId: {
                        type: "string",
                        description: "Optional Stripe customer ID",
                        bindable: true
                    },
                    paymentMethods: {
                        type: "array",
                        description: "Allowed payment methods",
                        bindable: true
                    }
                }
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
            copilot: {
                description: "Retrieve an existing payment intent by client secret",
                returns: "Payment intent object",
                schema: {
                    clientSecret: {
                        type: "string",
                        description: "Client secret of the payment intent",
                        bindable: true
                    }
                }
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
            copilot: {
                description: "Confirm a payment using Stripe Elements",
                returns: "void - Redirects to result page",
                schema: {
                    elementId: {
                        type: "string",
                        description: "ID of the Stripe payment element",
                        bindable: true
                    },
                    redirectPage: {
                        type: "string",
                        description: "Page ID to redirect after confirmation",
                        bindable: true
                    }
                }
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
            copilot: {
                description: "Confirm a card payment using Stripe Elements",
                returns: "Payment intent object",
                schema: {
                    clientSecret: {
                        type: "string",
                        description: "Client secret of the payment intent",
                        bindable: true
                    },
                    elementId: {
                        type: "string",
                        description: "ID of the Stripe card element",
                        bindable: true
                    }
                }
            },
            /* wwEditor:end */
        },
    ],
};