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
    <!-- <v-data-table
      :heders="heders"
      :items="comments"
      items-per-page="5"
      class="elevation-1"
    >
      <template slot="{comments}">
        <tbody>
          <tr v-for="comment in comments" :key="comment.id">
            <td v-if="comment.created_at">
              {{ $dateFns.format(comment.created_at.toDate(), 'yyyy/MM/dd') }}
            </td>
            <td>
              {{ comment.content }}
            </td>
          </tr>
        </tbody>
      </template>
    </v-data-table> -->
    <v-simple-table>
      <thead>
        <tr>
          <th class="text-left">
            Created_at
          </th>
          <th class="text-left">
            Comment
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="comment in comments" :key="comment.id">
          <td v-if="comment.created_at">
            {{ $dateFns.format(comment.created_at.toDate(), 'yyyy/MM/dd') }}
          </td>
          <td>
            {{ comment.content }}
          </td>
        </tr>
      </tbody>
    </v-simple-table>
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
      content: '',
      addCommentId: ''
    }
  },
  // computed: {
  //   heders () {
  //     return [
  //       { text: 'Created_at', align: 'center', value: 'created_at' },
  //       { text: 'Comment', align: 'center', value: 'content' }
  //     ]
  //   }
  // },
  computed: {
    sortedByCreatedAt () {
      return this.created_at.slice().sort((a, b) => {
        return a.created_at - b.created_at
      })
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
    this.addCommentId = this.$route.query.id
    const documentRef = doc(db, 'comments', this.addCommentId)
    getDoc(documentRef).then((doc) => {
      this.comments = doc.data()
    })
  },
  methods: {
    add () {
      if (this.content.trim()) {
        addDoc(userCollectionRef, {
          content: this.content,
          created_at: serverTimestamp(),
          addCommentId: this.$route.query.id
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
