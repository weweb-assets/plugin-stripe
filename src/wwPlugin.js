import { ref } from 'vue';

/* wwEditor:start */
import './components/Configuration/SettingsEdit.vue';
import './components/Configuration/SettingsSummary.vue';
import './components/Functions/Checkout.vue';
import './components/Functions/CustomerPortal.vue';
import './components/Functions/CreatePaymentIntent.vue';
import './components/Functions/RetrievePaymentIntent.vue';
import './components/Functions/ConfirmPayment.vue';
import './components/Functions/ConfirmCardPayment.vue';
/* wwEditor:end */
import { loadStripe } from '@stripe/stripe-js';
import locales from './locales';

export default {
    instance: null,
    isInstanceLoaded: ref(false),
    /*=============================================m_ÔÔ_m=============================================\
        Plugin API
    \================================================================================================*/
    async onLoad(settings) {
        /* wwFront:start */
        await this.load(settings.publicData.publicApiKey);
        /* wwFront:end */
        /* wwEditor:start */
        await this.load(settings.publicData.publicTestApiKey || settings.publicData.publicApiKey);
        /* wwEditor:end */
    },
    /*=============================================m_ÔÔ_m=============================================\
        Stripe API
    \================================================================================================*/
    async load(publicApiKey) {
        if (!publicApiKey) return;
        try {
            this.instance = await loadStripe(publicApiKey);
            /* wwEditor:start */
            this.instance = await new Promise(resolve =>
                setTimeout(async () => {
                    resolve(await wwLib.getFrontWindow().Stripe(publicApiKey));

                }, 2500)
            );
            /* wwEditor:end */
            this.isInstanceLoaded.value = true;
            if (!this.instance) throw new Error('Invalid Stripe configuration.');
        } catch (err) {
            wwLib.wwLog.error(err);
            /* wwEditor:start */
            wwLib.wwNotification.open({
                text: 'Invalid Stripe configuration.',
                color: 'red',
            });
            /* wwEditor:end */
        }
    },
    async checkout({
        prices,
        successPage,
        cancelPage,
        customerId,
        customerEmail,
        paymentMethods,
        isQuantityAdjustable,
        minQuantity,
        maxQuantity,
        isPromoCode,
        mode,
        shippings,
        isPhoneCollection,
        isAutoTax,
        locale,
        metadata,
    }) {
        if (!mode) throw new Error('No mode defined.');
        if (!prices || !prices.length) throw new Error('No product defined.');
        if (!paymentMethods || !paymentMethods.length) throw new Error('No payment method defined.');
        if (!successPage) throw new Error('No success page defined.');
        if (!cancelPage) throw new Error('No cancel page defined.');
        try {
            const websiteId = wwLib.wwWebsiteData.getInfo().id;

            const successUrl = wwLib.manager
                ? `${window.location.origin}/${websiteId}/${successPage}`
                : `${window.location.origin}${wwLib.wwPageHelper.getPagePath(successPage)}`;
            const cancelUrl = wwLib.manager
                ? `${window.location.origin}/${websiteId}/${cancelPage}`
                : `${window.location.origin}${wwLib.wwPageHelper.getPagePath(cancelPage)}`;

            const { data: session } = await axios.post(
                `${wwLib.wwApiRequests._getPluginsUrl()}/designs/${websiteId}/stripe/create-checkout-session`,
                {
                    prices,
                    successUrl,
                    cancelUrl,
                    customerId,
                    customerEmail,
                    paymentMethods,
                    isQuantityAdjustable,
                    minQuantity,
                    maxQuantity,
                    isPromoCode,
                    mode,
                    shippings,
                    isPhoneCollection,
                    isAutoTax,
                    metadata,
                    locale: locales[locale || wwLib.wwLang.lang] ? locale || wwLib.wwLang.lang : 'auto',
                }
            );

            window.location.href = session.url;
        } catch (err) {
            throw new Error(err.response.data);
        }
    },
    async customerPortal({ customerId, cancelPage }) {
        if (!customerId) throw new Error('No currency defined.');
        if (!cancelPage) throw new Error('No cancel page defined.');
        try {
            const websiteId = wwLib.wwWebsiteData.getInfo().id;

            const cancelUrl = wwLib.manager
                ? `${window.location.origin}/${websiteId}/${cancelPage}`
                : `${window.location.origin}${wwLib.wwPageHelper.getPagePath(cancelPage)}`;

            const { data: session } = await axios.post(
                `${wwLib.wwApiRequests._getPluginsUrl()}/designs/${websiteId}/stripe/create-customer-portal-session`,
                { customerId, cancelUrl }
            );

            window.location.href = session.url;
        } catch (err) {
            throw err.response;
        }
    },
    async createPaymentIntent({ prices, customerId, paymentMethods }) {
        if (!prices || !prices.length) throw new Error('No product defined.');
        if (!paymentMethods || !paymentMethods.length) throw new Error('No payment method defined.');
        try {
            const websiteId = wwLib.wwWebsiteData.getInfo().id;
            const { data: paymentIntent } = await axios.post(
                `${wwLib.wwApiRequests._getPluginsUrl()}/designs/${websiteId}/stripe/create-payment-intent`,
                { prices, customerId, paymentMethods }
            );
            return paymentIntent;
        } catch (err) {
            throw new Error(err.response.data);
        }
    },
    async retrievePaymentIntent({ clientSecret }) {
        if (!clientSecret) throw new Error('No client secret defined.');

        const { paymentIntent } = await this.instance.retrievePaymentIntent(clientSecret);
        return paymentIntent;
    },
    async confirmPayment({ elementId, redirectPage }) {
        if (!elementId) throw new Error('No element defined.');
        if (!redirectPage) throw new Error('No redirect page defined.');

        const elements = wwLib.wwVariable.getValue(elementId);
        if (!elements) throw new Error('Invalid Stripe element.');

        const websiteId = wwLib.wwWebsiteData.getInfo().id;
        const redirectUrl = wwLib.manager
            ? `${window.location.origin}/${websiteId}/${redirectPage}`
            : `${window.location.origin}${wwLib.wwPageHelper.getPagePath(redirectPage)}`;

        const { error } = await this.instance.confirmPayment({
            elements,
            confirmParams: { return_url: redirectUrl },
        });
        throw new Error(error.message, { cause: error });
    },
    async confirmCardPayment({ clientSecret, elementId }) {
        if (!clientSecret) throw new Error('No client secret defined.');
        if (!elementId) throw new Error('No element defined.');

        const card = wwLib.wwVariable.getValue(elementId);
        if (!card) throw new Error('Invalid Stripe element.');

        const result = await this.instance.confirmCardPayment(clientSecret, {
            payment_method: { card },
        });
        if (result.error) throw new Error(result.error.message, { cause: result.error });
        return result.paymentIntent;
    },
};
