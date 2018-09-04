<template>
    <div class="user">
        <div v-if="!user._id">
            <div v-if="hasAccount">
                <form @submit.prevent="login">
                    <input type="text" placeholder="username" v-model="username" autofocus/>
                    <input type="password" placeholder="password" v-model="password" />
                    <button type="submit">login</button>
                </form>
                    <button @click="hasAccount=false">register</button>
            </div>
            <div v-else>
                <form @submit.prevent="register">
                    <input type="text" placeholder="username" v-model="username" @focusout="userExists(username)" />
                    <input type="password" placeholder="password" v-model="password" />
                    <input type="password" placeholder="confirm password" v-model="passwordConfirm" />
                    <button type="submit">register</button>
                </form>
                    <button @click="hasAccount=true">login</button>
            </div>
        </div>
        <div v-else>
            <h1>{{user.username}}</h1>
            <button @click="logout">logout</button>
        </div>
    </div>
</template>

<script>
export default {
  name: "user",
  data() {
    return {
      hasAccount: true,
      username: "",
      password: "",
      passwordConfirm: ""
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    login(event) {
        this.$store.dispatch('login', {
            username: this.username,
            password: this.password
        })
    },
    register(event) {
      if (this.password !== this.passwordConfirm) {
        return alert("PASSWORDS DON'T MATCH:\nplease confirm your password");
      }
      this.$store.dispatch("register", {
        username: this.username,
        password: this.password
      })
    },
    userExists(name) {
      this.$store.dispatch("userExists", name);
    },
    logout(){
      this.$store.commit('logout', {})
    }
  }
};
</script>

<style>
</style>
