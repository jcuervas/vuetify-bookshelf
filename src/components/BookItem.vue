<template>
  <v-card link height="350px" elevation="2" shaped tile @click="goToBook">
    <v-card-text>
      <v-card-title>
        {{ book.title }}
      </v-card-title>
      <v-card-subtitle>
        {{ book.author }}
      </v-card-subtitle>
      <v-divider class="mb-2"></v-divider>
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

<style scoped>
.v-card__title {
  font-size: 1.1rem;
  line-height: 1.4rem;
  word-break: break-word;
  padding: 0;
}
.v-card__title + .v-card__subtitle {
  margin-bottom: 0;
  padding: 0;
  margin-top: 2px;
}
</style>
