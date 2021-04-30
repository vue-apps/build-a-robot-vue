<template>
  <div>
    <h2>Shopping Cart</h2>
    <table>
      <thead>
        <tr>
          <th class="robot-title">
            Robot
          </th>
          <th class="cost">
            Cost
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(robot, index) in cartSaleItems" :key="index">
          <td class="robot-title">
            {{ robot.head.title }}
          </td>
          <td class="cost">
            {{ robot.cost }}
          </td>
        </tr>
      </tbody>
    </table>
    <h2 class="sale-items">You saved money on these robots</h2>
    <table>
      <thead>
        <tr>
          <th class="robot-title">
            Robot
          </th>
          <th class="cost">
            Cost
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(robot, index) in cart" :key="index">
          <td class="robot-title">
            {{ robot.head.title }}
          </td>
          <td class="cost">
            {{ robot.cost }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  computed: {
    cart() {
      return this.$store.state.robots.cart;
    },
    cartSaleItems() {
      return this.$store.getters['robots/cartSaleItems'];
    },
  },
};
</script>

<style scoped lang="scss">
.robot-title {
  text-align: left;
  padding-right: 200px;
}
.cost {
  text-align: left;
}

.sale-items {
  margin-top: 50px;
  font-size: 18px;
  color: red;
}

table {
  border-collapse: collapse;

  thead {
    background-color: #eee;
  }

  td,
  th {
    padding: 10px;
    padding-right: 5px;
    border: 1px solid #c5c5c5;
  }
}
</style>
