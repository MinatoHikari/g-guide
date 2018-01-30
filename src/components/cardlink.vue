<template id="link">
  <div :class="{'float-link': linkUP}" class="panel">
    <div  @mouseleave="floatDown" @mouseenter="floatLink" :class="{'float-link-shadow': linkUP}" class="link">
      <div >
        <slot name="link"></slot>
      </div>
      <slot name="pic"></slot>
      <div class="linkicon"><i @touchend="copyPropLink" @touchstart.prevent="showLinkInfo" :copylink="link" @mouseenter="showLinkInfo" class="czs-circle"></i></div>
      <div  class="linkinfo" :class="{'infoheight':showlinkinfo}">
        <slot name="linkinfo"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import bus from "../main";
export default {
  name: "cardlink",
  props:['link'],
  data: function() {
    return {
      linkUP: false,
      showlinkinfo: false
    };
  },

  mounted() {
    bus.$on("floatdown", () => {
      this.linkUP = false;
      this.showlinkinfo = false;
    });
  },

  methods: {
    //卡片浮动效果
    floatLink: function() {
      if (this.linkUP === false) {
        this.linkUP = true;
      }
    },
    floatDown: function() {
      this.linkUP = false;
      this.showlinkinfo = false;
    },
    showLinkInfo: function() {
      this.linkUP = true;
      this.showlinkinfo = true;
    },
    copyPropLink: function(e) {
      let iscopy = bus.$emit('copydone');
      this.$copyText(e.target.parentNode.nextElementSibling.firstElementChild.getAttribute('link')).then(iscopy);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.panel {
  margin-top: 10px;
  margin-bottom: 5px;
}

.linkinfo {
  visibility: hidden;
  max-height: 0;
  display: block;
  margin-bottom: 10px;
  max-width: 100%;
  background-color: rgb(252, 228, 255);
  color: black;
  z-index: 5;
  box-shadow: 2px 4px 10px rgba(204, 202, 202, 0.527);
  word-break: break-all;
  padding: 5px 20px;
}

.infoheight {
  visibility: unset;
  max-height: 200px;
}

.linkicon {
  width: 100%;
  padding-top: 2px;
  background-color: rgb(252, 228, 255);
  box-shadow: 2px 4px 10px rgba(204, 202, 202, 0.527);
}
</style>
