<template>
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
        type="query"
        :model-value="customerId"
        label="Customer ID"
        placeholder="Enter a value"
        bindable
        @update:modelValue="setCustomerId"
    />
</template>

<script>
export default {
    props: {
        plugin: { type: Object, required: true },
        args: { type: Object, default: () => {} },
    },
    emits: ['update:args'],
    data() {
        return {
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
                { label: 'Twint', value: 'twint' },
                { label: 'WeChat Pay', value: 'wechat_pay' },
                { label: 'Twint', value: 'twint' },
            ],
        };
    },
    computed: {
        prices() {
            return this.args.prices;
        },
        customerId() {
            return this.args.customerId;
        },
        paymentMethods() {
            return this.args.paymentMethods;
        },
    },
    mounted() {
        if (!this.paymentMethods) {
            this.$emit('update:args', {
                ...this.args,
                paymentMethods: ['card'],
                prices: [{ quantity: 1 }],
            });
        }
    },
    methods: {
        setPrices(prices) {
            this.$emit('update:args', { ...this.args, prices });
        },
        setCustomerId(customerId) {
            this.$emit('update:args', { ...this.args, customerId });
        },
        setPaymentMethods(paymentMethods) {
            this.$emit('update:args', { ...this.args, paymentMethods });
        },
    },
};
</script>
