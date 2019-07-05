<template>
  <v-app dark>
    <v-navigation-drawer
      :mini-variant.sync="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile
          router
          :to="'/'"
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="'apps'"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="'Welcome'"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          router
          :to="'/apply'"
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="'assignment_ind'"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="'Apply To Rent'"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          router
          :to="'/maintenance'"
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="'build'"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="'Maintenance Request'"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          router
          :to="'/account'"
          v-if="user"
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="'person'"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="'Account'"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          router
          :to="'/expense'"
          v-if="user"
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="'assignment'"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="'Add Expense'"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar class="signal-toolbar" color="secondary" flat fixed app :clipped-left="clipped">
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span class="ml-3">&copy; Signal Property Management Inc. 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      clipped: true,
      drawer: true,
      fixed: false,
      miniVariant: false,
      right: true,
      title: 'Signal Property Management'
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'getUserStatus',
      user: 'getUser'
    }),
    items () {
      var items = [
        { icon: 'apps', title: 'Welcome', to: '/', auth: true },
        { icon: 'bubble_chart', title: 'Inspire', to: '/inspire', auth: typeof this.user !== typeof null }
      ]
      return items
    }
  },
  mounted: function () {
    let theUser = window.localStorage.getItem('user')
    this.$store.commit('setUser', theUser)
  }
}
</script>

<style lang="css">
.flex-table {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.flex-table-item {
  flex: 1;
}
.flex-table-item-primary {
  flex: 3;
}

.signal-toolbar {
  border-bottom: solid 1px #fff!important
}
</style>
