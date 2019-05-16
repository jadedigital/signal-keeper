<template>
  <v-layout row>
    <v-flex>
      <!-- Add a menu:
      Log in / Sign up - when the user is not logged in
      Username / Log out - when the user is logged in
      -->
      <div data-netlify-identity-menu></div>

      <!-- Add a simpler button:
        Simple button that will open the modal.
      -->
      <div data-netlify-identity-button>Login with Netlify Identity</div>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  head () {
    return {
      script: [
        {
          type: 'text/javascript',
          src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' 
        }
      ]
    }
  },
  name: 'IdentityForm',
  data () {
    return {
      applicantName: ''
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
    