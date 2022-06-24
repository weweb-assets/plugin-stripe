/* wwEditor:start */
import './components/Configuration/SettingsEdit.vue';
import './components/Configuration/SettingsSummary.vue';
/* wwEditor:end */
import { loadStripe } from '@stripe/stripe-js';

export default {
    instance: null,
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
            if (!this.instance) throw new Error('Invalid Stripe configuration.');
        } catch (err) {
            wwLib.wwLob.error(err);
            wwLib.wwNotification.open({
                text: 'Invalid Stripe configuration.',
                color: 'red',
            });
        }
    },
    async checkout({ currency, products, successPage, cancelPage }) {
        if (!currency) throw new Error('No currency defined.');
        if (!products || !products.length) throw new Error('No product defined.');
        if (!successPage) throw new Error('No success page defined.');
        if (!cancelPage) throw new Error('No cancel page defined.');

        const websiteId = wwLib.wwWebsiteData.getInfo().id;
        const { data: session } = await axios.post(
            `${wwLib.wwApiRequests._getPluginsUrl()}/designs/${websiteId}/stripe/create-checkout-session`,
            { currency, products, successPage, cancelPage }
        );

        window.location.href = session.url;
    },
};
