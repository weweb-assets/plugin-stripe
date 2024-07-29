<template>
    <wwEditorInputRow
        label="Mode"
        type="select"
        required
        bindable
        :options="modeOptions"
        :model-value="mode"
        placeholder="Select a mode"
        @update:modelValue="setMode"
    />
    <wwEditorInputRow
        label="Payment methods"
        type="select"
        multiple
        required
        :options="paymentMethodOptions"
        :model-value="paymentMethods"
        placeholder="Select payment methods"
        @update:modelValue="setPaymentMethods"
    />
    <wwEditorInputRow
        label="Success page"
        type="select"
        required
        bindable
        :options="pageOptions"
        :model-value="successPage"
        placeholder="Select a success page"
        @update:modelValue="setSuccessPage"
    />
    <wwEditorInputRow
        label="Cancel page"
        type="select"
        required
        bindable
        :options="pageOptions"
        :model-value="cancelPage"
        placeholder="Select a cancel page"
        @update:modelValue="setCancelPage"
    />
    <wwEditorInputRow
        type="array"
        :model-value="prices"
        label="Prices"
        bindable
        @update:modelValue="setPrices"
        @add-item="setPrices([...(prices || []), { quantity: 1 }])"
    >
        <template #default="{ item, setItem }">
            <wwEditorInputRow
                type="query"
                :model-value="item.price"
                label="Price ID"
                placeholder="Enter a value"
                bindable
                required
                small
                @update:modelValue="setItem({ ...item, price: $event })"
            />
            <wwEditorFormRow label="Quantity">
                <wwEditorInput
                    label="Quantity"
                    type="number"
                    min="1"
                    :model-value="item.quantity"
                    placeholder="Enter a value"
                    bindable
                    small
                    @update:modelValue="setItem({ ...item, quantity: $event })"
                />
            </wwEditorFormRow>
        </template>
    </wwEditorInputRow>
    <wwEditorInputRow
        type="array"
        :model-value="shippings"
        label="Shippings"
        bindable
        @update:modelValue="setShippings"
        @add-item="setShippings([...(shippings || []), {}])"
    >
        <template #default="{ item, setItem }">
            <wwEditorInputRow
                type="query"
                :model-value="item.shipping_rate"
                label="Shippring rate ID"
                placeholder="Enter a value"
                bindable
                required
                small
                @update:modelValue="setItem({ ...item, shipping_rate: $event })"
            />
        </template>
    </wwEditorInputRow>
    <wwEditorInputRow
        type="query"
        :model-value="customerId"
        label="Customer ID"
        placeholder="Enter a value"
        bindable
        @update:modelValue="setCustomerId"
    />
    <wwEditorInputRow
        type="query"
        :model-value="customerEmail"
        label="Customer Email"
        placeholder="Enter a value"
        bindable
        @update:modelValue="setCustomerEmail"
    />
    <wwEditorInputRow
        label="Collect phone"
        type="select"
        :model-value="isPhoneCollection"
        :options="enableOptions"
        bindable
        @update:modelValue="setIsPhoneCollection"
    />
    <wwEditorInputRow
        label="Promotion codes"
        type="select"
        :model-value="isPromoCode"
        :options="enableOptions"
        bindable
        @update:modelValue="setIsPromoCode"
    />
    <wwEditorInputRow
        label="Automatic tax"
        type="select"
        :model-value="isAutoTax"
        :options="enableOptions"
        bindable
        @update:modelValue="setIsAutoTax"
    />
    <wwEditorInputRow
        label="Ajustable quantity"
        type="select"
        :model-value="isQuantityAdjustable"
        :options="enableOptions"
        bindable
        @update:modelValue="setIsQuantityAdjustable"
    />
    <div class="flex items-center" v-if="isQuantityAdjustable">
        <wwEditorInputRow
            label="Minimum quantity"
            type="number"
            min="1"
            :model-value="minQuantity"
            placeholder="Enter a value"
            bindable
            small
            @update:modelValue="setMinQuantity"
        />
        <div class="m-1"></div>
        <wwEditorInputRow
            label="Maximum quantity"
            type="number"
            min="1"
            :model-value="maxQuantity"
            placeholder="Enter a value"
            bindable
            small
            @update:modelValue="setMaxQuantity"
        />
    </div>
    <wwEditorFormRow label="Checkout language">
        <div class="flex items-center">
            <wwEditorInput
                type="select"
                placeholder="Current page lang"
                bindable
                :options="langOptions"
                :model-value="locale"
                @update:modelValue="setLocale"
            >
            </wwEditorInput>
            <wwEditorQuestionMark
                tooltip-position="top-left"
                class="ml-2"
                forcedContent="If your current page lang is not supported by stripe, it will fallback to the browser’s locale.  
