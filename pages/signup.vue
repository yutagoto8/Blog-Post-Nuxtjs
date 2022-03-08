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
    <div>
      {{ message }}
    </div>
  </v-contanier>
</template>

<script>
import { createUserWithEmailAndPassword } from '@firebase/auth'
import { addDoc, collection, onSnapshot } from '@firebase/firestore'
import { auth, db } from '../plugins/firebase'
const userCollectionRef = collection(db, 'users')

export default {
  name: 'SignupPage',
  data () {
    return {
      users: [],
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
        createUserWithEmailAndPassword(auth, this.email, this.password)
          .then((userCredential) => {
            this.message = 'アカウントが作成されました'
            userCredential.user.displayName = this.name
          })
          .catch((err) => {
            this.message = err.message
          })
        addDoc(userCollectionRef, {
          name: this.name,
          email: this.email
        }).then(() => {
          this.name = ''
          this.email = ''
        })
      } else {
        this.message = 'パスワードが一致しません!'
      }
    }
  }
}
</script>

<style>

</style>
