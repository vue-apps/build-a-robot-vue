<template>
  <div class="content">
    <div class="preview">
      <CollapsibleSection>
        <div class="preview-content">
          <div class="top-row">
            <img :src="selectedRobot.head.src" />
          </div>
          <div class="middle-row">
            <img :src="selectedRobot.leftArm.src" class="rotate-left" />
            <img :src="selectedRobot.torso.src" />
            <img :src="selectedRobot.rightArm.src" class="rotate-right" />
          </div>

          <div class="bottom-row">
            <img :src="selectedRobot.base.src" />
          </div>
        </div>
      </CollapsibleSection>
      <button class="add-to-cart" @click="addToCart">Add to Cart</button>
    </div>
    <div class="robot-parts">
      <div class="top-row">
        <div class="robot-name">
          {{ selectedRobot.head.title }}
          <span v-show="selectedRobot.head.onSale" class="sale">
            - On Sale!</span
          >
        </div>

        <PartSelector
          :parts="availableParts.heads"
          position="top"
          @partSelected="(part) => (selectedRobot.head = part)"
        />
      </div>
      <div class="middle-row">
        <PartSelector
          :parts="availableParts.arms"
          position="left"
          @partSelected="(part) => (selectedRobot.leftArm = part)"
        />
        <PartSelector
          :parts="availableParts.torsos"
          position="center"
          @partSelected="(part) => (selectedRobot.torso = part)"
        />
        <PartSelector
          :parts="availableParts.arms"
          position="right"
          @partSelected="(part) => (selectedRobot.rightArm = part)"
        />
      </div>
      <div class="bottom-row">
        <PartSelector
          :parts="availableParts.bases"
          position="bottom"
          @partSelected="(part) => (selectedRobot.base = part)"
        />
      </div>
    </div>
    <div class="cart-info">
      <h2>Cart Details</h2>
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
  </div>
</template>

<script>
import availableParts from '@/data/parts';
import createdHookMixin from '@/build/created-hook-mixin';
import PartSelector from '@/build/PartSelector';
import CollapsibleSection from '@/shared/CollapsibleSection';

export default {
  name: 'RobotBuilder',
  components: {
    PartSelector,
    CollapsibleSection,
  },
  data() {
    return {
      availableParts,
      cart: [],
      selectedRobot: {
        head: {},
        leftArm: {},
        rightArm: {},
        torso: {},
        base: {},
      },
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
.robot-name {
  position: absolute;
  top: -25px;
  text-align: center;
  width: 100%;
  .sale {
    color: red;
  }
}

.cart-info {
  // text-align: center;
  padding-top: 20px;
  padding-left: 20px;
  width: 250px;

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
}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  position: relative;

  // @media (max-width: 1016px) {
  //   &.content {
  //     width: 600px;
  //   }
  // }
  @media (min-width: 820px) {
    &.content {
      justify-content: flex-start;
    }
  }

  .add-to-cart {
    // position: absolute;
    width: 210px;
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

.preview {
  // position: absolute;
  // top: -20px;
  // right: 0;
  width: 210px;
  height: 210px;
  padding: 5px;

  // @media (max-width: 1016px) {
  //   &.preview {
  //     right: -200px;
  //   }
  // }

  // @media (max-width: 860px) {
  //   &.preview {
  //     position: static;
  //   }
  // }
}
.preview-content {
  border: 1px solid #999;
}
.preview img {
  width: 50px;
  height: 50px;
}
.rotate-right {
  transform: rotate(90deg);
}
.rotate-left {
  transform: rotate(-90deg);
}
</style>
