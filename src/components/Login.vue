<template>
  <div class="container">
    <form>
      <h1 class="h3 mb-3 fw-normal">Войти в систему</h1>

      <div class="form-floating">
        <input
          type="email"
          class="form-control"
          id="email"
          v-model="email"
          placeholder="name@example.com"
        />
        <label for="email">Email</label>
      </div>
      <div class="form-floating">
        <input
          type="password"
          class="form-control"
          id="password"
          v-model="password"
          placeholder="Password"
        />
        <label for="password">Пароль</label>
      </div>
    </form>
    
    <button class="btn_border w-100 mt-3" @click="sendUser()">Войти</button>
    
  </div>
</template>

<script>
import { login } from "../api/auth.js";

export default {
  name: "Login",
  data(){
    return {
      email: "",
      password: "",
    };
  },
  created() {
  },
  computed: {
  },
  methods: {
    sendUser() {
      this.loading = true;
      login({
        email: this.email,
        password: this.password,
      })
        .then(() => {
          this.$router.push("/admin");
          location.reload();
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
          
        });
    },
  },
};
</script>


<style>
  .menu {
    margin: 2%;
  }
  .filter{
    margin: 2%;
  }
  .filter button{
    margin: 1%;
  }
  .filter select{
    margin-left: 4%;
  }
  .filter label{
    margin-left: 1%;
  }
  .menu a{
    text-decoration: none;
    color:rgb(0, 14, 39);
    font-size: 25px;
    padding-left: 15px;
    padding-right: 15px;
    text-align: center;
  }
  .pages {
    margin: 2%;
    display: flex;
    justify-content: space-around;
  }
</style>
