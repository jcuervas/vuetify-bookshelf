<template>
  <v-container fluid class="d-flex flex-column justify-center align-center">
    <h2 class="my-5">Create new book</h2>
    <v-form v-model="validation.valid">
      <v-card
        elevation="2"
        width="80vw"
        max-width="500px"
        class="d-flex pa-3 flex-column justify-center grey lighten-5 rounded-lg"
      >
        <v-text-field
          outlined
          label="Title"
          v-model="book.title"
          :rules="validation.title"
          validate-on-blur
          @keyup="submitOnEnter"
        />
        <v-text-field
          outlined
          label="Author"
          v-model="book.author"
          :rules="validation.author"
          @keyup="submitOnEnter"
        />
        <v-text-field
          outlined
          label="Description"
          v-model="book.description"
          :rules="validation.description"
          @keyup="submitOnEnter"
        />
        <v-text-field
          outlined
          label="ISBN"
          v-model="book.isbn"
          :rules="validation.isbn"
          @keyup="submitOnEnter"
        />
        <v-menu
          ref="menu"
          v-model="pubDatePicker"
          :close-on-content-click="false"
          :return-value.sync="book.publicationDate"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              outlined
              readonly
              :value="formatDate(book.publicationDate)"
              label="Publication date"
              prepend-icon="mdi-calendar"
              v-bind="attrs"
              v-on="on"
              @click:clear="book.publicationDate = null"
            ></v-text-field>
          </template>
          <v-date-picker
            @change="$refs.menu.save(book.publicationDate)"
            v-model="book.publicationDate"
            no-title
            scrollable
          >
          </v-date-picker>
        </v-menu>
        <v-btn
          rounded
          elevation="2"
          width="10vw"
          min-width="100px"
          block
          :disabled="!validation.valid"
          color="primary"
          @click="submit"
          >Save
        </v-btn>
        <p class="error pa-2 my-2 rounded-lg" v-if="error">
          {{ error }}
        </p>
      </v-card>
    </v-form>
  </v-container>
</template>

<script>
import { format } from "date-fns";

export default {
  name: "Detail",
  data() {
    return {
      book: this.$store.state.currentBook || this.newBook(),
      pubDatePicker: false,
      validation: {
        valid: false,
        title: [(v) => !!v || "Please, enter a title"],
        author: [(v) => !!v || "Please, enter an author"],
        isbn: [(v) => !!v || "Please, enter the isbn"],
        description: [(v) => !!v || "Please, enter a description"],
      },
      error: "",
    };
  },
  methods: {
    submitOnEnter(ev) {
      if (ev.key === "Enter") {
        return this.onSubmit();
      }
    },
    async submit() {
      try {
        await this.$store.dispatch("postBook", this.book);
      } catch (e) {
        console.log({ e });
        this.error =
          e.response.data["hydra:title"] +
          ": " +
          e.response.data["hydra:description"];
      }
    },
    newBook() {
      return {};
    },
    formatDate(date) {
      return date && format(new Date(date), "DD-MM-YYYY");
    },
  },
  watch: {
    book(value) {
      this.$store.commit("currentBook", value);
    },
  },
};
</script>

<style scoped></style>
