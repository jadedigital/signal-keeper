<template>
  <div>
    <div class="text-xs-center">
      <img src="/signal-white.png" alt="Vuetify.js" class="mt-5" height="60" />
    </div>
    <div class="columns">
      <div class="one-half column centered">
        <div class="four-fifths">
          <ViewingForm />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ViewingForm from '~/components/account/ViewingForm.vue'

export default {
  components: {
    ViewingForm
  }
}
</script>