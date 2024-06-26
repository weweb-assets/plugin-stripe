<template>
    <wwEditorInputRow
        label="Stripe element"
        type="select"
        required
        bindable
        :options="stripeElementOptions"
        :actions="stripeElementActions"
        :model-value="elementId"
        placeholder="Select a stripe payment element"
        @update:modelValue="setElementId"
        @action="onAction"
    />
    <wwEditorInputRow
        label="Redirect page"
        type="select"
        required
        bindable
        :options="pageOptions"
        :model-value="redirectPage"
        placeholder="Select a redirect page"
        @update:modelValue="setRedirectPage"
    />
</template>

<script>
export default {
    props: {
        args: { type: Object, default: () => {} },
    },
    emits: ['update:args'],
    setup() {
        const { components: componentVariables } = wwLib.wwVariable.useEditorVariables();

        return {
            componentVariables,
        }
    },
    data() {
        return {
            stripeElementActions: [{ icon: 'add', label: 'Add a stripe element', onAction: this.addStripeElement }],
        };
    },
    computed: {
        elementId() {
            return this.args.elementId;
        },
        redirectPage() {
            return this.args.redirectPage;
        },
        stripeElementOptions() {
            return Object.values(this.componentVariables)
                .filter(variable => variable.type === 'stripe-payment')
                .map(variable => {
                    const wwElement = wwLib.wwObjectHelper.getWwObject[variable.componentId] || {};
                    return { label: wwElement.name || variable.name, value: variable.id, icon: 'stripe' };
                });
        },
        pageOptions() {
            const homePageId = wwLib.wwWebsiteData.getInfo().homePageId;
            return wwLib.wwWebsiteData.getPages().map(page => ({
                label: page.name,
                value: page.id,
                icon: page.id === homePageId ? 'home' : page.pageUserGroups.length ? 'auth' : 'page',
            }));
        },
    },
    methods: {
        setElementId(elementId) {
            this.$emit('update:args', { ...this.args, elementId });
        },
        setRedirectPage(redirectPage) {
            this.$emit('update:args', { ...this.args, redirectPage });
        },
        addStripeElement() {
            // eslint-disable-next-line vue/custom-event-name-casing
            wwLib.$emit('wwTopBar:open', 'WEBSITE_ADD');
            // eslint-disable-next-line vue/custom-event-name-casing
            wwLib.$emit('wwTopBar:add:setMenu', '48b73e9d-9636-4e13-8125-f6433265a97d');
        },
        onAction(action, index) {
            action.onAction && action.onAction(index);
        },
    },
};
</script>
