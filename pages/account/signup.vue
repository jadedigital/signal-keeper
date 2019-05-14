<template>
  <div>
    <div class="text-xs-center">
      <img src="/signal-white.png" alt="Vuetify.js" class="mt-5" height="60" />
    </div>
    <div class="columns">
      <div class="one-half column centered">
        <div class="four-fifths">
          <SignupForm />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SignupForm from '~/components/account/SignupForm.vue'
import { mapState } from 'vuex'

export default {
  components: {
    SignupForm
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
