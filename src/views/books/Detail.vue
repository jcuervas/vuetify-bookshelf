<template>
  <v-container
    fluid
    class="d-flex flex-column mt-15 justify-center align-center"
  >
    <v-card width="90vw" max-width="600px">
      <v-card-text>
        <v-img
          src="https://images.twinkl.co.uk/tr/image/upload/illustation/Open-Book-Emoji--Newsroom-KS2-black-and-white-RGB.png"
        ></v-img>
        <h2 class="mt-5">{{ book.title }}</h2>
        <h4 class="font-italic">{{ book.author }}</h4>
        <h5 class="font-italic">
          {{ formatDate(book.publicationDate) }}
        </h5>
        <v-divider />
        <p>{{ book.description }}</p>
        <v-divider />
        <h3 class="mt-5">Reviews</h3>
        <v-list>
          <v-list-item v-for="review of book.reviews" :key="review['@id']">
            <v-list-item-avatar>
              <v-icon>mdi-account-circle</v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              {{ review.body }}
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { format } from "date-fns";

export default {
  name: "Detail",
  data() {
    return {
      book: this.$store.state.currentBook,
    };
  },
  methods: {
    getBook() {
      this.$store.dispatch("getBook", this.$route.params.id);
    },
    formatDate(date) {
      console.log({ Date: new Date(date), date });
      return format(new Date(date), "DD-MM-YYYY");
    },
  },
  async mounted() {
    await this.getBook();
  },
};
</script>

<style scoped></style>
