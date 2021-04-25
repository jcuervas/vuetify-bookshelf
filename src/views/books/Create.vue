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
          v-model="currentBook.title"
          :rules="validation.title"
          validate-on-blur
          @keyup="submitOnEnter"
        />
        <v-text-field
          outlined
          label="Author"
          v-model="currentBook.author"
          :rules="validation.author"
          @keyup="submitOnEnter"
        />
        <v-text-field
          outlined
          label="Description"
          v-model="currentBook.description"
          :rules="validation.description"
          @keyup="submitOnEnter"
        />
        <v-text-field
          outlined
          label="ISBN"
          v-model="isbn"
          :rules="currentBook.validation.isbn"
          @keyup="submitOnEnter"
        />
        <v-date-picker />
        <v-btn
          rounded
          elevation="2"
          width="10vw"
          min-width="100px"
          large
          :disabled="!validation.valid"
          color="primary"
          @click="submit"
          >Save
        </v-btn>
      </v-card>
      <p class="error pa-2 my-2 rounded" v-if="error">
        {{ error }}
      </p>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: "Detail",
  data() {
    return {
      book: this.$store.state.currentBook,
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
        await this.$store.dispatch("postBook", this.currentBook);
      } catch (e) {
        console.log({ e });
        this.error =
          e.response.data["hydra:title"] +
          ": " +
          e.response.data["hydra:description"];
      }
    },
  },
};
</script>

<style scoped></style>
