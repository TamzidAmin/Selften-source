import Vue from 'vue'
import VueFbCustomerChat from 'vue-fb-customer-chat'
 
Vue.use(VueFbCustomerChat, {
  page_id: 109785283812983, //  change 'null' to your Facebook Page ID,
  theme_color: '#D81C4B', // theme color in HEX
  locale: 'en_US', // default 'en_US'
})