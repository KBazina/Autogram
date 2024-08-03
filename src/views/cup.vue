<template>
  <div>
    <button class="DUGME" @click="nextRowCars()">TRKAJ SE MBRALE</button>

    <div v-if="auti.length === 16" class="container-fluid text-center mt-1">
      <div class="row justify-content-evenly mb-2">
        <div class="col col1 colCar">
          <div class="onHoverNesto">{{ auti[0].carOwnerUsername }}</div>
          <div class="centriraj" v-if="count[0] > 0">
            {{ count[0].toFixed(2) }}
          </div>
          <img :src="auti[0].carPic" alt="" />
        </div>
        <div class="col col1 colCar ms-1 me-5">
          <div class="onHoverNesto">{{ auti[1].carOwnerUsername }}</div>
          <div class="centriraj" v-if="count[1] > 0">
            {{ count[1].toFixed(2) }}
          </div>
          <img :src="auti[1].carPic" alt="" />
        </div>
        <div class="col col1 colCar">
          <div class="onHoverNesto">{{ auti[2].carOwnerUsername }}</div>
          <div class="centriraj" v-if="count[2] > 0">
            {{ count[2].toFixed(2) }}
          </div>
          <img :src="auti[2].carPic" alt="" />
        </div>
        <div class="col col1 colCar ms-1 me-5">
          <div class="onHoverNesto">{{ auti[3].carOwnerUsername }}</div>
          <div class="centriraj" v-if="count[3] > 0">
            {{ count[3].toFixed(2) }}
          </div>
          <img :src="auti[3].carPic" alt="" />
        </div>
        <div class="col col1 colCar">
          <div class="onHoverNesto">{{ auti[4].carOwnerUsername }}</div>
          <div class="centriraj" v-if="count[4] > 0">
            {{ count[4].toFixed(2) }}
          </div>
          <img :src="auti[4].carPic" alt="" />
        </div>
        <div class="col col1 colCar ms-1 me-5">
          <div class="onHoverNesto">{{ auti[5].carOwnerUsername }}</div>
          <div class="centriraj" v-if="count[5] > 0">
            {{ count[5].toFixed(2) }}
          </div>
          <img :src="auti[5].carPic" alt="" />
        </div>
        <div class="col col1 colCar me-1">
          <div class="onHoverNesto">{{ auti[6].carOwnerUsername }}</div>
          <div class="centriraj" v-if="count[6] > 0">
            {{ count[6].toFixed(2) }}
          </div>
          <img :src="auti[6].carPic" alt="" />
        </div>
        <div class="col col1 colCar">
          <div class="onHoverNesto">{{ auti[7].carOwnerUsername }}</div>
          <div class="centriraj" v-if="count[7] > 0">
            {{ count[7].toFixed(2) }}
          </div>
          <img :src="auti[7].carPic" alt="" />
        </div>
      </div>
      <div class="row justify-content-evenly mb-2">
        <div class="col col1 border border-0"></div>
        <div class="col col1 colCar ms-1 me-2">
          <img v-if="winners1.length > 0" :src="winners1[0].carPic" alt="" />
        </div>
        <div class="col col1 colCar">
          <img v-if="winners1.length > 0" :src="winners1[1].carPic" alt="" />
        </div>
        <div class="col col1 ms-1 me-5 border border-0"></div>
        <div class="col col1 border border-0"></div>
        <div class="col col1 colCar ms-1 me-2">
          <img v-if="winners1.length > 0" :src="winners1[2].carPic" alt="" />
        </div>
        <div class="col col1 colCar me-1">
          <img v-if="winners1.length > 0" :src="winners1[3].carPic" alt="" />
        </div>
        <div class="col col1 border border-0"></div>
      </div>
      <div class="row justify-content-evenly mb-2">
        <div class="col col1 border border-0"></div>
        <div class="col col1 border border-0"></div>
        <div class="col col1 border border-0"></div>
        <div class="col col1 colCar ms-2 me-4">
          <img src="" alt="" />
        </div>
        <div class="col col1 colCar ms-5 me-2">
          <img src="" alt="" />
        </div>
        <div class="col col1 border border-0"></div>
        <div class="col col1 border border-0"></div>
        <div class="col col1 border border-0"></div>
      </div>
      <div class="row justify-content-evenly mb-2">
        <div class="col col1 border border-0"></div>
        <div class="col col1 border border-0"></div>
        <div class="col col1 border border-0"></div>
        <div class="col col1 colCar">
          <img src="" alt="" />
        </div>
        <div class="col col1 border border-0"></div>
        <div class="col col1 border border-0"></div>
        <div class="col col1 border border-0"></div>
      </div>
      <div class="row justify-content-evenly mb-2">
        <div class="col col1 border border-0"></div>
        <div class="col col1 border border-0"></div>
        <div class="col col1 border border-0"></div>
        <div class="col col1 colCar">
          <img src="" alt="" />
        </div>
        <div class="col col1 border border-0"></div>
        <div class="col col1 border border-0"></div>
        <div class="col col1 border border-0"></div>
      </div>
      <div class="row justify-content-evenly mb-2">
        <div class="col col1 border border-0"></div>
        <div class="col col1 border border-0"></div>
        <div class="col col1 border border-0"></div>
        <div class="col col1 colCar ms-2 me-4">
          <img src="" alt="" />
        </div>
        <div class="col col1 colCar ms-5 me-2">
          <img src="" alt="" />
        </div>
        <div class="col col1 border border-0"></div>
        <div class="col col1 border border-0"></div>
        <div class="col col1 border border-0"></div>
      </div>
      <div class="row justify-content-evenly mb-2">
        <div class="col col1 border border-0"></div>
        <div class="col col1 colCar ms-1 me-2">
          <img v-if="winners1.length > 0" :src="winners1[4].carPic" alt="" />
        </div>
        <div class="col col1 colCar">
          <img v-if="winners1.length > 0" :src="winners1[5].carPic" alt="" />
        </div>
        <div class="col col1 ms-1 me-5 border border-0"></div>
        <div class="col col1 border border-0"></div>
        <div class="col col1 colCar ms-1 me-2">
          <img v-if="winners1.length > 0" :src="winners1[6].carPic" alt="" />
        </div>
        <div class="col col1 colCar me-1">
          <img v-if="winners1.length > 0" :src="winners1[7].carPic" alt="" />
        </div>
        <div class="col col1 border border-0"></div>
      </div>
      <div class="row justify-content-evenly mb-2">
        <div class="col col1 colCar">
          <div class="onHoverNesto">{{ auti[8].carOwnerUsername }}</div>
          <div class="centriraj" v-if="count[8] > 0">
            {{ count[8].toFixed(2) }}
          </div>
          <img :src="auti[8].carPic" alt="" />
        </div>
        <div class="col col1 colCar ms-1 me-5">
          <div class="onHoverNesto">{{ auti[9].carOwnerUsername }}</div>
          <div class="centriraj" v-if="count[9] > 0">
            {{ count[9].toFixed(2) }}
          </div>
          <img :src="auti[9].carPic" alt="" />
        </div>
        <div class="col col1 colCar">
          <div class="onHoverNesto">{{ auti[10].carOwnerUsername }}</div>
          <div class="centriraj" v-if="count[10] > 0">
            {{ count[10].toFixed(2) }}
          </div>
          <img :src="auti[10].carPic" alt="" />
        </div>
        <div class="col col1 colCar ms-1 me-5">
          <div class="onHoverNesto">{{ auti[11].carOwnerUsername }}</div>
          <div class="centriraj" v-if="count[11] > 0">
            {{ count[11].toFixed(2) }}
          </div>
          <img :src="auti[11].carPic" alt="" />
        </div>
        <div class="col col1 colCar">
          <div class="onHoverNesto">{{ auti[12].carOwnerUsername }}</div>
          <div class="centriraj" v-if="count[12] > 0">
            {{ count[12].toFixed(2) }}
          </div>
          <img :src="auti[12].carPic" alt="" />
        </div>
        <div class="col col1 colCar ms-1 me-5">
          <div class="onHoverNesto">{{ auti[13].carOwnerUsername }}</div>
          <div class="centriraj" v-if="count[13] > 0">
            {{ count[13].toFixed(2) }}
          </div>
          <img :src="auti[13].carPic" alt="" />
        </div>
        <div class="col col1 colCar me-1">
          <div class="onHoverNesto">{{ auti[14].carOwnerUsername }}</div>
          <div class="centriraj" v-if="count[14] > 0">
            {{ count[14].toFixed(2) }}
          </div>
          <img :src="auti[14].carPic" alt="" />
        </div>
        <div class="col col1 colCar">
          <div class="onHoverNesto">{{ auti[15].carOwnerUsername }}</div>
          <div class="centriraj" v-if="count[15] > 0">
            {{ count[15].toFixed(2) }}
          </div>
          <img :src="auti[15].carPic" alt="" />
        </div>
      </div>
    </div>
    <div
      v-if="auti.length != 16"
      class="carSelectorParent position-absolute top-50 start-50 translate-middle rounded p-2"
    >
      <div class="row">
        <div class="col DessniFlower overflow-y-scroll">
          <ul>
            <li class="li" v-for="(car, index) in selectedCars" :key="index">
              <div class="tabCar">
                <button
                  @click="addCarToAuti(index)"
                  class="btn btn-dark float-end"
                >
                  DODAJ
                </button>
                <span class="fw-bolder"> {{ car.Marka }} {{ car.Model }} </span>
                from {{ car.carOwnerUsername }} /Registracija:
                {{ car.Registracija }} <br />
                Snaga: {{ car.Snaga }}kW /Godina: {{ car.carYear }} /Kilaža:
                {{ car.Weight }}kg
              </div>
            </li>
          </ul>
        </div>
        <div class="col">
          <div class="text-center">
            IZABERI 16 AUTA ZA TRKANJE
            <span class="fs-3"> {{ auti.length }}/16</span>
          </div>
          <div class="ListaBr2 overflow-y-scroll">
            <ul class="mt-4">
              <li class="li" v-for="(car, index) in auti" :key="index">
                <span class="fw-bolder"> {{ car.Marka }} {{ car.Model }} </span>
                /{{ car.Registracija }} from {{ car.carOwnerUsername }}
                <button
                  @click="addCarToSCars(index)"
                  class="btn dugmeBr2 btn-dark float-end"
                >
                  OBRIŠI
                </button>
              </li>
            </ul>
          </div>
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
      selectedCars: [],
      auti: [],
      winners1: [],
      polufinale: [],
      finale: [],
      count: [
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        0.0, 0.0,
      ],
      intervalId: [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ],
    };
  },
  created() {
    onAuthStateChanged(auth, (user) => {
      this.getCars();
    });
  },
  methods: {
    addCarToSCars(index) {
      this.selectedCars.push(this.selectedCars[index]);
      this.auti.splice(index, 1);
    },
    addCarToAuti(index) {
      this.auti.push(this.selectedCars[index]);
      this.selectedCars.splice(index, 1);
    },
    nextRowCars() {
      for (let i = 0; i < 8; i++){
        
        let ET1=this.getWeightedRandomNumber(parseFloat(this.auti[2*i].idealET) )
        let ET2=this.getWeightedRandomNumber(parseFloat(this.auti[2*i+1].idealET) )
        this.intervalId[2*i] = setInterval(() => {
          if (this.count[2*i] >= ET1) {
            clearInterval(this.intervalId[2*i]);
            this.intervalId[2*i] = null;
          } else {
            this.count[2*i] += 0.01;
          }
        }, 10); 
        this.intervalId[2*i+1] = setInterval(() => {
          if (this.count[2*i+1] >= ET2) {
            clearInterval(this.intervalId[2*i+1]);
            this.intervalId[2*i+1] = null;
          } else {
            this.count[2*i+1] += 0.01;
          }
        }, 10); 
      }
    },
    getWeightedRandomNumber(min) { 
    let random = Math.random();
    
    let weightedRandom = (min + ((0.5) * Math.pow(random, 2))).toFixed(2)

    return weightedRandom;
}
,
    async getCars() {
      const q = query(collectionGroup(db, `cars`));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        this.selectedCars.push(data);
      });
    },
  },
};
</script>
<style scoped>
.colCar {
  background-color: darkgrey;
}
.dugmeBr2 {
  padding: 5px !important;
  font-size: small;
}
.centriraj {
  font-weight: bold;
  z-index: 3;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.onHoverNesto {
  padding: 2px;
  background-color: black;
  z-index: 5;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
}

.onHoverNesto:hover {
  cursor: default;
  opacity: 1;
}
li {
  list-style: none;
}
.ListaBr2 {
  scrollbar-width: none;
  height: 70vh;
}
.DessniFlower {
  scrollbar-width: none;
  height: 79vh;
}
.DUGME {
  position: absolute;
  top: 400px;
  right: 100px;
}
.carSelectorParent {
  width: 90%;
  background-color: rgb(63, 69, 73);
  height: 80%;
}
.col1 {
  position: relative;
  padding: 0%;
  width: 10vw !important;
  border-style: solid;
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.col1 img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
.li {
  color: black;
  border-bottom-right-radius: 20px;
  border-top-left-radius: 20px;
  padding: 10px;
  background-color: rgb(175, 171, 171);
}

.li:nth-child(even) {
  background-color: rgb(162, 153, 153);
}
</style>
