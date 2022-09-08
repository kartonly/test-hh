<template>
  <div class="container">
    <header>
      <form class="search">
        <input class="form" type="text" v-model="search" name="search" placeholder="я ищу" />
        <button class="btn" type="submit" @click="find()">Ищем</button>
      </form>
      <div class="menu">
        <router-link to="/" >Все новости</router-link>
        <router-link to="/popular" >Обсуждаемые темы</router-link>
      </div>

      <div v-for="item in news" :key="item.id">
        <div class="card">
          <h4 class="card-header">{{ item.name }}</h4>
          <div class="card-body">
            <h5 class="card-title">{{ item.desc }}</h5>
            <p class="card-text">Категория {{ item.category.name }}</p>
            <router-link style="color:green" :to="adOpen(item.id)">Просмотр</router-link>
          </div>
        </div>
      </div>

      <div class="pages">
        <button class="btn" v-if="first_page" @click="sendPage(-1)">Назад</button>
        <div>Страница {{data.current_page}} из {{data.last_page}}</div>
        <button class="btn" v-if="last_page" @click="sendPage(1)">Вперед</button>
      </div>
  </header>
  </div>
</template>

<script>
import { getSomething } from "../api/get";

export default {
  name: "Main",
  data(){
    return {
      news: [],
      data:[],
      page: "",
      search: "",
      
      showError: false,
      loading: false,
      errorMessage: "",
    };
  },
  created() {
    getSomething(`api/v1/news`).then((resp) => {
      this.news = resp.data.data;
      this.data = resp.data;
      this.page = resp.data.current_page;
      this.loading = false;
    });
  },
  computed: {
    first_page: function () {
      if (this.data.current_page === 1) return false;
      else return true;
    },
    last_page: function () {
      if (this.data.current_page === this.data.last_page) return false;
      else return true;
    },
  },
  methods: {
    adOpen: function(id) {
        return `news/${id}`;
    },
    find() {
       this.$router.replace({ path: `/find/${this.search}` });
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
