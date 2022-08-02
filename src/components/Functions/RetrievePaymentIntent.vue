<template>
    <wwEditorInputRow
        type="query"
        :model-value="clientSecret"
        label="Client secret"
        placeholder="Enter a value"
        bindable
        required
        @update:modelValue="setClientSecret"
    />
</template>

<script>
export default {
    props: {
        args: { type: Object, default: () => {} },
    },
    emits: ['update:args'],
    computed: {
        clientSecret() {
            return this.args.clientSecret;
        },
    },
    methods: {
        setClientSecret(clientSecret) {
            this.$emit('update:args', { ...this.args, clientSecret });
        },
    },
};
</script>
