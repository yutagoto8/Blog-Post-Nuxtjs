<template>
  <v-container>
    <h1>Home</h1>
    <v-row>
      <v-col v-for="blog in blogs" :key="blog.id" cols="12" sm="6" md="4">
        <v-card>
          <v-card-title>Title: {{ blog.title }}</v-card-title>
          <v-card-subtitle>Create_User: {{ blog.user }}</v-card-subtitle>
          <!-- <v-card-text>
            Create_date: {{ $dateFns.format(blog.timestamp.toDate().getDate(), 'yyyy/MM/dd') }}
          </v-card-text> -->
          <v-card-text>{{ blog.contents }}</v-card-text>
          <!-- 削除処理 -->
          <!-- <v-card-actions>
            <v-spacer />
            <v-btn icon @click="remove(user.id)">
              <v-icon color="blue">
                mdi-delete
              </v-icon>
            </v-btn>
          </v-card-actions> -->
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../plugins/firebase'
const userCollectionRef = collection(db, 'blogs')

export default {
  name: 'IndexPage',
  data () {
    return {
      blogs: [],
      tiitle: '',
      user: '',
      contens: ''
    }
  },
  mounted () {
    onSnapshot(userCollectionRef, (querySnapshot) => {
      this.blogs = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    })
  }
}
</script>
