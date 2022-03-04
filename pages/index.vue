<template>
<v-container>
  <h1>Home</h1>
  <v-row>
    <v-col v-for="blog in blogs" :key="blog.id" cols="12" sm="6" md="4">
      <v-card>
        <v-card-title>{{ blog.title }}</v-card-title>
        <v-card-subtitle>{{ blog.user }}</v-card-subtitle>
        <v-card-text>{{ blog.contents }}</v-card-text>
        <v-card-text v-if="user.birth" class="py-1">
          Birth: {{ $dateFns.format(user.birth.toDate().getDate(), 'yyyy/MM/dd') }}
        </v-card-text>
        <v-card-text v-if="user.language" class="py-1">
          <ul v-for="lang in user.language" :key="lang">
            <li>{{ lang }}</li>
          </ul>
        </v-card-text>
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
  },
}
</script>
