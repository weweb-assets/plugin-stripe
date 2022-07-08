<template>
    <wwEditorInputRow
        label="Stripe element"
        type="select"
        required
        bindable
        :options="stripeElementOptions"
        :actions="stripeElementActions"
        :model-value="elements"
        placeholder="Select a stripe element"
        @update:modelValue="setStripeElement"
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
    data() {
        return {
            stripeElementActions: [{ icon: 'add', label: 'Add a stripe element', onAction: this.addStripeElement }],
        };
    },
    computed: {
        elements() {
            return this.args.elements;
        },
        redirectPage() {
            return this.args.redirectPage;
        },
        stripeElementOptions() {
            const componentVariables = wwLib.$store.getters['data/getComponentVariables'];
            return Object.values(componentVariables)
                .filter(variable => variable.type === 'stripe')
                .map(variable => ({ label: variable.name, value: variable.id, icon: 'stripe' }));
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
        setElements(elements) {
            this.$emit('update:args', { ...this.args, elements });
        },
        setRedirectPage(redirectPage) {
            this.$emit('update:args', { ...this.args, redirectPage });
        },
        addStripeElement() {
            // eslint-disable-next-line vue/custom-event-name-casing
            wwLib.$emit('wwTopBar:open', 'WEBSITE_ADD');
            // eslint-disable-next-line vue/custom-event-name-casing
            wwLib.$emit('wwTopBar:add:setMenu', 'stripe-design-system'); // TODO
        },
        onAction(action, index) {
            action.onAction && action.onAction(index);
        },
    },
};
</script>
