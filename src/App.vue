<template>
  <div id="app">
    <header>
      <nav>
        <ul>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'Home' }">
              <img src="@/assets/build-a-bot-logo.png" class="logo" />
              Build-a-Bot
            </router-link>
          </li>
        </ul>
      </nav>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
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
    margin: 0 auto;
    padding: 30px;
    background-color: #fff;
    max-width: 1024px;
    min-height: 300px;
  }

  header {
    background-color: #999;
    max-width: 1084px;
    margin: 0 auto;

    ul {
      padding: 3px;
      display: flex;

      .nav-item {
        display: inline-block;
        padding: 5px 10px;
        font-size: 22px;
        border-right: 1px solid #bbb;

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
}
</style>
