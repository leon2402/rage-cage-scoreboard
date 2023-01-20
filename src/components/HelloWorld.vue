<template>
  <v-container>
    <v-row>
      <v-col cols="12" v-for="(data, index) in scores" :key=scores[index].id>
        <v-card
          class="mx-auto"
          max-width="500"
          outlined
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-h5 mb-1">
                {{data.name}}
              </v-list-item-title>
              <v-list-item-title>Getrunkene Biere: {{data.score}}</v-list-item-title>
              <v-list-item-title>Gespielte Runden: {{data.runden}}</v-list-item-title>
              <v-list-item-title>BPR: {{data.score / data.runden}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-card-actions>
            <v-row>
              <v-col>
              <v-btn
                outlined
                rounded
                text
                @click="updateScores(data, 1)"
              >
                Ein Bier mehr
              </v-btn>
              </v-col>
              <v-col>
              <v-btn
                outlined
                rounded
                text
                @click="updateScores(data, -1)"
              >
                Ein Bier weniger
              </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
              <v-btn
                outlined
                rounded
                text
                @click="updateRounds(data, 1)"
              >
                Ein Runde mehr
              </v-btn>
              </v-col>
              <v-col>
              <v-btn
                outlined
                rounded
                text
                @click="updateRounds(data, -1)"
              >
                Ein Runde weniger
              </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { getDocs, query, collection, onSnapshot, doc, updateDoc } from "firebase/firestore"
  import db from '../firebase/init.js'

  export default {
    name: 'HelloWorld',

    data: () => ({
      scores: []
    }),

    created() {
      this.getScores()
      this.updateData()
    },

    methods: {
      async getScores() {
        const querySnap = await getDocs(query(collection(db, 'scores')));

        querySnap.forEach((doc) => {
          this.scores.push({
              id: doc.id,
              ...doc.data()
            })
        })
      },
      async updateData() {
        // use 'collection()' instead of 'doc()'
        onSnapshot(collection(db, 'scores'), (snap) => {
          snap.forEach((doc) => {
            this.scores.forEach((item, index) => {
              if(item.id === doc.id) {
                this.scores[index].score = doc.data().score
                this.scores[index].runden = doc.data().runden
              }
            })
          })
        })
      },
      async updateScores(data, number) {
        await updateDoc(doc(db, 'scores', data.id), {
          score: data.score + number
        })
      },
      async updateRounds(data, number) {
        await updateDoc(doc(db, 'scores', data.id), {
          runden: data.runden + number
        })
      }
    },
  }
</script>
