<template>
  <div>
    <div
      class="profile_bg container-fluid p-0 border-bottom border-4 border-secondary"
    >
      <div class="profile_bg_img">
        <img src="@/assets/profile_background.jpg" alt="" />
      </div>
      <div class="pola position-relative">
        <div class="okvir position-absolute top-100 start-50 translate-middle">
          <img
            :src="this.ProfileImageSrc"
            alt=""
            class="rounded-circle border-4 border border-light"
          />
        </div>
      </div>
    </div>
    <div
      v-if="isModalOpen"
      class="modal fade show d-block"
      tabindex="-1"
      role="dialog"
      style="background-color: rgba(0, 0, 0, 0.5)"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit profil</h5>
            <button
              type="button"
              class="btn-close"
              @click="isModalOpen = false"
            ></button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="imePrezime">Ime i prezime: </label>
              <div class="input-group">
                <span class="input-group-text" id="imePrezime">{{
                  ime_prezime.split(" ")[0]
                }}</span>
                <input
                  minlength="1"
                  v-model="prezime"
                  @keydown.space.prevent
                  type="text"
                  class="form-control"
                  id="basic-url"
                  aria-describedby="basic-addon3 basic-addon4"
                />
              </div>
              <label for="username">Username: </label>
              <input
                v-model="newusername"
                type="text"
                id="username"
                class="form-control"
                maxlength="30"
              />
              <label for="bio">bio: </label>
              <input
                v-model="newbio"
                type="text"
                id="bio"
                class="form-control"
                maxlength="30"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="isModalOpen = false"
            >
              Odustani
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="confirmEditProfile()"
            >
              Potvrdi
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="ProfileEditor">
      <div class="vstack gap-2 ms-3 mt-2">
        <div
          v-show="showHomepage"
          class="p-2 showHomePage"
          @click="onThePage(``)"
          :class="{ show: showHomepage }"
        >
          <Icon
            icon="material-symbols:garage-door-rounded"
            width="30"
            class="me-2"
          />
          Homepage
        </div>
        <div
          v-show="showGallery"
          class="p-2 showGallery"
          :class="{ show: showGallery }"
        >
          <Icon icon="emojione:framed-picture" width="30" class="me-2" />
          Gallery
        </div>
        <div
          class="p-2 showImage"
          v-show="showAddImage"
          :class="{ show: showAddImage }"
        >
          <Icon
            icon="material-symbols:add-a-photo-outline"
            width="30"
            class="me-2"
          />
          Add image
        </div>
        <div class="fixedProfileEditor">
          <div class="p-2 fs-1">@{{ this.username }}</div>
          <hr />
          <div class="p-2 fs-5">
            {{ this.ime_prezime }}
            <div class="p-2 bio">* {{ this.bio }}</div>
          </div>
          <div class="p-2 cursiveCC" @click="isModalOpen = true">
            <Icon
              icon="emojione:man-medium-skin-tone"
              width="30"
              class="me-2"
            />
            Edit profile
          </div>
          <div class="p-2 cursiveCC">
            <Icon icon="ic:twotone-people-alt" width="30" class="me-2" />
            Friends
          </div>
          <div class="p-2 cursiveCC">
            <Icon icon="emojione:racing-car" width="30" class="me-2" />
            Cars
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row align-items-start">
        <div class="col"></div>
        <div class="col">
          <div class="postContainer">
            <div v-if="admin" class="text-center">
              <button data-bs-toggle="modal" data-bs-target="#exampleModal5">
                Dodaj trku
              </button>
              <div
                class="border bg-secondary p-2 mt-5"
                v-for="utrka in UtrkeAdmin"
                :key="utrka.id"
              >
                {{ utrka.raceName }}
                <hr />
                {{ utrka.raceDesc }}
                <hr />
                Lista auta koji se trkaju:
                <div
                  class="text-black fw-bold"
                  v-for="carId in utrka.auti"
                  :key="carId"
                >
                  <div v-if="getCarById(carId)">
                    {{ getCarById(carId).Marka }}
                    {{ getCarById(carId).Model }}
                    ({{ getCarById(carId).Snaga }}kw /
                    {{ getCarById(carId).Weight }} kg) from
                    {{ getCarById(carId).Owner }}
                    <div></div>
                  </div>
                </div>
                <hr />
                <div v-if="utrka.auti.length != 16">
                  Imas zahtjev za {{ utrka.zahtjevAuti.length }} auta
                </div>
                <div v-if="utrka.auti.length != 16" class="mt-3">
                  <button
                    data-bs-toggle="modal"
                    :data-bs-target="'#exampleModalAutiRace' + utrka.id"
                  >
                    UPRAVLJAJ
                  </button>
                </div>
                <div v-if="utrka.auti.length === 16">
                  <button
                    @click="goToPageRace(utrka.auti, utrka.raceName, utrka.id)"
                  >
                    ODRADI
                  </button>
                </div>
                <div
                  class="modal fade"
                  :id="'exampleModalAutiRace' + utrka.id"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">
                          Kontroliraj aute
                        </h1>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div v-if="utrka.auti.length != 16" class="modal-body">
                        <div v-for="carId in utrka.zahtjevAuti" :key="carId">
                          <div v-if="getCarById(carId)">
                            {{ getCarById(carId).Marka }}
                            {{ getCarById(carId).Model }}
                            {{ getCarById(carId).Snaga }}(kw
                            {{ getCarById(carId).Weight }} kg) from
                            {{ getCarById(carId).Owner }}
                            <div>
                              <button @click="acceptCar(carId, utrka.id)">
                                PRIHVATI
                              </button>
                            </div>
                          </div>
                          <hr />
                        </div>
                      </div>
                      <div class="modal-footer"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <postCard
              v-for="card in filteredPosts"
              :key="card.posted_at"
              :info="card"
            />
          </div>
        </div>
        <div class="col mt-5 text-center">
          <form @submit.prevent="addCar">
            <div
              ref="carAdder"
              class="p-3 w-50 m-auto bg-body-tertiary carAdder mb-4 rounded"
            >
              <h3 class="p-2">Dodaj auto</h3>
              Marka
              <select
                required
                v-model="chosenMark"
                class="form-select mb-2"
                id="inputGroupSelect01"
              >
                <option
                  v-for="marka in marke"
                  :key="marka.marka"
                  :value="marka.marka"
                >
                  {{ marka.marka }}
                </option>
              </select>
              Model
              <select
                required
                v-model="chosenModel"
                class="form-select mb-2"
                id="inputGroupSelect01"
              >
                <option
                  v-for="model in selectedMarkModels"
                  :key="model"
                  :value="model"
                >
                  {{ model }}
                </option>
              </select>
              Pogon
              <select
                required
                v-model="chosenPogon"
                class="form-select mb-2"
                id="inputGroupSelect01"
              >
                <option selected value="FWD">FWD</option>
                <option value="RWD">RWD</option>
                <option value="AWD">AWD</option>
              </select>
              Godina prozivodnje
              <select required class="form-select mb-2" v-model="selectedYear">
                <option v-for="year in years" :key="year" :value="year">
                  {{ year }}
                </option>
              </select>
              Motorizacija
              <select
                required
                v-model="chosenMotorizacija"
                class="form-select mb-2"
                id="inputGroupSelect01"
              >
                <option selected value="Dizel">Dizel</option>
                <option value="Benzin">Benzin</option>
                <option value="Hibrid">Hibrid</option>
                <option value="Elektro">Elektro</option>
              </select>
              Snaga
              <div class="input-group mb-2">
                <input
                  required
                  v-model="chosenSnaga"
                  type="number"
                  :max="5000"
                  :min="1"
                  class="form-control"
                />
                <span class="input-group-text">kW</span>
              </div>
              Kilaža
              <div class="input-group mb-2">
                <input
                  required
                  v-model="chosenWeight"
                  type="number"
                  :min="50"
                  :max="10000"
                  class="form-control"
                />
                <span class="input-group-text">kg</span>
              </div>
              Mjenjač
              <select
                required
                v-model="chosenTransmition"
                class="form-select mb-2"
                id="inputGroupSelect01"
              >
                <option selected value="automatic">Automatic</option>
                <option value="manual">Manual</option>
              </select>
              Registracija
              <input
                :required="registeredCar"
                :disabled="!registeredCar"
                v-model="chosenRegistration"
                type="text"
                maxlength="10"
                @keydown.space.prevent
                class="form-control mb-2"
              />
              <div v-if="carPic" class="image_wrapper p-0 mb-1">
                <img :src="carPic" alt="Slika" />
              </div>
              <div class="form-check form-switch mb-2">
                <input
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckChecked"
                  checked
                  v-model="registeredCar"
                />
                <label class="form-check-label" for="flexSwitchCheckChecked"
                  >Cestovno registriran auto</label
                >
              </div>
              Dodaj fotografiju
              <div class="input-group mb-3">
                <input
                  required
                  @change="onFileChange($event)"
                  type="file"
                  class="form-control"
                  id="inputGroupFile02"
                />
              </div>
              <button
                :disabled="btnClicked"
                type="submit"
                class="btn btn-light"
              >
                Dodaj auto
              </button>
            </div>
          </form>
          <div ref="probni" class="carFlower overflow-y-scroll">
            <carProfCard v-for="car in myCars" :key="car" :carNew="car">
            </carProfCard>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="showModal"
      class="modal fade show d-block"
      tabindex="-1"
      role="dialog"
      style="background-color: rgba(0, 0, 0, 0.5)"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Prilagodi ime auta</h5>
            <button
              type="button"
              class="btn-close"
              @click="showModal = false"
            ></button>
          </div>
          <div class="modal-body">
            <div class="example">
              <p><strong>Primjeri:</strong></p>
              <p><em>C-Class &rarr; C 220d coupe</em></p>
              <p><em>911 &rarr; 911 Turbo s</em></p>
            </div>
            <div class="form-group">
              <label for="carName">Ime auta:</label>
              <input
                v-model="carName"
                type="text"
                class="form-control"
                id="carName"
                maxlength="30"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="showModal = false"
            >
              Odustani
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="confirmAddCar"
            >
              Potvrdi
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="exampleModal5"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Nova Utrka</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="form-group mb-3">
              <label for="raceName">Ime trke:</label>
              <input
                v-model="raceName"
                type="text"
                class="form-control"
                id="raceName"
                placeholder="Unesite ime trke"
              />
            </div>
            <div class="form-group mb-3">
              <label for="raceDescription">Opis trke:</label>
              <textarea
                v-model="raceDesc"
                class="form-control"
                id="raceDescription"
                rows="3"
                placeholder="Unesite opis trke"
              ></textarea>
            </div>
            <div class="form-group mb-3 text-center">
              <label for="trophyIcon"
                >Trofej:
                <Icon icon="emojione:trophy" width="30" class="me-2" />
              </label>
              <div>
                <i class="bi bi-trophy-fill fs-1"></i>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Odustani
            </button>
            <button @click="addRace()" type="button" class="btn btn-primary">
              Dodaj trku
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import postCard from "@/components/postCard.vue";
import carProfCard from "@/components/carProfCard.vue";
import store from "@/store";
import { Icon } from "@iconify/vue";
import {
  doc,
  collection,
  db,
  collectionGroup,
  runTransaction,
  getStorage,
  documentId,
  ref,
  uploadBytes,
  query,
  getDownloadURL,
  orderBy,
  where,
  setDoc,
  getDocs,
  getDoc,
  getAuth,
  updateDoc,
  onAuthStateChanged,
} from "@/firebase";
const auth = getAuth();
const storage = getStorage();
export default {
  name: "profile",
  data() {
    return {
      carsInRequest: [],
      carsInRequestID: [],
      raceName: "",
      UtrkeAdmin: [],
      raceDesc: "",
      newbio: "",
      newusername: "",
      allCars: [],
      prezime: "",
      isModalOpen: false,
      idealET: 0,
      myCars: [],
      btnClicked: false,
      chosenModel: "",
      chosenMotorizacija: "",
      chosenPogon: "",
      chosenRegistration: "",
      chosenSnaga: "",
      chosenTransmition: "",
      chosenWeight: "",
      admin: false,
      showModal: false,
      carName: "",
      registeredCar: true,
      carPicFile: "",
      carPic: "",
      store,
      cards: [],
      carImageSrc: "",
      ProfileImageSrc: "",
      bio: "",
      ime_prezime: "",
      username: "",
      showAddImage: false,
      showGallery: false,
      showHomepage: false,
      marke: store.marke,
      chosenMark: "",
      selectedYear: new Date().getFullYear(),
      years: Array.from(
        { length: new Date().getFullYear() - 1899 },
        (_, i) => 1900 + i
      ).reverse(),
    };
  },

  methods: {
    goToPageRace(auti, imeUtrke, idUtrke) {
      this.$router.push({
        name: "cup",
        query: {
          idUtrke: idUtrke,
          imeUtrke: imeUtrke,
          SendedCars: JSON.stringify(auti),
        },
      });
    },

    async addCar() {
      if (this.registeredCar) {
        const isUnique = await this.checkUniqueRegistration(
          this.chosenRegistration.toUpperCase()
        );
        if (!isUnique) {
          alert(
            "Registracija već postoji. Molimo unesite jedinstvenu registraciju."
          );
          return;
        }
      }
      this.carName = this.chosenModel;
      this.showModal = true;
    },
    async confirmEditProfile() {
      const uniqueUsername = await this.checkIfUserUnique(this.newusername);
      if (
        !uniqueUsername &&
        this.newbio === this.bio &&
        this.prezime === this.ime_prezime.split(" ")[1]
      ) {
        alert("username vec postoji!");
        return;
      }
      this.isModalOpen = false;
      const q = doc(db, "users", "ID" + store.userMail);
      await updateDoc(q, {
        bio: this.newbio,
        ime_prezime: this.ime_prezime.split(" ")[0] + " " + this.prezime,
        username: this.newusername,
      });
      window.location.reload();
    },
    async confirmAddCar() {
      this.showModal = false;

      switch (this.chosenPogon) {
        case "AWD":
          this.idealET =
            5.9 *
            ((this.chosenWeight * 2.2046) / (this.chosenSnaga * 1.34)) **
              (1 / 3);
          break;
        case "FWD":
          this.idealET =
            6.18 *
            ((this.chosenWeight * 2.2046) / (this.chosenSnaga * 1.34)) **
              (1 / 3);
          break;
        case "RWD":
          this.idealET =
            6.25 *
            ((this.chosenWeight * 2.2046) / (this.chosenSnaga * 1.34)) **
              (1 / 3);
          break;
      }

      if (this.chosenTransmition === "Manual") this.idealET += 0.5;
      if (this.chosenMotorizacija === "Elektro") this.idealET -= 0.2;
      if (this.chosenMotorizacija === "Dizel") this.idealET += 0.3;
      if (this.chosenMark === "Porsche") this.idealET -= 0.3;
      if (this.chosenMark === "BMW") this.idealET += 0.3;
      if (this.idealET < 9) this.idealET += 1 - this.idealET / 10;

      this.btnClicked = true;

      const file = this.carPicFile;
      const storageRef = ref(storage, "carsPictures/" + Date.now() + file.name);
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(ref(storageRef));
      this.carImageSrc = url;

      const carRef = doc(
        db,
        "users",
        "ID" + store.userMail,
        "cars",
        Date.now() + "car" + this.chosenMark + this.chosenModel
      );

      await setDoc(carRef, {
        Marka: this.chosenMark,
        Model: this.carName,
        carYear: this.selectedYear,
        Motorizacija: this.chosenMotorizacija,
        Pogon: this.chosenPogon,
        Registracija: this.chosenRegistration.toUpperCase(),
        Snaga: this.chosenSnaga,
        Transmition: this.chosenTransmition,
        Weight: this.chosenWeight,
        registeredCar: true,
        carPic: this.carImageSrc,
        carOwner: store.userMail,
        carOwnerUsername: store.activeUsername,
        idealET: this.idealET.toFixed(2),
        trofeji: [],
      });

      this.resetForm();
      window.location.reload();
    },
    resetForm() {
      this.chosenMark = "";
      this.chosenModel = "";
      this.chosenMotorizacija = "";
      this.chosenPogon = "";
      this.chosenRegistration = "";
      this.chosenSnaga = "";
      this.chosenTransmition = "";
      this.chosenWeight = "";
      this.registeredCar = true;
      this.carPicFile = "";
      this.carPic = "";
      this.btnClicked = false;
    },
    async checkUniqueRegistration(registration) {
      const q = query(
        collection(db, `users/ID${store.userMail}/cars`),
        where("Registracija", "==", registration)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.empty;
    },
    async addRace() {
      if (this.raceName === "") {
        alert("Niste unjeli ime utrke");
        return;
      }
      await setDoc(doc(db, "races", Date.now() + this.raceName), {
        raceName: this.raceName,
        raceDesc: this.raceDesc,
        zahtjevAuti: [],
        auti: [],
      });
      window.location.reload();
    },
    onFileChange(event) {
      console.log(this.registeredCar);
      const file = event.target.files[0];
      if (file) {
        this.carPic = URL.createObjectURL(file);
        this.carPicFile = file;
      }
    },

    handleScroll() {
      const carAdderDiv = this.$refs.carAdder;
      const probniDiv = this.$refs.probni;
      if (!carAdderDiv || !probniDiv) return;
      const carAdderRect = carAdderDiv.getBoundingClientRect();

      const isCarAdderOutOfView = carAdderRect.bottom < 50;

      if (isCarAdderOutOfView) {
        probniDiv.classList.add("fixed");
      } else {
        probniDiv.classList.remove("fixed");
      }
      const scrollPosition = window.scrollY;
      if (scrollPosition > 60) {
        this.showAddImage = true;
      } else {
        this.showAddImage = false;
      }
      if (scrollPosition > 120) {
        this.showGallery = true;
      } else {
        this.showGallery = false;
      }
      if (scrollPosition > 180) {
        this.showHomepage = true;
      } else {
        this.showHomepage = false;
      }
    },
    onThePage(location) {
      this.$router.push(`/${location}`);
    },
    async getCars() {
      const q = query(collection(db, `users/ID${store.userMail}/cars`));
      const querySnapshot = await getDocs(q);
      this.myCars = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        this.myCars.push({
          id: doc.id,
          Marka: data.Marka,
          Model: data.Model,
          carYear: data.carYear,
          Motorizacija: data.Motorizacija,
          Pogon: data.Pogon,
          Registracija: data.Registracija,
          Snaga: data.Snaga,
          Transmition: data.Transmition,
          Weight: data.Weight,
          registeredCar: data.registeredCar,
          carPic: data.carPic,
          carOwner: data.carOwner,
        });
      });
    },
    async getUtrke() {
      const q = query(collection(db, `races`));
      const querySnapshot = await getDocs(q);

      this.UtrkeAdmin = [];
      const allCarIds = new Set();

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        this.UtrkeAdmin.push({
          raceName: data.raceName,
          raceDesc: data.raceDesc,
          auti: data.auti,
          zahtjevAuti: data.zahtjevAuti,
          id: doc.id,
        });
        if (data.zahtjevAuti) {
          data.zahtjevAuti.forEach((carId) => allCarIds.add(carId));
        }
      });

      this.carsInRequestID = Array.from(allCarIds);
    },
    async getPosts() {
      const q = query(
        collection(db, `users/ID${store.userMail}/posts`),
        orderBy("posted_at", "desc")
      );
      const querySnapshot = await getDocs(q);
      this.cards = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        this.cards.push({
          hashtags: data.hashtags,
          time: data.posted_at,
          postText: data.postText,
          images: data.images,
          profileImage: data.ownerImage,
          username: data.ownerUsername,
          likes: data.likes,
          lovers: data.lovers,
          id: doc.id,
          postOwner: data.postOwner,
          ActiveUserImage: this.ProfileImageSrc,
        });
      });
      console.log("karte su ovo: ", this.cards);
    },
    async checkIfUserUnique(value) {
      const q = query(collection(db, `users`), where("username", "==", value));
      const querySnapshot = await getDocs(q);
      return querySnapshot.empty;
    },
    getCarById(carId) {
      return this.allCars.find((car) => car.id === carId) || {};
    },
    async acceptCar(carId, utrkaId) {
      try {
        const raceRef = doc(db, "races", utrkaId);

        await runTransaction(db, async (transaction) => {
          const raceDoc = await transaction.get(raceRef);

          if (!raceDoc.exists()) {
            throw new Error("Utrka ne postoji!");
          }

          const raceData = raceDoc.data();

          const updatedZahtjevAuti = raceData.zahtjevAuti.filter(
            (id) => id !== carId
          );

          const updatedAuti = [...raceData.auti, carId];

          transaction.update(raceRef, {
            zahtjevAuti: updatedZahtjevAuti,
            auti: updatedAuti,
          });
        });
        this.getUtrke();

        console.log("Auto uspješno prebačen.");
      } catch (error) {
        console.error("Greška prilikom premještanja auta:", error);
      }
    },
    async getAllCars() {
      const cars = query(collectionGroup(db, "cars"));
      const querySnapshot = await getDocs(cars);
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        this.allCars.push({
          id: doc.id,
          Marka: data.Marka,
          Model: data.Model,
          Snaga: data.Snaga,
          Weight: data.Weight,
          Owner: data.carOwnerUsername,
          Pogon: data.Pogon,
        });
      });
    },

    async getProfileInfo() {
      const q = query(
        collection(db, "users"),
        where("email", "==", store.userMail)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log(data);
        this.ime_prezime = data.ime_prezime;
        this.ProfileImageSrc = data.imageSrc;
        this.bio = data.bio;
        this.username = data.username;
        this.prezime = data.ime_prezime.split(" ")[1];
        this.newbio = data.bio;
        this.newusername = data.username;
        this.admin = data.admin;
      });
    },
  },

  async created() {
    window.addEventListener("scroll", this.handleScroll);
    onAuthStateChanged(auth, (user) => {
      this.getProfileInfo();
      this.getPosts();
      this.getCars();
      this.getAllCars();
      this.getUtrke();
    });
  },
  async destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  computed: {
    selectedMarkModels() {
      const marka = this.marke.find((m) => m.marka === this.chosenMark);
      if (marka) {
        return marka.modeli;
      }
    },
    filteredPosts() {
      let searchTags = this.store.searchTags
        .trim()
        .toLowerCase()
        .split(" ")
        .filter((element) => element !== "");
      let filteredPosts = this.cards.filter((obj) => {
        let lowerCaseHashtags = obj.hashtags.map((hashtag) =>
          hashtag.toLowerCase()
        );
        return searchTags.every((searchTag) =>
          lowerCaseHashtags.includes(searchTag)
        );
      });
      return filteredPosts;
    },
  },
  components: {
    postCard,
    Icon,
    carProfCard,
  },
};
</script>

