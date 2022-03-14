<template>
  <v-container>
    <h1>Home</h1>
    <br>
    <v-container v-if="user">
      <h3>{{ user.displayName }}さんようこそ</h3>
      <br>
      <v-form @submit.prevent="add">
        <v-col>
          <v-text-field v-model="title" dense label="Title" />
        </v-col>
        <v-col>
          <v-textarea v-model="contents" dense label="Contents" />
        </v-col>
        <v-col>
          <v-btn type="submit">
            add
          </v-btn>
        </v-col>
      </v-form>
    </v-container>
    <v-row>
      <v-col v-for="blog in blogs" :key="blog.id" cols="12" sm="6" md="4">
        <v-card>
          <v-card-title>
            <router-link to="/show">
              <router-link :to="{name:'show', query:{id: blog.id}}">
                {{ blog.title }}
              </router-link>
            </router-link>
          </v-card-title>
          <v-card-subtitle>
            <v-icon>mdi-account</v-icon>
            Create_User: {{ blog.user }}
          </v-card-subtitle>
          <v-card-text v-if="blog.date">
            <v-icon>mdi-alarm</v-icon>
            Created_at: {{ $dateFns.format(blog.date.toDate(), 'yyyy/MM/dd') }}
          </v-card-text>
          <v-card-text>{{ blog.contents }}</v-card-text>
          <v-card-actions v-if="user && user.displayName === blog.user">
            <v-spacer />
            <v-btn icon @click="remove(blog.id)">
              <v-icon color="blue">
                mdi-delete
              </v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore'
// import { onAuthStateChanged } from 'firebase/auth'
import { db } from '../plugins/firebase'

const userCollectionRef = collection(db, 'blogs')

export default {
  name: 'IndexPage',
  data () {
    return {
      blogs: [],
      title: '',
      // user: '',
      contents: ''
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  mounted () {
    // // this.user = auth.currentUser
    // onAuthStateChanged(auth, (user) => {
    //   // this.user = user
    //   if (user) {
    //     this.$store.dispatch('setUser', {
    //       uid: user.uid,
    //       displayName: user.displayName
    //     })
    //   }
    //   this.user = this.$store.state.user
    // })
    const q = query(userCollectionRef, orderBy('date', 'desc'))
    onSnapshot(q, (querySnapshot) => {
      this.blogs = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    })
  },
  methods: {
    add () {
      if (this.title.trim() && this.contents.trim()) {
        addDoc(userCollectionRef, {
          title: this.title,
          contents: this.contents,
          date: serverTimestamp(),
          user: this.user.displayName
        }).then(() => {
          this.title = ''
          this.contens = ''
        })
      }
    },
    remove (id) {
      const userDocumentRef = doc(db, 'blogs', id)
      deleteDoc(userDocumentRef)
    }
    // logout () {
    //   signOut(auth).then(() => {
    //     this.$store.dispatch('setUser', null)
    //   })
    // this.$router.push('/')
  }
}
</script>
