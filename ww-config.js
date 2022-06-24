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
            getIsValid({ currency, products, successPage, cancelPage }) {
                return !!currency && !!products && !!products.length && !!successPage && !!cancelPage;
            },
            /* wwEditor:end */
        },
    ],
};
