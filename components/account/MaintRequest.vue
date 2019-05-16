<template>
  <v-layout row>
    <v-flex>
      <v-form name="maintenanceRequest" ref="form" v-model="valid" method="POST" data-netlify="true" data-netlify-honeypot="bot-field">
        <p class="hidden">
          <label>Don’t fill this out if you're human: <input name="bot-field" /></label>
        </p>
        <input type="hidden" name="form-name" value="maintenanceRequest" />
        <v-card class="mt-5">
          <v-card-title>
            <div class="headline">Maintenance Request</div>
          </v-card-title>
          <div class="ma-3">
            <v-text-field
              v-model="property"
              label="Rental Property Address"
              name="propertyAddress"
              required
            ></v-text-field>
            <v-text-field
              v-model="yourName"
              label="Your Name"
              name="yourName"
              required
            ></v-text-field>
            <v-text-field
              v-model="yourPhone"
              label="Phone Number"
              name="yourPhone"
              :mask="phoneMask"
              prepend-icon="phone"
              required
            ></v-text-field>
            <v-textarea
              v-model="maintenanceIssue"
              label="Please describe maintnenance issue in detail"
              name="maintenanceIssue"
              auto-grow
              box
              rows="10"
              required
            ></v-textarea>
            <v-select
              v-model="priority"
              name="priority"
              :items="priorityItems"
              label="Priority"
            ></v-select>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="clear">clear</v-btn>
              <v-btn
                :disabled="!valid"
                type="submit"
              >
                submit
              </v-btn>
            </v-card-actions>
          </div>
        </v-card>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  name: 'MaintRequest',
  data () {
    return {
      property: '',
      date: null,
      formError: '',
      valid: false,
      modal: false,
      maintenanceIssue: '',
      priority: '',
      priorityItems: ['Low', 'Medium', 'High'],
      yourName: '',
      yourPhone: '',
      phoneMask: 'phone'
    }
  },
  computed: {
    invalidEmail () {
      return false // !this.email.includes('@')
    },
    invalidPassword () {
      return false // !this.password.length > 12
    }
  },
  methods: {
    signup () {
      this.formError = ''
    },
    updateField () {
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>

<style lang="css" scoped>
  .hidden {
    visibility: hidden;
  }
</style>
