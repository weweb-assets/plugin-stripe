<template>
    <wwEditorInputRow
        label="Customer ID"
        type="query"
        required
        bindable
        :model-value="customerId"
        placeholder="Enter a value"
        @update:modelValue="setCustomerId"
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
        customerId() {
            return this.args.customerId;
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
        setCustomerId(customerId) {
            this.$emit('update:args', { ...this.args, customerId });
        },
        setCancelPage(cancelPage) {
            this.$emit('update:args', { ...this.args, cancelPage });
        },
    },
};
</script>
