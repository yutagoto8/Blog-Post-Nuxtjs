<template>
  <v-container>
    <div>
      <v-col cols="12" sm="6" md="4">
        <v-card-title>
          {{ id }}
        </v-card-title>
        <v-card-subtitle>
          <!-- Create_User: {{ blogs.id.user }} -->
        </v-card-subtitle>
        <!-- <v-card-text v-if="blogs.id.date">
          Created_at: {{ $dateFns.format(blog.id.date.toDate(), 'yyyy/MM/dd') }}
        </v-card-text> -->
        <!-- <v-card-text>{{ blogs.id.contents }}</v-card-text> -->
      </v-col>
    </div>
  </v-container>
</template>

<script>
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../plugins/firebase'

const userCollectionRef = collection(db, 'blogs')

export default {
  name: 'ShowPage',
  data () {
    return {
      blogs: [],
      id: this.$route.query.id
    }
  },
  mounted () {
    onSnapshot(userCollectionRef, (querySnapshot) => {
      this.blogs = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    })
  }
}
</script>

<style>

</style>
