<template>
  <!--
    This is for the about page. Everything before the "GENERAL INFORMATION" page will always be shown
  -->
  <div>
    <v-layout justify-center align-center>
      <v-card width="50%">
        <v-card-title class="justify-center">UNIVERSITY OF NORTH ALABAMA TRAVEL POLICY</v-card-title>
        <v-container>
          <v-row>
            The travel policies of the University of North Alabama have been developed
            in accordance with Alabama law and Internal Revenue Service regulations
            and guidelines. These policies cover University employees, students and
            others who travel on approved, official University business.
          </v-row>
          <br />
          <v-row>
            At a minimum, employees must obtain prior approval of the immediate
            supervisor before traveling or obligating University funds. Some types of
            travel require additional authorization.
          </v-row>
          <br />
          <v-row>
            When traveling at the University of North Alabama’s expense, University
            employees should, in all cases, seek to obtain the lowest possible fares
            and rates by scheduling their travel in a manner that will be the most
            economical to the University. Personal travel for side trips is not
            reimbursed. It is the employee’s responsibility to obtain proper
            documentation of the travel costs when seeking reimbursement for incurred
            expenses.
          </v-row>
          <br />
          <v-row>
            In all cases, there must be a clear, documented business purpose for
            travel. Excessive or unjustifiable costs are not acceptable and will not
            be paid by or reimbursed from university funds
          </v-row>

          <br />
          <!--
            Here through the end of the v-card will only show every other time the blue "general information" 
              button is pressed
          -->
          <v-row>
            <v-btn
              v-on:click="generalText = !generalText"
              width="100%"
              color="primary"
            >GENERAL INFORMATION</v-btn>
          </v-row>
          <v-container v-if="generalText">
            <v-row>
              <v-btn v-on:click="travelStatus = ! travelStatus" width="100%">Travel Status</v-btn>
              <!-- 
                Here through the end of the v-container will only show every other time the "TRAVEL STATUS" 
                button is pressed
              -->
              <v-container v-if="travelStatus">
                <v-row>
                  Employees are in travel status when they leave their base.
                  Base is defined as the employees’ primary residence or work location
                  whichever is closest to the travel destination. Work location is defined
                  as the office location to which an employee is assigned.
                </v-row>
                <br />
              </v-container>
            </v-row>
            <br />
            <v-row>
              <v-btn v-on:click="travelClaim = !travelClaim" width="100%">Claim for Travel Expenses</v-btn>
              <!-- 
                Here through the end of the next v-container shows every other time the "CLAIM FOR TRAVEL EXPENSES"
                button is pressed
              -->
              <v-container v-if="travelClaim">
                <v-row>
                  Claim forms for In-State/Out-of-State Travel
                  Expenses are used to record all reimbursable employee travel costs and
                  note university paid travel costs. All claims for travel reimbursement
                  must be made on an In-State or Out-of-State travel form. These forms are
                  located at http://www.una.edu/controller/index.html. Requests for
                  reimbursement should be submitted within sixty (60) days after completion
                  of the trip. Original itemized receipts and other documentation of the
                  total costs of the trip must be submitted along with the claim form. When
                  a trip includes both in-state and out-of-state travel, the entire trip
                  should be reported on the out-of-state travel form with actual
                  expenditures claimed. If the claim form is submitted more than 60 days
                  after the traveler’s return, the reimbursement may become taxable income
                  to the employee. Federal tax regulations require that substantiation of
                  reimbursed expenses be made within a reasonable period. Under IRS
                  safe-harbor guidelines, that period is 60 days. Tax withholding will be
                  made from a subsequent salary payment. The form must be signed on the line
                  marked “Traveler’s Signature” by the employee who traveled and is seeking
                  reimbursement. The employee’s signature acknowledges acceptance and terms
                  of reimbursement. Any expenses covered by the university or a third party
                  should be noted on the travel form to provide clarity of the entire trip
                  expense.
                </v-row>
                <br />
              </v-container>
            </v-row>
            <br />
            <v-row>
              <v-btn
                v-on:click="documentation = !documentation"
                width="100%"
              >Documentation of Costs/Approval of Travel Reimbursement</v-btn>
              <!-- 
                Here through the end of the next container is shown every other time the "DOCUMENTATION OF 
                COSTS/APPROVAL OF TRAVEL REIMBURSEMENT" button is pressed.
              -->
              <v-container v-if="documentation">
                <v-row>
                  After returning
                  from official travel, employees are required to present original itemized
                  receipts for all actual travel expenses for which a claim is made. See
                  In-State and Out of State Guidelines. Conference registration fees paid by
                  a participating University employee are reimbursable following the
                  conference. To claim reimbursement, any conference brochures or other
                  literature documenting the expense, a registration receipt, including
                  dollar amount and method of payment, or other proof of payment must be
                  submitted along with the claim for travel form.
                </v-row>
                <br />

                <v-row>
                  <strong>
                    Approval of Travel Reimbursement by Supervisor, Dean, Director or
                    Department Head
                  </strong>The University requires that claims from University
                  Travel Expense Forms be signed by the supervisor (not a designee or stamp)
                  of the employee who is requesting reimbursement for official travel. By
                  signing the reimbursement form, the supervisor is certifying the expenses
                  have been used in accordance with the University of North Alabama’s Travel
                  Policies. Even when the traveler is the principal investigator or project
                  director of a grant, the claim for travel reimbursement must be signed by
                  his/her supervisor. Deans and department heads may establish more, but not
                  less, restrictive policies than what is required by the university, as
                  reimbursement approval from budgets for which they are responsible..
                </v-row>
                <br />
                <v-row>
                  <strong>Exceptions</strong>Generally, any exception to University travel policies should
                  have prior written authorization from the appropriate Dean or Executive
                  Council Member and the University Controller. Rules promulgated by the
                  State of Alabama have precedence.
                </v-row>
              </v-container>
            </v-row>
            <br />
            <v-row>
              <v-btn v-on:click="other = !other" width="100%">Other Information</v-btn>
              <!--
                Here through the end of the next v-container will shown only every other time the "OTHER 
                INFORMATION" button is pressed.
              -->
              <v-container v-if="other">
                <v-row>
                  <strong>Travel Reimbursement for Executive Officers</strong> President’s and Vice
                  Presidents’ request for travel reimbursement must be reviewed and approved
                  by the Vice President for Business & Financial Affairs. Reimbursement
                  requests from the Vice President for Business & Financial Affairs must be
                  reviewed and approved by the President.
                </v-row>
                <br />
                <v-row>
                  <strong>Contract and Grant Travel Reimbursement</strong>Travel reimbursement from
                  contract and grant funds require submission of the Grants and Contracts
                  Travel form found on the Grant Accounting website:
                  https://www.una.edu/grants-contracts/grants--contracts-accountingforms.html
                  .These forms must be signed by the principal investigator or project
                  director officially responsible for the contract or grant account; this
                  person may not defer this responsibility to anyone else. In addition, the
                  appropriate travel form must be signed by the investigator’s or project
                  director’s supervisor. All Reimbursement will be subject to the
                  University’s policies, unless the contract or grant prohibits
                  reimbursement of certain expenses.
                </v-row>
                <br />
                <v-row>
                  <strong>Travel During Faculty Professional Development Leave</strong> Prior approval
                  from the Provost, travel expenses incurred during a faculty professional
                  development leave period may be reimbursed if they are connected with
                  official travel in the performance of University duties.
                </v-row>
                <br />
                <v-row>
                  <strong>Travel Expenses Advancement</strong> The University does not advance funds for
                  travel expenses for employee travel; with the exception of those
                  pre-authorized expenses paid with a university purchase order or
                  university p-card.
                </v-row>
                <br />
                <v-row>
                  <strong>Multiple Reimbursements Channels</strong> No employee may be reimbursed by both
                  the University and another organization for the same travel expenses.
                </v-row>
                <br />
                <v-row>
                  <strong>Special Travel Requirements</strong> If an employee has special travel requirements
                  that are not covered by the above policies, contact the University’s
                  Controller’s Office prior to travel for approval.
                </v-row>
                <br />
                <v-row>
                  <strong>Early Arrival/Early Departure</strong> An employee chooses to arrive early for
                  a conference or meeting to take advantage of reduced airfare, the employee
                  must reconcile the standard economy airfare with the reduced airfare, the
                  additional hotel and meal expenses, and other expenses that were incurred
                  because of early arrival. This reconciliation should be submitted with the
                  claim for travel expenses form.
                </v-row>
                <br />
                <v-row>
                  <strong>Interrupted Travel</strong> The employee assumes all additional costs associated
                  with deviating from the official travel itinerary if the employee
                  interrupts the official travel for reasons of personal convenience.
                </v-row>
                <br />
                <v-row>
                  <strong>Cancellation of Trip</strong> The traveler is responsible for obtaining credit
                  for all expenses. Please contact the Controller’s Office at ext. 4232 or
                  via e-mail when an official trip has to be cancelled to prevent potential
                  reimbursement problems.
                </v-row>
              </v-container>
            </v-row>
          </v-container>
        </v-container>
      </v-card>
    </v-layout>
  </div>
</template>

<script>
export default {
  data: () => ({
    //Determines if the "GENERAL INFORMATION" v-card and all v-containers past this shows
    generalText: false,
    //Determines if the "TRAVEL STATUS" v-carcontainer shows
    travelStatus: false,
    //Determines if the "CLAIM FOR TRAVEL EXPENSES" v-container shows
    travelClaim: false,
    //Determines if the "DOCUMENTATION OF COSTS/APPROVAL of TRAVEL REIMBURSEMENT" v-container shows
    documentation: false,
    //Determines if the "OTHER INFORMATION" v-container shows
    other: false
  })
};
</script>