<template>
  <div id="app">
    <div class="container pure-g">
      <div class="pure-u-1 pure-u-sm-6-24 pure-u-md-5-24 pure-u-lg-4-24 placeholder">
        <transition name="fade-list">
          <suspend-card v-if="suspendtype === groups.name" v-for="groups in grouplist" :key="groups.number">
            <div slot="cardtitle">{{'群号: ' + groups.number}}</div>
            <div slot="qrcode">
              <img class="qrcode" :src="groups.qrcode" alt="">
            </div>
          </suspend-card>
        </transition>
        <transition name="fade-tips">
          <div v-show="showtips" class="tip">地址复制成功</div>
        </transition>
      </div>
      <div :class="{menuButtonRight: isRight}" class="pure-u-sm-6-24 pure-u-md-5-24 pure-u-lg-4-24 nav-bar">
        <div>
          <i class="menu-button-icon" :class="{'czs-dropbox': iconX, 'czs-product-l': iconCircle, menuButtonRight: isRight}"></i>
          <button :class="{menuButtonRight: isRight}" class="menu-button" @touchend.prevent="menuBar" @click="menuBar"></button>
        </div>
        <div class="pure-menu custom-restricted-width pure-menu-scrollable pure-u-1-2 pure-u-sm-6-24 pure-u-md-5-24 pure-u-lg-4-24"
          :class="{visiable: isVisiable}">
          <div class="logo">
            <a href="/">
              <img src="/static/img/logo.webp" alt="">
              <div class="site-name">Ztzl.Moe</div>
            </a>
          </div>
          <span class="pure-menu-heading">G-guide</span>
          <ul class="pure-menu-list">

            <li :class="{'menu-height': menuheight}" v-for="cardX in cardlist1" class="pure-menu-item menu-height-origin" :key="cardX.name">
              <a :href="'#' + cardX.ID" class="pure-menu-link">{{cardX.name}}</a>
            </li>

            <transition name="fade-list-move">
              <div class="second-menu">
                <li class="pure-menu-heading">大G吧</li>
                <li v-for="card2 in cardlist2" class="pure-menu-item" :key="card2.name">
                  <a :href="card2.link" class="pure-menu-link" target="_blank">{{card2.name}}</a>
                </li>
                <span class="pure-menu-heading">QQ群组</span>
                <ul class="pure-menu-list">
                  <li v-for="groups in grouplist" class="pure-menu-item pure-menu-has-children" :key="groups.name">
                    <a href="#" @touchend="alertCard" @click.prevent="alertCard" class="pure-menu-link">{{groups.name}}</a>
                  </li>
                </ul>
              </div>
            </transition>
          </ul>
        </div>
      </div>

      <div @click="menuBarClose" @touchend="menuBarClose" class="pure-u-sm-18-24 pure-u-md-19-24 pure-u-lg-20-24 main">
        <div id="page-list">
          <div class="pagelists">

            <div class="routernav">
              <button to="/" tag="button" @click.prevent="changeRoute" class="routerbutton">导航主页</button>
              <button :to="'tips'" tag="button" @click.prevent="changeRoute" class="routerbutton">使用说明</button>
            </div>


            <form @submit.prevent="search">
              <div class="search">
                <transition name="fade-card">
                  <input v-show="showsearch" v-model.trim="searchname" type="text" class="search-input" placeholder="输入搜索内容">
                </transition>
                <transition name="fade-card">
                  <button v-show="showsearch" @touchend.prevent="search" @click.prevent="search" type="submit">
                    <i class="czs-search-l"></i>
                  </button>
                </transition>
              </div>
            </form>


            <transition name="fade-card">
              <div v-if="type === 'nosearch'" key="noedit">
                <div v-for="cardX in cardlist1" class="card" :id="cardX.ID" :key="cardX.name">
                  <div>
                    <div class="card-name">{{cardX.name}}</div>
                  </div>
                  <card-link :link="sortlist.link" v-for="sortlist in cardX.sortlists" class="pure-u-1-2 pure-u-md-1-4 pure-u-lg-1-5" :key="sortlist.name">
                    <a class="linkhref" slot="link" :href="sortlist.link" target="_blank">
                      <div class="link-title" :info="sortlist.link">{{sortlist.name}}</div>
                    </a>
                    <a slot="pic" :href="sortlist.link" class="picbox" target="_blank">
                      <img :src="sortlist.pic">
                    </a>
                    <button class="copybtn" v-clipboard:copy="sortlist.link" v-clipboard:success="onCopy" type="button" slot="linkinfo">{{sortlist.link}}</button>
                  </card-link>
                </div>
              </div>

              <div v-if="type === 'evensearch'" key="evenedit">
                <div v-for="cardY in cardlist3" class="card" :id="cardY.ID" :key="cardY.name">
                  <div>
                    <div class="card-name">{{cardY.name}}</div>
                  </div>
                  <card-link :link="sortlist.link" v-for="sortlist in cardY.sortlists" class="pure-u-1-2 pure-u-md-1-4 pure-u-lg-1-5" :key="sortlist.name">
                    <a class="linkhref" slot="link" :href="sortlist.link" target="_blank">
                      <div class="link-title" :info="sortlist.link">{{sortlist.name}}</div>
                    </a>
                    <a slot="pic" :href="sortlist.link" class="picbox" target="_blank">
                      <img :src="sortlist.pic">
                    </a>
                    <button class="copybtn" v-clipboard:copy="sortlist.link" v-clipboard:success="onCopy" type="button" slot="linkinfo">{{sortlist.link}}</button>
                  </card-link>
                </div>
              </div>

              <div v-if="type === 'oddsearch'" key="oddedit">
                <div v-for="cardZ in cardlist4" class="card" :id="cardZ.ID" :key="cardZ.name">
                  <div>
                    <div class="card-name">{{cardZ.name}}</div>
                  </div>
                  <card-link :link="sortlist.link" v-for="sortlist in cardZ.sortlists" class="pure-u-1-2 pure-u-md-1-4 pure-u-lg-1-5" :key="sortlist.name">
                    <a class="linkhref" slot="link" :href="sortlist.link" target="_blank">
                      <div class="link-title" :info="sortlist.link">{{sortlist.name}}</div>
                    </a>
                    <a slot="pic" :href="sortlist.link" class="picbox" target="_blank">
                      <img :src="sortlist.pic">
                    </a>
                    <button class="copybtn" v-clipboard:copy="sortlist.link" v-clipboard:success="onCopy" type="button" slot="linkinfo">{{sortlist.link}}</button>
                  </card-link>
                </div>
              </div>

              <div v-if="type==='childpage'">
                <router-view></router-view>
              </div>
            </transition>

          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import bus from "./main";
  export default {
    name: "App",
    data: function () {
      return {
        //全局渲染
        isVisiable: false,
        isRight: false,
        //导航菜单显隐
        iconX: false,
        iconCircle: true,
        //卡片检索
        searchname: "",
        menuloop: false,
        show: true,
        type: "nosearch",
        //提示
        showtips: false,
        //菜单收缩
        menuheight: false,
        showsearch: true,

        cardlist1: [
          //1
          {
            name: "Gal公司",
            sortlists: [{
                name: "Yuzusoft",
                link: "http://www.yuzu-soft.com",
                pic: "../static/img/yuzu.webp"
              },
              {
                name: "Nitro+",
                link: "https://www.nitroplus.co.jp/",
                pic: "../static/img/nplus.webp"
              },
              {
                name: "Aquaplus",
                link: "https://aquaplus.jp/",
                pic: "../static/img/aquaplus.webp"
              },
              {
                name: "Purplesoftware",
                link: "http://www.purplesoftware.jp",
                pic: "../static/img/purple.webp"
              },
              {
                name: "GIGA",
                link: "http://www.web-giga.com",
                pic: "../static/img/giga.webp"
              },
              {
                name: "KEY",
                link: "http://key.visualarts.gr.jp/",
                pic: "../static/img/key.jpg"
              },
              {
                name: "CUFFS",
                link: "http://www.cuffs.co.jp",
                pic: "../static/img/cuffs.png"
              },
              {
                name: "PALETTE",
                link: "http://palette.clearrave.co.jp/",
                pic: "../static/img/logo_palette.png"
              },
              {
                name: "5pb",
                link: "http://5pb.jp/games/",
                pic: "../static/img/5pb.jpg"
              },
              {
                name: "Sprite",
                link: "http://sprite.org/",
                pic: "../static/img/sprite.gif"
              },
              {
                name: "ALcot",
                link: "http://www.alcot.biz",
                pic: "../static/img/alcot.png"
              },
              {
                name: "ALICESOFT",
                link: "http://www.alicesoft.com",
                pic: "../static/img/logo_alicesoft.png"
              }
            ],
            ID: "H1"
          },
          //2
          {
            name: "国内社区",
            sortlists: [{
                name: "绯月Galgame",
                link: "http://bbs.9moe.com/",
                pic: "../static/img/kf.webp"
              },
              {
                name: "KDays",
                link: "http://bbs.kdays.net",
                pic: "../static/img/kdays.jpg"
              },
              {
                name: "星空论坛",
                link: "http://bbs.seikuu.com",
                pic: "../static/img/seikuu.png"
              }
            ],
            ID: "H2"
          },
          //3
          {
            name: "国外社区",
            sortlists: [{
                name: "2ch",
                link: "http://www.2ch.sc/",
                pic: "../static/img/2ch.gif"
              },
              {
                name: "Erogamescape",
                link: "http://erogamescape.dyndns.org",
                pic: "../static/img/ESCAPE.jpg"
              }
            ],
            ID: "H3"
          },
          //4
          {
            name: "线下活动",
            sortlists: [{
                name: "Comic Market",
                link: "http://www.comiket.co.jp",
                pic: "../static/img/comit.jpg"
              },
              {
                name: "COMICUP",
                link: "http://www.allcpp.cn",
                pic: "../static/img/comicup.jpg"
              }
            ],
            ID: "H4"
          },
          //5
          {
            name: "同人社团",
            sortlists: [{
                name: "5年目の放課後",
                link: "http://5-y.2-d.jp/",
                pic: "../static/img/5y.webp"
              },
              {
                name: "Hitenkei",
                link: "http://www.hitenkei.net/",
                pic: "../static/img/hitenkei.gif"
              },
              {
                name: "KAROMIX",
                link: "http://karory.net",
                pic: "../static/img/karory.png"
              },
              {
                name: "涼屋",
                link: "http://www.ryohka.jp/",
                pic: "../static/img/suzuya.jpg"
              },
              {
                name: "NECOTOXIN",
                link: "http://kilacoro.chu.jp/",
                pic: "../static/img/inugami.jpg"
              },
              {
                name: "WNB MARK",
                link: "http://wnb.moo.jp/",
                pic: "../static/img/WNB.jpg"
              },
              {
                name: "MATSURIJYA",
                link: "http://hanahana.vivian.jp/",
                pic: "../static/img/matsurijya.jpg"
              }
            ],
            ID: "H5"
          },
          //6
          {
            name: "氪金店铺",
            sortlists: [{
                name: "Melonbooks",
                link: "https://www.melonbooks.co.jp/",
                pic: "../static/img/melonbooks.webp"
              },
              {
                name: "Getchu",
                link: "http://www.getchu.com",
                pic: "../static/img/getchu.webp"
              },
              {
                name: "Sofmap",
                link: "https://www.sofmap.com/",
                pic: "../static/img/sofmap.webp"
              },
              {
                name: "Gamers",
                link: "https://www.gamers.co.jp",
                pic: "../static/img/gamers.webp"
              },
              {
                name: "Booth",
                link: "https://booth.pm",
                pic: "../static/img/booth.webp"
              },
              {
                name: "K-BOOKS",
                link: "http://www.k-books.co.jp/",
                pic: "../static/img/KBOOKS.jpg"
              },
              {
                name: "Lashinbang",
                link: "https://www.lashinbang.com/",
                pic: "../static/img/lashibang.jpg"
              }
            ],
            ID: "H6"
          }
        ],

        cardlist2: [{
            name: "贴吧首页",
            link: "https://tieba.baidu.com/f?kw=galgame&fr=index"
          },
          {
            name: "枕套脏了",
            link: "https://ztzl.moe"
          },
          {
            name: "Discord群组",
            link: "https://discord.gg/AdzWbhM"
          }
        ],

        cardlist3: [],
        cardlist4: [],

        groupnumber: "",
        suspendtype: "",
        grouplist: [{
            name: "G1群",
            number: "197741381",
            qrcode: "../static/qrcode/1516996732731.png"
          },
          {
            name: "G2群",
            number: "341133693",
            qrcode: "../static/qrcode/1516997707400.png"
          },
          {
            name: "鸡排群",
            number: "385273674",
            qrcode: "../static/qrcode/1516997716141.png"
          }
        ]
      };
    },
    //生命周期函数，关群信息
    mounted() {
      bus.$on("suspendClose", () => {
        this.suspendtype = "";
      });
      //复制成功
      bus.$on("copydone", () => {
        this.onCopy();
      });
    },

    //侧栏收缩
    methods: {
      menuBar: function () {
        if (this.iconCircle === true) {
          this.isVisiable = true;
          this.iconX = true;
          this.iconCircle = false;
          this.isRight = true;
        } else {
          this.isVisiable = false;
          this.iconX = false;
          this.iconCircle = true;
          this.isRight = false;
        }
        bus.$emit("floatdown");
      },

      menuBarClose: function () {
        if (this.isVisiable === true) {
          this.isVisiable = false;
          this.iconX = false;
          this.iconCircle = true;
          this.isRight = false;
        }
        bus.$emit("floatdown");
      },
      //卡片检索
      search: function () {
        let r = /\s+/g;
        let newarray = [];
        let app = this.cardlist1;
        let newapp = [];
        let searchlist = [{
          name: "搜索结果",
          sortlists: [],
          ID: "H1"
        }];
        let newName = new RegExp(
          this.searchname
          .toLowerCase()
          .replace(r, " ")
          .split(" ")
          .join("|")
        );

        let searchFilter = function (arr) {
          for (let i = 0; i < app.length; i++) {
            arr = arr.concat(app[i].sortlists);
          }

          arr = arr.filter(function (val) {
            if (val.name.toLowerCase().search(newName) === -1) {
              return false;
            } else {
              return true;
            }
          });

          return arr;
        };

        if (this.searchname !== "" && this.type === "nosearch") {
          this.cardlist3 = searchlist;
          newapp = searchFilter(newapp);
          this.cardlist3[0].sortlists = newapp;
          this.type = "evensearch";
        } else if (this.type === "evensearch" && this.searchname !== "") {
          this.cardlist4 = searchlist;
          app = this.cardlist3;
          newapp = searchFilter(newapp);
          this.cardlist4[0].sortlists = newapp;
          this.type = "oddsearch";
        } else if (this.type === "oddsearch" && this.searchname !== "") {
          this.cardlist3 = searchlist;
          app = this.cardlist4;
          newapp = searchFilter(newapp);
          this.cardlist3[0].sortlists = newapp;
          this.type = "evensearch";
        }
        if (this.searchname === "") {
          this.type = "nosearch";
          this.$router.push("/");
        }
      },
      //弹出群信息
      alertCard: function (event) {
        this.suspendtype = event.target.firstChild.nodeValue;
      },
      //切换路由
      changeRoute: function (event) {
        let rootinfo = event.target.getAttribute("to");
        if (event.target.firstChild.nodeValue === "导航主页") {
          this.type = "nosearch";
          this.$router.push("/");
          this.menuheight = false;
          this.showsearch = true;
        } else {
          this.type = "childpage";
          this.$router.push(rootinfo);
          this.menuheight = true;
          this.showsearch = false;
        }
      },
      //复制成功
      onCopy: function () {
        this.showtips = true;
        let closetips = () => {
          this.showtips = false;
        };
        setTimeout(closetips, 1000);
      }
    }
  };

</script>

<style>
  

</style>
