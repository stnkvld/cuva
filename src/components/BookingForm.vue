<template>
    <form
        class="booking-form"
        action="/"
        method="POST"
        @submit.prevent="onSubmit"
    >
        <p class="booking-form__group">
            <LabelGroup
                v-model="address"
                :v="$v.address"
                class="booking-form__label"
                input-class="booking-form__input"
                type="text"
                name="address"
                required
                :error="addressError"
            >
                Адрес
            </LabelGroup>
        </p>
        <p class="booking-form__group">
            <LabelGroup
                v-model="name"
                :v="$v.name"
                class="booking-form__label"
                input-class="booking-form__input"
                type="text"
                name="name"
                required
                :error="nameError"
            >
                Имя
            </LabelGroup>
        </p>
        <p class="booking-form__group">
            <LabelGroup
                v-model="phone"
                :v="$v.phone"
                class="booking-form__label"
                input-class="booking-form__input"
                type="text"
                name="phone"
                required
                :error="phoneError"
            >
                Номер телефона
            </LabelGroup>
        </p>

        <p v-if="submitted" class="booking-form__success">
            Форма успешно отправлена
        </p>
        <button v-else class="button button--accent" type="submit">
            Отправить
        </button>
    </form>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators';
import { ERROR_REQUIRED, ERROR_PHONE_LENGTH } from '@/messages';

import LabelGroup from './LabelGroup';

export default {
    name: 'BookingForm',
    components: {
        LabelGroup
    },
    data() {
        return {
            address: '',
            name: '',
            phone: '',
            submitted: false
        }
    },
    computed: {
        addressError () {
            const address = this.$v.address;
            let text = '';
            if (address.$dirty && address.$invalid) {
                if (!address.required) text = ERROR_REQUIRED;
            }

            return text;
        },
        nameError () {
            const name = this.$v.name;
            let text = '';
            if (name.$dirty && name.$invalid) {
                if (!name.required) text = ERROR_REQUIRED;
            }

            return text;
        },
        phoneError () {
            const phone = this.$v.phone;
            let text = '';
            if (phone.$dirty && phone.$invalid) {
                if (!phone.required) text = ERROR_REQUIRED;
                if (!phone.minLength) text = ERROR_PHONE_LENGTH;
            }

            return text;
        },
    },
    validations () {
        return {
            address: { required },
            name: { required },
            phone: { required, minLength: minLength(11) },
        }
    },
    methods: {
        onSubmit() {
            this.$v.address.$touch();
            this.$v.name.$touch();
            this.$v.phone.$touch();

            if (this.$v.address.$invalid || this.$v.name.$invalid || this.$v.phone.$invalid) return;

            // В задании не уточняется как именно должна имитироваться отправка формв,
            // поэтому оставил таким образом.
            // Обычно, вызывается метод API или dispatch, передаются данные формы и отправляется запрос с ними
            this.submitted = true;
        }
    }
}
</script>

<style lang="scss" scoped>
.booking-form {
    width: 100%;
    padding: 32px 20px 40px;
    border-radius: 20px;
    background-color: $color-basic;
    text-align: center;
    cursor: pointer;
    transition: background-color .4s cubic-bezier(.4,0,0,1);
    box-shadow: 0 0 6px $color-basic-text;
    box-sizing: border-box;

    &__group {
        margin: 0;
        margin-bottom: 20px;
    }

    &__success {
        font-size: 18px;
        text-align: center;
        color: $color-success;
        margin: 0;
    }
}
</style>
