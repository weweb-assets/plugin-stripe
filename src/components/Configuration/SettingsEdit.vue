<template>
    <div v-if="!isEveryKeysSet" class="mb-3 label-sm content-warning flex items-center">
        <wwEditorIcon class="mr-1" name="warning" small />
        STAGING and EDITOR use PRODUCTION keys if empty
    </div>
    <!-- PROD -->
    <div class="my-3 label-sm flex items-center">Production</div>
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
    <!-- STAGING -->
    <div class="my-3 label-sm flex items-center">Staging</div>
    <wwEditorFormRow label="Public API key">
        <wwEditorInputText
            placeholder="pk_test_********"
            :model-value="settings.publicData.publicStagingApiKey"
            @update:modelValue="setPublicStagingApiKey"
        />
    </wwEditorFormRow>
    <wwEditorFormRow label="Private API key">
        <wwEditorInputText
            type="password"
            placeholder="sk_test_********"
            :model-value="settings.privateData.privateStagingApiKey"
            @update:modelValue="setPrivateStagingApiKey"
        />
    </wwEditorFormRow>
    <!-- EDITOR -->
    <div class="my-3 label-sm flex items-center">Editor</div>
    <wwEditorFormRow label="Public API key">
        <wwEditorInputText
            placeholder="pk_test_********"
            :model-value="settings.publicData.publicTestApiKey"
            @update:modelValue="setPublicTestApiKey"
        />
    </wwEditorFormRow>
    <wwEditorFormRow label="Private API key">
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
        reloadPlugin() {
            this.plugin.load(
                this.settings.publicData.publicTestApiKey ||
                    this.settings.publicData.publicStagingApiKey ||
                    this.settings.publicData.publicApiKey
            );
        },
        // used in prod
        setPublicApiKey(publicApiKey) {
            this.$emit('update:settings', {
                ...this.settings,
                publicData: { ...this.settings.publicData, publicApiKey },
            });
            this.$nextTick(() => this.reloadPlugin());
        },
        setPrivateApiKey(privateApiKey) {
            this.$emit('update:settings', {
                ...this.settings,
                privateData: { ...this.settings.privateData, privateApiKey },
            });
        },
        // used in staging
        setPublicStagingApiKey(publicStagingApiKey) {
            this.$emit('update:settings', {
                ...this.settings,
                publicData: { ...this.settings.publicData, publicStagingApiKey },
            });
            this.$nextTick(() => this.reloadPlugin());
        },
        setPrivateStagingApiKey(privateStagingApiKey) {
            this.$emit('update:settings', {
                ...this.settings,
                privateData: { ...this.settings.privateData, privateStagingApiKey },
            });
        },
        // used in editor
        setPublicTestApiKey(publicTestApiKey) {
            this.$emit('update:settings', {
                ...this.settings,
                publicData: { ...this.settings.publicData, publicTestApiKey },
            });
            this.$nextTick(() => this.reloadPlugin());
        },
        setPrivateTestApiKey(privateTestApiKey) {
            this.$emit('update:settings', {
                ...this.settings,
                privateData: { ...this.settings.privateData, privateTestApiKey },
            });
        },
    },
    computed: {
        isEveryKeysSet() {
            return (
                this.settings.publicData.publicApiKey &&
                this.settings.privateData.privateApiKey &&
                this.settings.publicData.publicStagingApiKey &&
                this.settings.privateData.privateStagingApiKey &&
                this.settings.publicData.publicTestApiKey &&
                this.settings.privateData.privateTestApiKey
            );
        },
    },
};
</script>
