<template>
  <v-layout row>
    <v-flex>
      <v-form name="viewingRequest" ref="form" v-model="valid" method="POST" data-netlify="true" data-netlify-honeypot="bot-field">
        <p class="hidden">
          <label>Don’t fill this out if you're human: <input name="bot-field" /></label>
        </p>
        <input type="hidden" name="form-name" value="viewingRequest" />
        <v-card class="mt-5">
          <v-card-title>
            <div class="headline">Viewing Request</div>
          </v-card-title>
          <div class="ma-3">
            <v-text-field
              v-model="property"
              label="Rental Property Address"
              name="propertyAddress"
              required
            ></v-text-field>
            <v-text-field
              v-model="yourName"
              label="Your Name"
              name="applicantName"
              required
            ></v-text-field>
            <v-text-field
              v-model="yourEmail"
              name="applicantEmail"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
            <v-text-field
              v-model="yourPhone"
              label="Phone Number"
              name="applicantPhone"
              :mask="phoneMask"
              prepend-icon="phone"
              required
            ></v-text-field>
            <v-select
              v-model="requestedTime"
              :items="requestedTimeItems"
              label="Requested Time"
              :item-value="requestedTime"
            ></v-select>
            <input class="hidden" type="text" name="requestedTime" :value="requestedTime" />
            <v-dialog
              ref="dialog"
              v-model="modal"
              :return-value.sync="requestedDay"
              persistent
              lazy
              full-width
              width="290px"
            >
              <v-text-field
                slot="activator"
                v-model="date"
                name="requestedDate"
                label="Requested Date"
                prepend-icon="event"
                readonly
                required
              ></v-text-field>
              <v-date-picker 
                v-model="requestedDay" 
                scrollable
                :allowed-dates="allowedDates"
                :min="minDate"
                :max="maxDate"
              >
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                <v-btn flat color="primary" @click="$refs.dialog.save(requestedDay)">OK</v-btn>
              </v-date-picker>
            </v-dialog>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="clear">clear</v-btn>
              <v-btn
                :disabled="!valid"
                type="submit"
              >
                submit
              </v-btn>
            </v-card-actions>
          </div>
        </v-card>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  name: 'MaintRequest',
  data () {
    return {
      property: '',
      formError: '',
      valid: false,
      modal: false,
      requestedTime: '',
      requestedTimeItems: [
        '10:00am',
        '10:15am',
        '10:30am',
        '10:45am',
        '11:00am',
        '11:15am',
        '11:30am',
        '11:45am'
      ],
      requestedDay: null,
      yourName: '',
      yourEmail: '',
      yourPhone: '',
      phoneMask: 'phone',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],

    }
  },
  computed: {
    invalidEmail () {
      return false // !this.email.includes('@')
    },
    minDate () {
      const currentDate = new Date()
      const year = currentDate.getFullYear()
      const month = currentDate.getMonth() + 1
      const day = currentDate.getDate()
      return (year + '-' + month + '-' + day)
    },
    maxDate () {
      const currentDate = new Date()
      const year = currentDate.getMonth() === 11 ? currentDate.getFullYear() + 1 : currentDate.getFullYear()
      const month = currentDate.getMonth() === 11 ? 1 : currentDate.getMonth() + 1
      const day = currentDate.getDate()
      return (year + '-' + month + '-' + day)
    }
  },
  methods: {
    clear () {
      this.$refs.form.reset()
    },
    allowedDates (val) {
      let dayOfWeek = new Date(Date.parse(val))
      let bool = (dayOfWeek !== 6 || dayOfWeek !== 0)
      return bool
    },
  }
}
</script>

<style lang="css" scoped>
  .hidden {
    visibility: hidden;
  }
</style>
