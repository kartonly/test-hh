<template>
  <div class="container">
   <h1>Админ-панель</h1>
   <button class="btn" @click="logout">Выйти</button>

    <div v-for="item in news" :key="item.id">
        <div class="card">
          <h4 class="card-header">{{ item.name }}</h4>
          <div class="card-body">
            <h5 class="card-title">{{ item.desc }}</h5>
            <router-link style="color:green" :to="adOpen(item.id)">Просмотр</router-link>
            <button
                  class="btn"
                  @click="deleteNews(item.id)"
                >
                  Удалить
                </button>
          </div>
        </div>
      </div>

  </div>
</template>

<script>
import { getSomething } from "../api/get.js";
import { postSomething } from "../api/post.js";
import { logout } from "../api/auth.js";

export default {
  name: "Admin",
  data(){
    return {
      news: [],
    };
  },
  created() {
    getSomething(`api/v1/news`).then((resp) => {
      this.news = resp.data.data;
      this.loading = false;
    });
  },
  computed: {
  },
  methods: {
     adOpen: function(id) {
        return `news/${id}`;
    },
    deleteNews(id) {
      postSomething(`api/v1/admin/deleteNews/${id}`, id).then(() => {
        location.reload();
      });
    },
    logout() {
      this.loading = true;
      logout({
      })
        .then(() => {
          this.$router.push("/");
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
