<template>
  <v-layout row>
    <v-flex>
      <div id=netlify-modal>
        <div v-if="isLoggedIn">
          <p>Hello {{ username }}</p>
          <p>
            <button @click="triggerNetlifyIdentityAction('logout')">Log Out</button>
          </p>
        </div>  
        <div v-else>
          <p>You are not logged in.</p>
          <p>
            <button @click="triggerNetlifyIdentityAction('login')">Log In</button>
            <button @click="triggerNetlifyIdentityAction('signup')">Sign Up</button>
          </p>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import netlifyIdentity from "netlify-identity-widget"
import { mapGetters, mapActions } from "vuex"

netlifyIdentity.init({
  container: '#netlify-modal'
})

export default {
  name: 'IdentityForm',
  computed: {
    ...mapGetters("user", {
      isLoggedIn: "getUserStatus",
      user: "getUser"
    }),
    username() {
      return this.user ? this.user.username : ", there!";
    }
  },
  data () {
    return {
      currentUser: null
    }
  },
  methods: {
    ...mapActions("user", {
      updateUser: "updateUser"
    }),
    triggerNetlifyIdentityAction(action) {
      if (action == "login" || action == "signup") {
        netlifyIdentity.open(action);
        netlifyIdentity.on(action, user => {
          this.currentUser = {
            username: user.user_metadata.full_name,
            email: user.email,
            access_token: user.token.access_token,
            expires_at: user.token.expires_at,
            refresh_token: user.token.refresh_token,
            token_type: user.token.token_type
          };
          this.updateUser({
            currentUser: this.currentUser
          });
          netlifyIdentity.close();
        });
      } else if (action == "logout") {
        this.currentUser = null;
        this.updateUser({
          currentUser: this.currentUser
        });
        netlifyIdentity.logout();
        this.$router.push({ name: "Home" });
      }
    }
  }
}
</script>
    