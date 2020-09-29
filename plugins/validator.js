import Vue from 'vue'
import Vuelidate from 'vuelidate'

import VuePhoneNumberInput from 'vue-phone-number-input'
import 'vue-phone-number-input/dist/vue-phone-number-input.css'

Vue.component('vuephone', VuePhoneNumberInput)

Vue.use(Vuelidate)