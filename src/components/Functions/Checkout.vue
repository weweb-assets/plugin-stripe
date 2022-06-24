<template>
    <wwEditorInputRow
        type="array"
        :model-value="prices"
        label="Prices"
        bindable
        @update:modelValue="setPrices"
        @add-item="setPrices([...(prices || []), {}])"
    >
        <template #default="{ item, setItem }">
            <wwEditorInputRow
                type="query"
                :model-value="item.id"
                label="Price ID"
                placeholder="Enter a value"
                bindable
                small
                @update:modelValue="setItem({ ...item, id: $event })"
            />
            <wwEditorInputRow
                type="query"
                :model-value="item.quantity"
                label="Quantity"
                placeholder="Enter a value"
                bindable
                small
                @update:modelValue="setItem({ ...item, quantity: $event })"
            />
        </template>
    </wwEditorInputRow>
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
</template>

<script>
export default {
    props: {
        plugin: { type: Object, required: true },
        args: { type: Object, default: () => {} },
    },
    emits: ['update:args'],
    computed: {
        prices() {
            return this.args.prices || [];
        },
        successPage() {
            return this.args.successPage;
        },
        cancelPage() {
            return this.args.cancelPage;
        },
        pageOptions() {
            const homePageId = wwLib.wwWebsiteData.getInfo().homePageId;
            return wwLib.wwWebsiteData.getPages().map(page => ({
                label: page.name,
                value: page.id,
                icon: page.id === homePageId ? 'home' : page.pageUserGroups.length ? 'auth' : 'document',
            }));
        },
    },
    methods: {
        setPrices(prices) {
            this.$emit('update:args', { ...this.args, prices });
        },
        setSuccessPage(successPage) {
            this.$emit('update:args', { ...this.args, successPage });
        },
        setCancelPage(cancelPage) {
            this.$emit('update:args', { ...this.args, cancelPage });
        },
    },
};
</script>
