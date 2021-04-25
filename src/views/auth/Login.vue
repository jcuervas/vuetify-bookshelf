<template>
  <v-form v-model="valid" class="v-responsive justify-center align-center">
    <v-container class="d-flex flex-column align-center">
      <h2 class="m-10">Please login</h2>
      <v-card elevation="2" width="80vw" max-width="400px">
        <v-card-text>
          <v-text-field
            outlined
            autocomplete="username"
            v-model="username"
            :rules="usernameRules"
            label="Username"
            required
            @keyup="submitOnEnter"
          ></v-text-field>
          <v-text-field
            outlined
            autocomplete="current-password"
            v-model="password"
            label="password"
            type="password"
            required
            @keyup="submitOnEnter"
          ></v-text-field>
        </v-card-text>
        <v-alert
          :value="!!error"
          dismissible
          color="error"
          class="w-80-x ma-auto"
          transition="scroll-y-transition"
          type="warning"
          >{{ error }}</v-alert
        >
        <v-card-actions>
          <v-btn block color="primary" :disabled="!valid" @click="onSubmit">
            Login
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: "AuthLayout",
  data: () => ({
    valid: false,
    password: "mipass",
    username: "user",
    usernameRules: [(v) => !!v || "username is required"],
    error: null,
  }),
  methods: {
    async onSubmit() {
      this.error = await this.$store.dispatch("login", {
        username: this.username,
        password: this.password,
      });
      if (!this.error) {
        return this.$router.push({ name: "Home" });
      }
    },
    submitOnEnter(ev) {
      if (ev.key === "Enter") {
        return this.onSubmit();
      }
    },
  },
};
</script>

<style scoped></style>
