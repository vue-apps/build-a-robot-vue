<template>
  <div v-if="availableParts" class="content">
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
  </div>
</template>

<script>
import PartSelector from '@/components/build/PartSelector';
import CollapsibleSection from '@/components/shared/CollapsibleSection';

export default {
  name: 'RobotBuilder',
  created() {
    this.$store.dispatch('robots/getParts');
  },
  beforeRouteLeave(to, from, next) {
    if (this.addedToCart) {
      next(true);
    } else {
      const response = confirm(
        'You have not added your robot to your cart, are you sure want to leave? '
      );
      next(response);
    }
  },
  components: {
    PartSelector,
    CollapsibleSection,
  },
  data() {
    return {
      addedToCart: false,
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
  computed: {
    availableParts() {
      return this.$store.state.robots.parts;
    },
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

      this.$store
        .dispatch('robots/addRobotToCart', Object.assign({}, robot, { cost }))
        .then(() => {
          this.$router.push('/cart');
        });
      this.addedToCart = true;
      // console.log(this.cart);
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

.content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  position: relative;

  .add-to-cart {
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
  width: 210px;
  height: 210px;
  padding: 5px;

  @media (min-width: 952px) {
    &.preview {
      position: absolute;
      top: -35px;
      right: -35px;
    }
  }
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
