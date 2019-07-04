<template>
  <div>
    <div class="columns">
      <div class="one-half column centered">
        <div class="hero">
          <div class="hero-body">
            <h1 class="title">Signal Management</h1>
            <h2 class="subtitle">Login to manage your account</h2>
          </div>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="one-half column centered">
        <div class="four-fifths">
          <IdentityForm />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IdentityForm from '~/components/account/IdentityForm.vue'
import { mapState } from 'vuex'
import netlifyIdentity from "netlify-identity-widget"

if (process.browser) {
  netlifyIdentity.init({
    APIUrl: 'https://app.signalmanagement.ca/.netlify/functions/identity'
  })
}

export default {
  components: {
    IdentityForm
  },
  watch: {
    // firebase is sometimes slow so we need to account for
    // the user getting authenticated late in the game...
    user (to, from) {
      this.$router.push('/account')
    }
  },
  computed: mapState([
    'user'
  ])
}
</script>