<style scoped>
.postContainer {
  margin-top: 150px;
}
.showImage {
  width: 20vw;
  position: fixed;
  top: 27vh;
}
.fixed {
  position: fixed;
  top: 80px;
  width: 32%;
}

.carAdder {
  border-top-left-radius: 70px !important;
  border-bottom-right-radius: 70px !important;
}
.showGallery {
  width: 20vw;
  position: fixed;
  top: 20vh;
}
.showHomePage {
  width: 20vw;
  position: fixed;
  top: 13vh;
}
.showImage,
.showGallery,
.showHomePage {
  opacity: 0;
  transition: opacity 0.5s, transform 0.5s;
  transform: translateX(-100%);
}
.showImage.show,
.showGallery.show,
.showHomePage.show {
  opacity: 1;
  transform: translateX(0%);
}
.image_wrapper {
  border-style: solid;
  border-color: aliceblue;
  margin: auto;
  background-color: #5e6266;
  width: 200px;
  height: auto;
  max-height: 200px;
  overflow: hidden;
  text-align: center;
}
.image_wrapper img {
  max-height: 200px;
  max-width: 200px;
  width: auto;
  object-fit: contain;
  background-color: #5e6266;
}
.showImage.show {
  animation: slideInImage 0.5s forwards;
}

.showGallery.show {
  animation: slideInGallery 0.5s forwards;
}

