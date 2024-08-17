<template>
  <div>
    <div v-if="runda" class="runda">
RUNDA
    </div>
    <audio ref="myAudio">
      <source src="@/assets/911.mp3" type="audio/ogg" />
      Your browser does not support the audio element.
    </audio>
    <button v-if="this.rowNumber !== 4" class="DUGME" @click="nextRowCars()">
      TRKAJ SE MBRALE
    </button>
    <div v-if="pobjednik !== 0" class="ABSOLUTNIDIV">
      <button class="close-btn" @click="zatvoriDiv">✖</button>
      <img v-if="pobjednik !== 0" :src="pobjednik.carPic" alt="" />
    </div>
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
          <div class="onHoverNesto">{{ winners1[0].carOwnerUsername }}</div>
          <div class="centriraj" v-if="count[16] > 0">
            {{ count[16].toFixed(2) }}
          </div>
          <img v-if="winners1[0] !== 0" :src="winners1[0].carPic" alt="" />
        </div>
        <div class="col col1 colCar">
          <div class="onHoverNesto">{{ winners1[1].carOwnerUsername }}</div>
          <div class="centriraj" v-if="count[17] > 0">
            {{ count[17].toFixed(2) }}
          </div>
          <img v-if="winners1[1] !== 0" :src="winners1[1].carPic" alt="" />
        </div>
        <div class="col col1 ms-1 me-5 border border-0"></div>
        <div class="col col1 border border-0"></div>
        <div class="col col1 colCar ms-1 me-2">
          <div class="onHoverNesto">{{ winners1[2].carOwnerUsername }}</div>
          <div class="centriraj" v-if="count[18] > 0">
            {{ count[18].toFixed(2) }}
          </div>
          <img v-if="winners1[2] !== 0" :src="winners1[2].carPic" alt="" />
        </div>
        <div class="col col1 colCar me-1">
          <div class="onHoverNesto">{{ winners1[3].carOwnerUsername }}</div>
          <div class="centriraj" v-if="count[19] > 0">
            {{ count[19].toFixed(2) }}
          </div>
          <img v-if="winners1[3] !== 0" :src="winners1[3].carPic" alt="" />
        </div>
        <div class="col col1 border border-0"></div>
      </div>
      <div class="row justify-content-evenly mb-2">
        <div class="col col1 border border-0"></div>
        <div class="col col1 border border-0"></div>
        <div class="col col1 border border-0"></div>
        <div class="col col1 colCar ms-2 me-4">
          <div class="onHoverNesto">{{ polufinale[0].carOwnerUsername }}</div>
          <div class="centriraj" v-if="count[24] > 0">
            {{ count[24].toFixed(2) }}
          </div>
          <img v-if="polufinale[0] !== 0" :src="polufinale[0].carPic" alt="" />
        </div>
        <div class="col col1 colCar ms-5 me-2">
          <div class="onHoverNesto">{{ polufinale[1].carOwnerUsername }}</div>
          <div class="centriraj" v-if="count[25] > 0">
            {{ count[25].toFixed(2) }}
          </div>
          <img v-if="polufinale[1] !== 0" :src="polufinale[1].carPic" alt="" />
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
          <div class="onHoverNesto">{{ finale[0].carOwnerUsername }}</div>
          <div class="centriraj" v-if="count[29] > 0">
            {{ count[28].toFixed(2) }}
          </div>
          <img v-if="finale[0] !== 0" :src="finale[0].carPic" alt="" />
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
          <div class="onHoverNesto">{{ finale[1].carOwnerUsername }}</div>
          <div class="centriraj" v-if="count[29] > 0">
            {{ count[29].toFixed(2) }}
          </div>
          <img v-if="finale[1] !== 0" :src="finale[1].carPic" alt="" />
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
          <div class="onHoverNesto">{{ polufinale[2].carOwnerUsername }}</div>
          <div class="centriraj" v-if="count[26] > 0">
            {{ count[26].toFixed(2) }}
          </div>
          <img v-if="polufinale[2] !== 0" :src="polufinale[2].carPic" alt="" />
        </div>
        <div class="col col1 colCar ms-5 me-2">
          <div class="onHoverNesto">{{ polufinale[3].carOwnerUsername }}</div>
          <div class="centriraj" v-if="count[27] > 0">
            {{ count[27].toFixed(2) }}
          </div>
          <img v-if="polufinale[3] !== 0" :src="polufinale[3].carPic" alt="" />
        </div>
        <div class="col col1 border border-0"></div>
        <div class="col col1 border border-0"></div>
        <div class="col col1 border border-0"></div>
      </div>
      <div class="row justify-content-evenly mb-2">
        <div class="col col1 border border-0"></div>
        <div class="col col1 colCar ms-1 me-2">
          <div class="onHoverNesto">{{ winners1[4].carOwnerUsername }}</div>
          <div class="centriraj" v-if="count[20] > 0">
            {{ count[20].toFixed(2) }}
          </div>
          <img v-if="winners1[4] !== 0" :src="winners1[4].carPic" alt="" />
        </div>
        <div class="col col1 colCar">
          <div class="onHoverNesto">{{ winners1[5].carOwnerUsername }}</div>
          <div class="centriraj" v-if="count[21] > 0">
            {{ count[21].toFixed(2) }}
          </div>
          <img v-if="winners1[5] !== 0" :src="winners1[5].carPic" alt="" />
        </div>
        <div class="col col1 ms-1 me-5 border border-0"></div>
        <div class="col col1 border border-0"></div>
        <div class="col col1 colCar ms-1 me-2">
          <div class="onHoverNesto">{{ winners1[6].carOwnerUsername }}</div>
          <div class="centriraj" v-if="count[22] > 0">
            {{ count[22].toFixed(2) }}
          </div>
          <img v-if="winners1[6] !== 0" :src="winners1[6].carPic" alt="" />
        </div>
        <div class="col col1 colCar me-1">
          <div class="onHoverNesto">{{ winners1[7].carOwnerUsername }}</div>
          <div class="centriraj" v-if="count[23] > 0">
            {{ count[23].toFixed(2) }}
          </div>
          <img v-if="winners1[7] !== 0" :src="winners1[7].carPic" alt="" />
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
    <div class="overlayPost" v-if="btnClicked"></div>
  </div>
