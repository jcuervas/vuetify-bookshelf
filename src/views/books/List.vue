<template>
  <v-container class="d-flex flex-column justify-center align-center">
    <v-card width="80vw" max-width="900px" flat>
      <v-card-text>
        <h2 class="my-10 text-center">
          This is another books repository, enjoy it!
        </h2>
        <v-text-field
          hint="Search for books"
          label="Search for books"
          outlined
          v-model="filter"
          :loading="loading"
        >
          <v-icon slot="append">mdi-cloud-search-outline</v-icon>
        </v-text-field>
        <div class="d-flex flex-row flex-wrap justify-space-between">
          <v-card
            link
            height="350px"
            width="30%"
            elevation="2"
            class="ma-2"
            shaped
            tile
            @click="() => $router.push({ name: 'Create' })"
          >
            <v-card-text class="d-flex justify-center align-center h-100-x">
              <v-icon size="150">mdi-plus</v-icon>
            </v-card-text>
          </v-card>
          <BookItem
            v-for="book of filteredBooks"
            :key="book['@id']"
            :book="book"
          ></BookItem>
        </div>
      </v-card-text>
    </v-card>
    <v-pagination v-model="page" :length="pages"></v-pagination>
  </v-container>
</template>

<script>
import BookItem from "@/components/BookItem";

export default {
  name: "List",
  components: { BookItem },
  data() {
    return {
      books: this.$store.state.books,
      page: 1,
      filter: "",
      loading: false,
    };
  },
  computed: {
    filteredBooks() {
      return this.books.filter((b) => {
        return !!JSON.stringify(b)
          .toLocaleLowerCase()
          .includes(this.filter.toLocaleLowerCase());
      });
    },
    pages() {
      // api is returning 30 results and no way to change
      const pages = this.$store.state.totalBooks / 30;
      return Math.floor(pages) + (pages % 1 > 0 ? 1 : 0);
    },
  },
  methods: {
    async getBooks() {
      await this.$store.dispatch("getBooks", { page: this.page });
    },
  },
  async mounted() {
    return this.getBooks();
  },
  watch: {
    page() {
      this.getBooks();
      this.books = Array.from(this.$store.state.books);
    },
  },
};
</script>

<style scoped></style>
