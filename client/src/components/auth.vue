<template>
    <div class="user">
        <div v-if="!user._id" class="d-flex ml-2 mt-1">
              <form v-if="hasAccount" @submit.prevent="login">
                  <input type="text" placeholder="username" v-model="username" autofocus/>
                  <input type="password" placeholder="password" v-model="password" />
                  <button class="btn-outline-secondary" type="submit">login</button>
              </form>
              <form v-else @submit.prevent="register">
                  <input type="text" placeholder="username" v-model="username" />
                  <input type="password" placeholder="password" v-model="password" />
                  <input type="password" placeholder="confirm password" v-model="passwordConfirm" />
                  <button class="btn-outline-secondary" type="submit">register</button>
              </form>
              <p class="ml-2 action" @click="hasAccount=!hasAccount">{{hasAccount ? 'or signup' : 'or login'}}</p>
              <hr>
        </div>
        <div v-else>
            <button class="logout btn-outline-secondary m-2" @click="$store.dispatch('logout')">logout</button>
        </div>
    </div>
</template>

<script>
export default {
  name: "user",
  mounted() {
    if (!this.user._id) {
      this.$store.dispatch('authenticate')
    }
  },
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
    login() {
      this.$store.dispatch("login", {
        username: this.username,
        password: this.password
      });
      this.username = "";
      this.password = "";
    },
    register() {
      if (this.password !== this.passwordConfirm) {
        return alert("PASSWORDS DON'T MATCH:\nplease confirm your password");
      }
      this.$store.dispatch("register", {
        username: this.username,
        password: this.password
      });
      this.username = "";
      this.password = "";
      this.passwordConfirm = "";
    }
  }
};
</script>
