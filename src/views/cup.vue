<template>
  <div>
    <button class="DUGME" @click="nextRowCars()">TRKAJ SE MBRALE</button>

    <div v-if="auti.length > 0" class="container-fluid text-center mt-1">
      <div class="row justify-content-evenly mb-2">
        <div class="col colCar">
          <img :src="auti[0].carPic" alt="" />
        </div>
        <div class="col colCar ms-1 me-5">
          <img :src="auti[1].carPic" alt="" />
        </div>
        <div class="col colCar">
          <img :src="auti[2].carPic" alt="" />
        </div>
        <div class="col colCar ms-1 me-5">
          <img :src="auti[3].carPic" alt="" />
        </div>
        <div class="col colCar">
          <img :src="auti[4].carPic" alt="" />
        </div>
        <div class="col colCar ms-1 me-5">
          <img :src="auti[5].carPic" alt="" />
        </div>
        <div class="col colCar me-1">
          <img :src="auti[6].carPic" alt="" />
        </div>
        <div class="col colCar">
          <img :src="auti[7].carPic" alt="" />
        </div>
      </div>
      <div class="row justify-content-evenly mb-2">
        <div class="col border border-0"></div>
        <div class="col colCar ms-1 me-2">
          <img v-if="winners1.length > 0" :src="winners1[0].carPic" alt="" />
        </div>
        <div class="col colCar">
          <img v-if="winners1.length > 0" :src="winners1[1].carPic" alt="" />
        </div>
        <div class="col ms-1 me-5 border border-0"></div>
        <div class="col border border-0"></div>
        <div class="col colCar ms-1 me-2">
          <img v-if="winners1.length > 0" :src="winners1[2].carPic" alt="" />
        </div>
        <div class="col colCar me-1">
          <img v-if="winners1.length > 0" :src="winners1[3].carPic" alt="" />
        </div>
        <div class="col border border-0"></div>
      </div>
      <div class="row justify-content-evenly mb-2">
        <div class="col border border-0"></div>
        <div class="col border border-0"></div>
        <div class="col border border-0"></div>
        <div class="col colCar ms-2 me-4">
          <img src="" alt="" />
        </div>
        <div class="col colCar ms-5 me-2">
          <img src="" alt="" />
        </div>
        <div class="col border border-0"></div>
        <div class="col border border-0"></div>
        <div class="col border border-0"></div>
      </div>
      <div class="row justify-content-evenly mb-2">
        <div class="col border border-0"></div>
        <div class="col border border-0"></div>
        <div class="col border border-0"></div>
        <div class="col colCar">
          <img src="" alt="" />
        </div>
        <div class="col border border-0"></div>
        <div class="col border border-0"></div>
        <div class="col border border-0"></div>
      </div>
      <div class="row justify-content-evenly mb-2">
        <div class="col border border-0"></div>
        <div class="col border border-0"></div>
        <div class="col border border-0"></div>
        <div class="col colCar">
          <img src="" alt="" />
        </div>
        <div class="col border border-0"></div>
        <div class="col border border-0"></div>
        <div class="col border border-0"></div>
      </div>
      <div class="row justify-content-evenly mb-2">
        <div class="col border border-0"></div>
        <div class="col border border-0"></div>
        <div class="col border border-0"></div>
        <div class="col colCar ms-2 me-4">
          <img src="" alt="" />
        </div>
        <div class="col colCar ms-5 me-2">
          <img src="" alt="" />
        </div>
        <div class="col border border-0"></div>
        <div class="col border border-0"></div>
        <div class="col border border-0"></div>
      </div>
      <div class="row justify-content-evenly mb-2">
        <div class="col border border-0"></div>
        <div class="col colCar ms-1 me-2">
          <img v-if="winners1.length > 0" :src="winners1[4].carPic" alt="" />
        </div>
        <div class="col colCar">
          <img v-if="winners1.length > 0" :src="winners1[5].carPic" alt="" />
        </div>
        <div class="col ms-1 me-5 border border-0"></div>
        <div class="col border border-0"></div>
        <div class="col colCar ms-1 me-2">
          <img v-if="winners1.length > 0" :src="winners1[6].carPic" alt="" />
        </div>
        <div class="col colCar me-1">
          <img v-if="winners1.length > 0" :src="winners1[7].carPic" alt="" />
        </div>
        <div class="col border border-0"></div>
      </div>
      <div class="row justify-content-evenly mb-2">
        <div class="col colCar">
          <img :src="auti[8].carPic" alt="" />
        </div>
        <div class="col colCar ms-1 me-5">
          <img :src="auti[9].carPic" alt="" />
        </div>
        <div class="col colCar">
          <img :src="auti[10].carPic" alt="" />
        </div>
        <div class="col colCar ms-1 me-5">
          <img :src="auti[11].carPic" alt="" />
        </div>
        <div class="col colCar">
          <img :src="auti[12].carPic" alt="" />
        </div>
        <div class="col colCar ms-1 me-5">
          <img :src="auti[13].carPic" alt="" />
        </div>
        <div class="col colCar me-1">
          <img :src="auti[14].carPic" alt="" />
        </div>
        <div class="col colCar">
          <img :src="auti[15].carPic" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getAuth,
  onAuthStateChanged,
  db,
  collectionGroup,
  query,
  getDocs,
} from "@/firebase";
const auth = getAuth();
export default {
  name: "cup",
  data() {
    return {
      auti: [],
      winners1: [],
      polufinale: [],
      finale: [],
    };
  },
  created() {
    onAuthStateChanged(auth, (user) => {
      this.getCars();
    });
  },
  methods: {
    nextRowCars() {
      for (let i = 0; i < 8; i++) {
        let ET1, ET2
        ET1=5.9*(((this.auti[2*i].Weight*2.2046)/this.auti[2*i].Snaga)**(1/3))
        ET2=5.9*(((this.auti[2*i+1].Weight*2.2046)/this.auti[2*i+1].Snaga)**(1/3))
        if(ET1<ET2){
          this.winners1.push(this.auti[2*i])
        } else {
          this.winners1.push(this.auti[2*i+1])
        }
      }
    },
    async getCars() {
      const q = query(collectionGroup(db, `cars`));
      console.log("OVO SU AUTI:");
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log(data);
        this.auti.push(data);
      });
      console.log(this.auti);
    },
  },
};
</script>
<style scoped>
.colCar {
  background-color: darkgrey;
}
.DUGME {
  position: absolute;
  top: 400px;
  right: 100px;
}
.col {
  padding: 0%;
  width: 10vw !important;
  border-style: solid;
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.col img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
</style>
