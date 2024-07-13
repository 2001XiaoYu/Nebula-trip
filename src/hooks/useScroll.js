import { onMounted, onUnmounted, ref } from 'vue';
import { throttle } from 'underscore'

// console.log(throttle);

// export default function useScroll(reachBottomCB) {
//     const scrollListenerHandler = () => {
//         const clientHeight = document.documentElement.clientHeight
//         const scrollTop  = document.documentElement.scrollTop
//         const scrollHeight = document.documentElement.scrollHeight
//         if (clientHeight + scrollTop + 1 >= scrollHeight ) {
//             // homeStore.fetchHouseListData()
//             if (reachBottomCB) reachBottomCB()
//         }
//     }
//     onMounted(() => {
//         window.addEventListener("scroll", scrollListenerHandler)
//     })
    
//     onUnmounted(() => {
//         window.removeEventListener("scroll", scrollListenerHandler)
//     })
// }

export default function useScroll() {
    const isReachBottom = ref(false)

    const clientHeight = ref(0)
    const scrollTop = ref(0)
    const scrollHeight = ref(0)

    // 防抖/节流
    const scrollListenerHandler = throttle(() => {
        clientHeight.value = document.documentElement.clientHeight
        scrollTop.value  = document.documentElement.scrollTop
        scrollHeight.value = document.documentElement.scrollHeight
        if (clientHeight.value + scrollTop.value + 1 >= scrollHeight.value ) {
            // homeStore.fetchHouseListData()
            isReachBottom.value = true
        }
    }, 100)
    onMounted(() => {
        window.addEventListener("scroll", scrollListenerHandler)
    })
    
    onUnmounted(() => {
        window.removeEventListener("scroll", scrollListenerHandler)
    })

    return { isReachBottom, scrollTop,clientHeight, scrollHeight }
}