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
          :to="'/inspire'"
          v-if="user"
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
          :to="'/inspire'"
          v-if="user"
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="'assignment'"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="'Receipts'"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="secondary" fixed app :clipped-left="clipped">
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>remove</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      fixed
    >
      <v-list>
        <v-list-tile @click.native="right = !right">
          <v-list-tile-action>
            <v-icon light>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      clipped: true,
      drawer: true,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Signal Management'
    }
  },
  computed: {
    ...mapState([
      'user'
    ]),
    items () {
      var items = [
        { icon: 'apps', title: 'Welcome', to: '/', auth: true },
        { icon: 'bubble_chart', title: 'Inspire', to: '/inspire', auth: typeof this.user !== typeof null }
      ]
      return items
    }
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
</style>