When using a binding you have to use the IETF language tag of the locale (ex: en). [See documentation](https://stripe.com/docs/api/checkout/sessions/create#create_checkout_session-locale)."
            />
        </div>
    </wwEditorFormRow>
    <wwEditorInputRow
        type="array"
        :model-value="metadata"
        label="Metadata"
        bindable
        @update:modelValue="setMetadata"
        @add-item="setMetadata([...(metadata || []), {}])"
    >
        <template #default="{ item, setItem }">
            <wwEditorInputRow
                type="query"
                :model-value="item.key"
                label="Key"
                placeholder="Enter a value"
                bindable
                small
                @update:modelValue="setItem({ ...item, key: $event })"
            />
            <wwEditorInputRow
                type="query"
                :model-value="item.value"
                label="Value"
                placeholder="Enter a value"
                bindable
                small
                @update:modelValue="setItem({ ...item, value: $event })"
            />
        </template>
    </wwEditorInputRow>
</template>

<script>
import locales from '../../locales';
export default {
    props: {
        plugin: { type: Object, required: true },
        args: { type: Object, default: () => {} },
    },
    emits: ['update:args'],
    data() {
        return {
            modeOptions: [
                { label: 'Payment', value: 'payment' },
                { label: 'Subscription', value: 'subscription' },
            ],
            paymentMethodOptions: [
                { label: 'ACH Direct Debit', value: 'us_bank_account' },
                { label: 'Affirm', value: 'affirm' },
                { label: 'Afterpay and Clearpay', value: 'afterpay_clearpay' },
                { label: 'Alipay', value: 'alipay' },
                { label: 'Bacs Direct Debit', value: 'bacs_debit' },
                { label: 'Bancontact', value: 'bancontact' },
                { label: 'BECS direct debit', value: 'au_becs_debit' },
                { label: 'Boleto', value: 'boleto' },
                { label: 'Cards', value: 'card' },
                { label: 'EPS', value: 'eps' },
                { label: 'FPX', value: 'fpx' },
                { label: 'Giropay', value: 'giropay' },
                { label: 'GrabPay', value: 'grabpay' },
                { label: 'iDEAL', value: 'ideal' },
                { label: 'Klarna', value: 'klarna' },
                { label: 'Konbini', value: 'konbini' },
                { label: 'Link', value: 'link' },
                { label: 'OXXO', value: 'oxxo' },
                { label: 'P24', value: 'p24' },
                { label: 'PayNow', value: 'paynow' },
                { label: 'Pre-authorized debit in Canada', value: 'acss_debit' },
                { label: 'SEPA debit', value: 'sepa_debit' },
                { label: 'Sofort', value: 'sofort' },
                { label: 'WeChat Pay', value: 'wechat_pay' },
                { label: 'Twint', value: 'twint' },
            ],
            enableOptions: [
                { label: 'Enable', value: true },
                { label: 'Disable', value: false },
            ],
        };
    },
    computed: {
        mode() {
            return this.args.mode;
        },
        prices() {
            return this.args.prices || [];
        },
        successPage() {
            return this.args.successPage;
        },
        cancelPage() {
            return this.args.cancelPage;
        },
        customerId() {
            return this.args.customerId;
        },
        customerEmail() {
            return this.args.customerEmail;
        },
        paymentMethods() {
            return this.args.paymentMethods;
        },
        isQuantityAdjustable() {
            return this.args.isQuantityAdjustable || false;
        },
        minQuantity() {
            return this.args.minQuantity || 1;
        },
        maxQuantity() {
            return this.args.maxQuantity || 1;
        },
        isPromoCode() {
            return this.args.isPromoCode || false;
        },
        shippings() {
            return this.args.shippings || [];
        },
        isPhoneCollection() {
            return this.args.isPhoneCollection || false;
        },
        isAutoTax() {
            return this.args.isAutoTax || false;
        },
        locale() {
            return this.args.locale || null;
        },
        metadata() {
            return this.args.metadata || [];
        },
        pageOptions() {
            const homePageId = wwLib.wwWebsiteData.getInfo().homePageId;
            return wwLib.wwWebsiteData.getPages().map(page => ({
                label: page.name,
                value: page.id,
                icon: page.id === homePageId ? 'home' : page.pageUserGroups.length ? 'auth' : 'page',
            }));
        },
        langOptions() {
            return [
                { label: 'Current page lang', value: null },
                { label: 'Auto (Browser lang)', value: 'auto' },
                ...Object.keys(locales).map(key => ({
                    label: locales[key],
                    value: key,
                })),
            ];
        },
    },
    mounted() {
        if (!this.mode) {
            this.$emit('update:args', {
                ...this.args,
                mode: 'payment',
                paymentMethods: ['card'],
                successPage: wwLib.wwWebsiteData.getInfo().homePageId,
                cancelPage: wwLib.wwWebsiteData.getInfo().homePageId,
                prices: [{ quantity: 1 }],
                locale: 'auto',
            });
        }
    },
    methods: {
        setMode(mode) {
            this.$emit('update:args', { ...this.args, mode });
        },
        setPrices(prices) {
            this.$emit('update:args', { ...this.args, prices });
        },
        setSuccessPage(successPage) {
            this.$emit('update:args', { ...this.args, successPage });
        },
        setCancelPage(cancelPage) {
            this.$emit('update:args', { ...this.args, cancelPage });
        },
        setCustomerId(customerId) {
            this.$emit('update:args', { ...this.args, customerId });
        },
        setCustomerEmail(customerEmail) {
            this.$emit('update:args', { ...this.args, customerEmail });
        },
        setPaymentMethods(paymentMethods) {
            this.$emit('update:args', { ...this.args, paymentMethods });
        },
        setIsQuantityAdjustable(isQuantityAdjustable) {
            this.$emit('update:args', {
                ...this.args,
                isQuantityAdjustable,
                minQuantity: isQuantityAdjustable ? 1 : 0,
                maxQuantity: isQuantityAdjustable ? 10 : 0,
            });
        },
        setMinQuantity(minQuantity) {
            this.$emit('update:args', { ...this.args, minQuantity });
        },
        setMaxQuantity(maxQuantity) {
            this.$emit('update:args', { ...this.args, maxQuantity });
        },
        setIsPromoCode(isPromoCode) {
            this.$emit('update:args', { ...this.args, isPromoCode });
        },
        setShippings(shippings) {
            this.$emit('update:args', { ...this.args, shippings });
        },
        setIsPhoneCollection(isPhoneCollection) {
            this.$emit('update:args', { ...this.args, isPhoneCollection });
        },
        setIsAutoTax(isAutoTax) {
            this.$emit('update:args', { ...this.args, isAutoTax });
        },
        setLocale(locale) {
            this.$emit('update:args', { ...this.args, locale });
        },
        setMetadata(metadata) {
            this.$emit('update:args', { ...this.args, metadata });
        },
    },
};
</script>
