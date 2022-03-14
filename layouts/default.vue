<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      color="light-green"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title class="text-h6 ml-6 ms-3" v-text="title" />
      <v-spacer />
      <div v-if="user" class="text-ml5 ms-2">
        {{ user.displayName }}さん&ensp;
      </div>
      <div v-if="user">
        <v-btn flat to="/login" @click="logout">
          LOGOUT
        </v-btn>
      </div>
      <div v-else>
        <v-btn flat to="/login">
          LOGIN
        </v-btn>
      </div>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>Copyright (C)2012-2013 NEOJAPAN,Inc. All Rights Reserved.</span>
    </v-footer>
  </v-app>
</template>

<script>
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { collection, onSnapshot } from '@firebase/firestore'
import { auth, db } from '../plugins/firebase'

const userCollectionRef = collection(db, 'blogs')

export default {
  name: 'DefaultLayout',
  data () {
    return {
      // user: '',
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Home',
          to: '/'
        }
        // {
        //   icon: 'mdi-chart-bubble',
        //   title: 'Login',
        //   to: '/login'
        // }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'BlogPost'
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  mounted () {
    // this.user = auth.currentUser
    onAuthStateChanged(auth, (user) => {
      // this.user = user
      if (user) {
        this.$store.dispatch('setUser', {
          uid: user.uid,
          displayName: user.displayName
        })
      }
      // this.user = this.$store.state.user
    })
    onSnapshot(userCollectionRef, (querySnapshot) => {
      this.blogs = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    })
  },
  methods: {
    logout () {
      signOut(auth).then(() => {
        this.$store.dispatch('setUser', null)
      })
    }
  }
}
</script>
