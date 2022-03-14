<template>
  <v-contanier>
    <h1>Signup</h1>
    <v-text-field v-model="email" type="email" label="Email" />
    <v-text-field v-model="password" type="password" label="Password" />
    <v-text-field v-model="confirmPassword" type="password" label="ConfirmPassword" />
    <v-text-field v-model="name" type="text" label="Name" />
    <v-btn @click="signup">
      Sign up
    </v-btn>
    <v-btn @click="home">
      Home
    </v-btn>
    <div>
      {{ message }}
    </div>
  </v-contanier>
</template>

<script>
import { createUserWithEmailAndPassword, updateProfile } from '@firebase/auth'
import { collection, onSnapshot } from '@firebase/firestore'
import { auth, db } from '../plugins/firebase'
const userCollectionRef = collection(db, 'users')

export default {
  name: 'SignupPage',
  data () {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      message: ''
    }
  },
  mounted () {
    onSnapshot(userCollectionRef, (querySnapshot) => {
      this.users = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    })
  },
  methods: {
    signup () {
      if (this.email.trim() && this.password.trim() && this.name.trim()) {
        if (this.password === this.confirmPassword) {
          createUserWithEmailAndPassword(auth, this.email, this.password)
            .then((userCredential) => {
              const user = userCredential.user
              updateProfile(user, { displayName: this.name })
                .then(() => {
                  const user = auth.currentUser
                  this.message = user.displayName + 'さんのアカウントが作成されました。'
                  this.$store.dispatch('setUser', {
                    uid: user.uid,
                    displayName: user.displayName
                  })
                  this.$router.push('/')
                })
            })
            .catch((err) => {
              this.message = err.message
            })
        } else {
          this.message = 'パスワードが一致しません!'
        }
      }
    },
    home () {
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>
