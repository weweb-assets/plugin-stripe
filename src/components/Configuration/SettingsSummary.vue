<template>
    <!-- PROD -->
    <div class="my-3 label-sm flex items-center">Production</div>
    <wwEditorFormRow label="Public prod API key">
        <div class="flex items-center body-2">
            <wwEditorIcon name="key" class="mr-2" />
            <div class="text-ellipsis">{{ settings.publicData.publicApiKey || 'not defined' }}</div>
        </div>
    </wwEditorFormRow>
    <wwEditorFormRow label="Private prod API key">
        <div class="flex items-center body-2">
            <wwEditorIcon name="key" class="mr-2" />
            <div class="text-ellipsis">{{ privateApiKey || 'not defined' }}</div>
        </div>
    </wwEditorFormRow>
    <!-- STAGING -->
    <div class="my-3 label-sm flex items-center">Staging</div>
    <wwEditorFormRow label="Public staging API key" v-if="isStagingConfigValid">
        <div class="flex items-center body-2">
            <wwEditorIcon name="key" class="mr-2" />
            <div class="text-ellipsis">{{ settings.publicData.publicStagingApiKey }}</div>
        </div>
    </wwEditorFormRow>
    <wwEditorFormRow label="Private staging API key" v-if="isStagingConfigValid">
        <div class="flex items-center body-2">
            <wwEditorIcon name="key" class="mr-2" />
            <div class="text-ellipsis">{{ privateStagingApiKey }}</div>
        </div>
    </wwEditorFormRow>
    <div class="mb-3 body-sm content-warning flex items-center" v-if="isStagingConfigNotSet">
        Not set => Production keys used in staging.
    </div>
    <div class="mb-3 label-sm content-alert flex items-center" v-if="isStagingConfigBroken">
        <wwEditorIcon class="mr-1" name="warning" small />
        {{
            privateStagingApiKey
                ? 'Private key is set but not public => Possible issues in staging.'
                : 'Public key is set but not private => Possible issues in staging.'
        }}
    </div>
    <!-- EDITOR -->
    <div class="my-3 label-sm flex items-center">Editor</div>
    <wwEditorFormRow label="Public editor API key" v-if="isEditorConfigValid">
        <div class="flex items-center body-2">
            <wwEditorIcon name="key" class="mr-2" />
            <div class="text-ellipsis">{{ settings.publicData.publicTestApiKey }}</div>
        </div>
    </wwEditorFormRow>
    <wwEditorFormRow label="Private editor API key" v-if="isEditorConfigValid">
        <div class="flex items-center body-2">
            <div class="text-ellipsis">{{ privateTestApiKey }}</div>
        </div>
    </wwEditorFormRow>
    <div class="mb-3 body-sm content-warning flex items-center" v-if="isEditorConfigNotSet">
        Not set => Production keys used in the editor.
    </div>
    <div class="mb-3 label-sm content-alert flex items-center" v-if="isEditorConfigBroken">
        <wwEditorIcon class="mr-1" name="warning" small />
        {{
            privateTestApiKey
                ? 'Private key is set but not public => Possible issues in editor.'
                : 'Public key is set but not private => Possible issues in editor.'
        }}
    </div>
</template>

<script>
export default {
    props: {
        settings: { type: Object, required: true },
    },
    computed: {
        // used in prod
        privateApiKey() {
            return (this.settings.privateData.privateApiKey || '').replace(/./g, '*');
        },
        // used in staging
        privateStagingApiKey() {
            return (this.settings.privateData.privateStagingApiKey || '').replace(/./g, '*');
        },
        // used in editor
        privateTestApiKey() {
            return (this.settings.privateData.privateTestApiKey || '').replace(/./g, '*');
        },

        isProdConfigValid() {
            return this.settings.publicData.publicApiKey && this.settings.privateData.privateApiKey;
        },
        isStagingConfigValid() {
            return this.settings.publicData.publicStagingApiKey && this.settings.privateData.privateStagingApiKey;
        },
        isEditorConfigValid() {
            return this.settings.publicData.publicTestApiKey && this.settings.privateData.privateTestApiKey;
        },

        isProdConfigNotSet() {
            return !this.settings.publicData.publicApiKey && !this.settings.privateData.privateApiKey;
        },
        isStagingConfigNotSet() {
            return !this.settings.publicData.publicStagingApiKey && !this.settings.privateData.privateStagingApiKey;
        },
        isEditorConfigNotSet() {
            return !this.settings.publicData.publicTestApiKey && !this.settings.privateData.privateTestApiKey;
        },

        isStagingConfigBroken() {
            return (
                (this.settings.publicData.publicStagingApiKey && !this.settings.privateData.privateStagingApiKey) ||
                (!this.settings.publicData.publicStagingApiKey && this.settings.privateData.privateStagingApiKey)
            );
        },
        isEditorConfigBroken() {
            return (
                (this.settings.publicData.publicTestApiKey && !this.settings.privateData.privateTestApiKey) ||
                (!this.settings.publicData.publicTestApiKey && this.settings.privateData.privateTestApiKey)
            );
        },
    },
};
</script>

<style lang="scss" scoped>
.text-ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
