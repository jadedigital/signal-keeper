<template>
  <v-layout row>
    <v-flex xs6 offset-xs3>
      <v-card class="mt-5">
        <div class="ma-3">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-card-text>
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                :append-icon="passwordMask ? 'visibility' : 'visibility_off'"
                @click:append="() => (passwordMask = !passwordMask)"
                :type="passwordMask ? 'password' : 'text'"
                label="Enter your password"
                counter
              ></v-text-field>
              <p><nuxt-link to="/account/signup">I don't have an account</nuxt-link></p>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                :disabled="!valid"
                @click="submit"
              >
                submit
              </v-btn>
              <v-btn @click="clear">clear</v-btn>
            </v-card-actions>
          </v-form>
        </div>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  name: 'LoginForm',

  data () {
    return {
      valid: false,
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      password: '',
      passwordMask: true,
      formError: ''
    }
  },
  computed: {
    invalidEmail () {
      return false // !this.email.includes('@')
    },
    invalidPassword () {
      return false // !this.password.length > 12
    }
  },
  methods: {
    submit () {
      this.formError = ''
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>
