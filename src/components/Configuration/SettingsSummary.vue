<template>
    <wwEditorFormRow label="Public API key">
        <div class="stripe-settings-summary__elem">
            <div><wwEditorIcon large name="key" class="stripe-settings-summary__icon" /></div>
            <span class="stripe-settings-summary__value caption-m">{{ settings.publicData.publicApiKey }}</span>
        </div>
    </wwEditorFormRow>
    <wwEditorFormRow label="Private API key">
        <div class="stripe-settings-summary__elem">
            <div><wwEditorIcon large name="key" class="stripe-settings-summary__icon" /></div>
            <span class="stripe-settings-summary__value caption-m">{{ privateApiKey }}</span>
        </div>
    </wwEditorFormRow>
    <wwEditorFormRow label="Public test API key">
        <div class="stripe-settings-summary__elem">
            <div><wwEditorIcon large name="key" class="stripe-settings-summary__icon" /></div>
            <span class="stripe-settings-summary__value caption-m">{{ settings.publicData.publicTestApiKey }}</span>
        </div>
    </wwEditorFormRow>
    <wwEditorFormRow label="Private test API key">
        <div class="stripe-settings-summary__elem">
            <div><wwEditorIcon large name="key" class="stripe-settings-summary__icon" /></div>
            <span class="stripe-settings-summary__value caption-m">{{ privateTestApiKey }}</span>
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
.stripe-settings-summary {
    &__elem {
        display: flex;
        align-items: center;
        &:not(:last-child) {
            margin-bottom: var(--ww-spacing-02);
        }
    }
    &__icon {
        margin-right: var(--ww-spacing-02);
    }
    &__value {
        overflow: hidden;
        text-overflow: ellipsis;
    }
}
</style>
