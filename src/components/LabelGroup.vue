<template>
    <label class="label-group">
        <slot/>
        <input
            v-bind="$attrs"
            v-bind:value="value"
            @input="onInput"
            class="label-group__input"
            :class="{
                inputClass,
                'label-group__input--error': error.length
            }"
            type="text"
            :name="name"
            :required="required"
        >
        <span v-show="error" class="label-group__error">
            {{ error }}
        </span>
    </label>
</template>

<script>
export default {
    name: 'LabelGroup',
    inheritAttrs: false,
    props: {
        value: {
            type: String
        },
        v: {
            type: Object,
            required: true
        },
        inputClass: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            required: true
        },
        error: {
            type: String,
            default: ''
        },
        required: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        onInput($event) {
            this.$emit('input', $event.target.value);
            this.v.$touch();
        }
    }
}
</script>

<style lang="scss" scoped>
.label-group {
    display: block;
    font-size: 18px;
    font-weight: 600;
    text-align: left;

    &__input {
        display: block;
        width: 100%;
        height: 56px;
        font-size: 18px;
        font-weight: 400;
        padding: 10px 18px;
        border: 1px solid $color-border;
        border-radius: 10px;
        transition: border-color 0.2s ease-in-out;
        box-sizing: border-box;
        margin-top: 10px;

        &--error {
            border-color: $color-error;
        }
    }

    &__error {
        font-size: 12px;
        color: $color-error;
        margin-top: 8px;
    }
}
</style>
