<template>
  <v-container>
    <h1>Home</h1>
    <v-container>
      <v-row>
        <v-from @submit.prevent="add">
          <v-col>
            <v-text-field v-model="title" dense label="Title" />
          </v-col>
          <v-col>
            <v-text-field v-model="contents" dense label="Contents" />
          </v-col>
          <v-co>
            <v-btn type="submit">
              add
            </v-btn>
          </v-co>
        </v-from>
      </v-row>
    </v-container>
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
import { addDoc, collection, onSnapshot } from 'firebase/firestore'
import { db } from '../plugins/firebase'
const userCollectionRef = collection(db, 'blogs')

export default {
  name: 'IndexPage',
  data () {
    return {
      blogs: [],
      title: '',
      user: '',
      contents: ''
    }
  },
  mounted () {
    onSnapshot(userCollectionRef, (querySnapshot) => {
      this.blogs = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    })
  },
  methods: {
    add () {
      if (this.title.trim() && this.contents.trim()) {
        addDoc(userCollectionRef, {
          title: this.title,
          contents: this.contents
        }).then(() => {
          this.title = ''
          this.contens = ''
        })
      }
    }
  }
}
</script>
