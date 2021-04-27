<template>
  <div class="content">
    <button class="add-to-cart" @click="addToCart">Add to Cart</button>
    <div class="top-row">
      <!-- <div class="robot-name">
        {{ selectedRobot.head.title }}
        <span v-show="selectedRobot.head.onSale" class="sale"> - On Sale!</span> -->

      <PartSelector :parts="availableParts.heads" />
    </div>
    <div class="middle-row">
      <PartSelector />
      <PartSelector />
      <PartSelector />
    </div>
    <div class="bottom-row">
      <PartSelector />
    </div>
    <h1>Cart</h1>
    <table>
      <thead>
        <tr>
          <th>Robot</th>
          <th class="cost">Cost</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(robot, index) in cart" :key="index">
          <td>{{ robot.head.title }}</td>
          <td class="cost">{{ robot.cost }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import availableParts from '@/data/parts';
import createdHookMixin from '@/build/created-hook-mixin';
import PartSelector from '@/build/PartSelector';

export default {
  name: 'RobotBuilder',
  components: {
    PartSelector,
  },
  data() {
    return {
      availableParts,
      cart: [],
      head: {},
      leftArm: {},
      rightArm: {},
      torso: {},
      base: {},
    };
  },
  mixins: [createdHookMixin],
  computed: {
    saleBorderClass() {
      return this.selectedRobot.head.onSale ? 'sale-border' : '';
    },
  },
  methods: {
    addToCart() {
      const robot = this.selectedRobot;
      const cost =
        robot.head.cost +
        robot.leftArm.cost +
        robot.rightArm.cost +
        robot.torso.cost +
        robot.base.cost;
      this.cart.push(Object.assign({}, robot, { cost }));
      console.log(this.cart);
    },
  },
};
</script>

<style scoped lang="scss">
table {
  border-collapse: collapse;

  td,
  th {
    text-align: left;
    padding: 10px;
    padding-right: 5px;
    border: 1px solid #c5c5c5;
  }
}
.robot-name {
  position: absolute;
  top: -25px;
  text-align: center;
  width: 100%;
}

.content {
  position: relative;
  .add-to-cart {
    position: absolute;
    right: 30px;
    width: 220px;
    padding: 3px;
    font-size: 16px;
  }
  .sale-border {
    border: 3px solid red;
  }
}

.top-row {
  display: flex;
  justify-content: space-around;
}
.middle-row {
  display: flex;
  justify-content: center;
}
.bottom-row {
  display: flex;
  justify-content: space-around;
  border-top: none;
}
</style>
