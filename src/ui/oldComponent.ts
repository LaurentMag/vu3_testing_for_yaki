// VUE2 WAY :
/*
import Vue from "vue";

Vue.component("my-component", {
  data: function () {
    return {
      count: 0,
    };
  },
  methods: {
    incrementCount: function () {
      this.count++;
    },
  },
  template: `
      <button @click="incrementCount">
        You clicked me {{ count }} times.
      </button>
    `,
});

Vue.component("my-second-component", {
  data: function () {
    return {
      message: "Hello, world!",
    };
  },
  methods: {
    changeMessage: function () {
      this.message = "Hello, Vue!";
    },
  },
  template: `
      <button @click="changeMessage">
        {{ message }}
      </button>
    `,
});
*/

// VUE3 WAY :
/*
import { defineComponent, ref } from 'vue';

const MyComponent = defineComponent({
  setup() {
    const count = ref(0);

    function incrementCount() {
      count.value++;
    }

    return {
      count,
      incrementCount,
    };
  },
  template: `
    <button @click="incrementCount">
      You clicked me {{ count }} times.
    </button>
  `,
});

const MySecondComponent = defineComponent({
  setup() {
    const message = ref('Hello, world!');

    function changeMessage() {
      message.value = 'Hello, Vue!';
    }

    return {
      message,
      changeMessage,
    };
  },
  template: `
    <button @click="changeMessage">
      {{ message }}
    </button>
  `,
});

export { MyComponent, MySecondComponent };
*/
