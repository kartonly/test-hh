<template>
  <div class="container">
    <div class="back-cont">
        <router-link v-if="!admin" class="back btn btn-primary" :to="main()">Назад</router-link>
    </div>
    <div class="back-cont">
        <router-link v-if="admin" class="back btn btn-primary" :to="toAdmin()">Назад</router-link>
    </div>
    <div class="card">
        <div class="card-header"> <h2>{{news.name}}</h2> </div>
        <div class="card-body">
          <img  :src="urlBase + news.photo" style="width:200px" />
            <h5 class="card-title">{{news.desc}}</h5>
            <h4>Теги:</h4>
            <div v-for="item in news.tags" :key="item.id">
              <p>{{item.name}}</p>
            </div>
            <p>{{news.text}}</p>
        </div>
    </div>

<h2>Комментарии:</h2>

  <div class="card" v-for="item in news.comments" :key="item.id">
  <div class="card-header">
    {{item.commentator}}
  </div>
  <div class="card-body">
    <blockquote class="blockquote mb-0">
      <p>{{item.text}}</p>
    </blockquote>
    <button class="btn btn-submit btn-primary" v-if="admin" @click="deleteComment(item.id)"> Удалить</button>
  </div>
</div>

  <h3>Добавить комментарий</h3>
  <form>
      <div class="form-floating">
        <input
          type="text"
          class="form-control"
          id="commentator"
          placeholder="Ваше имя"
          v-model="commentator"
        />
        <label for="name">Ваше имя</label>
      </div>
      <div class="form-floating">
        <textarea
          type="text"
          class="form-control"
          id="text"
          placeholder="Комментарий"
          v-model="text"
        ></textarea>
        <label for="text">Комментарий</label>
      </div>
      <div v-show="showError" class="mt-2 alert alert-danger" >
        {{ this.errorMessage }}
      </div>
    </form>
     <button class="w-100 btn btn-submit btn-primary" @click="sendComment()">
      Добавить объявление
    </button>

   </div>
</template>

<script>
import { getSomething } from "../api/get";
import { postSomething } from "../api/post.js";

export default {
  name: "NewsPage",
  inject: ["reload"],
  data() {
    return {
      news:{},
      url:"http://localhost:8080",
      commentator: "",
      text: "",

      showError: false,
      loading: false,
      errorMessage: "",
    };
  },
  computed: {
    urlBase(){
        return this.url
    },
    admin: function () {
      if (localStorage.getItem("token")) return true;
      else return false;
    },
  },

  created() {
    getSomething(`api/v1/news/one/${this.$route.params.id}`).then((response) => {
      this.news = response.data;
    });
  },
  
  methods: {
    deleteComment(id) {
      postSomething(`api/v1/admin/deleteComment/${id}`, id).then(() => {
        location.reload();
      });
    },
    sendComment() {
      this.loading = true;
      this.showError = false;
      const data = {
        commentator: this.commentator,
        text: this.text,
        news: this.news.id
      }
      console.log(data)
      postSomething('api/v1/news/comment',{
        commentator: this.commentator,
        text: this.text,
        news: this.news.id
      })
    },
    main: function() {
        return `/`;
    },
    toAdmin: function() {
        return `/admin`;
    }
  },
};
</script>

<style>
    .back-cont{
        display:flex;
        margin-bottom:1%;
    }
    .back{
        float: left;
    }
    li{
        list-style: none;
    }
    h2{
      margin: 2%;
    }
</style>
