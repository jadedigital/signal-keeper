<template>
  <v-layout row>
    <v-flex xs6 offset-xs3>
      <v-form name="apply" ref="form" v-model="valid" netlify>
        <v-card class="mt-5">
          <v-card-title>
            <div class="headline">Property</div>
          </v-card-title>
          <div class="ma-3">
            <v-text-field
              v-model="property"
              label="Property applying for"
              required
            ></v-text-field>
            <v-dialog
              ref="dialog"
              v-model="modal"
              :return-value.sync="date"
              persistent
              lazy
              full-width
              width="290px"
            >
              <v-text-field
                slot="activator"
                v-model="date"
                label="Move in Date"
                prepend-icon="event"
                readonly
                required
              ></v-text-field>
              <v-date-picker v-model="date" scrollable>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
              </v-date-picker>
            </v-dialog>
            <v-select
              v-model="rentalLength"
              :items="rentalLengthItems"
              label="Rental Length"
            ></v-select>
          </div>
        </v-card>
        <v-card class="mt-5">
          <v-card-title>
            <div class="headline">Applicant Info</div>
          </v-card-title>
          <div class="ma-3">
            <v-text-field
              v-model="name"
              label="Full Name"
              :rules="nameRules"
              required
            ></v-text-field>
            <v-text-field
              v-model="currentAddress"
              label="Current Address"
              required
            ></v-text-field>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
            <v-text-field
              v-model="phone"
              name="phone"
              :mask="phoneMask"
              label="Phone Number"
              single-line
              prepend-icon="phone"
            ></v-text-field>
          </div>
        </v-card>
        <v-card class="mt-5">
          <v-card-title>
            <div class="headline">Rental History</div>
          </v-card-title>
          <div class="ma-3">
            <v-text-field
              v-model="currentLandlord"
              label="Current Landlord"
              required
            ></v-text-field>
            <v-text-field
              v-model="landlordPhone"
              label="Landlord Phone Number"
              :mask="phoneMask"
              single-line
              required
            ></v-text-field>
            <v-textarea
              v-model="reasonMoving"
              auto-grow
              box
              label="Reason for moving"
              rows="10"
            ></v-textarea>
          </div>
        </v-card>
        <v-card>
          <v-card-title>
            <div class="headline">Certification</div>
          </v-card-title>
          <div class="ma-3">
            <v-checkbox
                v-model="checkbox"
                :rules="checkboxRules"
                label="YES, I certify that the information supplied above is true and correct, and that I give permission to the Landlord or agent for the Landlord to verify that the information provided above is true. Any false or misleading statements made in this application may be cause for immediate termination of tenancy."
                required
              ></v-checkbox>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="clear">clear</v-btn>
              <v-btn
                :disabled="!valid"
                @click="signup"
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
  name: 'SignupForm',
  data () {
    return {
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length >= 4) || 'Name must be at least 4 characters'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Name must be at least than 6 characters'
      ],
      passwordMask: true,
      phone: '',
      phoneMask: 'phone',
      property: '',
      date: null,
      formError: '',
      valid: false,
      modal: false,
      currentAddress: '',
      rentalLength: '',
      rentalLengthItems: ['6 Months', '12 Months', '18 Months', '24 Months', '36 Months'],
      currentLandlord: '',
      landlordPhone: '',
      reasonMoving: ''
    }
  },
  computed: {
    newData () {
      var data = {
        displayName: this.name,
        premission: 'tenant',
        status: 'pending',
        image: ''
      }
      return data
    },
    invalidEmail () {
      return false // !this.email.includes('@')
    },
    invalidPassword () {
      return false // !this.password.length > 12
    }
  },
  methods: {
    signup () {
      this.formError = ''
    },
    updateField () {
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>
