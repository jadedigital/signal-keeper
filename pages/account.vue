<template>
  <v-layout row>
    <v-flex xs6 offset-xs3>
      <v-card class="mt-5">
        <div class="ma-3">
          <div class="columns" v-if="isLoggedIn" v-cloak>
            <div class="one-half column centered">
              <div class="blankslate blankslate-clean-background">
                <h3>Hello {{ username }}</h3>
                <p>View and manage your account</p>
              </div>
            </div>
          </div>
          <div class="columns">
            <div class="one-half column centered" v-if="editing" v-cloak>
              <p>Edit Your Profile</p>
              <EditAccountForm />
            </div>
            <v-card-actions>
              <v-spacer></v-spacer>
              <button type="button" class="btn btn-primary mr-2" v-on:click="toggleEditForm">
                <span v-if="editing">Done</span>
                <span v-else>Edit</span>
              </button>
              <v-btn color="primary" v-if="isLoggedIn" @click="triggerNetlifyIdentityAction('logout')">Log Out</v-btn>
              <v-btn color="primary" v-if="!isLoggedIn" @click="triggerNetlifyIdentityAction('login')">Log In</v-btn>
            </v-card-actions>
          </div>
        </div>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import netlifyIdentity from 'netlify-identity-widget'
import { mapGetters, mapActions } from 'vuex'

if (process.browser) {
  netlifyIdentity.init({
    APIUrl: 'https://app.signalmanagement.ca/.netlify/identity'
  })
}

export default {
  name: 'IdentityForm',
  computed: {
    ...mapGetters({
      isLoggedIn: 'getUserStatus',
      user: 'getUser'
    }),
    username () {
      return this.user ? this.user.username : ', there!'
    }
  },
  data () {
    return {
      currentUser: null
    }
  },
  methods: {
    ...mapActions({
      updateUser: 'updateUser'
    }),
    triggerNetlifyIdentityAction (action) {
      if (action === 'login') {
        netlifyIdentity.open(action)
        netlifyIdentity.on(action, user => {
          this.currentUser = {
            username: user.user_metadata.full_name,
            email: user.email,
            access_token: user.token.access_token,
            expires_at: user.token.expires_at,
            refresh_token: user.token.refresh_token,
            token_type: user.token.token_type
          }
          this.updateUser({
            currentUser: this.currentUser
          })
          let theUser = JSON.stringify(this.currentUser)
          localStorage.setItem('user', theUser)
          netlifyIdentity.close()
        })
        console.log(this.currentUser)
        console.log(this.user)
      } else if (action === 'logout') {
        this.currentUser = null
        this.updateUser({
          currentUser: this.currentUser
        })
        localStorage.removeItem('user')
        netlifyIdentity.logout()
        this.$router.push('/account')
      }
    }
  }
}
</script>
    