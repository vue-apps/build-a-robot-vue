<template>
  <div class="content">
    <button class="add-to-cart" @click="addToCart">Add to Cart</button>
    <div class="top-row">
      <div :class="[saleBorderClass, 'top', 'part']">
        <div class="robot-name">
          {{ selectedRobot.head.title }}
          <span v-show="selectedRobot.head.onSale" class="sale">
            - On Sale!</span
          >
        </div>
        <img v-bind:src="selectedRobot.head.src" />
        <button @:click="selectPreviousHead()" class="prev-selector">
          &#9668;
        </button>
        <button @:click="selectNextHead()" class="next-selector">
          &#9658;
        </button>
      </div>
    </div>
    <div class="middle-row">
      <div class="left part">
        <img :src="selectedRobot.leftArm.src" />arm" />
        <button @click="selectPreviousLeftArm()" class="prev-selector">
          &#9650;
        </button>
        <button @click="selectNextLeftArm()" class="next-selector">
          &#9660;
        </button>
      </div>
      <div class="center part">
        <img :src="selectedRobot.torso.src" />
        <button @click="selectPreviousTorso()" class="prev-selector">
          &#9668;
        </button>
        <button @click="selectNextTorso()" class="next-selector">
          &#9658;
        </button>
      </div>
      <div class="right part">
        <img :src="selectedRobot.rightArm.src" />
        <button @click="selectPreviousRightArm()" class="prev-selector">
          &#9650;
        </button>
        <button @click="selectNextRightArm()" class="next-selector">
          &#9660;
        </button>
      </div>
    </div>
    <div class="bottom-row">
      <div class="bottom part">
        <img :src="selectedRobot.base.src" />
        <button @click="selectPreviousBase()" class="prev-selector">
          &#9668;
        </button>
        <button @click="selectNextBase()" class="next-selector">
          &#9658;
        </button>
      </div>
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

function getPreviousValidIndex(index, length) {
  const deprecatedIndex = index - 1;
  return deprecatedIndex < 0 ? length - 1 : deprecatedIndex;
}

function getNextValidIndex(index, length) {
  const incrementedIndex = index + 1;
  return incrementedIndex > length - 1 ? 0 : incrementedIndex;
}

export default {
  name: 'RobotBuilder',
  created() {
    console.log('component mounted');
  },
  data() {
    return {
      availableParts,
      cart: [],
      selectedHeadIndex: 0,
      selectedLeftArmIndex: 0,
      selectedRightArmIndex: 0,
      selectedTorsoIndex: 0,
      selectedBaseIndex: 0,
    };
  },
  computed: {
    saleBorderClass() {
      return this.selectedRobot.head.onSale ? 'sale-border' : '';
    },

    selectedRobot() {
      return {
        head: availableParts.heads[this.selectedHeadIndex],
        leftArm: availableParts.arms[this.selectedLeftArmIndex],
        rightArm: availableParts.arms[this.selectedRightArmIndex],
        torso: availableParts.torsos[this.selectedTorsoIndex],
        base: availableParts.bases[this.selectedBaseIndex],
      };
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
    selectNextHead() {
      this.selectedHeadIndex = getNextValidIndex(
        this.selectedHeadIndex,
        availableParts.heads.length
      );
    },
    selectPreviousHead() {
      this.selectedHeadIndex = getPreviousValidIndex(
        this.selectedHeadIndex,
        availableParts.heads.length
      );
    },
    selectNextLeftArm() {
      this.selectedLeftArmIndex = getNextValidIndex(
        this.selectedLeftArmIndex,
        availableParts.arms.length
      );
    },
    selectPreviousLeftArm() {
      this.selectedLeftArmIndex = getPreviousValidIndex(
        this.selectedLeftArmIndex,
        availableParts.arms.length
      );
    },
    selectNextRightArm() {
      this.selectedRightArmIndex = getNextValidIndex(
        this.selectedRightArmIndex,
        availableParts.arms.length
      );
    },
    selectPreviousRightArm() {
      this.selectedRightArmIndex = getPreviousValidIndex(
        this.selectedRightArmIndex,
        availableParts.arms.length
      );
    },
    selectNextTorso() {
      this.selectedTorsoIndex = getNextValidIndex(
        this.selectedTorsoIndex,
        availableParts.torsos.length
      );
    },
    selectPreviousTorso() {
      this.selectedTorsoIndex = getPreviousValidIndex(
        this.selectedTorsoIndex,
        availableParts.torsos.length
      );
    },
    selectNextBase() {
      this.selectedBaseIndex = getNextValidIndex(
        this.selectedBaseIndex,
        availableParts.bases.length
      );
    },
    selectPreviousBase() {
      this.selectedBaseIndex = getPreviousValidIndex(
        this.selectedBaseIndex,
        availableParts.bases.length
      );
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

.robot-name {
  position: absolute;
  top: -25px;
  text-align: center;
  width: 100%;
}

.sale {
  color: red;
  font-weight: bold;
}

.part {
  position: relative;
  width: 165px;
  height: 165px;
  border: 3px solid #aaa;
  img {
    width: 165px;
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
.head {
  border-bottom: none;
}
.left {
  border-right: none;
  img {
    transform: rotate(-90deg);
  }
}
.right {
  border-left: none;
  img {
    transform: rotate(90deg);
  }
}

.bottom {
  border-top: none;
}
.prev-selector {
  position: absolute;
  z-index: 1;
  top: -3px;
  left: -28px;
  width: 25px;
  height: 171px;
}
.next-selector {
  position: absolute;
  z-index: 1;
  top: -3px;
  right: -28px;
  width: 25px;
  height: 171px;
}
.center .prev-selector,
.center .next-selector {
  opacity: 0.8;
}
.left .prev-selector {
  top: -28px;
  left: -3px;
  width: 144px;
  height: 25px;
}
.left .next-selector {
  top: auto;
  bottom: -28px;
  left: -3px;
  width: 144px;
  height: 25px;
}
.right .prev-selector {
  top: -28px;
  left: 24px;
  width: 144px;
  height: 25px;
}
.right .next-selector {
  top: auto;
  bottom: -28px;
  left: 24px;
  width: 144px;
  height: 25px;
}
.right .next-selector {
  right: -3px;
}
</style>
