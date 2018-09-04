<template>
    <div class="user">
        <div v-if="!user._id">
            <div v-if="hasAccount" class="login">
                <form @submit.prevent="login">
                    <input type="text" placeholder="username" v-model="username" autofocus/>
                    <input type="password" placeholder="password" v-model="password" />
                    <button type="submit">login</button>
                </form>
                    <span>or</span>
                    <button @click="hasAccount=false">register</button>
            </div>
            <div v-else class="register">
                <form @submit.prevent="register">
                    <input type="text" placeholder="username" v-model="username" @focusout="userExists(username)" />
                    <input type="password" placeholder="password" v-model="password" />
                    <input type="password" placeholder="confirm password" v-model="passwordConfirm" />
                    <button type="submit">register</button>
                </form>
                    <span>or</span>
                    <button @click="hasAccount=true">login</button>
            </div>
        </div>
        <div v-else>
            <h1>{{user.username}}</h1>
            <button class="logout" @click="logout">logout</button>
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
      this.$store.commit('setPlaylist', {})
    }
  }
};
</script>

<style scoped>
.logout {
  position: fixed;
  z-index: 2;
  top: 0;
  right: 0;
}
h1 {
  position: fixed;
}
.login, .register {
  display: flex;
}
.login form button {
  background-color: #5cb85c;
}
.register form button {
  background-color: #428bca;
}
</style>
