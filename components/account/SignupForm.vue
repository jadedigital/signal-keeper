<template>
  <v-layout row>
    <v-flex>
      <v-form name="apply" ref="form" v-model="valid" netlify>
        <v-card class="mt-5">
          <v-card-title>
            <div class="headline">Property</div>
          </v-card-title>
          <div class="ma-3">
            <v-text-field
              v-model="property"
              label="Property applying for"
              required
            ></v-text-field>
            <v-dialog
              ref="dialog"
              v-model="modal"
              :return-value.sync="date"
              persistent
              lazy
              full-width
              width="290px"
            >
              <v-text-field
                slot="activator"
                v-model="date"
                label="Requested Move In Date"
                prepend-icon="event"
                readonly
                required
              ></v-text-field>
              <v-date-picker v-model="date" scrollable>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
              </v-date-picker>
            </v-dialog>
            <v-select
              v-model="rentalLength"
              :items="rentalLengthItems"
              label="Rental Term Length"
            ></v-select>
          </div>
        </v-card>
        <v-card class="mt-5">
          <v-card-title>
            <div class="headline">Applicant's Personal Info</div>
          </v-card-title>
          <div class="ma-3">
            <v-text-field
              v-model="name"
              label="Applicant's Name"
              :rules="nameRules"
              required
            ></v-text-field>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
            <v-text-field
              v-model="phone"
              name="phone"
              :mask="phoneMask"
              label="Phone Number"
              single-line
              prepend-icon="phone"
            ></v-text-field>
            <v-text-field
              v-model="secondName"
              label="Second Applicant's Name"
              :rules="nameRules"
              required
            ></v-text-field>
            <v-text-field
              v-model="secondCurrentAddress"
              label="Current Address"
              required
            ></v-text-field>
            <v-text-field
              v-model="secondEmail"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
            <v-text-field
              v-model="secondPhone"
              name="phone"
              :mask="phoneMask"
              label="Phone Number"
              single-line
              prepend-icon="phone"
            ></v-text-field>
            <v-text-field
              v-model="thirdName"
              label="Third Applicant's Name"
              :rules="nameRules"
              required
            ></v-text-field>
            <v-text-field
              v-model="thirdCurrentAddress"
              label="Current Address"
              required
            ></v-text-field>
            <v-text-field
              v-model="thirdEmail"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
            <v-text-field
              v-model="thirdPhone"
              name="phone"
              :mask="phoneMask"
              label="Phone Number"
              single-line
              prepend-icon="phone"
            ></v-text-field>
            <v-textarea
              v-model="dependants"
              auto-grow
              box
              label="Names of Dependants"
              rows="10"
            ></v-textarea>
            <v-radio-group v-model="pets" :mandatory="true">
              <template v-slot:label>
                <div>Do you have any <strong>pets?</strong></div>
              </template>
              <v-radio label="Yes" value="yes"></v-radio>
              <v-radio label="No" value="no"></v-radio>
            </v-radio-group>
            <v-textarea
              v-model="petDescription"
              auto-grow
              box
              label="Please describe type and number of pets"
              rows="10"
            ></v-textarea>
          </div>
        </v-card>
        <v-card class="mt-5">
          <v-card-title>
            <div class="headline">Rental History</div>
          </v-card-title>
          <div class="ma-3">
            <v-text-field
              v-model="currentAddress"
              label="Current Address"
              required
            ></v-text-field>
            <v-text-field
              v-model="currentLandlord"
              label="Current Landlord"
              required
            ></v-text-field>
            <v-text-field
              v-model="landlordPhone"
              label="Landlord Phone Number"
              :mask="phoneMask"
              single-line
              required
            ></v-text-field>
            <v-textarea
              v-model="reasonMoving"
              auto-grow
              box
              label="Reason for moving"
              rows="10"
            ></v-textarea>
            <v-text-field
              v-model="previousAddress"
              label="Previous Address 1"
            ></v-text-field>
            <v-text-field
              v-model="previousLandlord"
              label="Previous Landlord 1"
            ></v-text-field>
            <v-text-field
              v-model="previousLandlordPhone"
              label="Previous Landlord Phone Number 1"
              :mask="phoneMask"
              single-line
            ></v-text-field>
            <v-text-field
              v-model="previousAddress2"
              label="Previous Address 2"
            ></v-text-field>
            <v-text-field
              v-model="previousLandlord"
              label="Previous Landlord 2"
            ></v-text-field>
            <v-text-field
              v-model="previousLandlordPhone2"
              label="Previous Landlord Phone Number 2"
              :mask="phoneMask"
              single-line
            ></v-text-field>
          </div>
        </v-card>
        <v-card class="mt-5">
          <v-card-title>
            <div class="headline">Employment Details</div>
          </v-card-title>
          <div class="ma-3">
            <v-text-field
              v-model="employer"
              label="Employer"
            ></v-text-field>
            <v-text-field
              v-model="position"
              label="Position"
            ></v-text-field>
            <v-text-field
              v-model="dateHired"
              label="Date Hired"
            ></v-text-field>
            <v-text-field
              v-model="supervisorName"
              label="Supervisor's Name"
            ></v-text-field>
            <v-text-field
              v-model="supervisorPhone"
              label="Supervisor's Phone"
            ></v-text-field>
            <v-text-field
              v-model="salary"
              label="Salary"
            ></v-text-field>
          </div>
        </v-card>
        <v-card class="mt-5">
          <v-card-title>
            <div class="headline">Other Sources of Income</div>
          </v-card-title>
          <div class="ma-3">
            <div>Do you receive income from any of the following sources:</div>
            <v-checkbox v-model="studentLoan" label="Student Loans" value="studentLoan"></v-checkbox>
            <v-checkbox v-model="pension" label="Pension Benefits" value="pension"></v-checkbox>
            <v-checkbox v-model="socialAssistance" label="Social Assistance" value="socialAssistance"></v-checkbox>
            <v-textarea
              v-model="otherIncomeContact"
              auto-grow
              box
              label="Please provide contact persons who could verify the amount of income you receive"
              rows="10"
            ></v-textarea>
          </div>
        </v-card>
        <v-card>
          <v-card-title>
            <div class="headline">Certification</div>
          </v-card-title>
          <div class="ma-3">
            <v-checkbox
              v-model="checkbox"
              :rules="checkboxRules"
              label="YES, I certify that the information supplied above is true and correct, and that I give permission to the Landlord or agent for the Landlord to verify that the information provided above is true. Any false or misleading statements made in this application may be cause for immediate termination of tenancy."
              required
            ></v-checkbox>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="clear">clear</v-btn>
              <v-btn
                :disabled="!valid"
                @click="signup"
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
  name: 'SignupForm',
  data () {
    return {
      name: '',
      secondName: '',
      thirdName: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length >= 4) || 'Name must be at least 4 characters'
      ],
      email: '',
      secondEmail: '',
      thirdEmail: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Name must be at least than 6 characters'
      ],
      passwordMask: true,
      phone: '',
      secondPhone: '',
      thirdPhone: '',
      phoneMask: 'phone',
      property: '',
      date: null,
      formError: '',
      valid: false,
      modal: false,
      currentAddress: '',
      rentalLength: '',
      rentalLengthItems: ['6 Months', '12 Months', '18 Months', '24 Months', '36 Months'],
      currentLandlord: '',
      landlordPhone: '',
      reasonMoving: '',
      dependants: '',
      pets: '',
      petDescription: '',
      previousAddress: '',
      previousAddress2: '',
      previousLandlord: '',
      previousLandlord2: '',
      previousLandlordPhone: '',
      previousLandlordPhone2: '',
      employer: '',
      position: '',
      dateHired: '',
      supervisorName: '',
      supervisorPhone: '',
      salary: '',
      socialAssistance,
      pension: '',
      studentLoan: '',
      otherIncomeContact: ''
    }
  },
  computed: {
    newData () {
      var data = {
        displayName: this.name,
        premission: 'tenant',
        status: 'pending',
        image: ''
      }
      return data
    },
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
