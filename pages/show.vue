<template>
  <v-container>
    <div cols="12" sm="6" md="4">
      <v-card>
        <v-card-title class="red--text">
          {{ blog.title }}
        </v-card-title>
        <v-card-text>
          Create_User: {{ blog.user }}
        </v-card-text>
        <v-card-text v-if="blog.date">
          Created_at: {{ $dateFns.format(blog.date.toDate(), 'yyyy/MM/dd') }}
        </v-card-text>
        <v-card-text>{{ blog.contents }}</v-card-text>
      </v-card>
    </div>
    <br>
    <v-form @submit.prevent="add">
      <v-col>
        <v-textarea v-model="content" dense label="Comment" />
      </v-col>
      <v-btn type="submit">
        ADD
      </v-btn>
    </v-form>
    <br>
    <div v-for="comment in comments" :key="comment.id" cols="12" sm="6" md="4">
      <v-card>
        <v-card-text>
          Comment: {{ comment.content }}
        </v-card-text>
        <v-card-text v-if="comment.created_at">
          Created_at: {{ $dateFns.format(comment.created_at.toDate(), 'yyyy/MM/dd') }}
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import { addDoc, collection, doc, getDoc, onSnapshot, serverTimestamp } from 'firebase/firestore'
import { db } from '../plugins/firebase'

// const userCollectionRef = collection(db, 'blogs')

const userCollectionRef = collection(db, 'comments')

export default {
  name: 'ShowPage',
  data () {
    return {
      blog: {},
      blogId: '',
      comments: [],
      content: ''
    }
  },
  mounted () {
    onSnapshot(userCollectionRef, (querySnapshot) => {
      this.comments = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    })
    this.blogId = this.$route.query.id
    const docRef = doc(db, 'blogs', this.blogId)
    getDoc(docRef).then((doc) => {
      this.blog = doc.data()
    })
  },
  methods: {
    add () {
      if (this.content.trim()) {
        addDoc(userCollectionRef, {
          content: this.content,
          created_at: serverTimestamp()
        }).then(() => {
          this.content = ''
        })
      }
    }
  }
}
</script>

<style>
</style>
