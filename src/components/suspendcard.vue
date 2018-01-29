<template>
  <div id="suspendcard">
     <div class="suspendcard">
       <button @touchstart.prevent="closeCard" @click="closeCard" class="closecard"><i class="czs-close-l"></i></button>
       <div>
         <slot name="cardtitle"></slot></div>
         <div>
         <slot name="qrcode"></slot></div>
     </div>
  </div>
</template>

<script>
import bus from '../main';
export default {
  name: "suspendcard",
  data() {
    return {

    };
  },
  methods: {
    closeCard: function() {
       bus.$emit('suspendClose');
    }
  }
};
</script>

<style scoped>
#suspendcard {
  width: 304px;
  min-height: 300px;
  position: fixed;
  left: 47%;
  top: 30%;
  display: flex;
  z-index: 10;
  background-color: black;
  color: white;
}

.suspendcard {
  width: 100%;
}

.suspendcard>div {
  position: absolute;
  text-align: center;
  width: 100%;
  padding: 8px 0 0 0;
}

.closecard {
  outline: none;
  background: none;
  border: none;
  position: absolute;
  right: 0;
  font-size: 20px;
  padding: 7px 8px 5px 5px;
  z-index: 1;
}

@media screen and (max-width: 640px) {
  #suspendcard {
    width: 200px;
    left: 40%;
    min-height: 200px;
    top: 20%;
  }
}

</style>

