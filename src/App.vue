<template>
  <div id="app">
    <header>
      <nav>
        <ul>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'Home' }" exact>
              <img src="@/assets/build-a-bot-logo.png" class="logo" />
              Build-a-Bot
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'Build' }">
              Build
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'BrowseParts' }">
              Browse Parts
            </router-link>
          </li>
          <li class="nav-item cart">
            <router-link class="nav-link" to="/cart">
              Cart
            </router-link>
            <div class="cart-items">
              {{ cart.length }}
            </div>
          </li>
        </ul>
      </nav>
    </header>
    <div class="container">
      <aside class="aside">
        <router-view name="sidebar"></router-view>
      </aside>
      <main>
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'App',
  computed: {
    ...mapState('robots', ['cart']),
  },
};
</script>

<style>
body {
  font-family: 'Avenir', Arial, Helvetica, sans-serif;
  background: linear-gradient(to bottom, #555, #999);
  background-attachment: fixed;
}
</style>

<style scoped lang="scss">
#app {
  main {
    padding: 30px;
    background-color: #fff;
    width: 964px;
    min-height: 300px;
  }

  header {
    background-color: #999;
    max-width: 1184px;
    margin: 0 auto;

    ul {
      padding: 3px;
      display: flex;

      .nav-item {
        display: inline-block;
        padding: 5px 10px;
        font-size: 22px;
        border-right: 1px solid #bbb;
        position: relative;

        &.cart {
          position: relative;
          margin-left: auto;
          border-right: none;
        }

        .cart-items {
          position: absolute;
          top: -5px;
          right: -9px;
          font-size: 18px;
          width: 20px;
          text-align: center;
          display: inline-block;
          border-radius: 100px;
          background-color: mediumseagreen;
        }

        .router-link-active {
          color: white;
        }

        .logo {
          vertical-align: middle;
          height: 30px;
        }
      }
      .nav-link {
        text-decoration: none;
        color: inherit;
      }
    }
  }

  .container {
    display: flex;
    margin: 10px auto 0 auto;
    justify-content: center;
    .aside {
      padding: 30px;
      background-color: #aaa;
      width: 100px;
      min-height: 300px;
    }
  }
}
</style>
