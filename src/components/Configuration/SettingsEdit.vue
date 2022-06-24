<template>
    <wwEditorFormRow required label="Public API key">
        <wwEditorInputText
            placeholder="pk_live_********"
            :model-value="settings.publicData.publicApiKey"
            @update:modelValue="setPublicApiKey"
        />
    </wwEditorFormRow>
    <wwEditorFormRow required label="Private API key">
        <wwEditorInputText
            type="password"
            placeholder="sk_live_********"
            :model-value="settings.privateData.privateApiKey"
            @update:modelValue="setPrivateApiKey"
        />
    </wwEditorFormRow>
    <wwEditorFormRow label="Public test API key">
        <wwEditorInputText
            placeholder="pk_test_********"
            :model-value="settings.publicData.publicTestApiKey"
            @update:modelValue="setPublicTestApiKey"
        />
    </wwEditorFormRow>
    <wwEditorFormRow label="Private test API key">
        <wwEditorInputText
            type="password"
            placeholder="sk_test_********"
            :model-value="settings.privateData.privateTestApiKey"
            @update:modelValue="setPrivateTestApiKey"
        />
    </wwEditorFormRow>
</template>

<script>
export default {
    props: {
        settings: { type: Object, required: true },
    },
    emits: ['update:settings'],
    methods: {
        setPublicApiKey(publicApiKey) {
            this.$emit('update:settings', {
                ...this.settings,
                publicData: { ...this.settings.publicData, publicApiKey },
            });
            this.$nextTick(() =>
                this.plugin.load(this.settings.publicData.publicTestApiKey || this.settings.publicData.publicApiKey)
            );
        },
        setPrivateApiKey(privateApiKey) {
            this.$emit('update:settings', {
                ...this.settings,
                privateData: { ...this.settings.privateData, privateApiKey },
            });
        },
        setPublicTestApiKey(publicTestApiKey) {
            this.$emit('update:settings', {
                ...this.settings,
                publicData: { ...this.settings.publicData, publicTestApiKey },
            });
            this.$nextTick(() =>
                this.plugin.load(this.settings.publicData.publicTestApiKey || this.settings.publicData.publicApiKey)
            );
        },
        setPrivateTestApiKey(privateTestApiKey) {
            this.$emit('update:settings', {
                ...this.settings,
                privateData: { ...this.settings.privateData, privateTestApiKey },
            });
        },
    },
};
</script>
