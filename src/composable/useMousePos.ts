import {ref, onMounted, onUnmounted} from "vue";
import {useEventTargetListener} from "./useEventListener";

// by convention, composable function names start with "use"
export function useMousePos() {
  const x = ref(0);
  const y = ref(0);

  const update = (event: Event) => {
    const mouseEvent = event as MouseEvent;
    x.value = mouseEvent.pageX;
    y.value = mouseEvent.pageY;
  };

  useEventTargetListener(window, "mousemove", update);

  return {x, y};
}
