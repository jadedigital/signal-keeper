<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-xs-center">
        <img src="/signal-white.png" alt="Vuetify.js" class="my-5" height="80" />
      </div>
      <v-card>
        <v-card-title class="headline">Welcome to the Signal Management portal</v-card-title>
        <v-card-text>
          <p>This site manages tenant applications, rental agreements, maintenance requests, and payment receipts</p>
          <p>For more information on Signal Property Management, check out our <a href="https://signalmanagement.ca" target="_blank">website</a>.</p>
          <p>Thank you for using Signal Management, we look forward to serving you property management needs.</p>
          <div class="text-xs-right">
            <em><small>&mdash; Signal Management Team</small></em>
          </div>
          <hr class="my-3">
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" nuxt to="/account/signup">Apply to be a Tenant</v-btn>
          <v-btn color="primary" nuxt to="/account/login">Log In</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
}
</script>
