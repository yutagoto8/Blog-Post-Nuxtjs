<template>
  <v-container>
    <v-row>
      <v-col v-for="blog in blogs" :key="blog.id" cols="12" sm="6" md="4">
        <v-text-title>
          {{ blog.title }}
        </v-text-title>
        <v-text-subtitle>
          Create_User: {{ blog.user }}
        </v-text-subtitle>
        <v-text v-if="blog.date">
          Created_at: {{ $dateFns.format(blog.date.toDate(), 'yyyy/MM/dd') }}
        </v-text>
        <v-text>{{ blog.contents }}</v-text>
      </v-col>
    </v-row>
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
      blogs: []
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
