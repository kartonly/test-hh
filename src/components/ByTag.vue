<template>
  <div class="container">
    <header>
      <div class="back-cont">
          <router-link class="back btn btn-primary" :to="main()">Назад</router-link>
      </div>
    </header>

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
  </div>
</template>

<script>
import { getSomething } from "../api/get";

export default {
  name: "ByTag",
  data(){
    return {
      news: [],
      data:[],
      page: "",
      
      showError: false,
      loading: false,
      errorMessage: "",
    };
  },
  created() {
    getSomething(`api/v1/news/byTags/${this.$route.params.id}`).then((resp) => {
      this.news = resp.data;
      this.data = resp.data;
      this.page = resp.data.current_page;
      this.loading = false;
    });
  },
  computed: {
  },
  methods: {
    adOpen: function(id) {
        return `news/${id}`;
    },
    main: function() {
        return `/`;
    }
    
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