</template>
<script>
import JSConfetti from "js-confetti";
import {
  getAuth,
  onAuthStateChanged,
  db,
  collectionGroup,
  query,
  getDocs,
} from "@/firebase";
const auth = getAuth();
const jsConfetti = new JSConfetti();
export default {
  name: "cup",
  data() {
    return {
      runda:false,
      pobjednik: 0,
      rowNumber: 0,
      btnClicked: false,
      selectedCars: [],
      auti: [],
      winners1: [0, 0, 0, 0, 0, 0, 0, 0],
      RACINGauti: [],
      polufinale: [0, 0, 0, 0],
      finale: [0, 0],
      count: [
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0,
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
    zatvoriDiv() {
      this.pobjednik = 0;
    },
    addCarToSCars(index) {
      this.selectedCars.push(this.auti[index]);
      this.auti.splice(index, 1);
    },
    addCarToAuti(index) {
      this.auti.push(this.selectedCars[index]);
      this.selectedCars.splice(index, 1);
    },
    nextRowCars() {
      this.runda=true
      setTimeout(()=>{
        this.runda=false
      
      this.btnClicked = true;
      let timeoutET = 0;
      switch (this.rowNumber) {
        case 0:
          this.RACINGauti = this.auti;
          const audioElement = this.$refs.myAudio;
          if (audioElement) {
            audioElement.play();
          }
          break;
        case 1:
          this.RACINGauti = this.winners1;
          break;
        case 2:
          this.RACINGauti = this.polufinale;
          break;
        case 3:
          this.RACINGauti = this.finale;
          break;
        default:
          this.RACINGauti = [];
      }
      for (let i = 0; i < this.RACINGauti.length / 2; i++) {
        let ET1 = parseFloat(
          this.getWeightedRandomNumber(
            parseFloat(this.RACINGauti[2 * i].idealET)
          )
        );
        let ET2 = parseFloat(
          this.getWeightedRandomNumber(
            parseFloat(this.RACINGauti[2 * i + 1].idealET)
          )
        );
        if (ET1 > timeoutET) {
          timeoutET = ET1;
        }
        if (ET2 > timeoutET) {
          timeoutET = ET2;
        }
        if (ET1 < ET2) {
          setTimeout(() => {
            if (this.rowNumber === 0) {
              this.winners1.splice(i, 1, this.RACINGauti[2 * i]);
            }
            if (this.rowNumber === 1) {
              this.polufinale.splice(i, 1, this.RACINGauti[2 * i]);
            }
            if (this.rowNumber === 2) {
              this.finale.splice(i, 1, this.RACINGauti[2 * i]);
            }
            if (this.rowNumber === 3) {
              this.pobjednik = this.RACINGauti[2 * i];
              jsConfetti.addConfetti({
                emojis: ["🚗", +"🏎️", "🏁", "🚩", "👑", "🔥", "🏎️"],
              });
            }
          }, ET1 * 1000);
        } else {
          setTimeout(() => {
            if (this.rowNumber === 0) {
              this.winners1.splice(i, 1, this.RACINGauti[2 * i + 1]);
            }
            if (this.rowNumber === 1) {
              this.polufinale.splice(i, 1, this.RACINGauti[2 * i + 1]);
            }
            if (this.rowNumber === 2) {
              this.finale.splice(i, 1, this.RACINGauti[2 * i + 1]);
            }
            if (this.rowNumber === 3) {
              this.pobjednik = this.RACINGauti[2 * i + 1];
              jsConfetti.addConfetti({
                emojis: ["🚗", +"🏎️", "🏁", "🚩", "👑", "🔥", "🏎️"],
              });
            }
          }, ET2 * 1000);
        }
        let varCar = 2 * i;
        if (this.rowNumber === 1) varCar += 16;
        if (this.rowNumber === 2) varCar += 24;
        if (this.rowNumber === 3) varCar += 28;
        this.intervalId[varCar] = setInterval(() => {
          if (this.count[varCar] >= ET1) {
            clearInterval(this.intervalId[varCar]);
            this.intervalId[varCar] = null;
          } else {
            this.count[varCar] += 0.01;
          }
        }, 10);
        this.intervalId[varCar + 1] = setInterval(() => {
          if (this.count[varCar + 1] >= ET2) {
            clearInterval(this.intervalId[varCar + 1]);
            this.intervalId[varCar + 1] = null;
          } else {
            this.count[varCar + 1] += 0.01;
          }
        }, 10);
      }
      setTimeout(() => {
        this.btnClicked = false;
        this.rowNumber += 1;
        if (this.rowNumber != 4) {
          this.nextRowCars();
        }
      }, timeoutET * 1000);
    },1500)
    },
    getWeightedRandomNumber(min) {
      let random = Math.random();

      let weightedRandom = (min + 0.5 * Math.pow(random, 2)).toFixed(2);

      return weightedRandom;
    },
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
.overlayPost {
  cursor: wait;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  z-index: 99999;
}
.dugmeBr2 {
  padding: 5px !important;
  font-size: small;
}
.centriraj {
  font-weight: bolder;
  background-color: rgba(0, 0, 0, 0.6);
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
.ABSOLUTNIDIV {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: auto;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 9999;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}
.ABSOLUTNIDIV img {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
}
.close-btn {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 24px;
  color: white;
  background: transparent;
  border: none;
  cursor: pointer;
}
.runda{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: auto;
  z-index: 9999;
  padding: 20px;
  text-align: center;
  font: bold;
  font-size: 200px;
}
.close-btn:hover {
  color: #f00;
}
</style>
