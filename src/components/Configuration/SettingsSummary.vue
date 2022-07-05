<template>
    <wwEditorFormRow label="Public API key">
        <div class="flex items-center body-2">
            <wwEditorIcon name="key" class="mr-2" />
            <div class="text-ellipsis">{{ settings.publicData.publicApiKey }}</div>
        </div>
    </wwEditorFormRow>
    <wwEditorFormRow label="Private API key">
        <div class="flex items-center body-2">
            <wwEditorIcon name="key" class="mr-2" />
            <div class="text-ellipsis">{{ privateApiKey }}</div>
        </div>
    </wwEditorFormRow>
    <wwEditorFormRow label="Public test API key">
        <div class="flex items-center body-2">
            <wwEditorIcon name="key" class="mr-2" />
            <div class="text-ellipsis">{{ settings.publicData.publicTestApiKey }}</div>
        </div>
    </wwEditorFormRow>
    <wwEditorFormRow label="Private test API key">
        <div class="flex items-center body-2">
            <wwEditorIcon name="key" class="mr-2" />
            <div class="text-ellipsis">{{ privateTestApiKey }}</div>
        </div>
    </wwEditorFormRow>
</template>

<script>
export default {
    props: {
        settings: { type: Object, required: true },
    },
    computed: {
        privateApiKey() {
            return this.settings.privateData.privateApiKey.replace(/./g, '*');
        },
        privateTestApiKey() {
            return this.settings.privateData.privateTestApiKey.replace(/./g, '*');
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
