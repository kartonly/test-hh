<template>
  <div class="container">
    <header>
        <div class="back-cont">
          <router-link class="back btn btn-primary" :to="main()">Назад</router-link>
        </div>
        <h1>Популярные теги</h1>
      </header>

      <div class="card" v-for="item in tags" :key="item.id">
        <div class="card-header">
          <router-link style="color:green" :to="open(item.id)">{{item.name}}</router-link>
        </div>
      </div>

  
  </div>
</template>

<script>
import { getSomething } from "../api/get";

export default {
  name: "Popular",
  data(){
    return {
      tags:[],
      
      showError: false,
      loading: false,
      errorMessage: "",
    };
  },
  created() {
    getSomething(`api/v1/news/popular`).then((resp) => {
      this.tags = resp.data;
      this.loading = false;
    });
  },
  computed: {
  },
  methods: {
    open: function(id) {
        return `byTag/${id}`;
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
