<template>
  <div class="home">
    <v-app-bar app color="secondary" dense>
      <v-app-bar-nav-icon @click="$router.back()">
        <v-icon>mdi-arrow-left</v-icon>
      </v-app-bar-nav-icon>
      <v-app-bar-title>Books Shelf - demo app</v-app-bar-title>
      <v-spacer></v-spacer>

      <v-menu offset-y open-on-hover>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" v-bind="attrs" v-on="on">
            {{ $store.state.auth.user && $store.state.auth.user.username }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in items" :key="index" link>
            <v-list-item-title @click="item.handler">{{
              item.title
            }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
  data() {
    return {
      items: [
        {
          title: "Logout",
          handler: () => {
            this.$store.dispatch("logout");
            this.$router.push({ name: "Login" });
          },
        },
      ],
    };
  },
};
</script>
