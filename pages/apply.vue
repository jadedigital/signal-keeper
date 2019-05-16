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

export default {
  components: {
    SignupForm
  }
}
</script>
