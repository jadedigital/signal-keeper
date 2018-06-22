<template>
  <v-layout row>
    <v-flex xs6 offset-xs3>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-card class="mt-5">
          <div class="ma-3">
            <v-text-field
              v-model="name"
              label="Name"
              :rules="nameRules"
              required
            ></v-text-field>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              :append-icon="passwordMask ? 'visibility' : 'visibility_off'"
              :append-icon-cb="() => (passwordMask = !passwordMask)"
              :type="passwordMask ? 'password' : 'text'"
              :rules="passwordRules"
              label="Enter your password"
              min="6"
              counter
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
            <v-checkbox
              v-model="checkbox"
              :rules="checkboxRules"
              label="Do you agree?"
              required
            ></v-checkbox>
          </div>
        </v-card>
        <v-card class="mt-5">
          <div class="ma-3">
            <v-text-field
              v-model="property"
              label="Property"
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
            <v-card-actions>
              <v-btn @click="clear">clear</v-btn>
              <v-spacer></v-spacer>
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
      checkbox: false,
      checkboxRules: [
        v => !!v || 'You must agree to continue!'
      ],
      formError: '',
      valid: false,
      date: null,
      modal: false
    }
  },
  computed: {
    newData () {
      var data = {
        displayName: this.name,
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
      this.$store.dispatch('userCreate', {
        email: this.email,
        password: this.password
      })
        .then(() => {
          this.updateField()
        })
        .catch((error) => {
          console.log(error)
          this.formError = error.message
        })
    },
    updateField () {
      this.$store.dispatch('userUpdate', this.newData)
        .then(() => {
          this.$router.push('/account')
        })
        .catch((err) => {
          this.formError = 'Error saving display name'
          console.error(err)
        })
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>
