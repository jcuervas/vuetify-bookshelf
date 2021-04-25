<template>
  <v-card
    link
    height="350px"
    width="30%"
    elevation="2"
    class="ma-2"
    shaped
    tile
    @click="goToBook"
  >
    <v-card-text>
      <h3>
        {{ book.title }}
      </h3>
      <h4 class="font-italic">
        {{ book.author }}
      </h4>
      <v-divider class="my-5"></v-divider>
      <p>
        {{ truncate(book.description, 200) }}
      </p>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "BookItem",
  props: ["book"],
  methods: {
    truncate(str, len) {
      const dots = str.length < len ? "" : "...";
      return str.substr(0, len) + dots;
    },
    getId() {
      return this.book["@id"].split("/books/")[1];
    },
    async goToBook() {
      const id = this.getId();
      await this.$store.dispatch("getBook", id);
      return this.$router.push({
        name: "Detail",
        params: { id },
      });
    },
  },
};
</script>

<style scoped></style>
