<template>
  <div class="home">
    <swiper :options='swiperOption' autoplay>
      <swiper-slide><img src='../assets/images/1.jpeg' class='w-100'></swiper-slide>
      <swiper-slide><img src='../assets/images/2.jpeg' class='w-100'></swiper-slide>
      <swiper-slide><img src='../assets/images/3.jpeg' class='w-100'></swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-1" slot='pagination'></div>
    </swiper>  
    <!--end of swiper -->

    <div class="nav-icons bg-white mt-3 text-center pt-3 text-dark-1">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3" v-for="n in num" :key="n">
          <i :class="`sprite-${spriteList[n-1]}`" class='sprite'></i>
          <!-- <i class="sprite sprite-news"></i> -->
          <div class='fs-sm py-2'>{{introList[n-1]}}</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm" @click='change'>
        <i class="sprite sprite-arrow mr-1" :class="{'shouqi':!shouqi}"></i>
        <span>{{val}}</span>
      </div>
    </div>
    <!-- end of nav icons -->

    <m-list-card icon="Menu" title="新闻资讯" :categories="newsCats">
      <template #items="{category}">
        <router-link 
        tag="div"
        :to="`/articles/${news._id}`"
        class="py-2 fs-lg d-flex" 
        v-for="(news, i) in category.newsList" :key="i">
          <span class="text-info">[{{news.categoryName}}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{news.title}}</span>
          <span class="text-grey-1 fs-sm">{{news.createdAt | date}}</span>
        </router-link>
      </template>
    </m-list-card>

    <m-list-card icon="card-hero" title="英雄列表" :categories="heroCats">
      <template #items="{category}">
        <div class="d-flex flex-wrap" style="margin: 0 -0.5rem;">
          <router-link
          tag="div"
          :to="`/heroes/${hero._id}`"
          class="p-2 text-center"
          style="width: 20%;" 
          v-for="(hero, i) in category.heroList" :key="i">
            <img :src="hero.avatar" class="w-100">
            <div>{{hero.name}}</div>
          </router-link>
        </div>
      </template>
    </m-list-card>

    <m-card icon="menu1" title="精彩视频"></m-card>
    <!-- <m-card icon="menu1" title="图文攻略"></m-card> -->
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  filters: {
    date(val) {
      return dayjs(val).format("MM/DD");
    }
  },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".pagination-home"
        }
      },
      num:4,
      val:'展开',
      shouqi: false,
      newsCats: [],
      heroCats: [],
      spriteList: ['news','story','market','experience','newPerson','honor','camp','wechat','version','fight','ip','idea'],
      introList: ['爆料站','故事站','周边商城','体验服','新人专区','荣耀·传承','王者营地','公众号','版本介绍','对局环境','IP共创计划','创意互动营']
    };
  },
  methods: {
    async fetchNewsCats() {
      const res = await this.$http.get("news/list");
      this.newsCats = res.data;
    },
    async fetchHeroCats() {
      const res = await this.$http.get("heroes/list");
      this.heroCats = res.data;
    },
    change(){
      this.shouqi = !this.shouqi
      if(this.shouqi){
        this.val = '收起'
        this.num = 12
      }else{
        this.val = '展开'
        this.num = 4
      }
    }
  },
  created() {
    this.fetchNewsCats();
    this.fetchHeroCats();
  }
};
</script>

<style lang="scss">
@import "../assets/scss/variables";
.shouqi{
  transform: rotate(180deg);
}
.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    background: map-get($colors, "white");
    &.swiper-pagination-bullet-active {
      background: map-get($colors, "info");
    }
  }
}
.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid #d4d9de;
    &:nth-child(4n) {
      border-right: none;
    }
  }
}
</style>