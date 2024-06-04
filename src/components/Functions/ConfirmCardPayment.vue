<template>
    <wwEditorInputRow
        label="Stripe element"
        type="select"
        required
        bindable
        :options="stripeElementOptions"
        :actions="stripeElementActions"
        :model-value="elementId"
        placeholder="Select a stripe card element"
        @update:modelValue="setElementId"
        @action="onAction"
    />
    <wwEditorInputRow
        label="Client secret"
        type="query"
        required
        bindable
        :model-value="clientSecret"
        placeholder="Enter a value"
        @update:modelValue="setClientSecret"
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
        clientSecret() {
            return this.args.clientSecret;
        },
        stripeElementOptions() {
            return Object.values(this.componentVariables)
                .filter(variable => variable.type === 'stripe-card')
                .map(variable => {
                    const wwElement = wwLib.wwObjectHelper.getWwObject[variable.componentId] || {};
                    return { label: wwElement.name || variable.name, value: variable.id, icon: 'logos/stripe' };
                });
        },
    },
    methods: {
        setElementId(elementId) {
            this.$emit('update:args', { ...this.args, elementId });
        },
        setClientSecret(clientSecret) {
            this.$emit('update:args', { ...this.args, clientSecret });
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