.showHomePage.show {
  animation: slideInHomepage 0.5s forwards;
}

@keyframes slideInImage {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0%);
    opacity: 1;
  }
}

@keyframes slideInGallery {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0%);
    opacity: 1;
  }
}

@keyframes slideInHomepage {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0%);
    opacity: 1;
  }
}
.vstack div {
  overflow: hidden;
}
.showImage:hover,
.showGallery:hover,
.showHomePage:hover {
  cursor: pointer;
  background-color: #2a2b2c;
}
.cursiveCC:hover {
  cursor: pointer;
  background-color: #2a2b2c;
}
.fixedProfileEditor {
  width: 20vw;
  position: fixed;
  top: 35vh;
}
.carFlower {
  height: 90vh;
  scrollbar-width: none;
}
.ProfileEditor {
  width: 20vw;
  position: fixed;
  top: 13vh;
}
.bio {
  margin-top: 0;
  margin-left: 20px;
  font-size: 15px !important;
  font-family: cursive;
}
hr {
  border: 1px solid white;
}
.pola {
  width: 60vw;
}
.profile_bg_img {
  height: 200px;
  overflow: hidden;
}
.profile_bg_img img {
  opacity: 0.9;
  width: 100%;
  height: auto;
  object-fit: cover;
}
.okvir {
  position: relative;
  width: 250px;
  height: 250px;
}

.okvir img {
  background-color: aliceblue;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>

<script></script>
