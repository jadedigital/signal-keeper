<template>
  <v-layout row>
    <v-flex xs6 offset-xs3>
      <v-card class="mt-5">
        <div class="ma-3">
          <div class="columns" v-if="isLoggedIn" v-cloak>
            <div class="one-half column centered">
              <div class="blankslate blankslate-clean-background">
                <h3 v-text="user.user_metadata.full_name"></h3>
                <p>View and manage your account</p>
              </div>
            </div>
          </div>
          <div class="columns">
            <div class="one-half column centered" v-if="editing" v-cloak>
              <p>Edit Your Profile</p>
              <EditAccountForm />
            </div>
            <div class="one-half column centered" v-else>
              <div v-if="account" v-cloak>
                <p>Information pulled from the firebase <code>/account</code> dataset</p>
                <pre v-text="`${JSON.stringify(account, null, 2)}`"></pre>
              </div>
            </div>
            <v-card-actions>
              <v-spacer></v-spacer>
              <button type="button" class="btn btn-primary mr-2" v-on:click="toggleEditForm">
                <span v-if="editing">Done</span>
                <span v-else>Edit</span>
              </button>
              <button type="button" class="btn btn-danger" v-on:click="signOut">Sign Out</button>
            </v-card-actions>
          </div>
        </div>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import EditAccountForm from '~/components/account/EditAccountForm.vue'
import netlifyIdentity from 'netlify-identity-widget'

export default {
  // middleware: 'authenticated', // checking if auth'd with firebase kinda sucks as the middleware is triggered before firebase is ready
  components: {
    EditAccountForm
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'getUserStatus',
      user: 'getUser'
    }),
    imageAlt () {
      return `Profile image for ${this.account.displayName}`
    }
  },
  data () {
    return {
      editing: false
    }
  },
  methods: {
    ...mapActions({
      updateUser: 'updateUser'
    }),
    toggleEditForm () {
      this.editing = !this.editing
    },
    signOut () {
      this.updateUser({
        currentUser: null
      })
        .then(() => {
          localStorage.removeItem('user')
          netlifyIdentity.logout()
          this.$router.push('/')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="css" scoped>
  .profile-image img {
    border-radius: 100px;
    overflow: hidden;
    border: 2px solid #b2b1b0;
  }
  pre {
    white-space: pre-wrap;
  }
</style>
