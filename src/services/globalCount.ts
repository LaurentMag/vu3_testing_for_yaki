"use strict";

import type {GlobalCountType} from "@/entities/globalCountType";
import {nextTick, reactive} from "vue";

export const globalCount: GlobalCountType = reactive({
  count: 0,
  increment() {
    this.count++;
    nextTick(() => {
      // access updated DOM
    });
  },
  reset() {
    this.count = 0;
  },
});
