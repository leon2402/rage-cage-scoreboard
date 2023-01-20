<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <span class="mr-2">RAGE CAGE SCOREBOARD</span>
      <span class="mr-2">Leon ist RAGE CAGE CHAMPION</span>
      <v-spacer></v-spacer>

      <v-btn
        text
        @click="toggleDialog()"
      >
        <span class="mr-2">Neuer Spieler</span>
      </v-btn>
    </v-app-bar>

    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="red lighten-2"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Click Me
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Neuer Spieler Name
        </v-card-title>

        <v-text-field
          v-model="newPlayerName"
          label="Neuer Spieler Name"
          persistent-hint
          required
        ></v-text-field>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="createUser()"
          >
            Hinzufügeen
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
    
    <v-main>
      <HelloWorld/>
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import { addDoc, collection } from "firebase/firestore"
import db from './firebase/init.js'

export default {
  name: 'App',

  components: {
    HelloWorld,
  },

  data: () => ({
    newPlayerName: "",
    dialog: false
  }),

  methods: { 
    toggleDialog() {
      this.dialog = !this.dialog
    },

    async createUser() {
      console.log(this.newPlayerName)
      if(this.newPlayerName) {
        // 'users' collection reference
        const colRef = collection(db, 'scores')
        // data to send
        const dataObj = {
          name: this.newPlayerName,
          score: 0
        }

        // create document and return reference to it
        const docRef = await addDoc(colRef, dataObj)

        // access auto-generated ID with '.id'
        console.log('Document was created with ID:', docRef.id)
        this.newPlayerName = ""
        this.dialog = false
      } 
    }
  }
};
</script>
